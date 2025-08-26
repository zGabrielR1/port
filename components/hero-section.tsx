"use client"

import { useState, useEffect } from "react"
import { ArrowDown, Download, Github, Linkedin, Mail } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import { ShaderBackground } from "@/components/ui/shader-background"
import { TimeDisplay } from "@/components/ui/time-display"
import { GlassmorphismButton } from "@/components/ui/glassmorphism-button"

export function HeroSection() {
  const { t } = useLanguage()
  const [visible, setVisible] = useState<boolean>(false);
  const [timeMode, setTimeMode] = useState<'clock' | 'content'>('clock');

  // Fade in animation when component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
    }, 200);

    // Auto-switch from clock to content after 4 seconds
    const switchTimer = setTimeout(() => {
      setTimeMode('content');
    }, 4000);

    return () => {
      clearTimeout(timer);
      clearTimeout(switchTimer);
    };
  }, []);

  const scrollToAbout = () => {
    const element = document.getElementById("about")
    element?.scrollIntoView({ behavior: "smooth" })
  }

  const toggleTimeMode = () => {
    setTimeMode(prev => prev === 'clock' ? 'content' : 'clock');
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Enhanced Shader Background */}
      <ShaderBackground
        variant="hero"
      />

      {/* Enhanced glassmorphism overlay with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/15 via-transparent to-black/10" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center relative z-10">
        <div className="space-y-12">
          {/* Toggle between Clock and Content */}
          <div className="space-y-8">
            <div className="inline-flex items-center px-6 py-3 rounded-full glassmorphism text-white text-sm font-medium animate-glassmorphism-glow cursor-pointer" onClick={toggleTimeMode}>
              ✨ {timeMode === 'clock' ? 'Click to see portfolio' : 'Click to see time'}
            </div>
            
            {timeMode === 'clock' ? (
              /* Time Display Mode */
              <div
                className={`glassmorphism px-8 py-12 rounded-3xl shadow-xl transition-all duration-700 ${
                  visible
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-95"
                }`}
              >
                <TimeDisplay 
                  showLocation={true}
                  showTemperature={true}
                  timeFormat="12h"
                />
                <div className="mt-8 text-white/70 text-sm">
                  Welcome to my digital space
                </div>
              </div>
            ) : (
              /* Portfolio Content Mode */
              <div
                className={`glassmorphism px-8 py-10 rounded-3xl shadow-xl transition-all duration-700 ${
                  visible
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-95"
                }`}
              >
                <h1 className="text-5xl sm:text-6xl lg:text-8xl font-bold text-white leading-tight tracking-tight mb-4">
                  Hi, I'm{" "}
                  <span className="relative inline-block">
                    <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent animate-gradient-x">
                      Gabriel Renostro
                    </span>
                    <div className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-shimmer" />
                  </span>
                </h1>
                <p className="text-xl sm:text-2xl lg:text-3xl text-white/90 max-w-3xl mx-auto font-medium leading-relaxed mb-4">
                  Full-Stack Developer & Software Engineer
                </p>
                <p className="text-base sm:text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
                  I create exceptional digital experiences with modern technologies, focusing on clean code and user-centered design that makes a difference.
                </p>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col items-center gap-8">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
              <GlassmorphismButton
                onClick={scrollToAbout}
                variant="primary"
                size="lg"
                className="px-8 py-6 text-lg font-medium group"
                showShine={true}
                showRipple={true}
              >
                <span>Explore My Work</span>
                <ArrowDown className="ml-2 h-5 w-5 group-hover:translate-y-1 transition-transform duration-300" />
              </GlassmorphismButton>
              
              <GlassmorphismButton
                variant="default"
                size="lg"
                className="px-8 py-6 text-lg font-medium group"
                showShine={true}
                showRipple={true}
              >
                <Download className="mr-2 h-5 w-5 group-hover:animate-bounce transition-transform duration-300" />
                <span>Download Resume</span>
              </GlassmorphismButton>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-2 p-4 rounded-xl glassmorphism animate-glassmorphism-pulse">
              <span className="text-sm text-white/80 font-medium mr-3">Connect with me:</span>
              <div className="flex items-center gap-2">
                <GlassmorphismButton 
                  variant="default" 
                  size="sm" 
                  className="h-10 w-10 p-0"
                  aria-label="GitHub Profile"
                  showShine={false}
                >
                  <Github className="h-4 w-4" />
                </GlassmorphismButton>
                <GlassmorphismButton 
                  variant="default" 
                  size="sm" 
                  className="h-10 w-10 p-0"
                  aria-label="LinkedIn Profile"
                  showShine={false}
                >
                  <Linkedin className="h-4 w-4" />
                </GlassmorphismButton>
                <GlassmorphismButton 
                  variant="default" 
                  size="sm" 
                  className="h-10 w-10 p-0"
                  aria-label="Email Contact"
                  showShine={false}
                >
                  <Mail className="h-4 w-4" />
                </GlassmorphismButton>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8">
            <div className="text-center p-6 rounded-xl glassmorphism transition-all duration-300 hover:scale-105 hover:shadow-lg animate-glassmorphism-glow group cursor-pointer">
              <div className="text-3xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors duration-300">5+</div>
              <div className="text-xs text-white/70 font-medium">Years Experience</div>
              <div className="w-8 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mx-auto mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <div className="text-center p-6 rounded-xl glassmorphism transition-all duration-300 hover:scale-105 hover:shadow-lg animate-glassmorphism-glow group cursor-pointer" style={{ animationDelay: '0.1s' }}>
              <div className="text-3xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors duration-300">50+</div>
              <div className="text-xs text-white/70 font-medium">Projects Completed</div>
              <div className="w-8 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mx-auto mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <div className="text-center p-6 rounded-xl glassmorphism transition-all duration-300 hover:scale-105 hover:shadow-lg animate-glassmorphism-glow group cursor-pointer" style={{ animationDelay: '0.2s' }}>
              <div className="text-3xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors duration-300">20+</div>
              <div className="text-xs text-white/70 font-medium">Technologies</div>
              <div className="w-8 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mx-auto mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <div className="text-center p-6 rounded-xl glassmorphism transition-all duration-300 hover:scale-105 hover:shadow-lg animate-glassmorphism-glow group cursor-pointer" style={{ animationDelay: '0.3s' }}>
              <div className="text-3xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors duration-300">100%</div>
              <div className="text-xs text-white/70 font-medium">Client Satisfaction</div>
              <div className="w-8 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mx-auto mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
