import { type ChangeEvent, useState } from "react"
import { ExternalLink, MoreHorizontal, PanelTopOpen } from "lucide-react"
import { useMatch, useSearchParams } from "react-router-dom"

import { useBackgroundNavigate } from "@/app/navigation"
import {
  DataTable,
  DataViewState,
  DisplaySettingsButton,
  EditorStatusIndicator,
  EntityEditorOverlay,
  FilterButton,
  MobileList,
  PageHeader,
  ResetFiltersStateAction,
  ResponsiveDataView,
  RetryStateAction,
  SortButton,
  ViewToolbar,
  type DataTableColumn,
  type EntityEditorTab,
} from "@/components/common"
import { Badge, Button, Input } from "@/components/ui"
import type { SortDescriptor } from "@/core/data"
import type { EditorState } from "@/core/entities"

import { demoRecords, type DemoRecord } from "./demo-fixtures"

const editorStates: readonly EditorState[] = [
  "clean",
  "dirty",
  "saving",
  "saved",
  "validation-error",
  "server-error",
  "readonly",
  "conflict",
]

const editorTabs: readonly EntityEditorTab[] = [
  { id: "main", label: "Основное" },
  { id: "details", label: "Дополнительно" },
  { id: "history", label: "История" },
]

const columns: readonly DataTableColumn<DemoRecord>[] = [
  {
    id: "name",
    header: "Имя",
    sortable: true,
    cell: (row) => (
      <div>
        <div className="font-medium">{row.name}</div>
        <div className="text-muted-foreground text-xs">{row.phone}</div>
      </div>
    ),
  },
  {
    id: "status",
    header: "Статус",
    sortable: true,
    cell: (row) => <Badge variant="outline">{row.status}</Badge>,
  },
  {
    id: "updatedAt",
    header: "Обновлено",
    sortable: true,
    cell: (row) =>
      new Intl.DateTimeFormat("ru-RU", { dateStyle: "medium" }).format(
        new Date(row.updatedAt),
      ),
  },
  {
    id: "version",
    header: "Версия",
    sortable: true,
    align: "right",
    width: "7rem",
    cell: (row) => (
      <span className="text-muted-foreground">v{row.version}</span>
    ),
  },
]

function isEditorState(value: string | null): value is EditorState {
  return Boolean(value && editorStates.includes(value as EditorState))
}

function stateMessage(state: EditorState): string | undefined {
  if (state === "validation-error") {
    return "Проверьте обязательные поля. Ошибка остаётся связанной с конкретной вкладкой."
  }

  if (state === "server-error") {
    return "Сервер отклонил сохранение. Локальные изменения не потеряны."
  }

  if (state === "readonly") {
    return "Запись открыта только для чтения согласно capabilities текущего пользователя."
  }

  if (state === "conflict") {
    return "На сервере уже существует более новая версия записи. Требуется разрешить конфликт."
  }

  return undefined
}

type EditorDemoProps = {
  open: boolean
  record: DemoRecord
  initialState: EditorState
}

function EditorDemo({ open, record, initialState }: EditorDemoProps) {
  const [activeTab, setActiveTab] = useState("main")
  const [currentState, setCurrentState] = useState<EditorState>(initialState)
  const [name, setName] = useState(record.name)

  async function handleSave() {
    if (currentState === "readonly") return

    setCurrentState("saving")
    await new Promise((resolve) => window.setTimeout(resolve, 500))
    setCurrentState("saved")
  }

  return (
    <EntityEditorOverlay
      open={open}
      route={{ returnTo: "/dev/ui", closeMode: "auto" }}
      title={record.name}
      description={`ID: ${record.id} · version ${record.version}`}
      state={currentState}
      stateMessage={stateMessage(currentState)}
      tabs={editorTabs.map((tab) => ({
        ...tab,
        hasError: currentState === "validation-error" && tab.id === "main",
      }))}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      onSave={handleSave}
      onRetry={() => setCurrentState("dirty")}
      hasUnsavedChanges={
        currentState === "dirty" || currentState === "validation-error"
      }
      footerStart={
        <span className="text-muted-foreground text-xs">
          Backend-ready demo contract
        </span>
      }
    >
      {activeTab === "main" ? (
        <div className="grid max-w-2xl gap-5">
          <label className="grid gap-1.5 text-sm font-medium">
            Имя
            <Input
              value={name}
              disabled={
                currentState === "readonly" || currentState === "saving"
              }
              aria-invalid={currentState === "validation-error"}
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                setName(event.target.value)
                setCurrentState("dirty")
              }}
            />
            {currentState === "validation-error" ? (
              <span className="text-destructive text-xs">
                Поле обязательно для заполнения.
              </span>
            ) : null}
          </label>
          <label className="grid gap-1.5 text-sm font-medium">
            Телефон
            <Input
              defaultValue={record.phone}
              disabled={
                currentState === "readonly" || currentState === "saving"
              }
              onChange={() => setCurrentState("dirty")}
            />
          </label>
        </div>
      ) : activeTab === "details" ? (
        <div className="grid gap-3 text-sm">
          <p className="text-muted-foreground">
            Тяжёлые feature-вкладки могут подключаться лениво, но overlay и его
            layout остаются общими.
          </p>
          <div className="rounded-lg border p-4 text-xs">
            capabilities.update: {String(record.capabilities.update)}
          </div>
        </div>
      ) : (
        <div className="text-muted-foreground text-sm">
          История здесь является технической заглушкой. Реальные данные должен
          поставлять feature adapter.
        </div>
      )}
    </EntityEditorOverlay>
  )
}

