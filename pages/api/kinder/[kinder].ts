import { SidoCode, Status } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import client from "../../../libs/server/client";

type Data = {
  name?: string;
  err?: any;
  SidoCode?: Status[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    console.log(req.query.search);
    const region: string = req.query.search?.toString() || "";
  } catch (err) {
    res.status(200).json({ err });
  } finally {
    client.$disconnect();
  }
}
