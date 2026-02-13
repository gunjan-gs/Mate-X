"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, PlayCircle, Star, X } from "lucide-react"

export function Hero() {
  const [isVideoOpen, setIsVideoOpen] = useState(false)

  return (
    <section className="relative flex min-h-[90vh] flex-col items-center justify-center overflow-hidden pt-20 text-center">
      {/* Abstract Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden bg-background">
        {/* Premium Bluish Gradient Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-500/20 via-background to-background opacity-70 dark:opacity-40" />
        
        <div className="absolute top-[20%] left-[50%] -translate-x-1/2 h-96 w-96 rounded-full bg-indigo-500/20 blur-[120px] animate-pulse delay-700" />
        <div className="absolute top-[30%] left-[40%] h-72 w-72 rounded-full bg-purple-500/10 blur-[100px] animate-float decoration-clone" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      </div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-5xl space-y-8 px-4"
      >
        <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center rounded-full border border-indigo-500/20 bg-indigo-500/5 px-4 py-1.5 text-sm font-medium text-indigo-500 dark:text-indigo-300 backdrop-blur-md shadow-sm mb-4"
        >
          <Star className="mr-2 h-3.5 w-3.5 fill-indigo-500 text-indigo-500 animate-pulse" />
          <span className="mr-2">Everything you need to ace your exams</span>
          <ArrowRight className="h-3.5 w-3.5 opacity-60" />
        </motion.div>

        <h1 className="text-6xl font-bold tracking-tight text-foreground md:text-8xl lg:text-9xl leading-[1.1]">
          Master your <br />
          <span className="bg-gradient-to-br from-foreground to-foreground/60 bg-clip-text text-transparent">
            potential.
          </span>
        </h1>

        <p className="mx-auto max-w-2xl text-lg text-muted-foreground md:text-xl leading-relaxed">
          The intelligent workspace for students. Mate-X combines AI study planning, 
          deep focus timers, and smart notes into one beautiful system.
        </p>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row pt-4">
          <Link href="/dashboard">
            <Button size="lg" className="h-14 px-8 rounded-full text-base font-semibold bg-foreground text-background hover:bg-foreground/90 shadow-xl shadow-indigo-500/10 hover:shadow-indigo-500/20 transition-all hover:-translate-y-0.5">
              Start Learning Free
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Button 
            variant="outline" 
            size="lg" 
            onClick={() => setIsVideoOpen(true)}
            className="h-14 px-8 rounded-full text-base border-border/50 bg-background/50 backdrop-blur-sm hover:bg-muted/50"
          >
            <PlayCircle className="mr-2 h-4 w-4" />
            Watch Demo
          </Button>
        </div>
      </motion.div>

      {/* Floating UI Card Mockup */}
      <motion.div
        initial={{ y: 100, opacity: 0, rotateX: 20 }}
        animate={{ y: 0, opacity: 1, rotateX: 0 }}
        transition={{ delay: 0.6, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="mt-20 w-full max-w-6xl perspective-1000 px-4"
      >
        <div className="relative aspect-[16/9] w-full rounded-xl border border-border/50 bg-card/50 shadow-2xl backdrop-blur-xl overflow-hidden group hover:border-indigo-500/30 transition-colors duration-500">
           {/* Mockup UI - Dashboard Preview */}
           <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/5 to-transparent opacity-50" />
           <div className="absolute inset-x-0 top-0 h-10 border-b border-border/50 bg-muted/20 flex items-center px-4 gap-2">
             <div className="flex gap-1.5 opactiy-50">
                <div className="h-3 w-3 rounded-full bg-red-500/20 border border-red-500/30" />
                <div className="h-3 w-3 rounded-full bg-yellow-500/20 border border-yellow-500/30" />
                <div className="h-3 w-3 rounded-full bg-green-500/20 border border-green-500/30" />
             </div>
             <div className="mx-auto h-5 w-64 rounded-md bg-muted/30 text-[10px] flex items-center justify-center text-muted-foreground font-mono">
                mate-x.com/dashboard
             </div>
           </div>
           
           {/* Content Mockup */}
           <div className="absolute inset-0 top-10 p-8 grid grid-cols-12 gap-6 bg-background/40">
              <div className="col-span-3 hidden md:block space-y-4">
                  <div className="h-8 w-3/4 rounded-lg bg-indigo-500/10 animate-pulse" />
                  <div className="space-y-2 pt-4">
                      {[1,2,3,4].map(i => (
                          <div key={i} className="h-8 w-full rounded-lg bg-muted/40" />
                      ))}
                  </div>
              </div>
              <div className="col-span-12 md:col-span-9 grid grid-cols-2 gap-6">
                  <div className="col-span-2 h-32 rounded-xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/10" />
                  <div className="h-48 rounded-xl bg-card border border-border/50 shadow-sm" />
                  <div className="h-48 rounded-xl bg-card border border-border/50 shadow-sm" />
              </div>
           </div>
        </div>
      </motion.div>

      {/* Video Modal Overlay */}
      <AnimatePresence>
        {isVideoOpen && (
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 md:p-12"
                onClick={() => setIsVideoOpen(false)}
            >
                <motion.div
                    initial={{ scale: 0.9, y: 20 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.9, y: 20 }}
                    className="relative w-full max-w-5xl aspect-video rounded-2xl overflow-hidden bg-black shadow-2xl border border-white/10"
                    onClick={(e) => e.stopPropagation()}
                >
                    <button 
                        onClick={() => setIsVideoOpen(false)}
                        className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 hover:bg-white/20 text-white transition-colors"
                    >
                        <X className="w-6 h-6" />
                    </button>
                    
                    {/* Placeholder for actual video source */}
                    <iframe 
                        width="100%" 
                        height="100%" 
                        src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1" // Placeholder video
                        title="Demo Video" 
                        frameBorder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowFullScreen 
                        className="w-full h-full"
                    />
                </motion.div>
            </motion.div>
        )}
      </AnimatePresence>

    </section>
  )
}
