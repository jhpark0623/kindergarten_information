import { SidoCode, Status } from "@prisma/client";
import { copyFileSync } from "fs";
import type { NextPage } from "next";
import { useRouter } from "next/router";
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

  const router = useRouter();

  useEffect(() => {
    setKinderCode(router.query.kinderdata?.toString() || "");
  }, [router.query]);

  useEffect(() => {
    fetch("../api/");
  }, []);

  return (
    <Layout>
      <div className="w-full h-[100vh]">
        <div>12{kindercode}</div>
        <div>
          뭐냐이거
          <Map address="고양시 일산서구" />
        </div>
      </div>
    </Layout>
  );
};

export default Home;
