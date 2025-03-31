"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"

const faqs = [
  {
    question: "What is blockchain technology?",
    answer:
      "Blockchain is a distributed, decentralized ledger that records transactions across many computers. This ensures that any involved record cannot be altered retroactively, without the alteration of all subsequent blocks and the consensus of the network.",
  },
  {
    question: "What are NFTs?",
    answer:
      "NFTs (Non-Fungible Tokens) are unique digital assets that represent ownership of a specific item or piece of content on the blockchain. Unlike cryptocurrencies, each NFT has distinct value and cannot be exchanged on a one-to-one basis.",
  },
  {
    question: "How do smart contracts work?",
    answer:
      "Smart contracts are self-executing contracts with the terms directly written into code. They automatically execute actions when predetermined conditions are met, eliminating the need for intermediaries and enabling trustless transactions.",
  },
  {
    question: "What is DeFi?",
    answer:
      "DeFi (Decentralized Finance) refers to financial services built on blockchain technologies that operate without centralized authorities like banks. This includes lending, borrowing, trading, and earning interest on crypto assets.",
  },
  {
    question: "How secure is blockchain technology?",
    answer:
      "Blockchain is highly secure due to its decentralized nature and cryptographic principles. Each transaction is verified by multiple nodes, making it extremely difficult to alter records. However, smart contract vulnerabilities and private key management remain important security considerations.",
  },
  {
    question: "What blockchain platforms do you work with?",
    answer:
      "At Bright Doc, we specialize in multiple blockchain platforms including Ethereum, Solana, Polygon, Binance Smart Chain, and more. We select the most appropriate platform based on your specific project requirements and goals.",
  },
]

export default function BlockchainFAQ() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index)
  }

  return (
    <section id="faq" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl">Frequently Asked Questions</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Everything you need to know about blockchain technology and our services
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className="mb-4 border border-border rounded-lg overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <button
                className="w-full flex justify-between items-center p-4 text-left bg-secondary/20 hover:bg-secondary/30 transition-colors"
                onClick={() => toggleExpand(index)}
              >
                <span className="font-medium">{faq.question}</span>
                <motion.div animate={{ rotate: expandedIndex === index ? 180 : 0 }} transition={{ duration: 0.3 }}>
                  <ChevronDown className="h-5 w-5 text-muted-foreground" />
                </motion.div>
              </button>
              <AnimatePresence>
                {expandedIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="p-4 bg-background">
                      <p className="text-muted-foreground">{faq.answer}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

