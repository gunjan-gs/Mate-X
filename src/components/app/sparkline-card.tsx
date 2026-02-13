"use client"

import { CardContent } from "@/components/ui/card"
import { CrystalCard } from "@/components/ui/crystal-card"
import { ArrowUp, ArrowDown } from "lucide-react"
import { ResponsiveContainer, AreaChart, Area } from "recharts"

interface SparklineCardProps {
    title: string
    value: string | number
    data: { value: number }[]
    trend?: {
        value: string
        isPositive: boolean
    }
    color?: string
}

export function SparklineCard({ title, value, data, trend, color = "#818cf8" }: SparklineCardProps) {
  return (
    <CrystalCard className="group hover:bg-white/5 transition-colors duration-500">
      <CardContent className="p-0">
          <div className="p-6">
            <h3 className="text-sm font-medium text-white/50 mb-1 tracking-wide">{title}</h3>
            <div className="flex items-baseline gap-2">
                <span className="text-3xl font-light text-white tracking-tight tabular-nums">{value}</span>
                {trend && (
                    <div className={`flex items-center text-xs font-medium px-2 py-0.5 rounded-full border ${
                        trend.isPositive 
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                        : 'bg-red-500/10 text-red-400 border-red-500/20'
                    }`}>
                        {trend.isPositive ? <ArrowUp className="w-3 h-3 mr-1" /> : <ArrowDown className="w-3 h-3 mr-1" />}
                        {trend.value}
                    </div>
                )}
            </div>
          </div>

          <div className="h-24 w-full opacity-40 group-hover:opacity-80 transition-opacity duration-500 grayscale group-hover:grayscale-0">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                    <defs>
                        <linearGradient id={`gradient-${title}`} x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor={color} stopOpacity={0.4}/>
                            <stop offset="100%" stopColor={color} stopOpacity={0}/>
                        </linearGradient>
                    </defs>
                    <Area 
                        type="monotone" 
                        dataKey="value" 
                        stroke={color} 
                        strokeWidth={2} 
                        fill={`url(#gradient-${title})`} 
                    />
                </AreaChart>
            </ResponsiveContainer>
          </div>
      </CardContent>
    </CrystalCard>
  )
}
