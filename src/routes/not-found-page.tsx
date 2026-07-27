import { Link } from "react-router-dom"

export function NotFoundPage() {
  return (
    <main className="flex min-h-svh items-center justify-center px-6">
      <div className="space-y-3 text-center">
        <p className="text-sm text-muted-foreground">404</p>
        <h1 className="text-2xl font-semibold">Маршрут не найден</h1>
        <Link className="text-sm underline underline-offset-4" to="/crm">
          Вернуться в CRM
        </Link>
      </div>
    </main>
  )
}
