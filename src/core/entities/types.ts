export type EntityId = string
export type IsoDateTime = string

export type EntityActor = Readonly<{
  id: EntityId
  displayName: string
}>

export type EntityCapabilities = Readonly<{
  read: boolean
  update: boolean
  archive: boolean
  restore?: boolean
  delete?: boolean
  [capability: string]: boolean | undefined
}>

export type BackendEntity = Readonly<{
  id: EntityId
  version: number
  updatedAt: IsoDateTime
  updatedBy: EntityActor | null
  capabilities: EntityCapabilities
}>

export type ValidationIssue = Readonly<{
  field: string
  message: string
  code?: string
  tabId?: string
}>

export type ConflictPayload<TEntity extends BackendEntity = BackendEntity> = Readonly<{
  localVersion: number
  serverVersion: number
  serverEntity?: TEntity
}>

export type EditorState =
  | "clean"
  | "dirty"
  | "saving"
  | "saved"
  | "validation-error"
  | "server-error"
  | "readonly"
  | "conflict"
