import Image from "next/image";
import Link from "next/link";
import React from "react";
import { MdOutlineDashboard } from "react-icons/md";
import { FiShoppingBag } from "react-icons/fi";
import { MdOutlineShoppingCartCheckout } from "react-icons/md";
import { AiOutlineSetting } from "react-icons/ai";
import { IoLogoSlack } from "react-icons/io";
import { GoSignOut } from "react-icons/go";
import { BsFillPersonFill } from "react-icons/bs";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";
import { BiCategoryAlt } from "react-icons/bi";
const Sidebar = ({ notopen }) => {
  const { data: session } = useSession();
  const activelink = "bg-[#8DA2FB]";

  const router = useRouter();
  const { pathname } = router;

  return (
    <div
      className={`w-2/12 border-2 h-screen flex flex-col justify-between md:w-auto md:static bg-blue-50 ${
        notopen ? "fixed w-full" : "fixed -left-full"
      }`}
    >
      <div className="w-full mt-5">
        <div className="flex justify-center items-center">
          <IoLogoSlack className="text-4xl text-[#5D5FEF]" />
          <h1 className="text-4xl font-bold ">Admin</h1>
        </div>
        <div className="flex flex-col mx-auto mt-10 gap-4 w-10/12">
          <Link
            href={"/dashboard"}
            className={`flex gap-2 items-center p-2 px-4 text-xl font-semibold rounded-xl ${
              pathname.includes("/dashboard") ? activelink : ""
            }`}
          >
            <MdOutlineDashboard />
            <span>Dashboard</span>
          </Link>
          <Link
            href={"/products"}
            className={`flex gap-2 items-center p-2 px-4 text-xl font-semibold rounded-xl ${
              pathname.includes("/products") ? activelink : ""
            }`}
          >
            <FiShoppingBag />
            <span>Products</span>
          </Link>
          <Link
            href={"/categories"}
            className={`flex gap-2 items-center p-2 px-4 text-xl font-semibold rounded-xl ${
              pathname.includes("/categories") ? activelink : ""
            }`}
          >
            <BiCategoryAlt />
            <span>Categories</span>
          </Link>
          <Link
            href={"/orders"}
            className={`flex gap-2 items-center p-2 px-4 text-xl font-semibold rounded-xl ${
              pathname.includes("/orders") ? activelink : ""
            }`}
          >
            <MdOutlineShoppingCartCheckout />
            <span>Orders</span>
          </Link>
          <Link
            href={"/setting"}
            className={`flex gap-2 items-center p-2 px-4 text-xl font-semibold rounded-xl ${
              pathname.includes("/setting") ? activelink : ""
            }`}
          >
            <AiOutlineSetting />
            <span>Settings</span>
          </Link>
          <button
            onClick={() => signOut()}
            className="flex gap-2 items-center p-2 px-4 text-xl font-semibold rounded-xl"
          >
            <GoSignOut />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
      <div className="flex items-center gap-2 mb-10 ml-4">
        <BsFillPersonFill className="border-2 rounded-full text-4xl" />
        <div className="flex flex-col">
          <span>{session?.user?.name}</span>
          <span className="text-xs">{session?.user?.email}</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
