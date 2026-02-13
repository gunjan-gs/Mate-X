"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Logo } from "@/components/brand/logo"
import { 
  LayoutDashboard, 
  Calendar, 
  BookOpen, 
  LogOut,
  ChevronLeft,
  ChevronRight,
  Menu,
  GraduationCap
} from "lucide-react"

const sidebarItems = [
  { icon: LayoutDashboard, label: "Overview", href: "/dashboard" },
  { icon: Calendar, label: "Schedule", href: "/dashboard/schedule" },
  { icon: BookOpen, label: "Focus", href: "/dashboard/focus" },
  { icon: GraduationCap, label: "AI Tutor", href: "/dashboard/tutor" },
]

export function AppSidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)

  return (
    <motion.aside 
        initial={false}
        animate={{ width: collapsed ? 80 : 260 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="hidden md:flex flex-col h-[95vh] sticky top-[2.5vh] ml-4 bg-black/20 backdrop-blur-3xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)] z-40 overflow-hidden relative"
        style={{ borderRadius: "24px" }}
    >
      {/* Noise Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      
      {/* Subtle Color Orbs (Iridescence) */}
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-indigo-500/20 blur-[60px] rounded-full pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-purple-500/10 blur-[60px] rounded-full pointer-events-none" />

      {/* Header */}
      <div className="relative flex h-24 items-center justify-between px-6 z-10">
        <Link href="/" className="flex items-center gap-4 group">
          <div className="relative transform transition-transform duration-500 group-hover:rotate-180">
             <Logo size="sm" showText={false} />
          </div>
          
          <AnimatePresence>
            {!collapsed && (
                <motion.div 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                    className="flex flex-col"
                >
                    <span className="font-bold tracking-widest text-lg uppercase text-white">Mate-X</span>
                </motion.div>
            )}
          </AnimatePresence>
        </Link>
      </div>

      {/* Navigation */}
      <div className="flex-1 px-4 py-8 space-y-4 relative z-10">
          {sidebarItems.map((item) => {
             const isActive = pathname === item.href
             return (
              <Link
                key={item.href}
                href={item.href}
                className="group relative block outline-none"
              >
                  {/* Hover Beam (Purple Tint) */}
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-0 bg-indigo-400 group-hover:h-6 transition-all duration-300 rounded-full opacity-0 group-hover:opacity-100 shadow-[0_0_12px_rgba(129,140,248,0.8)]" />

                  {/* Active State: Glass Card with Tint */}
                  {isActive && (
                      <motion.div 
                        layoutId="crystal-active"
                        className="absolute inset-0 bg-white/5 border border-white/10 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)] rounded-xl backdrop-blur-md"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      >
                          {/* Inner Gradient for Active */}
                          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-transparent rounded-xl" />
                      </motion.div>
                  )}

                <div className={cn(
                  "relative flex items-center gap-4 px-3 py-3 rounded-xl transition-all duration-300",
                  collapsed ? "justify-center px-0" : "",
                  isActive ? "text-white" : "text-white/40 group-hover:text-white/80"
                )}>
                  <item.icon strokeWidth={1.5} className={cn(
                      "h-5 w-5 shrink-0 transition-transform duration-300", 
                      isActive && "scale-105 drop-shadow-[0_0_8px_rgba(165,180,252,0.5)] text-indigo-200"
                  )} />
                  
                  <AnimatePresence>
                    {!collapsed && (
                        <motion.span 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="font-light tracking-wide text-sm"
                        >
                            {item.label}
                        </motion.span>
                    )}
                  </AnimatePresence>
                </div>
              </Link>
             )
          })}
      </div>

      {/* Footer */}
      <div className="p-6 relative z-10 border-t border-white/5">
        <Link href="/dashboard/profile" className={cn(
            "flex items-center gap-3 transition-opacity duration-300 group/profile",
            collapsed ? "justify-center" : ""
        )}>
          {/* Minimal Avatar */}
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center border border-white/10 shadow-inner group-hover/profile:border-white/30 transition-colors">
             <span className="text-[10px] font-medium text-white/80 group-hover/profile:text-white">DU</span>
          </div>
          
          <AnimatePresence>
            {!collapsed && (
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex-1 overflow-hidden"
                >
                    <p className="truncate text-xs font-medium text-white/80 group-hover/profile:text-white transition-colors">Demo User</p>
                    <p className="truncate text-[10px] text-white/30">Pro Plan</p>
                </motion.div>
            )}
          </AnimatePresence>
        </Link>
        
        {/* Toggle */}
        <button 
            onClick={() => setCollapsed(!collapsed)}
            className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-black border border-white/20 flex items-center justify-center text-white/50 hover:text-white hover:border-white/50 transition-all opacity-0 group-hover:opacity-100 shadow-xl z-50 overflow-hidden"
        >
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="relative z-10">
                {collapsed ? <ChevronRight className="h-3 w-3" /> : <ChevronLeft className="h-3 w-3" />}
            </span>
        </button>
      </div>
    </motion.aside>
  )
}
