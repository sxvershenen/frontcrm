export const SHELL_EVENTS = {
  create: "svistoplyasovo-crm:create",
  globalSearch: "svistoplyasovo-crm:global-search",
} as const

export type ShellActionSource = "desktop" | "mobile"

export function dispatchShellEvent(
  eventName: (typeof SHELL_EVENTS)[keyof typeof SHELL_EVENTS],
  source: ShellActionSource,
) {
  window.dispatchEvent(
    new CustomEvent(eventName, {
      detail: { source },
    }),
  )
}
