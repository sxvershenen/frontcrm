import { Plus } from "lucide-react"

import { dispatchShellEvent, SHELL_EVENTS, type ShellActionSource } from "@/components/shell/shell-events"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type CreateTriggerProps = {
  source: ShellActionSource
  compact?: boolean
  className?: string
}

export function CreateTrigger({ source, compact = false, className }: CreateTriggerProps) {
  return (
    <Button
      aria-label="Создать"
      className={cn(compact && "flex-col gap-0.5 text-xs", className)}
      onClick={() => dispatchShellEvent(SHELL_EVENTS.create, source)}
      size={compact ? "icon-lg" : "default"}
    >
      <Plus aria-hidden="true" />
      {compact ? <span className="sr-only">Создать</span> : <span>Создать</span>}
    </Button>
  )
}
