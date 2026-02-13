import * as React from "react"
// import { Slot } from "@radix-ui/react-slot" // Wait, I didn't install radix-slot. customizing to not use it or install it.
// I'll skip Slot for now and just use standard button, or install radix-slot if I want polymorphism (asChild).
// Adding radix-slot is good practice. I'll stick to standard for now to save a step, or use simple polymorphism if needed.
// Actually, I'll allow `asChild` prop manually or just use standard.
// I'll stick to standard button for simplicity unless requested.
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow-lg shadow-primary/20 hover:bg-primary/90 hover:shadow-primary/30 hover:-translate-y-0.5",
        destructive:
          "bg-red-500 text-white shadow-sm hover:bg-red-500/90",
        outline:
          "border border-input bg-transparent hover:bg-accent hover:text-accent-foreground backdrop-blur-sm",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent/5 hover:text-accent",
        subtle: "bg-primary/5 text-primary hover:bg-primary/10", // New "Notion-like" subtle variant
        link: "text-primary underline-offset-4 hover:underline",
        premium: "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 hover:scale-[1.02] border border-white/10",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    // Simplified handling without Slot for now to avoid extra modify dep.
    const Comp = "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
