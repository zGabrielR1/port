"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github } from "lucide-react"

const ProjectsShaderBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();
  const glRef = useRef<WebGLRenderingContext | null>(null);
  const programRef = useRef<WebGLProgram | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const gl = canvas.getContext("webgl", { 
      alpha: true, 
      antialias: false, // Disable for performance
      depth: false,
      stencil: false,
      preserveDrawingBuffer: false,
      powerPreference: "high-performance"
    });

    if (!gl) return;
    glRef.current = gl;

    const resizeCanvas = () => {
      const displayWidth = Math.min(canvas.clientWidth, 1920); // Cap resolution
      const displayHeight = Math.min(canvas.clientHeight, 1080);
      
      if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
        canvas.width = displayWidth;
        canvas.height = displayHeight;
        gl.viewport(0, 0, displayWidth, displayHeight);
      }
    };

    // Throttled resize handler
    let resizeTimeout: NodeJS.Timeout;
    const throttledResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(resizeCanvas, 100);
    };

    window.addEventListener("resize", throttledResize);
    resizeCanvas();

    const vertexShaderSource = `
      attribute vec4 aVertexPosition;
      void main() {
        gl_Position = aVertexPosition;
      }
    `;

    // Optimized fragment shader with reduced complexity
    const fragmentShaderSource = `
      precision mediump float;
      uniform vec2 iResolution;
      uniform float iTime;

      vec3 creativeSpectrum(float t) {
        vec3 purple = vec3(0.6, 0.2, 0.8);
        vec3 magenta = vec3(0.9, 0.3, 0.7);
        vec3 pink = vec3(1.0, 0.4, 0.6);
        vec3 violet = vec3(0.4, 0.3, 0.9);
        float phase = fract(t);
        
        // Simplified color mixing for better performance
        if (phase < 0.5) {
          return mix(purple, magenta, phase * 2.0);
        } else {
          return mix(magenta, pink, (phase - 0.5) * 2.0);
        }
      }

      void main() {
        vec2 uv = (2.0 * gl_FragCoord.xy - iResolution.xy) / min(iResolution.x, iResolution.y);
        uv *= 1.5; // Reduced complexity

        vec3 color = vec3(0.0);
        
        // Reduced iteration count for performance
        for(int i = 0; i < 4; i++) {
          float fi = float(i);
          vec2 pos = uv + vec2(
            sin(iTime * 0.4 + fi * 1.2) * 0.4,
            cos(iTime * 0.3 + fi * 1.5) * 0.3
          );
          float dist = length(pos);
          float wave = sin(dist * 8.0 - iTime * 2.0 + fi) * 0.5 + 0.5;
          color += creativeSpectrum(iTime * 0.1 + fi * 0.3) * wave * 0.08;
        }

        gl_FragColor = vec4(color, 1.0);
      }
    `;

    const vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader!, vertexShaderSource);
    gl.compileShader(vertexShader!);

    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader!, fragmentShaderSource);
    gl.compileShader(fragmentShader!);

    const shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram!, vertexShader!);
    gl.attachShader(shaderProgram!, fragmentShader!);
    gl.linkProgram(shaderProgram!);
    
    if (!gl.getProgramParameter(shaderProgram!, gl.LINK_STATUS)) {
      console.warn('Shader program linking failed');
      return;
    }
    
    gl.useProgram(shaderProgram!);
    programRef.current = shaderProgram;

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

    const positions = [-1.0, -1.0, 1.0, -1.0, -1.0, 1.0, 1.0, 1.0];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

    const positionAttributeLocation = gl.getAttribLocation(shaderProgram!, "aVertexPosition");
    gl.enableVertexAttribArray(positionAttributeLocation);
    gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);

    const timeUniformLocation = gl.getUniformLocation(shaderProgram!, "iTime");
    const resolutionUniformLocation = gl.getUniformLocation(shaderProgram!, "iResolution");

    let startTime = Date.now();
    let lastFrameTime = 0;
    const targetFPS = 30; // Reduce FPS for better performance
    const frameInterval = 1000 / targetFPS;
    
    const render = (currentTime: number) => {
      if (currentTime - lastFrameTime >= frameInterval) {
        const time = (Date.now() - startTime) / 1000;
        gl.uniform1f(timeUniformLocation, time);
        gl.uniform2f(resolutionUniformLocation, canvas.width, canvas.height);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        lastFrameTime = currentTime;
      }
      animationFrameRef.current = requestAnimationFrame(render);
    };

    animationFrameRef.current = requestAnimationFrame(render);

    return () => {
      // Cleanup
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      
      window.removeEventListener("resize", throttledResize);
      clearTimeout(resizeTimeout);
      
      // Properly cleanup WebGL resources
      if (gl && programRef.current) {
        gl.deleteProgram(programRef.current);
        gl.deleteShader(vertexShader!);
        gl.deleteShader(fragmentShader!);
        gl.deleteBuffer(positionBuffer!);
        
        // Force context loss for memory cleanup
        const loseContext = gl.getExtension('WEBGL_lose_context');
        if (loseContext) {
          loseContext.loseContext();
        }
      }
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }} />;
};

