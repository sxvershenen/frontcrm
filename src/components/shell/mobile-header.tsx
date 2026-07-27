import { Menu } from "lucide-react"

import type { CrmRouteEntry } from "@/app/route-registry"
import { MobileGlobalSearchTrigger } from "@/components/shell/global-search"
import { Button } from "@/components/ui/button"

export function MobileHeader({
  route,
  onOpenNavigation,
}: {
  route: CrmRouteEntry
  onOpenNavigation: () => void
}) {
  return (
    <header className="bg-background/95 sticky top-0 z-30 flex min-h-14 items-center gap-2 border-b px-3 backdrop-blur supports-[backdrop-filter]:bg-background/80 lg:hidden">
      <Button
        aria-label="Открыть навигацию"
        className="size-11"
        onClick={onOpenNavigation}
        size="icon"
        variant="ghost"
      >
        <Menu aria-hidden="true" />
      </Button>
      <div className="min-w-0 flex-1">
        <p className="text-muted-foreground text-xs">CRM «Свистоплясово»</p>
        <p className="truncate text-sm font-semibold">{route.title}</p>
      </div>
      <MobileGlobalSearchTrigger source="mobile" />
    </header>
  )
}
