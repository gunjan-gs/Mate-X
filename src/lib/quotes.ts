export const quotes = [
  { text: "The future depends on what you do today.", author: "Mahatma Gandhi" },
  { text: "It always seems impossible until it's done.", author: "Nelson Mandela" },
  { text: "Don't watch the clock; do what it does. Keep going.", author: "Sam Levenson" },
  { text: "The secret of getting ahead is getting started.", author: "Mark Twain" },
  { text: "Quality is not an act, it is a habit.", author: "Aristotle" },
  { text: "Start where you are. Use what you have. Do what you can.", author: "Arthur Ashe" },
  { text: "Focus entirely on the task at hand. The sun's rays do not burn until brought to a focus.", author: "Alexander Graham Bell" },
  { text: "Productivity is being able to do things that you were never able to do before.", author: "Franz Kafka" },
  { text: "Success is the sum of small efforts, repeated day in and day out.", author: "Robert Collier" },
  { text: "Your time is limited, so don't waste it living someone else's life.", author: "Steve Jobs" },
]

export function getDailyQuote() {
  // Use today's date to select a consistent quote for the day
  const today = new Date()
  const seed = today.getFullYear() * 1000 + (today.getMonth() + 1) * 100 + today.getDate()
  const index = seed % quotes.length
  return quotes[index]
}
