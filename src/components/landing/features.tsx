"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { motion } from "framer-motion"
import { Brain, Calendar, Clock, BarChart3, CloudLightning, Shield } from "lucide-react"

const features = [
  {
    title: "AI Study Planner",
    description: "Generates personalized study schedules based on your exams and learning pace.",
    icon: Brain,
    className: "md:col-span-2",
  },
  {
    title: "Focus Hygiene",
    description: "Block distractions and track deep work sessions automatically.",
    icon: Shield,
    className: "md:col-span-1",
  },
  {
    title: "Smart Scheduling",
    description: "Adaptive calendar that reshuffles when you miss a task.",
    icon: Calendar,
    className: "md:col-span-1",
  },
  {
    title: "Progress Analytics",
    description: "Visualize your knowledge gaps and mastery levels over time.",
    icon: BarChart3,
    className: "md:col-span-2",
  },
  {
    title: "Instant Answers",
    description: "Ask your AI tutor questions and get verified explanations instantly.",
    icon: CloudLightning,
    className: "md:col-span-3",
  },
]

export function Features() {
  return (
    <section id="features" className="container mx-auto px-6 py-24 md:px-12">
      <div className="mb-12 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-white md:text-5xl">
          Everything you need to <br />
          <span className="text-indigo-400">excel without burnout</span>
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Built for high-performers who value deep work and efficient learning.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {features.map((feature, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            viewport={{ once: true }}
            className={feature.className}
          >
            <Card className="h-full border-white/10 bg-white/5 transition-colors hover:bg-white/10 hover:border-indigo-500/30 group">
              <CardHeader>
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-400 group-hover:text-indigo-300 group-hover:bg-indigo-500/20 transition-colors">
                  <feature.icon className="h-6 w-6" />
                </div>
                <CardTitle className="text-xl text-white">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
