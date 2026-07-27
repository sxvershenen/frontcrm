import type { ReactNode } from "react"
import { CircleAlert } from "lucide-react"

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

export type EntityEditorTab = {
  id: string
  label: ReactNode
  disabled?: boolean
  hasError?: boolean
}

export type EntityEditorTabsProps = {
  tabs: readonly EntityEditorTab[]
  activeTab: string
  onTabChange: (tabId: string) => void
  className?: string
}

export function EntityEditorTabs({
  tabs,
  activeTab,
  onTabChange,
  className,
}: EntityEditorTabsProps) {
  return (
    <Tabs
      value={activeTab}
      onValueChange={onTabChange}
      className={cn("min-w-0", className)}
    >
      <TabsList
        variant="line"
        aria-label="Разделы редактора"
        className="scrollbar-none flex min-h-12 w-full justify-start overflow-x-auto rounded-none border-b px-3 md:px-5"
      >
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab.id}
            id={`entity-editor-tab-${tab.id}`}
            value={tab.id}
            disabled={tab.disabled}
            aria-controls={`entity-editor-panel-${tab.id}`}
            className="min-h-11 flex-none gap-1.5 px-3 text-sm font-medium"
          >
            {tab.label}
            {tab.hasError ? (
              <CircleAlert
                className="text-destructive size-3.5"
                aria-label="Есть ошибка"
              />
            ) : null}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  )
}
