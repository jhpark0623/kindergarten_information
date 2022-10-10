import type { NextPage } from "next";
import { useEffect } from "react";
import Layout from "../components/Layout";

export interface Data {
  key: string;
  kindercode: string;
  officeedu: string;
  subofficeedu: string;
  kindername: string;
  establish: string;
  edate: string;
  odate: string;
  addr: string;
  telno: string;
  hpaddr: string;
  opertime: string;
  clcnt3: string;
  clcnt4: string;
  clcnt5: string;
  mixclcnt: string;
  shclcnt: string;
  ppcnt3: string;
  ppcnt4: string;
  ppcnt5: string;
  mixppcnt: string;
  shppcnt: string;
  rppnname: string;
  ldgrname: string;
  pbnttmng: string;
}

export interface RootObject {
  name: string;
  data: Data[];
}

const Home: NextPage = () => {
  // useEffect(() => {
  //   fetch("/api/data")
  //     .then((res) => res.json())
  //     .then((json: RootObject) => console.log(json.data));
  // }, []);

  return (
    <Layout>
      <div className="h-full">aa</div>
    </Layout>
  );
};

export default Home;
