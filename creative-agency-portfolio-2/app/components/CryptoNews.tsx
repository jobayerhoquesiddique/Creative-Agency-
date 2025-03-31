"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { Calendar, Clock, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const newsCategories = ["All", "Blockchain", "NFTs", "DeFi", "Regulation"]

const newsArticles = [
  {
    id: 1,
    title: "The Future of DeFi: Trends to Watch in 2025",
    excerpt:
      "Decentralized finance continues to evolve rapidly. Here are the key trends that will shape the DeFi landscape in the coming year.",
    image: "/placeholder.svg?height=300&width=500",
    date: "March 15, 2025",
    readTime: "5 min read",
    category: "DeFi",
  },
  {
    id: 2,
    title: "NFT Use Cases Beyond Digital Art",
    excerpt:
      "While digital art has dominated the NFT conversation, the technology has far-reaching applications across multiple industries.",
    image: "/placeholder.svg?height=300&width=500",
    date: "March 10, 2025",
    readTime: "4 min read",
    category: "NFTs",
  },
  {
    id: 3,
    title: "Regulatory Developments in Crypto: A Global Perspective",
    excerpt:
      "As governments worldwide develop frameworks for cryptocurrency regulation, we examine the implications for businesses and investors.",
    image: "/placeholder.svg?height=300&width=500",
    date: "March 5, 2025",
    readTime: "6 min read",
    category: "Regulation",
  },
  {
    id: 4,
    title: "Layer 2 Solutions: Scaling Blockchain for Mass Adoption",
    excerpt:
      "Layer 2 scaling solutions are addressing blockchain's scalability challenges. Here's how they're paving the way for mainstream adoption.",
    image: "/placeholder.svg?height=300&width=500",
    date: "February 28, 2025",
    readTime: "7 min read",
    category: "Blockchain",
  },
]

export default function CryptoNews() {
  const [activeCategory, setActiveCategory] = useState("All")

  const filteredArticles =
    activeCategory === "All" ? newsArticles : newsArticles.filter((article) => article.category === activeCategory)

  return (
    <section id="news" className="py-20 bg-secondary/20">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl">Latest Blockchain News</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Stay updated with the latest developments in the blockchain space
          </p>
        </motion.div>

        <Tabs defaultValue="All" className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList>
              {newsCategories.map((category) => (
                <TabsTrigger key={category} value={category} onClick={() => setActiveCategory(category)}>
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          <TabsContent value={activeCategory} className="mt-0">
            <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
              {filteredArticles.map((article) => (
                <motion.div
                  key={article.id}
                  className="bg-background rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="relative h-48">
                    <Image
                      src={article.image || "/placeholder.svg"}
                      alt={article.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 bg-accent/80 backdrop-blur-sm text-accent-foreground rounded-full text-xs font-medium">
                        {article.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">{article.title}</h3>
                    <p className="text-muted-foreground mb-4">{article.excerpt}</p>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span className="mr-4">{article.date}</span>
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{article.readTime}</span>
                      </div>
                      <Button variant="ghost" size="sm" className="text-primary">
                        Read More <ArrowRight className="ml-1 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}

