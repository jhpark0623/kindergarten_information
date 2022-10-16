import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";

const Layout = (props: any) => {
  const [darnChecked, setDarnChecked] = useState(false);
  const router = useRouter();

  const { data: session, status } = useSession();

  const darkMode = () => {
    document.body.classList.toggle("dark");
    setDarnChecked(!darnChecked);
  };

  return (
    <div>
      <div className="flex justify-between h-[100px] p-10 border-b-[1px] border-slate-400">
        <Link href={"/"}>
          <button>유치원 검색</button>
        </Link>
        {session ? (
          <div className="space-x-4">
            <Link href={"/myPage"}>
              <button>즐겨찾기</button>
            </Link>
            {session?.user && (
              <a
                href={"/api/auth/signout"}
                onClick={(e) => {
                  e.preventDefault();
                  signOut();
                  router.push("../.");
                }}
              >
                Logout
              </a>
            )}
          </div>
        ) : (
          <div>
            {!session && (
              <Link href={"/login"}>
                <button>Login</button>
              </Link>
            )}
          </div>
        )}
      </div>
      {/* 몸뚱이 */}
      <div className="flex justify-center bg-blue-200 h-[100%] min-h-[89vh]">
        {props.children}
      </div>
    </div>
  );
};

export default Layout;
