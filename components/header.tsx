"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Moon, Sun, Menu, X, Globe } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import { cn } from "@/lib/utils"

export function Header() {
  const [isDark, setIsDark] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('up')
  const [lastScrollY, setLastScrollY] = useState(0)
  const [clickedItem, setClickedItem] = useState<string | null>(null)
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const [isDesktop, setIsDesktop] = useState(false)
  const { language, setLanguage, t } = useLanguage()

  useEffect(() => {
    // Detect desktop
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth > 768 && !('ontouchstart' in window))
    }

    checkDesktop()
    window.addEventListener('resize', checkDesktop)

    const handleScroll = () => {
      const currentScrollY = window.scrollY

      // Determine scroll direction
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setScrollDirection('down')
      } else if (currentScrollY < lastScrollY) {
        setScrollDirection('up')
      }

      // Set scrolled state for glassmorphism changes
      setIsScrolled(currentScrollY > 50)

      setLastScrollY(currentScrollY)
    }

    // Add advanced scroll effects
    const handleAdvancedScroll = () => {
      const scrolled = window.scrollY
      const rate = scrolled * -0.5

      // Parallax effect for floating particles
      const particles = document.querySelectorAll('.particle')
      particles.forEach((particle, index) => {
        const element = particle as HTMLElement
        element.style.transform = `translateY(${rate * (index + 1) * 0.5}px) scale(${1 + scrolled * 0.0005})`
      })
    }

    // Apply custom cursor to body on desktop
    if (isDesktop) {
      document.body.classList.add('desktop-cursor')
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('scroll', handleAdvancedScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('scroll', handleAdvancedScroll)
      window.removeEventListener('resize', checkDesktop)
      if (isDesktop) {
        document.body.classList.remove('desktop-cursor')
      }
    }
  }, [lastScrollY])

  const toggleTheme = () => {
    setIsDark(!isDark)
    document.documentElement.classList.toggle("dark")
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    element?.scrollIntoView({ behavior: "smooth" })
    setIsMenuOpen(false)
    setClickedItem(sectionId)
    setTimeout(() => setClickedItem(null), 1000)
  }

  const handleThemeToggle = () => {
    setIsDark(!isDark)
    document.documentElement.classList.toggle("dark")
    setClickedItem('theme')
    setTimeout(() => setClickedItem(null), 800)
  }

  const handleLanguageChange = (newLang: 'en' | 'es' | 'pt') => {
    setLanguage(newLang)
    setClickedItem('language')
    setTimeout(() => setClickedItem(null), 800)
  }

  // Theme-aware animation styles
  const getThemeAnimationClass = () => {
    return isDark ? "animate-bounce-in" : "animate-elastic"
  }

  // Add subtle UI enhancements for desktop cursor experience
  const desktopEnhancements = isDesktop ? {
    buttonPadding: 'px-6 py-4',
    hoverLift: 'hover:translate-y-[-2px]',
    enhancedShadows: 'shadow-2xl hover:shadow-3xl',
    refinedTransitions: 'transition-all duration-300 ease-out'
  } : {
    buttonPadding: 'px-5 py-3',
    hoverLift: '',
    enhancedShadows: 'shadow-xl hover:shadow-2xl',
    refinedTransitions: 'transition-all duration-300 ease-out'
  }

  return (
    <>
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          25% { transform: translateY(-5px) rotate(1deg); }
          50% { transform: translateY(-10px) rotate(0deg); }
          75% { transform: translateY(-5px) rotate(-1deg); }
        }
        @keyframes morph {
          0% { border-radius: 1rem; }
          50% { border-radius: 2rem; }
          100% { border-radius: 1rem; }
        }
        @keyframes colorWave {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes particleFloat {
          0%, 100% { transform: translateY(0px) scale(1); opacity: 0.6; }
          50% { transform: translateY(-20px) scale(1.2); opacity: 1; }
        }
        @keyframes bounceIn {
          0% { transform: scale(0.3); opacity: 0; }
          50% { transform: scale(1.05); }
          70% { transform: scale(0.9); }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes celebrate {
          0% { transform: scale(1) rotate(0deg); }
          25% { transform: scale(1.1) rotate(5deg); }
          50% { transform: scale(1.2) rotate(0deg); }
          75% { transform: scale(1.1) rotate(-5deg); }
          100% { transform: scale(1) rotate(0deg); }
        }
        @keyframes elastic {
          0% { transform: scale(0); }
          55% { transform: scale(1.15); }
          65% { transform: scale(0.95); }
          75% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
        @keyframes glowPulse {
          0%, 100% { box-shadow: 0 0 5px currentColor; }
          50% { box-shadow: 0 0 20px currentColor, 0 0 30px currentColor; }
        }
        @keyframes swing {
          0%, 100% { transform: rotate(0deg); }
          20% { transform: rotate(15deg); }
          40% { transform: rotate(-10deg); }
          60% { transform: rotate(5deg); }
          80% { transform: rotate(-5deg); }
        }
        @keyframes tada {
          0% { transform: scale(1) rotate(0deg); }
          10%, 20% { transform: scale(0.9) rotate(-3deg); }
          30%, 50%, 70%, 90% { transform: scale(1.1) rotate(3deg); }
          40%, 60%, 80% { transform: scale(1.1) rotate(-3deg); }
          100% { transform: scale(1) rotate(0deg); }
        }
        @keyframes wiggle {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(-3deg); }
          75% { transform: rotate(3deg); }
        }
        .animate-shimmer { animation: shimmer 0.6s ease-in-out; }
        .animate-float { animation: float 3s ease-in-out infinite; }
        .animate-morph { animation: morph 2s ease-in-out infinite; }
        .animate-color-wave { animation: colorWave 4s ease-in-out infinite; background-size: 200% 200%; }
        .particle { animation: particleFloat 4s ease-in-out infinite; }
        .animate-bounce-in { animation: bounceIn 0.8s ease-out forwards; }
        .animate-celebrate { animation: celebrate 0.6s ease-out forwards; }
        .animate-elastic { animation: elastic 0.8s ease-out forwards; }
        .animate-glow-pulse { animation: glowPulse 2s ease-in-out infinite; }
        .animate-swing { animation: swing 1s ease-in-out; }
        .animate-tada { animation: tada 1s ease-in-out; }
        .animate-wiggle { animation: wiggle 0.8s ease-in-out; }

        /* Custom macOS-style cursors for desktop */
        .desktop-cursor {
          cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cpath fill='%23000' d='M12 2L8 8h3v10h2V8h3L12 2z'/%3E%3C/svg%3E") 12 12, auto;
        }
        .desktop-cursor-pointer {
          cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cg fill='%23000'%3E%3Cpath d='M12 2L8 8h3v10h2V8h3L12 2z'/%3E%3Crect x='10' y='8' width='4' height='8' opacity='0.3'/%3E%3C/g%3E%3C/svg%3E") 12 12, pointer;
        }
        .desktop-cursor-text {
          cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cpath fill='%23000' d='M12 4v16m8-8H4' stroke='%23000' stroke-width='2'/%3E%3C/svg%3E") 12 12, text;
        }
        .desktop-cursor-grab {
          cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Ccircle cx='12' cy='12' r='10' fill='none' stroke='%23000' stroke-width='2'/%3E%3Cg fill='%23000'%3E%3Ccircle cx='8' cy='8' r='1'/%3E%3Ccircle cx='12' cy='8' r='1'/%3E%3Ccircle cx='16' cy='8' r='1'/%3E%3Ccircle cx='8' cy='12' r='1'/%3E%3Ccircle cx='12' cy='12' r='1'/%3E%3Ccircle cx='16' cy='12' r='1'/%3E%3Ccircle cx='8' cy='16' r='1'/%3E%3Ccircle cx='12' cy='16' r='1'/%3E%3Ccircle cx='16' cy='16' r='1'/%3E%3C/g%3E%3C/svg%3E") 12 12, grab;
        }
      `}</style>
      <header className={cn(
        "fixed w-full transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] z-50 overflow-hidden",
        "before:absolute before:inset-0 before:bg-gradient-to-r before:from-primary/5 before:via-transparent before:to-primary/5 before:pointer-events-none before:opacity-0 before:transition-opacity before:duration-500",
        scrollDirection === 'down' && lastScrollY > 100
          ? 'bottom-0 bg-gradient-to-t from-background/98 via-background/95 to-background/90 backdrop-blur-2xl border-t border-border/40 shadow-[0_-8px_32px_rgba(0,0,0,0.12)] before:opacity-100'
          : 'top-0 bg-gradient-to-r from-background/95 via-background/90 to-background/95 backdrop-blur-xl border-b border-border/30 shadow-[0_8px_32px_rgba(0,0,0,0.08)] before:opacity-100',
        isScrolled && 'shadow-[0_4px_32px_rgba(0,0,0,0.15)] backdrop-blur-2xl'
      )}>
        {/* Creative Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary/20 rounded-full particle" style={{ animationDelay: '0s' }}></div>
          <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-primary/30 rounded-full particle" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-primary/25 rounded-full particle" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 right-1/3 w-1 h-1 bg-primary/20 rounded-full particle" style={{ animationDelay: '3s' }}></div>
        </div>
  
        {/* Interactive Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 opacity-50 animate-color-wave"></div>
  
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className={cn("group relative cursor-pointer", isDesktop && "desktop-cursor-pointer")}>
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500 animate-float"></div>
            <div className="relative font-bold text-2xl bg-gradient-to-r from-primary via-primary/90 to-primary bg-clip-text text-transparent hover:from-primary/90 hover:via-primary hover:to-primary/90 transition-all duration-500 px-5 py-3 rounded-2xl backdrop-blur-sm bg-background/20 hover:bg-background/40 border border-transparent hover:border-primary/20 hover:scale-105 hover:shadow-xl hover:shadow-primary/20 transform-gpu animate-morph">
              <span className="inline-block transition-all duration-300 group-hover:tracking-wider">Portfolio</span>
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-transparent to-primary/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-sm"></div>
            </div>
            {/* Creative accent elements */}
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 animate-float" style={{ animationDelay: '0.5s' }}></div>
            <div className="absolute -bottom-1 -left-1 w-1 h-1 bg-primary/60 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 animate-float" style={{ animationDelay: '1s' }}></div>
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
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
                className={cn(
                  "group relative overflow-hidden rounded-xl font-medium transform-gpu",
                  desktopEnhancements.buttonPadding,
                  desktopEnhancements.refinedTransitions,
                  "text-foreground/90 hover:text-foreground backdrop-blur-sm bg-background/10 hover:bg-background/30",
                  "border border-transparent hover:border-border/40",
                  desktopEnhancements.enhancedShadows,
                  "hover:scale-105 active:scale-95 hover:rotate-1",
                  desktopEnhancements.hoverLift,
                  clickedItem === item.id && "animate-celebrate",
                  hoveredItem === item.id && "animate-glow-pulse",
                  isDesktop && "desktop-cursor-pointer",
                  "before:absolute before:inset-0 before:bg-gradient-to-r before:from-primary/10 before:via-primary/5 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-all before:duration-500",
                  "after:absolute after:inset-0 after:bg-gradient-to-r after:from-transparent after:via-white/5 after:to-transparent after:opacity-0 hover:after:opacity-100 after:transition-all after:duration-500 after:translate-x-[-100%] hover:after:translate-x-[100%] after:transition-transform after:duration-700"
                )}
                style={{
                  animationDelay: `${index * 100}ms`,
                  animation: 'fadeInUp 0.8s ease-out forwards'
                }}
              >
                <span className="relative z-10 tracking-wide transition-all duration-300 group-hover:tracking-wider group-hover:scale-105">{item.label}</span>
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:animate-pulse"></div>
                {/* Creative accent dots */}
                <div className="absolute top-1 right-2 w-1 h-1 bg-primary/40 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 animate-float" style={{ animationDelay: '0s' }}></div>
                <div className="absolute bottom-1 left-2 w-0.5 h-0.5 bg-primary/60 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 animate-float" style={{ animationDelay: '1s' }}></div>
                {/* Celebration particles on click */}
                {clickedItem === item.id && (
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-1 left-1 w-2 h-2 bg-primary rounded-full animate-bounce-in" style={{ animationDelay: '0ms' }}></div>
                    <div className="absolute top-1 right-1 w-1 h-1 bg-primary/80 rounded-full animate-bounce-in" style={{ animationDelay: '100ms' }}></div>
                    <div className="absolute bottom-1 left-1 w-1.5 h-1.5 bg-primary/60 rounded-full animate-bounce-in" style={{ animationDelay: '200ms' }}></div>
                    <div className="absolute bottom-1 right-1 w-1 h-1 bg-primary/40 rounded-full animate-bounce-in" style={{ animationDelay: '300ms' }}></div>
                  </div>
                )}
              </button>
            ))}
            <div className="relative group">
              <Button
                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                variant="ghost"
                size="icon"
                className={cn(
                  "relative backdrop-blur-md bg-background/30 hover:bg-background/50 border border-border/20 hover:border-primary/30 rounded-2xl transition-all duration-500 ease-out transform-gpu animate-morph",
                  "hover:scale-110 hover:shadow-2xl hover:shadow-primary/20 hover:rotate-3",
                  clickedItem === 'language' && "animate-tada",
                  isDesktop && "desktop-cursor-pointer",
                  "before:absolute before:inset-0 before:bg-gradient-to-br before:from-primary/20 before:to-transparent before:rounded-2xl before:opacity-0 hover:before:opacity-100 before:transition-all before:duration-500"
                )}
              >
                <div className="relative">
                  <Globe className="h-5 w-5 transition-transform duration-300 group-hover:rotate-12 hover:scale-110" />
                  <div className="absolute inset-0 bg-primary/10 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 animate-pulse"></div>
                </div>
                <span className="absolute -bottom-1 -right-1 text-xs font-bold bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-full px-1.5 py-0.5 min-w-5 h-5 flex items-center justify-center shadow-lg border border-primary/20 transition-all duration-300 hover:scale-110 animate-float" style={{ animationDelay: '0.5s' }}>
                  {language.toUpperCase()}
                </span>
                {/* Creative accent ring */}
                <div className="absolute inset-0 rounded-2xl border-2 border-primary/20 opacity-0 group-hover:opacity-100 transition-all duration-500 animate-ping"></div>
                {/* Celebration sparks */}
                {clickedItem === 'language' && (
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 left-1/2 w-1 h-1 bg-primary rounded-full animate-elastic" style={{ animationDelay: '0ms' }}></div>
                    <div className="absolute bottom-0 left-1/4 w-1 h-1 bg-primary/80 rounded-full animate-elastic" style={{ animationDelay: '100ms' }}></div>
                    <div className="absolute top-1/2 right-0 w-1.5 h-1.5 bg-primary/60 rounded-full animate-elastic" style={{ animationDelay: '200ms' }}></div>
                  </div>
                )}
              </Button>
              {isLangMenuOpen && (
                <div className="absolute right-0 mt-3 w-28 backdrop-blur-2xl bg-background/95 border border-border/50 rounded-2xl shadow-2xl shadow-background/40 z-50 overflow-hidden animate-in fade-in-0 zoom-in-95 duration-300">
                  {[
                    { code: 'en', label: 'English' },
                    { code: 'es', label: 'Español' },
                    { code: 'pt', label: 'Português' }
                  ].map((lang, index) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code as 'en' | 'es' | 'pt')
                        setIsLangMenuOpen(false)
                      }}
                      className="w-full px-4 py-3 text-left text-sm hover:bg-gradient-to-r hover:from-primary/10 hover:to-primary/5 transition-all duration-300 backdrop-blur-sm hover:scale-105 transform-gpu"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <span className="font-medium">{lang.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
            <Button
              onClick={handleThemeToggle}
              variant="ghost"
              size="icon"
              className={cn(
                "relative backdrop-blur-md bg-background/30 hover:bg-background/50 border border-border/20 hover:border-primary/30 rounded-2xl transition-all duration-500 ease-out transform-gpu animate-morph",
                "hover:scale-110 hover:shadow-2xl hover:shadow-primary/20 hover:-rotate-3",
                clickedItem === 'theme' && "animate-swing",
                isDesktop && "desktop-cursor-pointer",
                "before:absolute before:inset-0 before:bg-gradient-to-br before:from-primary/20 before:to-transparent before:rounded-2xl before:opacity-0 hover:before:opacity-100 before:transition-all before:duration-500"
              )}
            >
              <div className="relative">
                {isDark ? (
                  <Sun className="h-5 w-5 transition-all duration-500 rotate-0 hover:rotate-90 hover:scale-110" />
                ) : (
                  <Moon className="h-5 w-5 transition-all duration-500 rotate-0 hover:-rotate-90 hover:scale-110" />
                )}
                {/* Creative glow effect */}
                <div className="absolute inset-0 bg-primary/10 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 animate-pulse scale-150"></div>
              </div>
              {/* Creative orbiting dots */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500">
                <div className="absolute top-1 left-1 w-1 h-1 bg-primary/60 rounded-full animate-float" style={{ animationDelay: '0s' }}></div>
                <div className="absolute top-1 right-1 w-1 h-1 bg-primary/40 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
                <div className="absolute bottom-1 left-1 w-0.5 h-0.5 bg-primary/80 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
                <div className="absolute bottom-1 right-1 w-0.5 h-0.5 bg-primary/60 rounded-full animate-float" style={{ animationDelay: '3s' }}></div>
              </div>
              {/* Theme change celebration */}
              {clickedItem === 'theme' && (
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute top-0 left-0 w-2 h-2 bg-primary rounded-full animate-bounce-in" style={{ animationDelay: '0ms' }}></div>
                  <div className="absolute top-0 right-0 w-1 h-1 bg-primary/80 rounded-full animate-bounce-in" style={{ animationDelay: '150ms' }}></div>
                  <div className="absolute bottom-0 left-0 w-1.5 h-1.5 bg-primary/60 rounded-full animate-bounce-in" style={{ animationDelay: '300ms' }}></div>
                  <div className="absolute bottom-0 right-0 w-1 h-1 bg-primary/40 rounded-full animate-bounce-in" style={{ animationDelay: '450ms' }}></div>
                </div>
              )}
            </Button>
          </nav>

          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center space-x-3">
            <Button
              onClick={handleThemeToggle}
              variant="ghost"
              size="icon"
              className={cn(
                "relative backdrop-blur-md bg-background/30 hover:bg-background/50 border border-border/20 hover:border-primary/30 rounded-2xl transition-all duration-500 ease-out transform-gpu animate-morph",
                "hover:scale-110 hover:shadow-xl hover:shadow-primary/20 active:scale-95",
                clickedItem === 'theme' && "animate-wiggle",
                isDesktop && "desktop-cursor-pointer"
              )}
            >
              {isDark ? (
                <Sun className="h-5 w-5 transition-transform duration-300 hover:rotate-90 hover:scale-110" />
              ) : (
                <Moon className="h-5 w-5 transition-transform duration-300 hover:-rotate-90 hover:scale-110" />
              )}
              {/* Creative mobile glow */}
              <div className="absolute inset-0 bg-primary/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 animate-pulse"></div>
              {/* Mobile celebration */}
              {clickedItem === 'theme' && (
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute top-1 left-1 w-1 h-1 bg-primary rounded-full animate-elastic" style={{ animationDelay: '0ms' }}></div>
                  <div className="absolute bottom-1 right-1 w-1 h-1 bg-primary/80 rounded-full animate-elastic" style={{ animationDelay: '100ms' }}></div>
                </div>
              )}
            </Button>
            <Button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              variant="ghost"
              size="icon"
              className={cn(
                "relative backdrop-blur-md bg-background/30 hover:bg-background/50 border border-border/20 hover:border-primary/30 rounded-2xl transition-all duration-500 ease-out transform-gpu animate-morph",
                "hover:scale-110 hover:shadow-xl hover:shadow-primary/20 active:scale-95",
                isMenuOpen && "bg-primary/10 border-primary/30 shadow-xl shadow-primary/10 rotate-180",
                isDesktop && "desktop-cursor-pointer"
              )}
            >
              <div className="relative">
                {isMenuOpen ? (
                  <X className="h-5 w-5 transition-all duration-300 rotate-0 hover:scale-110" />
                ) : (
                  <Menu className="h-5 w-5 transition-all duration-300 rotate-0 hover:scale-110" />
                )}
                {/* Creative hamburger animation lines */}
                {!isMenuOpen && (
                  <div className="absolute inset-0 flex flex-col justify-center">
                    <div className="w-4 h-0.5 bg-current transition-all duration-300 group-hover:w-5 group-hover:translate-x-0.5"></div>
                    <div className="w-3 h-0.5 bg-current mt-1 transition-all duration-300 group-hover:w-4 group-hover:translate-x-1"></div>
                  </div>
                )}
              </div>
              {isMenuOpen && (
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 animate-pulse"></div>
              )}
              {/* Floating accent dots */}
              <div className="absolute -top-1 -right-1 w-1 h-1 bg-primary/60 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 animate-float"></div>
              <div className="absolute -bottom-1 -left-1 w-1 h-1 bg-primary/40 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 animate-float" style={{ animationDelay: '0.5s' }}></div>
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-6 backdrop-blur-2xl bg-gradient-to-b from-background/30 to-background/20 border-t border-border/40 rounded-b-3xl shadow-2xl shadow-background/20 animate-in slide-in-from-top-2 duration-500 relative overflow-hidden">
            {/* Creative background elements */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-primary/30 rounded-full particle" style={{ animationDelay: '0s' }}></div>
              <div className="absolute top-1/2 right-1/4 w-1.5 h-1.5 bg-primary/20 rounded-full particle" style={{ animationDelay: '1s' }}></div>
              <div className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-primary/40 rounded-full particle" style={{ animationDelay: '2s' }}></div>
            </div>

            <nav className="flex flex-col space-y-3 px-4 relative z-10">
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
                  className={cn(
                    "group relative text-left text-foreground/90 hover:text-foreground transition-all duration-500 ease-out transform-gpu px-5 py-4 rounded-2xl overflow-hidden",
                    "hover:bg-gradient-to-r hover:from-background/60 hover:to-background/40 backdrop-blur-sm border border-transparent hover:border-border/50",
                    "hover:shadow-xl hover:shadow-primary/10 hover:scale-[1.02] active:scale-98 hover:rotate-1",
                    "before:absolute before:inset-0 before:bg-gradient-to-r before:from-primary/10 before:via-primary/5 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-all before:duration-500 before:rounded-2xl"
                  )}
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animation: 'fadeInUp 0.8s ease-out forwards'
                  }}
                >
                  <span className="relative z-10 font-medium tracking-wide transition-all duration-300 group-hover:tracking-wider group-hover:scale-105">{item.label}</span>
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                  {/* Creative accent elements */}
                  <div className="absolute top-2 right-3 w-1 h-1 bg-primary/60 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 animate-float" style={{ animationDelay: '0s' }}></div>
                  <div className="absolute bottom-2 left-3 w-0.5 h-0.5 bg-primary/80 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 animate-float" style={{ animationDelay: '1s' }}></div>
                  {/* Shimmer effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-[-100%] group-hover:translate-x-[100%]"></div>
                </button>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
    </>
  )
}
