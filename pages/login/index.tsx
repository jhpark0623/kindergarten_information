import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import { signIn, signOut, useSession } from "next-auth/react";
import Main from "./singUp";
import { DEV_MIDDLEWARE_MANIFEST } from "next/dist/shared/lib/constants";

const Home: NextPage = () => {
  const [userID, setUserID] = useState("");
  const [userPW, setUserPW] = useState("");

  const { data: session, status } = useSession();

  const router = useRouter();

  console.log(session);

  if (session) {
    fetch(`../api/user/${session.user?.email}`);
    router.push("../.");
  }

  useEffect(() => {
    setUserID("");
    setUserPW("");
  }, []);

  const singUp = (event: any) => {
    event.preventDefault();
    console.log(userID);
    console.log(userPW);
    const login = {
      userID,
      userPW,
    };
    if (!userID) alert("아이디를 입력해주세요.");
    else if (!userPW) alert("비밀번호를 입력해주세요.");
    else
      fetch("../api/login", {
        method: "POST",
        body: JSON.stringify(login),
      })
        .then((res) => res.json())
        .then((json) => {
          if (!json.data || json.data.uerPw !== userPW)
            alert("가입되지 않은 정보거나 비밀번호가 잘못되었습니다.");
          else document.location.href = "/";
        });
  };

  return (
    <Layout>
      <form
        onSubmit={singUp}
        className="flex flex-col w-52 h-40 my-20 bg-white rounded-lg space-y-5"
      >
        <div className="w-full flex justify-center">로그인</div>

        <div>
          {!session && (
            <a
              href={"/api/auth/signin"}
              onClick={(e) => {
                e.preventDefault();
                signIn("google");
                // document.location.href = "/";
              }}
              className="w-full flex justify-center border-2 border-black"
            >
              Google Sign in
            </a>
          )}
        </div>
      </form>
    </Layout>
  );
};

export default Home;
