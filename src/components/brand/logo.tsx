"use client"

import { ComponentProps } from "react"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

interface LogoProps extends ComponentProps<"div"> {
  showText?: boolean
  size?: "sm" | "md" | "lg" | "xl"
}

export function Logo({ showText = true, size = "md", className, ...props }: LogoProps) {
  const sizeClasses = {
    sm: "h-6 w-6",
    md: "h-12 w-12",
    lg: "h-16 w-16",
    xl: "h-24 w-24",
  }
  
  const textClasses = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-3xl",
    xl: "text-5xl",
  }

  // Animation: Flapping Wings / Book Opening
  const wingVariants = {
    initial: { rotateZ: 0 },
    flap: {
      rotateZ: [0, -10, 0], // Flap simulation
      transition: {
        duration: 2,
        ease: "easeInOut" as const,
        repeat: Infinity,
        repeatDelay: 0.5
      }
    },
    hover: {
      rotateZ: -15,
      y: -5,
      transition: { duration: 0.3 }
    }
  }

  return (
    <div className={cn("flex items-center gap-3 select-none group/logo", className)} {...props}>
      <div className={cn("relative flex items-center justify-center text-primary-foreground", sizeClasses[size])}>
        <motion.svg
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-xl"
          initial="initial"
          animate="flap"
          whileHover="hover"
        >
          <defs>
             <linearGradient id="wing-grad-left" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" /> {/* Sky 400 */}
                <stop offset="100%" stopColor="#0284c7" /> {/* Sky 600 */}
             </linearGradient>
             <linearGradient id="wing-grad-right" x1="100%" y1="0%" x2="0%" y2="100%">
                 <stop offset="0%" stopColor="#818cf8" /> {/* Indigo 400 */}
                 <stop offset="100%" stopColor="#4f46e5" /> {/* Indigo 600 */}
             </linearGradient>
             
             <filter id="wind-blur">
                <feGaussianBlur stdDeviation="1" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="arithmetic" k2="1" k3="0.5" />
             </filter>
          </defs>

          {/* 
            Concept: "Knowledge Takes Flight"
            A stylized open book that looks like a Bird/Wings.
            The outline forms the letter "M".
          */}

          {/* Left Wing (Page Stack) - Forms Left half of M */}
          {/* Pivot point at bottom center (32, 52) */}
          <motion.g style={{ originX: "32px", originY: "52px" }} variants={wingVariants}>
              <path 
                d="M32 52 L12 24 L12 16 L32 36 Z" 
                fill="url(#wing-grad-left)" 
                className="opacity-90"
              />
              {/* Page Layers for Detail */}
              <path d="M32 52 L16 26" stroke="white" strokeWidth="0.5" strokeOpacity="0.5" />
              <path d="M32 52 L20 28" stroke="white" strokeWidth="0.5" strokeOpacity="0.5" />
          </motion.g>

          {/* Right Wing (Page Stack) - Forms Right half of M */}
          {/* Pivot point at bottom center (32, 52) */}
          <motion.g style={{ originX: "32px", originY: "52px" }} 
             variants={{
                 initial: { rotateZ: 0 },
                 flap: { rotateZ: [0, 10, 0], transition: { duration: 2, ease: "easeInOut" as const, repeat: Infinity, repeatDelay: 0.5 } },
                 hover: { rotateZ: 15, y: -5, transition: { duration: 0.3 } }
             }}
          >
              <path 
                d="M32 52 L52 24 L52 16 L32 36 Z" 
                fill="url(#wing-grad-right)" 
                className="opacity-90"
              />
              {/* Page Layers */}
              <path d="M32 52 L48 26" stroke="white" strokeWidth="0.5" strokeOpacity="0.5" />
              <path d="M32 52 L44 28" stroke="white" strokeWidth="0.5" strokeOpacity="0.5" />
          </motion.g>

          {/* Center Spine / Core */}
          <motion.path
             d="M32 54 L30 36 L32 32 L34 36 L32 54 Z"
             fill="#cbd5e1"
             animate={{ y: [0, -2, 0] }}
             transition={{ duration: 2, ease: "easeInOut" as const, repeat: Infinity, repeatDelay: 0.5 }}
          />
          
          {/* Floating Halo / "Mind" Ring above */}
          <motion.ellipse 
             cx="32" cy="12" rx="8" ry="2" 
             stroke="#38bdf8" strokeWidth="2"
             fill="none"
             animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.5, 1, 0.5] }}
             transition={{ duration: 3, repeat: Infinity }}
          />

          {/* Speed Lines (Wind) */}
          <motion.path d="M4 32 H12" stroke="#bae6fd" strokeWidth="1" strokeLinecap="round" animate={{ x: [-5, 5, -5], opacity: [0, 1, 0] }} transition={{ duration: 1.5, repeat: Infinity }} />
          <motion.path d="M60 40 H52" stroke="#c7d2fe" strokeWidth="1" strokeLinecap="round" animate={{ x: [5, -5, 5], opacity: [0, 1, 0] }} transition={{ duration: 1.5, delay: 0.5, repeat: Infinity }} />

        </motion.svg>
      </div>
      
      {showText && (
        <div className={cn("font-bold tracking-tight text-foreground flex items-center gap-0.5", textClasses[size])}>
          Mate -<span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-500">X</span>
        </div>
      )}
    </div>
  )
}
