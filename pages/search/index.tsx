import { SidoCode, Status } from "@prisma/client";
import { copyFileSync } from "fs";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import KinderList from "../../components/KinderList";
import Layout from "../../components/Layout";

interface sido {
  sido: string;
  sidoCode: string;
}

const Home: NextPage = () => {
  const [selectSido, setSelectSido] = useState("");
  const [selectSigungu, setSelectSigungu] = useState("");
  const [sidoCode, setSidoCode] = useState<sido[]>([
    { sido: "서울특별시", sidoCode: "11" },
    { sido: "부산광역시", sidoCode: "26" },
    { sido: "대구광역시", sidoCode: "27" },
    { sido: "인천광역시", sidoCode: "28" },
    { sido: "광주광역시", sidoCode: "29" },
    { sido: "대전광역시", sidoCode: "30" },
    { sido: "울산광역시", sidoCode: "31" },
    { sido: "세종특별자치시", sidoCode: "36" },
    { sido: "경기도", sidoCode: "41" },
    { sido: "강원도", sidoCode: "42" },
    { sido: "충청북도", sidoCode: "43" },
    { sido: "충청남도", sidoCode: "44" },
    { sido: "전라북도", sidoCode: "45" },
    { sido: "전라남도", sidoCode: "46" },
    { sido: "경상북도", sidoCode: "47" },
    { sido: "경상남도", sidoCode: "48" },
    { sido: "제주특별자치도", sidoCode: "50" },
  ]);
  const [sigunguCode, setSigunguCode] = useState<SidoCode[]>([]);
  const [searchData, setSearchData] = useState<Status[]>([]);

  useEffect(() => {
    setSearchData([]);
  }, []);

  const sigunug = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectSido(event.currentTarget.value);
    setSelectSigungu("");
    fetch(`api/sidoCode/${event.currentTarget.value}`)
      .then((res) => res.json())
      .then((json) => setSigunguCode(json.SidoCode));
  };

  const sigungu = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectSigungu(event.currentTarget.value);
  };

  const search = () => {
    const region = {
      selectSido,
      selectSigungu,
    };
    console.log(region);
    fetch(`/api/search/${JSON.stringify(region)}`)
      .then((res) => res.json())
      .then((json) => setSearchData(json.SidoCode));
  };

  return (
    <Layout>
      <div className="flex justify-center w-[700px] bg-white pt-10">
        <div className="bg-green-300 w-[200px] flex items-center flex-col">
          지역 선택
          <select
            name="selectSiDo"
            className="border-2 border-black w-full h-10 px-2 my-5 dark:text-black"
            onChange={sigunug}
          >
            <option hidden>시/도</option>
            {sidoCode.map((sido, idx) => (
              <option key={idx} value={sido.sidoCode}>
                {sido.sido}
              </option>
            ))}
          </select>
          <select
            name="selectSigungu"
            value={selectSigungu}
            className="border-2 border-black w-full h-10 px-2 my-5 dark:text-black"
            onChange={sigungu}
          >
            <option value={""} hidden>
              시/군/구
            </option>
            {sigunguCode.map((sigungu, idx) => (
              <option key={idx} value={sigungu.sigunguCode}>
                {sigungu.sigungu}
              </option>
            ))}
          </select>
          <button onClick={search}>검색</button>
        </div>
        <div className="bg-blue-300 w-full">
          {searchData.map((ele) => (
            <KinderList key={ele.id} data={ele} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Home;
