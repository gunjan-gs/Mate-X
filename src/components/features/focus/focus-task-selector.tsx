"use client"

import * as React from "react"
import { Check, ChevronsUpDown, ListTodo, MoreHorizontal } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Task } from "@/stores/useTaskStore"

interface FocusTaskSelectorProps {
    tasks: Task[]
    activeTaskId: string | null
    onSelect: (taskId: string) => void
}

export function FocusTaskSelector({ tasks, activeTaskId, onSelect }: FocusTaskSelectorProps) {
  const [open, setOpen] = React.useState(false)
  const activeTask = tasks.find((task) => task.id === activeTaskId)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[320px] justify-between rounded-full bg-white/5 border-white/10 hover:bg-white/10 text-white hover:text-white backdrop-blur-md transition-all h-12 shadow-lg shadow-black/20"
        >
          {activeTask ? (
              <span className="flex items-center gap-2 truncate">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                  {activeTask.title}
              </span>
          ) : (
             <span className="text-white/50 font-normal">Select a task to focus on...</span>
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[320px] p-0 bg-zinc-950 border-white/10 text-white shadow-2xl rounded-xl overflow-hidden">
        <Command className="bg-transparent">
          <CommandInput placeholder="Search tasks..." className="text-white placeholder:text-white/40 border-b border-white/10" />
          <CommandList>
            <CommandEmpty className="py-6 text-center text-sm text-white/40">No tasks found.</CommandEmpty>
            <CommandGroup className="p-1.5">
              {tasks.filter(t => t.status !== 'completed').map((task) => (
                <CommandItem
                    key={task.id}
                    value={tasks.find(t => t.id === task.id)?.title} // Use title for search
                    onSelect={() => {
                        onSelect(task.id)
                        setOpen(false)
                    }}
                    className="flex items-center gap-2 px-3 py-2.5 rounded-lg data-[selected='true']:bg-white/10 cursor-pointer text-white/80 hover:text-white transition-colors"
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4 text-indigo-400",
                      activeTaskId === task.id ? "opacity-100" : "opacity-0"
                    )}
                  />
                  <span className="truncate">{task.title}</span>
                  {task.priority === 'high' && (
                      <span className="ml-auto text-[10px] uppercase font-bold tracking-wider text-amber-500/80 bg-amber-500/10 px-1.5 py-0.5 rounded">High</span>
                  )}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
