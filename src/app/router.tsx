import { createBrowserRouter, Navigate, type RouteObject } from "react-router-dom"

import { crmRoutes } from "@/app/route-config"
import { RootLayout } from "@/layouts/root-layout"
import { NotFoundPage } from "@/routes/not-found-page"
import { RoutePlaceholderPage } from "@/routes/route-placeholder-page"

const crmRouteObjects: RouteObject[] = crmRoutes.map((route) => {
  const element = <RoutePlaceholderPage title={route.title} />

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
    path: "*",
    element: <NotFoundPage />,
  },
])
