import {
  type ReactNode,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
} from "react"
import { createPortal } from "react-dom"
import { AlertTriangle, RotateCcw, Save, X } from "lucide-react"
import { useBlocker, useLocation, useNavigate, type To } from "react-router-dom"

import { EntityEditorTabs, type EntityEditorTab } from "@/components/common/editor/entity-editor-tabs"
import { EditorStatusIndicator } from "@/components/common/editor/editor-status"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import type { EditorState } from "@/core/entities"
import { cn } from "@/lib/utils"

export type EntityEditorRouteOptions = {
  returnTo: To
  closeMode?: "auto" | "back" | "replace"
  backgroundStateKey?: string
}

export type EntityEditorOverlaySize = "sm" | "md" | "lg" | "xl"

export type EntityEditorOverlayProps = {
  open: boolean
  title: ReactNode
  description?: ReactNode
  state: EditorState
  stateMessage?: ReactNode
  tabs: readonly EntityEditorTab[]
  activeTab: string
  onTabChange: (tabId: string) => void
  children: ReactNode
  onSave?: () => void | Promise<void>
  onRetry?: () => void | Promise<void>
  onRequestClose?: () => void
  onConfirmDiscard?: () => boolean | Promise<boolean>
  route?: EntityEditorRouteOptions
  headerActions?: ReactNode
  footerStart?: ReactNode
  footerEnd?: ReactNode
  saveLabel?: string
  closeLabel?: string
  size?: EntityEditorOverlaySize
  className?: string
  contentClassName?: string
  hasUnsavedChanges?: boolean
}

const widthClasses: Record<EntityEditorOverlaySize, string> = {
  sm: "md:max-w-xl",
  md: "md:max-w-3xl",
  lg: "md:max-w-5xl",
  xl: "md:max-w-7xl",
}

