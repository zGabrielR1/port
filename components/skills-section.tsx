"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const SkillsAnimatedBackground = () => {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden" style={{ zIndex: 0 }}>
      {/* Tech-inspired animated gradient background */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background: `
            radial-gradient(circle at 30% 20%, rgba(59, 130, 246, 0.2) 0%, transparent 40%),
            radial-gradient(circle at 70% 80%, rgba(139, 92, 246, 0.2) 0%, transparent 40%),
            radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0.15) 0%, transparent 35%),
            linear-gradient(135deg,
              rgba(59, 130, 246, 0.1) 0%,
              rgba(16, 185, 129, 0.1) 25%,
              rgba(139, 92, 246, 0.1) 50%,
              rgba(245, 101, 101, 0.1) 75%,
              rgba(59, 130, 246, 0.1) 100%)
          `,
          backgroundSize: '300% 300%',
          animation: 'techShift 20s ease-in-out infinite'
        }}
      />

      {/* Circuit-like patterns */}
      <div className="absolute top-16 right-16 w-24 h-24 opacity-20">
        <div className="w-full h-full border-2 border-cyan-400/40 rounded-sm animate-pulse-slow" style={{
          backgroundImage: `
            linear-gradient(45deg, transparent 40%, rgba(34, 211, 238, 0.1) 50%, transparent 60%),
            linear-gradient(-45deg, transparent 40%, rgba(34, 211, 238, 0.1) 50%, transparent 60%)
          `
        }} />
      </div>
      <div className="absolute bottom-20 left-20 w-32 h-32 opacity-20 animate-spin-slow">
        <div className="w-full h-full border border-purple-400/30 rounded-full" />
        <div className="absolute inset-4 border border-cyan-400/30 rounded-full" />
        <div className="absolute inset-8 border border-emerald-400/30 rounded-full" />
      </div>
      <div className="absolute top-1/2 left-10 w-20 h-20 opacity-20 animate-float-reverse">
        <div className="w-full h-full bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-lg animate-bounce-slow" />
      </div>
      <div className="absolute bottom-32 right-32 w-28 h-28 opacity-20 animate-float">
        <div className="w-full h-full border-2 border-emerald-400/30 rounded-full animate-spin-reverse" />
      </div>

      {/* Hexagonal grid pattern */}
      <div
        className="absolute inset-0 opacity-8"
        style={{
          backgroundImage: `
            linear-gradient(60deg, rgba(59, 130, 246, 0.05) 25%, transparent 25%),
            linear-gradient(-60deg, rgba(59, 130, 246, 0.05) 25%, transparent 25%),
            linear-gradient(60deg, transparent 75%, rgba(59, 130, 246, 0.05) 75%),
            linear-gradient(-60deg, transparent 75%, rgba(59, 130, 246, 0.05) 75%)
          `,
          backgroundSize: '40px 70px',
          backgroundPosition: '0 0, 0 0, 20px 35px, 20px 35px'
        }}
      />

      {/* Data flow lines */}
      <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-cyan-400/20 to-transparent animate-pulse-slow" />
      <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-purple-400/20 to-transparent animate-pulse-slow" style={{ animationDelay: '2s' }} />
      <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-emerald-400/20 to-transparent animate-pulse-slow" style={{ animationDelay: '4s' }} />
    </div>
  );
};

const TechParticles = () => {
  const particles = [
    { id: 1, x: 10, y: 20, delay: 0, color: '#00FFFF' },
    { id: 2, x: 85, y: 15, delay: 1, color: '#0080FF' },
    { id: 3, x: 25, y: 70, delay: 2, color: '#00FF80' },
    { id: 4, x: 75, y: 65, delay: 0.5, color: '#8000FF' },
    { id: 5, x: 50, y: 40, delay: 1.5, color: '#FF0080' },
    { id: 6, x: 15, y: 85, delay: 2.5, color: '#00FFFF' },
    { id: 7, x: 90, y: 30, delay: 1.2, color: '#0080FF' },
    { id: 8, x: 35, y: 10, delay: 0.8, color: '#00FF80' },
    { id: 9, x: 60, y: 90, delay: 1.8, color: '#8000FF' },
    { id: 10, x: 5, y: 50, delay: 2.2, color: '#FF0080' },
    { id: 11, x: 80, y: 75, delay: 0.3, color: '#00FFFF' },
    { id: 12, x: 45, y: 25, delay: 1.7, color: '#0080FF' },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute w-1.5 h-1.5 rounded-full animate-float opacity-70"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            animationDelay: `${particle.delay}s`,
            animationDuration: '12s',
            backgroundColor: particle.color,
            boxShadow: `0 0 12px ${particle.color}50, 0 0 24px ${particle.color}20`
          }}
        />
      ))}
    </div>
  );
};

const AnimatedProgressBar = ({ level, color }: { level: number; color: string }) => {
  const [animatedLevel, setAnimatedLevel] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedLevel(level);
    }, 500);
    return () => clearTimeout(timer);
  }, [level]);

  return (
    <div className="w-full bg-black/30 rounded-full h-3 overflow-hidden border border-white/10">
      <div
        className="h-3 rounded-full transition-all duration-2000 ease-out relative overflow-hidden"
        style={{
          width: `${animatedLevel}%`,
          background: `linear-gradient(90deg, ${color}40, ${color}80, ${color}40)`
        }}
      >
        <div
          className="absolute inset-0 animate-pulse"
          style={{
            background: `linear-gradient(90deg, transparent, ${color}60, transparent)`,
            animation: 'shimmer 2s infinite'
          }}
        />
        <div
          className="absolute top-0 left-0 w-full h-full"
          style={{
            background: `linear-gradient(90deg, transparent, ${color}30, transparent)`,
            animation: 'glowMove 3s infinite'
          }}
        />
      </div>
    </div>
  );
};

export function SkillsSection() {
  const skillCategories = [
    {
      title: "Frontend",
      icon: "🎨",
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
      icon: "⚙️",
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
      icon: "🛠️",
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
    <section id="skills" className="section-padding bg-muted/5 relative overflow-hidden">
      <SkillsAnimatedBackground />
      <TechParticles />
      <div className="absolute inset-0 bg-gradient-to-br from-background/30 via-transparent to-background/20" />

      <div className="max-w-7xl mx-auto container-padding relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-6 py-3 rounded-full glass-subtle text-accent text-sm font-medium mb-6 border-0 animate-fade-in hover-glow">
            <div className="w-2 h-2 bg-accent rounded-full animate-pulse mr-3" />
            Technical Expertise
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6 text-gradient">
            Skills & Technologies
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            A comprehensive overview of my technical expertise and proficiency levels across different domains of software development.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <div key={index} className="p-6 glass-card hover:glass-strong border-0 hover:shadow-lg hover:shadow-primary/10 hover-lift transition-all duration-500 animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="text-center mb-6">
                <div className="text-3xl mb-3 animate-bounce-gentle">{category.icon}</div>
                <h3 className="text-xl font-semibold text-gradient">{category.title}</h3>
              </div>
              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => {
                  const colors = ['#4f9cf9', '#f56565', '#48bb78', '#9f7aea', '#ed8936'];
                  const color = colors[(skillIndex + (category.title === 'Frontend' ? 0 : category.title === 'Backend' ? 1 : 2)) % colors.length];
                  return (
                    <div key={skillIndex} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-foreground">{skill.name}</span>
                        <span className="text-sm text-muted-foreground font-medium">{skill.level}%</span>
                      </div>
                      <AnimatedProgressBar level={skill.level} color={color} />
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
