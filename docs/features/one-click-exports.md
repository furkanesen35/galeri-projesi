# 1-Click Exports (Audatex/DAT/GT Motive/Restwert)

## Goal
Demonstrate seamless export of case/estimate data to partner platforms with minimal user effort.

## Scope (frontend POC)
- Frontend-only: simulate exports with progress + success/fail toasts.
- Visual emphasis: provider selector, mapped fields summary, status badges, retry.

## Frontend Implementation (POC)
- Components: export panel with provider cards; mapping summary modal; progress bar + log; status chips per provider.
- State: per-provider export job in-memory; allow retry/cancel; keep last result.
- Mocking: staged statuses (queued → exporting → success/fail) with delays; provide sample payload preview.

## Edge/UX
- Show missing-field warnings before export (client validation).
- Friendly fail message with suggested fix + retry.
- Keep audit-like history list in UI only.
