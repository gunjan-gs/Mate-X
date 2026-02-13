"use client"

import * as React from "react"
import { Send, Sparkles } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useTaskStore } from "@/stores/useTaskStore"

export function TaskInput() {
  const [value, setValue] = React.useState("")
  const [isProcessing, setIsProcessing] = React.useState(false)
  const addTask = useTaskStore((state) => state.addTask)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!value.trim()) return

    setIsProcessing(true)

    // Simulate "AI" parsing delay
    setTimeout(() => {
      const parsed = mockParseTask(value)
      addTask(parsed)
      setValue("")
      setIsProcessing(false)
    }, 600)
  }

  // Mock NLP logic (Smart Heuristics)
  const mockParseTask = (input: string) => {
    const lower = input.toLowerCase()
    let type: 'focus' | 'study' | 'break' | 'event' = 'study'
    let duration = 60 // default 1h
    let category = 'General'

    // Duration extraction (heuristics)
    if (lower.includes("30 min")) duration = 30
    else if (lower.includes("15 min")) duration = 15
    else if (lower.includes("2 hours") || lower.includes("2h")) duration = 120
    else if (lower.includes("hour") || lower.includes("1h")) duration = 60

    // Type extraction
    if (lower.includes("focus") || lower.includes("deep work")) type = 'focus'
    else if (lower.includes("break") || lower.includes("lunch")) type = 'break'
    else if (lower.includes("meet") || lower.includes("class")) type = 'event'

    // Category extraction
    if (lower.includes("math") || lower.includes("algebra") || lower.includes("calc")) category = 'Math'
    else if (lower.includes("history") || lower.includes("essay")) category = 'History'
    else if (lower.includes("code") || lower.includes("cs") || lower.includes("project")) category = 'CS'

    // Priority extraction
    let priority: 'low' | 'medium' | 'high' = 'medium'
    if (lower.includes("important") || lower.includes("urgent") || lower.includes("exam")) priority = 'high'
    else if (lower.includes("maybe") || lower.includes("later")) priority = 'low'
    
    // Auto-set high priority for deep work
    if (type === 'focus') priority = 'high'

    return {
      title: input,
      type,
      duration,
      priority,
      category,
      date: new Date().toISOString()
    }
  }

  return (
    <form onSubmit={handleSubmit} className="relative group">
      <div className="relative">
        <Input 
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Ask Mate-X to schedule something... (e.g., 'Study Math for 2 hours')"
          className="pr-24 h-12 bg-white/5 border-white/10 backdrop-blur-sm focus:bg-white/10 focus:border-indigo-500/50 transition-all text-base shadow-lg shadow-black/5"
        />
        <div className="absolute right-1 top-1 flex items-center gap-1">
           {value && (
             <Button 
                size="sm" 
                type="submit"
                disabled={isProcessing}
                className="h-10 px-3 bg-indigo-500 hover:bg-indigo-600 text-white transition-all rounded-md"
             >
               {isProcessing ? (
                 <Sparkles className="h-4 w-4 animate-spin" />
               ) : (
                 <Send className="h-4 w-4" />
               )}
             </Button>
           )}
        </div>
      </div>
      {/* Helper text that appears on focus could go here */}
    </form>
  )
}
