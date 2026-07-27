import type { KeyboardEvent } from "react"
import { Search } from "lucide-react"

import { dispatchShellEvent, SHELL_EVENTS, type ShellActionSource } from "@/components/shell/shell-events"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function DesktopGlobalSearch() {
  return (
    <div className="relative w-full max-w-xl" role="search">
      <Search
        aria-hidden="true"
        className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2"
      />
      <Input
        aria-label="Глобальный поиск по CRM"
        className="cursor-pointer pr-16 pl-9"
        onClick={() => dispatchShellEvent(SHELL_EVENTS.globalSearch, "desktop")}
        onKeyDown={(event: KeyboardEvent<HTMLInputElement>) => {
          if (event.key === "Enter") {
            event.preventDefault()
            dispatchShellEvent(SHELL_EVENTS.globalSearch, "desktop")
          }
        }}
        placeholder="Поиск по CRM"
        readOnly
      />
      <kbd className="bg-muted text-muted-foreground pointer-events-none absolute top-1/2 right-2 hidden -translate-y-1/2 rounded px-1.5 py-0.5 text-xs font-medium sm:block">
        Ctrl K
      </kbd>
    </div>
  )
}

export function MobileGlobalSearchTrigger({ source }: { source: ShellActionSource }) {
  return (
    <Button
      aria-label="Открыть глобальный поиск"
      className="size-11"
      onClick={() => dispatchShellEvent(SHELL_EVENTS.globalSearch, source)}
      size="icon"
      variant="ghost"
    >
      <Search aria-hidden="true" />
    </Button>
  )
}
