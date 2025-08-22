"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Code, Lightbulb, Users, Zap } from "lucide-react"
import { useLanguage } from "@/components/language-provider"

const AboutShaderBackground = () => {
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

      vec3 warmSpectrum(float t) {
        vec3 warm = vec3(0.9, 0.4, 0.1);  // Orange
        vec3 hot = vec3(1.0, 0.8, 0.2);   // Gold
        vec3 cool = vec3(0.3, 0.7, 0.9);  // Sky blue
        float phase = fract(t);
        if (phase < 0.5) {
          return mix(warm, hot, phase * 2.0);
        } else {
          return mix(hot, cool, (phase - 0.5) * 2.0);
        }
      }

      void main() {
        vec2 uv = (2.0 * gl_FragCoord.xy - iResolution.xy) / min(iResolution.x, iResolution.y);
        uv *= 1.2;

        vec3 color = vec3(0.0);
        for(int i = 0; i < 5; i++) {
          float fi = float(i);
          vec2 pos = uv + vec2(
            sin(iTime * 0.5 + fi * 1.5) * 0.3,
            cos(iTime * 0.3 + fi * 2.1) * 0.2
          );
          float dist = length(pos);
          float wave = sin(dist * 8.0 - iTime * 2.0 + fi) * 0.5 + 0.5;
          color += warmSpectrum(iTime * 0.1 + fi * 0.2) * wave * 0.1;
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

const FloatingParticles = () => {
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number, delay: number}>>([]);

  useEffect(() => {
    const particleCount = 12;
    const newParticles = [];

    for (let i = 0; i < particleCount; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 3
      });
    }

    setParticles(newParticles);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute w-2 h-2 bg-orange-400/30 rounded-full animate-float"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            animationDelay: `${particle.delay}s`,
            animationDuration: '8s'
          }}
        />
      ))}
    </div>
  );
};

