"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"

const testimonials = [
  {
    id: 1,
    name: "Alex Chen",
    position: "CTO, CryptoVentures",
    image: "/placeholder.svg?height=100&width=100",
    quote:
      "Bright Doc transformed our blockchain infrastructure with their innovative smart contract solutions. Their expertise in DeFi protocols helped us launch our platform months ahead of schedule.",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    position: "Founder, NFT Collective",
    image: "/placeholder.svg?height=100&width=100",
    quote:
      "Working with Bright Doc on our NFT marketplace was a game-changer. Their team's deep understanding of both the technical and artistic aspects of NFTs resulted in a platform that artists and collectors love.",
  },
  {
    id: 3,
    name: "Michael Rodriguez",
    position: "Head of Innovation, BlockBank",
    image: "/placeholder.svg?height=100&width=100",
    quote:
      "Bright Doc's security-first approach to blockchain development gave us the confidence to move forward with our decentralized banking solution. Their audit process is thorough and their recommendations were invaluable.",
  },
]

export default function BlockchainTestimonials() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(0)

  const next = () => {
    setDirection(1)
    setCurrent((current + 1) % testimonials.length)
  }

  const prev = () => {
    setDirection(-1)
    setCurrent((current - 1 + testimonials.length) % testimonials.length)
  }

  // Auto-advance testimonials
  useEffect(() => {
    const timer = setTimeout(() => {
      next()
    }, 8000)

    return () => clearTimeout(timer)
  }, [current])

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  }

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl">What Our Clients Say</h2>
          <p className="mt-4 text-lg text-muted-foreground">Hear from blockchain innovators who've partnered with us</p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          <div className="absolute -top-12 left-0 text-accent opacity-20">
            <Quote size={80} />
          </div>

          <div className="relative overflow-hidden h-[300px]">
            <AnimatePresence custom={direction} initial={false}>
              <motion.div
                key={current}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="absolute w-full h-full flex flex-col items-center justify-center px-4"
              >
                <div className="mb-6">
                  <div className="relative h-20 w-20 rounded-full overflow-hidden border-4 border-accent/20">
                    <Image
                      src={testimonials[current].image || "/placeholder.svg"}
                      alt={testimonials[current].name}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <blockquote className="text-xl text-center mb-6 max-w-2xl">"{testimonials[current].quote}"</blockquote>
                <div className="text-center">
                  <div className="font-bold text-lg">{testimonials[current].name}</div>
                  <div className="text-muted-foreground">{testimonials[current].position}</div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > current ? 1 : -1)
                  setCurrent(index)
                }}
                className={`w-3 h-3 rounded-full transition-colors ${index === current ? "bg-accent" : "bg-accent/20"}`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

          <button
            onClick={prev}
            className="absolute top-1/2 left-0 -translate-y-1/2 bg-background/80 backdrop-blur-sm p-2 rounded-full shadow-lg text-foreground hover:text-accent transition-colors"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={24} />
          </button>

          <button
            onClick={next}
            className="absolute top-1/2 right-0 -translate-y-1/2 bg-background/80 backdrop-blur-sm p-2 rounded-full shadow-lg text-foreground hover:text-accent transition-colors"
            aria-label="Next testimonial"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </section>
  )
}

