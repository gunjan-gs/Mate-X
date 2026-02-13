"use client"

import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Settings2, Plus, Sparkles } from "lucide-react"
import { format, subDays, addDays, subWeeks, addWeeks } from "date-fns"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"

interface ScheduleHeaderProps {
    currentDate: Date
    onDateChange: (date: Date) => void
    view: 'day' | 'week'
    onViewChange: (view: 'day' | 'week') => void
    onAddTask: () => void
    onAnnotate: () => void
}

export function ScheduleHeader({ currentDate, onDateChange, view, onViewChange, onAddTask, onAnnotate }: ScheduleHeaderProps) {
    const handlePrev = () => {
        if (view === 'day') {
             onDateChange(subDays(currentDate, 1))
        } else {
             onDateChange(subWeeks(currentDate, 1))
        }
    }

    const handleNext = () => {
         if (view === 'day') {
             onDateChange(addDays(currentDate, 1))
        } else {
             onDateChange(addWeeks(currentDate, 1))
        }
    }

    const goToday = () => onDateChange(new Date())

    return (
        <div className="flex items-center justify-between mb-6 pb-6 border-b border-white/5">
            <div className="flex items-center gap-4">
                <div className="flex items-center bg-black/20 rounded-lg p-1 border border-white/5">
                    <Button variant="ghost" size="icon" onClick={handlePrev} className="h-8 w-8 hover:bg-white/5 text-muted-foreground hover:text-white">
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={goToday} className="h-8 font-medium hover:bg-white/5 text-white/80">
                        Today
                    </Button>
                    <Button variant="ghost" size="icon" onClick={handleNext} className="h-8 w-8 hover:bg-white/5 text-muted-foreground hover:text-white">
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>
                
                <div className="flex items-center gap-3">
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button variant="ghost" className="p-0 hover:bg-transparent text-2xl font-bold tracking-tight text-white flex items-center gap-3 h-auto">
                                {format(currentDate, "MMMM yyyy")}
                                <span className="text-lg font-normal text-muted-foreground/60 border-l border-white/10 pl-3">
                                    {format(currentDate, "EEEE, do")}
                                </span>
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0 bg-zinc-950 border-white/10 text-white z-[60]" align="start">
                            <Calendar
                                mode="single"
                                selected={currentDate}
                                onSelect={(date) => date && onDateChange(date)}
                                initialFocus
                            />
                        </PopoverContent>
                    </Popover>
                </div>
            </div>

            <div className="flex items-center gap-3">
                <div className="flex p-1 bg-black/20 border border-white/5 rounded-lg">
                    <button
                        onClick={() => onViewChange('day')}
                        className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${
                            view === 'day' ? 'bg-indigo-500/20 text-indigo-300 shadow-sm' : 'text-muted-foreground hover:text-white'
                        }`}
                    >
                        Day
                    </button>
                    <button
                        onClick={() => onViewChange('week')}
                        className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${
                            view === 'week' ? 'bg-indigo-500/20 text-indigo-300 shadow-sm' : 'text-muted-foreground hover:text-white'
                        }`}
                    >
                        Week
                    </button>
                </div>
                
                <Button onClick={onAddTask} className="bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/20">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Task
                </Button>
                
                <Button 
                    variant="outline" 
                    size="icon" 
                    onClick={onAnnotate}
                    className="h-9 w-9 border-white/5 bg-black/20 hover:bg-white/5 text-muted-foreground hover:text-indigo-400"
                    title="Auto-Generate Schedule"
                >
                    <Sparkles className="h-4 w-4" />
                </Button>
            </div>
        </div>
    )
}
