import React, { useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { FaBars } from "react-icons/fa";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  const [notopen, setNotopen] = useState(false);
  const { data: session } = useSession();
  if (!session) {
    return (
      <>
       <button onClick={() => signIn("google")}>Sign in</button>

      </>
    );
  }

  return (
    <div className=" bg-blue-50 min-h-screen ">
      <div className="block md:hidden fixed z-50">
        <FaBars onClick={() => setNotopen(!notopen)} className="text-xl mt-3 ml-3"/>
      </div>
      <div className="flex">
        <Sidebar notopen={notopen}/>
        <div className="w-10/12 p-10">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
