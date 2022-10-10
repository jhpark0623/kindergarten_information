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
  vhcl_oprn_yn: string;
  opra_vhcnt: string;
  dclr_vhcnt: string;
  psg9_dclr_vhcnt: string;
  psg12_dclr_vhcnt: string;
  psg15_dclr_vhcnt: string;
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
            `https://e-childschoolinfo.moe.go.kr/api/notice/schoolBus.do?key=388934f271004800a2bd5d351e1a4847&sidoCode=${Number(
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
                      vhcl_oprn_yn: kinder.vhcl_oprn_yn,
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
                  const SidoCode = await client.vehicle.createMany({
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
