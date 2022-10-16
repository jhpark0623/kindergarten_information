import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import { signIn, signOut, useSession } from "next-auth/react";
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

  return (
    <Layout>
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
    </Layout>
  );
};

export default Home;
