import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const SkillsShaderBackground = () => {
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

      vec3 techSpectrum(float t) {
        vec3 blue = vec3(0.1, 0.4, 0.9);   // Deep blue
        vec3 cyan = vec3(0.0, 0.8, 0.9);   // Cyan
        vec3 teal = vec3(0.0, 0.7, 0.6);   // Teal
        vec3 purple = vec3(0.5, 0.2, 0.9); // Purple accent
        float phase = fract(t);
        if (phase < 0.33) {
          return mix(blue, cyan, phase * 3.0);
        } else if (phase < 0.66) {
          return mix(cyan, teal, (phase - 0.33) * 3.0);
        } else {
          return mix(teal, purple, (phase - 0.66) * 3.0);
        }
      }

      void main() {
        vec2 uv = (2.0 * gl_FragCoord.xy - iResolution.xy) / min(iResolution.x, iResolution.y);
        uv *= 1.5;

        vec3 color = vec3(0.0);
        for(int i = 0; i < 6; i++) {
          float fi = float(i);
          vec2 pos = uv + vec2(
            sin(iTime * 0.7 + fi * 1.8) * 0.4,
            cos(iTime * 0.5 + fi * 2.3) * 0.3
          );
          float dist = length(pos);
          float wave = sin(dist * 10.0 - iTime * 3.0 + fi) * 0.5 + 0.5;
          color += techSpectrum(iTime * 0.15 + fi * 0.3) * wave * 0.08;
        }

        // Add some grid-like patterns
        vec2 grid = fract(uv * 20.0);
        float gridPattern = step(0.98, max(grid.x, grid.y));
        color += techSpectrum(iTime * 0.1) * gridPattern * 0.05;

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

const TechParticles = () => {
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number, delay: number, color: string}>>([]);

  useEffect(() => {
    const particleCount = 15;
    const colors = ['#00FFFF', '#0080FF', '#00FF80', '#8000FF', '#FF0080'];
    const newParticles = [];

    for (let i = 0; i < particleCount; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 4,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }

    setParticles(newParticles);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute w-1 h-1 rounded-full animate-float opacity-60"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            animationDelay: `${particle.delay}s`,
            animationDuration: '10s',
            backgroundColor: particle.color,
            boxShadow: `0 0 10px ${particle.color}40`
          }}
        />
      ))}
    </div>
  );
};

const AnimatedProgressBar = ({ level, color }: { level: number; color: string }) => {
  const [animatedLevel, setAnimatedLevel] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedLevel(level);
    }, 500);
    return () => clearTimeout(timer);
  }, [level]);

  return (
    <div className="w-full bg-black/30 rounded-full h-3 overflow-hidden border border-white/10">
      <div
        className="h-3 rounded-full transition-all duration-2000 ease-out relative overflow-hidden"
        style={{
          width: `${animatedLevel}%`,
          background: `linear-gradient(90deg, ${color}40, ${color}80, ${color}40)`
        }}
      >
        <div
          className="absolute inset-0 animate-pulse"
          style={{
            background: `linear-gradient(90deg, transparent, ${color}60, transparent)`,
            animation: 'shimmer 2s infinite'
          }}
        />
        <div
          className="absolute top-0 left-0 w-full h-full"
          style={{
            background: `linear-gradient(90deg, transparent, ${color}30, transparent)`,
            animation: 'glowMove 3s infinite'
          }}
        />
      </div>
    </div>
  );
};

export function SkillsSection() {
  const skillCategories = [
    {
      title: "Frontend",
      icon: "🎨",
      skills: [
        { name: "React", level: 95 },
        { name: "Next.js", level: 90 },
        { name: "TypeScript", level: 88 },
        { name: "Tailwind CSS", level: 92 },
        { name: "Vue.js", level: 75 },
      ],
    },
    {
      title: "Backend",
      icon: "⚙️",
      skills: [
        { name: "Node.js", level: 90 },
        { name: "Python", level: 85 },
        { name: "PostgreSQL", level: 80 },
        { name: "MongoDB", level: 78 },
        { name: "GraphQL", level: 82 },
      ],
    },
    {
      title: "Tools & Others",
      icon: "🛠️",
      skills: [
        { name: "Git", level: 95 },
        { name: "Docker", level: 80 },
        { name: "AWS", level: 75 },
        { name: "Jest", level: 85 },
        { name: "Figma", level: 70 },
      ],
    },
  ]

  return (
    <section id="skills" className="py-20 bg-background relative overflow-hidden">
      <SkillsShaderBackground />
      <TechParticles />
      <div className="absolute inset-0 bg-gradient-to-br from-black/15 via-transparent to-black/10" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-6 py-3 rounded-full glass-subtle text-accent text-sm font-medium mb-6 border-0 animate-glass-fade">
            💻 Technical Expertise
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Skills & Technologies
          </h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
            A comprehensive overview of my technical expertise and proficiency levels across different domains of software development.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <Card key={index} className="p-6 glass-subtle border-0 hover:glass-card transition-all duration-500 hover:shadow-lg hover:shadow-primary/10 animate-glass-scale" style={{ animationDelay: `${index * 0.1}s` }}>
              <CardHeader className="p-0 mb-6">
                <div className="text-center">
                  <div className="text-3xl mb-3">{category.icon}</div>
                  <CardTitle className="text-xl">{category.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-4">
                  {category.skills.map((skill, skillIndex) => {
                    const colors = ['#00FFFF', '#0080FF', '#00FF80', '#8000FF', '#FF0080'];
                    const color = colors[(skillIndex + (category.title === 'Frontend' ? 0 : category.title === 'Backend' ? 1 : 2)) % colors.length];
                    return (
                      <div key={skillIndex} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="font-medium text-white">{skill.name}</span>
                          <span className="text-sm text-white/70 font-medium">{skill.level}%</span>
                        </div>
                        <AnimatedProgressBar level={skill.level} color={color} />
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
