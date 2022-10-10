import type { NextApiRequest, NextApiResponse } from "next";
import csvToJSON from "../../components/CsvToJSON";
import client from "../../libs/server/client";

type Data = {
  name?: string;
  err?: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // const [data, setData] = useState<any>([]);
  console.log("file_csv");
  try {
    const fs = require("fs");
    const file_csv = fs.readFileSync("cityCode.csv");
    const string_csv = file_csv.toString();
    const arr_json = csvToJSON(string_csv);

    const SidoCode = await client.sidoCode.createMany({
      data: arr_json,
    });
    res.status(200).json({ name: "John Doe" });
  } catch (err) {
    res.status(200).json({ err });
  } finally {
    client.$disconnect();
  }
}
