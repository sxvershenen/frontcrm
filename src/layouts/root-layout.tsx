import { Outlet } from "react-router-dom"

export function RootLayout() {
  return (
    <main className="min-h-svh bg-background text-foreground">
      <Outlet />
    </main>
  )
}
