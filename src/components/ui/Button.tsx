import React, { type ButtonHTMLAttributes } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  children: React.ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
  children,
  ...props
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center gap-x-2 font-bold rounded-xl transition-all active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none';
  
  const variants = {
    primary: 'bg-[#295BF2] text-white hover:bg-[#295BF2]/90',
    secondary: 'bg-white border-2 border-[#295BF2] text-[#295BF2] hover:bg-[#295BF2]/5',
    danger: 'bg-red-500 text-white hover:bg-red-600',
    ghost: 'bg-transparent text-brand-navy hover:bg-slate-100',
  };

  const sizes = {
    sm: 'py-2 px-3 text-xs',
    md: 'py-2.5 px-4 text-sm',
    lg: 'py-3 px-6 text-base',
  };

  const classes = `
    ${baseStyles}
    ${variants[variant]}
    ${sizes[size]}
    ${fullWidth ? 'w-full' : ''}
    ${className}
  `.trim().replace(/\s+/g, ' ');

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
