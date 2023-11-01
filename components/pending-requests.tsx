"use client"

// import SendPayment from "./send-payment";
import * as ScrollArea from "@radix-ui/react-scroll-area"
import { Bell, User } from "lucide-react"

import SendPayment from "@/components/send-payment"
import { useConnectedWallet } from "./providers/providers"
import { useEffect, useState } from "react"
import { useAccount } from "wagmi"
import { useWallet } from "@solana/wallet-adapter-react"
import { useWallet as useAptosWallet } from "@aptos-labs/wallet-adapter-react"
import { formatUnits } from "viem"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
import collection1 from "@/public/assets/fallbackRequestImg.png"
import Image from "next/image"

const Request = ({
  request
}: any) => {
  const payer = request.payer.ownerId ?? request.payer.owner
  const receiver = request.recevier.ownerId ?? request.recevier.owner

  return (
    <div className="flex flex-col h-auto w-[47%] md:w-[30%] items-center rounded-[20px] p-2 md:px-5 md:py-4 justify-between border border-primary bg-[#E1EBFF] shadow-[0px_0px_35px_-9px_rgba(0,0,0,0.25)]">
        <div>
        <Image
          src={collection1}
          alt="collection1"
          className="w-full h-44 md:h-64 shadow-[-2.4px -1.2px 4.8px 2.4px rgba(0, 0, 0, 0.25)]"
        />
        </div>
        <div className="mt-4">
          Leonardo #2313
        </div>
        <div className="flex items-center gap-2 md:gap-3 mt-3">
          <button onClick={() => {window.navigator.clipboard.writeText(`https://request.fetcch.xyz/request/${request.id}`);toast.success("Copied link")}} 
          className="rounded-full border border-[#7C98F9] font-semibold bg-white px-2 py-1 text-sm md:px-7 md:py-4 md:text-base whitespace-nowrap">
            Dismiss
          </button>
          <SendPayment 
          id={request.id} 
          chain={request.actions[0].data.chain} 
          receiver={receiver} 
          amount={request.actions[0].data.amount.amount} 
          token={request.actions[0].data.token} 
          decimals={request.actions[0].data.tokenData?.decimals ?? 0} 
          tokenName={request.actions[0].data.tokenData?.symbol ?? ""} />
        </div>
      </div>
  )
}

const PendingRequests = () => {
  const { connectedWallet, token } = useConnectedWallet()
  const [requests, setRequests] = useState([])
  
  const router = useRouter()

  const { address } = useAccount()
  const {
    publicKey,
  } = useWallet()
  const {
    account,
  } = useAptosWallet()
  
  useEffect(() => {
    let addr = ""

    console.log(address, publicKey, account)

    if (connectedWallet == "evm") {
      addr = address as string
    } else if (connectedWallet == "solana") {
      addr = publicKey?.toBase58() as string
    } else if (connectedWallet == "aptos") {
      addr = account?.address.toString() as string
    }
    console.log("TOKEN: ", token)
    if(addr && token) {
      fetch(`/api/getPendingRequests?address=${addr}&accessToken=${token}`).then(res => res.json()).then(data => {
        console.log("REQUESTS: ", data)
  
        setRequests(data.data)
        return data
      }).catch((e) => {
        toast.error("Token expired, login again")
        router.push(
          "/"
        )
      })
    }
  }, [connectedWallet, address, publicKey, account])
  
  return (
    <>
      {true ? (
        <div className="mx-auto mt-7 h-[600px] max-w-4xl overflow-y-auto">
          <div className="h-full w-full rounded">
            <div className="flex gap-3 h-full md:gap-8 flex-wrap">
              {/* single request */}
              {requests.map((request: any) => (
                <>
                  {!request.executed && <Request request={request} />}
                  {!request.executed && <Request request={request} />}
                </>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <>
          <h3 className="my-8 text-xl">No Pending Requests</h3>
          <div className="mx-auto flex w-fit max-w-xs items-center space-x-3 rounded-full border border-[#2FC816] bg-[#E8FFE8] px-4 py-3">
            <Bell stroke="#2FC816" />
            <span className="text-[#2FC816]">Send Payment requests OTG</span>
          </div>
        </>
      )}
    </>
  )
}

export default PendingRequests
