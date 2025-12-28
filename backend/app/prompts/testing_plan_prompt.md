# Testing Plan Prompt

Goal: add high-signal tests without heavy tooling.

Prompt:
Create lightweight tests for the optimizer and store logic. Focus on determinism, fragile rules, and history behavior. Keep setup minimal for Expo.

Summary of output:
- Jest with jest-expo preset
- Optimizer tests for capacity + determinism
- Store tests for history hydration + push
