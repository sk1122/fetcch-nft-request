"use client"

import { useState } from "react"
import Image from "next/image"
import { useSearchParams } from "next/navigation"
import { useWallet as useAptosWallet } from "@aptos-labs/wallet-adapter-react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { useFilter } from "@react-aria/i18n"
import { useWallet } from "@solana/wallet-adapter-react"
import { Connection, VersionedTransaction } from "@solana/web3.js"
import * as aptos from "aptos"
import base58 from "bs58"
import { Loader2, X } from "lucide-react"
import toast from "react-hot-toast"
import { formatUnits } from "viem"
import {
  useAccount,
  useNetwork,
  useSendTransaction,
  useSwitchNetwork,
} from "wagmi"

import {
  aptosChainData,
  Chain,
  evmChainData,
  solanaChainData,
  Token,
} from "@/lib/data"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { useConnectedWallet } from "./providers/providers"
// remove this
import nftImage from "@/public/assets/nftcardimage.png"
import NftCard from "./nft-card"

const SendPayment = ({
  receiver,
  token,
  amount,
  decimals,
  tokenName,
  chain,
  id,
}: {
  receiver: string
  token: string
  amount: string
  decimals: number
  tokenName: string
  chain: number
  id: number
}) => {
  const [loading, setLoading] = useState(false)
  const [chainData, setChainData] = useState<Chain[]>([
    ...evmChainData,
    ...solanaChainData,
    ...aptosChainData,
  ])

  const { addressChain, connectedWallet } = useConnectedWallet()

  const { address: accountAddress } = useAccount()
  const {
    connected: isSolanaConnected,
    publicKey,
    sendTransaction,
  } = useWallet()
  const {
    connected: isAptosConnected,
    account,
    signAndSubmitBCSTransaction,
  } = useAptosWallet()

  const { sendTransactionAsync } = useSendTransaction()

  const searchParams = useSearchParams()

  const selectedChain = chain
  const selectedToken = token

  console.log(selectedChain, selectedToken, "dsa")

  let { contains } = useFilter({
    sensitivity: "base",
  })

  const selectedChainData: Chain[] = selectedChain
    ? chainData.filter((chain) => selectedChain === chain.id)
    : []

  let selectedTokenData: Token[] =
    (selectedChainData && selectedToken
      ? selectedChainData[0].tokens.filter((token) =>
          contains(token.address, selectedToken)
        )
      : []) ?? []

  const tokenImg = selectedTokenData && selectedTokenData[0]?.logoURI
  const chainImg = selectedChainData && selectedChainData[0]?.logoURI

  console.log("🔗 ", chainData[0].name)

  const { chains, pendingChainId, switchNetworkAsync } = useSwitchNetwork()
  const { chain: chainD } = useNetwork()

  const pay = async () => {
    const toastId = toast.loading("Executing payment...")
    try {
      setLoading(true)
      const actions = {
        actions: [
          {
            type: "PAYMENT",
            data: {
              receiver: receiver,
              token,
              chain: chain,
              amount: {
                amount,
                currency: "CRYPTO",
              },
              payer:
                connectedWallet === "evm"
                  ? accountAddress
                  : connectedWallet === "solana"
                  ? publicKey?.toBase58()
                  : account?.address.toString(),
              fromChain: selectedChainData[0].id,
              fromToken: (selectedTokenData![0] as Token).address,
            },
          },
        ],
      }

      const req = await fetch("/api/buildTransaction", {
        method: "POST",
        body: JSON.stringify(actions),
      })

      const res = await req.json()

      console.log(res)
      const transactions = res.data[0]

      console.log(res, transactions)

      for (let i = 0; i < transactions.length; i++) {
        const tx = transactions[i]

        console.log(tx, "transaction")

        let hash = ""
        if (connectedWallet === "evm") {
          if (chainD?.id !== selectedChainData[0].chainId)
            await switchNetworkAsync!(selectedChainData[0].chainId)

          console.log({
            ...tx.tx,
            gasPrice: undefined,
          })
          const transaction = await sendTransactionAsync({
            ...tx.tx,
            gasPrice: undefined,
          })

          console.log(transaction)

          hash = transaction.hash
        } else if (connectedWallet === "solana") {
          const txData = VersionedTransaction.deserialize(base58.decode(tx.tx))
          const connection = new Connection(
            "https://solana-mainnet.g.alchemy.com/v2/LZLe8tHrIZ06MnZlxn-L4Fo5aj7iIdgI"
          )

          const transaction = await sendTransaction!(txData, connection)

          console.log(transaction)

          hash = transaction
        } else if (connectedWallet === "aptos") {
          const txData = aptos.TxnBuilderTypes.RawTransaction.deserialize(
            new aptos.BCS.Deserializer(base58.decode(tx.tx))
          )

          const transaction = await signAndSubmitBCSTransaction(txData)

          console.log(transaction)

          hash = transaction
        }

        if (
          transactions.length === 1 ||
          (tx.type &&
            (tx.type === "PAYMENT_TOKEN" ||
              tx.type === "OTHER" ||
              tx.type === "PAYMENT_NATIVE"))
        ) {
          await fetch("/api/updatePaymentRequest", {
            method: "POST",
            body: JSON.stringify({
              id: Number(id),
              executed: true,
              payer:
                connectedWallet === "evm"
                  ? accountAddress
                  : connectedWallet === "solana"
                  ? publicKey?.toBase58()
                  : account?.address.toString(),
              actions: [
                {
                  type: actions.actions[0].type,
                  data: actions.actions[0].data,
                  executionData: {
                    hash,
                    chain: chain,
                    timestamp: new Date().getTime() / 1000,
                  },
                },
              ],
            }),
          })

          toast.success("Payment successfully done!", {
            id: toastId,
          })
        }
      }

      setLoading(false)
    } catch (e) {
      setLoading(false)
      toast.error("Error in executing payment, try again", {
        id: toastId,
      })
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="rounded-full border-none bg-primary px-2 py-1 text-sm font-semibold text-white shadow-[inset_0px_6px_4px_0px_rgba(255,255,255,0.2)] outline-none focus-visible:outline-none md:px-7 md:py-4 md:text-base">
          Send
        </button>
      </DialogTrigger>
      <DialogContent className="w-full p-6 sm:max-w-[392px] sm:rounded-[20px]">
        <DialogHeader className="flex w-full flex-row items-center justify-between">
          <DialogTitle className="font-manrope text-3xl font-semibold">
            Pay
          </DialogTitle>
          <DialogPrimitive.Close className="w-fit rounded-full border-2 border-primary p-2 opacity-70 transition-opacity hover:opacity-100 focus:outline-none disabled:pointer-events-none data-[state=open]:bg-primary data-[state=open]:text-primary">
            <X className="h-4 w-4 font-bold text-primary" strokeWidth={4} />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        </DialogHeader>
        <div className="flex w-full flex-col space-y-5">
          <div className="flex flex-col space-y-4">
            <h3 className="text-xl">Confirm Transaction to</h3>
            <div className="flex items-center space-x-3">
              {/* replace below image with user avatar */}
              <Image
                src={tokenImg}
                alt="token_image"
                priority
                className="rounded-full"
                width={32}
                height={32}
              />
              <span className="w-72 truncate text-lg font-semibold text-primary">
              Steve.Deen@phantom
              </span>
            </div>
          </div>
          <div className="flex flex-col space-y-4">
            <h5 className="text-xl font-semibold">NFT</h5>
            <div className="w-full flex justify-center">
            <div className="w-40">
              <NftCard name='Gadiator123 #1341' creator='by duelist duos' nftImage={nftImage} />
            </div>
            </div>
          </div>
          {/* pay button */}
          <button
            onClick={() => pay()}
            className="flex w-full items-center justify-center rounded-full bg-primary py-4 text-white"
          >
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            <span>Send</span>
          </button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default SendPayment
