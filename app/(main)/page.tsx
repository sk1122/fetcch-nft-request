import React from "react"
import Image from "next/image"
import collection1 from "@/public/assets/collection1.avif"
import collection2 from "@/public/assets/collection2.avif"
import collection3 from "@/public/assets/collection3.avif"
import collection4 from "@/public/assets/collection4.avif"

import WalletsModal from "@/components/wallets-modal"
import { Toaster } from "react-hot-toast"

const LandingPage = () => {
  return (
    <div>
      <Toaster />
      <div className="relative z-20 mt-20 w-full px-6 text-center md:mt-40 lg:mt-[30vh] lg:px-0">
        <Image
          src={collection1}
          alt="collection1"
          priority
          className="absolute hidden select-none lg:-top-44 lg:left-48 lg:block lg:w-3/12 xl:-top-48 xl:left-72 2xl:-top-52 2xl:left-96 2xl:w-1/5"
        />
        <Image
          src={collection2}
          alt="collection1"
          priority
          className="absolute hidden select-none lg:-top-60 lg:right-56 lg:block lg:w-3/12 xl:-top-64 xl:right-72 2xl:-top-72 2xl:right-96 2xl:w-1/5"
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
          priority
          className="absolute -bottom-96 w-9/12 select-none md:w-6/12 lg:-bottom-28 lg:left-20 lg:w-4/12 xl:-bottom-28 xl:left-52 xl:w-3/12 2xl:-bottom-36 2xl:left-80 2xl:w-1/4"
        />

        <WalletsModal triggerClasses="flex items-start lg:items-center lg:mx-auto" />

        <Image
          src={collection4}
          alt="collection1"
          priority
          className="absolute -bottom-52 right-2 w-8/12 select-none md:w-6/12 lg:-bottom-24 lg:right-20 lg:w-4/12 xl:-bottom-24 xl:right-60 xl:w-3/12 2xl:-bottom-28 2xl:right-96 2xl:w-1/6"
        />
      </div>
    </div>
  )
}

export default LandingPage
