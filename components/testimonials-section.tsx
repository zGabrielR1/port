"use client"

import { useState, useEffect } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, Quote, Users } from "lucide-react"
import { ShaderBackground } from "@/components/ui/shader-background"

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
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

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
        className={`h-4 w-4 transition-colors duration-300 ${
          index < rating ? 'text-yellow-400 fill-current' : 'text-white/30'
        }`}
      />
    ))
  }

  return (
    <section id="testimonials" className="section-padding bg-black relative overflow-hidden">
      {/* Shader Background */}
      <ShaderBackground
        variant="section"
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/70 to-black/90" />
      
      <div className="max-w-6xl mx-auto container-padding relative z-10">
        <div className="text-center mb-16">
          <div 
            className={`inline-flex items-center px-6 py-3 rounded-full glassmorphism text-white text-sm font-medium mb-4 transition-all duration-700 ${
              visible ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
          >
            <Users className="mr-2 h-4 w-4" />
            Client Testimonials
          </div>
          <h2 
            className={`text-3xl sm:text-4xl font-bold text-white mb-4 transition-all duration-700 delay-200 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            What Clients Say
          </h2>
          <p 
            className={`text-lg text-white/80 max-w-2xl mx-auto transition-all duration-700 delay-300 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            Don't just take my word for it. Here's what some of my amazing clients have to say about our collaboration.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Main Testimonial Display */}
          <div 
            className={`glassmorphism p-8 mb-8 rounded-2xl transition-all duration-700 delay-400 hover:scale-102 group ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="flex flex-col items-center text-center">
              <Quote className="h-10 w-10 text-blue-400/60 mb-4 group-hover:text-blue-400 transition-colors duration-300" />
              <blockquote className="text-lg text-white/90 mb-6 max-w-2xl leading-relaxed">
                "{testimonials[currentTestimonial].content}"
              </blockquote>
              <div className="flex justify-center mb-4">
                {renderStars(testimonials[currentTestimonial].rating)}
              </div>
              
              <div className="flex items-center gap-4">
                <Avatar className="h-14 w-14 border-2 border-blue-400/30 group-hover:border-blue-400/60 transition-all duration-300">
                  <AvatarImage 
                    src={testimonials[currentTestimonial].avatar} 
                    alt={testimonials[currentTestimonial].name}
                  />
                  <AvatarFallback className="bg-blue-400/20 text-blue-400 font-semibold backdrop-blur-sm">
                    {testimonials[currentTestimonial].name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                
                <div className="text-left">
                  <div className="font-semibold text-white group-hover:text-blue-400 transition-colors duration-300">
                    {testimonials[currentTestimonial].name}
                  </div>
                  <div className="text-sm text-white/70">
                    {testimonials[currentTestimonial].role}
                  </div>
                  <div className="text-sm text-blue-400 font-medium">
                    {testimonials[currentTestimonial].company}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Testimonial Navigation Dots */}
          <div 
            className={`flex justify-center gap-2 mb-8 transition-all duration-700 delay-500 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 hover:scale-125 ${
                  index === currentTestimonial
                    ? 'bg-blue-400 scale-125 shadow-lg shadow-blue-400/30'
                    : 'bg-white/30 hover:bg-white/50'
                }`}
                aria-label={`View testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Statistics Section */}
        <div 
          className={`grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 pt-8 border-t border-white/10 transition-all duration-700 delay-600 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {[
            { value: "50+", label: "Projects Completed", color: "blue" },
            { value: "30+", label: "Happy Clients", color: "purple" },
            { value: "5⭐", label: "Average Rating", color: "blue" },
            { value: "3+", label: "Years Experience", color: "purple" }
          ].map((stat, index) => (
            <div 
              key={index} 
              className="text-center glassmorphism p-4 rounded-xl hover:scale-105 transition-all duration-300 group"
              style={{ animationDelay: `${700 + index * 100}ms` }}
            >
              <div className={`text-2xl font-bold text-${stat.color}-400 mb-1 group-hover:text-white transition-colors duration-300`}>
                {stat.value}
              </div>
              <div className="text-sm text-white/70 group-hover:text-white/90 transition-colors duration-300">
                {stat.label}
              </div>
              <div className={`w-8 h-0.5 bg-gradient-to-r from-${stat.color}-400 to-purple-400 rounded-full mx-auto mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}