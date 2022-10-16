import { Status } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import client from "../../../../libs/server/client";

type Data = {
  name?: string;
  err?: any;
  list?: Status[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const email = req.query.favoritesList?.toString();

  let favoritesList: Status[] = [];

  if (email === "undefined") return;

  console.log(email + "12");

  const kinder = await client.user
    .findUnique({
      where: {
        email,
      },
    })
    .then(
      async (user) =>
        await client.favorites.findMany({
          where: {
            userId: user?.id,
          },
        })
    )
    .then((kinder) => {
      kinder.map(async (kinderInfo, idx, kinderArr) => {
        await client.status
          .findUnique({
            where: {
              id: kinderInfo.kinderID,
            },
          })
          .then((kinder) => {
            if (kinder) favoritesList.push(kinder);
            console.log(kinderArr.length);
            if (idx === kinderArr.length - 1) res.json({ list: favoritesList });
          });
      });
    });

  try {
  } catch (err) {
    res.status(200).json({ err });
  } finally {
    client.$disconnect();
  }
}
