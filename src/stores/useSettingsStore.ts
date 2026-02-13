import { create } from 'zustand'

interface UserProfile {
  name: string
  email: string
  avatar?: string
}

interface SettingsState {
  theme: 'light' | 'dark' | 'system'
  profile: UserProfile
  notificationsEnabled: boolean
  soundEnabled: boolean
  
  // Actions
  setTheme: (theme: 'light' | 'dark' | 'system') => void
  updateProfile: (profile: Partial<UserProfile>) => void
  toggleNotifications: () => void
  toggleSound: () => void
}

export const useSettingsStore = create<SettingsState>((set) => ({
  theme: 'system',
  profile: {
    name: 'Student',
    email: 'demo@mate-x.ai'
  },
  notificationsEnabled: true,
  soundEnabled: true,

  setTheme: (theme) => set({ theme }),
  
  updateProfile: (updates) => set((state) => ({
    profile: { ...state.profile, ...updates }
  })),

  toggleNotifications: () => set((state) => ({ notificationsEnabled: !state.notificationsEnabled })),
  
  toggleSound: () => set((state) => ({ soundEnabled: !state.soundEnabled }))
}))
