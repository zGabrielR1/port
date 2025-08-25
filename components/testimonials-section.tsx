"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, Quote } from "lucide-react"

interface Testimonial {
  id: number
  name: string
  role: string
  company: string
  avatar: string
  content: string
  rating: number
}

const TestimonialsBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-accent/4 rounded-full blur-3xl animate-float-reverse" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-primary/3 to-accent/3 rounded-full blur-3xl animate-pulse-gentle" />
    </div>
  )
}

export function TestimonialsSection() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Sarah Chen",
      role: "Product Manager",
      company: "TechCorp",
      avatar: "/placeholder.svg?height=60&width=60",
      content: "Gabriel delivered an exceptional web application that exceeded our expectations. His attention to detail and technical expertise are outstanding. The project was completed on time and within budget.",
      rating: 5
    },
    {
      id: 2,
      name: "Marcus Rodriguez",
      role: "CTO",
      company: "StartupXYZ",
      avatar: "/placeholder.svg?height=60&width=60",
      content: "Working with Gabriel was a fantastic experience. He transformed our complex requirements into a beautiful, functional platform. His communication throughout the project was excellent.",
      rating: 5
    },
    {
      id: 3,
      name: "Emily Watson",
      role: "Design Director",
      company: "Creative Studio",
      avatar: "/placeholder.svg?height=60&width=60",
      content: "Gabriel has an incredible ability to bring designs to life with pixel-perfect precision. His understanding of modern web technologies and user experience is impressive.",
      rating: 5
    },
    {
      id: 4,
      name: "David Kim",
      role: "Founder",
      company: "E-commerce Plus",
      avatar: "/placeholder.svg?height=60&width=60",
      content: "The e-commerce platform Gabriel built for us has significantly increased our sales. His expertise in full-stack development and performance optimization is remarkable.",
      rating: 5
    },
    {
      id: 5,
      name: "Lisa Thompson",
      role: "Marketing Lead",
      company: "Growth Agency",
      avatar: "/placeholder.svg?height=60&width=60",
      content: "Gabriel created a stunning portfolio website that perfectly represents our brand. The animations and interactions he implemented are smooth and engaging.",
      rating: 5
    }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true)
      setTimeout(() => {
        setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
        setIsAnimating(false)
      }, 300)
    }, 5000)

    return () => clearInterval(interval)
  }, [testimonials.length])

  const handleTestimonialChange = (index: number) => {
    if (index !== currentTestimonial && !isAnimating) {
      setIsAnimating(true)
      setTimeout(() => {
        setCurrentTestimonial(index)
        setIsAnimating(false)
      }, 300)
    }
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 ${
          index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ))
  }

  return (
    <section id="testimonials" className="section-padding bg-muted/5 relative overflow-hidden">
      <TestimonialsBackground />
      
      <div className="max-w-6xl mx-auto container-padding relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-6 py-3 rounded-full glass-subtle text-primary text-sm font-medium mb-6 border-0 animate-fade-in hover-glow">
            <Quote className="mr-2 h-4 w-4" />
            Client Testimonials
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6 text-gradient">
            What Clients Say
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Don't just take my word for it. Here's what some of my amazing clients have to say about our collaboration.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Main Testimonial Display */}
          <div className="relative mb-12">
            <Card className={`glass-card border-0 p-8 transition-all duration-500 ${
              isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
            }`}>
              <CardContent className="p-0">
                <div className="flex flex-col items-center text-center">
                  <div className="mb-6">
                    <Quote className="h-12 w-12 text-primary/30 mx-auto mb-4" />
                    <blockquote className="text-lg text-foreground leading-relaxed mb-6 max-w-2xl">
                      "{testimonials[currentTestimonial].content}"
                    </blockquote>
                    <div className="flex justify-center mb-4">
                      {renderStars(testimonials[currentTestimonial].rating)}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16 border-2 border-primary/20">
                      <AvatarImage 
                        src={testimonials[currentTestimonial].avatar} 
                        alt={testimonials[currentTestimonial].name}
                      />
                      <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                        {testimonials[currentTestimonial].name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="text-left">
                      <div className="font-semibold text-foreground">
                        {testimonials[currentTestimonial].name}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {testimonials[currentTestimonial].role}
                      </div>
                      <div className="text-sm text-primary font-medium">
                        {testimonials[currentTestimonial].company}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Testimonial Navigation Dots */}
          <div className="flex justify-center gap-3 mb-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => handleTestimonialChange(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentTestimonial
                    ? 'bg-primary scale-125 shadow-lg shadow-primary/50'
                    : 'bg-muted-foreground/30 hover:bg-muted-foreground/50 hover:scale-110'
                }`}
                aria-label={`View testimonial ${index + 1}`}
              />
            ))}
          </div>

          {/* Testimonial Avatars Row */}
          <div className="flex justify-center gap-4 flex-wrap">
            {testimonials.map((testimonial, index) => (
              <button
                key={testimonial.id}
                onClick={() => handleTestimonialChange(index)}
                className={`group transition-all duration-300 ${
                  index === currentTestimonial 
                    ? 'scale-110' 
                    : 'scale-100 hover:scale-105 opacity-70 hover:opacity-100'
                }`}
              >
                <Avatar className={`h-12 w-12 border-2 transition-all duration-300 ${
                  index === currentTestimonial 
                    ? 'border-primary shadow-lg shadow-primary/30' 
                    : 'border-muted-foreground/20 group-hover:border-primary/50'
                }`}>
                  <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                  <AvatarFallback className="bg-primary/10 text-primary font-semibold text-xs">
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
              </button>
            ))}
          </div>
        </div>

        {/* Statistics Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-16 border-t border-muted-foreground/10">
          <div className="text-center group">
            <div className="text-3xl font-bold text-primary mb-2 group-hover:scale-110 transition-transform duration-300">
              50+
            </div>
            <div className="text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">
              Projects Completed
            </div>
          </div>
          <div className="text-center group">
            <div className="text-3xl font-bold text-accent mb-2 group-hover:scale-110 transition-transform duration-300">
              30+
            </div>
            <div className="text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">
              Happy Clients
            </div>
          </div>
          <div className="text-center group">
            <div className="text-3xl font-bold text-primary mb-2 group-hover:scale-110 transition-transform duration-300">
              5⭐
            </div>
            <div className="text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">
              Average Rating
            </div>
          </div>
          <div className="text-center group">
            <div className="text-3xl font-bold text-accent mb-2 group-hover:scale-110 transition-transform duration-300">
              3+
            </div>
            <div className="text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">
              Years Experience
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}