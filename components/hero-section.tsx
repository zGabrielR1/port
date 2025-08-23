"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { ArrowDown, Download, Github, Linkedin, Mail } from "lucide-react"
import { useLanguage } from "@/components/language-provider"

const ShaderBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const gl = canvas.getContext("webgl");

    if (!gl) {
      console.error("WebGL not supported");
      return;
    }

    // Resize canvas to fill window
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    // Create vertex shader
    const vertexShaderSource = `
      attribute vec4 aVertexPosition;
      void main() {
        gl_Position = aVertexPosition;
      }
    `;

    // Create fragment shader with shader clock effects
    const fragmentShaderSource = `
      precision highp float;
      uniform vec2 iResolution;
      uniform float iTime;

      vec3 spectral_colour(float l) {
        float r=0.0,g=0.0,b=0.0;
        if ((l>=400.0)&&(l<410.0)) { float t=(l-400.0)/(410.0-400.0); r=+(0.33*t)-(0.20*t*t); }
        else if ((l>=410.0)&&(l<475.0)) { float t=(l-410.0)/(475.0-410.0); r=0.14-(0.13*t*t); }
        else if ((l>=545.0)&&(l<595.0)) { float t=(l-545.0)/(595.0-545.0); r=+(1.98*t)-(t*t); }
        else if ((l>=595.0)&&(l<650.0)) { float t=(l-595.0)/(650.0-595.0); r=0.98+(0.06*t)-(0.40*t*t); }
        else if ((l>=650.0)&&(l<700.0)) { float t=(l-650.0)/(700.0-650.0); r=0.65-(0.84*t)+(0.20*t*t); }
        if ((l>=415.0)&&(l<475.0)) { float t=(l-415.0)/(475.0-415.0); g=+(0.80*t*t); }
        else if ((l>=475.0)&&(l<590.0)) { float t=(l-475.0)/(590.0-475.0); g=0.8+(0.76*t)-(0.80*t*t); }
        else if ((l>=585.0)&&(l<639.0)) { float t=(l-585.0)/(639.0-585.0); g=0.82-(0.80*t); }
        if ((l>=400.0)&&(l<475.0)) { float t=(l-400.0)/(475.0-400.0); b=+(2.20*t)-(1.50*t*t); }
        else if ((l>=475.0)&&(l<560.0)) { float t=(l-475.0)/(560.0-475.0); b=0.7-(t)+(0.30*t*t); }
        return vec3(r,g,b);
      }

      void main() {
        vec2 p = (2.0*gl_FragCoord.xy - iResolution.xy) / min(iResolution.x, iResolution.y);
        p *= 1.5;
        for(int i=0;i<6;i++) {
          vec2 newp = vec2(
            p.y + cos(p.x + iTime * 0.8) - sin(p.y * cos(iTime * 0.3)),
            p.x - sin(p.y - iTime * 0.9) - cos(p.x * sin(iTime * 0.4))
          );
          p = newp;
        }
        vec3 color = spectral_colour(p.y * 40.0 + 500.0 + sin(iTime * 0.5));
        gl_FragColor = vec4(color * 0.15, 1.0);
      }
    `;

    // Create and compile vertex shader
    const vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader!, vertexShaderSource);
    gl.compileShader(vertexShader!);

    // Check vertex shader compilation
    if (!gl.getShaderParameter(vertexShader!, gl.COMPILE_STATUS)) {
      console.error("Vertex shader compilation failed:", gl.getShaderInfoLog(vertexShader!));
      return;
    }

    // Create and compile fragment shader
    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader!, fragmentShaderSource);
    gl.compileShader(fragmentShader!);

    // Check fragment shader compilation
    if (!gl.getShaderParameter(fragmentShader!, gl.COMPILE_STATUS)) {
      console.error("Fragment shader compilation failed:", gl.getShaderInfoLog(fragmentShader!));
      return;
    }

    // Create shader program
    const shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram!, vertexShader!);
    gl.attachShader(shaderProgram!, fragmentShader!);
    gl.linkProgram(shaderProgram!);

    // Check program linking
    if (!gl.getProgramParameter(shaderProgram!, gl.LINK_STATUS)) {
      console.error("Shader program linking failed:", gl.getProgramInfoLog(shaderProgram!));
      return;
    }

    gl.useProgram(shaderProgram!);

    // Create a buffer for the positions
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

    // Full-screen quad vertices
    const positions = [
      -1.0, -1.0,
       1.0, -1.0,
      -1.0,  1.0,
       1.0,  1.0,
    ];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

    // Get attribute location
    const positionAttributeLocation = gl.getAttribLocation(shaderProgram!, "aVertexPosition");
    gl.enableVertexAttribArray(positionAttributeLocation);
    gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);

    // Get uniform locations
    const timeUniformLocation = gl.getUniformLocation(shaderProgram!, "iTime");
    const resolutionUniformLocation = gl.getUniformLocation(shaderProgram!, "iResolution");

    // Check if uniforms were found
    if (timeUniformLocation === null) {
      console.error("Uniform 'iTime' not found in shader program");
      return;
    }
    if (resolutionUniformLocation === null) {
      console.error("Uniform 'iResolution' not found in shader program");
      return;
    }

    // Animation loop
    let startTime = Date.now();

    const render = () => {
      // Set time uniform
      const currentTime = (Date.now() - startTime) / 1000;
      gl.uniform1f(timeUniformLocation, currentTime);

      // Set resolution uniform
      gl.uniform2f(resolutionUniformLocation, canvas.width, canvas.height);

      // Draw the full-screen quad
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

      // Request next frame
      requestAnimationFrame(render);
    };

    render();

    // Cleanup
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

