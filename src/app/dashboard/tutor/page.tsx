"use client"

import { useState, useRef, useEffect } from "react"
import { Send, Bot, User, Sparkles, BookOpen, GraduationCap, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Logo } from "@/components/brand/logo"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"
import { GeminiService } from "@/lib/gemini"
import ReactMarkdown from 'react-markdown'
import { CrystalCard } from "@/components/ui/crystal-card"

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: '1',
    role: 'assistant',
    content: "# Welcome to Your AI Tutor 🎓\nI'm here to help you master complex concepts, solve doubts, and build exam strategies.\n\n**Try asking:**\n* \"Explain Quantum Entanglement simply\"\n* \"Create a study plan for Calculus\"\n* \" quiz me on Organic Chemistry\""
  }
]

export default function TutorPage() {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES)
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, isTyping])

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault()
    if (!input.trim() || isTyping) return

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input
    }

    setMessages(prev => [...prev, userMsg])
    setInput("")
    setIsTyping(true)

    try {
        const history = messages.map(m => ({
            role: (m.role === 'user' ? 'user' : 'model') as 'user' | 'model',
            parts: [{ text: m.content }]
        }))

        const responseText = await GeminiService.chatWithTutor(userMsg.content, history)

        const aiMsg: Message = {
            id: (Date.now() + 1).toString(),
            role: 'assistant',
            content: responseText
        }
        
        setMessages(prev => [...prev, aiMsg])
    } catch (error: any) {
        setMessages(prev => [...prev, {
            id: (Date.now() + 1).toString(),
            role: 'assistant',
            content: `**Error:** ${error.message || "I'm having trouble connecting to the neural network."}`
        }])
    } finally {
        setIsTyping(false)
    }
  }

  return (
    <div className="h-[calc(100vh-2rem)] flex gap-6">
        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col h-full">
            <CrystalCard className="flex-1 flex flex-col overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-white/5 bg-white/[0.02] backdrop-blur-md z-10">
                    <div className="flex items-center gap-3">
                        <div className="p-1.5 bg-gradient-to-tr from-indigo-500/20 to-purple-600/20 rounded-lg shadow-lg shadow-indigo-500/10 border border-indigo-500/20">
                            <Logo size="sm" showText={false} />
                        </div>
                        <div>
                            <h2 className="text-sm font-semibold text-white">Mate-X Tutor</h2>
                            <p className="text-xs text-indigo-300 flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                Gemini Pro Active
                            </p>
                        </div>
                    </div>
                </div>

                {/* Chat Area */}
                <div 
                    ref={scrollRef}
                    className="flex-1 p-6 space-y-6 overflow-y-auto custom-scrollbar relative"
                >
                    <AnimatePresence initial={false}>
                        {messages.map((msg) => (
                            <motion.div 
                                key={msg.id} 
                                initial={{ opacity: 0, y: 10, scale: 0.98 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                            >
                                <div className={cn(
                                    "h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 border mt-1",
                                    msg.role === 'assistant' ? "bg-black border-white/10" : "bg-white border-white/20 text-black"
                                )}>
                                    {msg.role === 'assistant' ? (
                                        <GraduationCap className="h-4 w-4 text-indigo-400" />
                                    ) : (
                                        <User className="h-4 w-4" />
                                    )}
                                </div>
                                <div className={cn(
                                    "rounded-2xl p-5 text-sm max-w-[85%] leading-relaxed shadow-sm backdrop-blur-sm border",
                                    msg.role === 'assistant' 
                                    ? "bg-white/[0.03] border-white/[0.05] text-zinc-300 rounded-tl-sm" 
                                    : "bg-indigo-600 border-indigo-500 text-white rounded-tr-sm"
                                )}>
                                    <div className="prose prose-invert prose-sm max-w-none prose-p:leading-relaxed prose-pre:bg-black/50 prose-pre:border prose-pre:border-white/10">
                                        <ReactMarkdown 
                                            components={{
                                                code: ({node, inline, className, children, ...props}: any) => {
                                                    if (inline) {
                                                        return <code className="bg-white/10 rounded px-1 py-0.5 text-indigo-200" {...props}>{children}</code>
                                                    }
                                                    return <code className={className} {...props}>{children}</code>
                                                }
                                            }}
                                        >
                                            {msg.content}
                                        </ReactMarkdown>
                                    </div>
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
                                <GraduationCap className="h-4 w-4 text-indigo-400" />
                            </div>
                            <div className="bg-white/[0.03] border border-white/[0.05] rounded-2xl rounded-tl-sm p-4 flex items-center gap-1.5">
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
                        className="relative flex items-center bg-white/[0.03] border border-white/10 rounded-xl focus-within:ring-1 focus-within:ring-indigo-500/30 focus-within:border-indigo-500/30 transition-all shadow-lg"
                    >
                        <div className="pl-4 text-white/30">
                            <Sparkles className="h-4 w-4" />
                        </div>
                        <input 
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            type="text" 
                            placeholder="Ask me anything..." 
                            className="flex-1 bg-transparent border-none focus:outline-none text-sm text-white px-4 py-4 placeholder:text-white/20"
                        />
                        <Button 
                            type="submit" 
                            size="icon"
                            variant="ghost"
                            className="h-9 w-9 mr-2 rounded-lg hover:bg-indigo-500/20 text-indigo-400 hover:text-indigo-300 transition-colors"
                            disabled={!input.trim() || isTyping}
                        >
                            <Send className="h-4 w-4" />
                        </Button>
                    </form>
                    <div className="text-[10px] text-center mt-3 text-white/20">
                        AI can make mistakes. Verify important information.
                    </div>
                </div>
            </CrystalCard>
        </div>

        {/* Sidebar - Quick Prompts */}
        <div className="w-80 hidden lg:flex flex-col gap-4">
             <CrystalCard className="p-5 h-full bg-indigo-900/5">
                <h3 className="text-sm font-semibold text-white/80 mb-4 flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-indigo-400" />
                    Learning Modes
                </h3>
                
                <div className="space-y-3">
                    <Button variant="outline" className="w-full justify-start text-left h-auto py-3 px-4 bg-white/5 border-white/5 hover:bg-white/10 hover:border-indigo-500/30 text-zinc-300 hover:text-white transition-all group">
                        <div className="flex flex-col gap-1">
                            <span className="font-medium text-xs text-white group-hover:text-indigo-300">Explain Like I'm 5</span>
                            <span className="text-[10px] text-white/40">Simplify complex topics</span>
                        </div>
                    </Button>
                    <Button variant="outline" className="w-full justify-start text-left h-auto py-3 px-4 bg-white/5 border-white/5 hover:bg-white/10 hover:border-indigo-500/30 text-zinc-300 hover:text-white transition-all group">
                         <div className="flex flex-col gap-1">
                            <span className="font-medium text-xs text-white group-hover:text-indigo-300">Exam Drill</span>
                            <span className="text-[10px] text-white/40">Test my knowledge</span>
                        </div>
                    </Button>
                    <Button variant="outline" className="w-full justify-start text-left h-auto py-3 px-4 bg-white/5 border-white/5 hover:bg-white/10 hover:border-indigo-500/30 text-zinc-300 hover:text-white transition-all group">
                         <div className="flex flex-col gap-1">
                            <span className="font-medium text-xs text-white group-hover:text-indigo-300">Debug Code</span>
                            <span className="text-[10px] text-white/40">Find errors in my code</span>
                        </div>
                    </Button>
                </div>

                <div className="mt-8 pt-6 border-t border-white/5">
                    <h3 className="text-sm font-semibold text-white/80 mb-4 flex items-center gap-2">
                        <Zap className="w-4 h-4 text-yellow-400" />
                        Recent Topics
                    </h3>
                    <div className="space-y-2">
                        <div className="text-xs text-white/50 hover:text-white cursor-pointer px-2 py-1.5 rounded hover:bg-white/5 transition-colors truncate">
                            Linear Algebra: Eigenvalues
                        </div>
                        <div className="text-xs text-white/50 hover:text-white cursor-pointer px-2 py-1.5 rounded hover:bg-white/5 transition-colors truncate">
                            React: useEffect Hooks
                        </div>
                        <div className="text-xs text-white/50 hover:text-white cursor-pointer px-2 py-1.5 rounded hover:bg-white/5 transition-colors truncate">
                            History: French Revolution
                        </div>
                    </div>
                </div>
             </CrystalCard>
        </div>
    </div>
  )
}
