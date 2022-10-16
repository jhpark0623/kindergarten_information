import { Status } from "@prisma/client";
import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Link from "next/link";
import { useRouter } from "next/router";

const Home: NextPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [favoritesList, setFavoritesList] = useState<Status[]>([]);
  const [checkListName, setCheckListName] = useState<String[]>([]);
  const [checkListCode, setCheckListCode] = useState<String[]>([]);

  useEffect(() => {
    if (!session) {
      alert("로그인이 필요한 서비스입니다.");
      router.push("/.");
    }
    fetch(`api/favorites/favoritesList/${session?.user?.email}`)
      .then((res) => res.json())
      .then((json) => setFavoritesList(json.list));
  }, [session]);

  const compare = () => {};

  return (
    <Layout>
      <div className="h-full flex w-[1000px] max-w-[1000px] justify-center space-x-5 pt-10">
        <div className="space-y-5 w-[450px]">
          <div className="text-2xl font-bold">즐겨찾기 목록</div>
          {favoritesList ? (
            favoritesList.map((kinder) => (
              <div className="border-2 border-black flex rounded-xl">
                <input
                  type={"checkbox"}
                  value={kinder.kindername || ""}
                  onChange={(event) => {
                    if (event.target.checked) {
                      setCheckListName([
                        ...checkListName,
                        event.currentTarget.value,
                      ]);
                      setCheckListCode([...checkListCode, kinder.id || ""]);
                    } else {
                      setCheckListCode(
                        checkListCode.filter((ele) => {
                          return kinder.id === ele ? false : true;
                        })
                      );
                      setCheckListName(
                        checkListName.filter((ele) => {
                          return event.currentTarget.value === ele
                            ? false
                            : true;
                        })
                      );
                    }
                  }}
                  className="h-full m-2"
                ></input>
                <div className="my-1">
                  <Link href={`/search/${kinder.id}`}>
                    <button>{kinder.kindername}</button>
                  </Link>
                  <div>{kinder.telno}</div>
                  <div>{kinder.addr}</div>
                </div>
              </div>
            ))
          ) : (
            <div>Loding</div>
          )}
        </div>
        <div className="w-40 h-min border-2 border-black flex justify-between flex-col">
          <div className="w-full flex justify-center p-4 border-b-[1px] border-black">
            선택목록
          </div>
          <div className="h-full py-3 space-y-2 p-4">
            {checkListName
              ? checkListName.map((ele, idx) => (
                  <div key={idx} className="border-b-2 ">
                    {ele}
                  </div>
                ))
              : ""}
          </div>
          <Link
            href={{
              pathname: "/compare/[list]",
              query: { list: JSON.stringify(checkListCode) },
            }}
            as={`/compare/${checkListCode}`}
          >
            <button onClick={compare} className="p-4 border-t-2 border-black">
              선택 비교
            </button>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
