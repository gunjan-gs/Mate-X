"use client"

import { DailySchedule } from "@/components/app/daily-schedule"
import { SessionHistoryChart } from "@/components/app/session-history-chart"
import { ChatInterface } from "@/components/app/chat-interface"
import { SparklineCard } from "@/components/app/sparkline-card"
import { useTaskStore } from "@/stores/useTaskStore"
import { useFocusStore } from "@/stores/useFocusStore"
import { useSettingsStore } from "@/stores/useSettingsStore"
import { motion } from "framer-motion"
import { format } from "date-fns"
import { CrystalCard } from "@/components/ui/crystal-card"

import { Flame } from "lucide-react"

import { getDailyQuote } from "@/lib/quotes"

export default function DashboardPage() {
  const currentHour = new Date().getHours()
  const greeting = currentHour < 12 ? "Good morning" : currentHour < 18 ? "Good afternoon" : "Good evening"
  
  const tasks = useTaskStore((state) => state.tasks)
  const { profile } = useSettingsStore()
  const { dailyGoal, getTotalFocusTimeToday, streak } = useFocusStore()

  const quote = getDailyQuote()

  // Computed Stats
  const completedTasks = tasks.filter(t => t.status === 'completed').length
  const minutesStudied = getTotalFocusTimeToday()
  const hoursStudied = (minutesStudied / 60).toFixed(1)
  
  // Mock Data for Sparklines (Zeroed for new account)
  const focusTrend = [
    { value: 0 }, { value: 0 }, { value: 0 }, { value: 0 }, { value: 0 }, { value: 0 }, { value: minutesStudied }
  ]
  
  const taskTrend = [
    { value: 0 }, { value: 0 }, { value: 0 }, { value: 0 }, { value: 0 }, { value: 0 }, { value: completedTasks }
  ]

  const gpaTrend = [
     { value: 3.5 }, { value: 3.5 }, { value: 3.5 }, { value: 3.5 }, { value: 3.5 }, { value: 3.5 }, { value: 3.5 }
  ]

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-light tracking-tight text-white mb-2">{greeting}, <span className="font-medium">{profile.name}</span></h1>
          <div className="flex flex-col gap-1">
             <p className="text-white/40 text-sm italic">"{quote.text}"</p>
             <p className="text-white/20 text-xs">— {quote.author}</p>
          </div>
        </div>
        
        {/* Streak Badge */}
        <div className="flex items-center gap-3 bg-white/5 px-4 py-2 rounded-full border border-white/10 backdrop-blur-md group hover:border-indigo-500/30 transition-colors">
            <div className="p-1.5 rounded-full bg-indigo-500/10 text-indigo-400 group-hover:text-indigo-300 group-hover:bg-indigo-500/20 transition-all shadow-[0_0_10px_rgba(99,102,241,0.2)]">
                <Flame className="w-5 h-5 fill-current" />
            </div>
            <div>
                <p className="text-white font-bold leading-none">{streak}</p>
                <p className="text-[10px] text-white/40 uppercase tracking-wider font-medium">Day Streak</p>
            </div>
        </div>
      </div>

      {/* Premium Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <SparklineCard 
                title="Focus Hours" 
                value={hoursStudied} 
                data={focusTrend} 
                trend={{ value: "+12% vs last week", isPositive: true }}
                color="#818cf8"
            />
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <SparklineCard 
                title="Tasks Completed" 
                value={completedTasks} 
                data={taskTrend} 
                trend={{ value: "On track", isPositive: true }}
                color="#34d399"
            />
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <SparklineCard 
                title="Est. GPA" 
                value="3.9" 
                data={gpaTrend} 
                trend={{ value: "Top 5%", isPositive: true }}
                color="#f472b6"
            />
        </motion.div>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Column (Schedule & Analytics) */}
        <div className="lg:col-span-2 space-y-6">
            {/* Session History */}
            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }} 
                animate={{ opacity: 1, scale: 1 }} 
                transition={{ delay: 0.4 }}
            >
                <CrystalCard>
                    <DailySchedule />
                </CrystalCard>
            </motion.div>

            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }} 
                animate={{ opacity: 1, scale: 1 }} 
                transition={{ delay: 0.5 }}
            >
                 <CrystalCard className="p-6">
                     <h2 className="text-lg font-medium text-white/80 mb-4">Productivity Trends</h2>
                     <SessionHistoryChart />
                 </CrystalCard>
            </motion.div>
        </div>

        {/* Right Column (AI Assistant & Quick Actions) */}
        <div className="space-y-6">
            <motion.div 
                initial={{ opacity: 0, x: 20 }} 
                animate={{ opacity: 1, x: 0 }} 
                transition={{ delay: 0.6 }}
                className="h-full"
            >
                <CrystalCard className="h-[600px] flex flex-col bg-indigo-500/5">
                    <ChatInterface />
                </CrystalCard>
            </motion.div>
        </div>

      </div>
    </div>
  )
}
