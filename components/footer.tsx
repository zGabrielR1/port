"use client"

import { useState, useEffect } from "react"
import { Github, Linkedin, Mail, Heart, ArrowUp } from "lucide-react"
import { GlassmorphismButton } from "@/components/ui/glassmorphism-button"
import { ShaderBackground } from "@/components/ui/shader-background"

export function Footer() {
  const [visible, setVisible] = useState<boolean>(false);
  const [showScrollTop, setShowScrollTop] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
    }, 300);

    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-black border-t border-white/10 py-12 relative overflow-hidden">
      {/* Subtle Shader Background */}
      <ShaderBackground
        variant="ambient"
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/60" />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center space-y-8">
          {/* Main Content */}
          <div 
            className={`glassmorphism p-8 rounded-2xl transition-all duration-700 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="font-bold text-2xl text-white">
                  <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent animate-gradient-x">
                    Gabriel Renostro
                  </span>
                </div>
                <p className="text-white/80">Full-Stack Developer & Software Engineer</p>
                <p className="text-sm text-white/60 max-w-md mx-auto">
                  Crafting exceptional digital experiences with modern technologies and innovative solutions.
                </p>
              </div>

              {/* Navigation Links */}
              <div className="flex justify-center flex-wrap gap-4 text-sm">
                {[
                  { href: "#about", label: "About" },
                  { href: "#skills", label: "Skills" },
                  { href: "#projects", label: "Projects" },
                  { href: "#experience", label: "Experience" },
                  { href: "#contact", label: "Contact" }
                ].map((link, index) => (
                  <a 
                    key={link.href}
                    href={link.href} 
                    className="px-4 py-2 text-white/70 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-all duration-300 hover:scale-105 border border-white/10 hover:border-white/20"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {link.label}
                  </a>
                ))}
              </div>

              {/* Social Links */}
              <div className="flex justify-center gap-3">
                <GlassmorphismButton 
                  variant="default" 
                  size="sm" 
                  className="h-10 w-10 p-0" 
                  showShine={false}
                  aria-label="GitHub Profile"
                >
                  <Github className="h-4 w-4" />
                </GlassmorphismButton>
                <GlassmorphismButton 
                  variant="default" 
                  size="sm" 
                  className="h-10 w-10 p-0" 
                  showShine={false}
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin className="h-4 w-4" />
                </GlassmorphismButton>
                <GlassmorphismButton 
                  variant="default" 
                  size="sm" 
                  className="h-10 w-10 p-0" 
                  showShine={false}
                  aria-label="Email Contact"
                >
                  <Mail className="h-4 w-4" />
                </GlassmorphismButton>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div 
            className={`pt-6 border-t border-white/10 transition-all duration-700 delay-200 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <p className="text-sm text-white/60 flex items-center justify-center gap-2">
              © 2024 Gabriel Renostro. Made with 
              <Heart className="h-4 w-4 text-red-400 animate-pulse" fill="currentColor" /> 
              All rights reserved.
            </p>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <GlassmorphismButton
          onClick={scrollToTop}
          variant="primary"
          size="sm"
          className="fixed bottom-8 right-8 h-12 w-12 p-0 z-50 animate-bounce-gentle"
          showShine={true}
          showRipple={false}
          aria-label="Scroll to top"
        >
          <ArrowUp className="h-5 w-5" />
        </GlassmorphismButton>
      )}
    </footer>
  )
}
