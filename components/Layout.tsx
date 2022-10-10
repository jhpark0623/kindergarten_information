import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

const Layout = (props: any) => {
  const [darnChecked, setDarnChecked] = useState(false);

  const darkMode = () => {
    document.body.classList.toggle("dark");
    setDarnChecked(!darnChecked);
  };

  const router = useRouter();

  return (
    <div>
      <div className="flex justify-between h-[100px] p-10 border-b-2 border-black">
        <Link href={"/"}>
          <button>Title</button>
        </Link>
        <nav className="flex space-x-4">
          <Link href={"/search"}>
            <button>찾기</button>
          </Link>
          <Link href={"/compare"}>
            <button>비교</button>
          </Link>
        </nav>
        <Link href={"/login"}>
          <button>Login</button>
        </Link>
      </div>
      {/* 몸뚱이 */}
      <div className="h-full bg-red-300 flex justify-center">
        {props.children}
      </div>
    </div>
  );
};

export default Layout;
