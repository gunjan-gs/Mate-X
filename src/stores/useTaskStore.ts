import { create } from 'zustand'
import { v4 as uuidv4 } from 'uuid'
import { startOfToday, isBefore, isSameDay } from 'date-fns'

export type TaskType = 'focus' | 'study' | 'break' | 'event'
export type TaskStatus = 'pending' | 'active' | 'completed'

export interface Task {
  id: string
  title: string
  duration: number // in minutes
  type: TaskType
  status: TaskStatus
  priority: 'low' | 'medium' | 'high'
  category: string
  date: string // ISO date string
  startTime?: string // Optional for flexible tasks
  completedAt?: string
}

interface TaskState {
  tasks: Task[]
  activeTaskId: string | null
  
  // Actions
  addTask: (task: Omit<Task, 'id' | 'status'>) => void
  updateTask: (id: string, updates: Partial<Task>) => void
  deleteTask: (id: string) => void
  toggleTaskStatus: (id: string) => void
  setActiveTask: (id: string | null) => void
  mockGenerateSchedule: () => void // Use for demo data
  rescheduleOverdue: () => void
}

export const useTaskStore = create<TaskState>((set, get) => ({
  tasks: [],
  activeTaskId: null,

  addTask: (task) => set((state) => ({
    tasks: [...state.tasks, { ...task, id: uuidv4(), status: 'pending' }]
  })),

  updateTask: (id, updates) => set((state) => ({
    tasks: state.tasks.map((t) => t.id === id ? { ...t, ...updates } : t)
  })),

  deleteTask: (id) => set((state) => ({
    tasks: state.tasks.filter((t) => t.id !== id)
  })),

  toggleTaskStatus: (id) => set((state) => ({
    tasks: state.tasks.map((t) => {
      if (t.id !== id) return t
      const newStatus = t.status === 'completed' ? 'pending' : 'completed'
      return { 
        ...t, 
        status: newStatus,
        completedAt: newStatus === 'completed' ? new Date().toISOString() : undefined
      }
    })
  })),

  setActiveTask: (id) => set({ activeTaskId: id }),

  rescheduleOverdue: () => set((state) => {
    const today = startOfToday()
    return {
      tasks: state.tasks.map((t) => {
        if (t.status !== 'completed' && isBefore(new Date(t.date), today) && !isSameDay(new Date(t.date), today)) {
           return { ...t, date: today.toISOString() } // Move to today
        }
        return t
      })
    }
  }),

  mockGenerateSchedule: () => {
     const today = new Date().toISOString()
     set({
        tasks: [
            { id: '1', title: 'Deep Work: Linear Algebra', duration: 120, type: 'focus', status: 'completed', category: 'Math', priority: 'high', date: today, startTime: '09:00' },
            { id: '2', title: 'Review: History Essay', duration: 75, type: 'study', status: 'active', category: 'History', priority: 'medium', date: today, startTime: '11:15' },
            { id: '3', title: 'Lunch Break', duration: 60, type: 'break', status: 'pending', category: 'Personal', priority: 'low', date: today, startTime: '12:30' },
            { id: '4', title: 'Project: CS Algorithm Implementation', duration: 120, type: 'focus', status: 'pending', category: 'CS', priority: 'high', date: today, startTime: '13:30' },
        ]
     })
  }
}))
