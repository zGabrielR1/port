// Accessibility utilities for enhanced user experience

import React, { useEffect, useRef, useState } from 'react';

// Focus management utilities
export class FocusManager {
  private static instance: FocusManager;
  private focusStack: HTMLElement[] = [];

  static getInstance(): FocusManager {
    if (!FocusManager.instance) {
      FocusManager.instance = new FocusManager();
    }
    return FocusManager.instance;
  }

  push(element: HTMLElement) {
    this.focusStack.push(element);
    element.focus();
  }

  pop() {
    if (this.focusStack.length > 1) {
      this.focusStack.pop();
      const previousElement = this.focusStack[this.focusStack.length - 1];
      previousElement?.focus();
    }
  }

  getCurrent(): HTMLElement | null {
    return this.focusStack[this.focusStack.length - 1] || null;
  }
}

// Keyboard navigation utilities
export const useKeyboardNavigation = (
  onEnter?: () => void,
  onEscape?: () => void,
  onArrowUp?: () => void,
  onArrowDown?: () => void,
  onArrowLeft?: () => void,
  onArrowRight?: () => void
) => {
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'Enter':
          onEnter?.();
          break;
        case 'Escape':
          onEscape?.();
          break;
        case 'ArrowUp':
          event.preventDefault();
          onArrowUp?.();
          break;
        case 'ArrowDown':
          event.preventDefault();
          onArrowDown?.();
          break;
        case 'ArrowLeft':
          event.preventDefault();
          onArrowLeft?.();
          break;
        case 'ArrowRight':
          event.preventDefault();
          onArrowRight?.();
          break;
      }
    };

    element.addEventListener('keydown', handleKeyDown);
    return () => element.removeEventListener('keydown', handleKeyDown);
  }, [onEnter, onEscape, onArrowUp, onArrowDown, onArrowLeft, onArrowRight]);

  return elementRef;
};

// Screen reader announcements
export class ScreenReaderAnnouncer {
  private static instance: ScreenReaderAnnouncer;
  private announcer: HTMLElement | null = null;

  static getInstance(): ScreenReaderAnnouncer {
    if (!ScreenReaderAnnouncer.instance) {
      ScreenReaderAnnouncer.instance = new ScreenReaderAnnouncer();
    }
    return ScreenReaderAnnouncer.instance;
  }

  private init() {
    if (this.announcer) return;

    this.announcer = document.createElement('div');
    this.announcer.setAttribute('aria-live', 'polite');
    this.announcer.setAttribute('aria-atomic', 'true');
    this.announcer.style.position = 'absolute';
    this.announcer.style.left = '-10000px';
    this.announcer.style.width = '1px';
    this.announcer.style.height = '1px';
    this.announcer.style.overflow = 'hidden';

    document.body.appendChild(this.announcer);
  }

  announce(message: string, priority: 'polite' | 'assertive' = 'polite') {
    this.init();
    if (!this.announcer) return;

    this.announcer.setAttribute('aria-live', priority);
    this.announcer.textContent = message;

    // Clear the message after a delay to allow for re-announcements
    setTimeout(() => {
      if (this.announcer) {
        this.announcer.textContent = '';
      }
    }, 1000);
  }
}

// Focus trap for modals and dialogs
export const useFocusTrap = (isActive: boolean) => {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!isActive || !containerRef.current) return;

    const container = containerRef.current;
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    const handleTabKey = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return;

      if (event.shiftKey) {
        if (document.activeElement === firstElement) {
          event.preventDefault();
          lastElement?.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          event.preventDefault();
          firstElement?.focus();
        }
      }
    };

    container.addEventListener('keydown', handleTabKey);

    // Focus first element when trap becomes active
    firstElement?.focus();

    return () => {
      container.removeEventListener('keydown', handleTabKey);
    };
  }, [isActive]);

  return containerRef;
};

// Reduced motion detection
export const usePrefersReducedMotion = () => {
  const mediaQuery = useRef<MediaQueryList | null>(null);

  useEffect(() => {
    mediaQuery.current = window.matchMedia('(prefers-reduced-motion: reduce)');
  }, []);

  return mediaQuery.current?.matches ?? false;
};

