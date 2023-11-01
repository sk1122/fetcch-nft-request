"use client"

import React from "react"
import Image from "next/image"

const NftCard = ({ nftImage, name, creator }) => {
  return (
    <div className="flex flex-col rounded-[10px] border border-primary bg-[#E3ECFF] p-2">
      <div>
        <Image src={nftImage} alt="nft image" />
      </div>
      <div className="mt-2 flex gap-1">
        <div className="h-7 w-7">
          <Image
            src={nftImage}
            alt="company"
            className="h-full w-full rounded-full"
          />
        </div>
        <div className="flex flex-col">
          <div className="text-[10px] font-medium">{name}</div>
          <div className="text-[8px]">{creator}</div>
        </div>
      </div>
    </div>
  )
}

export default NftCard