const CreativeParticles = () => {
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number, delay: number, color: string, size: number, duration: number}>>([]);

  useEffect(() => {
    const particleCount = 12; // Reduced count for performance
    const colors = ['#FF00FF', '#8000FF', '#FF0080', '#00FFFF'];
    const newParticles = [];

    for (let i = 0; i < particleCount; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 5,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 2 + 1, // Smaller particles
        duration: 8 + Math.random() * 4 // Varied duration
      });
    }

    setParticles(newParticles);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden will-change-transform">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full animate-float opacity-60 will-change-transform gpu-accelerated"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            animationDelay: `${particle.delay}s`,
            animationDuration: `${particle.duration}s`,
            backgroundColor: particle.color,
            boxShadow: `0 0 10px ${particle.color}40`,
            transform: 'translate3d(0, 0, 0)' // GPU acceleration
          }}
        />
      ))}
    </div>
  );
};

const FloatingProjectPreview = ({ project, index }: { project: any; index: number }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, index * 200);
    return () => clearTimeout(timer);
  }, [index]);

  return (
    <div
      className={`absolute transition-all duration-1000 ease-out ${
        isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
      }`}
      style={{
        left: `${20 + (index * 25) % 60}%`,
        top: `${30 + (index * 15) % 40}%`,
        animationDelay: `${index * 0.5}s`
      }}
    >
      <div className="w-16 h-16 rounded-lg overflow-hidden border-2 border-white/30 shadow-lg hover:scale-110 transition-transform duration-300">
        <div className="w-full h-full bg-gradient-to-br from-purple-500/50 to-pink-500/50 flex items-center justify-center text-white text-xs font-bold">
          {project.title.split(' ')[0]}
        </div>
      </div>
    </div>
  );
};

export function ProjectsSection() {
  const projects = [
    {
      title: "E-Commerce Platform",
      description:
        "A full-stack e-commerce solution built with Next.js, featuring user authentication, payment processing, and admin dashboard.",
      image: "/placeholder.svg?height=200&width=400",
      technologies: ["Next.js", "TypeScript", "Stripe", "PostgreSQL"],
      liveUrl: "#",
      githubUrl: "#",
    },
    {
      title: "Task Management App",
      description:
        "A collaborative project management tool with real-time updates, drag-and-drop functionality, and team collaboration features.",
      image: "/placeholder.svg?height=200&width=400",
      technologies: ["React", "Node.js", "Socket.io", "MongoDB"],
      liveUrl: "#",
      githubUrl: "#",
    },
    {
      title: "Weather Analytics Dashboard",
      description:
        "A data visualization dashboard that displays weather patterns and analytics using real-time weather API data.",
      image: "/placeholder.svg?height=200&width=400",
      technologies: ["Vue.js", "D3.js", "Python", "FastAPI"],
      liveUrl: "#",
      githubUrl: "#",
    },
    {
      title: "Social Media Platform",
      description:
        "A modern social networking platform with real-time messaging, content sharing, and advanced privacy controls.",
      image: "/placeholder.svg?height=200&width=400",
      technologies: ["React Native", "GraphQL", "AWS", "Redis"],
      liveUrl: "#",
      githubUrl: "#",
    },
  ]

  return (
    <section id="projects" className="section-padding bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/[0.01] bg-[size:60px_60px]" />
      <div className="absolute top-20 left-1/4 w-80 h-80 bg-primary/3 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-1/4 w-72 h-72 bg-accent/4 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto container-padding relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-6 py-3 rounded-full glass-subtle text-primary text-sm font-medium mb-6 border-0 animate-fade-in hover-glow">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse mr-3" />
            Featured Projects
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6 text-gradient">
            My Best Work
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            A showcase of my recent work and personal projects that demonstrate my technical skills, creativity, and passion for building innovative solutions.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div key={index} className="group overflow-hidden glass-card hover:glass-strong border-0 hover-lift transition-all duration-500 animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="aspect-video overflow-hidden relative bg-muted">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">{project.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">{project.description}</p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech, techIndex) => (
                    <span key={techIndex} className="px-3 py-1 glass-subtle text-primary rounded-md text-sm font-medium border-0 hover:glass transition-all duration-300 animate-scale-in" style={{ animationDelay: `${techIndex * 0.05}s` }}>
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex gap-3">
                  <Button size="sm" className="flex-1 btn-primary">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Live Demo
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 glass-subtle hover:glass border-primary/20 hover:border-primary/40 transition-all duration-300">
                    <Github className="mr-2 h-4 w-4" />
                    Code
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