export function HeroSection() {
  const { t } = useLanguage()
  const [showInfo, setShowInfo] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);

  // Fade in animation when component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  const scrollToAbout = () => {
    const element = document.getElementById("about")
    element?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Shader Background */}
      <ShaderBackground />

      {/* Enhanced glassmorphism overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/10 via-transparent to-black/5" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center relative z-10">
        <div className="space-y-12">
          <div className="space-y-8">
            <div className="inline-flex items-center px-6 py-3 rounded-full backdrop-blur-md bg-black/30 text-white text-sm font-medium border border-white/20 animate-glass-fade">
              ✨ Welcome to my digital space
            </div>
            <div
              className={`backdrop-blur-md bg-black/20 px-8 py-10 rounded-2xl shadow-xl transition-all duration-700 ${
                visible
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-95"
              }`}
            >
              <h1 className="text-5xl sm:text-6xl lg:text-8xl font-bold text-white leading-tight tracking-tight mb-4">
                Hi, I'm{" "}
                <span className="relative inline-block">
                  <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
                    Alex Johnson
                  </span>
                  <div className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full" />
                </span>
              </h1>
              <p className="text-xl sm:text-2xl lg:text-3xl text-white/90 max-w-3xl mx-auto font-medium leading-relaxed mb-4">
                Full-Stack Developer & Software Engineer
              </p>
              <p className="text-base sm:text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
                I create exceptional digital experiences with modern technologies, focusing on clean code and user-centered design.
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center gap-8">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
              <Button
                onClick={scrollToAbout}
                size="lg"
                className="backdrop-blur-md bg-black/30 hover:bg-black/40 text-white px-8 py-6 text-lg font-medium rounded-xl border border-white/20 hover:border-white/30 shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105 group"
              >
                <span>View My Work</span>
                <ArrowDown className="ml-2 h-5 w-5 group-hover:translate-y-1 transition-transform duration-300" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="backdrop-blur-md bg-black/30 hover:bg-black/40 text-white px-8 py-6 text-lg font-medium rounded-xl border border-white/20 hover:border-white/30 transition-all duration-500 hover:scale-105 group"
              >
                <Download className="mr-2 h-5 w-5 group-hover:animate-bounce transition-transform duration-300" />
                <span>Download CV</span>
              </Button>
            </div>

            <div className="flex items-center gap-2 p-4 rounded-xl backdrop-blur-md bg-black/30 border border-white/20 animate-glass-scale">
              <span className="text-sm text-white/80 font-medium mr-3">Connect:</span>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" className="h-10 w-10 rounded-lg backdrop-blur-md bg-black/30 hover:bg-black/40 text-white/70 hover:text-white transition-all duration-300 hover:scale-110 border border-white/20 hover:border-white/30">
                  <Github className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="h-10 w-10 rounded-lg backdrop-blur-md bg-black/30 hover:bg-black/40 text-white/70 hover:text-white transition-all duration-300 hover:scale-110 border border-white/20 hover:border-white/30">
                  <Linkedin className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="h-10 w-10 rounded-lg backdrop-blur-md bg-black/30 hover:bg-black/40 text-white/70 hover:text-white transition-all duration-300 hover:scale-110 border border-white/20 hover:border-white/30">
                  <Mail className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8">
            <div className="text-center p-4 rounded-xl backdrop-blur-md bg-black/30 border border-white/20 transition-all duration-300 hover:scale-105 hover:bg-black/40 hover:border-white/30 animate-glass-scale">
              <div className="text-3xl font-bold text-white mb-1">5+</div>
              <div className="text-xs text-white/70 font-medium">Years Experience</div>
            </div>
            <div className="text-center p-4 rounded-xl backdrop-blur-md bg-black/30 border border-white/20 transition-all duration-300 hover:scale-105 hover:bg-black/40 hover:border-white/30 animate-glass-scale" style={{ animationDelay: '0.1s' }}>
              <div className="text-3xl font-bold text-white mb-1">50+</div>
              <div className="text-xs text-white/70 font-medium">Projects Completed</div>
            </div>
            <div className="text-center p-4 rounded-xl backdrop-blur-md bg-black/30 border border-white/20 transition-all duration-300 hover:scale-105 hover:bg-black/40 hover:border-white/30 animate-glass-scale" style={{ animationDelay: '0.2s' }}>
              <div className="text-3xl font-bold text-white mb-1">20+</div>
              <div className="text-xs text-white/70 font-medium">Technologies</div>
            </div>
            <div className="text-center p-4 rounded-xl backdrop-blur-md bg-black/30 border border-white/20 transition-all duration-300 hover:scale-105 hover:bg-black/40 hover:border-white/30 animate-glass-scale" style={{ animationDelay: '0.3s' }}>
              <div className="text-3xl font-bold text-white mb-1">100%</div>
              <div className="text-xs text-white/70 font-medium">Client Satisfaction</div>
            </div>
          </div>
        </div>
      </div>

      {/* Info button like Shader Clock */}
      <button
        onClick={() => setShowInfo((prev) => !prev)}
        className={`absolute bottom-6 right-6 w-10 h-10 flex items-center justify-center rounded-full backdrop-blur-md text-white/70 hover:text-white/100 transition-all duration-300 ${
          showInfo ? "bg-black/40 rotate-180" : "bg-black/30"
        }`}
        aria-label={
          showInfo ? "Close information" : "Show information"
        }
      >
        {showInfo ? "×" : "i"}
      </button>

      {/* Info Panel */}
      {showInfo && (
        <div className="absolute bottom-20 right-6 bg-black/40 backdrop-blur-md px-6 py-4 rounded-lg shadow-lg text-white/80 text-sm transition-all duration-300 animate-fadeIn">
          <p>Click on the city name to edit your location.</p>
          <p className="mt-1">
            Click on the temperature to toggle between °C and
            °F.
          </p>
        </div>
      )}
    </section>
  )
}
