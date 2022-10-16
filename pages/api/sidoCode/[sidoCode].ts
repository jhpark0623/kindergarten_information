import { SidoCode } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
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
    const sidoCode = req.query.sidoCode?.toString();
    console.log(sidoCode);

    const SidoCode = await client.sidoCode.findMany({
      where: {
        sidoCode: sidoCode,
      },
      orderBy: {
        sigunguCode: "desc",
      },
    });

    console.log(SidoCode);
    res.status(200).json({ name: "John Doe", SidoCode });
  } catch (err) {
    res.status(200).json({ err });
  } finally {
    client.$disconnect();
  }
}
