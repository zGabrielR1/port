// Shared types for consistent interfaces across the portfolio

// Animation and timing types
export interface AnimationConfig {
  duration: number;
  delay?: number;
  easing?: string;
  repeat?: number;
  direction?: 'normal' | 'reverse' | 'alternate';
}

export interface TimingConfig {
  fast: number;
  normal: number;
  slow: number;
}

// Shader configuration types
export interface ShaderConfig {
  intensity: number;
  speed: number;
  complexity: number;
  opacity: number;
}

export interface ShaderVariant {
  hero: ShaderConfig;
  section: ShaderConfig;
  subtle: ShaderConfig;
  ambient: ShaderConfig;
}

// Glassmorphism effect types
export interface GlassmorphismConfig {
  background: string;
  border: string;
  blur: number;
  opacity: number;
}

export interface GlassmorphismVariant {
  default: GlassmorphismConfig;
  strong: GlassmorphismConfig;
  subtle: GlassmorphismConfig;
  primary: GlassmorphismConfig;
  accent: GlassmorphismConfig;
}

// Component size variants
export type SizeVariant = 'sm' | 'md' | 'lg' | 'xl';

// Button and interactive element types
export interface ButtonProps {
  variant?: 'default' | 'primary' | 'accent' | 'dark';
  size?: SizeVariant;
  children: React.ReactNode;
  disabled?: boolean;
  loading?: boolean;
  showShine?: boolean;
  showRipple?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export interface CardProps {
  variant?: 'default' | 'primary' | 'accent' | 'strong' | 'subtle';
  size?: SizeVariant;
  interactive?: boolean;
  showGlow?: boolean;
  glowColor?: string;
  children: React.ReactNode;
}

// Project and content types
export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
  category?: string;
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  location: string;
  period: string;
  description: string[];
  technologies: string[];
  current?: boolean;
}

export interface Skill {
  id: string;
  name: string;
  category: 'frontend' | 'backend' | 'tools' | 'design' | 'other';
  level: number; // 1-5
  icon?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  image?: string;
  rating?: number;
}

// Time display types
export interface TimeDisplayProps {
  className?: string;
  showLocation?: boolean;
  showTemperature?: boolean;
  timeFormat?: '12h' | '24h';
  temperatureUnit?: 'C' | 'F';
}

// Theme and layout types
export interface ThemeConfig {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  foreground: string;
  muted: string;
  border: string;
}

export interface LayoutConfig {
  containerPadding: string;
  sectionPadding: string;
  maxWidth: string;
  breakpoints: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
}

// Animation utility types
export interface StaggerConfig {
  delay: number;
  increment: number;
  direction?: 'forward' | 'reverse';
}

export interface HoverEffect {
  scale?: number;
  translateY?: number;
  rotate?: number;
  glow?: boolean;
  glowColor?: string;
  duration?: number;
  easing?: string;
}