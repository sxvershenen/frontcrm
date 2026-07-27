import { createBrowserRouter, Navigate, type RouteObject } from "react-router-dom"

import { crmRouteRegistry } from "@/app/route-registry"
import { DevUiPage } from "@/dev/ui"
import { RootLayout } from "@/layouts/root-layout"
import { NotFoundPage } from "@/routes/not-found-page"
import { RoutePlaceholderPage } from "@/routes/route-placeholder-page"

const crmRouteObjects: RouteObject[] = crmRouteRegistry.map((route) => {
  const element = <RoutePlaceholderPage route={route} />

  return route.path === ""
    ? { index: true, element }
    : { path: route.path, element }
})

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/crm" replace />,
  },
  {
    path: "/crm",
    element: <RootLayout />,
    children: crmRouteObjects,
  },
  {
    path: "/dev/ui/*",
    element: <DevUiPage />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
])
