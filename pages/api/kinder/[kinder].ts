import { SidoCode, Status } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import client from "../../../libs/server/client";

type Data = {
  ok?: boolean;
  err?: any;
  kinderData?: Status | null;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    console.log(req.query.kinder);
    const id: string = req.query.kinder?.toString() || "";
    console.log(id);

    const kinderData = await client.status.findUnique({
      where: {
        id,
      },
    });
    res.status(200).json({ ok: true, kinderData });
  } catch (err) {
    res.status(200).json({ err });
  } finally {
    client.$disconnect();
  }
}
