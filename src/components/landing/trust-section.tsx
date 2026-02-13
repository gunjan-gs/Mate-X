"use client"

import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

const companies = [
  { name: "Harvard", color: "hover:text-crimson-500" },
  { name: "Stanford", color: "hover:text-red-700" },
  { name: "MIT", color: "hover:text-red-500" },
  { name: "Oxford", color: "hover:text-blue-700" },
  { name: "Cambridge", color: "hover:text-blue-500" },
  { name: "Yale", color: "hover:text-blue-800" },
  { name: "Princeton", color: "hover:text-orange-500" },
  { name: "Columbia", color: "hover:text-blue-400" },
]

const testimonials = [
  {
    quote: "I used to juggle 5 apps to manage my studies. Mate-X replaced them all properly.",
    author: "Ankita Tiwari",
    role: "Med Student @ AIIMS",
    avatar: "A"
  },
  {
    quote: "The focus timer combined with the smart schedule is a game changer for my productivity.",
    author: "David C.",
    role: "CS @ MIT",
    avatar: "D"
  },
  {
    quote: "Finally, a student app that looks good and actually works offline. 10/10.",
    author: "Emily R.",
    role: "Law @ Oxford",
    avatar: "E"
  },
  {
    quote: "The AI scheduling heuristics are surprisingly accurate. It knows when I'm tired.",
    author: "Michael T.",
    role: "Engineering @ Stanford",
    avatar: "M"
  },
  {
    quote: "Design is unparalleled. It feels like using a premium tool, which motivates me.",
    author: "Jessica K.",
    role: "Design @ RISD",
    avatar: "J"
  },
  {
    quote: "Dropped Notion for this. The local-first speed is addictive.",
    author: "Alex B.",
    role: "Physics @ Cambridge",
    avatar: "A"
  }
]

const stats = [
    { label: "Active Students", value: "10,000+" },
    { label: "Focus Hours", value: "500k+" },
    { label: "Tasks Completed", value: "2.5M+" },
    { label: "App Store Rating", value: "4.9/5" },
]

export function TrustSection() {
  return (
    <section id="testimonials" className="py-24 border-y border-white/5 bg-black/40 relative overflow-hidden backdrop-blur-sm">
      {/* Ambient Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 text-center relative z-10">
        
        {/* Section Header */}
        <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60 mb-6">
            Trusted by the world's best students.
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-16">
            Join thousands of high-performers from top universities who trust Mate-X to manage their academic life.
        </p>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-24 border-b border-white/5 pb-12">
            {stats.map((stat, i) => (
                <div key={i} className="flex flex-col items-center">
                    <span className="text-4xl md:text-5xl font-bold text-white mb-2 tracking-tight">
                        {stat.value}
                    </span>
                    <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                        {stat.label}
                    </span>
                </div>
            ))}
        </div>
        
        {/* Logo Marquee */}
        <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest mb-8">
            Students from
        </p>
        <div className="relative flex overflow-hidden group mb-24 mask-linear-fade">
             {/* Gradient Masks for Marquee fade */}
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10" />
            
            <div className="flex animate-marquee space-x-16 items-center">
                {[...companies, ...companies].map((company, i) => (
                    <span 
                        key={i} 
                        className={cn(
                            "text-2xl font-bold font-serif opacity-40 hover:opacity-100 transition-all duration-300 cursor-default whitespace-nowrap",
                            company.color
                        )}
                    >
                        {company.name}
                    </span>
                ))}
            </div>
             <div className="flex absolute top-0 animate-marquee2 space-x-16 items-center">
                {[...companies, ...companies].map((company, i) => (
                    <span 
                        key={i} 
                        className={cn(
                            "text-2xl font-bold font-serif opacity-40 hover:opacity-100 transition-all duration-300 cursor-default whitespace-nowrap",
                            company.color
                        )}
                    >
                        {company.name}
                    </span>
                ))}
            </div>
        </div>

        {/* Wall of Love (Grid) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
            {testimonials.map((t, i) => (
                <Testimonial key={i} {...t} index={i} />
            ))}
        </div>

      </div>
    </section>
  )
}

function Testimonial({ quote, author, role, avatar, index }: { quote: string, author: string, role: string, avatar: string, index: number }) {
    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-indigo-500/30 transition-colors backdrop-blur-md group"
        >
            <div className="flex items-center gap-1 text-amber-500 mb-4">
                {[1,2,3,4,5].map(i => <StarIcon key={i} />)}
            </div>
            <p className="text-lg text-zinc-300 mb-6 leading-relaxed group-hover:text-white transition-colors">"{quote}"</p>
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                    {avatar}
                </div>
                <div>
                    <div className="font-semibold text-white">{author}</div>
                    <div className="text-xs text-zinc-500 group-hover:text-indigo-400 transition-colors">{role}</div>
                </div>
            </div>
        </motion.div>
    )
}

function StarIcon() {
    return (
        <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-4 h-4"
      >
        <path
          fillRule="evenodd"
          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
          clipRule="evenodd"
        />
      </svg>
    )
}
