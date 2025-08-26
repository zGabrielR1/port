"use client"

import { useState, useEffect } from "react"
import { Code, Lightbulb, Users, Zap } from "lucide-react"
import { useLanguage } from "@/components/language-provider"

export function AboutSection() {
  const { t } = useLanguage()
  return (
    <section id="about" className="section-padding bg-background">
      <div className="max-w-7xl mx-auto container-padding">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <div className="w-2 h-2 bg-primary rounded-full mr-2" />
            About Me
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
            Get to Know Me
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            With over 5 years of experience in software development, I specialize in building scalable web applications using cutting-edge technologies. My journey began with a Computer Science degree and has evolved through continuous learning and hands-on experience with diverse projects.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                With over 5 years of experience in software development, I specialize in building scalable web applications using cutting-edge technologies. My journey began with a Computer Science degree and has evolved through continuous learning and hands-on experience with diverse projects.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                I'm passionate about writing clean, maintainable code and staying up-to-date with the latest industry trends. When I'm not coding, you'll find me contributing to open-source projects, mentoring junior developers, or exploring new technologies.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-foreground">What drives me:</h3>
              <div className="flex flex-wrap gap-2">
                {["Problem Solver", "Team Player", "Continuous Learner", "Innovation Focused"].map((item, index) => (
                  <span 
                    key={item}
                    className="px-3 py-1.5 bg-muted rounded-full text-sm font-medium text-foreground"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              { 
                icon: Code, 
                title: "Clean Code", 
                description: "Writing maintainable and scalable code that stands the test of time",
                color: "primary"
              },
              { 
                icon: Lightbulb, 
                title: "Innovation", 
                description: "Creative solutions to complex problems using modern approaches",
                color: "accent"
              },
              { 
                icon: Users, 
                title: "Collaboration", 
                description: "Working effectively in team environments and cross-functional projects",
                color: "primary"
              },
              { 
                icon: Zap, 
                title: "Performance", 
                description: "Optimizing for speed, efficiency, and exceptional user experiences",
                color: "accent"
              }
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <div 
                  key={index}
                  className="modern-card p-6 hover:shadow-lg transition-all duration-300"
                >
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 bg-${item.color}/10`}>
                    <Icon className={`h-6 w-6 text-${item.color}`} />
                  </div>
                  <h3 className="font-semibold mb-2 text-foreground">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
