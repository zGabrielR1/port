// Centralized animation utilities for consistent interactions across components

import { AnimationConfig, StaggerConfig, HoverEffect } from './types';
import { TIMING_CONFIG } from './design-system';

// Keyframe animations for consistent motion design
export const KEYFRAMES = {
  // Entry animations
  fadeIn: `
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
  `,

  slideInUp: `
    @keyframes slideInUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `,

  slideInDown: `
    @keyframes slideInDown {
      from {
        opacity: 0;
        transform: translateY(-30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `,

  scaleIn: `
    @keyframes scaleIn {
      from {
        opacity: 0;
        transform: scale(0.9);
      }
      to {
        opacity: 1;
        transform: scale(1);
      }
    }
  `,

  // Interactive animations
  lift: `
    @keyframes lift {
      from { transform: translateY(0) scale(1); }
      to { transform: translateY(-8px) scale(1.02); }
    }
  `,

  magnetic: `
    @keyframes magnetic {
      from { transform: translateY(0) scale(1) rotate(0deg); }
      to { transform: translateY(-4px) scale(1.03) rotate(1deg); }
    }
  `,

  // Effect animations
  shimmer: `
    @keyframes shimmer {
      0% { transform: translateX(-100%); opacity: 0; }
      50% { opacity: 1; }
      100% { transform: translateX(100%); opacity: 0; }
    }
  `,

  glow: `
    @keyframes glow {
      0%, 100% {
        box-shadow: 0 0 5px rgba(79, 156, 249, 0.2);
      }
      50% {
        box-shadow: 0 0 20px rgba(79, 156, 249, 0.8), 0 0 30px rgba(79, 156, 249, 0.4);
      }
    }
  `,

  ripple: `
    @keyframes ripple {
      0% {
        opacity: 1;
        transform: scale(0);
      }
      100% {
        opacity: 0;
        transform: scale(4);
      }
    }
  `,
};

// Animation utility functions
export const createStaggerAnimation = (config: StaggerConfig) => {
  return {
    animation: 'slideInUp 0.6s ease-out both',
    style: (index: number) => ({
      animationDelay: `${config.delay + (index * config.increment)}s`,
    }),
  };
};

export const createHoverEffect = (effect: HoverEffect) => {
  const {
    scale = 1,
    translateY = 0,
    rotate = 0,
    duration = TIMING_CONFIG.normal,
    easing = 'ease-out'
  } = effect;

  return {
    transition: `transform ${duration}s ${easing}`,
    '&:hover': {
      transform: `translateY(${translateY}px) scale(${scale}) rotate(${rotate}deg)`,
    },
  };
};

// Intersection Observer for scroll-triggered animations
export class ScrollAnimator {
  private observer: IntersectionObserver;
  private elements: Map<Element, { animation: string; threshold: number }>;

  constructor() {
    this.elements = new Map();
    this.observer = new IntersectionObserver(
      this.handleIntersection.bind(this),
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    );
  }

  observe(element: Element, animation: string, threshold = 0.1) {
    this.elements.set(element, { animation, threshold });
    this.observer.observe(element);
  }

  unobserve(element: Element) {
    this.elements.delete(element);
    this.observer.unobserve(element);
  }

  private handleIntersection(entries: IntersectionObserverEntry[]) {
    entries.forEach(entry => {
      const element = entry.target;
      const config = this.elements.get(element);

      if (config && entry.isIntersecting) {
        const htmlElement = element as HTMLElement;
        htmlElement.classList.add('animate-in');
        // Add the animation style
        htmlElement.style.animation = config.animation;
        // Unobserve after animation starts
        setTimeout(() => {
          this.unobserve(element);
        }, 1000);
      }
    });
  }

  disconnect() {
    this.observer.disconnect();
    this.elements.clear();
  }
}

// Singleton instance for global scroll animations
export const scrollAnimator = new ScrollAnimator();

// Performance monitoring for animations
export class AnimationMonitor {
  private frameCount = 0;
  private lastTime = Date.now();
  private fps = 60;

  start() {
    const measure = () => {
      this.frameCount++;
      if (this.frameCount % 60 === 0) {
        const now = Date.now();
        this.fps = 1000 / (now - this.lastTime) * 60;
        this.lastTime = now;

        // Reduce animation complexity if FPS is low
        if (this.fps < 30) {
          this.reduceComplexity();
        }
      }
      requestAnimationFrame(measure);
    };
    requestAnimationFrame(measure);
  }

  getFPS() {
    return this.fps;
  }

  private reduceComplexity() {
    // Reduce animation complexity for better performance
    document.documentElement.style.setProperty('--animation-complexity', '0.5');
  }
}

// Singleton instance for animation monitoring
export const animationMonitor = new AnimationMonitor();

// Utility for creating smooth transitions
export const createTransition = (
  properties: string[],
  duration = TIMING_CONFIG.normal,
  easing = 'ease-out'
) => {
  return properties.map(prop => `${prop} ${duration}s ${easing}`).join(', ');
};

// Predefined transition combinations
export const TRANSITIONS = {
  transform: createTransition(['transform']),
  opacity: createTransition(['opacity']),
  all: createTransition(['all']),
  colors: createTransition(['color', 'background-color', 'border-color']),
  layout: createTransition(['width', 'height', 'margin', 'padding']),
};

// Reduced motion utilities
export const prefersReducedMotion = () => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

export const createReducedMotionVariant = (original: string, reduced: string) => {
  return prefersReducedMotion() ? reduced : original;
};