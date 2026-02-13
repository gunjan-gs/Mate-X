import { Task } from "@/stores/useTaskStore"

const GEMINI_API_KEY = "AIzaSyDnsOBFUt9zOXX_BOJ9Tnu563x_Vo67GJ8"
const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent"

export const GeminiService = {
  async generateSchedule(tasks: Task[], preferences: string = "Optimize for deep work in the morning"): Promise<any> {
    const prompt = `
      Act as an elite productivity expert algorithm. 
      I have the following tasks: ${JSON.stringify(tasks.map(t => ({ id: t.id, title: t.title, duration: t.duration, priority: t.priority, category: t.category })))}.
      
      My preferences are: ${preferences}.
      
      OBJECTIVE: Optimize the schedule for maximum flow and deep work.
      RULES:
      1. Return ONLY valid JSON. No markdown formatting (no \`\`\`json ... \`\`\`), no text explanation.
      2. The JSON must be an ARRAY of objects.
      3. Each object MUST have: { "taskId": "string", "startTime": "HH:MM", "reason": "string" }
      4. Schedule high-priority tasks during morning/peak hours if possible.
      5. Ensure no overlapping tasks unless unavoidable.
      
      OUTPUT FORMAT:
      [
        { "taskId": "1", "startTime": "09:00", "reason": "High focus slot" },
        ...
      ]
    `

    try {
      const response = await fetch(`${API_URL}?key=${GEMINI_API_KEY}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      })

      const data = await response.json()
      
      if (data.error) {
           console.error("Gemini API Error:", data.error)
           throw new Error(data.error.message || "Gemini API Error")
      }

      const text = data.candidates?.[0]?.content?.parts?.[0]?.text
      console.log("Gemini Schedule Raw:", text) // Debug log
      
      if (!text) throw new Error("No response from Gemini")

      // Robust JSON extraction
      const jsonMatch = text.match(/\[[\s\S]*\]/)
      const jsonStr = jsonMatch ? jsonMatch[0] : text.replace(/```json/g, "").replace(/```/g, "").trim()
      
      return JSON.parse(jsonStr)

    } catch (error) {
      console.error("Gemini Schedule Error:", error)
      throw error
    }
  },

  async generateTasksFromInput(input: string): Promise<any[]> {
    const prompt = `
      Act as an elite productivity assistant.
      User Goal: "${input}"
      
      OBJECTIVE: Break this goal down into actionable tasks for a schedule.
      RULES:
      1. Return ONLY valid JSON.
      2. Output an ARRAY of objects.
      3. Each object: { "title": "string", "duration": number (minutes), "category": "string", "priority": "low"|"medium"|"high" }
      4. Suggest reasonable durations (15-120 mins).
      5. Categories: General, Math, Science, History, CS, Personal.
      
      OUTPUT FORMAT:
      [ { "title": "Review Chapter 1", "duration": 45, "category": "Science", "priority": "high" } ]
    `

    try {
        const response = await fetch(`${API_URL}?key=${GEMINI_API_KEY}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [{ parts: [{ text: prompt }] }]
            })
          })
    
          const data = await response.json()
          
          if (data.error) {
              console.error("Gemini API Error:", data.error)
              throw new Error(data.error.message || "Gemini API Error")
          }

          const text = data.candidates?.[0]?.content?.parts?.[0]?.text
          console.log("Gemini Tasks Raw:", text) // Debug log
          
          if (!text) throw new Error("No response from Gemini")
    
          const jsonMatch = text.match(/\[[\s\S]*\]/)
          const jsonStr = jsonMatch ? jsonMatch[0] : text.replace(/```json/g, "").replace(/```/g, "").trim()
          
          return JSON.parse(jsonStr)
    } catch (error) {
        console.error("Gemini Task Gen Error:", error)
        throw error
    }
  },

  async chatWithTutor(message: string, history: { role: 'user' | 'model', parts: { text: string }[] }[] = []): Promise<string> {
    const systemPrompt = `
      You are Mate-X, an elite AI Tutor for high-performance students. 
      Your goal is to help with doubt solving, concept (Physics, Math, CS) explanations, and exam strategy.
      Keep answers concise, structured (use Markdown), and encouraging. 
      Use bullet points and bold text for key concepts.
    `

    // Ensure valid history format for Gemini API
    // The API expects 'user' or 'model' roles.
    const validHistory = history.map(h => ({
        role: h.role === 'user' ? 'user' : 'model',
        parts: h.parts
    }))

    const contents = [
      { role: "user", parts: [{ text: systemPrompt }] },
      ...validHistory,
      { role: "user", parts: [{ text: message }] }
    ]

    try {
      const response = await fetch(`${API_URL}?key=${GEMINI_API_KEY}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents })
      })

      const data = await response.json()
      
      if (data.error) {
          console.error("Gemini API Error Detail:", data.error)
          throw new Error(data.error.message || "Gemini API Error")
      }

      const text = data.candidates?.[0]?.content?.parts?.[0]?.text
      console.log("Gemini Raw Response:", text) // Debug log
      
      if (!text) throw new Error("No response from Gemini")
      return text

    } catch (error) {
      console.error("Gemini Chat Error:", error)
      throw error // Re-throw to let UI handle it
    }
  }
}
