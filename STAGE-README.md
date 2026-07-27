# CRM «Свистоплясово» — Stage 02 Core UI

## Запуск

```bash
npm install
npm run dev
```

Проверка:

```bash
npm run check
```

Техническая витрина: `http://localhost:5173/dev/ui`.

## Публичные компоненты

Все компоненты экспортируются из `@/components/common`.

| Компонент | Основные props |
|---|---|
| `EntityEditorOverlay` | `open`, `title`, `state`, `tabs`, `activeTab`, `onTabChange`, `route`, `onSave`, `children` |
| `EntityEditorTabs` | `tabs`, `activeTab`, `onTabChange` |
| `EditorStatusIndicator` | `state` |
| `PageHeader` | `title`, `description`, `eyebrow`, `meta`, `actions` |
| `ViewToolbar` | `filters`, `sort`, `displaySettings`, `viewSwitcher`, `startActions`, `endActions`, `summary` |
| `FilterButton` | `onClick`, `count`, `active`, `label` |
| `SortButton` | `onClick`, `active`, `label` |
| `DisplaySettingsButton` | `onClick`, `active`, `label` |
| `DataTable<TRow>` | `rows`, `columns`, `rowKey`, `sort`, `onSortChange`, `onRowClick`, `state` |
| `MobileList<TRow>` | `rows`, `rowKey`, `renderItem`, `onItemClick`, `state` |
| `ResponsiveDataView` | `desktop`, `mobile` |
| `DataViewState` | `kind`, `title`, `description`, `action`, `compact` |

Backend-ready сущности импортируются из `@/core/entities`: `BackendEntity`, `EntityId`, `EntityActor`, `EntityCapabilities`, `EditorState`, `ValidationIssue`, `ConflictPayload`.

Адаптеры и hook-контракты импортируются из `@/core/data`: `FeatureAdapter`, `FeatureHooks`, `FeatureListQuery`, `FeaturePage`, `SortDescriptor`, `AdapterError`, `MutationContext`.

## Открытие сущности в общем overlay

Feature открывает URL сущности через уже существующий `useBackgroundNavigate()`:

```tsx
const openEntity = useBackgroundNavigate()
openEntity(`/crm/customers/${customerId}`)
```

Route сущности рендерит общий редактор:

```tsx
<EntityEditorOverlay
  open={Boolean(customerId)}
  route={{ returnTo: "/crm/customers", closeMode: "auto" }}
  title={customer.name}
  state={editorState}
  tabs={tabs}
  activeTab={activeTab}
  onTabChange={setActiveTab}
  onSave={saveCustomer}
>
  <CustomerEditorContent />
</EntityEditorOverlay>
```

При наличии background location закрытие использует browser Back; прямой URL возвращается на `returnTo`. Dirty-state блокирует Back, Escape и закрытие до подтверждения.

## Table, mobile-list, filter, sort и display settings

Feature получает данные через собственный adapter/hooks и передаёт строки в два представления:

```tsx
<ViewToolbar
  filters={<FilterButton count={activeFilterCount} onClick={openFilters} />}
  sort={<SortButton onClick={openSort} />}
  displaySettings={<DisplaySettingsButton onClick={openColumns} />}
/>

<ResponsiveDataView
  desktop={
    <DataTable
      rows={items}
      columns={columns}
      rowKey={(item) => item.id}
      sort={sort}
      onSortChange={setSort}
      onRowClick={(item) => openEntity(item.id)}
    />
  }
  mobile={
    <MobileList
      rows={items}
      rowKey={(item) => item.id}
      renderItem={renderMobileItem}
      onItemClick={(item) => openEntity(item.id)}
    />
  }
/>
```

Фильтры, сортировка и видимые поля принадлежат feature и преобразуются в `FeatureListQuery`. Общие UI-компоненты не читают mock-массивы и не содержат бизнес-логику.

## Замороженные директории

Feature-чаты не изменяют:

- `src/components/ui/`;
- `src/components/common/`;
- `src/components/shell/`;
- `src/core/`;
- `src/app/navigation/`;
- `src/styles/globals.css`;
- `components.json`;
- `src/app/router.tsx` и `src/app/route-registry.ts`.

Feature создаётся только в `src/features/<feature-name>/`, экспортирует page/route/editor и сообщает интегратору необходимые подключения. Реальные CRM-страницы, формы и API на этом этапе остаются заглушками.
