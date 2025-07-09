import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { Circle } from "lucide-react";

const badgeVariants = cva("inline-flex items-center rounded-full border w-max px-3 py-1 text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2", {
  variants: {
    variant: {
      default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
      secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
      destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
      outline: "text-foreground",
      friendly: " border-transparent bg-friendly text-friendly-foreground hover:bg-friendly/90 ",
      yellow: " border-transparent bg-yellow-50 border-yellow-400  text-yellow-400 hover:bg-friendly/90 ",
    },
    size: {
      default: "px-3 py-1 text-sm",
      sm: "px-3 !py-0.5 text-xs",
    },
    rounded: {
      default: " rounded-full",
      md: " rounded-md",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
    rounded: "default",
  },
});

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {
  showCircle?: boolean;
}

function Badge({ className, variant, size, rounded, showCircle = false, children, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant, size, rounded }), className)} {...props}>
      {showCircle ? <Circle fill="currentColor" size={12} className=" mr-1" /> : null} {children}
    </div>
  );
}

const BadgeDisplay = ({ type, content }: { type: string; content: React.ReactNode }) => {
  if (type == "CANCELLED") {
    return (
      <Badge size={"sm"} variant={"destructive"}>
        {content}
      </Badge>
    );
  }
  if (type == "SUCCESS") {
    return (
      <Badge size={"sm"} variant={"friendly"}>
        {content}
      </Badge>
    );
  }
  if (type == "PENDING") {
    return (
      <Badge size={"sm"} variant={"yellow"}>
        {content}
      </Badge>
    );
  }
};

export { Badge, badgeVariants, BadgeDisplay };
