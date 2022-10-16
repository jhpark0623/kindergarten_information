import type { NextApiRequest, NextApiResponse } from "next";
import client from "../../../libs/server/client";

type Data = {
  name: string;
  data?: any;
  err?: String;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const data = req.body;
  const userId = JSON.parse(data).userID.toString();
  console.log(userId);

  try {
    const data = await client.user.findUnique({
      where: {
        email: userId,
      },
    });
    console.log(data);
    res.status(200).json({ name: "John Doe", data });
  } catch (err) {
    res.status(200).json({ name: "John Doe", err: `${err}` });
  } finally {
    client.$disconnect();
  }
}
