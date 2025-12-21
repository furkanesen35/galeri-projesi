# Contact Import & CRM Lite

## Goal
Manage contacts (customers, insurers, partners) and import existing data.

## Scope (frontend POC)
- Frontend-only: showcase directory UI, CSV import wizard with mock validation, and typeahead attach control.
- No real persistence; keep contacts in local store; allow export as CSV to prove shape.

## User Stories
- As staff, I import a CSV of contacts and map columns.
- As an assessor, I attach customers/insurers to cases quickly.

## Data Model
- Contact: id, type (customer/insurer/partner), name, emails[], phones[], address, taxId, notes, tags[].
- Import Job: id, fileUri, mapping, status, rowCounts, errors[].

## Frontend Implementation (POC)
- Components: contacts table with search + tags filter; CSV import wizard (upload → map columns → preview errors → finish) using mock parsing; inline selector/typeahead for attaching contact to a case form.
- State: local contacts list with tags; import job state with progress bar + error rows.
- Mock latency on import processing; show success + error counts.

## UI
- Contact directory with search and tags.
- Import wizard: upload → map columns → validate sample → run.
- Inline selector with typeahead in case creation.

## Mocking & Stubs
- Dedup: simple client-side highlight when email/phone matches existing contact.
- Export: client-generated CSV of current list.

## Rules & Edge Cases
- GDPR: lawful basis tracking for communications; deletion/anonymization.
- Deduplicate on email/phone; merge suggestions.
- Large import batching with progress and error report.
