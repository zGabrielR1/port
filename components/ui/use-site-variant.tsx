"use client"

import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'

export function useSiteVariant() {
  const [variant, setVariant] = useState<'port' | 'dark'>('port')
  const [mounted, setMounted] = useState(false)
  const { setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
    try {
      const ds = (document.documentElement.dataset.variant as string) || ''
      const stored = localStorage.getItem('siteVariant')
      const initial = ds || stored || 'port'
      setVariant(initial === 'dark' ? 'dark' : 'port')
      // ensure dataset is present
      document.documentElement.dataset.variant = initial
      // sync theme
      setTheme(initial === 'dark' ? 'dark' : 'light')
    } catch (e) {
      setVariant('port')
      setTheme('light')
    }
  }, [setTheme])

  const setSiteVariant = (v: 'port' | 'dark') => {
    try {
      localStorage.setItem('siteVariant', v)
      document.documentElement.dataset.variant = v
      setVariant(v)
      setTheme(v === 'dark' ? 'dark' : 'light')
    } catch (e) {
      // ignore
    }
  }

  return { variant, setSiteVariant, mounted }
}
