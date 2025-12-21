# Mietwagenspiegel (Rental Car Price Mirror)

## Goal
Show automatic rental car pricing retrieval (DAT Mietwagenspiegel) with minimal input.

## Scope (frontend POC)
- Frontend-only: mocked rate lookup with filters; no real provider call.
- Highlight UI: rate table by class/duration, filters for region/time, and attach-to-case action.

## Frontend Implementation (POC)
- Components: lookup form (region/date/class); results table with daily/weekly rates; attach button adding a line to estimate; loading skeletons.
- State: local mock results keyed by inputs; allow override/edit of selected rate.
- Mocking: small latency; randomize within bounds for realism.

## Edge/UX
- Show last-refreshed timestamp; allow manual refresh.
- Empty/error states with retry.
