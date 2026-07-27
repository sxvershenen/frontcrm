import type { EntityId, EntityMeta, ListQuery, ListResult } from "@/types/data"

export type {
  AdapterError,
  FeatureAdapter,
  FeatureHooks,
  FeatureListQuery,
  FeaturePage,
  MutationContext,
  SortDescriptor,
} from "@/core/data"

/** @deprecated Feature modules should implement FeatureAdapter from @/core/data. */
export interface DataSource {
  list<T extends EntityMeta>(
    resource: string,
    query?: ListQuery,
  ): Promise<ListResult<T>>
  get<T extends EntityMeta>(resource: string, id: EntityId): Promise<T | null>
}
