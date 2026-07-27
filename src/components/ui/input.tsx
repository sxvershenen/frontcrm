import type { InputHTMLAttributes } from "react"

import { cn } from "@/lib/utils"

export type InputProps = InputHTMLAttributes<HTMLInputElement>

export function Input({ className, type, ...props }: InputProps) {
  return (
    <input
      type={type}
      className={cn(
        "border-input bg-background placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground flex h-9 w-full min-w-0 rounded-md border px-3 py-1 text-sm shadow-xs transition-[color,box-shadow] outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-3",
        "aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40",
        className,
      )}
      {...props}
    />
  )
}
