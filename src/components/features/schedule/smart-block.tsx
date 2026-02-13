"use client"

import { useTaskStore, Task } from "@/stores/useTaskStore"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { Clock, CheckCircle2, MoreVertical, Play, Pause, RotateCcw } from "lucide-react"
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"

interface SmartBlockProps {
    task: Task
    style: React.CSSProperties
    onEdit: (task: Task) => void
}

export function SmartBlock({ task, style, onEdit }: SmartBlockProps) {
    const { toggleTaskStatus, deleteTask, activeTaskId, setActiveTask } = useTaskStore()
    const isActive = activeTaskId === task.id

    // Calculate color based on status/type
    const getStatusColor = () => {
        if (task.status === 'completed') return "bg-emerald-500/10 border-l-emerald-500/50"
        if (isActive) return "bg-indigo-500/10 border-l-indigo-500"
        if (task.priority === 'high') return "bg-rose-500/10 border-l-rose-500/50"
        return "bg-white/5 border-l-white/20"
    }

    return (
        <ContextMenu>
            <ContextMenuTrigger asChild>
                <motion.div
                    layoutId={task.id}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.01, zIndex: 20 }}
                    style={style}
                    onClick={() => onEdit(task)}
                    className={cn(
                        "absolute inset-x-1 rounded-sm p-2 text-xs border-l-[3px] transition-all cursor-pointer group flex flex-col justify-between overflow-hidden hover:brightness-110 shadow-sm",
                        getStatusColor(),
                        isActive && "ring-1 ring-indigo-500/30 shadow-lg shadow-indigo-500/10"
                    )}
                >
                    <div className="flex justify-between items-start gap-1">
                        <span className={cn(
                            "font-medium truncate leading-tight",
                            task.status === 'completed' ? "text-white/40 line-through decoration-white/20" : "text-white/90"
                        )}>
                            {task.title}
                        </span>
                        {task.status === 'completed' && <CheckCircle2 className="w-3 h-3 text-emerald-500/80 flex-shrink-0" />}
                    </div>

                    {task.duration >= 45 && (
                        <div className="flex items-end justify-between text-[10px] text-white/40 group-hover:text-white/60 transition-colors">
                            <div className="flex items-center gap-1">
                                <Clock className="w-3 h-3 opacity-50" />
                                <span className="font-mono opacity-80">{task.startTime}</span>
                            </div>
                            <span className="uppercase tracking-wider text-[8px] font-bold opacity-60 bg-black/20 px-1 rounded">
                                {task.category}
                            </span>
                        </div>
                    )}

                    {/* Hover Quick Action */}
                    <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                            onClick={(e) => { e.stopPropagation(); toggleTaskStatus(task.id) }}
                            className="p-1 hover:bg-black/40 rounded-full text-white/50 hover:text-white transition-colors"
                        >
                            {task.status === 'completed' ? <RotateCcw className="w-3 h-3" /> : <CheckCircle2 className="w-3 h-3" />}
                        </button>
                    </div>

                </motion.div>
            </ContextMenuTrigger>
            <ContextMenuContent className="w-48 bg-black/90 border-white/10 text-white backdrop-blur-xl">
                 <ContextMenuLabel>Task Actions</ContextMenuLabel>
                 <ContextMenuSeparator className="bg-white/10" />
                 <ContextMenuItem onClick={() => onEdit(task)} className="focus:bg-white/10 focus:text-white">
                    Edit Task
                 </ContextMenuItem>
                 <ContextMenuItem onClick={() => toggleTaskStatus(task.id)} className="focus:bg-white/10 focus:text-white">
                    {task.status === 'completed' ? 'Mark Incomplete' : 'Mark Complete'}
                 </ContextMenuItem>
                 <ContextMenuSeparator className="bg-white/10" />
                 <ContextMenuItem onClick={() => deleteTask(task.id)} className="text-rose-400 focus:text-rose-400 focus:bg-rose-500/10">
                    Delete
                 </ContextMenuItem>
            </ContextMenuContent>
        </ContextMenu>
    )
}
