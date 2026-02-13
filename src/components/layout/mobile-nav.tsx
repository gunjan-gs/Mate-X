"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { 
  LayoutDashboard, 
  Calendar, 
  BookOpen, 
  GraduationCap,
  User
} from "lucide-react"

const navItems = [
  { icon: LayoutDashboard, label: "Home", href: "/dashboard" },
  { icon: Calendar, label: "Schedule", href: "/dashboard/schedule" },
  { icon: BookOpen, label: "Focus", href: "/dashboard/focus" },
  { icon: GraduationCap, label: "Tutor", href: "/dashboard/tutor" },
  { icon: User, label: "Profile", href: "/dashboard/profile" },
]

export function MobileNav() {
  const pathname = usePathname()

  return (
    <div className="md:hidden fixed bottom-6 left-6 right-6 z-50">
        <div className="flex items-center justify-between bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl p-2 shadow-2xl shadow-black/50">
            {navItems.map((item) => {
                const isActive = pathname === item.href
                return (
                    <Link 
                        key={item.href} 
                        href={item.href}
                        className={cn(
                            "flex flex-col items-center justify-center w-full py-2 rounded-xl transition-all",
                            isActive ? "bg-white/10 text-white" : "text-white/40 active:text-white/60"
                        )}
                    >
                        <item.icon className={cn("w-5 h-5", isActive && "fill-current text-indigo-400")} />
                        {/* <span className="text-[10px] mt-1 font-medium">{item.label}</span> */}
                    </Link>
                )
            })}
        </div>
    </div>
  )
}