export function AboutSection() {
  const { t } = useLanguage()
  return (
    <section id="about" className="py-20 bg-background relative overflow-hidden">
      <AboutShaderBackground />
      <FloatingParticles />
      <div className="absolute inset-0 bg-gradient-to-br from-black/10 via-transparent to-black/5" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-6 py-3 rounded-full glass-subtle text-primary text-sm font-medium mb-6 border-0 animate-glass-fade">
            👨‍💻 Get to know me
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
            About Me
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            With over 5 years of experience in software development, I specialize in building scalable web applications using cutting-edge technologies. My journey began with a Computer Science degree and has evolved through continuous learning and hands-on experience with diverse projects.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="space-y-6">
              <p className="text-lg text-muted-foreground leading-relaxed hover:text-foreground/90 transition-colors duration-300">
                With over 5 years of experience in software development, I specialize in building scalable web applications using cutting-edge technologies. My journey began with a Computer Science degree and has evolved through continuous learning and hands-on experience with diverse projects.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed hover:text-foreground/90 transition-colors duration-300">
                I'm passionate about writing clean, maintainable code and staying up-to-date with the latest industry trends. When I'm not coding, you'll find me contributing to open-source projects, mentoring junior developers, or exploring new technologies.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-foreground hover:text-primary transition-colors duration-300">What drives me:</h3>
              <div className="flex flex-wrap gap-3">
                <span className="px-4 py-2 glass-subtle text-primary rounded-full text-sm font-medium hover:glass hover:scale-105 transition-all duration-300 border-0 animate-glass-scale">
                  Problem Solver
                </span>
                <span className="px-4 py-2 glass-subtle text-accent rounded-full text-sm font-medium hover:glass hover:scale-105 transition-all duration-300 border-0 animate-glass-scale" style={{ animationDelay: '0.1s' }}>
                  Team Player
                </span>
                <span className="px-4 py-2 glass-subtle text-primary rounded-full text-sm font-medium hover:glass hover:scale-105 transition-all duration-300 border-0 animate-glass-scale" style={{ animationDelay: '0.2s' }}>
                  Continuous Learner
                </span>
                <span className="px-4 py-2 glass-subtle text-accent rounded-full text-sm font-medium hover:glass hover:scale-105 transition-all duration-300 border-0 animate-glass-scale" style={{ animationDelay: '0.3s' }}>
                  Innovation Focused
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <Card className="group relative p-8 text-center hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 hover:-translate-y-3 hover:rotate-2 border-0 glass-card cursor-pointer overflow-hidden animate-glass-scale">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10 opacity-0 group-hover:opacity-100 transition-all duration-500" />
              <CardContent className="p-0 relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg shadow-primary/10">
                  <Code className="h-8 w-8 text-primary group-hover:text-primary/90 transition-colors duration-300" />
                </div>
                <h3 className="font-semibold mb-3 text-lg group-hover:text-primary transition-colors duration-300">Clean Code</h3>
                <p className="text-sm text-muted-foreground leading-relaxed group-hover:text-foreground/80 transition-colors duration-300">
                  Writing maintainable and scalable code that stands the test of time
                </p>
              </CardContent>
              <div className="absolute top-3 right-3 w-2 h-2 bg-primary/60 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 animate-pulse" />
            </Card>
            <Card className="group relative p-8 text-center hover:shadow-2xl hover:shadow-accent/20 transition-all duration-500 hover:-translate-y-3 hover:-rotate-2 border-0 glass-card cursor-pointer overflow-hidden animate-glass-scale" style={{ animationDelay: '0.1s' }}>
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-accent/10 opacity-0 group-hover:opacity-100 transition-all duration-500" />
              <CardContent className="p-0 relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-accent/20 to-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:-rotate-6 transition-all duration-300 shadow-lg shadow-accent/10">
                  <Lightbulb className="h-8 w-8 text-accent group-hover:text-accent/90 transition-colors duration-300" />
                </div>
                <h3 className="font-semibold mb-3 text-lg group-hover:text-accent transition-colors duration-300">Innovation</h3>
                <p className="text-sm text-muted-foreground leading-relaxed group-hover:text-foreground/80 transition-colors duration-300">
                  Creative solutions to complex problems using modern approaches
                </p>
              </CardContent>
              <div className="absolute top-3 right-3 w-2 h-2 bg-accent/60 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 animate-pulse" />
            </Card>
            <Card className="group relative p-8 text-center hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 hover:-translate-y-3 hover:rotate-2 border-0 glass-card cursor-pointer overflow-hidden animate-glass-scale" style={{ animationDelay: '0.2s' }}>
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10 opacity-0 group-hover:opacity-100 transition-all duration-500" />
              <CardContent className="p-0 relative z-10">
                <div className="w-16 h-16 glass-subtle rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                  <Users className="h-8 w-8 text-primary group-hover:text-primary/90 transition-colors duration-300" />
                </div>
                <h3 className="font-semibold mb-3 text-lg group-hover:text-primary transition-colors duration-300">Collaboration</h3>
                <p className="text-sm text-muted-foreground leading-relaxed group-hover:text-foreground/80 transition-colors duration-300">
                  Working effectively in team environments and cross-functional projects
                </p>
              </CardContent>
              <div className="absolute top-3 right-3 w-2 h-2 bg-primary/60 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 animate-pulse" />
            </Card>
            <Card className="group relative p-8 text-center hover:shadow-2xl hover:shadow-accent/20 transition-all duration-500 hover:-translate-y-3 hover:-rotate-2 border-0 glass-card cursor-pointer overflow-hidden animate-glass-scale" style={{ animationDelay: '0.3s' }}>
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-accent/10 opacity-0 group-hover:opacity-100 transition-all duration-500" />
              <CardContent className="p-0 relative z-10">
                <div className="w-16 h-16 glass-subtle rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:-rotate-6 transition-all duration-300">
                  <Zap className="h-8 w-8 text-accent group-hover:text-accent/90 transition-colors duration-300" />
                </div>
                <h3 className="font-semibold mb-3 text-lg group-hover:text-accent transition-colors duration-300">Performance</h3>
                <p className="text-sm text-muted-foreground leading-relaxed group-hover:text-foreground/80 transition-colors duration-300">
                  Optimizing for speed, efficiency, and exceptional user experiences
                </p>
              </CardContent>
              <div className="absolute top-3 right-3 w-2 h-2 bg-accent/60 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 animate-pulse" />
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
