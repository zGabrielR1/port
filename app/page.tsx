"use client"

import { motion } from "motion/react";
import { MousePointer, Code, Briefcase, Mail, Github, Linkedin, ArrowRight } from "lucide-react";
import { useState, useMemo } from "react";

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
      {/* Background image from Button effect project */}
      <div className="absolute bg-center bg-cover bg-no-repeat inset-0" style={{
        backgroundImage: `url('/555c0dbdf8e4d07301d5ff5c75b2888e8dd02850.png')`,
      }} />

      {/* Main portfolio button with exact same styling as Button effect project */}
      <motion.div
        className="absolute backdrop-blur-md bg-white/20 border border-white/30 shadow-xl shadow-black/20 box-border content-stretch flex flex-col gap-4 items-center justify-center px-8 py-6 rounded-[38px] transition-all duration-300 hover:bg-white/30 hover:border-white/50 hover:shadow-2xl hover:shadow-black/30 hover:scale-105 active:scale-95 group overflow-visible z-20 will-change-transform cursor-pointer"
        style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setIsActive(!isActive)}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/5 to-transparent rounded-[38px]" />

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

        {/* Flying Cursors - Visual richness with performance optimizations */}
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
                className="w-5 h-5 text-white drop-shadow-lg"
                style={{
                  filter: 'drop-shadow(0 0 6px rgba(255,255,255,0.6))',
                  opacity: cursor.opacity,
                  transform: `scale(${cursor.scale}) rotate(${cursor.rotation}deg)`
                }}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Content with Gabriel's information */}
        <div className="flex flex-col font-['Inter',_sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#ffffff] text-center text-nowrap tracking-[-0.7px] z-10 drop-shadow-lg">
          <p className="block leading-[1.4] whitespace-pre text-[24px] font-medium mb-1">
            Hi, I'm Gabriel
          </p>
          <p className="block leading-[1.4] whitespace-pre text-[16px] opacity-90">
            Full-Stack Developer
          </p>
          <p className="block leading-[1.4] whitespace-pre text-[14px] opacity-75 mt-2 max-w-[280px]">
            Creating exceptional digital experiences
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex gap-3 mt-4">
          <motion.button
            className="backdrop-blur-md bg-white/20 border border-white/30 px-6 py-2 rounded-[24px] text-sm font-medium text-white hover:bg-white/30 hover:border-white/50 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View Portfolio
          </motion.button>
          <motion.button
            className="backdrop-blur-md bg-white/20 border border-white/30 px-6 py-2 rounded-[24px] text-sm font-medium text-white hover:bg-white/30 hover:border-white/50 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get In Touch
          </motion.button>
        </div>
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

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <PortfolioHero />

      <PortfolioSection title="Featured Projects" delay={0.2}>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <GlassmorphismCard key={i} delay={0.1 * i}>
              <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl mb-4 flex items-center justify-center">
                <Code className="w-12 h-12 text-black/60" />
              </div>
              <h3 className="text-xl font-semibold text-black/90 mb-2">Project {i}</h3>
              <p className="text-black/70 text-sm leading-relaxed mb-4">
                A modern web application built with React and TypeScript, featuring responsive design and smooth animations.
              </p>
              <InteractiveButton className="w-full justify-center">
                View Project <ArrowRight className="w-4 h-4 ml-2" />
              </InteractiveButton>
            </GlassmorphismCard>
          ))}
        </div>
      </PortfolioSection>

      <PortfolioSection title="Skills & Technologies" delay={0.4}>
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
            <GlassmorphismCard key={skill.name} delay={0.1 * i} className="text-center">
              <div className="text-3xl mb-2">{skill.icon}</div>
              <h4 className="font-semibold text-black/90">{skill.name}</h4>
            </GlassmorphismCard>
          ))}
        </div>
      </PortfolioSection>

      <PortfolioSection title="Experience" delay={0.6}>
        <div className="space-y-8">
          {[1, 2, 3].map((i) => (
            <GlassmorphismCard key={i} className="flex items-center gap-6">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                <Briefcase className="w-6 h-6 text-black/60" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-black/90 mb-1">Software Developer</h3>
                <p className="text-black/70 mb-2">Company Name • 2023 - Present</p>
                <p className="text-black/60 text-sm leading-relaxed">
                  Developed and maintained web applications using modern technologies, collaborating with cross-functional teams to deliver high-quality solutions.
                </p>
              </div>
            </GlassmorphismCard>
          ))}
        </div>
      </PortfolioSection>

      {/* Footer */}
      <footer className="py-12 px-8 border-t border-white/30 bg-white/20 backdrop-blur-md">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center gap-6 mb-6">
            <InteractiveButton className="h-12 w-12 p-0">
              <Github className="w-5 h-5" />
            </InteractiveButton>
            <InteractiveButton className="h-12 w-12 p-0">
              <Linkedin className="w-5 h-5" />
            </InteractiveButton>
            <InteractiveButton className="h-12 w-12 p-0">
              <Mail className="w-5 h-5" />
            </InteractiveButton>
          </div>
          <p className="text-black/60 font-['Inter',_sans-serif] tracking-[-0.7px]">
            © 2024 Gabriel Renostro. Built with React & Motion.
          </p>
        </div>
      </footer>
    </div>
  );
}
