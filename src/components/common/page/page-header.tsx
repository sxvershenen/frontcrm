import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

export type PageHeaderProps = {
  title: ReactNode
  description?: ReactNode
  eyebrow?: ReactNode
  actions?: ReactNode
  meta?: ReactNode
  className?: string
}

export function PageHeader({
  title,
  description,
  eyebrow,
  actions,
  meta,
  className,
}: PageHeaderProps) {
  return (
    <header
      className={cn(
        "flex min-h-18 flex-col gap-4 border-b px-4 py-4 md:flex-row md:items-center md:justify-between md:px-6",
        className,
      )}
    >
      <div className="min-w-0 space-y-1">
        {eyebrow ? (
          <div className="text-muted-foreground text-xs font-medium uppercase tracking-wide">
            {eyebrow}
          </div>
        ) : null}
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="truncate text-xl font-semibold tracking-tight md:text-2xl">{title}</h1>
          {meta}
        </div>
        {description ? (
          <div className="text-muted-foreground max-w-3xl text-sm">{description}</div>
        ) : null}
      </div>
      {actions ? <div className="flex shrink-0 items-center gap-2">{actions}</div> : null}
    </header>
  )
}
