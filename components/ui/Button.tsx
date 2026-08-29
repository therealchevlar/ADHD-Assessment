import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
}

const VARIANT_CLASSES: Record<string, string> = {
  primary: 'bg-verdigris-600 text-paper-panel hover:bg-verdigris-700 active:bg-verdigris-800 shadow-card',
  secondary: 'bg-ink text-paper-panel hover:bg-ink-soft shadow-card',
  outline: 'bg-transparent text-ink border border-ink/30 hover:border-ink/60 hover:bg-white/40',
  ghost: 'bg-transparent text-verdigris-700 hover:bg-verdigris-50',
};

const SIZE_CLASSES: Record<string, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-7 py-3.5 text-base',
};

export function Button({ variant = 'primary', size = 'md', className = '', children, ...rest }: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded font-body font-medium tracking-wide transition-colors duration-150 disabled:opacity-40 disabled:cursor-not-allowed ${VARIANT_CLASSES[variant]} ${SIZE_CLASSES[size]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}
