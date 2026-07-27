import { ChevronRight } from "lucide-react"
import { Link } from "react-router-dom"

import type { CrmRouteEntry } from "@/app/route-registry"

export function AppBreadcrumbs({ route }: { route: CrmRouteEntry }) {
  return (
    <nav aria-label="Хлебные крошки">
      <ol className="text-muted-foreground flex items-center gap-1.5 text-sm">
        <li>
          <Link className="hover:text-foreground transition-colors" to="/crm">
            CRM
          </Link>
        </li>
        {route.id !== "overview" ? (
          <>
            <li aria-hidden="true">
              <ChevronRight className="size-3.5" />
            </li>
            <li className="text-foreground" aria-current="page">
              {route.title}
            </li>
          </>
        ) : null}
      </ol>
    </nav>
  )
}
