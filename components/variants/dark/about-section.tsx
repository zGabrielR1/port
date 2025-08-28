"use client"

import { useEffect, useState } from "react"
import { ShaderBackground } from "@/components/ui/shader-background"

export function AboutSection() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setShow(true), 250)
    return () => clearTimeout(t)
  }, [])

  return (
    <section id="about" className="relative py-20 overflow-hidden bg-black text-white">
      <ShaderBackground variant="soft" />
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`rounded-2xl p-10 glassmorphism transition-transform duration-700 ${show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <h2 className="text-3xl font-bold mb-4">About me</h2>
          <p className="text-white/80 leading-relaxed">I build delightful web experiences focused on performance, accessibility, and maintainability. My toolbelt includes React, Next.js, TypeScript, and modern CSS.</p>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold">What I do</h3>
              <p className="text-white/70">Design and build full-stack applications that scale and are pleasant to use.</p>
            </div>
            <div>
              <h3 className="font-semibold">Values</h3>
              <p className="text-white/70">Performance, clarity, and accessibility.	</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
