"use client"

import { useState, useEffect } from "react"
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

export function TestimonialsSection() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

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
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [testimonials.length])

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
    <section id="testimonials" className="section-padding bg-muted/5">
      <div className="max-w-6xl mx-auto container-padding">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <Quote className="mr-2 h-4 w-4" />
            Client Testimonials
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            What Clients Say
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Don't just take my word for it. Here's what some of my amazing clients have to say about our collaboration.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Main Testimonial Display */}
          <div className="modern-card p-8 mb-8">
            <div className="flex flex-col items-center text-center">
              <Quote className="h-10 w-10 text-primary/30 mb-4" />
              <blockquote className="text-lg text-foreground mb-6 max-w-2xl">
                "{testimonials[currentTestimonial].content}"
              </blockquote>
              <div className="flex justify-center mb-4">
                {renderStars(testimonials[currentTestimonial].rating)}
              </div>
              
              <div className="flex items-center gap-4">
                <Avatar className="h-14 w-14 border-2 border-primary/20">
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
          </div>

          {/* Testimonial Navigation Dots */}
          <div className="flex justify-center gap-2 mb-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  index === currentTestimonial
                    ? 'bg-primary scale-125'
                    : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                }`}
                aria-label={`View testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Statistics Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 pt-8 border-t border-muted-foreground/10">
          {[
            { value: "50+", label: "Projects Completed", color: "primary" },
            { value: "30+", label: "Happy Clients", color: "accent" },
            { value: "5⭐", label: "Average Rating", color: "primary" },
            { value: "3+", label: "Years Experience", color: "accent" }
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className={`text-2xl font-bold text-${stat.color} mb-1`}>
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}