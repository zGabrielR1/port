"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Code, Lightbulb, Users, Zap } from "lucide-react"
import { useLanguage } from "@/components/language-provider"

const AboutAnimatedBackground = () => {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden" style={{ zIndex: 0 }}>
      {/* Animated gradient background */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: `
            radial-gradient(circle at 20% 30%, rgba(249, 115, 22, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, rgba(59, 130, 246, 0.15) 0%, transparent 50%),
            linear-gradient(45deg,
              rgba(249, 115, 22, 0.1) 0%,
              rgba(251, 191, 36, 0.1) 25%,
              rgba(59, 130, 246, 0.1) 50%,
              rgba(139, 92, 246, 0.1) 75%,
              rgba(249, 115, 22, 0.1) 100%)
          `,
          backgroundSize: '400% 400%',
          animation: 'gradientShift 15s ease-in-out infinite'
        }}
      />

      {/* Floating geometric shapes */}
      <div className="absolute top-20 left-10 w-32 h-32 opacity-20 animate-float-slow">
        <div className="w-full h-full border-2 border-orange-400/30 rounded-full animate-spin-slow" />
      </div>
      <div className="absolute top-40 right-20 w-24 h-24 opacity-20 animate-float-reverse">
        <div className="w-full h-full border-2 border-blue-400/30 rotate-45 animate-pulse-slow" />
      </div>
      <div className="absolute bottom-32 left-1/4 w-20 h-20 opacity-20 animate-float">
        <div className="w-full h-full bg-gradient-to-br from-orange-400/20 to-blue-400/20 rounded-lg animate-bounce-slow" />
      </div>
      <div className="absolute bottom-20 right-10 w-28 h-28 opacity-20 animate-float-slow">
        <div className="w-full h-full border-2 border-purple-400/30 rounded-full animate-spin-reverse" />
      </div>

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(rgba(249, 115, 22, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}
      />
    </div>
  );
};

const FloatingParticles = () => {
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number, delay: number}>>([]);

  useEffect(() => {
    const particleCount = 12;
    const newParticles = [];

    for (let i = 0; i < particleCount; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 3
      });
    }

    setParticles(newParticles);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute w-2 h-2 bg-orange-400/30 rounded-full animate-float"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            animationDelay: `${particle.delay}s`,
            animationDuration: '8s'
          }}
        />
      ))}
    </div>
  );
};

