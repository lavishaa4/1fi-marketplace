import type { ButtonHTMLAttributes, ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  isLoading?: boolean;
  fullWidth?: boolean;
  withArrow?: boolean;
  children: ReactNode;
}

const base =
  'inline-flex items-center justify-center gap-2 rounded-full px-6 text-[16px] font-bold transition-colors disabled:cursor-not-allowed disabled:opacity-45';

const variants: Record<Variant, string> = {
  primary: 'h-[56px] bg-brand text-white hover:bg-brand-dark',
  secondary: 'h-[52px] border border-brand-border bg-white text-brand hover:bg-brand-soft',
  ghost: 'h-11 text-brand hover:bg-brand-soft',
};

export function Button({
  variant = 'primary',
  isLoading = false,
  fullWidth = false,
  withArrow = false,
  children,
  className = '',
  disabled,
  ...rest
}: ButtonProps) {
  return (
    <button
      type="button"
      disabled={disabled || isLoading}
      className={`${base} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...rest}
    >
      {isLoading && (
        <span
          aria-hidden
          className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white"
        />
      )}
      {children}
      {withArrow && !isLoading && (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <path d="M5 12h13M13 6l6 6-6 6" />
        </svg>
      )}
    </button>
  );
}
