import type { NextPage } from "next";
import { useEffect, useState } from "react";
import Layout from "../../components/Layout";

const Home: NextPage = () => {
  const [userID, setUserID] = useState("");
  const [userPW, setUserPW] = useState("");

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
      <form onSubmit={singUp} className="flex flex-col w-52">
        <div>로그인</div>
        <div>아이디</div>
        <input
          type="text"
          onChange={(event) => setUserID(event.currentTarget.value)}
        />
        <div>비밀번호</div>
        <input
          type="password"
          onChange={(event) => setUserPW(event.currentTarget.value)}
        />
        <button type="submit">로그인</button>
        <button>회원가입</button>
      </form>
    </Layout>
  );
};

export default Home;
