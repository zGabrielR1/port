"use client"

import { useState, useEffect, useRef } from "react"
import { ShaderBackground } from "@/components/ui/shader-background"
import { Code2, Database, Settings } from "lucide-react"

const AnimatedProgressBar = ({ level, color, delay = 0 }: { level: number; color: string; delay?: number }) => {
  const [animatedLevel, setAnimatedLevel] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
      setTimeout(() => {
        setAnimatedLevel(level);
      }, delay);
    }, 500);
    return () => clearTimeout(timer);
  }, [level, delay]);

  return (
    <div className="w-full bg-white/10 backdrop-blur-sm rounded-full h-3 overflow-hidden border border-white/20">
      <div
        className={`h-3 rounded-full transition-all duration-2000 ease-out relative overflow-hidden ${
          visible ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          width: `${animatedLevel}%`,
          background: `linear-gradient(90deg, ${color}60, ${color}90, ${color}60)`
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(90deg, transparent, ${color}80, transparent)`,
            animation: 'shimmer 2s infinite'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-white/10 to-white/20 animate-pulse" />
      </div>
    </div>
  );
};

export function SkillsSection() {
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  const skillCategories = [
    {
      title: "Frontend",
      icon: Code2,
      skills: [
        { name: "React", level: 95 },
        { name: "Next.js", level: 90 },
        { name: "TypeScript", level: 88 },
        { name: "Tailwind CSS", level: 92 },
        { name: "Vue.js", level: 75 },
      ],
    },
    {
      title: "Backend",
      icon: Database,
      skills: [
        { name: "Node.js", level: 90 },
        { name: "Python", level: 85 },
        { name: "PostgreSQL", level: 80 },
        { name: "MongoDB", level: 78 },
        { name: "GraphQL", level: 82 },
      ],
    },
    {
      title: "Tools & Others",
      icon: Settings,
      skills: [
        { name: "Git", level: 95 },
        { name: "Docker", level: 80 },
        { name: "AWS", level: 75 },
        { name: "Jest", level: 85 },
        { name: "Figma", level: 70 },
      ],
    },
  ]

  return (
    <section id="skills" className="section-padding bg-black relative overflow-hidden">
      {/* Shader Background */}
      <ShaderBackground
        variant="section"
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
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse mr-3" />
            Technical Expertise
          </div>
          <h2 
            className={`text-4xl sm:text-5xl font-bold text-white mb-6 transition-all duration-700 delay-200 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent animate-gradient-x">
              Skills & Technologies
            </span>
          </h2>
          <p 
            className={`text-lg text-white/80 max-w-2xl mx-auto leading-relaxed transition-all duration-700 delay-300 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            A comprehensive overview of my technical expertise and proficiency levels across different domains of software development.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <div 
                key={index} 
                className={`glassmorphism p-6 rounded-xl transition-all duration-700 hover:scale-105 group ${
                  visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ animationDelay: `${400 + index * 200}ms` }}
              >
                <div className="text-center mb-6">
                  <div className="w-16 h-16 mx-auto mb-4 bg-blue-400/20 backdrop-blur-sm rounded-xl flex items-center justify-center border border-blue-400/30 group-hover:bg-blue-400/30 transition-all duration-300">
                    <Icon className="h-8 w-8 text-blue-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white group-hover:text-blue-400 transition-colors duration-300">{category.title}</h3>
                </div>
                <div className="space-y-4">
                  {category.skills.map((skill, skillIndex) => {
                    const colors = ['#4f9cf9', '#9f7aea', '#48bb78', '#ed8936', '#f56565'];
                    const color = colors[skillIndex % colors.length];
                    return (
                      <div key={skillIndex} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="font-medium text-white/90">{skill.name}</span>
                          <span className="text-sm text-white/70 font-medium">{skill.level}%</span>
                        </div>
                        <AnimatedProgressBar 
                          level={skill.level} 
                          color={color} 
                          delay={skillIndex * 100}
                        />
                      </div>
                    );
                  })}
                </div>
                <div className="w-full h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  )
}
