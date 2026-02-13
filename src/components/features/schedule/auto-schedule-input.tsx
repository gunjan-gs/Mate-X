"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sparkles, Loader2 } from "lucide-react"
import { useTaskStore } from "@/stores/useTaskStore"
import { GeminiService } from "@/lib/gemini"
import { toast } from "sonner"

interface AutoScheduleInputProps {
    isOpen: boolean
    onClose: () => void
}

export function AutoScheduleInput({ isOpen, onClose }: AutoScheduleInputProps) {
    const [prompt, setPrompt] = useState("")
    const [isGenerating, setIsGenerating] = useState(false)
    const { addTask } = useTaskStore()

    const handleGenerate = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!prompt.trim()) return

        setIsGenerating(true)
        try {
            const generatedTasks = await GeminiService.generateTasksFromInput(prompt)
            
            // Add generated tasks to store
            generatedTasks.forEach((t: any) => {
                addTask({
                    title: t.title,
                    duration: t.duration,
                    category: t.category,
                    priority: t.priority,
                    type: 'study',
                    date: new Date().toISOString(), // Default to today
                    startTime: "09:00" // Will need arrangement later
                })
            })

            toast.success(`Generated ${generatedTasks.length} tasks!`, {
                description: "Now use Magic Arrange to schedule them."
            })
            
            setPrompt("")
            onClose()
        } catch (error: any) {
            toast.error("Generation failed", {
                description: error.message || "AI could not create tasks. Please try again."
            })
        } finally {
            setIsGenerating(false)
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="bg-black/40 border border-white/10 backdrop-blur-xl text-white sm:rounded-2xl">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-indigo-400" />
                        Auto-Generate Schedule
                    </DialogTitle>
                </DialogHeader>
                
                <form onSubmit={handleGenerate} className="space-y-4 py-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-white/60">What's your goal for today?</label>
                        <Input 
                            value={prompt} 
                            onChange={(e) => setPrompt(e.target.value)}
                            placeholder="e.g., Prepare for Math Final Exam"
                            className="bg-white/5 border-white/10 focus:border-indigo-500/50"
                            autoFocus
                        />
                        <p className="text-xs text-white/40">
                            AI will break this down into actionable study tasks.
                        </p>
                    </div>

                    <DialogFooter className="pt-4">
                        <Button type="button" variant="ghost" onClick={onClose} className="hover:bg-white/10 text-white/60 hover:text-white">Cancel</Button>
                        <Button 
                            type="submit" 
                            className="bg-indigo-600 hover:bg-indigo-500 text-white"
                            disabled={!prompt.trim() || isGenerating}
                        >
                            {isGenerating ? (
                                <>
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                    Generating...
                                </>
                            ) : (
                                "Generate Tasks"
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
