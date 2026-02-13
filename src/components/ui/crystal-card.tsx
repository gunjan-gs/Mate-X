import { cn } from "@/lib/utils"
import { ReactNode } from "react"

interface CrystalCardProps {
  children: ReactNode
  className?: string
}

export function CrystalCard({ children, className }: CrystalCardProps) {
  return (
    <div 
      className={cn(
        "relative overflow-hidden rounded-[24px] border border-white/10 bg-black/20 backdrop-blur-3xl shadow-[0_8px_32px_rgba(0,0,0,0.3)]",
        className
      )}
    >
      {/* Noise Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      
      {/* Subtle Top Gradient Fade (optional, like sidebar) */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 h-full">
        {children}
      </div>
    </div>
  )
}
