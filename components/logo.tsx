"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export function Logo() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="size-10 rounded-full bg-gray-200 animate-pulse"></div>
  }

  const isDark = theme === "dark"

  return (
    <div className="relative size-10 flex items-center justify-center">
      {/* Outer glow/shadow */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/60 to-primary/20 blur-sm"></div>

      {/* Main circle with glassmorphism */}
      <div className="absolute inset-0.5 rounded-full bg-gradient-to-br from-primary/80 to-primary/60 backdrop-blur-sm shadow-lg"></div>

      {/* Inner circle with glassmorphism */}
      <div className="absolute inset-[0.35rem] rounded-full bg-gradient-to-br from-background/90 to-background/70 backdrop-blur-md flex items-center justify-center overflow-hidden">
        {/* Q shape */}
        <div className="relative size-5">
          <div className="absolute inset-0 rounded-full border-[2px] border-primary"></div>
          <div className="absolute inset-[0.35rem] rounded-full bg-primary"></div>
          <div className="absolute bottom-0 right-0 size-2.5 bg-background/90 rotate-45 translate-x-[25%] translate-y-[25%]"></div>
        </div>
      </div>

      {/* Highlight effect */}
      <div className="absolute top-1 left-1 size-2 rounded-full bg-white/20 blur-sm"></div>
    </div>
  )
}
