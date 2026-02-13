"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Calendar as CalendarIcon } from "lucide-react"
import { useTaskStore } from "@/stores/useTaskStore"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { toast } from "sonner"

interface CreateTaskModalProps {
    isOpen: boolean
    onClose: () => void
    initialDate?: Date
    initialTime?: string
}

export function CreateTaskModal({ isOpen, onClose, initialDate, initialTime }: CreateTaskModalProps) {
    const { addTask } = useTaskStore()
    const [title, setTitle] = useState("")
    const [duration, setDuration] = useState("60")
    const [category, setCategory] = useState("General")
    const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium')
    const [selectedDate, setSelectedDate] = useState<Date>(initialDate || new Date())

    useEffect(() => {
        if (isOpen && initialDate) {
            setSelectedDate(initialDate)
        }
    }, [isOpen, initialDate])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!title.trim()) return

        addTask({
            title,
            duration: parseInt(duration),
            category,
            priority,
            type: 'study', // Default type
            date: (selectedDate || new Date()).toISOString(),
            startTime: initialTime || "09:00"
        })
        
        toast.success("Task created", {
            description: `Scheduled for ${format(selectedDate || new Date(), "EEEE, MMM do")}`
        })

        // Reset and close
        setTitle("")
        setDuration("60")
        onClose()
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="bg-black/40 border border-white/10 backdrop-blur-xl text-white sm:rounded-2xl">
                <DialogHeader>
                    <DialogTitle>Add New Task</DialogTitle>
                </DialogHeader>
                
                <form onSubmit={handleSubmit} className="space-y-4 py-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-white/60">Task Title</label>
                        <Input 
                            value={title} 
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="e.g., Study Physics Chapter 4"
                            className="bg-white/5 border-white/10 focus:border-indigo-500/50"
                            autoFocus
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                         <div className="space-y-2">
                            <label className="text-sm font-medium text-white/60">Duration (min)</label>
                            <Select value={duration} onValueChange={setDuration}>
                                <SelectTrigger className="bg-white/5 border-white/10">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="bg-zinc-900 border-white/10 text-white">
                                    <SelectItem value="15">15 min</SelectItem>
                                    <SelectItem value="30">30 min</SelectItem>
                                    <SelectItem value="45">45 min</SelectItem>
                                    <SelectItem value="60">1 hour</SelectItem>
                                    <SelectItem value="90">1.5 hours</SelectItem>
                                    <SelectItem value="120">2 hours</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        
                         <div className="space-y-2">
                            <label className="text-sm font-medium text-white/60">Priority</label>
                            <Select value={priority} onValueChange={(v: any) => setPriority(v)}>
                                <SelectTrigger className="bg-white/5 border-white/10">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="bg-zinc-900 border-white/10 text-white">
                                    <SelectItem value="low">Low</SelectItem>
                                    <SelectItem value="medium">Medium</SelectItem>
                                    <SelectItem value="high">High</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-white/60">Category</label>
                             <Select value={category} onValueChange={setCategory}>
                                    <SelectTrigger className="bg-white/5 border-white/10">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent className="bg-zinc-900 border-white/10 text-white z-[60]">
                                        <SelectItem value="General">General</SelectItem>
                                        <SelectItem value="Math">Math</SelectItem>
                                        <SelectItem value="Science">Science</SelectItem>
                                        <SelectItem value="History">History</SelectItem>
                                        <SelectItem value="CS">CS</SelectItem>
                                        <SelectItem value="Personal">Personal</SelectItem>
                                    </SelectContent>
                                </Select>
                        </div>
                        
                         <div className="space-y-2 flex flex-col">
                            <label className="text-sm font-medium text-white/60">Date</label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant={"outline"}
                                        className={cn(
                                            "w-full justify-start text-left font-normal bg-white/5 border-white/10 hover:bg-white/10 hover:text-white",
                                            !selectedDate && "text-muted-foreground"
                                        )}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0 bg-zinc-950 border-white/10 text-white z-[60]" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={selectedDate}
                                        onSelect={(date) => date && setSelectedDate(date)}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
                    </div>

                    <DialogFooter className="pt-4">
                        <Button type="button" variant="ghost" onClick={onClose} className="hover:bg-white/10 text-white/60 hover:text-white">Cancel</Button>
                        <Button type="submit" className="bg-indigo-600 hover:bg-indigo-500 text-white">Create Task</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
