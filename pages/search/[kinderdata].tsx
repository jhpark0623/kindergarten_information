import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import { useSession } from "next-auth/react";

import Layout from "../../components/Layout";
import Map from "../../components/Map";

const Home: NextPage = () => {
  const [kindercode, setKinderCode] = useState("");
  const [kinder, setKinder] = useState<any>("");
  const [kinderID, setKinderID] = useState("");
  const [favoritCheck, setFavoritCheck] = useState(false);

  const { data: session, status } = useSession();

  const router = useRouter();

  // router.reload();
  // useEffect(() => {}, []);

  // console.log(session);

  useEffect(() => {
    setKinderCode(router.query.kinderdata?.toString() || "");

    fetch(`../api/kinder/${router.query.kinderdata?.toString() || ""}`)
      .then((res) => res.json())
      .then((json) => {
        setKinderID(json.kinderData.id);
        setKinder(json.kinderData || "");
        return json.kinderData.id;
      })
      .then((kinderID) => {
        const data = {
          email: session?.user?.email,
          kinderID,
        };

        fetch(`../api/favorites/12`, {
          method: "POST",
          body: JSON.stringify(data),
        })
          .then((res) => res.json())
          .then((json) => {
            if (json.kinder) setFavoritCheck(true);
          });
      });
  }, [router.query, session]);

  ChartJS.register(ArcElement, Tooltip, Legend);

  // 유치원 학급수 차트 데이터
  const clcnt = {
    labels: [
      "만 3세 학급수 : " + kinder.clcnt3,
      "만 4세 학급수 : " + kinder.clcnt4,
      "만 5세 학급수 : " + kinder.clcnt5,
      "혼합학급수 : " + kinder.mixclcnt,
      "특수학급수 : " + kinder.shclcnt,
    ],
    datasets: [
      {
        label: "# of Votes",
        data: [
          kinder.clcnt3,
          kinder.clcnt4,
          kinder.clcnt5,
          kinder.mixclcnt,
          kinder.shclcnt,
        ],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  // 유치원 유아수 차트 데이터
  const ppcnt = {
    labels: [
      "만 3세 유아수 : " + kinder.ppcnt3,
      "만 4세 유아수 : " + kinder.ppcnt4,
      "만 5세 유아수 : " + kinder.ppcnt5,
      "혼합유아수 : " + kinder.mixppcnt,
      "특수유아수 : " + kinder.shppcnt,
    ],
    datasets: [
      {
        label: "# of Votes",
        data: [
          kinder.ppcnt3,
          kinder.ppcnt4,
          kinder.ppcnt5,
          kinder.mixppcnt,
          kinder.shppcnt,
        ],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  // 차트 CSS
  const configs: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        align: "start",
        position: "bottom",
        maxWidth: 10,
        labels: {
          // This more specific font property overrides the global property
          font: {
            size: 15,
          },
        },
      },
      tooltip: {
        enabled: false,
      },
    },
  };

  const favorit = () => {
    if (!session) return alert("로그인 후 사용 가능합니다.");

    fetch(
      `../api/favorites/${session.user?.email}/${kinderID}/${favoritCheck}`
    );

    setFavoritCheck(!favoritCheck);
  };

  // console.log(session);

  return (
    <Layout>
      <div className="w-full h-[100px] max-w-[1000px]">
        {kinder ? (
          <div>
            <div className=" flex justify-center m-7 ">
              <div className="w-full p-3">
                <div className="flex justify-between items-center pb-4">
                  <div className="text-2xl font-bold ">{kinder.kindername}</div>
                  <button onClick={favorit} className="">
                    {favoritCheck ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-6 h-6 text-red-500"
                      >
                        <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6 text-red-500"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                        />
                      </svg>
                    )}
                  </button>
                </div>
                <div>전화번호 : {kinder.telno}</div>
                <div>운영시간 : {kinder.opertime}</div>
                <div>대표자명 : {kinder.rppnname}</div>
                <div>원장명 : {kinder.ldgrname}</div>
                <div>설립일 : {kinder.edate}</div>
                <div>개원일 : {kinder.odate}</div>
                <div>주소 : {kinder.addr}</div>
              </div>
              <div className="w-full">
                {/* <Map address={kinder.addr} /> */}
              </div>
            </div>
            <div className="flex justify-around py-5 border-2 border-slate-400">
              <div>
                <div className="w-full flex justify-center mb-4 text-xl font-bold">
                  학급수
                </div>
                <div className="w-[400px] border-r-2">
                  <Pie data={clcnt} options={configs} />
                </div>
              </div>
              <div>
                <div className="w-full flex justify-center mb-4 text-xl font-bold">
                  유아수
                </div>
                <div className="w-[400px] ">
                  <Pie data={ppcnt} options={configs} />
                </div>
              </div>
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
