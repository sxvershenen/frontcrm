import type { KeyboardEvent, ReactNode } from "react"

import { cn } from "@/lib/utils"

import { DataViewState, type DataViewStateKind } from "./data-view-state"

export type MobileListProps<TRow> = {
  rows: readonly TRow[]
  rowKey: (row: TRow) => string
  renderItem: (row: TRow) => ReactNode
  onItemClick?: (row: TRow) => void
  itemLabel?: (row: TRow) => string
  state?: "ready" | DataViewStateKind
  stateTitle?: ReactNode
  stateDescription?: ReactNode
  stateAction?: ReactNode
  className?: string
  itemClassName?: string
}

export function MobileList<TRow>({
  rows,
  rowKey,
  renderItem,
  onItemClick,
  itemLabel,
  state = "ready",
  stateTitle,
  stateDescription,
  stateAction,
  className,
  itemClassName,
}: MobileListProps<TRow>) {
  if (state !== "ready") {
    return (
      <div className={cn("rounded-xl border bg-card", className)}>
        <DataViewState
          kind={state}
          title={stateTitle}
          description={stateDescription}
          action={stateAction}
        />
      </div>
    )
  }

  function handleKeyDown(event: KeyboardEvent<HTMLElement>, row: TRow) {
    if (!onItemClick) return
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault()
      onItemClick(row)
    }
  }

  return (
    <div role="list" className={cn("grid gap-2", className)}>
      {rows.map((row) => (
        <div key={rowKey(row)} role="listitem">
          <article
            role={onItemClick ? "button" : undefined}
            tabIndex={onItemClick ? 0 : undefined}
            aria-label={itemLabel?.(row)}
            className={cn(
              "bg-card rounded-xl border p-4 text-left shadow-xs",
              onItemClick &&
                "cursor-pointer transition-colors hover:bg-muted/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              itemClassName,
            )}
            onClick={onItemClick ? () => onItemClick(row) : undefined}
            onKeyDown={
              onItemClick
                ? (event: KeyboardEvent<HTMLElement>) => handleKeyDown(event, row)
                : undefined
            }
          >
            {renderItem(row)}
          </article>
        </div>
      ))}
    </div>
  )
}
