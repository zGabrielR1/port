import React from 'react';
import { cn } from '@/lib/utils';
import { ShaderBackground } from './shader-background';
import { GlassmorphismCard } from './glassmorphism-button';

interface SectionWrapperProps {
  id?: string;
  children: React.ReactNode;
  className?: string;
  background?: 'black' | 'dark' | 'gradient';
  shaderVariant?: 'hero' | 'section' | 'subtle' | 'ambient';
  showShader?: boolean;
  showGradient?: boolean;
  padding?: 'sm' | 'md' | 'lg' | 'xl';
  containerSize?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

export function SectionWrapper({
  id,
  children,
  className,
  background = 'black',
  shaderVariant = 'section',
  showShader = true,
  showGradient = true,
  padding = 'lg',
  containerSize = 'lg'
}: SectionWrapperProps) {
  const backgroundClasses = {
    black: 'bg-black',
    dark: 'bg-gray-900',
    gradient: 'bg-gradient-to-b from-gray-900 via-black to-gray-900'
  };

  const paddingClasses = {
    sm: 'py-12',
    md: 'py-16',
    lg: 'py-20',
    xl: 'py-24'
  };

  const containerClasses = {
    sm: 'max-w-4xl',
    md: 'max-w-5xl',
    lg: 'max-w-6xl',
    xl: 'max-w-7xl',
    full: 'max-w-full'
  };

  return (
    <section
      id={id}
      className={cn(
        'relative overflow-hidden',
        backgroundClasses[background],
        paddingClasses[padding],
        className
      )}
    >
      {/* Shader Background */}
      {showShader && (
        <ShaderBackground variant={shaderVariant} />
      )}

      {/* Gradient Overlay */}
      {showGradient && (
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/80" />
      )}

      {/* Content Container */}
      <div className={cn(
        'relative z-10 mx-auto container-padding',
        containerSize === 'full' ? 'w-full' : containerClasses[containerSize]
      )}>
        {children}
      </div>
    </section>
  );
}

// Common section header component for consistency
interface SectionHeaderProps {
  badge?: string;
  badgeIcon?: React.ReactNode;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center' | 'right';
  className?: string;
  animated?: boolean;
}

export function SectionHeader({
  badge,
  badgeIcon,
  title,
  subtitle,
  align = 'center',
  className,
  animated = true
}: SectionHeaderProps) {
  const alignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right'
  };

  return (
    <div className={cn('mb-16', alignClasses[align], className)}>
      {/* Badge */}
      {badge && (
        <GlassmorphismCard
          variant="subtle"
          size="sm"
          className={cn(
            'inline-flex items-center px-6 py-3 rounded-full text-white text-sm font-medium mb-6',
            animated && 'transition-all duration-700 opacity-100 scale-100',
            animated && 'animate-fade-in'
          )}
        >
          {badgeIcon && <span className="mr-2">{badgeIcon}</span>}
          {badge}
        </GlassmorphismCard>
      )}

      {/* Title */}
      <h2 className={cn(
        'text-3xl sm:text-4xl font-bold text-white mb-6',
        animated && 'transition-all duration-700 delay-200',
        animated && 'animate-fade-in'
      )}>
        <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent animate-gradient-x">
          {title}
        </span>
      </h2>

      {/* Subtitle */}
      {subtitle && (
        <p className={cn(
          'text-lg text-white/80 max-w-2xl',
          align === 'center' && 'mx-auto',
          animated && 'transition-all duration-700 delay-300',
          animated && 'animate-fade-in'
        )}>
          {subtitle}
        </p>
      )}
    </div>
  );
}

// Common grid layout for consistent spacing
interface ContentGridProps {
  children: React.ReactNode;
  columns?: 1 | 2 | 3 | 4;
  gap?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  responsive?: boolean;
}

export function ContentGrid({
  children,
  columns = 1,
  gap = 'md',
  className,
  responsive = true
}: ContentGridProps) {
  const gridClasses = {
    1: 'grid-cols-1',
    2: responsive ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-2',
    3: responsive ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-3',
    4: responsive ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4' : 'grid-cols-4'
  };

  const gapClasses = {
    sm: 'gap-4',
    md: 'gap-6',
    lg: 'gap-8',
    xl: 'gap-12'
  };

  return (
    <div className={cn(
      'grid',
      gridClasses[columns],
      gapClasses[gap],
      className
    )}>
      {children}
    </div>
  );
}