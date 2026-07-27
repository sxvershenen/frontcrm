import type { BackendEntity } from "@/core/entities"

export type DemoRecord = BackendEntity & {
  name: string
  phone: string
  status: "Новая" | "В работе" | "Подтверждена"
}

const defaultCapabilities = {
  read: true,
  update: true,
  archive: true,
} as const

export const demoRecords = [
  {
    id: "demo-001",
    version: 3,
    updatedAt: "2026-07-27T13:40:00.000Z",
    updatedBy: { id: "user-001", displayName: "Администратор" },
    capabilities: defaultCapabilities,
    name: "Анна Петрова",
    phone: "+7 999 111-22-33",
    status: "Новая",
  },
  {
    id: "demo-002",
    version: 7,
    updatedAt: "2026-07-27T12:15:00.000Z",
    updatedBy: { id: "user-002", displayName: "Менеджер" },
    capabilities: defaultCapabilities,
    name: "Илья Смирнов",
    phone: "+7 999 222-33-44",
    status: "В работе",
  },
  {
    id: "demo-003",
    version: 2,
    updatedAt: "2026-07-26T18:05:00.000Z",
    updatedBy: { id: "user-001", displayName: "Администратор" },
    capabilities: defaultCapabilities,
    name: "Мария Волкова",
    phone: "+7 999 333-44-55",
    status: "Подтверждена",
  },
] as const satisfies readonly DemoRecord[]
