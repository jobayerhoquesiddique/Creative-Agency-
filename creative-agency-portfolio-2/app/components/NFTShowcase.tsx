"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const nfts = [
  {
    id: 1,
    name: "Cosmic Voyager #42",
    description: "A journey through the digital cosmos",
    image: "/placeholder.svg?height=400&width=400",
    price: 0.85,
    creator: "0x71C7...976F",
    collection: "Cosmic Voyagers",
  },
  {
    id: 2,
    name: "Digital Dreamscape #17",
    description: "Where reality meets imagination",
    image: "/placeholder.svg?height=400&width=400",
    price: 1.2,
    creator: "0x8fC7...A43D",
    collection: "Dreamscapes",
  },
  {
    id: 3,
    name: "Quantum Fragment #103",
    description: "A piece of the quantum realm",
    image: "/placeholder.svg?height=400&width=400",
    price: 0.5,
    creator: "0x3eB2...F19A",
    collection: "Quantum Fragments",
  },
]

export default function NFTShowcase() {
  const [selectedNFT, setSelectedNFT] = useState<number | null>(null)
  const [mintingId, setMintingId] = useState<number | null>(null)
  const [mintedIds, setMintedIds] = useState<number[]>([])

  const handleMint = (id: number) => {
    setMintingId(id)

    // Simulate minting process
    setTimeout(() => {
      setMintingId(null)
      setMintedIds([...mintedIds, id])
    }, 2000)
  }

  return (
    <section className="py-20 bg-gradient-to-b from-background to-secondary/10">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl">Featured NFTs</h2>
          <p className="mt-4 text-lg text-muted-foreground">Explore and mint our exclusive digital collectibles</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {nfts.map((nft) => (
            <motion.div
              key={nft.id}
              layoutId={`nft-card-${nft.id}`}
              className="cursor-pointer"
              whileHover={{ y: -5 }}
              onClick={() => setSelectedNFT(nft.id)}
            >
              <Card className="overflow-hidden border-2 hover:border-accent/50 transition-colors">
                <div className="relative aspect-square">
                  <Image src={nft.image || "/placeholder.svg"} alt={nft.name} fill className="object-cover" />
                </div>
                <CardHeader className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{nft.name}</CardTitle>
                      <CardDescription>{nft.collection}</CardDescription>
                    </div>
                    <Badge variant="outline" className="bg-accent/10">
                      {nft.price} ETH
                    </Badge>
                  </div>
                </CardHeader>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedNFT !== null && (
          <motion.div
            className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedNFT(null)}
          >
            <motion.div
              layoutId={`nft-card-${selectedNFT}`}
              className="bg-background rounded-xl overflow-hidden max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-square">
                <Image
                  src={nfts[selectedNFT - 1].image || "/placeholder.svg"}
                  alt={nfts[selectedNFT - 1].name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2">{nfts[selectedNFT - 1].name}</h3>
                <p className="text-muted-foreground mb-4">{nfts[selectedNFT - 1].description}</p>

                <div className="flex justify-between items-center mb-6">
                  <div>
                    <p className="text-sm text-muted-foreground">Creator</p>
                    <p className="font-mono">{nfts[selectedNFT - 1].creator}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Price</p>
                    <p className="font-bold">{nfts[selectedNFT - 1].price} ETH</p>
                  </div>
                </div>

                <Button
                  className="w-full"
                  disabled={mintingId === selectedNFT || mintedIds.includes(selectedNFT)}
                  onClick={() => handleMint(selectedNFT)}
                >
                  {mintingId === selectedNFT ? (
                    <>
                      <div className="mr-2 h-4 w-4 rounded-full border-2 border-current border-t-transparent animate-spin" />
                      Minting...
                    </>
                  ) : mintedIds.includes(selectedNFT) ? (
                    "Minted"
                  ) : (
                    "Mint Now"
                  )}
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

