# Reporting & Analytics

## Goal
Provide operational dashboards and exportable reports.

## Scope (frontend POC)
- Frontend-only: mock metrics and charts; no live exports.
- Emphasize visible UX: KPI cards, charts with date filters, export CTA with disabled state.
- Keep data-fetch boundary for future backend wiring.

## User Stories
- As management, I see counts and revenue by case type and status.
- As finance, I export monthly invoices and payments to CSV/DATEV.

## Data Model
- Metrics snapshots: date, caseCounts, revenue, aging buckets, average cycle time.
- Report definition: id, dimensions, measures, filters, schedule.

## Frontend Implementation (POC)
- Components: dashboard cards (cases, revenue, cycle time, overdue invoices); charts (bar/line/pie) fed by fixtures; date range picker; export panel that triggers a mock download.
- State: local store for filters; loading/skeleton states; empty-state messaging.
- Mock data: seed several time ranges; randomize slightly to show interactions.

## UI
- Dashboard cards (cases, revenue, cycle time, overdue invoices).
- Charts (bar/line/pie) with date filters.
- Export panel with format + columns selector; email delivery option.

## Mocking & Stubs
- Export: generate CSV client-side from fixture; show toast + download.
- Permissions: toggle view/hide of financial cards via local role flag to mirror RBAC behavior.

## Rules & Edge Cases
- Timezone-aware date grouping.
- Respect user permissions per dimension (e.g., hide financials).
- Cache heavy aggregates; fall back to async exports.
