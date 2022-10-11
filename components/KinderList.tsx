import { Status } from "@prisma/client";
import Link from "next/link";

interface dataProps {
  data: Status;
}

const KinderList = ({ data }: dataProps) => {
  return (
    <div className="m-5 border-2 border-slate-500">
      <Link href={`/search/${data.id}`}>
        <button>{data.kindername}</button>
      </Link>
      <div>{data.establish}</div>
      <div>{data.ldgrname}</div>
      <div>
        {data.edate}/{data.odate}
      </div>
      <div>{data.addr}</div>
      <div>{data.telno}</div>
      <div>{data.opertime}</div>
    </div>
  );
};

export default KinderList;
