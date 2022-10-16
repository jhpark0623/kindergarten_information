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
        {(data.ppcnt3 || 0) +
          (data.ppcnt4 || 0) +
          (data.ppcnt5 || 0) +
          (data.mixppcnt || 0) +
          (data.shppcnt || 0)}
      </div>
      <div className="border-r-2 border-gray-300 flex justify-center items-center w-16">
        {data.clcnt3}
      </div>
      <div className="border-r-2 border-gray-300 flex justify-center items-center w-16">
        {data.ppcnt3}
      </div>
      <div className="border-r-2 border-gray-300 flex justify-center items-center w-16">
        {data.clcnt4}
      </div>
      <div className="border-r-2 border-gray-300 flex justify-center items-center w-16">
        {data.ppcnt4}
      </div>
      <div className="border-r-2 border-gray-300 flex justify-center items-center w-16">
        {data.clcnt5}
      </div>
      <div className="border-r-2 border-gray-300 flex justify-center items-center w-16">
        {data.ppcnt5}
      </div>
      <div className="border-r-2 border-gray-300 flex justify-center items-center w-16">
        {data.mixclcnt}
      </div>
      <div className="border-r-2 border-gray-300 flex justify-center items-center w-16">
        {data.mixppcnt}
      </div>
      <div className="border-r-2 border-gray-300 flex justify-center items-center w-16">
        {data.shclcnt}
      </div>
      <div className="border-gray-300 flex justify-center items-center w-16">
        {data.shppcnt}
      </div>
    </div>
  );
};

export default KinderList;
