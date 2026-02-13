"use client"

import { Button } from "@/components/ui/button"
import { Play, Pause, RotateCcw, Volume2, VolumeX, Maximize2, Minimize2 } from "lucide-react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface FocusControlsProps {
    isActive: boolean
    onToggle: () => void
    onReset: () => void
    isFullscreen: boolean
    onToggleFullscreen: () => void
    isMuted?: boolean
    onToggleMute?: () => void
}

export function FocusControls({ 
    isActive, 
    onToggle, 
    onReset, 
    isFullscreen, 
    onToggleFullscreen,
    isMuted = false,
    onToggleMute
}: FocusControlsProps) {
    return (
        <motion.div 
            className="flex items-center gap-6 bg-black/40 backdrop-blur-xl border border-white/10 px-8 py-5 rounded-full shadow-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
        >
            <Button
                variant="ghost"
                size="icon"
                onClick={onReset}
                className="text-white/40 hover:text-white hover:bg-white/5 rounded-full transition-all"
                title="Reset Timer"
            >
                <RotateCcw className="w-5 h-5" />
            </Button>

            <Button 
                onClick={onToggle}
                size="lg"
                className={cn(
                    "w-16 h-16 rounded-full flex items-center justify-center transition-all duration-500 shadow-lg group",
                    isActive 
                        ? "bg-amber-500/10 text-amber-500 border border-amber-500/20 hover:bg-amber-500/20 hover:scale-105" 
                        : "bg-white text-black hover:bg-gray-200 hover:scale-105 border-0"
                )}
            >
                {isActive ? (
                    <Pause className="w-6 h-6 fill-current" />
                ) : (
                    <Play className="w-6 h-6 fill-current ml-1" />
                )}
            </Button>

             <div className="flex gap-2">
                {onToggleMute && (
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={onToggleMute}
                        className="text-white/40 hover:text-white hover:bg-white/5 rounded-full transition-all"
                        title={isMuted ? "Unmute" : "Mute"}
                    >
                        {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                    </Button>
                )}
                
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={onToggleFullscreen}
                    className="text-white/40 hover:text-white hover:bg-white/5 rounded-full transition-all"
                    title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
                >
                    {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
                </Button>
            </div>
        </motion.div>
    )
}
