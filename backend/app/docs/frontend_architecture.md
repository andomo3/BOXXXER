# Frontend Architecture

## Navigation

- Expo Router drives file-based navigation
- Tabs live under `app/(tabs)`
- Pack flow screens: `scan -> items -> results`

## State Management

- Zustand store in `lib/store.ts`
- `latest` holds the active result
- `history` persists via AsyncStorage
- `draftItems` holds the in-progress item list

## Services

- `services/optimizer.ts` provides deterministic plans
- `services/history.ts` handles persistence

## UI Composition

- Shared components in `components/` and `components/ui/`
- Tokens in `config/tokens.ts` control spacing, radius, shadows
- Colors in `config/colors.js` support a cohesive theme
