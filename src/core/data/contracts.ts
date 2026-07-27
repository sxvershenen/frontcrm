import type {
  BackendEntity,
  ConflictPayload,
  EntityId,
  ValidationIssue,
} from "@/core/entities/types"

export type SortDirection = "asc" | "desc"

export type SortDescriptor = Readonly<{
  field: string
  direction: SortDirection
}>

export type FilterPrimitive = string | number | boolean | null
export type FilterValue = FilterPrimitive | readonly FilterPrimitive[]

export type FeatureListQuery = Readonly<{
  cursor?: string
  limit?: number
  search?: string
  sort?: readonly SortDescriptor[]
  filters?: Readonly<Record<string, FilterValue>>
  signal?: AbortSignal
}>

export type FeaturePage<TEntity extends BackendEntity> = Readonly<{
  items: readonly TEntity[]
  nextCursor: string | null
  total?: number
}>

export type MutationContext = Readonly<{
  idempotencyKey?: string
  expectedVersion?: number
  signal?: AbortSignal
}>

export type AdapterValidationError = Readonly<{
  kind: "validation"
  message: string
  issues: readonly ValidationIssue[]
}>

export type AdapterConflictError<TEntity extends BackendEntity> = Readonly<{
  kind: "conflict"
  message: string
  conflict: ConflictPayload<TEntity>
}>

export type AdapterServerError = Readonly<{
  kind: "server"
  message: string
  status?: number
  retryable?: boolean
}>

export type AdapterPermissionError = Readonly<{
  kind: "permission"
  message: string
}>

export type AdapterError<TEntity extends BackendEntity = BackendEntity> =
  | AdapterValidationError
  | AdapterConflictError<TEntity>
  | AdapterServerError
  | AdapterPermissionError

export interface FeatureAdapter<
  TEntity extends BackendEntity,
  TCreateInput,
  TUpdateInput,
> {
  list(query?: FeatureListQuery): Promise<FeaturePage<TEntity>>
  get(id: EntityId, signal?: AbortSignal): Promise<TEntity | null>
  create(input: TCreateInput, context?: MutationContext): Promise<TEntity>
  update(
    id: EntityId,
    input: TUpdateInput,
    context?: MutationContext,
  ): Promise<TEntity>
  archive(id: EntityId, context?: MutationContext): Promise<TEntity>
}

export type AsyncResourceState<TData, TError = AdapterError> =
  | Readonly<{ status: "idle"; data?: undefined; error?: undefined }>
  | Readonly<{ status: "loading"; data?: TData; error?: undefined }>
  | Readonly<{ status: "success"; data: TData; error?: undefined }>
  | Readonly<{ status: "error"; data?: TData; error: TError }>

export type FeatureListController<TEntity extends BackendEntity> = Readonly<{
  resource: AsyncResourceState<FeaturePage<TEntity>, AdapterError<TEntity>>
  query: FeatureListQuery
  setQuery(next: FeatureListQuery): void
  refresh(): void
}>

export type FeatureEntityController<
  TEntity extends BackendEntity,
  TUpdateInput,
> = Readonly<{
  resource: AsyncResourceState<TEntity | null, AdapterError<TEntity>>
  save(input: TUpdateInput, context?: MutationContext): Promise<TEntity>
  refresh(): void
}>

export interface FeatureHooks<
  TEntity extends BackendEntity,
  TUpdateInput = unknown,
> {
  useList(query?: FeatureListQuery): FeatureListController<TEntity>
  useEntity(
    id: EntityId | null,
  ): FeatureEntityController<TEntity, TUpdateInput>
}
