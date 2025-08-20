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
      {/* Enhanced Background Elements with Shader Effects */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />

      {/* Dynamic Gradient Orbs */}
      <div className="absolute top-10 left-10 w-80 h-80 bg-gradient-to-br from-primary/20 via-primary/10 to-transparent rounded-full blur-3xl animate-pulse shadow-2xl shadow-primary/20 hover:scale-110 transition-all duration-1000" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-gradient-to-br from-accent/20 via-accent/10 to-transparent rounded-full blur-3xl animate-pulse shadow-2xl shadow-accent/20 hover:scale-110 transition-all duration-1000" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-primary/8 via-primary/3 to-transparent rounded-full shadow-2xl shadow-primary/10" />

      {/* Additional Animated Orbs */}
      <div className="absolute top-20 right-1/4 w-64 h-64 bg-gradient-to-br from-secondary/15 via-secondary/8 to-transparent rounded-full blur-2xl animate-pulse shadow-xl shadow-secondary/10 hover:scale-110 transition-all duration-1000" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-20 left-1/4 w-72 h-72 bg-gradient-to-br from-purple-500/15 via-purple-500/8 to-transparent rounded-full blur-2xl animate-pulse shadow-xl shadow-purple-500/10 hover:scale-110 transition-all duration-1000" style={{ animationDelay: '2s' }} />

      {/* Interactive Floating Circles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-gradient-to-r from-primary to-primary/60 rounded-full animate-float shadow-lg shadow-primary/40 hover:scale-150 hover:rotate-180 transition-all duration-500 cursor-pointer" />
        <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-gradient-to-r from-accent to-accent/60 rounded-full animate-float-delayed shadow-lg shadow-accent/40 hover:scale-150 hover:rotate-180 transition-all duration-500 cursor-pointer" />
        <div className="absolute bottom-1/3 left-1/3 w-4 h-4 bg-gradient-to-r from-primary/80 to-primary/40 rounded-full animate-float shadow-lg shadow-primary/30 hover:scale-150 hover:rotate-180 transition-all duration-500 cursor-pointer" />
        <div className="absolute bottom-1/4 right-1/3 w-2 h-2 bg-gradient-to-r from-accent/80 to-accent/40 rounded-full animate-float-delayed shadow-lg shadow-accent/30 hover:scale-150 hover:rotate-180 transition-all duration-500 cursor-pointer" />

        {/* Additional Interactive Circles */}
        <div className="absolute top-1/6 right-1/6 w-2 h-2 bg-gradient-to-r from-primary/60 to-transparent rounded-full animate-pulse shadow-md shadow-primary/20 hover:scale-125 hover:rotate-180 transition-all duration-300 cursor-pointer" />
        <div className="absolute bottom-1/6 left-1/6 w-3 h-3 bg-gradient-to-r from-accent/60 to-transparent rounded-full animate-pulse shadow-md shadow-accent/20 hover:scale-125 hover:rotate-180 transition-all duration-300 cursor-pointer" />

        {/* New Enhanced Floating Elements */}
        <div className="absolute top-1/5 left-1/6 w-1 h-1 bg-gradient-to-r from-secondary/80 to-secondary/40 rounded-full animate-float shadow-sm shadow-secondary/30 hover:scale-200 hover:rotate-360 transition-all duration-700 cursor-pointer" style={{ animationDelay: '0.5s' }} />
        <div className="absolute bottom-1/5 right-1/6 w-5 h-5 bg-gradient-to-r from-purple-500/60 to-purple-500/20 rounded-full animate-float shadow-xl shadow-purple-500/20 hover:scale-125 hover:rotate-180 transition-all duration-600 cursor-pointer" style={{ animationDelay: '1.5s' }} />
        <div className="absolute top-2/3 left-2/3 w-2 h-2 bg-gradient-to-r from-pink-500/70 to-pink-500/30 rounded-full animate-float-delayed shadow-md shadow-pink-500/25 hover:scale-175 hover:rotate-360 transition-all duration-500 cursor-pointer" style={{ animationDelay: '2.5s' }} />
      </div>

      {/* Shader Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-primary/5 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="space-y-16">
          <div className="space-y-8 animate-fade-in-up">
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 text-primary text-sm font-medium mb-4 backdrop-blur-sm border border-primary/20 hover:bg-primary/20 hover:border-primary/30 transition-all duration-500 hover:scale-105 hover:shadow-lg hover:shadow-primary/20">
              ✨ Welcome to my digital space
            </div>
            <h1 className="text-6xl sm:text-7xl lg:text-9xl font-bold text-foreground leading-tight tracking-tight">
              {t('hero.greeting')}{" "}
              <span className="relative inline-block">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary animate-gradient-x hover:from-accent hover:via-primary hover:to-accent transition-all duration-1000">
                  Gabriel Renostro
                </span>
                <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-primary to-accent rounded-full opacity-60 hover:opacity-100 hover:h-2 transition-all duration-300" />
                <div className="absolute -inset-4 bg-gradient-to-r from-primary/10 via-transparent to-accent/10 rounded-2xl opacity-0 hover:opacity-100 transition-all duration-500 -z-10" />
              </span>
            </h1>
            <p className="text-2xl sm:text-3xl lg:text-4xl text-muted-foreground max-w-4xl mx-auto font-semibold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent hover:from-foreground hover:to-foreground transition-all duration-500">
              {t('hero.subtitle')}
            </p>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed hover:text-foreground/90 transition-all duration-300">
              {t('hero.description')}
            </p>
          </div>

          <div className="flex flex-col items-center gap-12 animate-fade-in-up animation-delay-200">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Button
                onClick={scrollToAbout}
                size="lg"
                className="relative bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 px-10 py-7 text-lg font-semibold rounded-2xl shadow-lg hover:shadow-xl hover:shadow-primary/25 transition-all duration-500 hover:scale-105 group overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-white/20 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-[-100%] group-hover:translate-x-[100%]" />
                <span className="relative z-10">{t('hero.viewWork')}</span>
                <ArrowDown className="ml-3 h-5 w-5 group-hover:translate-y-1 transition-transform duration-300" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="relative px-10 py-7 text-lg font-semibold rounded-2xl border-2 border-border hover:border-primary/50 hover:bg-primary/5 transition-all duration-500 hover:scale-105 group backdrop-blur-sm overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-primary/10 opacity-0 group-hover:opacity-100 transition-all duration-500" />
                <Download className="mr-3 h-5 w-5 group-hover:animate-bounce group-hover:text-primary transition-colors duration-300" />
                <span className="group-hover:text-primary transition-colors duration-300">{t('hero.downloadCV')}</span>
              </Button>
            </div>

            <div className="flex items-center gap-4 p-6 rounded-2xl bg-gradient-to-r from-background/50 via-background/30 to-background/50 backdrop-blur-sm border border-border/50 hover:border-primary/20 hover:bg-background/60 transition-all duration-500 hover:scale-105 hover:shadow-lg hover:shadow-primary/10">
              <span className="text-sm text-muted-foreground font-medium mr-2 hover:text-foreground transition-colors duration-300">Connect:</span>
              <div className="flex items-center gap-3">
                <Button variant="ghost" size="sm" className="h-12 w-12 rounded-full hover:bg-primary/10 hover:text-primary hover:scale-110 hover:rotate-12 transition-all duration-300 group">
                  <Github className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                </Button>
                <Button variant="ghost" size="sm" className="h-12 w-12 rounded-full hover:bg-accent/10 hover:text-accent hover:scale-110 hover:-rotate-12 transition-all duration-300 group">
                  <Linkedin className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                </Button>
                <Button variant="ghost" size="sm" className="h-12 w-12 rounded-full hover:bg-primary/10 hover:text-primary hover:scale-110 hover:rotate-12 transition-all duration-300 group">
                  <Mail className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                </Button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-20 animate-fade-in-up animation-delay-400">
            <div className="text-center group p-6 rounded-2xl hover:bg-gradient-to-br hover:from-card/80 hover:to-card/40 backdrop-blur-sm border border-transparent hover:border-primary/30 transition-all duration-500 hover:scale-105 hover:shadow-lg hover:shadow-primary/10 hover:-rotate-1 cursor-pointer">
              <div className="text-5xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent group-hover:from-accent group-hover:to-accent/80 transition-all duration-500 mb-2 group-hover:scale-110">
                5+
              </div>
              <div className="text-sm text-muted-foreground font-medium group-hover:text-foreground transition-colors duration-300">Years Experience</div>
            </div>
            <div className="text-center group p-6 rounded-2xl hover:bg-gradient-to-br hover:from-card/80 hover:to-card/40 backdrop-blur-sm border border-transparent hover:border-accent/30 transition-all duration-500 hover:scale-105 hover:shadow-lg hover:shadow-accent/10 hover:rotate-1 cursor-pointer">
              <div className="text-5xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent group-hover:from-accent group-hover:to-accent/80 transition-all duration-500 mb-2 group-hover:scale-110">
                50+
              </div>
              <div className="text-sm text-muted-foreground font-medium group-hover:text-foreground transition-colors duration-300">Projects Completed</div>
            </div>
            <div className="text-center group p-6 rounded-2xl hover:bg-gradient-to-br hover:from-card/80 hover:to-card/40 backdrop-blur-sm border border-transparent hover:border-primary/30 transition-all duration-500 hover:scale-105 hover:shadow-lg hover:shadow-primary/10 hover:-rotate-1 cursor-pointer">
              <div className="text-5xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent group-hover:from-accent group-hover:to-accent/80 transition-all duration-500 mb-2 group-hover:scale-110">
                20+
              </div>
              <div className="text-sm text-muted-foreground font-medium group-hover:text-foreground transition-colors duration-300">Technologies</div>
            </div>
            <div className="text-center group p-6 rounded-2xl hover:bg-gradient-to-br hover:from-card/80 hover:to-card/40 backdrop-blur-sm border border-transparent hover:border-accent/30 transition-all duration-500 hover:scale-105 hover:shadow-lg hover:shadow-accent/10 hover:rotate-1 cursor-pointer">
              <div className="text-5xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent group-hover:from-accent group-hover:to-accent/80 transition-all duration-500 mb-2 group-hover:scale-110">
                100%
              </div>
              <div className="text-sm text-muted-foreground font-medium group-hover:text-foreground transition-colors duration-300">Client Satisfaction</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
