"use client"

import { motion } from "motion/react";
import { MousePointer, Code, Briefcase, Mail, Github, Linkedin, ArrowRight } from "lucide-react";
import { useState, useMemo, useEffect } from "react";
import dynamic from 'next/dynamic'
import { useSiteVariant } from '@/components/ui/use-site-variant'

function GlassmorphismCard({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      className={`backdrop-blur-md bg-white/20 border border-white/30 shadow-xl shadow-black/20 rounded-[38px] p-6 hover:bg-white/30 hover:border-white/50 hover:shadow-2xl hover:shadow-black/30 transition-all duration-300 group ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6, ease: "easeOut" }}
      whileHover={{ scale: 1.02 }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/5 to-transparent rounded-[38px]" />
      <div className="absolute inset-0 rounded-[38px] shadow-inner shadow-white/20" />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}

function InteractiveButton({ children, onClick, className = "" }: { children: React.ReactNode; onClick?: () => void; className?: string }) {
  return (
    <motion.button
      className={`backdrop-blur-md bg-white/20 border border-white/30 px-6 py-3 rounded-[24px] text-sm font-medium text-black/80 hover:bg-white/30 hover:border-white/50 transition-all duration-300 font-['Inter',_sans-serif] tracking-[-0.7px] ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
    >
      {children}
    </motion.button>
  );
}

function PortfolioHero() {
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);

  // Generate cursor positions in concentric circles - with visual richness and performance
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
    }> = [];
    // Increased circle radii to be further from the button
    const circles = [140, 180, 220, 260]; // Slightly bigger circles
    const cursorsPerCircle = [8, 12, 16, 20]; // Restored original cursor counts

    circles.forEach((radius, circleIndex) => {
      const count = cursorsPerCircle[circleIndex];
      for (let i = 0; i < count; i++) {
        const angle = (i / count) * 2 * Math.PI;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;

        // Calculate rotation to point outward from button center (0, 0)
        const rotationOutward = Math.atan2(y, x) * (180 / Math.PI);

        // Main cursor
        cursors.push({
          id: `cursor-${circleIndex}-${i}`,
          finalX: x,
          finalY: y,
          delay: circleIndex * 0.01 + i * 0.002,
          rotation: rotationOutward,
          isTrail: false,
          opacity: 1,
          scale: 1
        });

        // Trail cursors (2 trailing elements for performance balance)
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
          });
        }
      }
    });

    return cursors;
  }, []);

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated shader background */}
      <div className="absolute inset-0">
        <div className="absolute bg-center bg-cover bg-no-repeat inset-0" style={{
          backgroundImage: `url('/555c0dbdf8e4d07301d5ff5c75b2888e8dd02850.png')`,
        }} />
        {/* Moving shader overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-pink-900/20"
          animate={{
            background: [
              "linear-gradient(45deg, rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.1), rgba(236, 72, 153, 0.1))",
              "linear-gradient(225deg, rgba(147, 51, 234, 0.1), rgba(236, 72, 153, 0.1), rgba(59, 130, 246, 0.1))",
              "linear-gradient(45deg, rgba(236, 72, 153, 0.1), rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.1))",
            ]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        {/* Floating particles (deterministic) */}
        {(() => {
          const count = 20
          // small seeded PRNG (mulberry32) so server and client markup match
          const mulberry32 = (a: number) => () => {
            let t = a >>> 0
            t += 0x6D2B79F5
            t = Math.imul(t ^ (t >>> 15), t | 1)
            t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
            return ((t ^ (t >>> 14)) >>> 0) / 4294967296
          }

          const parts = Array.from({ length: count }).map((_, i) => {
            const r1 = mulberry32(111111 + i)()
            const r2 = mulberry32(222222 + i)()
            return {
              left: `${(r1 * 100).toFixed(12)}%`,
              top: `${(r2 * 100).toFixed(12)}%`,
              duration: 4 + Math.floor(((r1 + r2) % 1) * 2),
              delay: Number(((r2 * 3).toFixed(6)))
            }
          })

          return parts.map((p, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white/30 rounded-full"
              style={{ left: p.left, top: p.top }}
              animate={{ y: [-20, 20, -20], x: [-10, 10, -10], opacity: [0.3, 0.8, 0.3] }}
              transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: 'easeInOut' }}
            />
          ))
        })()}
      </div>

      {/* Main portfolio button - EVEN LARGER */}
      <motion.div
        className="relative backdrop-blur-lg bg-white/8 border border-white/15 shadow-2xl shadow-black/40 box-border content-stretch flex flex-col gap-8 items-center justify-center px-16 py-14 rounded-[56px] transition-all duration-300 hover:bg-white/12 hover:border-white/30 hover:shadow-3xl hover:shadow-black/50 hover:scale-105 active:scale-98 group overflow-visible z-20 will-change-transform cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setIsActive(!isActive)}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        whileHover={{
          scale: 1.03,
          transition: { duration: 0.3 }
        }}
      >
        {/* Enhanced gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/15 via-white/5 to-white/10 rounded-[48px]" />

        {/* Pulsing glow effect */}
        <motion.div
          className="absolute inset-0 rounded-[48px] will-change-transform"
          animate={(isHovered || isActive) ? {
            opacity: [0, 0.8, 0],
            scale: [1, 1.02, 1],
            boxShadow: [
              "0 0 0px rgba(255,255,255,0)",
              "0 0 40px rgba(255,255,255,0.6)",
              "0 0 0px rgba(255,255,255,0)"
            ]
          } : {}}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Inner glow */}
        <div className="absolute inset-0 rounded-[48px] shadow-inner shadow-white/30" />

        {/* Flying Cursors - Enhanced */}
        <motion.div
          className="absolute pointer-events-none will-change-transform z-10"
          style={{
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)'
          }}
          animate={{
            rotate: 360
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          {(isHovered || isActive) && cursors.map((cursor) => (
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
                className="w-6 h-6 text-white drop-shadow-2xl"
                style={{
                  filter: 'drop-shadow(0 0 8px rgba(255,255,255,0.8))',
                  opacity: cursor.opacity,
                  transform: `scale(${cursor.scale}) rotate(${cursor.rotation}deg)`
                }}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Content with Gabriel's information - SHARPER TEXT */}
        <div className="flex flex-col font-['Inter',_sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-center z-10">
          <motion.p
            className="block leading-[1.1] text-[48px] font-bold mb-3 tracking-[-1.5px]"
            style={{
              color: '#ffffff',
              textShadow: '0 0 20px rgba(255,255,255,0.8), 0 0 40px rgba(255,255,255,0.6), 0 0 60px rgba(255,255,255,0.4), 2px 2px 4px rgba(0,0,0,0.8)',
              fontFeatureSettings: '"kern" 1',
              WebkitFontSmoothing: 'antialiased',
              MozOsxFontSmoothing: 'grayscale'
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Hi, I'm Gabriel
          </motion.p>
          <motion.p
            className="block leading-[1.2] text-[28px] font-semibold mb-4 tracking-[-0.8px]"
            style={{
              color: 'rgba(255,255,255,0.95)',
              textShadow: '0 0 15px rgba(255,255,255,0.9), 0 0 30px rgba(255,255,255,0.7), 1px 1px 3px rgba(0,0,0,0.7)',
              fontFeatureSettings: '"kern" 1',
              WebkitFontSmoothing: 'antialiased',
              MozOsxFontSmoothing: 'grayscale'
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Full-Stack Developer
          </motion.p>
          <motion.p
            className="block leading-[1.3] text-[20px] max-w-[400px] font-light"
            style={{
              color: 'rgba(255,255,255,0.9)',
              textShadow: '0 0 10px rgba(255,255,255,0.8), 0 0 20px rgba(255,255,255,0.6), 1px 1px 2px rgba(0,0,0,0.6)',
              fontFeatureSettings: '"kern" 1',
              WebkitFontSmoothing: 'antialiased',
              MozOsxFontSmoothing: 'grayscale'
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            Creating exceptional digital experiences with modern technologies and user-centered design
          </motion.p>
        </div>

        {/* Enhanced action buttons */}
        <motion.div
          className="flex gap-4 mt-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
        >
          <motion.button
            className="backdrop-blur-md bg-white/20 border border-white/30 px-8 py-3 rounded-[32px] text-base font-semibold text-white hover:bg-white/30 hover:border-white/50 transition-all duration-300 shadow-lg hover:shadow-xl"
            whileHover={{
              scale: 1.05,
              backgroundColor: "rgba(255, 255, 255, 0.3)",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)"
            }}
            whileTap={{ scale: 0.98 }}
          >
            View Portfolio
          </motion.button>
          <motion.button
            className="backdrop-blur-md bg-white/20 border border-white/30 px-8 py-3 rounded-[32px] text-base font-semibold text-white hover:bg-white/30 hover:border-white/50 transition-all duration-300 shadow-lg hover:shadow-xl"
            whileHover={{
              scale: 1.05,
              backgroundColor: "rgba(255, 255, 255, 0.3)",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)"
            }}
            whileTap={{ scale: 0.98 }}
          >
            Get In Touch
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
}

function PortfolioSection({ title, children, delay = 0 }: { title: string; children: React.ReactNode; delay?: number }) {
  return (
    <section className="py-20 px-8">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-black/90 text-center mb-12 font-['Inter',_sans-serif] tracking-[-0.7px]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay, duration: 0.6 }}
          viewport={{ once: true }}
        >
          {title}
        </motion.h2>
        {children}
      </div>
    </section>
  );
}

function AnimatedBackground({ variant = "default", isDark = false }: { variant?: "default" | "hero", isDark?: boolean }) {
  return (
    <div className="absolute inset-0 -z-10">
      <div className="absolute bg-center bg-cover bg-no-repeat inset-0" style={{
        backgroundImage: `url('/555c0dbdf8e4d07301d5ff5c75b2888e8dd02850.png')`,
        filter: isDark ? 'brightness(0.6) contrast(1.05)' : undefined
      }} />
      {/* Moving shader overlay with different opacity for sections */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: isDark
            ? (variant === "hero"
                ? "linear-gradient(45deg, rgba(0,0,0,0.6), rgba(12,12,20,0.6), rgba(20,8,10,0.6))"
                : "linear-gradient(45deg, rgba(0,0,0,0.5), rgba(12,12,20,0.5), rgba(20,8,10,0.5))")
            : (variant === "hero"
                ? "linear-gradient(45deg, rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.1), rgba(236, 72, 153, 0.1))"
                : "linear-gradient(45deg, rgba(59, 130, 246, 0.2), rgba(147, 51, 234, 0.2), rgba(236, 72, 153, 0.2))")
        }}
        animate={{
          background: isDark ? [
            (variant === "hero"
              ? "linear-gradient(45deg, rgba(0,0,0,0.6), rgba(12,12,20,0.6), rgba(20,8,10,0.6))"
              : "linear-gradient(45deg, rgba(0,0,0,0.5), rgba(12,12,20,0.5), rgba(20,8,10,0.5))"),
            (variant === "hero"
              ? "linear-gradient(225deg, rgba(12,12,20,0.6), rgba(20,8,10,0.6), rgba(0,0,0,0.6))"
              : "linear-gradient(225deg, rgba(12,12,20,0.5), rgba(20,8,10,0.5), rgba(0,0,0,0.5))"),
            (variant === "hero"
              ? "linear-gradient(45deg, rgba(20,8,10,0.6), rgba(0,0,0,0.6), rgba(12,12,20,0.6))"
              : "linear-gradient(45deg, rgba(20,8,10,0.5), rgba(0,0,0,0.5), rgba(12,12,20,0.5))")
          ] : [
            (variant === "hero"
              ? "linear-gradient(45deg, rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.1), rgba(236, 72, 153, 0.1))"
              : "linear-gradient(45deg, rgba(59, 130, 246, 0.15), rgba(147, 51, 234, 0.15), rgba(236, 72, 153, 0.15))"),
            (variant === "hero"
              ? "linear-gradient(225deg, rgba(147, 51, 234, 0.1), rgba(236, 72, 153, 0.1), rgba(59, 130, 246, 0.1))"
              : "linear-gradient(225deg, rgba(147, 51, 234, 0.2), rgba(236, 72, 153, 0.2), rgba(59, 130, 246, 0.2))"),
            (variant === "hero"
              ? "linear-gradient(45deg, rgba(236, 72, 153, 0.1), rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.1))"
              : "linear-gradient(45deg, rgba(236, 72, 153, 0.15), rgba(59, 130, 246, 0.15), rgba(147, 51, 234, 0.15))")
          ]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      {/* Floating particles with deterministic positions to avoid SSR/client hydration mismatch */}
      {(() => {
        const count = variant === "hero" ? 20 : 12

        // Small seeded PRNG (mulberry32) to produce deterministic values across server and client
        const mulberry32 = (a: number) => () => {
          let t = a >>> 0
          t += 0x6D2B79F5
          t = Math.imul(t ^ (t >>> 15), t | 1)
          t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
          return ((t ^ (t >>> 14)) >>> 0) / 4294967296
        }

        const particles = Array.from({ length: count }).map((_, i) => {
          const rnd1 = mulberry32(123456 + i)()
          const rnd2 = mulberry32(654321 + i)()
          // Pre-format strings so server/client share identical markup
          return {
            left: `${(rnd1 * 100).toFixed(12)}%`,
            top: `${(rnd2 * 100).toFixed(12)}%`,
            duration: 4 + Math.floor(((rnd1 + rnd2) % 1) * 2),
            delay: Number(((rnd2 * 3).toFixed(6)))
          }
        })

        return particles.map((p, i) => (
          <motion.div
            key={i}
            className={`absolute w-1 h-1 rounded-full ${isDark ? 'bg-white/20' : 'bg-white/50'}`}
            style={{ left: p.left, top: p.top }}
            animate={{
              y: [-20, 20, -20],
              x: [-10, 10, -10],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: "easeInOut",
            }}
          />
        ))
      })()}
    </div>
  );
}

function ContactButton() {
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const contactCursors = useMemo(() => {
    const cursors: Array<{
      id: string;
      finalX: number;
      finalY: number;
      delay: number;
      rotation: number;
      isTrail: boolean;
      opacity: number;
      scale: number;
    }> = [];
    const circles = [80, 110, 140];
    const cursorsPerCircle = [6, 8, 10];

    circles.forEach((radius, circleIndex) => {
      const count = cursorsPerCircle[circleIndex];
      for (let i = 0; i < count; i++) {
        const angle = (i / count) * 2 * Math.PI;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        const rotationOutward = Math.atan2(y, x) * (180 / Math.PI);

        cursors.push({
          id: `contact-cursor-${circleIndex}-${i}`,
          finalX: x,
          finalY: y,
          delay: circleIndex * 0.01 + i * 0.002,
          rotation: rotationOutward,
          isTrail: false,
          opacity: 1,
          scale: 1
        });

        for (let t = 1; t <= 2; t++) {
          cursors.push({
            id: `contact-cursor-${circleIndex}-${i}-trail-${t}`,
            finalX: x,
            finalY: y,
            delay: circleIndex * 0.01 + i * 0.002 + t * 0.008,
            rotation: rotationOutward,
            isTrail: true,
            opacity: 1 - (t * 0.3),
            scale: 1 - (t * 0.2)
          });
        }
      }
    });
    return cursors;
  }, []);

  return (
    <motion.div
      className="relative backdrop-blur-lg bg-white/8 border border-white/15 shadow-xl shadow-black/30 px-8 py-4 rounded-[32px] transition-all duration-300 hover:bg-white/12 hover:border-white/30 hover:shadow-2xl hover:shadow-black/40 group overflow-visible cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setIsActive(!isActive)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Contact button cursors */}
      <motion.div
        className="absolute pointer-events-none will-change-transform z-10"
        style={{
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)'
        }}
        animate={{
          rotate: 360
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        {(isHovered || isActive) && contactCursors.map((cursor) => (
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
            transition={{
              duration: 0.08,
              delay: cursor.delay,
              ease: "easeOut",
              type: "spring",
              damping: 25,
              stiffness: 400
            }}
          >
            <MousePointer
              className="w-4 h-4 text-white drop-shadow-lg"
              style={{
                filter: 'drop-shadow(0 0 6px rgba(255,255,255,0.8))',
                opacity: cursor.opacity,
                transform: `scale(${cursor.scale}) rotate(${cursor.rotation}deg)`
              }}
            />
          </motion.div>
        ))}
      </motion.div>

      <div className="flex items-center gap-3 text-white font-semibold relative z-10">
        <Mail className="w-5 h-5" />
        <span>Get In Touch</span>
      </div>
    </motion.div>
  );
}

export default function Home() {
  const { variant, mounted } = useSiteVariant()

  const DarkHero = dynamic(() => import('@/components/variants/dark/hero-section').then(m => m.HeroSection), { ssr: false })
  const DarkProjects = dynamic(() => import('@/components/variants/dark/projects-section').then(m => m.ProjectsSection), { ssr: false })
  const DarkFooter = dynamic(() => import('@/components/variants/dark/footer').then(m => m.Footer), { ssr: false })
  const DarkAbout = dynamic(() => import('@/components/variants/dark/about-section').then(m => m.AboutSection), { ssr: false })

  return (
    <div className="min-h-screen relative">
      {/* Single animated background spanning entire site */}
      <div className="fixed inset-0 z-0" key={variant}>
        <AnimatedBackground variant="hero" isDark={variant === 'dark'} />
      </div>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="relative z-20">
          {!mounted ? null : variant === 'dark' ? <DarkHero /> : <PortfolioHero />}
        </div>
      </section>

      {/* Projects Section with seamless background transition */}
      {mounted && variant === 'dark' ? (
        <DarkProjects />
      ) : (
        <section className="relative py-20 px-8 min-h-screen flex items-center">
          <div className="absolute inset-0 z-0" key={variant}>
            <AnimatedBackground variant="default" isDark={variant === 'dark'} />
          </div>
          <div className="relative z-10 max-w-6xl mx-auto w-full">
            <motion.h2
              className="text-4xl md:text-5xl font-bold text-center mb-12 font-['Inter',_sans-serif] tracking-[-1px]"
              style={{
                color: '#ffffff',
                textShadow: '0 0 30px rgba(255,255,255,0.8), 0 0 60px rgba(255,255,255,0.6), 2px 2px 4px rgba(0,0,0,0.8)',
                fontFeatureSettings: '"kern" 1',
                WebkitFontSmoothing: 'antialiased',
                MozOsxFontSmoothing: 'grayscale'
              }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              viewport={{ once: true }}
            >
              Featured Projects
            </motion.h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <GlassmorphismCard key={i} delay={0.1 * i} className="hover:scale-105">
                  <div className="aspect-video bg-gradient-to-br from-blue-100/20 to-purple-100/20 rounded-2xl mb-4 flex items-center justify-center border border-white/20">
                    <Code className="w-12 h-12 text-white/80" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2" style={{
                    textShadow: '0 0 10px rgba(255,255,255,0.8), 1px 1px 2px rgba(0,0,0,0.7)'
                  }}>Project {i}</h3>
                  <p className="text-white/80 text-sm leading-relaxed mb-4" style={{
                    textShadow: '0 0 8px rgba(255,255,255,0.6), 1px 1px 1px rgba(0,0,0,0.5)'
                  }}>
                    A modern web application built with React and TypeScript, featuring responsive design and smooth animations.
                  </p>
                  <InteractiveButton className="w-full justify-center bg-white/10 hover:bg-white/20">
                    View Project <ArrowRight className="w-4 h-4 ml-2" />
                  </InteractiveButton>
                </GlassmorphismCard>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Skills Section with seamless background transition */}
      <section className="relative py-20 px-8 min-h-screen flex items-center">
        <div className="absolute inset-0 z-0" key={variant}>
          <AnimatedBackground variant="default" isDark={variant === 'dark'} />
        </div>
        <div className="relative z-10 max-w-6xl mx-auto w-full">
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-center mb-12 font-['Inter',_sans-serif] tracking-[-1px]"
            style={{
              color: '#ffffff',
              textShadow: '0 0 30px rgba(255,255,255,0.8), 0 0 60px rgba(255,255,255,0.6), 2px 2px 4px rgba(0,0,0,0.8)',
              fontFeatureSettings: '"kern" 1',
              WebkitFontSmoothing: 'antialiased',
              MozOsxFontSmoothing: 'grayscale'
            }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            viewport={{ once: true }}
          >
            Skills & Technologies
          </motion.h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[ 
              { name: "React", icon: "⚛️" },
              { name: "TypeScript", icon: "🔷" },
              { name: "Node.js", icon: "🟢" },
              { name: "Python", icon: "🐍" },
              { name: "Next.js", icon: "▲" },
              { name: "Tailwind", icon: "🎨" },
              { name: "PostgreSQL", icon: "🐘" },
              { name: "AWS", icon: "☁️" }
            ].map((skill, i) => (
              <GlassmorphismCard key={skill.name} delay={0.1 * i} className="text-center hover:scale-105">
                <div className="text-4xl mb-3">{skill.icon}</div>
                <h4 className="font-semibold text-lg" style={{
                  color: '#ffffff',
                  textShadow: '0 0 10px rgba(255,255,255,0.8), 1px 1px 2px rgba(0,0,0,0.7)'
                }}>{skill.name}</h4>
              </GlassmorphismCard>
            ))}
          </div>
        </div>
      </section>

      {/* About Section - swap to dark variant when selected */}
      {mounted && variant === 'dark' ? (
        <DarkAbout />
      ) : (
        <section id="about" className="relative py-20 overflow-hidden">
          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-2xl p-10 glassmorphism">
              <h2 className="text-3xl font-bold mb-4">About me</h2>
              <p className="text-black/70">I build delightful web experiences focused on performance, accessibility, and maintainability.</p>
            </div>
          </div>
        </section>
      )}

      {/* Experience Section with seamless background transition */}
      <section className="relative py-20 px-8 min-h-screen flex items-center">
        <div className="absolute inset-0 z-0" key={variant}>
          <AnimatedBackground variant="default" isDark={variant === 'dark'} />
        </div>
        <div className="relative z-10 max-w-6xl mx-auto w-full">
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-center mb-12 font-['Inter',_sans-serif] tracking-[-1px]"
            style={{
              color: '#ffffff',
              textShadow: '0 0 30px rgba(255,255,255,0.8), 0 0 60px rgba(255,255,255,0.6), 2px 2px 4px rgba(0,0,0,0.8)',
              fontFeatureSettings: '"kern" 1',
              WebkitFontSmoothing: 'antialiased',
              MozOsxFontSmoothing: 'grayscale'
            }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            viewport={{ once: true }}
          >
            Experience
          </motion.h2>
          <div className="space-y-8">
            {[1, 2, 3].map((i) => (
              <GlassmorphismCard key={i} className="flex items-center gap-6 hover:scale-105">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-100/20 to-purple-100/20 rounded-2xl flex items-center justify-center flex-shrink-0 border border-white/20">
                  <Briefcase className="w-8 h-8 text-white/80" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold mb-1" style={{
                    color: '#ffffff',
                    textShadow: '0 0 15px rgba(255,255,255,0.8), 1px 1px 3px rgba(0,0,0,0.7)'
                  }}>Software Developer</h3>
                  <p className="mb-2 text-lg" style={{
                    color: 'rgba(255,255,255,0.8)',
                    textShadow: '0 0 10px rgba(255,255,255,0.6), 1px 1px 2px rgba(0,0,0,0.5)'
                  }}>Company Name • 2023 - Present</p>
                  <p className="text-base leading-relaxed" style={{
                    color: 'rgba(255,255,255,0.7)',
                    textShadow: '0 0 8px rgba(255,255,255,0.5), 1px 1px 1px rgba(0,0,0,0.4)'
                  }}>
                    Developed and maintained web applications using modern technologies, collaborating with cross-functional teams to deliver high-quality solutions.
                  </p>
                </div>
              </GlassmorphismCard>
            ))}
          </div>

          {/* Contact Section */}
          <motion.div
            className="text-center mt-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold mb-8" style={{
              color: '#ffffff',
              textShadow: '0 0 20px rgba(255,255,255,0.8), 2px 2px 4px rgba(0,0,0,0.8)'
            }}>Let's Work Together</h3>
            <div className="flex justify-center">
              <ContactButton />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer with seamless background transition */}
      {mounted && variant === 'dark' ? (
        <DarkFooter />
      ) : (
        <footer className="relative py-12 px-8">
          <div className="absolute inset-0 z-0">
            <AnimatedBackground variant="default" />
          </div>
          <div className="relative z-10 max-w-6xl mx-auto text-center">
            <div className="flex items-center justify-center gap-6 mb-6">
              <InteractiveButton className="h-12 w-12 p-0 bg-white/8 hover:bg-white/12">
                <Github className="w-5 h-5" />
              </InteractiveButton>
              <InteractiveButton className="h-12 w-12 p-0 bg-white/8 hover:bg-white/12">
                <Linkedin className="w-5 h-5" />
              </InteractiveButton>
              <InteractiveButton className="h-12 w-12 p-0 bg-white/8 hover:bg-white/12">
                <Mail className="w-5 h-5" />
              </InteractiveButton>
            </div>
            <p className="font-['Inter',_sans-serif] tracking-[-0.7px] text-lg" style={{
              color: 'rgba(255,255,255,0.8)',
              textShadow: '0 0 10px rgba(255,255,255,0.6), 1px 1px 2px rgba(0,0,0,0.5)'
            }}>
              © 2024 Gabriel Renostro. Built with React & Motion.
            </p>
          </div>
        </footer>
      )}
    </div>
  );
}
