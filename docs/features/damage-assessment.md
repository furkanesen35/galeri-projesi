# Damage Assessment & Claim Intake

## Goal
Fast, guided capture of damage cases (haftpflicht/kasko/kurz) with photos, notes, cost basis, and workflow status.

## Scope (frontend POC)
- Frontend-only: mock data/services; no live CRUD. Keep API adapter boundary for later.
- Showcase flows that are visible on the site: quick intake wizard, damage grid, photo gallery with tags, status timeline pills.
- Use realistic seed data + optimistic UI; fall back to in-memory store.

## User Stories
- As a reviewer, I create a new case with vehicle, claimant, insurer, and policy details in under 2 minutes.
- As an assessor, I capture damages with annotated photos and structured parts/operations.
- As billing, I track claim status (draft → submitted → approved → closed) with timestamps.

## Data Model
- Case: id, type (liability, casco, short), status, claimant, insurer, policyNo, accidentDate, location, notes.
- Vehicle: vin, make, model, year, plates, mileage, drivetrain, trim, options.
- Damage Items: id, partId, description, severity, repairType (replace/repair), laborHours, paintHours, partsCost, laborRate, paintRate, depreciation.
- Photos: id, uri, tags (damage, overview, documents), annotations.
- Documents: reportPdf, attachments.
- Audit: createdBy, createdAt, updatedAt.

## Frontend Implementation (POC)
- Screens/sections: New-case wizard, damage grid/table, photo gallery with tag filters, status timeline, activity log slice (dummy entries).
- State: keep `cases` and `damageItems` in store (Zustand/React Query mock). Support status transitions locally.
- Mock APIs: use fixtures + small delay to simulate latency. Structure adapters so backend can be swapped later.
- Components: table with inline edit; photo gallery with tag chips and upload dropzone (mock upload + progress UI).

## UI
- New-case wizard (vehicle + claimant + insurer + accident details).
- Damage grid/table with inline edit; bulk add from parts catalog.
- Photo gallery with tags/filters; upload + annotate.
- Status pill with timeline; activity log.

## Mocking & Stubs
- VIN decode + license plate: show mocked decode results; allow manual edit.
- Parts catalog: provide a small local JSON catalog for bulk-add.
- Photo upload: fake signed URL + progress; store to in-memory blob URL.

## Rules & Edge Cases
- Enforce allowed status transitions; keep audit trail.
- Handle offline photo capture queue; resumable uploads.
- Currency/locale aware formatting.
