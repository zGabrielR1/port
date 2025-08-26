"use client"

import { useState, useEffect } from "react"
import { Code, Lightbulb, Users, Zap } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import { ShaderBackground } from "@/components/ui/shader-background"

export function AboutSection() {
  const { t } = useLanguage()
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="about" className="section-padding bg-black relative overflow-hidden">
      {/* Subtle Shader Background */}
      <ShaderBackground 
        intensity={0.08} 
        speed={0.5} 
        complexity={6}
        className="opacity-40"
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/80" />
      
      <div className="max-w-7xl mx-auto container-padding relative z-10">
        <div className="text-center mb-16">
          <div 
            className={`inline-flex items-center px-6 py-3 rounded-full glassmorphism text-white text-sm font-medium mb-6 transition-all duration-700 ${
              visible ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
          >
            <div className="w-2 h-2 bg-blue-400 rounded-full mr-2 animate-pulse" />
            About Me
          </div>
          <h2 
            className={`text-3xl sm:text-4xl font-bold text-white mb-6 transition-all duration-700 delay-200 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            Get to Know Me
          </h2>
          <p 
            className={`text-lg text-white/80 max-w-2xl mx-auto transition-all duration-700 delay-300 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            With over 5 years of experience in software development, I specialize in building scalable web applications using cutting-edge technologies. My journey began with a Computer Science degree and has evolved through continuous learning and hands-on experience with diverse projects.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div 
            className={`space-y-6 transition-all duration-700 delay-400 ${
              visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
            }`}
          >
            <div className="glassmorphism p-8 rounded-2xl space-y-6">
              <div className="space-y-4">
                <p className="text-white/90 leading-relaxed">
                  With over 5 years of experience in software development, I specialize in building scalable web applications using cutting-edge technologies. My journey began with a Computer Science degree and has evolved through continuous learning and hands-on experience with diverse projects.
                </p>
                <p className="text-white/90 leading-relaxed">
                  I'm passionate about writing clean, maintainable code and staying up-to-date with the latest industry trends. When I'm not coding, you'll find me contributing to open-source projects, mentoring junior developers, or exploring new technologies.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white">What drives me:</h3>
                <div className="flex flex-wrap gap-3">
                  {["Problem Solver", "Team Player", "Continuous Learner", "Innovation Focused"].map((item, index) => (
                    <span 
                      key={item}
                      className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium text-white border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105"
                      style={{ animationDelay: `${800 + index * 100}ms` }}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div 
            className={`grid grid-cols-2 gap-4 transition-all duration-700 delay-500 ${
              visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            }`}
          >
            {[
              { 
                icon: Code, 
                title: "Clean Code", 
                description: "Writing maintainable and scalable code that stands the test of time",
                color: "blue"
              },
              { 
                icon: Lightbulb, 
                title: "Innovation", 
                description: "Creative solutions to complex problems using modern approaches",
                color: "purple"
              },
              { 
                icon: Users, 
                title: "Collaboration", 
                description: "Working effectively in team environments and cross-functional projects",
                color: "blue"
              },
              { 
                icon: Zap, 
                title: "Performance", 
                description: "Optimizing for speed, efficiency, and exceptional user experiences",
                color: "purple"
              }
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <div 
                  key={index}
                  className="glassmorphism p-6 rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105 group"
                  style={{ animationDelay: `${600 + index * 150}ms` }}
                >
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 bg-${item.color}-400/20 backdrop-blur-sm border border-${item.color}-400/30 group-hover:bg-${item.color}-400/30 transition-all duration-300`}>
                    <Icon className={`h-6 w-6 text-${item.color}-400`} />
                  </div>
                  <h3 className="font-semibold mb-2 text-white group-hover:text-blue-400 transition-colors duration-300">{item.title}</h3>
                  <p className="text-sm text-white/80 leading-relaxed">
                    {item.description}
                  </p>
                  <div className={`w-8 h-0.5 bg-gradient-to-r from-${item.color}-400 to-purple-400 rounded-full mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
