import type { ReactNode } from "react"
import { ArrowUpDown, Columns3, Filter } from "lucide-react"

import { Button, type ButtonProps } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export type ToolbarControlButtonProps = Omit<ButtonProps, "children"> & {
  label: string
  icon: ReactNode
  count?: number
  active?: boolean
}

function ToolbarControlButton({
  label,
  icon,
  count,
  active,
  className,
  ...props
}: ToolbarControlButtonProps) {
  return (
    <Button
      variant={active ? "secondary" : "outline"}
      className={cn("min-h-11 md:min-h-0", className)}
      aria-pressed={active}
      {...props}
    >
      {icon}
      {props["aria-label"] ? null : <span>{label}</span>}
      {typeof count === "number" && count > 0 ? (
        <span className="bg-primary text-primary-foreground inline-flex min-w-5 items-center justify-center rounded-full px-1 text-xs leading-5">
          {count}
        </span>
      ) : null}
    </Button>
  )
}

export type FilterButtonProps = Omit<ToolbarControlButtonProps, "label" | "icon"> & {
  label?: string
}

export function FilterButton({ label = "Фильтры", ...props }: FilterButtonProps) {
  return (
    <ToolbarControlButton label={label} icon={<Filter aria-hidden="true" />} {...props} />
  )
}

export type SortButtonProps = Omit<ToolbarControlButtonProps, "label" | "icon"> & {
  label?: string
}

export function SortButton({ label = "Сортировка", ...props }: SortButtonProps) {
  return (
    <ToolbarControlButton
      label={label}
      icon={<ArrowUpDown aria-hidden="true" />}
      {...props}
    />
  )
}

export type DisplaySettingsButtonProps = Omit<ToolbarControlButtonProps, "label" | "icon"> & {
  label?: string
}

export function DisplaySettingsButton({
  label = "Отображение",
  ...props
}: DisplaySettingsButtonProps) {
  return (
    <ToolbarControlButton
      label={label}
      icon={<Columns3 aria-hidden="true" />}
      {...props}
    />
  )
}

export type ViewToolbarProps = {
  filters?: ReactNode
  sort?: ReactNode
  displaySettings?: ReactNode
  viewSwitcher?: ReactNode
  startActions?: ReactNode
  endActions?: ReactNode
  summary?: ReactNode
  className?: string
}

export function ViewToolbar({
  filters,
  sort,
  displaySettings,
  viewSwitcher,
  startActions,
  endActions,
  summary,
  className,
}: ViewToolbarProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3 border-b px-4 py-3 md:flex-row md:items-center md:justify-between md:px-6",
        className,
      )}
    >
      <div className="flex min-w-0 flex-wrap items-center gap-2">
        {filters}
        {sort}
        {displaySettings}
        {viewSwitcher}
        {startActions}
      </div>
      <div className="flex min-w-0 items-center justify-between gap-3 md:justify-end">
        {summary ? <div className="text-muted-foreground truncate text-xs">{summary}</div> : null}
        {endActions}
      </div>
    </div>
  )
}
