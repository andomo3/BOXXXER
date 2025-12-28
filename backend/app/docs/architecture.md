# Architecture

## Goals

- Offline-first operation
- Deterministic optimizer
- Simple, modular structure for MVP speed

## High-Level Components

- UI: Expo Router screens and shared components
- State: Zustand store (results, history, draft items)
- Services: local optimizer and AsyncStorage history
- Config: templates, colors, tokens

## Data Flow

```
Templates/Manual -> Draft Items (store)
Draft Items -> Optimizer (local) -> Result
Result -> Store -> History -> AsyncStorage
```

## Offline Strategy

- All critical actions run on-device
- No backend API calls required for MVP
- History uses AsyncStorage with schema versioning

## Non-Goals

- Machine learning training/inference
- Auth and multi-user accounts
- External database integration
