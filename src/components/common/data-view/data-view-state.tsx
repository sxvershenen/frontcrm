import type { ReactNode } from "react"
import {
  CircleSlash2,
  FileQuestion,
  FilterX,
  LoaderCircle,
  RefreshCw,
  ShieldAlert,
  TriangleAlert,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export type DataViewStateKind =
  | "loading"
  | "empty"
  | "filtered-empty"
  | "error"
  | "permission-denied"

export type DataViewStateProps = {
  kind: DataViewStateKind
  title?: ReactNode
  description?: ReactNode
  action?: ReactNode
  className?: string
  compact?: boolean
}

const stateDefaults: Record<
  DataViewStateKind,
  { title: string; description: string; icon: ReactNode }
> = {
  loading: {
    title: "Загрузка данных",
    description: "Получаем актуальное состояние.",
    icon: <LoaderCircle className="animate-spin" aria-hidden="true" />,
  },
  empty: {
    title: "Здесь пока ничего нет",
    description: "Данные появятся после добавления записей.",
    icon: <FileQuestion aria-hidden="true" />,
  },
  "filtered-empty": {
    title: "Ничего не найдено",
    description: "Измените или сбросьте применённые фильтры.",
    icon: <FilterX aria-hidden="true" />,
  },
  error: {
    title: "Не удалось загрузить данные",
    description: "Повторите запрос или проверьте соединение.",
    icon: <TriangleAlert aria-hidden="true" />,
  },
  "permission-denied": {
    title: "Недостаточно прав",
    description: "Доступ к этим данным ограничен вашей ролью.",
    icon: <ShieldAlert aria-hidden="true" />,
  },
}

export function DataViewState({
  kind,
  title,
  description,
  action,
  className,
  compact = false,
}: DataViewStateProps) {
  const defaults = stateDefaults[kind]

  return (
    <div
      className={cn(
        "flex w-full flex-col items-center justify-center text-center",
        compact ? "min-h-36 gap-2 px-4 py-6" : "min-h-64 gap-3 px-6 py-10",
        className,
      )}
      role={kind === "error" || kind === "permission-denied" ? "alert" : "status"}
      aria-live={kind === "loading" ? "polite" : undefined}
    >
      <div className="bg-muted text-muted-foreground flex size-10 items-center justify-center rounded-full [&_svg]:size-5">
        {defaults.icon}
      </div>
      <div className="space-y-1">
        <h3 className="text-sm font-medium">{title ?? defaults.title}</h3>
        <div className="text-muted-foreground max-w-md text-xs leading-relaxed">
          {description ?? defaults.description}
        </div>
      </div>
      {action ? <div className="pt-1">{action}</div> : null}
    </div>
  )
}

export type RetryStateActionProps = {
  onRetry: () => void
  label?: string
}

export function RetryStateAction({ onRetry, label = "Повторить" }: RetryStateActionProps) {
  return (
    <Button variant="outline" size="sm" onClick={onRetry}>
      <RefreshCw aria-hidden="true" />
      {label}
    </Button>
  )
}

export type ResetFiltersStateActionProps = {
  onReset: () => void
  label?: string
}

export function ResetFiltersStateAction({
  onReset,
  label = "Сбросить фильтры",
}: ResetFiltersStateActionProps) {
  return (
    <Button variant="outline" size="sm" onClick={onReset}>
      <CircleSlash2 aria-hidden="true" />
      {label}
    </Button>
  )
}
