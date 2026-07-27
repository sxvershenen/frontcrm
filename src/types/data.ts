export type EntityId = string

export type EntityMeta = {
  id: EntityId
  version: number
  updatedAt: string
  updatedBy: EntityId | null
}

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
