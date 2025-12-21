# Vehicle Valuation

## Goal
Quickly compute fair market value with option sets and comparables.

## Scope (frontend POC)
- Frontend-only with mocked valuation responses; highlight speed and clarity of adjustments.
- Show obvious UI: VIN/plate decode panel, value breakdown card, comparables list with filters.
- Keep provider adapters as stubs; no real pricing calls.

## User Stories
- As an assessor, I enter VIN/plate and get pre-filled specs and base value.
- As a reviewer, I adjust options/mileage/condition to see recalculated value instantly.

## Data Model
- Valuation: id, vehicleId, valuationMethod (market/guide/custom), baseValue, adjustments[], finalValue, currency, valuationDate.
- Adjustment: label, amount, reason, source.
- Comparables: source, link, price, mileage, location, vehicle snapshot.

## Frontend Implementation (POC)
- Components: decode input bar with mocked decode, summary chips; value card with base → adjustments → final; comparables list with filters (radius, mileage band, fuel type) backed by fixtures.
- State: local store for valuation snapshot; allow editing adjustments inline.
- Mock latency + loading skeletons to mimic real calls; show fallback/error states.

## UI
- Decode panel (VIN/plate search) with decoded spec summary.
- Value card showing base → adjustments → final value.
- Comparables list with filters (radius, mileage band, fuel type).

## Mocking & Stubs
- Provide sample comparables JSON; allow toggling providers to show differences (UI only).
- Make adjustments auditable in UI (history list) even if stored in-memory.

## Rules & Edge Cases
- Track provenance of each adjustment; show audit trail.
- Handle provider fallbacks/timeouts gracefully.
- Lock valuation snapshot once attached to a report.
