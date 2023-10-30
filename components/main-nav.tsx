import Link from "next/link";
import React from "react";
import logo from "@/public/assets/fetcch.svg";
import Image from "next/image";

const MainNav = () => {
  return (
    <div className="flex h-20 w-full items-center justify-between px-6 xl:h-28 xl:px-20">
      <Link href="/">
        <Image src={logo} alt="logo" />
      </Link>
      <ul className="hidden items-center space-x-6 md:flex xl:space-x-12">
        <Link
          href="#"
          className="text-[#363C46] transition-all duration-200 hover:text-primary"
        >
          Products
        </Link>
        <Link
          href="#"
          className="text-[#363C46] transition-all duration-200 hover:text-primary"
        >
          Learn
        </Link>
        <Link
          href="#"
          className="text-[#363C46] transition-all duration-200 hover:text-primary"
        >
          Use Cases
        </Link>
      </ul>
      {/* <ConnectWallet> */}
      <button className=" rounded-full bg-primary px-7 py-4 font-medium text-white shadow-[inset_0px_6px_4px_0px_rgba(255,255,255,0.2)]">
        Connect Wallet
      </button>
      {/* </ConnectWallet> */}
    </div>
  );
};

export default MainNav;
