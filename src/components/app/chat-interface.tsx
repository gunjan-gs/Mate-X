"use client"

import { useState, useRef, useEffect } from "react"
import { Send, Sparkles, Bot, User, Command } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Logo } from "@/components/brand/logo"
import { useTaskStore } from "@/stores/useTaskStore"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: '1',
    role: 'assistant',
    content: "Good afternoon. I'm ready to help you optimize your study session. What's on your mind?"
  }
]

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES)
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  
  const { mockGenerateSchedule } = useTaskStore()

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, isTyping])

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault()
    if (!input.trim()) return

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input
    }

    setMessages(prev => [...prev, userMsg])
    setInput("")
    setIsTyping(true)

    // Simulate AI thinking and smart logic
    setTimeout(() => {
        let responseContent = "I can help with that. Could you provide more details?"
        const lowerInput = userMsg.content.toLowerCase()

        // Smart Heuristics
        if (lowerInput.includes("schedule") || lowerInput.includes("plan")) {
            mockGenerateSchedule()
            responseContent = "I've analyzed your subjects and generated an optimized study schedule for today based on your focus history."
        } else if (lowerInput.includes("calculate") || lowerInput.includes("math")) {
            responseContent = "I can help with the math concepts. For complex calculations, try breaking them down into steps."
        } else if (lowerInput.includes("explain") || lowerInput.includes("what is")) {
             responseContent = "That's a great question. Let me break it down..."
        }

        const aiMsg: Message = {
            id: (Date.now() + 1).toString(),
            role: 'assistant',
            content: responseContent
        }
        
        setMessages(prev => [...prev, aiMsg])
        setIsTyping(false)
    }, 1500)
  }

  return (
    <div className="flex flex-col h-full relative overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/5 bg-white/5 backdrop-blur-md">
            <div className="flex items-center gap-3">
                <div className="p-1.5 bg-gradient-to-tr from-indigo-500/20 to-purple-600/20 rounded-lg shadow-lg shadow-indigo-500/10 border border-indigo-500/20">
                    <Logo size="sm" showText={false} />
                </div>
                <div>
                    <h2 className="text-sm font-semibold text-white">Mate-X AI</h2>
                    <p className="text-xs text-indigo-300 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        Online
                    </p>
                </div>
            </div>
        </div>

        {/* Chat Area */}
        <div 
            ref={scrollRef}
            className="flex-1 p-6 space-y-6 overflow-y-auto custom-scrollbar"
        >
            <AnimatePresence initial={false}>
                {messages.map((msg) => (
                    <motion.div 
                        key={msg.id} 
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                    >
                        <div className={cn(
                            "h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 border",
                            msg.role === 'assistant' ? "bg-black border-white/10" : "bg-white border-white/20 text-black"
                        )}>
                            {msg.role === 'assistant' ? (
                                <Bot className="h-4 w-4 text-indigo-400" />
                            ) : (
                                <User className="h-4 w-4" />
                            )}
                        </div>
                        <div className={cn(
                            "rounded-2xl p-4 text-sm max-w-[85%] leading-relaxed shadow-sm backdrop-blur-sm border",
                            msg.role === 'assistant' 
                            ? "bg-white/5 border-white/5 text-zinc-300 rounded-tl-sm" 
                            : "bg-indigo-600 border-indigo-500 text-white rounded-tr-sm"
                        )}>
                            {msg.content}
                        </div>
                    </motion.div>
                ))}
            </AnimatePresence>

            {isTyping && (
                <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex gap-4"
                >
                    <div className="h-8 w-8 rounded-full bg-black border border-white/10 flex items-center justify-center flex-shrink-0">
                        <Bot className="h-4 w-4 text-indigo-400" />
                    </div>
                    <div className="bg-white/5 border border-white/5 rounded-2xl rounded-tl-sm p-4 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                        <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                        <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" />
                    </div>
                </motion.div>
            )}
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-white/5 bg-black/20 backdrop-blur-md">
            <form 
                onSubmit={handleSend} 
                className="relative flex items-center bg-white/5 border border-white/10 rounded-xl focus-within:ring-1 focus-within:ring-indigo-500/50 focus-within:border-indigo-500/50 transition-all"
            >
                <div className="pl-4 text-muted-foreground">
                    <Command className="h-4 w-4" />
                </div>
                <input 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    type="text" 
                    placeholder="Ask AI to schedule tasks..." 
                    className="flex-1 bg-transparent border-none focus:outline-none text-sm text-white px-4 py-4 placeholder:text-muted-foreground/50"
                />
                <Button 
                    type="submit" 
                    size="icon"
                    variant="ghost"
                    className="h-8 w-8 mr-2 rounded-lg hover:bg-indigo-500/20 text-indigo-400 hover:text-indigo-300 transition-colors"
                    disabled={!input.trim() || isTyping}
                >
                    <Send className="h-4 w-4" />
                </Button>
            </form>
           <div className="text-[10px] text-center mt-2 text-muted-foreground/40">
                AI can make mistakes. Review generated schedules.
           </div>
        </div>
    </div>
  )
}
