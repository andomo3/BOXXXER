# Design System

## Principles

- Clear hierarchy and readable spacing
- Consistent components and states
- Accessible tap targets and labels

## Tokens

Defined in `config/tokens.ts`:

- `spacing`: consistent margins and padding
- `radius`: shared corner radius values
- `shadow`: reusable elevation styles

## Core Components

- `Card`: standard surface for grouped content
- `GTButton`: primary action component
- `StateViews`: empty, loading, error states
- `Toast`: lightweight feedback for validations

## Accessibility

- Button labels use `accessibilityLabel`
- Tap targets target 44x44 minimum
- Icons use Expo vector icons for Android compatibility
