import type { EntityId, EntityMeta, ListQuery, ListResult } from "@/types/data"

export interface DataSource {
  list<T extends EntityMeta>(resource: string, query?: ListQuery): Promise<ListResult<T>>
  get<T extends EntityMeta>(resource: string, id: EntityId): Promise<T | null>
}