export function AboutSection() {
  const { t } = useLanguage()
  return (
    <section id="about" className="section-padding bg-background relative overflow-hidden">
      <AboutAnimatedBackground />
      <FloatingParticles />
      <div className="absolute inset-0 bg-gradient-to-br from-background/50 via-transparent to-background/30" />

      <div className="max-w-7xl mx-auto container-padding relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-6 py-3 rounded-full glass-subtle text-primary text-sm font-medium mb-6 border-0 animate-fade-in hover-glow">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse mr-3" />
            About Me
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6 text-gradient">
            Get to Know Me
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            With over 5 years of experience in software development, I specialize in building scalable web applications using cutting-edge technologies. My journey began with a Computer Science degree and has evolved through continuous learning and hands-on experience with diverse projects.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8 animate-slide-in-up">
            <div className="space-y-6">
              <p className="text-lg text-muted-foreground leading-relaxed hover:text-foreground/90 transition-colors duration-300">
                With over 5 years of experience in software development, I specialize in building scalable web applications using cutting-edge technologies. My journey began with a Computer Science degree and has evolved through continuous learning and hands-on experience with diverse projects.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed hover:text-foreground/90 transition-colors duration-300">
                I'm passionate about writing clean, maintainable code and staying up-to-date with the latest industry trends. When I'm not coding, you'll find me contributing to open-source projects, mentoring junior developers, or exploring new technologies.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-foreground hover:text-primary transition-colors duration-300">What drives me:</h3>
              <div className="flex flex-wrap gap-3">
                <span className="px-4 py-2 glass-subtle text-primary rounded-full text-sm font-medium hover:glass hover:scale-105 transition-all duration-300 border-0 animate-scale-in">
                  Problem Solver
                </span>
                <span className="px-4 py-2 glass-subtle text-accent rounded-full text-sm font-medium hover:glass hover:scale-105 transition-all duration-300 border-0 animate-scale-in animate-delay-100">
                  Team Player
                </span>
                <span className="px-4 py-2 glass-subtle text-primary rounded-full text-sm font-medium hover:glass hover:scale-105 transition-all duration-300 border-0 animate-scale-in animate-delay-200">
                  Continuous Learner
                </span>
                <span className="px-4 py-2 glass-subtle text-accent rounded-full text-sm font-medium hover:glass hover:scale-105 transition-all duration-300 border-0 animate-scale-in animate-delay-300">
                  Innovation Focused
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 animate-slide-in-up animate-delay-200">
            <div className="group relative p-8 text-center glass-card hover:glass-strong hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 hover-lift hover:rotate-2 border-0 cursor-pointer overflow-hidden animate-scale-in">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10 opacity-0 group-hover:opacity-100 transition-all duration-500" />
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg shadow-primary/10">
                  <Code className="h-8 w-8 text-primary group-hover:text-primary/90 transition-colors duration-300" />
                </div>
                <h3 className="font-semibold mb-3 text-lg group-hover:text-primary transition-colors duration-300">Clean Code</h3>
                <p className="text-sm text-muted-foreground leading-relaxed group-hover:text-foreground/80 transition-colors duration-300">
                  Writing maintainable and scalable code that stands the test of time
                </p>
              </div>
              <div className="absolute top-3 right-3 w-2 h-2 bg-primary/60 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 animate-pulse" />
            </div>
            
            <div className="group relative p-8 text-center glass-card hover:glass-strong hover:shadow-2xl hover:shadow-accent/20 transition-all duration-500 hover-lift hover:-rotate-2 border-0 cursor-pointer overflow-hidden animate-scale-in animate-delay-100">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-accent/10 opacity-0 group-hover:opacity-100 transition-all duration-500" />
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-accent/20 to-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:-rotate-6 transition-all duration-300 shadow-lg shadow-accent/10">
                  <Lightbulb className="h-8 w-8 text-accent group-hover:text-accent/90 transition-colors duration-300" />
                </div>
                <h3 className="font-semibold mb-3 text-lg group-hover:text-accent transition-colors duration-300">Innovation</h3>
                <p className="text-sm text-muted-foreground leading-relaxed group-hover:text-foreground/80 transition-colors duration-300">
                  Creative solutions to complex problems using modern approaches
                </p>
              </div>
              <div className="absolute top-3 right-3 w-2 h-2 bg-accent/60 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 animate-pulse" />
            </div>
            
            <div className="group relative p-8 text-center glass-card hover:glass-strong hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 hover-lift hover:rotate-2 border-0 cursor-pointer overflow-hidden animate-scale-in animate-delay-200">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10 opacity-0 group-hover:opacity-100 transition-all duration-500" />
              <div className="relative z-10">
                <div className="w-16 h-16 glass-subtle rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                  <Users className="h-8 w-8 text-primary group-hover:text-primary/90 transition-colors duration-300" />
                </div>
                <h3 className="font-semibold mb-3 text-lg group-hover:text-primary transition-colors duration-300">Collaboration</h3>
                <p className="text-sm text-muted-foreground leading-relaxed group-hover:text-foreground/80 transition-colors duration-300">
                  Working effectively in team environments and cross-functional projects
                </p>
              </div>
              <div className="absolute top-3 right-3 w-2 h-2 bg-primary/60 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 animate-pulse" />
            </div>
            
            <div className="group relative p-8 text-center glass-card hover:glass-strong hover:shadow-2xl hover:shadow-accent/20 transition-all duration-500 hover-lift hover:-rotate-2 border-0 cursor-pointer overflow-hidden animate-scale-in animate-delay-300">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-accent/10 opacity-0 group-hover:opacity-100 transition-all duration-500" />
              <div className="relative z-10">
                <div className="w-16 h-16 glass-subtle rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:-rotate-6 transition-all duration-300">
                  <Zap className="h-8 w-8 text-accent group-hover:text-accent/90 transition-colors duration-300" />
                </div>
                <h3 className="font-semibold mb-3 text-lg group-hover:text-accent transition-colors duration-300">Performance</h3>
                <p className="text-sm text-muted-foreground leading-relaxed group-hover:text-foreground/80 transition-colors duration-300">
                  Optimizing for speed, efficiency, and exceptional user experiences
                </p>
              </div>
              <div className="absolute top-3 right-3 w-2 h-2 bg-accent/60 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
