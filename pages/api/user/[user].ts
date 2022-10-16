import type { NextApiRequest, NextApiResponse } from "next";
import finalPropsSelectorFactory from "react-redux/es/connect/selectorFactory";
import client from "../../../libs/server/client";

type Data = {
  name?: string;
  data?: any;
  err?: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const email = req.query.user?.toString();
  console.log(email);

  try {
    const kinder = await client.user
      .findUnique({
        where: {
          email,
        },
      })
      .then(async (result) => {
        if (!result)
          await client.user.create({
            data: {
              email: email || "",
            },
          });
      });
  } catch (err) {
    res.status(200).json({ err });
  } finally {
    client.$disconnect();
  }
}
