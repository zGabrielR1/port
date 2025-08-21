"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Code, Lightbulb, Users, Zap } from "lucide-react"
import { useLanguage } from "@/components/language-provider"

export function AboutSection() {
  const { t } = useLanguage()
  return (
    <section id="about" className="py-24 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/3 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-accent/3 rounded-full blur-3xl" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-primary/20 to-accent/20 text-primary text-sm font-medium mb-6 backdrop-blur-sm border border-primary/20 hover:border-primary/40 hover:bg-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 hover:scale-105">
            👨‍💻 Get to know me
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6 relative">
            {t('about.title')}
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-primary to-accent rounded-full opacity-60" />
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed hover:text-foreground/90 transition-colors duration-300">
            With over 5 years of experience in software development, I specialize in building scalable web applications using cutting-edge technologies. My journey began with a Computer Science degree and has evolved through continuous learning and hands-on experience with diverse projects.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
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
                <span className="px-4 py-2 bg-gradient-to-r from-primary/10 to-primary/5 text-primary rounded-full text-sm font-medium hover:from-primary/20 hover:to-primary/10 hover:scale-105 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 border border-primary/20 hover:border-primary/30">
                  Problem Solver
                </span>
                <span className="px-4 py-2 bg-gradient-to-r from-accent/10 to-accent/5 text-accent rounded-full text-sm font-medium hover:from-accent/20 hover:to-accent/10 hover:scale-105 hover:shadow-lg hover:shadow-accent/20 transition-all duration-300 border border-accent/20 hover:border-accent/30">
                  Team Player
                </span>
                <span className="px-4 py-2 bg-gradient-to-r from-primary/10 to-primary/5 text-primary rounded-full text-sm font-medium hover:from-primary/20 hover:to-primary/10 hover:scale-105 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 border border-primary/20 hover:border-primary/30">
                  Continuous Learner
                </span>
                <span className="px-4 py-2 bg-gradient-to-r from-accent/10 to-accent/5 text-accent rounded-full text-sm font-medium hover:from-accent/20 hover:to-accent/10 hover:scale-105 hover:shadow-lg hover:shadow-accent/20 transition-all duration-300 border border-accent/20 hover:border-accent/30">
                  Innovation Focused
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <Card className="group relative p-8 text-center hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 hover:-translate-y-3 hover:rotate-2 border-0 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-md cursor-pointer overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10 opacity-0 group-hover:opacity-100 transition-all duration-500" />
              <CardContent className="p-0 relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg shadow-primary/10">
                  <Code className="h-8 w-8 text-primary group-hover:text-primary/90 transition-colors duration-300" />
                </div>
                <h3 className="font-semibold mb-3 text-lg group-hover:text-primary transition-colors duration-300">Clean Code</h3>
                <p className="text-sm text-muted-foreground leading-relaxed group-hover:text-foreground/80 transition-colors duration-300">
                  Writing maintainable and scalable code that stands the test of time
                </p>
              </CardContent>
              <div className="absolute top-3 right-3 w-2 h-2 bg-primary/60 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 animate-pulse" />
            </Card>
            <Card className="group relative p-8 text-center hover:shadow-2xl hover:shadow-accent/20 transition-all duration-500 hover:-translate-y-3 hover:-rotate-2 border-0 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-md cursor-pointer overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-accent/10 opacity-0 group-hover:opacity-100 transition-all duration-500" />
              <CardContent className="p-0 relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-accent/20 to-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:-rotate-6 transition-all duration-300 shadow-lg shadow-accent/10">
                  <Lightbulb className="h-8 w-8 text-accent group-hover:text-accent/90 transition-colors duration-300" />
                </div>
                <h3 className="font-semibold mb-3 text-lg group-hover:text-accent transition-colors duration-300">Innovation</h3>
                <p className="text-sm text-muted-foreground leading-relaxed group-hover:text-foreground/80 transition-colors duration-300">
                  Creative solutions to complex problems using modern approaches
                </p>
              </CardContent>
              <div className="absolute top-3 right-3 w-2 h-2 bg-accent/60 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 animate-pulse" />
            </Card>
            <Card className="group relative p-8 text-center hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 hover:-translate-y-3 hover:rotate-2 border-0 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-md cursor-pointer overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10 opacity-0 group-hover:opacity-100 transition-all duration-500" />
              <CardContent className="p-0 relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg shadow-primary/10">
                  <Users className="h-8 w-8 text-primary group-hover:text-primary/90 transition-colors duration-300" />
                </div>
                <h3 className="font-semibold mb-3 text-lg group-hover:text-primary transition-colors duration-300">Collaboration</h3>
                <p className="text-sm text-muted-foreground leading-relaxed group-hover:text-foreground/80 transition-colors duration-300">
                  Working effectively in team environments and cross-functional projects
                </p>
              </CardContent>
              <div className="absolute top-3 right-3 w-2 h-2 bg-primary/60 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 animate-pulse" />
            </Card>
            <Card className="group relative p-8 text-center hover:shadow-2xl hover:shadow-accent/20 transition-all duration-500 hover:-translate-y-3 hover:-rotate-2 border-0 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-md cursor-pointer overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-accent/10 opacity-0 group-hover:opacity-100 transition-all duration-500" />
              <CardContent className="p-0 relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-accent/20 to-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:-rotate-6 transition-all duration-300 shadow-lg shadow-accent/10">
                  <Zap className="h-8 w-8 text-accent group-hover:text-accent/90 transition-colors duration-300" />
                </div>
                <h3 className="font-semibold mb-3 text-lg group-hover:text-accent transition-colors duration-300">Performance</h3>
                <p className="text-sm text-muted-foreground leading-relaxed group-hover:text-foreground/80 transition-colors duration-300">
                  Optimizing for speed, efficiency, and exceptional user experiences
                </p>
              </CardContent>
              <div className="absolute top-3 right-3 w-2 h-2 bg-accent/60 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 animate-pulse" />
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
