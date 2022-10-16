import { Status } from "@prisma/client";
import Link from "next/link";

interface dataProps {
  data: Status;
}

const KinderList = ({ data }: dataProps) => {
  return (
    <div className="m-5 border-2 border-slate-500 rounded-lg p-3 space-y-1">
      <Link href={`/search/${data.id}`}>
        <button className="text-xl font-bold pb-4">{data.kindername}</button>
      </Link>
      <div>설립유형 : {data.establish}</div>
      <div>원장명 : {data.ldgrname}</div>
      <div>
        설립일/개원일 : {data.edate}/{data.odate}
      </div>
      <div>주소 : {data.addr}</div>
      <div>전화번호 : {data.telno}</div>
      <div>운영시간 : {data.opertime}</div>
    </div>
  );
};

export default KinderList;
