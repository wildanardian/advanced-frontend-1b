import { type ButtonHTMLAttributes, type ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/cn';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 rounded-full px-3 py-1 lg:px-6.5 lg:py-2.5 text-xs lg:text-base transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black/40 cursor-pointer',
  {
    variants: {
      variant: {
        primary: 'bg-primary-main-400 text-white hover:bg-primary-main-200',
        secondary: 'bg-neutral-800 text-white hover:bg-neutral-700',
        light: 'bg-white text-black hover:bg-neutral-200',
        ghost: 'bg-transparent text-white hover:bg-white/10',
        icon: 'bg-transparent text-white rounded-full hover:bg-white/10',
        outline: 'bg-transparent border border-primary-main text-primary-main hover:bg-primary-main-100 hover:text-white',
        body: 'bg-background-body text-white hover:bg-background-page-header',
        watch: 'bg-transparent text-white hover:transparent cursor-pointer',
      },
      size: {
        sm: 'text-xs px-2 py-1 rounded-md md:text-sm md:px-3 md:py-1.5',
        md: 'text-sm px-3 py-1 rounded-lg md:text-base md:px-4 md:py-2',
        lg: 'text-base px-4 py-2 rounded-full md:text-lg md:px-5 md:py-2.5',
        pill: 'text-sm px-3 py-1 rounded-full md:text-base md:px-6 md:py-2.5',
        iconOnly: 'p-1 rounded-full md:p-2 border border-secondary-100 text-secondary-100',
        outline: 'text-sm md:text-base rounded-full',
        body: 'px-4.5 py-1.5 rounded-full text-xs md:text-base',
        watch: 'text-sm !px-0 !py-0',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
}

export function Button({
  variant,
  size,
  icon,
  iconPosition = 'left',
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button className={cn(buttonVariants({ variant, size }), className)} {...props}>
      {icon && iconPosition === 'left' && <span className="mr-1">{icon}</span>}
      {children}
      {icon && iconPosition === 'right' && <span className="ml-1">{icon}</span>}
    </button>
  );
}