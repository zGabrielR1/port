// Performance utilities for optimizing bundle size and runtime performance

import { useEffect, useRef, useCallback } from 'react';

// Lazy loading hook for components
export const useLazyLoad = (callback: () => void, options?: IntersectionObserverInit) => {
  const targetRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = targetRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            callback();
            observer.disconnect();
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
        ...options,
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [callback, options]);

  return targetRef;
};

// Debounced callback hook
export const useDebounce = <T extends (...args: any[]) => void>(
  callback: T,
  delay: number
): T => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  return useCallback(
    ((...args) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        callback(...args);
      }, delay);
    }) as T,
    [callback, delay]
  );
};

// Throttled callback hook
export const useThrottle = <T extends (...args: any[]) => void>(
  callback: T,
  delay: number
): T => {
  const lastCallRef = useRef<number>(0);

  return useCallback(
    ((...args) => {
      const now = Date.now();
      if (now - lastCallRef.current >= delay) {
        lastCallRef.current = now;
        callback(...args);
      }
    }) as T,
    [callback, delay]
  );
};

// Memory usage monitoring
export class MemoryMonitor {
  private static instance: MemoryMonitor;
  private memoryHistory: number[] = [];
  private readonly maxHistorySize = 100;

  static getInstance(): MemoryMonitor {
    if (!MemoryMonitor.instance) {
      MemoryMonitor.instance = new MemoryMonitor();
    }
    return MemoryMonitor.instance;
  }

  getMemoryUsage(): number | null {
    // @ts-ignore - performance.memory is not in TypeScript definitions
    const memory = performance.memory;
    if (!memory) return null;

    const usedMB = memory.usedJSHeapSize / (1024 * 1024);
    this.memoryHistory.push(usedMB);

    if (this.memoryHistory.length > this.maxHistorySize) {
      this.memoryHistory.shift();
    }

    return usedMB;
  }

  getAverageMemoryUsage(): number | null {
    if (this.memoryHistory.length === 0) return null;
    return this.memoryHistory.reduce((sum, mem) => sum + mem, 0) / this.memoryHistory.length;
  }

  shouldOptimize(): boolean {
    const avgMemory = this.getAverageMemoryUsage();
    return avgMemory ? avgMemory > 50 : false; // 50MB threshold
  }
}

// WebGL performance monitoring
export class WebGLMonitor {
  private gl: WebGLRenderingContext | null = null;

  setContext(gl: WebGLRenderingContext) {
    this.gl = gl;
  }

  getParameter(param: number): any {
    if (!this.gl) return null;
    return this.gl.getParameter(param);
  }

  getCapabilities() {
    if (!this.gl) return null;

    return {
      maxTextureSize: this.getParameter(this.gl.MAX_TEXTURE_SIZE),
      maxRenderbufferSize: this.getParameter(this.gl.MAX_RENDERBUFFER_SIZE),
      maxViewportDims: this.getParameter(this.gl.MAX_VIEWPORT_DIMS),
      renderer: this.getParameter(this.gl.RENDERER),
      vendor: this.getParameter(this.gl.VENDOR),
      version: this.getParameter(this.gl.VERSION),
      shadingLanguageVersion: this.getParameter(this.gl.SHADING_LANGUAGE_VERSION),
    };
  }

  checkSupport(): boolean {
    if (!this.gl) return false;

    // Check for required extensions
    const requiredExtensions = [
      'OES_texture_float',
      'OES_standard_derivatives',
    ];

    return requiredExtensions.every(ext => {
      const supported = this.gl!.getExtension(ext);
      if (!supported) {
        console.warn(`WebGL extension ${ext} not supported`);
      }
      return supported;
    });
  }
}

// Singleton instances
export const memoryMonitor = MemoryMonitor.getInstance();
export const webglMonitor = new WebGLMonitor();

// Resource preloader for critical assets
export class ResourcePreloader {
  private static instance: ResourcePreloader;
  private loadedResources = new Set<string>();

  static getInstance(): ResourcePreloader {
    if (!ResourcePreloader.instance) {
      ResourcePreloader.instance = new ResourcePreloader();
    }
    return ResourcePreloader.instance;
  }

  preloadImage(src: string): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.loadedResources.has(src)) {
        resolve();
        return;
      }

      const img = new Image();
      img.onload = () => {
        this.loadedResources.add(src);
        resolve();
      };
      img.onerror = reject;
      img.src = src;
    });
  }

  preloadFont(fontUrl: string, fontFamily: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const font = new FontFace(fontFamily, `url(${fontUrl})`);
      font.load().then(() => {
        document.fonts.add(font);
        this.loadedResources.add(fontUrl);
        resolve();
      }).catch(reject);
    });
  }

  async preloadCriticalResources() {
    interface Resource {
      type: 'image' | 'font';
      url: string;
      family?: string;
    }

    const criticalResources: Resource[] = [
      // Add critical images, fonts, etc.
    ];

    const promises = criticalResources.map(resource => {
      if (resource.type === 'image') {
        return this.preloadImage(resource.url);
      }
      if (resource.type === 'font' && resource.family) {
        return this.preloadFont(resource.url, resource.family);
      }
      return Promise.resolve();
    });

    await Promise.all(promises);
  }
}

// Bundle size optimization utilities
export const createOptimizedImport = <T extends Record<string, any>>(
  importFn: () => Promise<T>
): T => {
  const proxy = {} as T;

  // Use Object.defineProperty to create dynamic properties
  return new Proxy(proxy, {
    get: (target, prop) => {
      if (typeof prop === 'string') {
        return (...args: any[]) => {
          return importFn().then(module => {
            const value = module[prop];
            return typeof value === 'function' ? value(...args) : value;
          });
        };
      }
      return undefined;
    },
  });
};

// Dynamic import with fallback
export const loadComponent = async <T>(
  importFn: () => Promise<{ default: T }>,
  fallback?: T
): Promise<T> => {
  try {
    const module = await importFn();
    return module.default;
  } catch (error) {
    console.warn('Failed to load component, using fallback:', error);
    return fallback || ({} as T);
  }
};

// Performance measurement utilities
export const measurePerformance = async <T>(
  name: string,
  fn: () => Promise<T> | T
): Promise<T> => {
  const start = performance.now();
  const result = await fn();
  const end = performance.now();

  console.log(`${name} took ${end - start}ms`);
  return result;
};

// Connection speed detection
export const getConnectionSpeed = (): 'slow' | 'fast' => {
  // @ts-ignore - navigator.connection is not in TypeScript definitions
  const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;

  if (!connection) return 'fast';

  const slowConnections = ['slow-2g', '2g'];
  return slowConnections.includes(connection.effectiveType) ? 'slow' : 'fast';
};

// Adaptive quality based on device capabilities
export const getAdaptiveQuality = () => {
  const connection = getConnectionSpeed();
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  const hasWebGL = (() => {
    try {
      const canvas = document.createElement('canvas');
      return !!(canvas.getContext('webgl') || canvas.getContext('experimental-webgl'));
    } catch (e) {
      return false;
    }
  })();

  if (connection === 'slow' || isMobile || !hasWebGL) {
    return 'low';
  }

  return 'high';
};