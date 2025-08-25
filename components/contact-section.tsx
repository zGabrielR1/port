"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin, Send } from "lucide-react"

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [formErrors, setFormErrors] = useState<{[key: string]: string}>({})

  const validateForm = () => {
    const errors: {[key: string]: string} = {}
    
    if (!formData.name.trim()) errors.name = "Name is required"
    if (!formData.email.trim()) {
      errors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Please enter a valid email"
    }
    if (!formData.subject.trim()) errors.subject = "Subject is required"
    if (!formData.message.trim()) errors.message = "Message is required"
    
    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setIsSubmitting(true)
    setSubmitStatus('idle')
    
    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 1500))
      setSubmitStatus('success')
      setFormData({ name: "", email: "", subject: "", message: "" })
      setTimeout(() => setSubmitStatus('idle'), 3000)
    } catch (error) {
      setSubmitStatus('error')
      setTimeout(() => setSubmitStatus('idle'), 3000)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
    
    // Clear error for this field when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  return (
    <section id="contact" className="py-20 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-6 py-3 rounded-full glass-subtle text-primary text-sm font-medium mb-6 border-0 hover:glass transition-all duration-500 animate-glass-fade">
            📬 Let's Connect
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 relative">
            Get In Touch
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-primary to-accent rounded-full opacity-60" />
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto hover:text-foreground/90 transition-colors duration-300">
            Ready to start your next project? Let's discuss how we can work together to bring your ideas to life and create something amazing.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-6">Let's Connect</h3>
              <p className="text-muted-foreground mb-8">
                I'm always interested in new opportunities and exciting projects. Whether you have a question or just
                want to say hi, feel free to reach out!
              </p>
            </div>

            <div className="space-y-6">
              <div className="group flex items-center gap-4 p-4 rounded-xl glass-subtle hover:glass transition-all duration-500 hover:scale-105 cursor-pointer animate-glass-scale">
                <div className="w-12 h-12 glass-subtle rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                  <Mail className="h-6 w-6 text-primary group-hover:text-primary/90 transition-colors duration-300" />
                </div>
                <div>
                  <h4 className="font-semibold group-hover:text-primary transition-colors duration-300">Email</h4>
                  <p className="text-muted-foreground group-hover:text-foreground/80 transition-colors duration-300">gabriel.renostro@email.com</p>
                </div>
              </div>

              <div className="group flex items-center gap-4 p-4 rounded-xl glass-subtle hover:glass transition-all duration-500 hover:scale-105 cursor-pointer animate-glass-scale" style={{ animationDelay: '0.1s' }}>
                <div className="w-12 h-12 glass-subtle rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:-rotate-6 transition-all duration-300">
                  <Phone className="h-6 w-6 text-accent group-hover:text-accent/90 transition-colors duration-300" />
                </div>
                <div>
                  <h4 className="font-semibold group-hover:text-accent transition-colors duration-300">Phone</h4>
                  <p className="text-muted-foreground group-hover:text-foreground/80 transition-colors duration-300">+55 (11) 99999-9999</p>
                </div>
              </div>

              <div className="group flex items-center gap-4 p-4 rounded-xl glass-subtle hover:glass transition-all duration-500 hover:scale-105 cursor-pointer animate-glass-scale" style={{ animationDelay: '0.2s' }}>
                <div className="w-12 h-12 glass-subtle rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                  <MapPin className="h-6 w-6 text-primary group-hover:text-primary/90 transition-colors duration-300" />
                </div>
                <div>
                  <h4 className="font-semibold group-hover:text-primary transition-colors duration-300">Location</h4>
                  <p className="text-muted-foreground group-hover:text-foreground/80 transition-colors duration-300">São Paulo, Brazil</p>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <h4 className="font-semibold mb-4">Follow Me</h4>
              <div className="flex gap-4">
                <Button variant="outline" size="icon" className="hover:bg-gradient-to-r hover:from-primary/10 hover:to-primary/5 hover:border-primary/30 hover:scale-110 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 group">
                  <svg className="h-4 w-4 group-hover:text-primary transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                  </svg>
                </Button>
                <Button variant="outline" size="icon" className="hover:bg-gradient-to-r hover:from-accent/10 hover:to-accent/5 hover:border-accent/30 hover:scale-110 hover:shadow-lg hover:shadow-accent/20 transition-all duration-300 group">
                  <svg className="h-4 w-4 group-hover:text-accent transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </Button>
                <Button variant="outline" size="icon" className="hover:bg-gradient-to-r hover:from-primary/10 hover:to-primary/5 hover:border-primary/30 hover:scale-110 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 group">
                  <svg className="h-4 w-4 group-hover:text-primary transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </Button>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <Card className="group p-6 hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 hover:-translate-y-2 border-0 glass-card animate-glass-scale" style={{ animationDelay: '0.3s' }}>
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-lg" />
            <CardHeader className="p-0 mb-6 relative z-10">
              <CardTitle className="text-2xl group-hover:text-primary transition-colors duration-300">Send Message</CardTitle>
            </CardHeader>
            <CardContent className="p-0 relative z-10">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Name
                    </label>
                    <Input 
                      id="name" 
                      name="name" 
                      value={formData.name} 
                      onChange={handleChange} 
                      className={`transition-all duration-300 ${formErrors.name ? 'border-red-500 focus:ring-red-500' : 'focus:ring-primary'}`}
                      required 
                    />
                    {formErrors.name && (
                      <p className="text-red-500 text-xs mt-1 animate-fade-in">{formErrors.name}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Email
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`transition-all duration-300 ${formErrors.email ? 'border-red-500 focus:ring-red-500' : 'focus:ring-primary'}`}
                      required
                    />
                    {formErrors.email && (
                      <p className="text-red-500 text-xs mt-1 animate-fade-in">{formErrors.email}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-2">
                    Subject
                  </label>
                  <Input 
                    id="subject" 
                    name="subject" 
                    value={formData.subject} 
                    onChange={handleChange} 
                    className={`transition-all duration-300 ${formErrors.subject ? 'border-red-500 focus:ring-red-500' : 'focus:ring-primary'}`}
                    required 
                  />
                  {formErrors.subject && (
                    <p className="text-red-500 text-xs mt-1 animate-fade-in">{formErrors.subject}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className={`transition-all duration-300 ${formErrors.message ? 'border-red-500 focus:ring-red-500' : 'focus:ring-primary'}`}
                    required
                  />
                  {formErrors.message && (
                    <p className="text-red-500 text-xs mt-1 animate-fade-in">{formErrors.message}</p>
                  )}
                </div>

                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className={`w-full font-medium text-white transition-all duration-300 ${
                    submitStatus === 'success' 
                      ? 'bg-green-500 hover:bg-green-600' 
                      : submitStatus === 'error'
                      ? 'bg-red-500 hover:bg-red-600'
                      : 'bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70'
                  } hover:scale-105 hover:shadow-lg hover:shadow-primary/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      Sending...
                    </>
                  ) : submitStatus === 'success' ? (
                    <>
                      <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Message Sent!
                    </>
                  ) : submitStatus === 'error' ? (
                    <>
                      <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      Try Again
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
