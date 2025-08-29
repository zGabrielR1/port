"use client"

import { useState, useEffect, useMemo } from "react"
import { MousePointer } from "lucide-react"
import { motion, AnimatePresence } from "motion/react"

export function HeroSection() {
  const [isHovered, setIsHovered] = useState(false)
  const [isActive, setIsActive] = useState(false)
  const [show, setShow] = useState(false)

  // Fade in animation
  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 200)
    return () => clearTimeout(timer)
  }, [])

  // Generate cursor positions in concentric circles for the button effect
  const cursors = useMemo(() => {
    const cursors: Array<{
      id: string;
      finalX: number;
      finalY: number;
      delay: number;
      rotation: number;
      isTrail: boolean;
      opacity: number;
      scale: number;
    }> = []
    const circles = [120, 160, 200, 240]
    const cursorsPerCircle = [8, 12, 16, 20]

    circles.forEach((radius, circleIndex) => {
      const count = cursorsPerCircle[circleIndex]
      for (let i = 0; i < count; i++) {
        const angle = (i / count) * 2 * Math.PI
        const x = Math.cos(angle) * radius
        const y = Math.sin(angle) * radius

        // Calculate rotation to point outward from button center
        const rotationOutward = Math.atan2(y, x) * (180 / Math.PI)

        cursors.push({
          id: `cursor-${circleIndex}-${i}`,
          finalX: x,
          finalY: y,
          delay: circleIndex * 0.01 + i * 0.002,
          rotation: rotationOutward,
          isTrail: false,
          opacity: 1,
          scale: 1
        })

        // Trail cursors
        for (let t = 1; t <= 2; t++) {
          cursors.push({
            id: `cursor-${circleIndex}-${i}-trail-${t}`,
            finalX: x,
            finalY: y,
            delay: circleIndex * 0.01 + i * 0.002 + t * 0.008,
            rotation: rotationOutward,
            isTrail: true,
            opacity: 1 - (t * 0.3),
            scale: 1 - (t * 0.2)
          })
        }
      }
    })

    return cursors
  }, [])

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Light background with theme image */}
      <div className="absolute inset-0 bg-white">
    <div className="absolute inset-0 bg-background">
        <div
          className="absolute bg-center bg-cover bg-no-repeat inset-0"
          style={{
            backgroundImage: `url('/555c0dbdf8e4d07301d5ff5c75b2888e8dd02850.png')`,
          }}
        />
        {/* Light gradient overlays for depth */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-white/30 to-white/50" />
    <div className="absolute inset-0 bg-gradient-to-br from-card/60 via-card/30 to-card/50" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center relative z-10">
        <div className="space-y-12">
          {/* Welcome message with glass effect */}
          <div className={`backdrop-blur-md bg-white/20 border border-white/30 rounded-3xl shadow-xl shadow-black/10 px-8 py-6 transition-all duration-700 ${show ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
            <div className={`backdrop-blur-md bg-card/20 border border-border/30 rounded-3xl shadow-xl shadow-black/10 px-8 py-6 transition-all duration-700 ${show ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-transparent to-white/5 rounded-3xl" />
              <div className="absolute inset-0 bg-gradient-to-r from-card/10 via-transparent to-card/5 rounded-3xl" />
            <div className="absolute inset-0 rounded-3xl shadow-inner shadow-white/20" />
            <div className="relative z-10">
              <p className="text-gray-800 text-lg font-medium drop-shadow-sm">
                Welcome to my creative space
              </p>
            </div>
          </div>

          {/* Main glassmorphism button - template inspired */}
          <motion.div
            className="relative backdrop-blur-lg bg-white/20 border border-white/30 shadow-2xl shadow-black/20 box-border content-stretch flex flex-col gap-0.5 items-center justify-center px-[22px] py-4 rounded-[38px] transition-all duration-300 hover:bg-white/30 hover:border-white/50 hover:shadow-3xl hover:shadow-black/25 hover:scale-105 active:scale-95 group overflow-visible z-20 will-change-transform cursor-pointer"
            <motion.div
              className="relative backdrop-blur-lg bg-card/20 border border-border/30 shadow-2xl shadow-black/20 box-border content-stretch flex flex-col gap-0.5 items-center justify-center px-[22px] py-4 rounded-[38px] transition-all duration-300 hover:bg-card/30 hover:border-border/50 hover:shadow-3xl hover:shadow-black/25 hover:scale-105 active:scale-95 group overflow-visible z-20 will-change-transform cursor-pointer"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => setIsActive(!isActive)}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: show ? 1 : 0,
              scale: show ? 1 : 0.8
            }}
            transition={{ duration: 1, ease: "easeOut" }}
            whileHover={{ scale: 1.02 }}
          >
            {/* Enhanced gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/5 to-transparent rounded-[38px]" />
              <div className="absolute inset-0 bg-gradient-to-r from-card/10 via-card/5 to-transparent rounded-[38px]" />

            {/* Pulsing glow effect */}
            <motion.div
              className="absolute inset-0 rounded-[38px] opacity-0 will-change-transform"
              animate={(isHovered || isActive) ? {
                opacity: [0, 0.6, 0],
                scale: [1, 1.05, 1],
                boxShadow: [
                  "0 0 0px rgba(255,255,255,0)",
                  "0 0 20px rgba(255,255,255,0.4)",
                  "0 0 0px rgba(255,255,255,0)"
                ]
              } : {}}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />

            {/* Inner glow */}
            <div className="absolute inset-0 rounded-[38px] shadow-inner shadow-white/20" />

            {/* Flying Cursors */}
            <AnimatePresence>
              {(isHovered || isActive) && (
                <motion.div
                  className="absolute pointer-events-none will-change-transform z-10"
                  style={{
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)'
                  }}
                  animate={{
                    rotate: -360
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                >
                  {cursors.map((cursor) => (
                    <motion.div
                      key={cursor.id}
                      className="absolute pointer-events-none will-change-transform"
                      initial={{
                        x: 0,
                        y: 0,
                        opacity: 0,
                        scale: 0
                      }}
                      animate={{
                        x: cursor.finalX,
                        y: cursor.finalY,
                        opacity: cursor.isTrail ? cursor.opacity : 1,
                        scale: cursor.isTrail ? cursor.scale : 1
                      }}
                      exit={{
                        opacity: 0,
                        scale: 0,
                        transition: { duration: 0.03 }
                      }}
                      transition={{
                        duration: 0.08,
                        delay: cursor.delay,
                        ease: "easeOut",
                        type: "spring",
                        damping: 25,
                        stiffness: 400,
                        opacity: {
                          duration: cursor.isTrail ? 0.08 : 2,
                          repeat: cursor.isTrail ? 0 : Infinity,
                          ease: "easeInOut"
                        },
                        scale: {
                          duration: cursor.isTrail ? 0.08 : 2,
                          repeat: cursor.isTrail ? 0 : Infinity,
                          ease: "easeInOut"
                        }
                      }}
                    >
                      <MousePointer
                        className="w-6 h-6 text-gray-700 drop-shadow-lg"
                        style={{
                          filter: 'drop-shadow(0 0 6px rgba(0,0,0,0.2))',
                          opacity: cursor.opacity,
                          transform: `scale(${cursor.scale}) rotate(${cursor.rotation}deg)`
                        }}
                      />
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex flex-col font-['Inter',_sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#1e293b] text-[24px] text-center text-nowrap tracking-[-0.7px] z-10 drop-shadow-lg">
              <p className="adjustLetterSpacing block leading-[1.4] whitespace-pre">
                Hi, I'm Gabriel
              </p>
            </div>
          </motion.div>

          {/* Subtitle */}
          <motion.div
            className={`backdrop-blur-md bg-white/20 border border-white/30 rounded-2xl shadow-xl shadow-black/10 px-6 py-4 max-w-2xl mx-auto transition-all duration-700 ${show ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
            <motion.div
              className={`backdrop-blur-md bg-card/20 border border-border/30 rounded-2xl shadow-xl shadow-black/10 px-6 py-4 max-w-2xl mx-auto transition-all duration-700 ${show ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
            style={{ animationDelay: "0.3s" }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-transparent to-white/5 rounded-2xl" />
              <div className="absolute inset-0 bg-gradient-to-r from-card/10 via-transparent to-card/5 rounded-2xl" />
            <div className="absolute inset-0 rounded-2xl shadow-inner shadow-white/20" />
            <div className="relative z-10">
              <p className="text-gray-700 text-lg font-medium drop-shadow-sm">
                Full-Stack Developer & Creative Problem Solver
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}