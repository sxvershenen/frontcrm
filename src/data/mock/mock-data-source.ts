import type { DataSource } from "@/data/contracts"
import type { EntityId, EntityMeta, ListQuery, ListResult } from "@/types/data"

export class MockDataSource implements DataSource {
  async list<T extends EntityMeta>(
    _resource: string,
    _query?: ListQuery,
  ): Promise<ListResult<T>> {
    return { items: [], nextCursor: null }
  }

  async get<T extends EntityMeta>(
    _resource: string,
    _id: EntityId,
  ): Promise<T | null> {
    return null
  }
}
