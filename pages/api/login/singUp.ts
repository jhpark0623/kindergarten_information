// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { User } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import client from "../../../libs/server/client";

type Data = {
  name: string;
  data?: User;
  err?: String;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const data = req.body;
  const { userID, userPW, userName, userEmail, userPhoneNum } =
    JSON.parse(data);

  console.log(userID);
  console.log(userPW);
  console.log(userName);
  console.log(userEmail);
  console.log(userPhoneNum);

  try {
    const data = await client.user.create({
      data: {
        userId: userID,
        userPw: userPW,
        name: userName,
        E_mail: userEmail,
        phoneNum: Number(userPhoneNum),
      },
    });
    res.status(200).json({ name: "John Doe", data });
  } catch (err) {
    res.status(200).json({ name: "John Doe", err: `${err}` });
  } finally {
    client.$disconnect();
  }
}
