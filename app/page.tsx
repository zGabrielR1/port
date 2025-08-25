import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { SkillsSection } from "@/components/skills-section"
import { ProjectsSection } from "@/components/projects-section"
import { ExperienceSection } from "@/components/experience-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { ContactSection } from "@/components/contact-section"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Header />
      <main className="relative">
        {/* Main content wrapper with improved spacing */}
        <div className="relative">
          <HeroSection />
          
          {/* Content sections with consistent spacing */}
          <div className="relative space-y-0">
            <AboutSection />
            <SkillsSection />
            <ProjectsSection />
            <ExperienceSection />
            <TestimonialsSection />
            <ContactSection />
          </div>
        </div>
        
        {/* Scroll progress indicator */}
        <div className="fixed top-0 left-0 w-full h-1 bg-background/20 z-50">
          <div 
            className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-300"
            style={{
              width: `var(--scroll-progress, 0%)`,
              transformOrigin: 'left'
            }}
          />
        </div>
      </main>
      <Footer />
      
      {/* Enhanced background elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        {/* Ambient lighting effects */}
        <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute top-3/4 left-1/3 w-64 h-64 bg-primary/3 rounded-full blur-2xl" />
        
        {/* Subtle grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05]"
          style={{
            backgroundImage: `
              linear-gradient(rgb(79 156 249 / 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgb(79 156 249 / 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        />
      </div>
    </div>
  )
}
