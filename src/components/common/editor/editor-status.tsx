import {
  AlertTriangle,
  Check,
  CircleAlert,
  Eye,
  LoaderCircle,
  Save,
  ShieldAlert,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import type { EditorState } from "@/core/entities"

export type EditorStatusIndicatorProps = {
  state: EditorState
}

const labels: Record<EditorState, string> = {
  clean: "Без изменений",
  dirty: "Есть изменения",
  saving: "Сохранение",
  saved: "Сохранено",
  "validation-error": "Ошибки формы",
  "server-error": "Ошибка сервера",
  readonly: "Только чтение",
  conflict: "Конфликт версий",
}

export function EditorStatusIndicator({ state }: EditorStatusIndicatorProps) {
  const icon =
    state === "saving" ? (
      <LoaderCircle className="animate-spin" aria-hidden="true" />
    ) : state === "saved" ? (
      <Check aria-hidden="true" />
    ) : state === "dirty" ? (
      <Save aria-hidden="true" />
    ) : state === "validation-error" ? (
      <CircleAlert aria-hidden="true" />
    ) : state === "server-error" ? (
      <AlertTriangle aria-hidden="true" />
    ) : state === "readonly" ? (
      <Eye aria-hidden="true" />
    ) : state === "conflict" ? (
      <ShieldAlert aria-hidden="true" />
    ) : (
      <Check aria-hidden="true" />
    )

  const variant =
    state === "validation-error" || state === "server-error" || state === "conflict"
      ? "destructive"
      : state === "clean" || state === "readonly"
        ? "outline"
        : "secondary"

  return (
    <Badge variant={variant} aria-live="polite">
      {icon}
      {labels[state]}
    </Badge>
  )
}
