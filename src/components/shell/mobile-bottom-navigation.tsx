import { NavLink } from "react-router-dom"

import { mobilePrimaryRoutes } from "@/app/route-registry"
import { CreateTrigger } from "@/components/shell/create-trigger"
import { cn } from "@/lib/utils"

export function MobileBottomNavigation() {
  const [overview, leads, bookings, tasks] = mobilePrimaryRoutes

  return (
    <nav
      aria-label="Мобильная навигация"
      className="bg-background/95 fixed inset-x-0 bottom-0 z-40 border-t pb-[env(safe-area-inset-bottom)] backdrop-blur supports-[backdrop-filter]:bg-background/85 lg:hidden"
    >
      <div className="mx-auto grid min-h-16 max-w-md grid-cols-5 items-end px-1">
        <MobileRouteLink route={overview} />
        <MobileRouteLink route={leads} />
        <div className="flex min-h-16 flex-col items-center justify-end gap-1 pb-1">
          <CreateTrigger
            className="size-11 rounded-full shadow-md"
            compact
            source="mobile"
          />
          <span className="text-xs font-medium">Создать</span>
        </div>
        <MobileRouteLink route={bookings} />
        <MobileRouteLink route={tasks} />
      </div>
    </nav>
  )
}

function MobileRouteLink({
  route,
}: {
  route: (typeof mobilePrimaryRoutes)[number] | undefined
}) {
  if (!route) {
    return null
  }

  const Icon = route.icon

  return (
    <NavLink
      className={({ isActive }: { isActive: boolean }) =>
        cn(
          "text-muted-foreground focus-visible:ring-ring flex min-h-16 flex-col items-center justify-end gap-1 rounded-md px-1 pb-2 text-xs font-medium outline-none transition-colors focus-visible:ring-3",
          isActive && "text-foreground",
        )
      }
      end={route.id === "overview"}
      to={route.href}
    >
      <Icon aria-hidden="true" className="size-5" />
      <span className="max-w-full truncate">{route.shortTitle}</span>
    </NavLink>
  )
}
