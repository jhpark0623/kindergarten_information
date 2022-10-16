import { Status } from "@prisma/client";
import Link from "next/link";

interface dataProps {
  data: Status;
}

const KinderList = ({ data }: dataProps) => {
  return (
    <div key={data.id} className="flex w-max h-14 border-b-2 border-black">
      <Link href={`../search/${data.id}`}>
        <button className="border-r-2 border-gray-300 flex justify-center items-center w-64 text-blue-600">
          {data.kindername}
        </button>
      </Link>
      <div className="border-r-2 border-gray-300 flex justify-center items-center w-24">
        {data.establish}
      </div>
      <div className="border-r-2 border-gray-300 flex justify-center items-center w-24">
        {data.rppnname}
      </div>
      <div className="border-r-2 border-gray-300 flex justify-center items-center w-24">
        {data.ldgrname}
      </div>
      <div className="border-r-2 border-gray-300 flex justify-center items-center w-56">
        {data.subofficeedu}
      </div>
      <div className="border-r-2 border-gray-300 flex justify-center items-center w-24">
        {data.edate}
      </div>
      <div className="border-r-2 border-gray-300 flex justify-center items-center w-24">
        {data.odate}
      </div>
      <div className="border-r-2 border-gray-300 flex justify-center items-center w-32">
        {data.telno}
      </div>
      <div className="border-r-2 border-gray-300 flex justify-center items-center w-64">
        {data.addr}
      </div>
      <div className="border-r-2 border-gray-300 flex justify-center items-center w-52">
        {data.opertime}
      </div>
      <a
        href={data.hpaddr || ""}
        className="flex justify-center items-center w-52"
      >
        {data.hpaddr}
      </a>
    </div>
  );
};

export default KinderList;
