"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Wallet, X, ChevronRight, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const wallets = [
  {
    id: "metamask",
    name: "MetaMask",
    icon: "🦊",
    description: "Connect to your MetaMask wallet",
  },
  {
    id: "walletconnect",
    name: "WalletConnect",
    icon: "🔗",
    description: "Scan with WalletConnect to connect",
  },
  {
    id: "coinbase",
    name: "Coinbase Wallet",
    icon: "🪙",
    description: "Connect to your Coinbase wallet",
  },
  {
    id: "phantom",
    name: "Phantom",
    icon: "👻",
    description: "Connect to your Phantom wallet",
  },
]

export default function WalletConnect() {
  const [isOpen, setIsOpen] = useState(false)
  const [connecting, setConnecting] = useState<string | null>(null)
  const [connected, setConnected] = useState<string | null>(null)
  const [address, setAddress] = useState<string | null>(null)

  const handleConnect = (walletId: string) => {
    setConnecting(walletId)

    // Simulate connection process
    setTimeout(() => {
      setConnecting(null)
      setConnected(walletId)
      setAddress("0x71C7656EC7ab88b098defB751B7401B5f6d8976F")
      setTimeout(() => {
        setIsOpen(false)
      }, 1000)
    }, 2000)
  }

  const handleDisconnect = () => {
    setConnected(null)
    setAddress(null)
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button
            variant={connected ? "outline" : "default"}
            className={connected ? "border-green-500 text-green-500" : ""}
          >
            {connected ? (
              <>
                <Check className="mr-2 h-4 w-4" />
                {address ? `${address.slice(0, 6)}...${address.slice(-4)}` : "Connected"}
              </>
            ) : (
              <>
                <Wallet className="mr-2 h-4 w-4" />
                Connect Wallet
              </>
            )}
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Connect your wallet</DialogTitle>
            <DialogDescription>Connect your wallet to access exclusive blockchain features</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {wallets.map((wallet) => (
              <motion.button
                key={wallet.id}
                className={`flex items-center justify-between p-4 rounded-lg border ${
                  connecting === wallet.id
                    ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                    : connected === wallet.id
                      ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                      : "border-gray-200 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600"
                }`}
                onClick={() => connected !== wallet.id && handleConnect(wallet.id)}
                whileHover={{ scale: connected === wallet.id ? 1 : 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={connecting !== null}
              >
                <div className="flex items-center">
                  <span className="text-2xl mr-3">{wallet.icon}</span>
                  <div className="text-left">
                    <div className="font-medium">{wallet.name}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">{wallet.description}</div>
                  </div>
                </div>
                <div>
                  {connecting === wallet.id ? (
                    <div className="h-5 w-5 rounded-full border-2 border-blue-500 border-t-transparent animate-spin" />
                  ) : connected === wallet.id ? (
                    <Check className="h-5 w-5 text-green-500" />
                  ) : (
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  )}
                </div>
              </motion.button>
            ))}
          </div>
          {connected && (
            <Button
              variant="outline"
              className="mt-2 text-red-500 hover:text-red-600 border-red-200 hover:border-red-300"
              onClick={handleDisconnect}
            >
              <X className="mr-2 h-4 w-4" />
              Disconnect
            </Button>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}

