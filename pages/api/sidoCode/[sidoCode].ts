import { SidoCode } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import csvToJSON from "../../../components/CsvToJSON";
import client from "../../../libs/server/client";

type Data = {
  name?: string;
  err?: any;
  SidoCode?: SidoCode[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    console.log(req.query.sidoCode);
    const sidoCode = req.query.sidoCode?.toString();

    const SidoCode = await client.sidoCode.findMany({
      where: {
        sidoCode: sidoCode,
      },
      orderBy: {
        sigunguCode: "desc",
      },
    });
    res.status(200).json({ name: "John Doe", SidoCode });
  } catch (err) {
    res.status(200).json({ err });
  } finally {
    client.$disconnect();
  }
}
