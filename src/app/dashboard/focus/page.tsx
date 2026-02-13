
"use client"

import { useEffect, useState } from "react"
import { useFocusStore, FocusMode } from "@/stores/useFocusStore"
import { useTaskStore } from "@/stores/useTaskStore"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { FocusControls } from "@/components/features/focus/focus-controls"
import { MoreHorizontal, ListTodo, CheckCircle2 } from "lucide-react"
import { playAlarm } from "@/lib/sounds"

export default function FocusPage() {
  const { 
    currentMode, 
    timeLeft, 
    isActive, 
    setMode, 
    setTimeLeft, 
    setIsActive, 
    logSession 
  } = useFocusStore()

  const { tasks, activeTaskId, setActiveTask } = useTaskStore()
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  
  // Toggle browser fullscreen
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((e) => {
        console.error(`Error attempting to enable full-screen mode: ${e.message} (${e.name})`)
      })
      setIsFullscreen(true)
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen()
        setIsFullscreen(false)
      }
    }
  }

  // Handle timer tick
  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft - 1)
      }, 1000)
    } else if (timeLeft === 0 && isActive) {
      setIsActive(false)
      logSession({
          id: crypto.randomUUID(),
          startTime: new Date().toISOString(),
          duration: currentMode === 'focus' ? 25 : (currentMode === 'shortBreak' ? 5 : 15),
          mode: currentMode,
          completed: true,
          taskId: activeTaskId || undefined
      })
      if (!isMuted) {
          playAlarm()
      }
    }

    return () => clearInterval(interval)
  }, [isActive, timeLeft, setTimeLeft, setIsActive, currentMode, logSession, activeTaskId, isMuted])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return {
        mins: mins.toString().padStart(2, '0'),
        secs: secs.toString().padStart(2, '0')
    }
  }

  const activeTask = tasks.find(t => t.id === activeTaskId)
  const time = formatTime(timeLeft)

  const getModeConfig = (m: FocusMode) => {
      switch(m) {
          case 'focus': return { color: 'indigo', label: 'Deep Focus' }
          case 'shortBreak': return { color: 'emerald', label: 'Short Break' }
          case 'longBreak': return { color: 'blue', label: 'Long Break' }
      }
  }
  const config = getModeConfig(currentMode)

  return (
    <div className={cn(
        "relative flex flex-col items-center justify-center transition-all duration-1000 overflow-hidden",
        isFullscreen ? "fixed inset-0 z-[100] bg-black" : "h-[calc(100vh-2rem)]"
    )}>
      
      {/* Ambient Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div 
             animate={{ 
                 opacity: isActive ? 0.4 : 0.15,
                 scale: isActive ? 1.4 : 1
             }}
             transition={{ duration: 6, ease: "easeInOut" }}
             className={cn(
                 "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] rounded-full blur-[180px] mix-blend-screen opacity-30",
                 currentMode === 'focus' && "bg-indigo-600/30",
                 currentMode === 'shortBreak' && "bg-emerald-500/30",
                 currentMode === 'longBreak' && "bg-blue-500/30",
             )}
          />
          {/* Subtle Grain */}
          <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center w-full max-w-4xl px-6">
        
        {/* Task Selector (Floating Pill) */}
        <AnimatePresence>
            {(!isActive || !isFullscreen) && (
                <motion.div 
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    className="mb-16 relative z-20"
                >
                    <div className="relative group">
                        <select 
                            value={activeTaskId || ""}
                            onChange={(e) => setActiveTask(e.target.value || null)}
                            className="appearance-none bg-white/5 border border-white/10 backdrop-blur-md rounded-full pl-5 pr-12 py-3 text-sm font-medium text-white/90 focus:outline-none focus:ring-1 focus:ring-white/20 hover:bg-white/10 transition-all cursor-pointer min-w-[280px] shadow-lg shadow-black/20"
                        >
                            <option value="" className="bg-zinc-950 text-white/50">Select a task on deck...</option>
                            {tasks.filter(t => t.status !== 'completed').map(task => (
                                <option key={task.id} value={task.id} className="bg-zinc-950 text-white">
                                    {task.title}
                                </option>
                            ))}
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none flex items-center gap-2">
                             <div className="h-4 w-[1px] bg-white/10" />
                             <ListTodo className="w-4 h-4" />
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>

        {/* Focus Timer Display */}
        <div className="relative mb-16 flex flex-col items-center">
            {/* Mode Badge */}
             <motion.div 
                animate={{ opacity: isActive ? 0.5 : 1 }}
                className={cn(
                    "px-4 py-1.5 rounded-full text-xs font-medium uppercase tracking-widest mb-8 border backdrop-blur-sm",
                    currentMode === 'focus' ? "bg-indigo-500/10 border-indigo-500/20 text-indigo-300" :
                    currentMode === 'shortBreak' ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-300" :
                    "bg-blue-500/10 border-blue-500/20 text-blue-300"
                )}
             >
                 {config.label}
             </motion.div>

            <h1 className={cn(
                "font-sans font-light tracking-tighter text-white tabular-nums select-none transition-all duration-1000 scale-y-110",
                isFullscreen ? "text-[14rem] leading-none" : "text-[8rem] sm:text-[10rem] leading-none"
            )}>
                <span className={isActive ? "text-white drop-shadow-[0_0_80px_rgba(255,255,255,0.3)]" : "text-white/40"}>{time.mins}</span>
                <span className="text-white/20 animate-pulse bg-clip-text">:</span>
                <span className={isActive ? "text-white drop-shadow-[0_0_80px_rgba(255,255,255,0.3)]" : "text-white/40"}>{time.secs}</span>
            </h1>
            
            {/* Task Focus Display (When Active) */}
            <AnimatePresence>
                {isActive && activeTask && (
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute -bottom-12 flex items-center gap-3 text-white/80"
                    >
                        <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-500"></span>
                        </span>
                        <span className="text-xl font-light tracking-wide">{activeTask.title}</span>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>

        {/* Controls */}
        <motion.div
             animate={{ opacity: isActive && isFullscreen ? 0 : 1 }}
             whileHover={{ opacity: 1 }}
             transition={{ duration: 0.5 }}
        >
            <FocusControls 
                isActive={isActive}
                onToggle={() => setIsActive(!isActive)}
                onReset={() => { setIsActive(false); setMode(currentMode); }}
                isFullscreen={isFullscreen}
                onToggleFullscreen={toggleFullscreen}
                isMuted={isMuted}
                onToggleMute={() => setIsMuted(!isMuted)}
            />
        </motion.div>

        {/* Mode Switcher (Bottom / "Dock") */}
        <AnimatePresence>
            {!isFullscreen && !isActive && (
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    className="mt-16 flex gap-2 p-1.5 bg-white/5 border border-white/5 rounded-full backdrop-blur-xl"
                >
                    {(['focus', 'shortBreak', 'longBreak'] as FocusMode[]).map((mode) => (
                        <button
                            key={mode}
                            onClick={() => setMode(mode)}
                            className={cn(
                                "px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300",
                                currentMode === mode 
                                    ? "bg-white/10 text-white shadow-lg" 
                                    : "text-white/40 hover:text-white/70 hover:bg-white/5"
                            )}
                        >
                            {mode === 'focus' ? 'Deep Work' : mode === 'shortBreak' ? 'Short' : 'Long Break'}
                        </button>
                    ))}
                </motion.div>
            )}
        </AnimatePresence>

      </div>
    </div>
  )
}
