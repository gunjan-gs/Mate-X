"use client"

import { useEffect, useState, useRef } from "react"
import { useTaskStore, Task } from "@/stores/useTaskStore"
import { SmartBlock } from "./smart-block"
import { format, addDays, startOfWeek, isSameDay } from "date-fns"
import { CreateTaskModal } from "./create-task-modal"
import { cn } from "@/lib/utils"

interface TimeGridProps {
    currentDate?: Date
    view?: 'day' | 'week'
    onSlotClick?: (date: Date, time: string) => void
}

export function TimeGrid({ currentDate = new Date(), view = 'day', onSlotClick }: TimeGridProps) {
    const { tasks, deleteTask, toggleTaskStatus } = useTaskStore()
    const containerRef = useRef<HTMLDivElement>(null)
    const [currentTime, setCurrentTime] = useState(new Date())
    
    // Interaction State
    // const [isModalOpen, setIsModalOpen] = useState(false)
    // const [selectedSlot, setSelectedSlot] = useState<{ date: Date, time: string } | null>(null)

    // Update time
    useEffect(() => {
        const interval = setInterval(() => setCurrentTime(new Date()), 60000)
        return () => clearInterval(interval)
    }, [])

    // Scroll to current time
    useEffect(() => {
        if (containerRef.current) {
            const minutes = currentTime.getHours() * 60 + currentTime.getMinutes()
            const scrollPos = (minutes / 1440) * 2400
            containerRef.current.scrollTop = scrollPos - 300
        }
    }, [])

    const hours = Array.from({ length: 24 }).map((_, i) => i)

    // Generate days to show
    const days = view === 'day' 
        ? [currentDate] 
        : Array.from({ length: 7 }).map((_, i) => addDays(startOfWeek(currentDate, { weekStartsOn: 1 }), i))

    // Handle Click on Empty Slot
    const handleSlotClick = (date: Date, hour: number, minute: number = 0) => {
        const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`
        if (onSlotClick) {
            onSlotClick(date, timeString)
        }
    }

    const getTaskStyle = (task: Task) => {
        if (!task.startTime) return null
        
        const [h, m] = task.startTime.split(':').map(Number)
        const startMinutes = h * 60 + m
        const top = (startMinutes / 60) * 100
        const height = (task.duration / 60) * 100

        return {
            top: `${top}px`,
            height: `${height}px`
        }
    }

    // Current time position
    const currentMinutes = currentTime.getHours() * 60 + currentTime.getMinutes()
    const currentTimeTop = (currentMinutes / 60) * 100

    return (
        <div 
            ref={containerRef}
            className="relative h-full overflow-y-auto bg-black/20 border border-white/5 rounded-2xl backdrop-blur-xl custom-scrollbar"
        >
            <div className="relative min-h-[2400px] flex">
                {/* Time Labels Column */}
                <div className="w-14 flex-shrink-0 sticky left-0 z-30 bg-[#09090b] border-r border-white/5">
                     {hours.map((hour) => (
                        <div key={hour} className="h-[100px] border-b border-white/[0.03] text-[10px] font-medium text-white/30 text-right pr-3 pt-2 font-mono">
                            {format(new Date().setHours(hour, 0), "h a")}
                        </div>
                    ))}
                </div>

                {/* Days Columns */}
                <div className="flex-1 flex min-w-0">
                    {days.map((day, index) => {
                        const isToday = isSameDay(day, new Date())
                        return (
                            <div key={day.toISOString()} className={cn(
                                "flex-1 relative border-r border-white/5 last:border-r-0 min-w-[200px]",
                                view === 'day' ? "w-full" : "w-[14.28%]"
                            )}> 
                                {/* Header for Week View (sticky) */}
                                {view === 'week' && (
                                    <div className="sticky top-0 h-10 border-b border-white/5 bg-[#09090b]/90 backdrop-blur z-20 flex items-center justify-center text-sm font-medium text-white/60">
                                        <span className={cn(isToday && "text-indigo-400 font-bold")}>
                                            {format(day, "EEE, MMM d")}
                                        </span>
                                    </div>
                                )}

                                {/* Hour Slots */}
                                {hours.map((hour) => (
                                    <div 
                                        key={hour} 
                                        className="h-[100px] border-b border-white/[0.03] group relative"
                                        onClick={() => handleSlotClick(day, hour)}
                                    >
                                        <div className="absolute inset-0 hover:bg-white/[0.02] transition-colors cursor-pointer" />
                                        <div className="absolute top-1/2 left-0 right-0 border-t border-white/[0.02] pointer-events-none" />
                                    </div>
                                ))}

                                {/* Tasks for this Day */}
                                <div className="absolute top-0 left-0 right-0 bottom-0 pointer-events-none">
                                    {tasks
                                        .filter(t => isSameDay(new Date(t.date), day) && t.startTime && !t.completedAt)
                                        .map((task) => {
                                            const style = getTaskStyle(task)
                                            if (!style) return null
                                            return (
                                                 <SmartBlock 
                                                    key={task.id} 
                                                    task={task} 
                                                    style={style}
                                                    onEdit={() => console.log('Edit')} 
                                                />
                                            )
                                        })}
                                </div>

                                {/* Current Time Indicator (Only if Today) */}
                                {isToday && (
                                    <div 
                                        className="absolute left-0 right-0 z-30 pointer-events-none flex items-center"
                                        style={{ top: `${currentTimeTop}px` }}
                                    >
                                        <div className="w-2 h-2 rounded-full bg-red-500 -translate-x-1 ring-4 ring-black" />
                                        <div className="h-[1px] w-full bg-red-500 opacity-60" />
                                    </div>
                                )}
                            </div>
                        )
                    })}
                </div>
            </div>

            {/* Modal moved to parent */}
        </div>
    )
}
