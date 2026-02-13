"use client"

import { useState } from "react"
import { ScheduleHeader } from "@/components/features/schedule/schedule-header"
import { TimeGrid } from "@/components/features/schedule/time-grid"
import { AutoScheduleButton } from "@/components/features/schedule/auto-schedule-button"
import { CreateTaskModal } from "@/components/features/schedule/create-task-modal"
import { AutoScheduleInput } from "@/components/features/schedule/auto-schedule-input"
import { useTaskStore } from "@/stores/useTaskStore"
import { toast } from "sonner"

export default function SchedulePage() {
    const [currentDate, setCurrentDate] = useState(new Date())
    const [view, setView] = useState<'day' | 'week'>('day')
    const [isScheduling, setIsScheduling] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isAutoScheduleOpen, setIsAutoScheduleOpen] = useState(false)
    const [selectedSlot, setSelectedSlot] = useState<{ date: Date, time: string } | undefined>(undefined)

    const { tasks, updateTask } = useTaskStore()

    const handleSlotClick = (date: Date, time: string) => {
        setSelectedSlot({ date, time })
        setIsModalOpen(true)
    }

    const handleAutoSchedule = async () => {
        setIsScheduling(true)
        
        try {
            const { GeminiService } = await import("@/lib/gemini")
            const optimizedSchedule = await GeminiService.generateSchedule(tasks)
            
            // Apply the schedule
            optimizedSchedule.forEach((slot: any) => {
                const task = tasks.find(t => t.id === slot.taskId)
                if (task) {
                    updateTask(task.id, { startTime: slot.startTime })
                }
            })

            toast.success("Schedule optimized by AI", {
                description: "Your day has been intelligently arranged for maximum flow."
            })
        } catch (error: any) {
            toast.error("Optimization failed", {
                description: error.message || "AI could not arrange tasks at this moment."
            })
        } finally {
            setIsScheduling(false)
        }
    }

    return (
        <div className="h-[calc(100vh-2rem)] flex flex-col relative">
            <ScheduleHeader 
                currentDate={currentDate} 
                onDateChange={setCurrentDate}
                view={view}
                onViewChange={setView}
                onAnnotate={() => setIsAutoScheduleOpen(true)}
                onAddTask={() => { 
                    setSelectedSlot({ date: currentDate, time: "09:00" }); 
                    setIsModalOpen(true) 
                }}
            />

            <div className="flex-1 overflow-hidden relative">
                <TimeGrid 
                    currentDate={currentDate} 
                    view={view} 
                    onSlotClick={handleSlotClick}
                />
            </div>
            
            <AutoScheduleButton 
                onClick={handleAutoSchedule} 
                isScheduling={isScheduling}
            />

            <AutoScheduleInput 
                isOpen={isAutoScheduleOpen}
                onClose={() => setIsAutoScheduleOpen(false)}
            />

            <CreateTaskModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                initialDate={selectedSlot?.date}
                initialTime={selectedSlot?.time}
            />
        </div>
    )
}
