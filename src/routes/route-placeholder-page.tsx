import type { CrmRouteEntry } from "@/app/route-registry"

type RoutePlaceholderPageProps = {
  route: CrmRouteEntry
}

export function RoutePlaceholderPage({ route }: RoutePlaceholderPageProps) {
  return (
    <section
      aria-labelledby={`${route.id}-placeholder-title`}
      className="bg-card text-card-foreground min-h-48 rounded-xl border border-dashed p-6 shadow-xs"
    >
      <div className="max-w-xl space-y-2">
        <p className="text-muted-foreground text-xs font-medium uppercase tracking-wide">
          Route placeholder
        </p>
        <h2 className="text-base font-medium" id={`${route.id}-placeholder-title`}>
          {route.title}
        </h2>
        <p className="text-muted-foreground text-sm">
          {route.description} Feature-интерфейс намеренно не реализован на этапе shell.
        </p>
      </div>
    </section>
  )
}
