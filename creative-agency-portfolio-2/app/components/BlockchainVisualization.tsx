"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

export default function BlockchainVisualization() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = canvas.clientWidth
      canvas.height = canvas.clientHeight
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Block class
    class Block {
      x: number
      y: number
      size: number
      color: string
      connections: Block[]
      speed: number
      angle: number

      constructor(x: number, y: number, size: number, color: string) {
        this.x = x
        this.y = y
        this.size = size
        this.color = color
        this.connections = []
        this.speed = 0.2 + Math.random() * 0.3
        this.angle = Math.random() * Math.PI * 2
      }

      update() {
        this.angle += 0.01
        this.x += Math.cos(this.angle) * this.speed
        this.y += Math.sin(this.angle) * this.speed

        // Bounce off walls
        if (this.x < this.size || this.x > canvas.width - this.size) {
          this.angle = Math.PI - this.angle
        }
        if (this.y < this.size || this.y > canvas.height - this.size) {
          this.angle = -this.angle
        }
      }

      draw() {
        if (!ctx) return

        // Draw connections
        this.connections.forEach((block) => {
          ctx.beginPath()
          ctx.moveTo(this.x, this.y)
          ctx.lineTo(block.x, block.y)
          ctx.strokeStyle = "rgba(100, 200, 200, 0.2)"
          ctx.lineWidth = 1
          ctx.stroke()
        })

        // Draw block
        ctx.beginPath()
        ctx.rect(this.x - this.size / 2, this.y - this.size / 2, this.size, this.size)
        ctx.fillStyle = this.color
        ctx.fill()

        // Draw hash-like text
        ctx.fillStyle = "#ffffff"
        ctx.font = `${this.size / 5}px monospace`
        ctx.fillText("0x", this.x - this.size / 4, this.y + this.size / 10)
      }
    }

    // Create blocks
    const blocks: Block[] = []
    const numBlocks = 10
    const colors = ["#4ecdc4", "#45b7d8", "#5d5dff", "#6a82fb"]

    for (let i = 0; i < numBlocks; i++) {
      const size = 30 + Math.random() * 20
      const x = Math.random() * (canvas.width - size * 2) + size
      const y = Math.random() * (canvas.height - size * 2) + size
      const color = colors[Math.floor(Math.random() * colors.length)]

      blocks.push(new Block(x, y, size, color))
    }

    // Connect blocks in a chain
    for (let i = 1; i < blocks.length; i++) {
      blocks[i - 1].connections.push(blocks[i])
    }

    // Add some random connections to simulate a network
    for (let i = 0; i < 5; i++) {
      const a = Math.floor(Math.random() * blocks.length)
      const b = Math.floor(Math.random() * blocks.length)
      if (a !== b) {
        blocks[a].connections.push(blocks[b])
      }
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update and draw blocks
      blocks.forEach((block) => {
        block.update()
        block.draw()
      })

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
    }
  }, [])

  return (
    <motion.div
      className="w-full h-[400px] rounded-xl overflow-hidden shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <canvas ref={canvasRef} className="w-full h-full bg-gradient-to-br from-gray-900 to-gray-800" />
    </motion.div>
  )
}

