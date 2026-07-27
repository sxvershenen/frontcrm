import type { LucideIcon } from "lucide-react"
import {
  Bath,
  BedDouble,
  CalendarDays,
  ClipboardList,
  ContactRound,
  CreditCard,
  House,
  LayoutDashboard,
  MapPinned,
  MessageSquareText,
  Settings,
  Sparkles,
  TentTree,
  UsersRound,
} from "lucide-react"

export const CRM_ROUTE_GROUPS = [
  "Работа",
  "Ресурсы",
  "События",
  "Управление",
] as const

export type CrmRouteGroup = (typeof CRM_ROUTE_GROUPS)[number]

export type CrmRouteId =
  | "overview"
  | "leads"
  | "bookings"
  | "schedule"
  | "customers"
  | "cabins"
  | "bath-and-hot-tub"
  | "venues"
  | "camping"
  | "programs"
  | "events"
  | "tasks"
  | "finance"
  | "team"
  | "settings"

export type CrmRouteEntry = {
  id: CrmRouteId
  path: string
  href: string
  title: string
  shortTitle: string
  description: string
  group: CrmRouteGroup
  icon: LucideIcon
  mobilePrimary?: boolean
}

export const crmRouteRegistry: readonly CrmRouteEntry[] = [
  {
    id: "overview",
    path: "",
    href: "/crm",
    title: "Обзор",
    shortTitle: "Обзор",
    description: "Сводная точка входа в CRM.",
    group: "Работа",
    icon: LayoutDashboard,
    mobilePrimary: true,
  },
  {
    id: "leads",
    path: "leads",
    href: "/crm/leads",
    title: "Заявки",
    shortTitle: "Заявки",
    description: "Маршрут раздела заявок.",
    group: "Работа",
    icon: MessageSquareText,
    mobilePrimary: true,
  },
  {
    id: "bookings",
    path: "bookings",
    href: "/crm/bookings",
    title: "Бронирования",
    shortTitle: "Брони",
    description: "Маршрут раздела бронирований.",
    group: "Работа",
    icon: CalendarDays,
    mobilePrimary: true,
  },
  {
    id: "schedule",
    path: "schedule",
    href: "/crm/schedule",
    title: "Расписание ресурсов",
    shortTitle: "Расписание",
    description: "Маршрут общего расписания ресурсов.",
    group: "Работа",
    icon: ClipboardList,
  },
  {
    id: "customers",
    path: "customers",
    href: "/crm/customers",
    title: "Клиенты",
    shortTitle: "Клиенты",
    description: "Маршрут клиентской базы.",
    group: "Работа",
    icon: ContactRound,
  },
  {
    id: "tasks",
    path: "tasks",
    href: "/crm/tasks",
    title: "Задачи",
    shortTitle: "Задачи",
    description: "Маршрут рабочих задач.",
    group: "Работа",
    icon: ClipboardList,
    mobilePrimary: true,
  },
  {
    id: "finance",
    path: "finance",
    href: "/crm/finance",
    title: "Финансы",
    shortTitle: "Финансы",
    description: "Маршрут финансового раздела.",
    group: "Работа",
    icon: CreditCard,
  },
  {
    id: "cabins",
    path: "cabins",
    href: "/crm/cabins",
    title: "Домики",
    shortTitle: "Домики",
    description: "Маршрут справочника домиков.",
    group: "Ресурсы",
    icon: BedDouble,
  },
  {
    id: "bath-and-hot-tub",
    path: "bath-and-hot-tub",
    href: "/crm/bath-and-hot-tub",
    title: "Баня и чан",
    shortTitle: "Баня и чан",
    description: "Маршрут ресурсов бани и чана.",
    group: "Ресурсы",
    icon: Bath,
  },
  {
    id: "venues",
    path: "venues",
    href: "/crm/venues",
    title: "Площадки",
    shortTitle: "Площадки",
    description: "Маршрут площадок и залов.",
    group: "Ресурсы",
    icon: MapPinned,
  },
  {
    id: "camping",
    path: "camping",
    href: "/crm/camping",
    title: "Палаточный кемпинг",
    shortTitle: "Кемпинг",
    description: "Маршрут палаточного кемпинга.",
    group: "Ресурсы",
    icon: TentTree,
  },
  {
    id: "programs",
    path: "programs",
    href: "/crm/programs",
    title: "Программы",
    shortTitle: "Программы",
    description: "Маршрут программ и сценариев.",
    group: "События",
    icon: Sparkles,
  },
  {
    id: "events",
    path: "events",
    href: "/crm/events",
    title: "Мероприятия",
    shortTitle: "События",
    description: "Маршрут мероприятий.",
    group: "События",
    icon: House,
  },
  {
    id: "team",
    path: "team",
    href: "/crm/team",
    title: "Команда",
    shortTitle: "Команда",
    description: "Маршрут команды CRM.",
    group: "Управление",
    icon: UsersRound,
  },
  {
    id: "settings",
    path: "settings",
    href: "/crm/settings",
    title: "Настройки CRM",
    shortTitle: "Настройки",
    description: "Маршрут настроек CRM.",
    group: "Управление",
    icon: Settings,
  },
] as const

export const mobilePrimaryRoutes = crmRouteRegistry.filter(
  (route) => route.mobilePrimary,
)

export function getCrmRouteByPathname(pathname: string): CrmRouteEntry {
  const normalizedPathname = pathname.replace(/\/$/, "") || "/"

  return (
    [...crmRouteRegistry]
      .sort((left, right) => right.href.length - left.href.length)
      .find((route) => {
        const normalizedHref = route.href.replace(/\/$/, "")
        return (
          normalizedPathname === normalizedHref ||
          normalizedPathname.startsWith(`${normalizedHref}/`)
        )
      }) ?? crmRouteRegistry[0]!
  )
}
