import { SidoCode, Status } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import client from "../../../libs/server/client";

type Data = {
  name?: string;
  err?: any;
  kinder?: Status[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    console.log(req.query.search);
    const region: string = req.query.search?.toString() || "";
    const { selectSido, selectSigungu } = JSON.parse(region);

    const kinder = await client.status.findMany({
      where: {
        sidoCode: Number(selectSido),
        sigunguCode: Number(selectSigungu),
      },
    });
    res.status(200).json({ name: "John Doe", kinder });
  } catch (err) {
    res.status(200).json({ err });
  } finally {
    client.$disconnect();
  }
}
