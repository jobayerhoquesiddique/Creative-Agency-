"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowUpIcon, ArrowDownIcon } from "lucide-react"

interface CryptoPrice {
  id: string
  name: string
  symbol: string
  price: number
  change24h: number
  icon: string
}

// Mock data - in a real app, this would come from an API
const initialCryptoData: CryptoPrice[] = [
  {
    id: "bitcoin",
    name: "Bitcoin",
    symbol: "BTC",
    price: 65432.1,
    change24h: 2.34,
    icon: "₿",
  },
  {
    id: "ethereum",
    name: "Ethereum",
    symbol: "ETH",
    price: 3521.87,
    change24h: -1.23,
    icon: "Ξ",
  },
  {
    id: "solana",
    name: "Solana",
    symbol: "SOL",
    price: 142.56,
    change24h: 5.67,
    icon: "◎",
  },
  {
    id: "cardano",
    name: "Cardano",
    symbol: "ADA",
    price: 0.58,
    change24h: -0.45,
    icon: "₳",
  },
  {
    id: "polkadot",
    name: "Polkadot",
    symbol: "DOT",
    price: 7.89,
    change24h: 3.21,
    icon: "●",
  },
]

export default function CryptoPriceTracker() {
  const [cryptoData, setCryptoData] = useState<CryptoPrice[]>(initialCryptoData)
  const [isVisible, setIsVisible] = useState(true)

  // Simulate price updates
  useEffect(() => {
    const interval = setInterval(() => {
      setCryptoData((prevData) =>
        prevData.map((crypto) => ({
          ...crypto,
          price: crypto.price * (1 + (Math.random() * 0.01 - 0.005)),
          change24h: crypto.change24h + (Math.random() * 0.4 - 0.2),
        })),
      )
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-md border-t border-border">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-2">
          <div className="flex-1 overflow-hidden">
            {isVisible && (
              <motion.div
                className="flex space-x-8 items-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {cryptoData.map((crypto) => (
                  <div key={crypto.id} className="flex items-center space-x-2 min-w-max">
                    <span className="text-xl font-bold">{crypto.icon}</span>
                    <div>
                      <span className="font-medium">{crypto.symbol}</span>
                      <div className="flex items-center">
                        <span className="font-mono">
                          $
                          {crypto.price.toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </span>
                        <span
                          className={`ml-2 flex items-center text-xs ${crypto.change24h >= 0 ? "text-green-500" : "text-red-500"}`}
                        >
                          {crypto.change24h >= 0 ? (
                            <ArrowUpIcon className="h-3 w-3 mr-1" />
                          ) : (
                            <ArrowDownIcon className="h-3 w-3 mr-1" />
                          )}
                          {Math.abs(crypto.change24h).toFixed(2)}%
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
          </div>
          <button
            onClick={() => setIsVisible(!isVisible)}
            className="ml-4 px-2 py-1 text-xs rounded bg-accent/20 hover:bg-accent/30 transition-colors"
          >
            {isVisible ? "Hide" : "Show"} Prices
          </button>
        </div>
      </div>
    </div>
  )
}

