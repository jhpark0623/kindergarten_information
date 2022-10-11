import type { NextPage } from "next";
import { useEffect } from "react";
import Layout from "../components/Layout";

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
