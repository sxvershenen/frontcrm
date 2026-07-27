import { House } from "lucide-react"
import { NavLink } from "react-router-dom"

import { CRM_ROUTE_GROUPS, crmRouteRegistry } from "@/app/route-registry"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

export function DesktopSidebar() {
  return (
    <aside className="bg-sidebar text-sidebar-foreground fixed inset-y-0 left-0 z-40 hidden w-64 border-r lg:flex lg:flex-col">
      <div className="flex h-16 shrink-0 items-center gap-3 px-4">
        <div className="bg-sidebar-primary text-sidebar-primary-foreground flex size-9 items-center justify-center rounded-lg">
          <House aria-hidden="true" className="size-4" />
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold">Свистоплясово</p>
          <p className="text-muted-foreground truncate text-xs">CRM</p>
        </div>
      </div>
      <Separator />

      <nav className="flex-1 overflow-y-auto px-3 py-4" aria-label="Основная навигация">
        <div className="space-y-5">
          {CRM_ROUTE_GROUPS.map((group) => {
            const routes = crmRouteRegistry.filter((route) => route.group === group)

            return (
              <section key={group} aria-labelledby={`desktop-group-${group}`}>
                <h2
                  className="text-muted-foreground px-2 pb-1.5 text-xs font-medium"
                  id={`desktop-group-${group}`}
                >
                  {group}
                </h2>
                <div className="space-y-0.5">
                  {routes.map((route) => {
                    const Icon = route.icon

                    return (
                      <NavLink
                        className={({ isActive }: { isActive: boolean }) =>
                          cn(
                            "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-sidebar-ring flex min-h-9 items-center gap-2.5 rounded-md px-2.5 text-sm transition-colors outline-none focus-visible:ring-3",
                            isActive &&
                              "bg-sidebar-accent text-sidebar-accent-foreground font-medium",
                          )
                        }
                        end={route.id === "overview"}
                        key={route.id}
                        to={route.href}
                      >
                        <Icon aria-hidden="true" className="size-4 shrink-0" />
                        <span className="truncate">{route.title}</span>
                      </NavLink>
                    )
                  })}
                </div>
              </section>
            )
          })}
        </div>
      </nav>

      <Separator />
      <div className="px-4 py-3 text-xs text-muted-foreground">
        Stage 01 · Application Shell
      </div>
    </aside>
  )
}
