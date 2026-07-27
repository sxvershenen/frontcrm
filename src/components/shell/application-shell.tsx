import { useCallback, useState } from "react"
import { Outlet, useLocation } from "react-router-dom"

import { getBackgroundLocationState } from "@/app/navigation/background-location"
import { useBasicScrollContext } from "@/app/navigation/scroll-context"
import { getCrmRouteByPathname } from "@/app/route-registry"
import { DesktopSidebar } from "@/components/shell/desktop-sidebar"
import { DesktopTopbar } from "@/components/shell/desktop-topbar"
import { MobileBottomNavigation } from "@/components/shell/mobile-bottom-navigation"
import { MobileHeader } from "@/components/shell/mobile-header"
import { MobileNavigationDrawer } from "@/components/shell/mobile-navigation-drawer"
import { SectionHeader } from "@/components/shell/section-header"

export function ApplicationShell() {
  const location = useLocation()
  const backgroundState = getBackgroundLocationState(location.state)
  const shellLocation = backgroundState?.backgroundLocation ?? location
  const route = getCrmRouteByPathname(shellLocation.pathname)
  const [mobileNavigationOpen, setMobileNavigationOpen] = useState(false)
  const closeMobileNavigation = useCallback(() => setMobileNavigationOpen(false), [])

  useBasicScrollContext()

  return (
    <div className="bg-muted/20 min-h-svh text-foreground">
      <a
        className="bg-background focus-visible:ring-ring fixed top-2 left-2 z-[60] -translate-y-20 rounded-md px-3 py-2 text-sm font-medium shadow focus-visible:translate-y-0 focus-visible:ring-3"
        href="#crm-page-content"
      >
        К содержимому
      </a>

      <DesktopSidebar />

      <div className="min-h-svh lg:pl-64">
        <DesktopTopbar route={route} />
        <MobileHeader
          onOpenNavigation={() => setMobileNavigationOpen(true)}
          route={route}
        />
        <SectionHeader route={route} />

        <main
          className="mx-auto w-full max-w-[1600px] px-4 py-6 pb-[calc(6rem+env(safe-area-inset-bottom))] sm:px-6 lg:px-8 lg:pb-8"
          id="crm-page-content"
          tabIndex={-1}
        >
          <Outlet />
        </main>
      </div>

      <MobileBottomNavigation />
      <MobileNavigationDrawer
        onClose={closeMobileNavigation}
        open={mobileNavigationOpen}
      />
    </div>
  )
}
