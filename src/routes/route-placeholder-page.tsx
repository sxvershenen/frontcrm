type RoutePlaceholderPageProps = {
  title: string
}

export function RoutePlaceholderPage({ title }: RoutePlaceholderPageProps) {
  return (
    <section className="mx-auto flex min-h-svh max-w-5xl items-center px-6 py-16">
      <div className="space-y-2">
        <p className="text-sm text-muted-foreground">CRM «Свистоплясово»</p>
        <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
        <p className="max-w-xl text-sm text-muted-foreground">
          Route-заглушка. Интерфейс раздела будет реализован на следующем этапе.
        </p>
      </div>
    </section>
  )
}
