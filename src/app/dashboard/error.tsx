"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { AlertCircle } from "lucide-react"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col items-center justify-center space-y-4">
      <div className="p-4 rounded-full bg-red-500/10 text-red-500 mb-4">
          <AlertCircle className="w-8 h-8" />
      </div>
      <h2 className="text-2xl font-bold text-white">Something went wrong!</h2>
      <p className="text-white/40 max-w-md text-center">
        We encountered an unexpected error. Please try refreshing the page or checking your connection.
      </p>
      <div className="flex gap-4 mt-4">
          <Button
            onClick={() => window.location.href = '/dashboard'}
            variant="outline"
            className="border-white/10 hover:bg-white/5 text-white"
          >
            Go Home
          </Button>
          <Button
            onClick={() => reset()}
            className="bg-white text-black hover:bg-white/90"
          >
            Try Again
          </Button>
      </div>
    </div>
  )
}
