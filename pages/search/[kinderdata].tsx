import { SidoCode, Status } from "@prisma/client";
import { copyFileSync } from "fs";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { connected } from "process";
import { useEffect, useState } from "react";
import KinderList from "../../components/KinderList";
import Layout from "../../components/Layout";
import Map from "../../components/Map";

interface sido {
  sido: string;
  sidoCode: string;
}

const Home: NextPage = () => {
  const [kindercode, setKinderCode] = useState("");
  const [kinder, setKinder] = useState<any>();

  const router = useRouter();

  const searchData = async () => {
    await fetch(`../api/kinder/${router.query.kinderdata?.toString() || ""}`)
      .then((res) => res.json())
      .then((json) => setKinder(json.kinderData || ""));
  };

  useEffect(() => {
    setKinderCode(router.query.kinderdata?.toString() || "");
    fetch(`../api/kinder/${router.query.kinderdata?.toString() || ""}`)
      .then((res) => res.json())
      .then((json) => setKinder(json.kinderData || ""));
  }, [router.query]);

  return (
    <Layout>
      <div className="w-full h-[100px] max-w-[1000px]">
        <div>12{kindercode}</div>
        {kinder ? (
          <div className=" flex justify-center border-2 border-blue-400">
            <div className="w-full p-3">
              <div className="text-2xl font-bold ">{kinder.kindername}</div>
              <div>전화번호 : {kinder.telno}</div>
              <div>운영시간 : {kinder.opertime}</div>
              <div>대표자명 : {kinder.rppnname}</div>
              <div>원장명 : {kinder.ldgrname}</div>
              <div>설립일 : {kinder.edate}</div>
              <div>개원일 : {kinder.odate}</div>
              <div>주소 : {kinder.addr}</div>
            </div>
            <div className="w-full">
              <Map address={kinder.addr} />
            </div>
          </div>
        ) : (
          <div>Loading.....</div>
        )}
      </div>
    </Layout>
  );
};

export default Home;
