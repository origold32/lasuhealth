import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { Loader2Icon } from "lucide-react";
import Link from "next/link";
import Loader1 from "../loaders/loader-1";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-70 w-max",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        "default-no-hover": "bg-primary text-primary-foreground ",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/80",
        "outline-destructive": "border border-destructive-foreground bg-transparent text-destructive-foreground hover:text-destructive-foreground/80",
        outline: "border border-input bg-transparent hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/95",
        "outline-secondary": "border border-secondary bg-background text-secondary",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 sm:h-11 px-8 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-12 rounded-md px-8",
        icon: "h-10 w-10",
        "icon-sm": "h-8 w-8",
      },
      rounded: {
        default: "rounded-full",
        md: "rounded-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      rounded: "default",
    },
  }
);

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
  loadingText?: React.ReactNode;
  rightIcon?: React.ReactNode;
  leftIcon?: React.ReactNode;
}

export interface LinkButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement>, VariantProps<typeof buttonVariants> {
  loading?: boolean;
  href: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, size, rounded, loading, loadingText, asChild = false, rightIcon, leftIcon, children, ...props }, ref) => {
  return (
    <button disabled={loading} className={cn("overflow-hidden", buttonVariants({ variant, size, rounded, className }))} ref={ref} type={props.type ?? "button"} {...props}>
      {leftIcon && !loading ? <span className=" shrink-0 ml-2">{rightIcon}</span> : null}
      {loading && loadingText ? loadingText : children}
      {loading ? <Loader1 className=" ml-2" /> : null}
      {rightIcon && !loading ? <span className=" shrink-0 ml-2">{rightIcon}</span> : null}
    </button>
  );
});
Button.displayName = "Button";

const ButtonLink = React.forwardRef<HTMLAnchorElement, LinkButtonProps>(({ className, variant, size, rounded, loading, ...props }, ref) => {
  return <Link className={cn(buttonVariants({ variant, size, rounded, className }))} ref={ref} {...props} />;
});

ButtonLink.displayName = "ButtonLink";

export { Button, ButtonLink, buttonVariants };
