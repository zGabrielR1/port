"use client"

import * as React from "react"
import { Palette, Sparkles } from "lucide-react"
import { useTheme } from "next-themes"
import { motion } from "motion/react"

interface PortfolioVersionToggleProps {
  variant?: "default" | "hero" | "minimal"
  className?: string
}

export function PortfolioVersionToggle({
  variant = "default",
  className = ""
}: PortfolioVersionToggleProps) {
  const { setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const switchToNeonDark = () => {
    setTheme("neon-dark")
  }

  const getLabel = () => {
    return "Switch to Previous Portfolio Version (Neon Dark)"
  }

  // Hero variant - matches the main portfolio button style
  if (variant === "hero") {
    return (
      <motion.button
        onClick={switchToNeonDark}
        className={`
          relative backdrop-blur-lg bg-white/6 border border-white/12 shadow-2xl shadow-black/30
          px-6 py-3 rounded-[28px] transition-all duration-300 hover:bg-white/10
          hover:border-white/25 hover:shadow-3xl hover:shadow-black/40 hover:scale-105
          active:scale-98 group overflow-visible z-20 will-change-transform
          cursor-pointer font-medium text-sm text-white
        `}
        whileHover={{
          scale: 1.03,
          transition: { duration: 0.3 }
        }}
        whileTap={{ scale: 0.98 }}
        title={getLabel()}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        {/* Enhanced gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-[28px]" />

        {/* Pulsing glow effect */}
        <motion.div
          className="absolute inset-0 rounded-[28px] will-change-transform"
          animate={{
            opacity: [0, 0.6, 0],
            scale: [1, 1.02, 1],
            boxShadow: [
              "0 0 0px rgba(59, 130, 246, 0)",
              "0 0 30px rgba(59, 130, 246, 0.4)",
              "0 0 0px rgba(59, 130, 246, 0)"
            ]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Inner glow */}
        <div className="absolute inset-0 rounded-[28px] shadow-inner shadow-blue-500/20" />

        {/* Content */}
        <div className="flex items-center gap-3 text-white font-semibold relative z-10">
          <motion.div
            animate={{
              rotate: 360,
              scale: [1, 1.1, 1]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Sparkles className="w-5 h-5" />
          </motion.div>
          <span className="tracking-[-0.5px]">Previous Version</span>
        </div>
      </motion.button>
    )
  }

  // Minimal variant for header/navigation
  if (variant === "minimal") {
    return (
      <motion.button
        onClick={switchToNeonDark}
        className={`
          relative p-2 rounded-lg text-white/80 hover:text-white
          hover:bg-white/10 transition-all duration-200 backdrop-blur-sm
          border border-white/10 hover:border-white/20 ${className}
        `}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        title={getLabel()}
      >
        <motion.div
          animate={{
            rotate: [0, 10, -10, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Sparkles className="w-4 h-4" />
        </motion.div>
      </motion.button>
    )
  }

  // Default variant - glassmorphism style
  return (
    <motion.button
      onClick={switchToNeonDark}
      className={`
        relative overflow-hidden backdrop-blur-md bg-white/8 border border-white/15
        px-5 py-3 rounded-xl text-white font-medium text-sm
        hover:bg-white/15 hover:border-white/25 transition-all duration-300
        shadow-lg hover:shadow-xl group ${className}
      `}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      title={getLabel()}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/15 via-purple-500/15 to-pink-500/15 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="relative flex items-center gap-2">
        <motion.div
          animate={{
            rotate: 360,
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Palette className="w-4 h-4" />
        </motion.div>
        <span className="hidden sm:inline">Neon Dark Version</span>
        <span className="sm:hidden">Neon Dark</span>
      </div>
    </motion.button>
  )
}