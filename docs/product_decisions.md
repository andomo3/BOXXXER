# Product Decisions
These decisions were made to maximise learning velocity, demo reliability, and architectural clarity during early development.

## Offline-First MVP

We chose an offline-first approach to remove friction during demos and user testing. All core features work without a network connection.

## Deterministic Optimizer

Results must be repeatable for the same inputs. This makes testing reliable and makes feedback easier to interpret.

## No Auth / No DB

Auth and database integration slow iteration and are unnecessary for early feedback. The MVP uses local storage only.

## Templates as Onboarding

Room templates let users start quickly without scanning or a backend. They also show value even in airplane mode.

## Deferred ML

ML training and inference are explicitly out of scope for MVP. The UI and flows are designed so ML can be layered later.
