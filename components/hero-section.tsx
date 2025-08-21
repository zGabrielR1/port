"use client"

import { Button } from "@/components/ui/button"
import { ArrowDown, Download, Github, Linkedin, Mail } from "lucide-react"
import { useLanguage } from "@/components/language-provider"

export function HeroSection() {
  const { t } = useLanguage()

  const scrollToAbout = () => {
    const element = document.getElementById("about")
    element?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-muted/10 relative overflow-hidden">
      {/* Clean Background */}
      <div className="absolute inset-0 bg-grid-white/[0.01] bg-[size:60px_60px]" />

      {/* Subtle Gradient Orbs */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-32 right-32 w-80 h-80 bg-gradient-to-br from-accent/8 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />

      {/* Minimal Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-2 h-2 bg-primary/30 rounded-full animate-float shadow-sm" />
        <div className="absolute top-2/3 right-1/3 w-1.5 h-1.5 bg-accent/40 rounded-full animate-float-delayed shadow-sm" />
        <div className="absolute bottom-1/4 left-1/2 w-1 h-1 bg-secondary/50 rounded-full animate-float shadow-xs" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center relative z-10">
        <div className="space-y-12">
          <div className="space-y-8">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/5 text-primary text-sm font-medium border border-primary/10 hover:bg-primary/10 transition-all duration-300">
              ✨ Welcome to my digital space
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-8xl font-bold text-foreground leading-tight tracking-tight">
              Hi, I'm{" "}
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                  Alex Johnson
                </span>
                <div className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-primary to-accent rounded-full" />
              </span>
            </h1>
            <p className="text-xl sm:text-2xl lg:text-3xl text-muted-foreground max-w-3xl mx-auto font-medium leading-relaxed">
              Full-Stack Developer & Software Engineer
            </p>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              I create exceptional digital experiences with modern technologies, focusing on clean code and user-centered design.
            </p>
          </div>

          <div className="flex flex-col items-center gap-8">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                onClick={scrollToAbout}
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group"
              >
                <span>View My Work</span>
                <ArrowDown className="ml-2 h-5 w-5 group-hover:translate-y-1 transition-transform duration-300" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="px-8 py-6 text-lg font-medium rounded-xl border-border hover:bg-accent/5 hover:text-accent hover:border-accent/50 transition-all duration-300 hover:scale-105 group"
              >
                <Download className="mr-2 h-5 w-5 group-hover:animate-bounce transition-transform duration-300" />
                <span>Download CV</span>
              </Button>
            </div>

            <div className="flex items-center gap-2 p-4 rounded-xl bg-muted/50 border border-border/50">
              <span className="text-sm text-muted-foreground font-medium mr-3">Connect:</span>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" className="h-10 w-10 rounded-lg hover:bg-primary/10 hover:text-primary transition-all duration-300 hover:scale-110">
                  <Github className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="h-10 w-10 rounded-lg hover:bg-accent/10 hover:text-accent transition-all duration-300 hover:scale-110">
                  <Linkedin className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="h-10 w-10 rounded-lg hover:bg-primary/10 hover:text-primary transition-all duration-300 hover:scale-110">
                  <Mail className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-12">
            <div className="text-center p-4 rounded-xl hover:bg-card/50 border border-transparent hover:border-border/50 transition-all duration-300 hover:scale-105">
              <div className="text-3xl font-bold text-primary mb-1">5+</div>
              <div className="text-xs text-muted-foreground font-medium">Years Experience</div>
            </div>
            <div className="text-center p-4 rounded-xl hover:bg-card/50 border border-transparent hover:border-border/50 transition-all duration-300 hover:scale-105">
              <div className="text-3xl font-bold text-accent mb-1">50+</div>
              <div className="text-xs text-muted-foreground font-medium">Projects Completed</div>
            </div>
            <div className="text-center p-4 rounded-xl hover:bg-card/50 border border-transparent hover:border-border/50 transition-all duration-300 hover:scale-105">
              <div className="text-3xl font-bold text-primary mb-1">20+</div>
              <div className="text-xs text-muted-foreground font-medium">Technologies</div>
            </div>
            <div className="text-center p-4 rounded-xl hover:bg-card/50 border border-transparent hover:border-border/50 transition-all duration-300 hover:scale-105">
              <div className="text-3xl font-bold text-accent mb-1">100%</div>
              <div className="text-xs text-muted-foreground font-medium">Client Satisfaction</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
