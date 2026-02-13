"use client"

import { Button } from "@/components/ui/button"
import { Sparkles } from "lucide-react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface AutoScheduleButtonProps {
    onClick: () => void
    isScheduling?: boolean
}

export function AutoScheduleButton({ onClick, isScheduling }: AutoScheduleButtonProps) {
    return (
        <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="fixed bottom-8 right-8 z-50"
        >
            <Button
                onClick={onClick}
                size="lg"
                className={cn(
                    "h-14 px-6 rounded-full shadow-2xl transition-all duration-500",
                    "bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500",
                    "border border-white/20 backdrop-blur-md",
                    isScheduling && "animate-pulse"
                )}
            >
                <Sparkles className={cn("w-5 h-5 mr-2", isScheduling ? "animate-spin" : "animate-pulse")} />
                <span className="font-medium tracking-tight">
                    {isScheduling ? "Optimizing..." : "Magic Arrange"}
                </span>
            </Button>
        </motion.div>
    )
}
