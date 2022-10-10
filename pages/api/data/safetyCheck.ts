import type { NextApiRequest, NextApiResponse } from "next";
import client from "../../../libs/server/client";

type Data = {
  name: string;
  cnt?: Number;
  data?: any;
};

export interface KinderInfo {
  key: string;
  page: any;
  kindercode: string;
  officeedu: string;
  subofficeedu: string;
  kindername: string;
  estb_pt: string;
  plyg_ck_yn: string;
  plyg_ck_dt?: string;
  plyg_ck_rs_cd: string;
  cctv_ist_yn: string;
  cctv_ist_total: string;
  cctv_ist_in?: string;
  cctv_ist_out: string;
  fire_avd_yn: string;
  fire_avd_dt: string;
  fire_safe_yn: string;
  fire_safe_dt: string;
  gas_ck_yn: string;
  gas_ck_dt?: string;
  elect_ck_yn: string;
  elect_ck_dt: string;
  pbnttmng: string;
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
            `https://e-childschoolinfo.moe.go.kr/api/notice/safetyEdu.do?key=388934f271004800a2bd5d351e1a4847&sidoCode=${Number(
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
                      fire_avd_yn: kinder.fire_avd_yn,
                      fire_avd_dt: Number(kinder.fire_avd_dt),
                      gas_ck_yn: kinder.gas_ck_yn,
                      gas_ck_dt: Number(kinder.gas_ck_dt),
                      fire_safe_yn: kinder.fire_safe_yn,
                      fire_safe_dt: Number(kinder.fire_safe_dt),
                      elect_ck_yn: kinder.elect_ck_yn,
                      elect_ck_dt: Number(kinder.elect_ck_dt),
                      plyg_ck_yn: kinder.plyg_ck_yn,
                      plyg_ck_dt: Number(kinder.plyg_ck_dt),
                      plyg_ck_rs_cd: kinder.plyg_ck_rs_cd,
                      cctv_ist_yn: kinder.cctv_ist_yn,
                      cctv_ist_total: Number(kinder.cctv_ist_total),
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
                  const SidoCode = await client.safetyCheck.createMany({
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
