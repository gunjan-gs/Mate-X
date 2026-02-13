"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Logo } from "@/components/brand/logo"
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { Menu, X } from "lucide-react"

export function Navbar() {
  const { scrollY } = useScroll()
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 20)
  })

  // Lock body scroll when menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
        document.body.style.overflow = 'hidden'
    } else {
        document.body.style.overflow = 'unset'
    }
  }, [mobileMenuOpen])

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none">
        
      <motion.header
        layout
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 100, damping: 20 }}
        className={cn(
            "pointer-events-auto flex items-center justify-between transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]",
            scrolled || mobileMenuOpen
                ? "mt-4 h-14 w-[90%] max-w-4xl rounded-full border border-white/10 bg-black/40 backdrop-blur-3xl backdrop-saturate-150 shadow-2xl shadow-black/20 ring-1 ring-white/10"
                : "mt-0 h-20 w-full max-w-[1400px] rounded-none border-b border-transparent bg-transparent px-6"
        )}
      >
        {/* Glass Sheen (Subtle highlight) */}
        {(scrolled || mobileMenuOpen) && (
             <div className="absolute inset-x-0 top-0 mx-auto h-px w-3/4 bg-gradient-to-r from-transparent via-white/20 to-transparent blur-[1px]" />
        )}

        {/* Inner Container */}
        <div className={cn(
            "flex w-full items-center justify-between",
            (scrolled || mobileMenuOpen) ? "px-2" : "px-4"
        )}>
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2 transition-opacity hover:opacity-90 relative z-50">
                <Logo size={scrolled || mobileMenuOpen ? "sm" : "md"} showText={!scrolled && !mobileMenuOpen} />
            </Link>
            
            {/* Nav Links - Desktop */}
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
                <button onClick={() => document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })} className="transition-colors hover:text-foreground/80 text-foreground/60">
                    Features
                </button>
                <button onClick={() => document.getElementById("testimonials")?.scrollIntoView({ behavior: "smooth" })} className="transition-colors hover:text-foreground/80 text-foreground/60">
                    Trust
                </button>
                <button onClick={() => document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" })} className="transition-colors hover:text-foreground/80 text-foreground/60">
                    Pricing
                </button>
            </nav>
            
            {/* Actions & Mobile Toggle */}
            <div className="flex items-center gap-2">
                <div className="hidden md:flex items-center gap-2">
                    <Link href="/dashboard">
                        <Button variant="ghost" size={scrolled ? "sm" : "default"} className="text-foreground/80 hover:text-foreground">
                            Log in
                        </Button>
                    </Link>
                    <Link href="/dashboard">
                        <Button 
                            size={scrolled ? "sm" : "default"}
                            className={cn(
                                "transition-all",
                                scrolled ? "rounded-full px-4" : ""
                            )}
                        >
                            Get Started
                        </Button>
                    </Link>
                </div>

                {/* Mobile Menu Toggle */}
                <button 
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="md:hidden p-2 text-white/80 hover:text-white relative z-50"
                >
                    {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
            </div>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
            {mobileMenuOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.95 }}
                    className="absolute top-16 left-0 right-0 mx-auto w-[90%] max-w-sm bg-zinc-900/90 backdrop-blur-3xl border border-white/10 rounded-2xl p-6 shadow-2xl flex flex-col gap-4 text-center z-40"
                >
                    <div className="flex flex-col gap-2">
                        <button 
                            onClick={() => { setMobileMenuOpen(false); document.getElementById("features")?.scrollIntoView({ behavior: "smooth" }); }}
                            className="p-3 text-lg font-medium text-white/80 hover:text-white hover:bg-white/5 rounded-xl transition-colors"
                        >
                            Features
                        </button>
                        <button 
                            onClick={() => { setMobileMenuOpen(false); document.getElementById("testimonials")?.scrollIntoView({ behavior: "smooth" }); }}
                            className="p-3 text-lg font-medium text-white/80 hover:text-white hover:bg-white/5 rounded-xl transition-colors"
                        >
                            Trust
                        </button>
                        <button 
                            onClick={() => { setMobileMenuOpen(false); document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" }); }}
                            className="p-3 text-lg font-medium text-white/80 hover:text-white hover:bg-white/5 rounded-xl transition-colors"
                        >
                            Pricing
                        </button>
                    </div>
                    <div className="h-px bg-white/10 w-full" />
                    <div className="flex flex-col gap-3">
                         <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                            <Button variant="ghost" className="w-full text-lg h-12">Log in</Button>
                        </Link>
                        <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                            <Button className="w-full text-lg h-12 bg-white text-black hover:bg-white/90">Get Started</Button>
                        </Link>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>

      </motion.header>
    </div>
  )
}
