import type { NextPage } from "next";
import Layout from "../../components/Layout";
import FavoritStatus from "../../components/FavoritStatus";
import FavoritNumber from "../../components/FavoritNumber";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Status } from "@prisma/client";
import { useSession } from "next-auth/react";

const Home: NextPage = () => {
  const [compareList, setCompareList] = useState<any>([]);
  let compare;
  const router = useRouter();

  const { data: session, status } = useSession();

  useEffect(() => {
    const str = router.query.compare?.toString();
    compare = str?.split(",");
    if (!compare) return;
    console.log(compare);
    compareList.length = 0;
    compare.map((id) => {
      fetch(`../api/kinder/${id}`)
        .then((res) => res.json())
        .then((json) => {
          console.log(json.kinderData);
          compareList.push(json.kinderData);
          setCompareList([...compareList]);
        });
    });
  }, [router.query]);

  return (
    <Layout>
      <div className="max-w-[1200px] w-full p-5">
        {compareList.length !== 0 ? (
          <div className="space-y-10">
            <div className="rounded-xl">
              <div className="text-lg font-bold p-4">기본 정보 비교</div>
              <div className="overflow-x-scroll h-auto border-t-2">
                <div className=" flex w-max h-14 border-b-2 border-black bg-blue-300">
                  <div className="border-r-2 border-gray-300 flex justify-center items-center w-64">
                    이름
                  </div>
                  <div className="border-r-2 border-gray-300 flex justify-center items-center w-24">
                    설립유형
                  </div>
                  <div className="border-r-2 border-gray-300 flex justify-center items-center w-24">
                    대표자명
                  </div>
                  <div className="border-r-2 border-gray-300 flex justify-center items-center w-24">
                    원장명
                  </div>
                  <div className="border-r-2 border-gray-300 flex justify-center items-center w-56">
                    교육지원청명
                  </div>
                  <div className="border-r-2 border-gray-300 flex justify-center items-center w-24">
                    설립일
                  </div>
                  <div className="border-r-2 border-gray-300 flex justify-center items-center w-24">
                    개원일
                  </div>
                  <div className="border-r-2 border-gray-300 flex justify-center items-center w-32">
                    전화번호
                  </div>
                  <div className="border-r-2 border-gray-300 flex justify-center items-center w-64">
                    주소
                  </div>
                  <div className="border-r-2 border-gray-300 flex justify-center items-center w-52">
                    운영시간
                  </div>
                  <div className="flex justify-center items-center w-52">
                    홈페이지
                  </div>
                </div>

                {compareList.map((kinder: Status) => (
                  // console.log(kinder.kindername)
                  <FavoritStatus key={kinder.id} data={kinder}></FavoritStatus>
                ))}
              </div>
            </div>

            <div className="rounded-xl">
              <div className="text-lg font-bold p-4">학급수 / 유아수 비교</div>
              <div className="overflow-x-scroll h-auto border-t-2">
                <div className=" flex w-max h-14 border-b-2 border-black bg-blue-300">
                  <div className="border-r-2 border-gray-300 flex justify-center items-center w-64">
                    이름
                  </div>
                  <div className="border-r-2 border-gray-300 flex justify-center items-center w-24">
                    총인원
                  </div>
                  <div>
                    <div className="flex justify-center items-center w-32 border-b-2 border-r-2">
                      만 3세
                    </div>
                    <div className="flex h-7">
                      <div className="border-r-2 flex justify-center w-16 h-full">
                        학급수
                      </div>
                      <div className="border-r-2 flex justify-center w-16 h-full">
                        유아수
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-center items-center w-32 border-b-2 border-r-2">
                      만 4세
                    </div>
                    <div className="flex h-7">
                      <div className="border-r-2 flex justify-center w-16 h-full">
                        학급수
                      </div>
                      <div className="border-r-2 flex justify-center w-16 h-full">
                        유아수
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-center items-center w-32 border-b-2 border-r-2">
                      만 5세
                    </div>
                    <div className="flex h-7">
                      <div className="border-r-2 flex justify-center w-16 h-full">
                        학급수
                      </div>
                      <div className="border-r-2 flex justify-center w-16 h-full">
                        유아수
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-center items-center w-32 border-b-2 border-r-2">
                      혼합반
                    </div>
                    <div className="flex h-7">
                      <div className="border-r-2 flex justify-center w-16 h-full">
                        학급수
                      </div>
                      <div className="border-r-2 flex justify-center w-16 h-full">
                        유아수
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-center items-center w-32 border-b-2">
                      특수반
                    </div>
                    <div className="flex h-7">
                      <div className="border-r-2 flex justify-center w-16 h-full">
                        학급수
                      </div>
                      <div className="flex justify-center w-16 h-full">
                        유아수
                      </div>
                    </div>
                  </div>
                </div>

                {compareList.map((kinder: Status) => (
                  <FavoritNumber key={kinder.id} data={kinder}></FavoritNumber>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div>Loding</div>
        )}
      </div>
    </Layout>
  );
};

export default Home;
