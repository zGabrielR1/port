import React from 'react';
import { cn } from '@/lib/utils';
import { VariantProps, cva } from 'class-variance-authority';

const glassmorphismButtonVariants = cva(
  [
    "relative",
    "inline-flex",
    "items-center",
    "justify-center",
    "font-medium",
    "backdrop-blur-md",
    "border",
    "rounded-2xl",
    "shadow-lg",
    "transition-all",
    "duration-300",
    "ease-out",
    "group",
    "overflow-hidden",
    "transform-gpu",
    "cursor-pointer",
    "select-none",
    "focus:outline-none",
    "focus:ring-2",
    "focus:ring-offset-2",
    "active:scale-95",
    "hover:scale-105",
  ],
  {
    variants: {
      variant: {
        default: [
          "bg-white/20",
          "border-white/30",
          "text-white",
          "shadow-black/10",
          "hover:bg-white/30",
          "hover:border-white/50",
          "hover:shadow-xl",
          "hover:shadow-black/20",
          "focus:ring-white/50",
        ],
        primary: [
          "bg-primary/20",
          "border-primary/30",
          "text-white",
          "shadow-primary/10",
          "hover:bg-primary/30",
          "hover:border-primary/50",
          "hover:shadow-xl",
          "hover:shadow-primary/25",
          "focus:ring-primary/50",
        ],
        accent: [
          "bg-accent/20",
          "border-accent/30",
          "text-white",
          "shadow-accent/10",
          "hover:bg-accent/30",
          "hover:border-accent/50",
          "hover:shadow-xl",
          "hover:shadow-accent/25",
          "focus:ring-accent/50",
        ],
        dark: [
          "bg-black/20",
          "border-white/20",
          "text-white",
          "shadow-black/20",
          "hover:bg-black/30",
          "hover:border-white/40",
          "hover:shadow-xl",
          "hover:shadow-black/30",
          "focus:ring-white/30",
        ],
      },
      size: {
        sm: ["px-4", "py-2", "text-sm", "rounded-lg"],
        md: ["px-6", "py-3", "text-base", "rounded-xl"],
        lg: ["px-8", "py-4", "text-lg", "rounded-2xl"],
        xl: ["px-10", "py-5", "text-xl", "rounded-2xl"],
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

export interface GlassmorphismButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof glassmorphismButtonVariants> {
  children: React.ReactNode;
  showShine?: boolean;
  showRipple?: boolean;
}

const GlassmorphismButton = React.forwardRef<
  HTMLButtonElement,
  GlassmorphismButtonProps
>(
  (
    {
      className,
      variant,
      size,
      children,
      showShine = true,
      showRipple = true,
      ...props
    },
    ref
  ) => {
    const [ripples, setRipples] = React.useState<
      Array<{ id: number; x: number; y: number }>
    >([]);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      if (showRipple) {
        const rect = event.currentTarget.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        const newRipple = { id: Date.now(), x, y };

        setRipples((prev) => [...prev, newRipple]);

        // Remove ripple after animation
        setTimeout(() => {
          setRipples((prev) => prev.filter((ripple) => ripple.id !== newRipple.id));
        }, 600);
      }

      if (props.onClick) {
        props.onClick(event);
      }
    };

    return (
      <button
        ref={ref}
        className={cn(glassmorphismButtonVariants({ variant, size }), className)}
        onClick={handleClick}
        {...props}
      >
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/5 to-transparent rounded-2xl" />

        {/* Shine effect */}
        {showShine && (
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
        )}

        {/* Ripple effects */}
        {showRipple &&
          ripples.map((ripple) => (
            <div
              key={ripple.id}
              className="absolute bg-white/30 rounded-full animate-ping"
              style={{
                left: ripple.x,
                top: ripple.y,
                width: '20px',
                height: '20px',
                transformOrigin: 'center',
                animation: 'ripple 0.6s ease-out',
              }}
            />
          ))}

        {/* Content */}
        <span className="relative z-10 drop-shadow-sm">{children}</span>

        {/* Additional glow effect for enhanced visual appeal */}
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      </button>
    );
  }
);

GlassmorphismButton.displayName = 'GlassmorphismButton';

export { GlassmorphismButton, glassmorphismButtonVariants };