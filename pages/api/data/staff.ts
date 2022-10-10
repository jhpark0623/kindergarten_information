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
  drcnt: string;
  adcnt: string;
  hdst_thcnt: string;
  asps_thcnt: string;
  gnrl_thcnt: string;
  spcn_thcnt: string;
  ntcnt: string;
  ntrt_thcnt: string;
  shcnt_thcnt: string;
  incnt: any;
  owcnt: string;
  hdst_tchr_qacnt: string;
  rgth_gd1_qacnt: string;
  rgth_gd2_qacnt: string;
  asth_qacnt: string;
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
            `https://e-childschoolinfo.moe.go.kr/api/notice/teachersInfo.do?key=388934f271004800a2bd5d351e1a4847&sidoCode=${Number(
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
                      hdst_tchr_qacnt: Number(kinder.hdst_tchr_qacnt),
                      rgth_gd1_qacnt: Number(kinder.rgth_gd1_qacnt),
                      rgth_gd2_qacnt: Number(kinder.rgth_gd2_qacnt),
                      asth_qacnt: Number(kinder.asth_qacnt),
                      spcn_thcnt: Number(kinder.spcn_thcnt),
                      ntcnt: Number(kinder.ntcnt),
                      ntrt_thcnt: Number(kinder.ntrt_thcnt),
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
                  const SidoCode = await client.staff.createMany({
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
