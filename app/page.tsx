import decoration from "@/public/assets/decoration.avif";
import collection1 from "@/public/assets/collection1.avif";
import collection2 from "@/public/assets/collection2.avif";
import collection3 from "@/public/assets/collection3.avif";
import collection4 from "@/public/assets/collection4.avif";

import Image from "next/image";
import MainNav from "@/components/main-nav";

export default function Home() {
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
      <div className="relative z-20 mt-20 w-full px-6 text-center md:mt-40 lg:mt-[30vh] lg:px-0">
        <Image
          src={collection1}
          alt="collection1"
          className="absolute hidden lg:-top-44 lg:left-48 lg:block lg:w-3/12 xl:-top-48 xl:left-72 2xl:-top-52 2xl:left-96 2xl:w-1/5"
        />
        <Image
          src={collection2}
          alt="collection1"
          className="absolute hidden lg:-top-60 lg:right-56 lg:block lg:w-3/12 xl:-top-64 xl:right-72 2xl:-top-72 2xl:right-96 2xl:w-1/5"
        />
        <h1 className="text-left font-manrope text-5xl font-bold md:text-6xl lg:text-center xl:text-7xl 2xl:text-8xl">
          Payment Requests
        </h1>
        <p className="mt-8 w-full max-w-md text-left text-[18px] md:max-w-lg lg:mx-auto lg:text-center xl:max-w-xl 2xl:max-w-full">
          Let&apos;s understand the user experience flow of{" "}
          <span className="text-[#FF7D1F]">request button</span> in wallets
          integrated with Fetcch.{" "}
        </p>
        <Image
          src={collection3}
          alt="collection1"
          className="absolute -bottom-96 w-9/12 md:w-6/12 lg:-bottom-28 lg:left-20 lg:w-4/12 xl:-bottom-28 xl:left-52 xl:w-3/12 2xl:-bottom-36 2xl:left-80 2xl:w-1/4"
        />
        {/* <ConnectWallet> */}
        <button className="mt-12 flex w-fit items-start rounded-full bg-primary px-7 py-4 text-white shadow-[inset_0px_6px_4px_0px_rgba(255,255,255,0.2)] lg:mx-auto lg:items-center">
          Connect Wallet
        </button>
        {/* </ConnectWallet> */}
        <Image
          src={collection4}
          alt="collection1"
          className="absolute -bottom-52 right-2 w-8/12 md:w-6/12 lg:-bottom-24 lg:right-20 lg:w-4/12 xl:-bottom-24 xl:right-60 xl:w-3/12 2xl:-bottom-28 2xl:right-96 2xl:w-1/6"
        />
      </div>
    </main>
  );
}
