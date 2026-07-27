# CRM «Свистоплясово» — Stage 00

## Запуск

```bash
npm install
npm run dev
```

Проверки:

```bash
npm run lint
npm run typecheck
npm run build
```

## Настроено

- React + TypeScript + Vite;
- React Router;
- Tailwind CSS v4;
- shadcn/ui preset `bIkezqK` (`Vega`, `Neutral`, `Lucide`, `Roboto`, default radius);
- aliases `@/*`;
- ESLint, Prettier, typecheck и production build;
- пустой mock/data adapter для последующей замены на API.

## Замороженные общие файлы

Без отдельной задачи не менять:

- `components.json`;
- `src/styles/globals.css`;
- `src/lib/utils.ts`;
- `vite.config.ts` и aliases в `tsconfig*.json`;
- базовый контракт `src/data/contracts.ts`;
- корневую router-схему в `src/app/router.tsx`.

Новые feature-модули не должны изменять `src/components/ui`, preset, theme tokens или глобальные стили.

## Пока заглушки

- все CRM routes;
- application shell;
- страницы и таблицы;
- редакторы и overlay;
- бизнес-сущности и формы;
- реальные mock-наборы данных;
- API-клиент, авторизация и права доступа.
