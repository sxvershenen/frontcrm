import type { CrmRouteEntry } from "@/app/route-registry"

export function SectionHeader({ route }: { route: CrmRouteEntry }) {
  return (
    <div className="bg-background border-b">
      <div className="mx-auto flex min-h-18 w-full max-w-[1600px] items-center px-4 py-4 sm:px-6 lg:px-8">
        <div className="min-w-0">
          <p className="text-muted-foreground mb-1 text-xs lg:hidden">Раздел CRM</p>
          <h1 className="truncate text-xl font-semibold tracking-tight sm:text-2xl">
            {route.title}
          </h1>
        </div>
      </div>
    </div>
  )
}
