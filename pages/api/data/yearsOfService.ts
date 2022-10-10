import { Status, yearsOfService } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import client from "../../../libs/server/client";

type Data = {
  name: string;
  cnt?: Number;
  data?: any;
};

export interface KinderInfo {
  key: string;
  kindercode: string;
  officeedu: string;
  subofficeedu: string;
  kindername: string;
  establish: string;
  yy1_undr_thcnt: string;
  yy1_abv_yy2_undr_thcnt: string;
  yy2_abv_yy4_undr_thcnt: string;
  yy4_abv_yy6_undr_thcnt: string;
  yy6_abv_thcnt: string;
  pbnttmng: string;
  page: any;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  let dataList: any = [];
  let count = 0;
  let cnt = 0;

  try {
    const sidoCode = await client.sidoCode.findMany();
    // const status = await client.status.findMany();

    sidoCode.map((sidoCode, idx, arr) => {
      return setTimeout(
        () =>
          fetch(
            `https://e-childschoolinfo.moe.go.kr/api/notice/yearOfWork.do?key=388934f271004800a2bd5d351e1a4847&sidoCode=${Number(
              sidoCode.sidoCode
            )}&sggCode=${Number(sidoCode.sigunguCode)}&timing=20221`
          )
            .then((res) => res.json())
            .then(async (json) => {
              console.log(typeof json.kinderInfo);
              if (json.kinderInfo)
                json.kinderInfo.forEach(async (kinder: KinderInfo) => {
                  try {
                    const user = await client.status.findUnique({
                      where: {
                        kindercode: kinder.kindercode,
                      },
                    });
                    const data = {
                      yy1_undr_thcnt: Number(kinder.yy1_undr_thcnt),
                      yy1_abv_yy2_undr_thcnt: Number(
                        kinder.yy1_abv_yy2_undr_thcnt
                      ),
                      yy2_abv_yy4_undr_thcnt: Number(
                        kinder.yy2_abv_yy4_undr_thcnt
                      ),
                      yy4_abv_yy6_undr_thcnt: Number(
                        kinder.yy4_abv_yy6_undr_thcnt
                      ),
                      yy6_abv_thcnt: Number(kinder.yy6_abv_thcnt),
                      statusId: user?.id,
                    };
                    dataList.push(data);
                    console.log(data);
                    console.log(count);
                    console.log(json.kinderInfo.length);
                  } catch (err2) {
                    console.log(err2);
                  } finally {
                    client.$disconnect();
                  }
                });
              count++;

              if (arr.length === count) {
                setTimeout(async () => {
                  const SidoCode = await client.yearsOfService.createMany({
                    data: dataList,
                  });
                  res.status(200).json({ name: "성공" });
                }, 2000);
              }
            }),
        idx * 1000
      );
    });
  } catch (err) {
    res.status(200).json({ name: "John Doe" });
  } finally {
    client.$disconnect();
  }
}
