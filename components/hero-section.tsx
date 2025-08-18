"use client"

import { Button } from "@/components/ui/button"
import { ArrowDown, Download, Github, Linkedin, Mail } from "lucide-react"

export function HeroSection() {
  const scrollToAbout = () => {
    const element = document.getElementById("about")
    element?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="min-h-[90vh] flex items-center justify-center bg-gradient-to-br from-background via-background to-muted/30 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
      <div className="absolute top-20 left-20 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="space-y-12">
          <div className="space-y-6">
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold text-foreground leading-tight">
              Hi, I'm{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary animate-pulse">
                Alex Johnson
              </span>
            </h1>
            <p className="text-2xl sm:text-3xl text-muted-foreground max-w-3xl mx-auto font-medium">
              Full-Stack Developer & Software Engineer
            </p>
            <p className="text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              I craft exceptional digital experiences with modern technologies. Passionate about clean code, innovative
              solutions, and building products that make a difference.
            </p>
          </div>

          <div className="flex flex-col items-center gap-8">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button onClick={scrollToAbout} size="lg" className="bg-primary hover:bg-primary/90 px-8 py-6 text-lg">
                View My Work
                <ArrowDown className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg" className="px-8 py-6 text-lg bg-transparent">
                <Download className="mr-2 h-5 w-5" />
                Download CV
              </Button>
            </div>

            <div className="flex items-center gap-6">
              <Button variant="ghost" size="sm" className="h-12 w-12 rounded-full">
                <Github className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="sm" className="h-12 w-12 rounded-full">
                <Linkedin className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="sm" className="h-12 w-12 rounded-full">
                <Mail className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-16">
            <div className="text-center group">
              <div className="text-4xl font-bold text-primary group-hover:scale-110 transition-transform duration-300">
                5+
              </div>
              <div className="text-sm text-muted-foreground font-medium">Years Experience</div>
            </div>
            <div className="text-center group">
              <div className="text-4xl font-bold text-primary group-hover:scale-110 transition-transform duration-300">
                50+
              </div>
              <div className="text-sm text-muted-foreground font-medium">Projects Completed</div>
            </div>
            <div className="text-center group">
              <div className="text-4xl font-bold text-primary group-hover:scale-110 transition-transform duration-300">
                20+
              </div>
              <div className="text-sm text-muted-foreground font-medium">Technologies</div>
            </div>
            <div className="text-center group">
              <div className="text-4xl font-bold text-primary group-hover:scale-110 transition-transform duration-300">
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
