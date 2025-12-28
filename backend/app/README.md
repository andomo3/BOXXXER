# Boxxer (Offline-First MVP)

Boxxer is an offline-first packing assistant built with Expo (React Native). It turns item lists into deterministic packing plans and keeps results saved locally so the app works fully without network access.

## Features

- Offline-first flow with local templates and manual item entry
- Deterministic optimizer that generates box plans from item data
- History that persists across app restarts
- Polished UI with shared components and design tokens

## Offline-First Rationale

This MVP prioritizes reliability and fast feedback. All core flows run on-device:

- No required backend calls
- No auth or database dependencies
- Works in airplane mode

## Architecture (Overview)

```
UI Screens -> Zustand Store -> Optimizer (local)
       |              |
       |              +-> AsyncStorage (history)
       |
       +-> Templates (config)
```

## Tech Stack

- Expo SDK 53, React Native 0.79
- Expo Router for navigation
- Zustand for state management
- AsyncStorage for persistence

## Run Locally

From `backend/app`:

```bash
npm install
npm start
```

Android emulator:

```bash
npm run android
```

## Tests

```bash
npm test
```

## Project Structure (Core)

- `app/` Expo Router screens
- `components/` shared UI components
- `config/` tokens, colors, templates
- `services/` local optimizer + history persistence
- `lib/` Zustand store

## Roadmap (Post-MVP)

- Optional backend for sync and multi-device history
- ML-assisted vision and packing recommendations
- Auth and multi-user support

## Docs

See `backend/app/docs` for architecture, design system, and product decisions.
