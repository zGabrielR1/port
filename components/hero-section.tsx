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
    <section className="min-h-[100vh] flex items-center justify-center bg-gradient-to-br from-background via-background to-muted/20 relative overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
      <div className="absolute top-10 left-10 w-80 h-80 bg-gradient-to-br from-primary/10 to-primary/5 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-gradient-to-br from-accent/10 to-accent/5 rounded-full blur-3xl animate-pulse" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-primary/5 via-transparent to-transparent rounded-full" />

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary/30 rounded-full animate-float" />
        <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-accent/40 rounded-full animate-float-delayed" />
        <div className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 bg-primary/25 rounded-full animate-float" />
        <div className="absolute bottom-1/4 right-1/3 w-1 h-1 bg-accent/35 rounded-full animate-float-delayed" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="space-y-16">
          <div className="space-y-8 animate-fade-in-up">
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4 backdrop-blur-sm border border-primary/20 hover:bg-primary/20 transition-all duration-300">
              ✨ Welcome to my digital space
            </div>
            <h1 className="text-6xl sm:text-7xl lg:text-9xl font-bold text-foreground leading-tight tracking-tight">
              {t('hero.greeting')}{" "}
              <span className="relative inline-block">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary animate-gradient-x">
                  Gabriel Renostro
                </span>
                <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-primary to-accent rounded-full opacity-60" />
              </span>
            </h1>
            <p className="text-2xl sm:text-3xl lg:text-4xl text-muted-foreground max-w-4xl mx-auto font-semibold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
              {t('hero.subtitle')}
            </p>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              {t('hero.description')}
            </p>
          </div>

          <div className="flex flex-col items-center gap-12 animate-fade-in-up animation-delay-200">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Button
                onClick={scrollToAbout}
                size="lg"
                className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 px-10 py-7 text-lg font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group"
              >
                {t('hero.viewWork')}
                <ArrowDown className="ml-3 h-5 w-5 group-hover:translate-y-1 transition-transform duration-300" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="px-10 py-7 text-lg font-semibold rounded-2xl border-2 hover:bg-accent/10 transition-all duration-300 hover:scale-105 group backdrop-blur-sm"
              >
                <Download className="mr-3 h-5 w-5 group-hover:animate-bounce" />
                {t('hero.downloadCV')}
              </Button>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-2xl bg-background/50 backdrop-blur-sm border border-border/50">
              <span className="text-sm text-muted-foreground font-medium mr-2">Connect:</span>
              <div className="flex items-center gap-3">
                <Button variant="ghost" size="sm" className="h-12 w-12 rounded-full hover:bg-primary/10 hover:text-primary hover:scale-110 transition-all duration-300">
                  <Github className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="sm" className="h-12 w-12 rounded-full hover:bg-accent/10 hover:text-accent hover:scale-110 transition-all duration-300">
                  <Linkedin className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="sm" className="h-12 w-12 rounded-full hover:bg-primary/10 hover:text-primary hover:scale-110 transition-all duration-300">
                  <Mail className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-20 animate-fade-in-up animation-delay-400">
            <div className="text-center group p-6 rounded-2xl hover:bg-card/50 backdrop-blur-sm border border-transparent hover:border-border/50 transition-all duration-300 hover:scale-105">
              <div className="text-5xl font-bold text-primary group-hover:text-accent transition-colors duration-300 mb-2">
                5+
              </div>
              <div className="text-sm text-muted-foreground font-medium">Years Experience</div>
            </div>
            <div className="text-center group p-6 rounded-2xl hover:bg-card/50 backdrop-blur-sm border border-transparent hover:border-border/50 transition-all duration-300 hover:scale-105">
              <div className="text-5xl font-bold text-primary group-hover:text-accent transition-colors duration-300 mb-2">
                50+
              </div>
              <div className="text-sm text-muted-foreground font-medium">Projects Completed</div>
            </div>
            <div className="text-center group p-6 rounded-2xl hover:bg-card/50 backdrop-blur-sm border border-transparent hover:border-border/50 transition-all duration-300 hover:scale-105">
              <div className="text-5xl font-bold text-primary group-hover:text-accent transition-colors duration-300 mb-2">
                20+
              </div>
              <div className="text-sm text-muted-foreground font-medium">Technologies</div>
            </div>
            <div className="text-center group p-6 rounded-2xl hover:bg-card/50 backdrop-blur-sm border border-transparent hover:border-border/50 transition-all duration-300 hover:scale-105">
              <div className="text-5xl font-bold text-primary group-hover:text-accent transition-colors duration-300 mb-2">
                100%
              </div>
              <div className="text-sm text-muted-foreground font-medium">Client Satisfaction</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
