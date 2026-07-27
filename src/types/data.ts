import type {
  BackendEntity,
  EntityId,
} from "@/core/entities"

export type { EntityId } from "@/core/entities"

export type EntityMeta = BackendEntity

export type ListQuery = {
  cursor?: string
  limit?: number
  search?: string
  sort?: string
  filters?: Readonly<Record<string, string | number | boolean>>
}

export type ListResult<T> = {
  items: readonly T[]
  nextCursor: string | null
}

export type LegacyEntityReference = EntityId
