"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useTheme } from "next-themes"
import { motion } from "framer-motion"
import { MoonIcon, SunIcon, MonitorIcon } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import WalletConnect from "./WalletConnect"

export default function Header() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()
  const [scrolled, setScrolled] = useState(false)

  // Set mounted to true on client side
  useEffect(() => setMounted(true), [])

  // Check for user's preferred color scheme on first load
  useEffect(() => {
    if (!mounted) return

    // If no theme is set yet, check user's system preference
    if (!localStorage.getItem("theme")) {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
      setTheme(prefersDark ? "dark" : "light")
    }
  }, [mounted, setTheme])

  // Add scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <motion.header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/90 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Bright Doc</span>
            <div className="text-2xl font-bold text-foreground">
              Bright<span className="text-gradient">Doc</span>
            </div>
          </Link>
        </div>
        <div className="hidden md:flex gap-x-8">
          <Link
            href="#services"
            className="text-sm font-semibold leading-6 text-foreground hover:text-cyan-500 transition-colors"
            onClick={(e) => {
              e.preventDefault()
              scrollToSection("services")
            }}
          >
            Services
          </Link>
          <Link
            href="#portfolio"
            className="text-sm font-semibold leading-6 text-foreground hover:text-cyan-500 transition-colors"
            onClick={(e) => {
              e.preventDefault()
              scrollToSection("portfolio")
            }}
          >
            Portfolio
          </Link>
          <Link
            href="#about"
            className="text-sm font-semibold leading-6 text-foreground hover:text-cyan-500 transition-colors"
            onClick={(e) => {
              e.preventDefault()
              scrollToSection("about")
            }}
          >
            About
          </Link>
          <Link
            href="#news"
            className="text-sm font-semibold leading-6 text-foreground hover:text-cyan-500 transition-colors"
            onClick={(e) => {
              e.preventDefault()
              scrollToSection("news")
            }}
          >
            News
          </Link>
          <Link
            href="#faq"
            className="text-sm font-semibold leading-6 text-foreground hover:text-cyan-500 transition-colors"
            onClick={(e) => {
              e.preventDefault()
              scrollToSection("faq")
            }}
          >
            FAQ
          </Link>
          <Link
            href="#contact"
            className="text-sm font-semibold leading-6 text-foreground hover:text-cyan-500 transition-colors"
            onClick={(e) => {
              e.preventDefault()
              scrollToSection("contact")
            }}
          >
            Contact
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <WalletConnect />

          {mounted && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button
                        aria-label="Toggle theme"
                        className="rounded-full p-2 bg-accent/10 text-accent-foreground hover:bg-accent/20 transition-colors"
                      >
                        {theme === "dark" ? (
                          <MoonIcon className="h-5 w-5" />
                        ) : theme === "light" ? (
                          <SunIcon className="h-5 w-5" />
                        ) : (
                          <MonitorIcon className="h-5 w-5" />
                        )}
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => setTheme("light")}>
                        <SunIcon className="h-4 w-4 mr-2" />
                        <span>Light</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setTheme("dark")}>
                        <MoonIcon className="h-4 w-4 mr-2" />
                        <span>Dark</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setTheme("system")}>
                        <MonitorIcon className="h-4 w-4 mr-2" />
                        <span>System</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Change theme</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
      </nav>
    </motion.header>
  )
}

