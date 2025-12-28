# Architecture Prompt

Goal: define a simple offline-first architecture for the Boxxer MVP.

Prompt:
Design a minimal offline-first architecture for an Expo app. The app must run without backend calls, have deterministic optimization, and store history locally. Keep it simple and modular.

Summary of output:
- UI -> store -> local optimizer
- AsyncStorage for history
- Templates for quick start
