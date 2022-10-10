import { Status } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import client from "../../../libs/server/client";

type Data = {
  name: string;
  cnt?: Number;
  data?: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  let dataList: any = [];
  let count = 0;
  let cnt = 0;

  try {
    const sidoCode = await client.sidoCode.findMany();

    sidoCode.map((sidoCode, idx, arr) => {
      // if (sidoCode.sidoCode === "11" && sidoCode.sigunguCode === "11350")
      return setTimeout(
        () =>
          fetch(
            `https://e-childschoolinfo.moe.go.kr/api/notice/basicInfo2.do?key=388934f271004800a2bd5d351e1a4847&sidoCode=${Number(
              sidoCode.sidoCode
            )}&sggCode=${Number(sidoCode.sigunguCode)}&timing=20221`
          )
            .then((res) => res.json())
            .then(async (json) => {
              if (json.kinderInfo)
                json.kinderInfo.forEach((kinder: Status) => {
                  const data = {
                    kindercode: kinder.kindercode,
                    sidoCode: Number(sidoCode.sidoCode),
                    sigunguCode: Number(sidoCode.sigunguCode),
                    officeedu: kinder.officeedu,
                    subofficeedu: kinder.subofficeedu,
                    kindername: kinder.kindername,
                    establish: kinder.establish,
                    rppnname: kinder.rppnname,
                    ldgrname: kinder.ldgrname,
                    edate: Number(kinder.edate),
                    odate: Number(kinder.odate),
                    addr: kinder.addr,
                    telno: kinder.telno,
                    hpaddr: kinder.hpaddr,
                    opertime: kinder.opertime,
                    clcnt3: Number(kinder.clcnt3),
                    clcnt4: Number(kinder.clcnt4),
                    clcnt5: Number(kinder.clcnt5),
                    mixclcnt: Number(kinder.mixclcnt),
                    shclcnt: Number(kinder.shclcnt),
                    ppcnt3: Number(kinder.ppcnt3),
                    ppcnt4: Number(kinder.ppcnt4),
                    ppcnt5: Number(kinder.ppcnt5),
                    mixppcnt: Number(kinder.mixppcnt),
                    shppcnt: Number(kinder.shppcnt),
                  };
                  dataList.push(data);
                  console.log(data);
                });

              count++;
              if (arr.length === count) {
                const SidoCode = await client.status.createMany({
                  data: dataList,
                });
                res.status(200).json({ name: "성공" });
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
