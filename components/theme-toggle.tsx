"use client"

import * as React from "react"
import { Moon, Sun, Palette } from "lucide-react"
import { useTheme } from "next-themes"
import { motion } from "motion/react"

interface ThemeToggleProps {
  variant?: "default" | "minimal" | "glass"
  className?: string
}

export function ThemeToggle({ variant = "default", className = "" }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="w-10 h-10 bg-white/10 rounded-md animate-pulse" />
    )
  }

  const toggleTheme = () => {
    // Always switch to neon-dark theme (previous version with dark layout)
    setTheme("neon-dark")
  }

  const getIcon = () => {
    return <Palette className="h-4 w-4" />
  }

  const getLabel = () => {
    return "Switch to Previous Portfolio Version (Dark Layout)"
  }

  if (variant === "glass") {
    return (
      <motion.button
        onClick={toggleTheme}
        className={`
          relative overflow-hidden backdrop-blur-md bg-white/10 border border-white/20
          px-4 py-2 rounded-xl text-white font-medium text-sm
          hover:bg-white/20 hover:border-white/30 transition-all duration-300
          shadow-lg hover:shadow-xl group ${className}
        `}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        title={getLabel()}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="relative flex items-center gap-2">
          <motion.div
            key={theme}
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {getIcon()}
          </motion.div>
          <span className="hidden sm:inline">Theme</span>
        </div>
      </motion.button>
    )
  }

  if (variant === "minimal") {
    return (
      <motion.button
        onClick={toggleTheme}
        className={`
          relative p-2 rounded-lg text-muted-foreground hover:text-foreground
          hover:bg-accent transition-all duration-200 ${className}
        `}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        title={getLabel()}
      >
        <motion.div
          key={theme}
          initial={{ rotate: -90, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          exit={{ rotate: 90, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {getIcon()}
        </motion.div>
      </motion.button>
    )
  }

  // Default variant
  return (
    <motion.button
      onClick={toggleTheme}
      className={`
        relative inline-flex items-center justify-center rounded-md
        bg-background border border-border
        px-3 py-2 text-sm font-medium text-foreground
        shadow-sm hover:bg-accent hover:text-accent-foreground
        transition-all duration-200 ${className}
      `}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      title={getLabel()}
    >
      <motion.div
        key={theme}
        initial={{ rotate: -90, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        exit={{ rotate: 90, opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="flex items-center gap-2"
      >
        {getIcon()}
        <span className="hidden sm:inline">Theme</span>
      </motion.div>
    </motion.button>
  )
}