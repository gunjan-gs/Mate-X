import { create } from 'zustand'

export type FocusMode = 'focus' | 'shortBreak' | 'longBreak'

interface FocusSession {
  id: string
  taskId?: string
  startTime: string
  duration: number // minutes
  mode: FocusMode
  completed: boolean
}

interface FocusState {
  currentMode: FocusMode
  timeLeft: number // seconds
  isActive: boolean
  dailyGoal: number // minutes
  sessions: FocusSession[]
  streak: number // Current day streak
  
  // Actions
  setMode: (mode: FocusMode) => void
  setTimeLeft: (seconds: number) => void
  setIsActive: (isActive: boolean) => void
  logSession: (session: FocusSession) => void
  resetDailyProgress: () => void // Call at midnight
  
  // Computed (handled via getters/hooks in components usually, but simple helpers here)
  getTotalFocusTimeToday: () => number
}

const MODE_DURATIONS: Record<FocusMode, number> = {
  focus: 25 * 60,
  shortBreak: 5 * 60,
  longBreak: 15 * 60,
}

export const useFocusStore = create<FocusState>((set, get) => ({
  currentMode: 'focus',
  timeLeft: MODE_DURATIONS.focus,
  isActive: false,
  dailyGoal: 240, // 4 hours default
  sessions: [],
  streak: 0,

  setMode: (mode) => set({ 
    currentMode: mode, 
    timeLeft: MODE_DURATIONS[mode],
    isActive: false 
  }),

  setTimeLeft: (seconds) => set({ timeLeft: seconds }),
  
  setIsActive: (isActive) => set({ isActive }),

  logSession: (session) => set((state) => {
    // Simple ephemeral streak logic:
    // If it's the first session ever in this ephemeral state, streak becomes 1.
    // If there are existing sessions today, streak stays.
    // Real persistence would check dates properly, but for this ephemeral demo:
    // We'll just increment streak if this is the very first session logged.
    
    let newStreak = state.streak
    if (state.sessions.length === 0) {
        newStreak = 1
    }
    
    return { 
      sessions: [...state.sessions, session],
      streak: newStreak
    }
  }),

  resetDailyProgress: () => {
     // This logic might need to be called on hydration or app init
     // For now, we just keep all sessions and filter by date in UI
  },

  getTotalFocusTimeToday: () => {
    const today = new Date().toDateString()
    const state = get()
    return state.sessions
      .filter(s => new Date(s.startTime).toDateString() === today && s.mode === 'focus')
      .reduce((acc, curr) => acc + curr.duration, 0)
  }
}))
