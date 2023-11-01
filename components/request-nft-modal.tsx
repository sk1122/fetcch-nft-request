"use client"

import React from "react"
import { ChevronLeft } from "lucide-react"

import { Dialog, DialogContent, DialogHeader } from "./ui/dialog"
import NftCard from "./nft-card"
import nftImage from "@/public/assets/nftcardimage.png"

const RequestNFTModal = ({ open, setOpen }) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="w-full overflow-hidden p-6 sm:max-w-[392px] sm:rounded-[20px]">
        <DialogHeader className="flex w-full flex-row items-center justify-between">
          <ChevronLeft
            className="h-8 w-8 cursor-pointer rounded-full p-1 text-primary ring-2 ring-primary"
            onClick={() => setOpen(false)}
            strokeWidth={2}
          />
          <h2 className="font-manrope text-3xl font-bold">Choose NFT</h2>
          <div></div>
        </DialogHeader>
        <div className="flex flex-col">
          <input type="text" placeholder="Search NFT" className="text-primary search-box-nft border rounded-xl border-primary px-3 py-4 bg-[#E3ECFF]" />
        </div>
        <div className="grid grid-cols-2 gap-4 overflow-y-scroll h-96">
          <NftCard name='Gadiator123 #1341' creator='by duelist duos' nftImage={nftImage} />
          <NftCard name='Gadiator123 #1341' creator='by duelist duos' nftImage={nftImage} />
          <NftCard name='Gadiator123 #1341' creator='by duelist duos' nftImage={nftImage} />
          <NftCard name='Gadiator123 #1341' creator='by duelist duos' nftImage={nftImage} />
          <NftCard name='Gadiator123 #1341' creator='by duelist duos' nftImage={nftImage} />
          <NftCard name='Gadiator123 #1341' creator='by duelist duos' nftImage={nftImage} />
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default RequestNFTModal
