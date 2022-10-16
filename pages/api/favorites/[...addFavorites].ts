import type { NextApiRequest, NextApiResponse } from "next";
import client from "../../../libs/server/client";

type Data = {
  name?: string;
  err?: any;
  kinder?: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    if (req.method === "POST") {
      console.log(req.body);
      const { email, kinderID } = JSON.parse(req.body);
      console.log(email, kinderID);
      const kinder = await client.user
        .findUnique({
          where: {
            email,
          },
        })
        .then(
          async (user) =>
            await client.favorites.findUnique({
              where: {
                kinderID,
              },
            })
        );
      console.log(kinder);
      res.status(200).json({ name: "John Doe", kinder });
    } else if (req.method === "GET") {
      const query = req.query.addFavorites;
      if (!query) return;
      const email = query[0];
      const kinderID = query[1];
      const check = query[2];

      const kinder = await client.user
        .findUnique({
          where: {
            email,
          },
        })
        .then(async (user) => {
          if (user) {
            if ("false" === check)
              return await client.favorites.create({
                data: {
                  userId: user.id,
                  kinderID,
                },
              });
            else
              return await client.favorites.delete({
                where: {
                  kinderID,
                },
              });
          }
        });
      console.log(kinder);
      res.status(200).json({ name: "John Doe", kinder });
    }
  } catch (err) {
    res.status(200).json({ err });
  } finally {
    client.$disconnect();
  }
}
