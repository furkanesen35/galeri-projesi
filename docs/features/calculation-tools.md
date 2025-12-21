# Calculation & Costing Tools

## Goal
Provide calculators for repair costs, depreciation/minderwert, and restwert distribution.

## Scope (frontend POC)
- Frontend-only: client-side math with seeded data; no persistence.
- Highlight obvious UI: editable grid with live totals, depreciation form, restwert offers list.
- Keep structure ready for backend by isolating calc helpers and adapters.

## User Stories
- As an assessor, I add parts/operations and see live total (parts, labor, paint, tax).
- As a reviewer, I run a depreciation calculator and export the breakdown.

## Data Model
- Estimate: id, caseId, currency, totals (parts, labor, paint, misc, tax, grand).
- Line Item: id, estimateId, partId, description, qty, unitPrice, laborHours, paintHours, rates, taxCode.
- Depreciation Run: id, method, inputs (age, mileage, condition), result, rationale.
- Restwert: bidders[], offers, selectedOffer.

## Frontend Implementation (POC)
- Components: line-item grid with inline qty/rates and totals ribbon; depreciation calculator card; restwert offers list with select button.
- State: local store for estimate snapshot; recompute totals on edit; show tax breakdown and rounding in UI.
- Mock data: seed with a few parts/operations; allow adding custom lines; simulate provider suggestions via fixture dropdown.

## UI
- Grid editor with inline qty/rates; totals ribbon.
- Depreciation form with presets; rationale text.
- Restwert panel: offers list, attach docs, select winning offer.

## Mocking & Stubs
- Provide static tax rules per locale toggle; show rounding note.
- Restwert: load offers from JSON, allow selecting winner, and show confirmation banner.

## Rules & Edge Cases
- Version estimates; keep history per status change.
- Tax rounding rules per jurisdiction.
- Lock estimate once invoiced; require revision copy for changes.
