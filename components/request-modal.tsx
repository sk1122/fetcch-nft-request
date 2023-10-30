"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { User, X } from "lucide-react";
import { Close as DialogClose } from "@radix-ui/react-dialog";
import ChainSelectModal from "./chain-select-modal";
import TokensList from "./tokens-list";
import { Chain, chainData } from "@/lib/data";
import { useSearchParams } from "next/navigation";
import { useFilter } from "@react-aria/i18n";
import Image from "next/image";

const RequestModal = ({ children }: { children: React.ReactNode }) => {
  const [chainSelect, setChainSelect] = useState(false);
  const searchParams = useSearchParams();

  const selectedChain = searchParams.get("chain");
  const selectedToken = searchParams.get("token");

  let { contains } = useFilter({
    sensitivity: "base",
  });

  const selectedChainData =
    selectedChain &&
    chainData.filter((chain) => contains(chain.name, selectedChain));

  const selectedTokenData =
    selectedChainData &&
    selectedToken &&
    selectedChainData[0].tokens.filter((token) =>
      contains(token.address, selectedToken),
    );

  const tokenImg = selectedTokenData && selectedTokenData[0]?.logoURI;
  const chainImg = selectedChainData && selectedChainData[0]?.logoURI;

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="w-full overflow-hidden p-6 sm:max-w-[392px] sm:rounded-[20px]">
        {chainSelect ? (
          <ChainSelectModal chains={chainData} setOpen={setChainSelect}>
            <div></div>
            <TokensList
              selectedChain={
                selectedChainData ? selectedChainData[0] : chainData[0]
              }
              setSelectToken={setChainSelect}
            />
          </ChainSelectModal>
        ) : (
          <>
            <DialogHeader className="flex w-full flex-row items-center justify-between">
              <DialogTitle className="font-manrope text-3xl font-extrabold">
                Request
              </DialogTitle>
              <DialogClose className="w-fit rounded-full border-2 border-primary p-2 opacity-70 transition-opacity hover:opacity-100 focus:outline-none disabled:pointer-events-none data-[state=open]:bg-primary data-[state=open]:text-primary">
                <X className="h-4 w-4 font-bold text-primary" strokeWidth={4} />
                <span className="sr-only">Close</span>
              </DialogClose>
            </DialogHeader>
            <div className="flex flex-col space-y-4 overflow-hidden">
              <div className="group overflow-hidden rounded-xl border-2 border-primary bg-[#E3ECFF] pt-4 hover:bg-primary/50">
                <span className="px-4 font-manrope font-bold">To</span>
                <div className="flex items-center space-x-3 p-4">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#B0C8FE]">
                    <User className="h-4 w-4 stroke-primary" />
                  </div>
                  <input
                    className="pointer-events-none overflow-clip truncate border-none bg-transparent text-primary outline-none placeholder:text-[#6893F0] focus:outline-none group-hover:placeholder:text-primary"
                    placeholder={
                      searchParams.get("address") ?? "steve.patrick@metamask"
                    }
                    readOnly
                  />
                </div>
              </div>
              <button
                className="group w-full text-left"
                onClick={() => setChainSelect(true)}
              >
                <div className="rounded-xl border-2 border-primary bg-[#E3ECFF] pt-4 group-hover:bg-primary/50">
                  <span className="px-4 font-manrope font-bold">
                    Select Token
                  </span>
                  <div className="flex items-center space-x-3 p-4">
                    <div className="relative">
                      <div className="h-8 w-8 flex-shrink-0 rounded-full bg-[#B0C8FE]">
                        {tokenImg ? (
                          <Image
                            src={tokenImg}
                            alt="token_image"
                            width={32}
                            height={32}
                          />
                        ) : null}
                      </div>
                      <div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full border border-[3E3ECFF] bg-[#B0C8FE]">
                        {chainImg ? (
                          <Image
                            src={chainImg}
                            alt="token_image"
                            width={32}
                            height={32}
                          />
                        ) : null}
                      </div>
                    </div>
                    <input
                      className="pointer-events-none overflow-clip truncate border-none bg-transparent text-primary outline-none placeholder:text-[#6893F0] focus:outline-none group-hover:placeholder:text-primary"
                      placeholder="Select Chain and token"
                      type="text"
                      readOnly
                    />
                  </div>
                </div>
              </button>
              <div className="rounded-xl border-2 border-primary bg-[#E3ECFF] pt-4">
                <span className="px-4 font-manrope font-bold">
                  Request Amount
                </span>
                <div className="flex items-center space-x-3 p-4">
                  <div className="relative">
                    <div className="h-8 w-8 flex-shrink-0 rounded-full bg-[#B0C8FE]">
                      {tokenImg ? (
                        <Image
                          src={tokenImg}
                          alt="token_image"
                          width={32}
                          height={32}
                        />
                      ) : null}
                    </div>
                    <div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full border border-[3E3ECFF] bg-[#B0C8FE]">
                      {chainImg ? (
                        <Image
                          src={chainImg}
                          alt="token_image"
                          width={32}
                          height={32}
                        />
                      ) : null}
                    </div>
                  </div>
                  <div className="flex flex-col items-start">
                    <input
                      className="overflow-clip truncate border-none bg-transparent text-lg text-primary outline-none placeholder:text-[#6893F0] focus:outline-none group-hover:placeholder:text-primary"
                      placeholder="0"
                    />
                    <input
                      className="pointer-events-none overflow-clip truncate border-none bg-transparent text-xs text-primary outline-none placeholder:text-[#6893F0] focus:outline-none group-hover:placeholder:text-primary"
                      placeholder="0.00"
                      readOnly
                    />
                  </div>
                </div>
              </div>
              <button className="w-full rounded-full bg-primary py-4 text-white">
                Request
              </button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default RequestModal;
