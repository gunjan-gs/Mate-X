"use client"

import { useFocusStore } from "@/stores/useFocusStore"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { subDays, format } from "date-fns"

export function SessionHistoryChart() {
  const sessions = useFocusStore((state) => state.sessions)

  // Aggregate data for the last 7 days
  const data = Array.from({ length: 7 }).map((_, i) => {
    const date = subDays(new Date(), 6 - i)
    const dateStr = date.toDateString()
    
    const minutes = sessions
      .filter(s => new Date(s.startTime).toDateString() === dateStr && s.mode === 'focus')
      .reduce((acc, curr) => acc + curr.duration, 0)

    return {
      day: format(date, "EEE"), // Mon, Tue...
      minutes: minutes
    }
  })

  return (
    <Card className="col-span-1 md:col-span-2 border-border bg-card/50">
      <CardHeader>
        <CardTitle className="text-sm font-medium text-muted-foreground">Focus History (Last 7 Days)</CardTitle>
      </CardHeader>
      <CardContent className="h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis 
              dataKey="day" 
              stroke="#888888" 
              fontSize={12} 
              tickLine={false} 
              axisLine={false} 
            />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}m`}
            />
            <Tooltip 
                contentStyle={{ backgroundColor: '#1e1b4b', borderColor: '#312e81', color: '#fff' }}
                cursor={{ fill: 'rgba(255,255,255,0.05)' }}
            />
            <Bar
              dataKey="minutes"
              fill="currentColor"
              radius={[4, 4, 0, 0]}
              className="fill-indigo-500"
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
