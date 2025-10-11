import React from 'react';
import { cn } from '../../lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  fullWidth?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', loading, fullWidth, children, disabled, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center gap-2 font-medium transition-all duration-100 focus:outline-none focus:ring-3 disabled:opacity-50 disabled:cursor-not-allowed';

    const variants = {
      primary: 'bg-primary-500 hover:bg-primary-600 active:bg-primary-700 text-white shadow-sm hover:shadow-md focus:ring-primary-500/30',
      secondary: 'bg-neutral-200 hover:bg-neutral-300 active:bg-neutral-400 text-neutral-900 border border-neutral-300 focus:ring-primary-500/30',
      ghost: 'bg-transparent hover:bg-neutral-100 active:bg-neutral-200 text-neutral-900 focus:ring-primary-500/30',
      danger: 'bg-error-500 hover:bg-error-600 active:bg-error-700 text-white shadow-sm hover:shadow-md focus:ring-error-500/30',
    };

    const sizes = {
      sm: 'px-3 py-1.5 text-sm rounded-md',
      md: 'px-4 py-2 text-base rounded-lg',
      lg: 'px-6 py-3 text-lg rounded-xl',
    };

    return (
      <button
        ref={ref}
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          fullWidth && 'w-full',
          className
        )}
        disabled={disabled || loading}
        {...props}
      >
        {loading && <span className="spinner" />}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