const focusableSelector = [
  "a[href]",
  "button:not([disabled])",
  "textarea:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(",")

export function EntityEditorOverlay({
  open,
  title,
  description,
  state,
  stateMessage,
  tabs,
  activeTab,
  onTabChange,
  children,
  onSave,
  onRetry,
  onRequestClose,
  onConfirmDiscard,
  route,
  headerActions,
  footerStart,
  footerEnd,
  saveLabel = "Сохранить",
  closeLabel = "Закрыть",
  size = "lg",
  className,
  contentClassName,
  hasUnsavedChanges =
    state === "dirty" ||
    state === "validation-error" ||
    state === "server-error" ||
    state === "conflict",
}: EntityEditorOverlayProps) {
  const navigate = useNavigate()
  const location = useLocation()
  const titleId = useId()
  const descriptionId = useId()
  const panelRef = useRef<HTMLDivElement | null>(null)
  const previousFocusRef = useRef<HTMLElement | null>(null)

  const isReadonly = state === "readonly"
  const isSaving = state === "saving"
  const canSave =
    Boolean(onSave) &&
    !isReadonly &&
    !isSaving &&
    state !== "clean" &&
    state !== "saved"
  const activeTabExists = useMemo(
    () => tabs.some((tab) => tab.id === activeTab),
    [activeTab, tabs],
  )

  const closeByRoute = useCallback(() => {
    if (!route) return

    const stateRecord = location.state as Record<string, unknown> | null
    const backgroundKey = route.backgroundStateKey ?? "backgroundLocation"
    const hasBackground = Boolean(stateRecord?.[backgroundKey])
    const mode = route.closeMode ?? "auto"

    if (mode === "back" || (mode === "auto" && hasBackground)) {
      navigate(-1)
      return
    }

    navigate(route.returnTo, { replace: true })
  }, [location.state, navigate, route])

  const confirmDiscard = useCallback(async () => {
    if (!hasUnsavedChanges) return true
    return onConfirmDiscard
      ? onConfirmDiscard()
      : window.confirm("Закрыть редактор и потерять несохранённые изменения?")
  }, [hasUnsavedChanges, onConfirmDiscard])

  const blocker = useBlocker(open && hasUnsavedChanges)

  useEffect(() => {
    if (blocker.state !== "blocked") return

    let active = true
    void confirmDiscard().then((approved) => {
      if (!active) return
      if (approved) blocker.proceed()
      else blocker.reset()
    })

    return () => {
      active = false
    }
  }, [blocker, confirmDiscard])

  const requestClose = useCallback(async () => {
    if (route && !onRequestClose) {
      closeByRoute()
      return
    }

    if (!(await confirmDiscard())) return
    onRequestClose?.()
  }, [closeByRoute, confirmDiscard, onRequestClose, route])

  useEffect(() => {
    if (!open) return

    previousFocusRef.current = document.activeElement as HTMLElement | null
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    requestAnimationFrame(() => {
      const panel = panelRef.current
      const firstFocusable = panel?.querySelector<HTMLElement>(focusableSelector)
      ;(firstFocusable ?? panel)?.focus()
    })

    return () => {
      document.body.style.overflow = previousOverflow
      previousFocusRef.current?.focus()
    }
  }, [open])

  useEffect(() => {
    if (!open || !hasUnsavedChanges) return

    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault()
      event.returnValue = ""
    }

    window.addEventListener("beforeunload", handleBeforeUnload)
    return () => window.removeEventListener("beforeunload", handleBeforeUnload)
  }, [hasUnsavedChanges, open])

  useEffect(() => {
    if (!open) return

    const handleKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.defaultPrevented) return

      const panel = panelRef.current
      if (!panel) return

      const activeElement = document.activeElement
      if (activeElement instanceof HTMLElement && !panel.contains(activeElement)) return

      if (event.key === "Escape") {
        event.preventDefault()
        void requestClose()
        return
      }

      if (event.key !== "Tab") return

      const focusable = Array.from(panel.querySelectorAll<HTMLElement>(focusableSelector)).filter(
        (element) => !element.hasAttribute("disabled") && element.getAttribute("aria-hidden") !== "true",
      )

      if (focusable.length === 0) {
        event.preventDefault()
        panel.focus()
        return
      }

      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (!first || !last) return

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [open, requestClose])

  if (!open || !activeTabExists) return null

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-stretch justify-center bg-black/35 p-0 backdrop-blur-[2px] md:items-center md:p-6">
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={description ? descriptionId : undefined}
        tabIndex={-1}
        className={cn(
          "bg-background text-foreground grid h-svh w-full grid-rows-[auto_auto_minmax(0,1fr)_auto] overflow-hidden outline-none",
          "md:h-[min(92svh,56rem)] md:rounded-xl md:border md:shadow-2xl",
          widthClasses[size],
          className,
        )}
      >
        <header className="flex min-h-16 items-start justify-between gap-4 border-b px-4 pt-[max(0.75rem,env(safe-area-inset-top))] pb-3 md:px-5 md:pt-3">
          <div className="min-w-0 space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <h2 id={titleId} className="truncate text-lg font-semibold tracking-tight">
                {title}
              </h2>
              <EditorStatusIndicator state={state} />
            </div>
            {description ? (
              <div id={descriptionId} className="text-muted-foreground text-xs">
                {description}
              </div>
            ) : null}
          </div>
          <div className="flex shrink-0 items-center gap-1">
            {headerActions}
            <Button
              variant="ghost"
              size="icon"
              aria-label={closeLabel}
              className="min-h-11 min-w-11 md:min-h-0 md:min-w-0"
              onClick={() => void requestClose()}
            >
              <X aria-hidden="true" />
            </Button>
          </div>
        </header>

        <EntityEditorTabs tabs={tabs} activeTab={activeTab} onTabChange={onTabChange} />

        <div
          id={`entity-editor-panel-${activeTab}`}
          role="tabpanel"
          aria-labelledby={`entity-editor-tab-${activeTab}`}
          className={cn("overflow-y-auto overscroll-contain px-4 py-5 md:px-6", contentClassName)}
        >
          {stateMessage ? (
            <div
              className={cn(
                "mb-4 flex items-start gap-2 rounded-lg border px-3 py-2 text-xs",
                state === "validation-error" || state === "server-error" || state === "conflict"
                  ? "border-destructive/40 bg-destructive/5 text-destructive"
                  : "bg-muted text-muted-foreground",
              )}
              role={
                state === "validation-error" || state === "server-error" || state === "conflict"
                  ? "alert"
                  : "status"
              }
            >
              <AlertTriangle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
              <div>{stateMessage}</div>
            </div>
          ) : null}
          {children}
        </div>

        <footer className="bg-background border-t px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] md:px-5 md:pb-3">
          <div className="flex flex-col-reverse gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2">{footerStart}</div>
            <div className="flex items-center justify-end gap-2">
              {state === "server-error" && onRetry ? (
                <Button
                  variant="outline"
                  className="min-h-11 md:min-h-0"
                  onClick={() => void onRetry()}
                >
                  <RotateCcw aria-hidden="true" />
                  Повторить
                </Button>
              ) : null}
              {footerEnd}
              <Separator orientation="vertical" className="hidden h-6 sm:block" />
              <Button
                variant="outline"
                className="min-h-11 md:min-h-0"
                onClick={() => void requestClose()}
              >
                {closeLabel}
              </Button>
              <Button
                className="min-h-11 md:min-h-0"
                disabled={!canSave}
                onClick={() => void onSave?.()}
              >
                {isSaving ? (
                  <RotateCcw className="animate-spin" aria-hidden="true" />
                ) : (
                  <Save aria-hidden="true" />
                )}
                {saveLabel}
              </Button>
            </div>
          </div>
        </footer>
      </div>
    </div>,
    document.body,
  )
}
