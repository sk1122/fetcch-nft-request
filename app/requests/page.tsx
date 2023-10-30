import React from "react";
import MainNav from "@/components/main-nav";
import Image from "next/image";
import decoration from "@/public/assets/decoration.avif";
import PendingRequests from "@/components/pending-requests";
import AddressInput from "@/components/address-input";

const PaymentRequests = async () => {
  return (
    <main className="max-w-screen relative h-screen w-full overflow-hidden overflow-y-scroll md:overflow-hidden">
      <MainNav />
      <Image
        src={decoration}
        alt="decoration"
        className="absolute -left-16 hidden w-1/3 md:w-1/4 xl:block xl:w-1/6"
      />
      <Image
        src={decoration}
        alt="decoration"
        className="absolute -right-16 bottom-12 hidden w-1/3 rotate-90 md:w-1/4 xl:block xl:w-1/6"
      />
      <div className="relative z-20 mt-20 w-full px-6 text-center lg:px-0">
        <h1 className="text-center font-manrope text-5xl font-bold md:text-6xl xl:text-7xl 2xl:text-8xl">
          Payment Requests
        </h1>
        <p className="mx-auto mt-8 w-full max-w-md text-center text-[18px] md:max-w-lg xl:max-w-xl 2xl:max-w-full">
          Let&apos;s understand the user experience flow of{" "}
          <span className="text-[#FF7D1F]">request button</span> in wallets
          integrated with Fetcch.{" "}
        </p>
        <AddressInput />
        <h3 className="mt-12 font-manrope text-2xl font-semibold">
          Your Pending Requests
        </h3>
        <PendingRequests />
      </div>
    </main>
  );
};

export default PaymentRequests;
