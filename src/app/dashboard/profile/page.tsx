"use client"

import { useSettingsStore } from "@/stores/useSettingsStore"
import { motion } from "framer-motion"
import { Bell, Volume2, User, Mail, Shield } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { cn } from "@/lib/utils"

export default function ProfilePage() {
  const { 
    profile, 
    notificationsEnabled, 
    toggleNotifications, 
    soundEnabled, 
    toggleSound 
  } = useSettingsStore()

  const cardClass = "bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md"
  const rowClass = "flex items-center justify-between py-4"

  const container = {
      hidden: { opacity: 0 },
      show: {
          opacity: 1,
          transition: {
              staggerChildren: 0.1
          }
      }
  }

  const item = {
      hidden: { y: 20, opacity: 0 },
      show: { y: 0, opacity: 1 }
  }

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8">
      <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
      >
          <h1 className="text-3xl font-bold text-white mb-2">My Profile</h1>
          <p className="text-white/40">Manage your account and preferences.</p>
      </motion.div>

      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="space-y-6"
      >
          {/* User Profile Card */}
          <motion.div variants={item} className={cardClass}>
              <div className="flex items-center gap-6 mb-8">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-2xl font-bold text-white shadow-xl shadow-indigo-500/20">
                      {profile.name.charAt(0)}
                  </div>
                  <div>
                      <h2 className="text-xl font-semibold text-white">{profile.name}</h2>
                      <p className="text-white/40">{profile.email}</p>
                      <span className="inline-block mt-2 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-amber-500/10 text-amber-500 border border-amber-500/20">
                          Pro Plan
                      </span>
                  </div>
              </div>

              <div className="grid gap-4">
                  <div className="flex items-center gap-4 text-sm text-white/60 p-3 bg-white/5 rounded-lg border border-white/5">
                      <User className="w-4 h-4" />
                      <span>Display Name: <span className="text-white">{profile.name}</span></span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-white/60 p-3 bg-white/5 rounded-lg border border-white/5">
                      <Mail className="w-4 h-4" />
                      <span>Email: <span className="text-white">{profile.email}</span></span>
                  </div>
              </div>
          </motion.div>

          {/* Preferences Section */}
          <motion.div variants={item}>
              <h3 className="text-lg font-medium text-white mb-4 px-1">Preferences</h3>
              <div className={cardClass}>
                  
                  {/* Separator - Appearance Removed */}
                  
                  {/* Notifications */}
                  <div className={rowClass}>
                      <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
                              <Bell className="w-5 h-5" />
                          </div>
                          <div>
                              <p className="font-medium text-white">Notifications</p>
                              <p className="text-sm text-white/40">Receive alerts for tasks and breaks.</p>
                          </div>
                      </div>
                      <Switch 
                          checked={notificationsEnabled}
                          onCheckedChange={toggleNotifications}
                      />
                  </div>

                  {/* Separator */}
                  <div className="h-px bg-white/5 my-2" />

                  {/* Sound */}
                  <div className={rowClass}>
                      <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-pink-500/10 text-pink-400">
                              <Volume2 className="w-5 h-5" />
                          </div>
                          <div>
                              <p className="font-medium text-white">Sound Effects</p>
                              <p className="text-sm text-white/40">Play sounds for timer completion.</p>
                          </div>
                      </div>
                      <Switch 
                          checked={soundEnabled}
                          onCheckedChange={toggleSound}
                      />
                  </div>
              </div>
          </motion.div>

          {/* Account Section */}
          <motion.div variants={item}>
              <h3 className="text-lg font-medium text-white mb-4 px-1">Account</h3>
              <div className={cardClass}>
                   <div className={rowClass}>
                      <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-zinc-500/10 text-zinc-400">
                              <Shield className="w-5 h-5" />
                          </div>
                          <div>
                              <p className="font-medium text-white">Password & Security</p>
                              <p className="text-sm text-white/40">Manage your password and security settings.</p>
                          </div>
                      </div>
                      <button className="text-sm font-medium text-white/60 hover:text-white transition-colors">
                          Change
                      </button>
                  </div>
              </div>
          </motion.div>

      </motion.div>
    </div>
  )
}
