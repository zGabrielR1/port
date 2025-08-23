"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github } from "lucide-react"

const ProjectsShaderBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const gl = canvas.getContext("webgl");

    if (!gl) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    const vertexShaderSource = `
      attribute vec4 aVertexPosition;
      void main() {
        gl_Position = aVertexPosition;
      }
    `;

    const fragmentShaderSource = `
      precision highp float;
      uniform vec2 iResolution;
      uniform float iTime;

      vec3 creativeSpectrum(float t) {
        vec3 purple = vec3(0.6, 0.2, 0.8);   // Deep purple
        vec3 magenta = vec3(0.9, 0.3, 0.7);  // Magenta
        vec3 pink = vec3(1.0, 0.4, 0.6);     // Hot pink
        vec3 violet = vec3(0.4, 0.3, 0.9);   // Violet
        float phase = fract(t);
        if (phase < 0.25) {
          return mix(purple, magenta, phase * 4.0);
        } else if (phase < 0.5) {
          return mix(magenta, pink, (phase - 0.25) * 4.0);
        } else if (phase < 0.75) {
          return mix(pink, violet, (phase - 0.5) * 4.0);
        } else {
          return mix(violet, purple, (phase - 0.75) * 4.0);
        }
      }

      void main() {
        vec2 uv = (2.0 * gl_FragCoord.xy - iResolution.xy) / min(iResolution.x, iResolution.y);
        uv *= 1.8;

        vec3 color = vec3(0.0);
        for(int i = 0; i < 7; i++) {
          float fi = float(i);
          vec2 pos = uv + vec2(
            sin(iTime * 0.6 + fi * 1.3) * 0.5,
            cos(iTime * 0.4 + fi * 1.7) * 0.4
          );
          float dist = length(pos);
          float wave = sin(dist * 12.0 - iTime * 2.5 + fi) * 0.5 + 0.5;
          color += creativeSpectrum(iTime * 0.12 + fi * 0.25) * wave * 0.06;
        }

        // Add geometric patterns
        float pattern = sin(uv.x * 30.0 + iTime) * cos(uv.y * 30.0 - iTime);
        color += creativeSpectrum(iTime * 0.08) * pattern * 0.03;

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
    gl.useProgram(shaderProgram!);

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
    const render = () => {
      const currentTime = (Date.now() - startTime) / 1000;
      gl.uniform1f(timeUniformLocation, currentTime);
      gl.uniform2f(resolutionUniformLocation, canvas.width, canvas.height);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      gl.deleteProgram(shaderProgram!);
      gl.deleteShader(vertexShader!);
      gl.deleteShader(fragmentShader!);
      gl.deleteBuffer(positionBuffer!);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }} />;
};

const CreativeParticles = () => {
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number, delay: number, color: string, size: number}>>([]);

  useEffect(() => {
    const particleCount = 20;
    const colors = ['#FF00FF', '#8000FF', '#FF0080', '#00FFFF', '#FF8000'];
    const newParticles = [];

    for (let i = 0; i < particleCount; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 5,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 3 + 1
      });
    }

    setParticles(newParticles);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full animate-float opacity-70"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            animationDelay: `${particle.delay}s`,
            animationDuration: '12s',
            backgroundColor: particle.color,
            boxShadow: `0 0 15px ${particle.color}60`
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
    <section id="projects" className="py-20 bg-muted/10 relative">
      <div className="absolute inset-0 bg-grid-white/[0.01] bg-[size:60px_60px]" />
      <div className="absolute top-20 left-1/4 w-80 h-80 bg-primary/3 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-1/4 w-72 h-72 bg-accent/4 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-6 py-3 rounded-full glass-subtle text-primary text-sm font-medium mb-6 border-0 animate-glass-fade">
            🚀 Featured Projects
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
            Featured Projects
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            A showcase of my recent work and personal projects that demonstrate my technical skills, creativity, and passion for building innovative solutions.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <Card key={index} className="group overflow-hidden hover:shadow-lg transition-all duration-500 hover:-translate-y-1 glass-subtle border-0 hover:glass-card animate-glass-scale" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="aspect-video overflow-hidden relative bg-muted">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardHeader>
                <CardTitle className="text-xl">{project.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground text-sm leading-relaxed">{project.description}</p>

                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, techIndex) => (
                    <span key={techIndex} className="px-3 py-1 glass-subtle text-primary rounded-md text-sm font-medium border-0 hover:glass transition-all duration-300 animate-glass-scale" style={{ animationDelay: `${techIndex * 0.05}s` }}>
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex gap-3 pt-2">
                  <Button size="sm" className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-300">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Live Demo
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 hover:bg-accent/5 hover:text-accent hover:border-accent/50 transition-all duration-300">
                    <Github className="mr-2 h-4 w-4" />
                    Code
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
