"use client"

import React from 'react'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'
import { Sun, Moon } from 'lucide-react'
import { useSiteVariant } from './use-site-variant'

export function ThemeToggle() {
  const { theme } = useTheme()
  const { variant, setSiteVariant, mounted } = useSiteVariant()

  // siteVariant: 'port' (white) or 'dark'
  const getStoredVariant = () => {
    try {
      return window.localStorage.getItem('siteVariant') || 'port'
    } catch {
      return 'port'
    }
  }

  React.useEffect(() => {
    // keep a but minimal mount side-effect - useSiteVariant handles initialization
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const toggle = () => {
    if (!mounted) return
    const next = variant === 'dark' ? 'port' : 'dark'
    setSiteVariant(next)
  }

  if (!mounted) return null

  return (
    <div className="fixed top-4 right-4 z-50">
      <Button
        onClick={toggle}
        variant="ghost"
        size="icon"
        className="glass-subtle hover:glass rounded-full p-2 shadow-lg"
        aria-label="Toggle theme"
      >
        {variant === 'dark' ? (
          <Sun className="w-5 h-5" />
        ) : (
          <Moon className="w-5 h-5" />
        )}
      </Button>
    </div>
  )
}
