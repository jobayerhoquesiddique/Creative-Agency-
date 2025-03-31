"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

const projects = [
  {
    id: 1,
    title: "Genesis NFT Collection",
    description: "Limited edition digital art collection on Ethereum",
    imageUrl: "/placeholder.svg?height=600&width=800",
    category: "NFT",
  },
  {
    id: 2,
    title: "DeFi Lending Platform",
    description: "Decentralized lending protocol with multi-chain support",
    imageUrl: "/placeholder.svg?height=800&width=600",
    category: "DeFi",
  },
  {
    id: 3,
    title: "Crypto Wallet App",
    description: "Secure and user-friendly cryptocurrency wallet",
    imageUrl: "/placeholder.svg?height=600&width=800",
    category: "Wallet",
  },
  {
    id: 4,
    title: "Metaverse Land Sale",
    description: "Virtual real estate marketplace for the metaverse",
    imageUrl: "/placeholder.svg?height=800&width=600",
    category: "Metaverse",
  },
  {
    id: 5,
    title: "DAO Governance System",
    description: "Decentralized autonomous organization voting platform",
    imageUrl: "/placeholder.svg?height=600&width=800",
    category: "DAO",
  },
  {
    id: 6,
    title: "Play-to-Earn Game",
    description: "Blockchain-based gaming with tokenized rewards",
    imageUrl: "/placeholder.svg?height=800&width=600",
    category: "GameFi",
  },
]

const categories = ["All", ...new Set(projects.map((project) => project.category))]

export default function PortfolioGrid() {
  const [filter, setFilter] = useState("All")

  const filteredProjects = filter === "All" ? projects : projects.filter((project) => project.category === filter)

  return (
    <section id="portfolio" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl">Our Projects</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Innovative blockchain solutions we've delivered for our clients
          </p>
        </motion.div>

        <div className="flex justify-center space-x-4 mb-8 flex-wrap gap-y-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                filter === category
                  ? "bg-accent text-accent-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-background rounded-3xl shadow-lg overflow-hidden hover-lift transition-all duration-300 ease-in-out border-2 border-transparent hover:border-accent/30"
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={project.imageUrl || "/placeholder.svg"}
                    alt={project.title}
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform duration-300 ease-in-out group-hover:scale-105"
                  />
                  <motion.div
                    className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 transition-opacity duration-300"
                    whileHover={{ opacity: 1 }}
                  >
                    <p className="text-white text-center px-4">{project.description}</p>
                  </motion.div>
                </div>
                <div className="p-6">
                  <div className="text-sm font-medium text-cyan-500 mb-1">{project.category}</div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">{project.title}</h3>
                  <a href="#contact" className="text-cyan-500 hover:underline inline-flex items-center">
                    View Details
                    <svg
                      className="w-4 h-4 ml-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}

