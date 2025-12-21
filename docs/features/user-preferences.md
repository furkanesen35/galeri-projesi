# Sticky Preferences (Views & Defaults)

## Goal
Remember user choices (photo views, invoice lines, restwert validity, etc.) to reduce setup time.

## Scope (frontend POC)
- Frontend-only: persist preferences to localStorage/session; no server profile.
- Showcase visible effect: when returning to a screen, prior view/layout/rules are restored.

## Frontend Implementation (POC)
- Preferences examples: photo gallery view mode; default invoice line set; default restwert validity days; default filters.
- Mechanism: small `usePreference(key, default)` hook reading/writing localStorage; hydration guards to avoid flicker.
- UI: "remember this setting" checkbox/tooltips near configurable areas; reset-to-default button.

## Edge/UX
- Indicate when a setting is remembered; show toast on reset.
- Namespaced keys to avoid collisions per user/org.
