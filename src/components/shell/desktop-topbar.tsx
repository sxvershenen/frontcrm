import { Bell, CircleUserRound } from "lucide-react"

import type { CrmRouteEntry } from "@/app/route-registry"
import { AppBreadcrumbs } from "@/components/shell/app-breadcrumbs"
import { CreateTrigger } from "@/components/shell/create-trigger"
import { DesktopGlobalSearch } from "@/components/shell/global-search"
import { Button } from "@/components/ui/button"

export function DesktopTopbar({ route }: { route: CrmRouteEntry }) {
  return (
    <header className="bg-background/95 sticky top-0 z-30 hidden h-16 items-center gap-4 border-b px-6 backdrop-blur supports-[backdrop-filter]:bg-background/80 lg:flex">
      <div className="min-w-44 shrink-0">
        <AppBreadcrumbs route={route} />
      </div>
      <div className="flex flex-1 justify-center">
        <DesktopGlobalSearch />
      </div>
      <div className="flex shrink-0 items-center gap-1.5">
        <CreateTrigger source="desktop" />
        <Button aria-label="Уведомления" size="icon" variant="ghost">
          <Bell aria-hidden="true" />
        </Button>
        <Button aria-label="Профиль" size="icon" variant="ghost">
          <CircleUserRound aria-hidden="true" />
        </Button>
      </div>
    </header>
  )
}
