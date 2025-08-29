"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Moon, Sun, Menu, X, Globe } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { language, setLanguage, t } = useLanguage()
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    element?.scrollIntoView({ behavior: "smooth" })
    setIsMenuOpen(false)
  }

  const handleLanguageChange = (newLang: 'en' | 'es' | 'pt') => {
    setLanguage(newLang)
    setIsLangMenuOpen(false)
  }

  if (!mounted) {
    return null
  }

  return (
    <header className={cn(
      "fixed w-full transition-all duration-500 z-50",
      isScrolled
        ? "top-0 backdrop-blur-md bg-card/90 border-b border-border/20 shadow-lg"
        : "top-0 backdrop-blur-md bg-card/80"
    )}>
      <div className="max-w-7xl mx-auto container-padding">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="group cursor-pointer">
            <div className="font-bold text-2xl text-blue-800 hover:scale-105 transition-transform duration-300">
              Portfolio
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {[
              { label: "About", id: "about" },
              { label: "Skills", id: "skills" },
              { label: "Projects", id: "projects" },
              { label: "Experience", id: "experience" },
              { label: "Contact", id: "contact" }
            ].map((item, index) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="px-4 py-2 rounded-lg font-medium transition-all duration-300 text-foreground hover:text-blue-700 hover:bg-card/30 hover:scale-105"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Controls */}
          <div className="flex items-center space-x-2">
            {/* Language Selector */}
            <div className="relative">
              <Button
                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                variant="ghost"
                size="icon"
                className="relative backdrop-blur-md bg-card/20 border border-border/30 hover:bg-card/30 rounded-xl transition-all duration-300 hover:scale-110"
              >
                <Globe className="h-5 w-5 text-gray-700" />
                <span className="absolute -bottom-1 -right-1 text-xs font-bold bg-blue-600 text-card-foreground rounded-full px-1.5 py-0.5 min-w-5 h-5 flex items-center justify-center shadow-lg">
                  {language.toUpperCase()}
                </span>
              </Button>
              {isLangMenuOpen && (
                <div className="absolute right-0 mt-2 w-32 backdrop-blur-md bg-card/90 border border-border/30 rounded-xl shadow-lg z-50 overflow-hidden animate-slide-in-down">
                  {[
                    { code: 'en', label: 'English' },
                    { code: 'es', label: 'Español' },
                    { code: 'pt', label: 'Português' }
                  ].map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => handleLanguageChange(lang.code as 'en' | 'es' | 'pt')}
                      className="w-full px-4 py-3 text-left text-sm text-foreground hover:bg-blue-50 hover:text-blue-700 transition-all duration-300"
                    >
                      {lang.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Theme Toggle */}
            <Button
              onClick={toggleTheme}
              variant="ghost"
              size="icon"
              className="backdrop-blur-md bg-card/20 border border-border/30 hover:bg-card/30 rounded-xl transition-all duration-300 hover:scale-110"
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5 transition-transform duration-300 hover:rotate-90 text-gray-700" />
              ) : (
                <Moon className="h-5 w-5 transition-transform duration-300 hover:-rotate-90 text-gray-700" />
              )}
            </Button>

            {/* Mobile Menu Toggle */}
            <Button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              variant="ghost"
              size="icon"
              className="md:hidden backdrop-blur-md bg-card/20 border border-border/30 hover:bg-card/30 rounded-xl transition-all duration-300 hover:scale-110"
            >
              {isMenuOpen ? (
                <X className="h-5 w-5 transition-transform duration-300 text-gray-700" />
              ) : (
                <Menu className="h-5 w-5 transition-transform duration-300 text-gray-700" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-6 backdrop-blur-md bg-card/90 border-t border-border/30 rounded-b-xl shadow-lg animate-slide-in-down">
            <nav className="flex flex-col space-y-2">
              {[
                { label: "About", id: "about" },
                { label: "Skills", id: "skills" },
                { label: "Projects", id: "projects" },
                { label: "Experience", id: "experience" },
                { label: "Contact", id: "contact" }
              ].map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                    className="text-left px-4 py-3 rounded-lg font-medium transition-all duration-300 text-foreground hover:text-blue-700 hover:bg-card/30 hover:scale-[1.02]"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}