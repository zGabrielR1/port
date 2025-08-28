"use client"

import { useEffect, useState } from "react"
import { ShaderBackground } from "@/components/ui/shader-background"

export function ProjectsSection() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setShow(true), 200)
    return () => clearTimeout(t)
  }, [])

  const projects = [
    { title: 'Portfolio', desc: 'Personal portfolio built with Next.js and Tailwind.' },
    { title: 'Shader Clock', desc: 'WebGL shader experiments with time-based animations.' },
    { title: 'UI Kit', desc: 'Reusable components and design tokens.' }
  ]

  return (
    <section id="projects" className="relative py-20 overflow-hidden bg-black text-white">
      <ShaderBackground variant="ambient" />
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold mb-8">Selected Projects</h2>
        <div className={`grid grid-cols-1 sm:grid-cols-3 gap-6 transition-all duration-700 ${show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          {projects.map((p, i) => (
            <div key={p.title} className="p-6 rounded-2xl glassmorphism border border-white/10">
              <h3 className="font-semibold mb-2">{p.title}</h3>
              <p className="text-white/70 text-sm">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