// High contrast mode detection
export const usePrefersHighContrast = () => {
  const [prefersHighContrast, setPrefersHighContrast] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-contrast: high)');
    setPrefersHighContrast(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersHighContrast(event.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return prefersHighContrast;
};

// Color scheme detection
export const usePrefersColorScheme = () => {
  const [colorScheme, setColorScheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setColorScheme(mediaQuery.matches ? 'dark' : 'light');

    const handleChange = (event: MediaQueryListEvent) => {
      setColorScheme(event.matches ? 'dark' : 'light');
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return colorScheme;
};

// Skip link component
export const SkipLink = ({ href = "#main", children = "Skip to main content" }: { href?: string; children?: string }) => {
  return React.createElement('a', {
    href,
    className: "sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md focus:shadow-lg"
  }, children);
};

// ARIA utilities
export const createAriaProps = (options: {
  label?: string;
  labelledBy?: string;
  describedBy?: string;
  expanded?: boolean;
  hasPopup?: boolean | 'menu' | 'listbox' | 'tree' | 'grid' | 'dialog';
  current?: boolean | 'page' | 'step' | 'location' | 'date' | 'time';
  selected?: boolean;
  checked?: boolean;
  pressed?: boolean;
  disabled?: boolean;
  required?: boolean;
  invalid?: boolean;
  busy?: boolean;
  live?: 'off' | 'assertive' | 'polite';
  atomic?: boolean;
  relevant?: 'additions' | 'removals' | 'text' | 'all';
}) => {
  const ariaProps: Record<string, any> = {};

  if (options.label) ariaProps['aria-label'] = options.label;
  if (options.labelledBy) ariaProps['aria-labelledby'] = options.labelledBy;
  if (options.describedBy) ariaProps['aria-describedby'] = options.describedBy;
  if (options.expanded !== undefined) ariaProps['aria-expanded'] = options.expanded;
  if (options.hasPopup !== undefined) ariaProps['aria-haspopup'] = options.hasPopup;
  if (options.current !== undefined) ariaProps['aria-current'] = options.current;
  if (options.selected !== undefined) ariaProps['aria-selected'] = options.selected;
  if (options.checked !== undefined) ariaProps['aria-checked'] = options.checked;
  if (options.pressed !== undefined) ariaProps['aria-pressed'] = options.pressed;
  if (options.disabled !== undefined) ariaProps['aria-disabled'] = options.disabled;
  if (options.required !== undefined) ariaProps['aria-required'] = options.required;
  if (options.invalid !== undefined) ariaProps['aria-invalid'] = options.invalid;
  if (options.busy !== undefined) ariaProps['aria-busy'] = options.busy;
  if (options.live !== undefined) ariaProps['aria-live'] = options.live;
  if (options.atomic !== undefined) ariaProps['aria-atomic'] = options.atomic;
  if (options.relevant !== undefined) ariaProps['aria-relevant'] = options.relevant;

  return ariaProps;
};

// Semantic HTML role utilities
export const roles = {
  banner: 'banner',
  navigation: 'navigation',
  main: 'main',
  complementary: 'complementary',
  contentinfo: 'contentinfo',
  search: 'search',
  dialog: 'dialog',
  alertdialog: 'alertdialog',
  menu: 'menu',
  menubar: 'menubar',
  menuitem: 'menuitem',
  tablist: 'tablist',
  tab: 'tab',
  tabpanel: 'tabpanel',
  listbox: 'listbox',
  option: 'option',
  button: 'button',
  link: 'link',
  heading: 'heading',
  img: 'img',
  presentation: 'presentation',
} as const;

// Screen reader only text
export const SrOnly = ({ children }: { children: React.ReactNode }) => {
  return React.createElement('span', { className: "sr-only" }, children);
};

// Visually hidden but accessible text
export const VisuallyHidden = ({ children }: { children: React.ReactNode }) => {
  const style = {
    position: 'absolute' as const,
    width: '1px',
    height: '1px',
    padding: '0',
    margin: '-1px',
    overflow: 'hidden',
    clip: 'rect(0, 0, 0, 0)',
    whiteSpace: 'nowrap' as const,
    border: '0'
  };

  return React.createElement('span', { style }, children);
};