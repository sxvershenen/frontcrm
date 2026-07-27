import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

export type ResponsiveDataViewProps = {
  desktop: ReactNode
  mobile: ReactNode
  className?: string
  desktopClassName?: string
  mobileClassName?: string
}

export function ResponsiveDataView({
  desktop,
  mobile,
  className,
  desktopClassName,
  mobileClassName,
}: ResponsiveDataViewProps) {
  return (
    <div className={className}>
      <div className={cn("hidden md:block", desktopClassName)}>{desktop}</div>
      <div className={cn("md:hidden", mobileClassName)}>{mobile}</div>
    </div>
  )
}
