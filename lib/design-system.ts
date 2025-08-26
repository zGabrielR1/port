// Centralized design system configuration for consistent styling across the portfolio

import { ShaderVariant, GlassmorphismVariant, TimingConfig, LayoutConfig, AnimationConfig } from './types';

// Animation timing configuration
export const TIMING_CONFIG: TimingConfig = {
  fast: 0.15,
  normal: 0.3,
  slow: 0.5,
};

// Layout configuration
export const LAYOUT_CONFIG: LayoutConfig = {
  containerPadding: 'px-4 sm:px-6 lg:px-8',
  sectionPadding: 'py-16 sm:py-20 lg:py-24',
  maxWidth: 'max-w-7xl',
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
  },
};

// Shader variants for different use cases
export const SHADER_VARIANTS: ShaderVariant = {
  hero: { intensity: 0.15, speed: 0.8, complexity: 12, opacity: 0.9 },
  section: { intensity: 0.08, speed: 0.6, complexity: 8, opacity: 0.5 },
  subtle: { intensity: 0.05, speed: 0.4, complexity: 6, opacity: 0.3 },
  ambient: { intensity: 0.03, speed: 0.3, complexity: 4, opacity: 0.2 }
};

// Glassmorphism effect variants
export const GLASSMORPHISM_VARIANTS: GlassmorphismVariant = {
  default: {
    background: 'rgba(255, 255, 255, 0.05)',
    border: 'rgba(255, 255, 255, 0.1)',
    blur: 16,
    opacity: 0.9
  },
  strong: {
    background: 'rgba(255, 255, 255, 0.08)',
    border: 'rgba(255, 255, 255, 0.15)',
    blur: 20,
    opacity: 0.95
  },
  subtle: {
    background: 'rgba(255, 255, 255, 0.03)',
    border: 'rgba(255, 255, 255, 0.05)',
    blur: 8,
    opacity: 0.7
  },
  primary: {
    background: 'rgba(79, 156, 249, 0.1)',
    border: 'rgba(79, 156, 249, 0.2)',
    blur: 16,
    opacity: 0.9
  },
  accent: {
    background: 'rgba(245, 101, 101, 0.1)',
    border: 'rgba(245, 101, 101, 0.2)',
    blur: 16,
    opacity: 0.9
  }
};

// Color palette with CSS custom properties
export const COLOR_PALETTE = {
  // Primary colors
  primary: {
    50: 'rgb(239, 246, 255)',
    100: 'rgb(219, 234, 254)',
    400: 'rgb(96, 165, 250)',  // blue-400 (dark mode)
    500: 'rgb(79, 156, 249)',  // blue-500 (light mode)
    600: 'rgb(37, 99, 235)',
    900: 'rgb(30, 58, 138)',
  },
  // Accent colors
  accent: {
    400: 'rgb(248, 113, 113)', // red-400
    500: 'rgb(245, 101, 101)', // red-400
  },
  // Neutral colors
  neutral: {
    50: 'rgb(248, 250, 252)',   // slate-50
    100: 'rgb(241, 245, 249)',  // slate-100
    200: 'rgb(226, 232, 240)',  // slate-200
    400: 'rgb(148, 163, 184)',  // slate-400
    500: 'rgb(100, 116, 139)',  // slate-500
    800: 'rgb(30, 41, 59)',     // slate-800
    900: 'rgb(15, 23, 42)',     // slate-900
    950: 'rgb(8, 10, 12)',      // slate-950
  }
};

// Standardized spacing scale
export const SPACING_SCALE = {
  xs: '0.25rem',   // 4px
  sm: '0.5rem',    // 8px
  md: '1rem',      // 16px
  lg: '1.5rem',    // 24px
  xl: '2rem',      // 32px
  '2xl': '3rem',   // 48px
  '3xl': '4rem',   // 64px
  '4xl': '6rem',   // 96px
  '5xl': '8rem',   // 128px
};

// Standardized border radius
export const BORDER_RADIUS = {
  none: '0',
  sm: 'calc(var(--radius) - 4px)',
  md: 'calc(var(--radius) - 2px)',
  lg: 'var(--radius)',
  xl: 'calc(var(--radius) + 4px)',
  '2xl': 'calc(var(--radius) + 8px)',
  full: '9999px',
};

// Font configurations
export const FONT_CONFIG = {
  families: {
    sans: 'var(--font-geist-sans), system-ui, sans-serif',
    mono: 'var(--font-geist-mono), monospace',
    inter: 'var(--font-inter), sans-serif',
  },
  sizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem',
    '6xl': '3.75rem',
    '7xl': '4.5rem',
    '8xl': '6rem',
    '9xl': '8rem',
  },
  weights: {
    thin: '100',
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
    black: '900',
  },
};

// Animation configurations
export const ANIMATION_CONFIG: Record<string, AnimationConfig> = {
  fadeIn: {
    duration: TIMING_CONFIG.normal,
    easing: 'ease-out',
  },
  slideInUp: {
    duration: TIMING_CONFIG.normal,
    easing: 'ease-out',
  },
  slideInDown: {
    duration: TIMING_CONFIG.normal,
    easing: 'ease-out',
  },
  scaleIn: {
    duration: TIMING_CONFIG.fast,
    easing: 'ease-out',
  },
  slideInStagger: {
    duration: TIMING_CONFIG.normal,
    delay: 0.1,
    easing: 'ease-out',
  },
};

// Shadow configurations for consistent depth
export const SHADOW_CONFIG = {
  none: 'none',
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  glow: {
    primary: '0 0 20px rgba(79, 156, 249, 0.3)',
    accent: '0 0 20px rgba(245, 101, 101, 0.3)',
    white: '0 0 20px rgba(255, 255, 255, 0.2)',
  },
};

// Z-index scale for consistent layering
export const Z_INDEX = {
  base: '0',
  dropdown: '1000',
  sticky: '1020',
  fixed: '1030',
  modal: '1040',
  popover: '1050',
  tooltip: '1060',
  overlay: '1070',
} as const;

// Utility functions for consistent class generation
export const createGlassClasses = (variant: keyof GlassmorphismVariant = 'default') => {
  const config = GLASSMORPHISM_VARIANTS[variant];
  return {
    background: `backdrop-filter: blur(${config.blur}px) saturate(180%)`,
    styles: `background-color: ${config.background}; border: 1px solid ${config.border};`,
  };
};

export const createAnimationClasses = (animation: keyof typeof ANIMATION_CONFIG) => {
  const config = ANIMATION_CONFIG[animation];
  return {
    duration: `animation-duration: ${config.duration}s`,
    delay: config.delay ? `animation-delay: ${config.delay}s` : '',
    easing: config.easing ? `animation-timing-function: ${config.easing}` : '',
  };
};