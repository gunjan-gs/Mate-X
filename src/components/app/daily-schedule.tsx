"use client"

import { Card } from "@/components/ui/card"
import { CheckCircle2, Clock, MoreHorizontal, Trash2, CalendarDays } from "lucide-react"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { useTaskStore } from "@/stores/useTaskStore"
import { TaskInput } from "./task-input"
import { useEffect, useState } from "react"

export function DailySchedule() {
  const { tasks, toggleTaskStatus, deleteTask, mockGenerateSchedule } = useTaskStore()
  const [mounted, setMounted] = useState(false)

  // Sort tasks by time
  const sortedTasks = [...tasks].sort((a, b) => {
    // Simple sort for now, assuming string time comparison works for HH:MM format
    return (a.startTime || '00:00').localeCompare(b.startTime || '00:00')
  })

  useEffect(() => {
     setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="p-6 h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
            <div className="p-2 bg-indigo-500/10 rounded-lg">
                <CalendarDays className="h-5 w-5 text-indigo-400" />
            </div>
            <h2 className="text-lg font-semibold text-white">Today's Schedule</h2>
        </div>
        <div className="text-xs font-medium text-muted-foreground bg-white/5 px-3 py-1 rounded-full border border-white/5">
           {tasks.filter(t => t.status === 'completed').length}/{tasks.length} Completed
        </div>
      </div>

      <div className="mb-6">
          <TaskInput />
      </div>

      <div className="relative space-y-4 pl-4 flex-1 overflow-y-auto pr-2 custom-scrollbar">
        {/* Continuous Timeline Line */}
        <div className="absolute left-[26px] top-2 bottom-4 w-[2px] bg-gradient-to-b from-indigo-500/50 via-white/10 to-transparent" />

        {sortedTasks.length === 0 && (
            <div className="text-center py-12 text-muted-foreground/50 text-sm italic">
                No tasks yet. Add one above or ask AI to generate a plan.
            </div>
        )}

        {sortedTasks.map((item, index) => (
          <motion.div 
            key={item.id} 
            className="relative pl-10 group"
            layout
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
          >
             {/* Timeline Node */}
            <button 
              onClick={() => toggleTaskStatus(item.id)}
              className={cn(
              "absolute left-[19px] top-4 h-4 w-4 rounded-full border-2 flex items-center justify-center transition-all duration-300 z-10 bg-black cursor-pointer",
              item.status === 'completed' ? "border-indigo-500 bg-indigo-500" :
              item.status === 'active' ? "border-indigo-400 shadow-[0_0_15px_rgba(129,140,248,0.6)] animate-pulse" : "border-zinc-700 hover:border-indigo-400 hover:scale-110"
            )}>
              {item.status === 'completed' && <CheckCircle2 className="h-3 w-3 text-white" />}
            </button>

            <div className={cn(
              "relative p-4 rounded-xl transition-all duration-300 border backdrop-blur-sm group-hover:translate-x-1",
              item.status === 'active' ? 
                "bg-gradient-to-r from-indigo-500/10 to-transparent border-indigo-500/30" : 
                "bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/10",
               item.status === 'completed' && "opacity-50 grayscale" 
            )}>
              {/* Active Indicator Strip */}
              {item.status === 'active' && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-500 rounded-l-xl" />
              )}

              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-mono text-indigo-300 bg-indigo-500/10 px-2 py-0.5 rounded">
                        {item.startTime || 'Anytime'}
                    </span>
                    <span className={cn(
                      "text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full border border-white/5",
                      item.category === 'Math' ? "text-blue-400 bg-blue-500/10" :
                      item.category === 'History' ? "text-amber-400 bg-amber-500/10" :
                      item.category === 'CS' ? "text-emerald-400 bg-emerald-500/10" :
                      "text-zinc-400 bg-zinc-500/10"
                    )}>
                      {item.category}
                    </span>
                    {item.type === 'focus' && (
                        <span className="flex items-center text-[10px] text-zinc-400">
                            <Clock className="w-3 h-3 mr-1" /> {item.duration}m
                        </span>
                    )}
                  </div>
                  
                  <h3 className={cn(
                    "font-medium truncate transition-colors",
                    item.status === 'completed' ? "text-muted-foreground line-through" : "text-zinc-100"
                  )}>
                    {item.title}
                  </h3>
                </div>
                
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                     <button 
                        onClick={() => deleteTask(item.id)}
                        className="p-2 text-muted-foreground hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                        title="Delete task"
                     >
                        <Trash2 className="h-4 w-4" />
                     </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
