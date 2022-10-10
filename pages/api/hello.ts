// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { useState } from "react";

type Data = {
  name: string;
  data: any;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // const [data, setData] = useState<any>([]);

  try {
    fetch(
      "https://e-childschoolinfo.moe.go.kr/api/notice/basicInfo.do?key=388934f271004800a2bd5d351e1a4847&sidoCode=41&sggCode=41287"
    )
      .then((res) => res.json())
      .then((json) => {
        const data = json.kinderInfo;
        res.status(200).json({ name: "John Doe", data });
      });
  } catch (err) {}
}
