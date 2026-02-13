"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const tiers = [
  {
    name: "Starter",
    price: { monthly: "$0", yearly: "$0" },
    description: "Perfect for casual study tracking.",
    features: [
      "Smart Task List (Limit 50)",
      "Basic Focus Timer",
      "7-Day History",
      "Local-First Sync",
    ],
    notIncluded: ["AI Assistant", "Unlimited History", "Advanced Analytics"],
    cta: "Start Free",
    popular: false,
  },
  {
    name: "Pro Scholar",
    price: { monthly: "$9", yearly: "$7" },
    description: "For high-performers who need serious tools.",
    features: [
      "Unlimited Tasks",
      "Advanced Focus Stats",
      "Full History (Forever)",
      "AI Schedule Generator",
      "Smart Chat Assistant",
      "Priority Support",
    ],
    notIncluded: [],
    cta: "Get Pro",
    popular: true,
  },
  {
    name: "Team / Class",
    price: { monthly: "$19", yearly: "$15" },
    description: "Collaborate on projects and share notes.",
    features: [
      "Everything in Pro",
      "Shared Workspaces",
      "Team Analytics",
      "Admin Roles",
      "Export Data",
    ],
    notIncluded: [],
    cta: "Contact Sales",
    popular: false,
  },
]

export function Pricing() {
  const [billing, setBilling] = useState<"monthly" | "yearly">("yearly")

  return (
    <section id="pricing" className="py-24 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-500/10 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60 mb-6">
            Simple pricing for massive results.
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Invest in your GPA for less than the price of a coffee.
          </p>

          {/* Toggle */}
          <div className="flex justify-center items-center gap-4">
            <span className={cn("text-sm font-medium transition-colors", billing === "monthly" ? "text-white" : "text-muted-foreground")}>Monthly</span>
            <button 
                onClick={() => setBilling(billing === "monthly" ? "yearly" : "monthly")}
                className="w-14 h-8 rounded-full bg-white/10 p-1 relative transition-colors hover:bg-white/20"
            >
                <motion.div 
                    layout
                    className="w-6 h-6 rounded-full bg-indigo-500 shadow-lg"
                    animate={{ x: billing === "monthly" ? 0 : 24 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                />
            </button>
            <span className={cn("text-sm font-medium transition-colors", billing === "yearly" ? "text-white" : "text-muted-foreground")}>
                Yearly <span className="text-xs text-indigo-400 font-bold ml-1">(Save 20%)</span>
            </span>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tiers.map((tier, i) => (
            <div key={i} className="relative group">
              {/* Pro Glow Effect */}
              {tier.popular && (
                <div className="absolute -inset-[1px] rounded-3xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-70 blur-sm group-hover:opacity-100 transition-opacity duration-500" />
              )}
              
              <div className={cn(
                "relative h-full p-8 rounded-3xl border flex flex-col transition-transform duration-300 hover:-translate-y-2",
                tier.popular 
                    ? "bg-stone-950/90 border-transparent shadow-2xl" 
                    : "bg-white/5 border-white/10 hover:border-white/20"
              )}>
                {tier.popular && (
                    <div className="absolute top-0 right-0 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs font-bold px-3 py-1 rounded-bl-xl rounded-tr-2xl">
                        MATE'S CHOICE
                    </div>
                )}

                <div className="mb-8">
                  <h3 className="text-xl font-bold text-white mb-2">{tier.name}</h3>
                  <p className="text-sm text-muted-foreground mb-6">{tier.description}</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-white">
                        {billing === "yearly" ? tier.price.yearly : tier.price.monthly}
                    </span>
                    <span className="text-muted-foreground">/mo</span>
                  </div>
                  {billing === "yearly" && tier.name !== "Starter" && (
                     <div className="text-xs text-indigo-400 mt-1">Billed yearly</div>
                  )}
                </div>

                <div className="flex-1 space-y-4 mb-8">
                  {tier.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-3 text-sm text-zinc-300">
                      <Check className="w-5 h-5 text-indigo-500 shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                  {tier.notIncluded.map((feature) => (
                    <div key={feature} className="flex items-start gap-3 text-sm text-zinc-600">
                      <X className="w-5 h-5 shrink-0 opacity-50" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                <Button 
                    className={cn(
                        "w-full py-6 text-lg rounded-xl font-bold transition-all",
                        tier.popular 
                            ? "bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/25"
                            : "bg-white/10 hover:bg-white/20 text-white"
                    )}
                >
                    {tier.cta}
                </Button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
