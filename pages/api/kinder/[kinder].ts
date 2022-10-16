import { SidoCode, Status, vehicle } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import client from "../../../libs/server/client";

type Data = {
  ok?: boolean;
  err?: any;
  kinderData?: Status | null;
  vehicle?: vehicle | null;
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

    const vehicle = await client.vehicle.findUnique({
      where: {
        id,
      },
    });

    console.log(kinderData);
    res.status(200).json({ ok: true, kinderData, vehicle });
  } catch (err) {
    res.status(200).json({ err });
  } finally {
    client.$disconnect();
  }
}
