
import React from "react";
import { cn } from "../../lib/utils";

const Button = ({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  children,
  ...props
}) => {
  const Comp = asChild ? "div" : "button";
  
  return (
    <Comp
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        {
          "bg-primary text-primary-foreground hover:bg-primary/90": variant === "default",
          "bg-destructive text-destructive-foreground hover:bg-destructive/90": variant === "destructive",
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground": variant === "outline",
          "bg-secondary text-secondary-foreground hover:bg-secondary/80": variant === "secondary",
          "bg-transparent hover:bg-accent hover:text-accent-foreground": variant === "ghost",
          "bg-transparent hover:bg-transparent text-primary hover:text-primary/80 underline-offset-4 hover:underline": variant === "link",
          "h-10 px-4 py-2": size === "default",
          "h-9 rounded px-3": size === "sm",
          "h-11 rounded px-8": size === "lg",
          "h-8 rounded px-2": size === "xs",
        },
        className
      )}
      {...props}
    >
      {children}
    </Comp>
  );
};

export { Button };
