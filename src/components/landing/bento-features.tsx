"use client"

import { motion } from "framer-motion"
import { Calendar, CheckCircle2, Zap, Brain, TrendingUp, Shield } from "lucide-react"

const features = [
  {
    title: "AI Study Planner",
    description: "Type 'Study for my math exam' and get a full schedule instantly.",
    icon: Calendar,
    className: "col-span-1 md:col-span-2 lg:col-span-2 bg-gradient-to-br from-indigo-500/5 to-purple-500/5",
  },
  {
    title: "Deep Focus",
    description: "Built-in Pomodoro timer with distraction blocking.",
    icon: Zap,
    className: "col-span-1 bg-amber-500/5",
  },
  {
    title: "Smart Insights",
    description: "Track your 'Deep Work' hours and optimize your flow.",
    icon: TrendingUp,
    className: "col-span-1 bg-emerald-500/5",
  },
  {
    title: "Knowledge Vault",
    description: "Store notes, formulas, and resources in one secure place.",
    icon: Brain,
    className: "col-span-1 md:col-span-2 lg:col-span-2 bg-gradient-to-br from-blue-500/5 to-cyan-500/5",
  },
]

export function BentoFeatures() {
  return (
    <section id="features" className="py-24 px-6 container mx-auto">
      <div className="mb-16 text-center space-y-4">
        <h2 className="text-4xl font-bold tracking-tight lg:text-5xl">
          Everything you need to <br />
          <span className="text-indigo-500">graduate with honors</span>
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
           Designed for students who want to work smarter, not harder. 
           Mate-X replaces your calendar, todo list, and timer.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {features.map((feature, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className={`group relative overflow-hidden rounded-3xl border border-border/50 p-8 hover:border-indigo-500/20 transition-all duration-300 ${feature.className}`}
          >
            <div className="absolute inset-0 bg-background/50 backdrop-blur-sm -z-10" />
            
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-background border border-border/50 shadow-sm group-hover:scale-110 transition-transform duration-300">
               <feature.icon className="h-6 w-6 text-foreground" />
            </div>
            
            <h3 className="text-xl font-semibold mb-2 text-foreground">{feature.title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
