"use client"

import { useState, useEffect, useRef } from \"react\"

// Performance utilities for optimized animations and rendering
export const useIntersectionObserver = (options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false)
  const [hasIntersected, setHasIntersected] = useState(false)
  const targetRef = useRef(null)

  useEffect(() => {
    const target = targetRef.current
    if (!target) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting)
        if (entry.isIntersecting && !hasIntersected) {
          setHasIntersected(true)
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
        ...options
      }
    )

    observer.observe(target)

    return () => {
      observer.unobserve(target)
    }
  }, [hasIntersected, options])

  return { targetRef, isIntersecting, hasIntersected }
}

// Performance-optimized animation component
export const OptimizedAnimation = ({ 
  children, 
  animationClass = \"animate-fade-in\", 
  delay = 0,
  threshold = 0.1,
  once = true 
}) => {
  const { targetRef, hasIntersected } = useIntersectionObserver({ 
    threshold,
    rootMargin: '100px' 
  })

  const shouldAnimate = once ? hasIntersected : hasIntersected

  return (
    <div 
      ref={targetRef}
      className={`will-change-transform ${
        shouldAnimate ? animationClass : 'opacity-0'
      }`}
      style={{ 
        animationDelay: `${delay}ms`,
        transform: 'translate3d(0, 0, 0)' // GPU acceleration
      }}
    >
      {children}
    </div>
  )
}

// Optimized scroll-triggered animations
export const useScrollAnimation = () => {
  const [scrollY, setScrollY] = useState(0)
  const [isScrolling, setIsScrolling] = useState(false)
  
  useEffect(() => {
    let timeoutId: NodeJS.Timeout
    
    const handleScroll = () => {
      setScrollY(window.scrollY)
      setIsScrolling(true)
      
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        setIsScrolling(false)
      }, 150)
    }

    const throttledScroll = throttle(handleScroll, 16) // ~60fps
    
    window.addEventListener('scroll', throttledScroll, { passive: true })
    
    return () => {
      window.removeEventListener('scroll', throttledScroll)
      clearTimeout(timeoutId)
    }
  }, [])

  return { scrollY, isScrolling }
}

// Simple throttle function for performance
function throttle(func: Function, limit: number) {
  let inThrottle: boolean
  return function(this: any, ...args: any[]) {
    if (!inThrottle) {
      func.apply(this, args)
      inThrottle = true
      setTimeout(() => inThrottle = false, limit)
    }
  }
}

// Optimized particle system
export const OptimizedParticleSystem = ({ 
  particleCount = 20, 
  colors = ['#FF00FF', '#8000FF', '#FF0080'], 
  speed = 1 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const particlesRef = useRef<any[]>([])
  
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    // Initialize particles
    particlesRef.current = Array.from({ length: particleCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * speed,
      vy: (Math.random() - 0.5) * speed,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: Math.random() * 3 + 1,
      alpha: Math.random() * 0.5 + 0.3
    }))
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      particlesRef.current.forEach(particle => {
        // Update position
        particle.x += particle.vx
        particle.y += particle.vy
        
        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width
        if (particle.x > canvas.width) particle.x = 0
        if (particle.y < 0) particle.y = canvas.height
        if (particle.y > canvas.height) particle.y = 0
        
        // Draw particle
        ctx.globalAlpha = particle.alpha
        ctx.fillStyle = particle.color
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fill()
      })
      
      ctx.globalAlpha = 1
      animationRef.current = requestAnimationFrame(animate)
    }
    
    // Resize canvas
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth * devicePixelRatio
      canvas.height = canvas.offsetHeight * devicePixelRatio
      ctx.scale(devicePixelRatio, devicePixelRatio)
    }
    
    resizeCanvas()
    animate()
    
    window.addEventListener('resize', resizeCanvas)
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [particleCount, colors, speed])
  
  return (
    <canvas 
      ref={canvasRef}
      className=\"absolute inset-0 w-full h-full pointer-events-none\"
      style={{ opacity: 0.6 }}
    />
  )
}

// Memory leak prevention for WebGL contexts
export const useWebGLCleanup = () => {
  useEffect(() => {
    return () => {
      // Clean up WebGL contexts on unmount
      const canvases = document.querySelectorAll('canvas')
      canvases.forEach(canvas => {
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
        if (gl) {
          gl.getExtension('WEBGL_lose_context')?.loseContext()
        }
      })
    }
  }, [])
}

// Optimized image loading
export const OptimizedImage = ({ 
  src, 
  alt, 
  className = \"\", 
  placeholder = \"data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%3E%3C/svg%3E\" 
}) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState(false)
  
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {!isLoaded && !error && (
        <div className=\"absolute inset-0 bg-muted animate-pulse\" />
      )}
      <img
        src={error ? placeholder : src}
        alt={alt}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        onLoad={() => setIsLoaded(true)}
        onError={() => setError(true)}
        loading=\"lazy\"
        decoding=\"async\"
      />
    </div>
  )
}

export default {
  useIntersectionObserver,
  OptimizedAnimation,
  useScrollAnimation,
  OptimizedParticleSystem,
  useWebGLCleanup,
  OptimizedImage
}"