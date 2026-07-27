import type { KeyboardEvent, ReactNode } from "react"
import { ArrowDown, ArrowUp, ChevronsUpDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import type { SortDescriptor, SortDirection } from "@/core/data"
import { cn } from "@/lib/utils"

import { DataViewState, type DataViewStateKind } from "./data-view-state"

export type DataTableColumn<TRow> = {
  id: string
  header: ReactNode
  cell: (row: TRow) => ReactNode
  sortable?: boolean
  sortField?: string
  align?: "left" | "center" | "right"
  width?: string
  className?: string
  headerClassName?: string
}

export type DataTableProps<TRow> = {
  rows: readonly TRow[]
  columns: readonly DataTableColumn<TRow>[]
  rowKey: (row: TRow) => string
  sort?: SortDescriptor | null
  onSortChange?: (sort: SortDescriptor) => void
  onRowClick?: (row: TRow) => void
  rowLabel?: (row: TRow) => string
  state?: "ready" | DataViewStateKind
  stateTitle?: ReactNode
  stateDescription?: ReactNode
  stateAction?: ReactNode
  caption?: string
  className?: string
}

function nextDirection(current: SortDirection | undefined): SortDirection {
  return current === "asc" ? "desc" : "asc"
}

function SortIcon({ direction }: { direction?: SortDirection }) {
  if (direction === "asc") return <ArrowUp aria-hidden="true" />
  if (direction === "desc") return <ArrowDown aria-hidden="true" />
  return <ChevronsUpDown aria-hidden="true" />
}

export function DataTable<TRow>({
  rows,
  columns,
  rowKey,
  sort,
  onSortChange,
  onRowClick,
  rowLabel,
  state = "ready",
  stateTitle,
  stateDescription,
  stateAction,
  caption,
  className,
}: DataTableProps<TRow>) {
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

  function activateRow(row: TRow) {
    onRowClick?.(row)
  }

  function handleRowKeyDown(event: KeyboardEvent<HTMLTableRowElement>, row: TRow) {
    if (!onRowClick) return
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault()
      activateRow(row)
    }
  }

  return (
    <div className={cn("overflow-hidden rounded-xl border bg-card", className)}>
      <Table>
        {caption ? <TableCaption className="sr-only">{caption}</TableCaption> : null}
        <TableHeader className="bg-muted/40">
          <TableRow className="hover:bg-transparent">
            {columns.map((column) => {
              const sortField = column.sortField ?? column.id
              const activeDirection = sort?.field === sortField ? sort.direction : undefined
              const alignment =
                column.align === "right"
                  ? "text-right"
                  : column.align === "center"
                    ? "text-center"
                    : "text-left"

              return (
                <TableHead
                  key={column.id}
                  className={cn(alignment, column.headerClassName)}
                  style={column.width ? { width: column.width } : undefined}
                  aria-sort={
                    activeDirection === "asc"
                      ? "ascending"
                      : activeDirection === "desc"
                        ? "descending"
                        : column.sortable
                          ? "none"
                          : undefined
                  }
                >
                  {column.sortable && onSortChange ? (
                    <Button
                      variant="ghost"
                      size="sm"
                      className={cn(
                        "-ml-2 h-8 px-2 text-xs",
                        column.align === "right" && "ml-auto -mr-2",
                      )}
                      onClick={() =>
                        onSortChange({
                          field: sortField,
                          direction: nextDirection(activeDirection),
                        })
                      }
                    >
                      {column.header}
                      <SortIcon direction={activeDirection} />
                    </Button>
                  ) : (
                    column.header
                  )}
                </TableHead>
              )
            })}
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={rowKey(row)}
              tabIndex={onRowClick ? 0 : undefined}
              aria-label={rowLabel?.(row)}
              className={cn(
                onRowClick &&
                  "cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring",
              )}
              onClick={onRowClick ? () => activateRow(row) : undefined}
              onKeyDown={onRowClick ? (event: KeyboardEvent<HTMLTableRowElement>) => handleRowKeyDown(event, row) : undefined}
            >
              {columns.map((column) => {
                const alignment =
                  column.align === "right"
                    ? "text-right"
                    : column.align === "center"
                      ? "text-center"
                      : "text-left"

                return (
                  <TableCell key={column.id} className={cn(alignment, column.className)}>
                    {column.cell(row)}
                  </TableCell>
                )
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
