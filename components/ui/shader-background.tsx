import { useEffect, useRef, useState } from "react";

interface ShaderBackgroundProps {
  className?: string;
  intensity?: number;
  speed?: number;
  complexity?: number;
  variant?: 'hero' | 'section' | 'subtle' | 'ambient';
}

// Standardized shader configurations for consistent visual experience
const SHADER_VARIANTS = {
  hero: { intensity: 0.15, speed: 0.8, complexity: 12, opacity: 0.9 },
  section: { intensity: 0.08, speed: 0.6, complexity: 8, opacity: 0.5 },
  subtle: { intensity: 0.05, speed: 0.4, complexity: 6, opacity: 0.3 },
  ambient: { intensity: 0.03, speed: 0.3, complexity: 4, opacity: 0.2 }
};

export const ShaderBackground = ({
  className = "",
  intensity,
  speed,
  complexity,
  variant = 'section'
}: ShaderBackgroundProps) => {
  // Use variant defaults if specific props not provided
  const config = SHADER_VARIANTS[variant];
  const finalIntensity = intensity ?? config.intensity;
  const finalSpeed = speed ?? config.speed;
  const finalComplexity = complexity ?? config.complexity;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [webglSupported, setWebglSupported] = useState<boolean>(true);
  const [fallbackActive, setFallbackActive] = useState<boolean>(false);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const gl = canvas.getContext("webgl");

    if (!gl) {
      console.warn("WebGL not supported, falling back to CSS animation");
      setWebglSupported(false);
      setFallbackActive(true);
      return;
    }

    // Resize canvas to fill container
    const resizeCanvas = () => {
      const displayWidth = canvas.clientWidth;
      const displayHeight = canvas.clientHeight;

      if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
        canvas.width = displayWidth;
        canvas.height = displayHeight;
        gl.viewport(0, 0, canvas.width, canvas.height);
      }
    };

    const resizeObserver = new ResizeObserver(() => {
      resizeCanvas();
    });

    resizeObserver.observe(canvas);
    resizeCanvas();

    // Create vertex shader
    const vertexShaderSource = `
      attribute vec4 aVertexPosition;
      void main() {
        gl_Position = aVertexPosition;
      }
    `;

    // Enhanced fragment shader with better spectral effects
    const fragmentShaderSource = `
      precision highp float;
      uniform vec2 iResolution;
      uniform float iTime;
      uniform float uIntensity;
      uniform float uSpeed;
      uniform float uComplexity;

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
        else if ((l>=475.0)&&(l<560.0)) { float t=(l-475.0)/(560.0-560.0); b=0.7-(t)+(0.30*t*t); }
        return vec3(r,g,b);
      }

      void main() {
        vec2 p = (2.0*gl_FragCoord.xy - iResolution.xy) / min(iResolution.x, iResolution.y);
        p *= 2.0;
        
        // Enhanced fractal iterations with variable complexity
        for(int i=0; i<20; i++) {
          if(float(i) >= uComplexity) break;
          
          vec2 newp = vec2(
            p.y + cos(p.x + iTime * uSpeed * 0.8) - sin(p.y * cos(iTime * uSpeed * 0.3)),
            p.x - sin(p.y - iTime * uSpeed * 0.9) - cos(p.x * sin(iTime * uSpeed * 0.4))
          );
          p = newp;
        }
        
        // Enhanced color calculation with more dynamic range
        float colorIndex = p.y * 50.0 + 500.0 + sin(iTime * uSpeed * 0.6);
        vec3 color = spectral_colour(colorIndex);
        
        // Add subtle gradient overlay for depth
        float gradient = 1.0 - distance(gl_FragCoord.xy / iResolution.xy, vec2(0.5, 0.5));
        color *= (0.8 + 0.2 * gradient);
        
        gl_FragColor = vec4(color * uIntensity, 1.0);
      }
    `;

    // Create and compile shaders
    const createShader = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      
      gl.shaderSource(shader, source);
      gl.compileShader(shader);

      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error("Shader compilation failed:", gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }

      return shader;
    };

    const vertexShader = createShader(gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = createShader(gl.FRAGMENT_SHADER, fragmentShaderSource);

    if (!vertexShader || !fragmentShader) {
      console.error("Failed to create shaders");
      return;
    }

    // Create shader program
    const shaderProgram = gl.createProgram();
    if (!shaderProgram) {
      console.error("Failed to create shader program");
      return;
    }

    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);

    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
      console.error("Shader program linking failed:", gl.getProgramInfoLog(shaderProgram));
      return;
    }

    gl.useProgram(shaderProgram);

    // Create geometry
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

    const positions = [
      -1.0, -1.0,
       1.0, -1.0,
      -1.0,  1.0,
       1.0,  1.0,
    ];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

    // Set up attributes and uniforms
    const positionAttributeLocation = gl.getAttribLocation(shaderProgram, "aVertexPosition");
    gl.enableVertexAttribArray(positionAttributeLocation);
    gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);

    const timeUniformLocation = gl.getUniformLocation(shaderProgram, "iTime");
    const resolutionUniformLocation = gl.getUniformLocation(shaderProgram, "iResolution");
    const intensityUniformLocation = gl.getUniformLocation(shaderProgram, "uIntensity");
    const speedUniformLocation = gl.getUniformLocation(shaderProgram, "uSpeed");
    const complexityUniformLocation = gl.getUniformLocation(shaderProgram, "uComplexity");

    // Animation loop with performance optimizations
    let startTime = Date.now();
    let animationFrameId: number;
    let lastFrameTime = 0;
    const targetFPS = 60;
    const frameInterval = 1000 / targetFPS;

    const render = (currentTime: number) => {
      // Limit frame rate for better performance
      if (currentTime - lastFrameTime < frameInterval) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }
      lastFrameTime = currentTime;

      const elapsedTime = (currentTime - startTime) / 1000;

      // Set uniforms
      gl.uniform1f(timeUniformLocation, elapsedTime);
      gl.uniform2f(resolutionUniformLocation, canvas.width, canvas.height);
      gl.uniform1f(intensityUniformLocation, finalIntensity);
      gl.uniform1f(speedUniformLocation, finalSpeed);
      gl.uniform1f(complexityUniformLocation, finalComplexity);

      // Clear and draw
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    // Cleanup function
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      resizeObserver.disconnect();
      gl.deleteProgram(shaderProgram);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
      gl.deleteBuffer(positionBuffer);
    };
  }, [finalIntensity, finalSpeed, finalComplexity, webglSupported]);

  return (
    <>
      {/* WebGL Canvas */}
      {webglSupported && (
        <canvas
          ref={canvasRef}
          className={`absolute inset-0 w-full h-full ${className}`}
          style={{ zIndex: 0 }}
        />
      )}

      {/* CSS Fallback Animation */}
      {fallbackActive && (
        <div
          className={`absolute inset-0 w-full h-full ${className} bg-gradient-subtle`}
          style={{
            background: 'radial-gradient(circle at 20% 80%, rgba(79, 156, 249, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(245, 101, 101, 0.1) 0%, transparent 50%)',
            animation: 'shader-fallback 8s ease-in-out infinite alternate',
            zIndex: 0
          }}
        />
      )}
    </>
  );
};