export function DevUiPage() {
  const openWithBackground = useBackgroundNavigate()
  const match = useMatch("/dev/ui/entity/:entityId")
  const [searchParams] = useSearchParams()
  const requestedState = searchParams.get("state")
  const initialState = isEditorState(requestedState) ? requestedState : "clean"
  const entityId = match?.params.entityId
  const selectedRecord =
    demoRecords.find((record) => record.id === entityId) ?? demoRecords[0]
  const [sort, setSort] = useState<SortDescriptor>({
    field: "updatedAt",
    direction: "desc",
  })

  function openEditor(recordId: string, state: EditorState = "clean") {
    openWithBackground(`/dev/ui/entity/${recordId}?state=${state}`)
  }

  return (
    <div className="bg-muted/20 min-h-svh">
      <PageHeader
        eyebrow="Технический маршрут"
        title="Общее UI-ядро"
        description="Демонстрация публичных компонентов без проектирования реальных разделов CRM."
        actions={
          <Button
            className="min-h-11 md:min-h-0"
            onClick={() => openEditor(demoRecords[0].id)}
          >
            <PanelTopOpen aria-hidden="true" />
            Открыть editor overlay
          </Button>
        }
      />

      <main className="mx-auto grid max-w-7xl gap-8 px-4 py-6 md:px-6 md:py-8">
        <section className="bg-background overflow-hidden rounded-xl border shadow-xs">
          <div className="border-b px-4 py-4 md:px-6">
            <h2 className="text-base font-semibold">
              PageHeader, ViewToolbar и responsive data-view
            </h2>
            <p className="text-muted-foreground mt-1 text-xs">
              На desktop отображается таблица, на mobile — вертикальный список
              без горизонтального scroll.
            </p>
          </div>

          <ViewToolbar
            filters={
              <FilterButton count={2} active onClick={() => undefined} />
            }
            sort={
              <SortButton label="По обновлению" onClick={() => undefined} />
            }
            displaySettings={
              <DisplaySettingsButton onClick={() => undefined} />
            }
            summary="3 технические записи"
            endActions={
              <Button
                variant="ghost"
                size="icon"
                aria-label="Дополнительные операции"
              >
                <MoreHorizontal aria-hidden="true" />
              </Button>
            }
          />

          <div className="p-4 md:p-6">
            <ResponsiveDataView
              desktop={
                <DataTable
                  rows={demoRecords}
                  columns={columns}
                  rowKey={(row) => row.id}
                  sort={sort}
                  onSortChange={setSort}
                  onRowClick={(row) => openEditor(row.id)}
                  rowLabel={(row) => `Открыть запись ${row.name}`}
                  caption="Техническая демонстрационная таблица"
                />
              }
              mobile={
                <MobileList
                  rows={demoRecords}
                  rowKey={(row) => row.id}
                  onItemClick={(row) => openEditor(row.id)}
                  itemLabel={(row) => `Открыть запись ${row.name}`}
                  renderItem={(row) => (
                    <div className="grid gap-3">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="font-medium">{row.name}</div>
                          <div className="text-muted-foreground mt-0.5 text-xs">
                            {row.phone}
                          </div>
                        </div>
                        <Badge variant="outline">{row.status}</Badge>
                      </div>
                      <div className="text-muted-foreground flex justify-between text-xs">
                        <span>Версия {row.version}</span>
                        <span>
                          {new Date(row.updatedAt).toLocaleDateString("ru-RU")}
                        </span>
                      </div>
                    </div>
                  )}
                />
              }
            />
          </div>
        </section>

        <section className="space-y-4">
          <div>
            <h2 className="text-base font-semibold">
              Общие состояния коллекций
            </h2>
            <p className="text-muted-foreground mt-1 text-xs">
              Одинаковые состояния применяются к таблицам, мобильным спискам и
              другим data-view.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
            <div className="bg-background rounded-xl border">
              <DataViewState kind="loading" compact />
            </div>
            <div className="bg-background rounded-xl border">
              <DataViewState kind="empty" compact />
            </div>
            <div className="bg-background rounded-xl border">
              <DataViewState
                kind="filtered-empty"
                compact
                action={
                  <ResetFiltersStateAction onReset={() => undefined} />
                }
              />
            </div>
            <div className="bg-background rounded-xl border">
              <DataViewState
                kind="error"
                compact
                action={<RetryStateAction onRetry={() => undefined} />}
              />
            </div>
            <div className="bg-background rounded-xl border">
              <DataViewState kind="permission-denied" compact />
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <div>
            <h2 className="text-base font-semibold">
              Состояния EntityEditorOverlay
            </h2>
            <p className="text-muted-foreground mt-1 text-xs">
              Каждая кнопка открывает тот же route-aware редактор в отдельном
              техническом состоянии.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {editorStates.map((state) => (
              <Button
                key={state}
                variant="outline"
                className="min-h-11"
                onClick={() => openEditor(demoRecords[0].id, state)}
              >
                <EditorStatusIndicator state={state} />
                <ExternalLink aria-hidden="true" />
              </Button>
            ))}
          </div>
        </section>
      </main>

      <EditorDemo
        key={`${selectedRecord.id}:${initialState}`}
        open={Boolean(match)}
        record={selectedRecord}
        initialState={initialState}
      />
    </div>
  )
}
