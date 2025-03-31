"use client"

import { motion } from "framer-motion"
import { Code, Paintbrush, Wallet, BarChart3, Shield, Coins } from "lucide-react"

const services = [
  {
    icon: <Code className="w-12 h-12 mb-4 text-cyan-500" />,
    title: "Smart Contract Development",
    description: "Custom smart contracts for DeFi, NFTs, and decentralized applications.",
  },
  {
    icon: <Paintbrush className="w-12 h-12 mb-4 text-teal-500" />,
    title: "NFT Creation & Minting",
    description: "End-to-end NFT development from artwork to marketplace deployment.",
  },
  {
    icon: <Wallet className="w-12 h-12 mb-4 text-cyan-500" />,
    title: "Crypto Wallet Integration",
    description: "Seamless wallet connections for your dApps and platforms.",
  },
  {
    icon: <BarChart3 className="w-12 h-12 mb-4 text-teal-500" />,
    title: "Tokenomics Design",
    description: "Strategic token economics planning for sustainable blockchain projects.",
  },
  {
    icon: <Shield className="w-12 h-12 mb-4 text-cyan-500" />,
    title: "Blockchain Security Audits",
    description: "Comprehensive security reviews to protect your blockchain assets.",
  },
  {
    icon: <Coins className="w-12 h-12 mb-4 text-teal-500" />,
    title: "DeFi Protocol Development",
    description: "Building decentralized finance solutions with cutting-edge technology.",
  },
]

export default function Services() {
  return (
    <section id="services" className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/30">
      <div className="container mx-auto">
        <motion.h2
          className="text-5xl font-black mb-16 text-center text-foreground"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Our Services
        </motion.h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              className="bg-background p-6 rounded-lg shadow-md border border-border"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              {service.icon}
              <h3 className="text-xl font-bold mb-2 text-foreground">{service.title}</h3>
              <p className="text-muted-foreground">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

