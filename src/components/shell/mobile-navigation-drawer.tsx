import { useEffect, useRef } from "react"
import { House, X } from "lucide-react"
import { NavLink } from "react-router-dom"

import { CRM_ROUTE_GROUPS, crmRouteRegistry } from "@/app/route-registry"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

export function MobileNavigationDrawer({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open) {
      return
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    closeButtonRef.current?.focus()

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose()
      }
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [onClose, open])

  if (!open) {
    return null
  }

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <button
        aria-label="Закрыть навигацию"
        className="absolute inset-0 bg-black/30 backdrop-blur-[1px]"
        onClick={onClose}
        type="button"
      />
      <aside
        aria-label="Все разделы CRM"
        aria-modal="true"
        className="bg-sidebar text-sidebar-foreground absolute inset-y-0 left-0 flex w-[min(22rem,88vw)] flex-col border-r shadow-xl"
        role="dialog"
      >
        <div className="flex min-h-16 items-center gap-3 px-4">
          <div className="bg-sidebar-primary text-sidebar-primary-foreground flex size-9 items-center justify-center rounded-lg">
            <House aria-hidden="true" className="size-4" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold">Свистоплясово</p>
            <p className="text-muted-foreground truncate text-xs">Все разделы CRM</p>
          </div>
          <Button
            aria-label="Закрыть навигацию"
            className="size-11"
            onClick={onClose}
            ref={closeButtonRef}
            size="icon"
            variant="ghost"
          >
            <X aria-hidden="true" />
          </Button>
        </div>
        <Separator />
        <nav className="flex-1 overflow-y-auto px-3 py-4">
          <div className="space-y-5">
            {CRM_ROUTE_GROUPS.map((group) => (
              <section key={group} aria-labelledby={`mobile-group-${group}`}>
                <h2
                  className="text-muted-foreground px-2 pb-1.5 text-xs font-medium"
                  id={`mobile-group-${group}`}
                >
                  {group}
                </h2>
                <div className="space-y-0.5">
                  {crmRouteRegistry
                    .filter((route) => route.group === group)
                    .map((route) => {
                      const Icon = route.icon

                      return (
                        <NavLink
                          className={({ isActive }: { isActive: boolean }) =>
                            cn(
                              "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-sidebar-ring flex min-h-11 items-center gap-3 rounded-md px-3 text-sm outline-none transition-colors focus-visible:ring-3",
                              isActive &&
                                "bg-sidebar-accent text-sidebar-accent-foreground font-medium",
                            )
                          }
                          end={route.id === "overview"}
                          key={route.id}
                          onClick={onClose}
                          to={route.href}
                        >
                          <Icon aria-hidden="true" className="size-4 shrink-0" />
                          <span className="truncate">{route.title}</span>
                        </NavLink>
                      )
                    })}
                </div>
              </section>
            ))}
          </div>
        </nav>
      </aside>
    </div>
  )
}
