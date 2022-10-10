import type { NextPage } from "next";
import { useEffect, useState } from "react";
import Layout from "../../components/Layout";

const Home: NextPage = () => {
  const [userID, setUserID] = useState("");
  const [userPW, setUserPW] = useState("");
  const [userRPW, setUserRPW] = useState("");
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPhoneNum, setUserPhoneNum] = useState("");

  const [IDErr, setIDErr] = useState("");
  const [PWErr, setPWErr] = useState("");
  const [rPWErr, setRPWErr] = useState("");
  const [nameErr, setNameErr] = useState("");
  const [phoneNumErr, setPhoneNumErr] = useState("");

  const [IDCheck, setIDCheck] = useState(false);
  const [PWCheck, setPWCheck] = useState(false);
  const [rPWCheck, setRPWCheck] = useState(false);
  const [nameCheck, setNameCheck] = useState(false);
  const [phoneNumCheck, setPhoneNumCheck] = useState(false);

  const singUp = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const userInfo = {
      userID,
      userPW,
      userName,
      userEmail,
      userPhoneNum,
    };
    console.log(userInfo);
    console.log(IDCheck);
    console.log(PWCheck);
    console.log(rPWCheck);
    console.log(nameCheck);
    console.log(phoneNumCheck);
    if (IDCheck && PWCheck && rPWCheck && nameCheck && phoneNumCheck) {
      fetch("../api/login/singUp", {
        method: "POST",
        body: JSON.stringify(userInfo),
      });
      alert("회원가입이 완료되었습니다.");
      document.location.href = "/login";
    } else alert("필수 정보를 입력해주세요.");
  };

  const checkID = () => {
    setIDCheck(false);

    const checkID = { userID };

    if (!userID) setIDErr("필수 정보입니다.");
    else if (userID.length < 6) setIDErr("아이디가 ㅈㄴ짧음");
    else {
      fetch("../api/login/idCheck", {
        method: "POST",
        body: JSON.stringify(checkID),
      })
        .then((res) => res.json())
        .then((json) => {
          if (json.data) setIDErr("이미 사용중인 아이디입니다.");
          else {
            setIDCheck(true);
            setIDErr("");
          }
        });
    }
  };

  const checkPW = () => {
    setPWCheck(false);

    if (!userPW) setPWErr("필수 정보입니다.");
    else {
      setPWCheck(true);
      setPWErr("");
    }
  };

  const rCheckPW = () => {
    setRPWCheck(false);

    if (!userRPW) setRPWErr("필수 정보입니다.");
    else if (userPW !== userRPW) setRPWErr("비밀번호와 일치하지 않습니다.");
    else {
      setRPWCheck(true);
      setRPWErr("");
    }
  };

  const CheckName = () => {
    setNameCheck(false);

    if (!userName) setNameErr("필수 정보입니다.");
    else {
      setNameCheck(true);
      setNameErr("");
    }
  };

  const CheckPhoneNum = () => {
    setPhoneNumCheck(false);

    if (!userPhoneNum) setPhoneNumErr("필수 정보입니다.");
    else {
      setPhoneNumCheck(true);
      setPhoneNumErr("");
    }
  };

  return (
    <Layout>
      <form onSubmit={singUp} className="flex justify-center">
        <div className="space-y-8 bg-white py-10 px-16 flex items-center flex-col m-10">
          <div className="flex justify-center">회원가입</div>

          <div className=" w-56 space-y-2">
            <div>아이디</div>
            <input
              id="id"
              type="text"
              placeholder="아이디"
              onChange={(e) => setUserID(e.currentTarget.value)}
              onBlur={checkID}
              className="border-b-2 border-black w-full"
            />
            {IDErr ? <div className=" text-red-600">{IDErr}</div> : null}
          </div>

          <div className=" w-56 space-y-2">
            <div>비밀번호</div>
            <input
              id="pw"
              type="password"
              placeholder="비밀번호"
              onChange={(e) => setUserPW(e.currentTarget.value)}
              onBlur={checkPW}
              className="border-b-2 border-black w-full"
            />
            {PWErr ? <div className=" text-red-600">{PWErr}</div> : null}
          </div>

          <div className=" w-56 space-y-2">
            <div>비밀번호 재입력</div>
            <input
              id="pwCheck"
              type="password"
              placeholder="비밀번호 재입력"
              onChange={(e) => setUserRPW(e.currentTarget.value)}
              onBlur={rCheckPW}
              className="border-b-2 border-black w-full"
            />
            {rPWErr ? <div className=" text-red-600">{rPWErr}</div> : null}
          </div>

          <div className=" w-56 space-y-2">
            <div>이름</div>
            <input
              id="name"
              type="text"
              placeholder="이름"
              onChange={(e) => setUserName(e.currentTarget.value)}
              onBlur={CheckName}
              className="border-b-2 border-black w-full"
            />
            {nameErr ? <div className=" text-red-600">{nameErr}</div> : null}
          </div>

          <div className=" w-56 space-y-2">
            <div>이메일</div>
            <input
              id="email"
              type="text"
              placeholder="이메일 (선택)"
              onChange={(e) => setUserEmail(e.currentTarget.value)}
              className="border-b-2 border-black w-full"
            />
          </div>

          <div className=" w-56 space-y-2">
            <div>휴대전화</div>
            <input
              id="phoneNum"
              type="text"
              placeholder="휴대전화"
              onChange={(e) => setUserPhoneNum(e.currentTarget.value)}
              onBlur={CheckPhoneNum}
              className="border-b-2 border-black w-full"
            />
            {phoneNumErr ? (
              <div className=" text-red-600">{phoneNumErr}</div>
            ) : null}
          </div>

          <button type="submit" className="border-2 border-black w-56">
            가입 하기
          </button>
        </div>
      </form>
    </Layout>
  );
};

export default Home;
