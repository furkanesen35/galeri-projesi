# Billing, Invoicing & Reminders

## Goal
Issue invoices for reports, track payments, and send reminders.

## Scope (frontend POC)
- Frontend-only: generate invoice previews from mocked estimate/case data; no real sending or payments.
- Show visible UX: invoice builder, PDF preview stub, reminder scheduling UI, status chips.
- Keep numbering and payment logic as placeholders for backend.

## User Stories
- As billing, I generate an invoice from a case/estimate with one click.
- As finance, I send dunning letters (Mahnungen) on overdue invoices.

## Data Model
- Invoice: id, caseId, customerId, invoiceNo, issueDate, dueDate, lineItems[], net, tax, gross, currency, status (draft/sent/paid/overdue/cancelled), pdfUri.
- Reminder: id, invoiceId, level, sentAt, fee, templateId.
- Payment: id, invoiceId, amount, date, method, reference.

## Frontend Implementation (POC)
- Components: invoice form prefilled from mock estimate; line items list; totals and tax; status chip with transitions; reminder schedule list with add button.
- State: local store per invoice; allow marking paid/overdue locally; generate mock PDF link (data URL) for preview/download.
- Mock latency on save/send actions; show toast feedback.

## UI
- Invoice generator (prefill from estimate), edit terms/tax.
- PDF preview/download; send via email.
- Reminder scheduler with levels (1st/2nd/final); fees added to balance.

## Mocking & Stubs
- Numbering: generate pseudo numbers client-side for demo.
- Email send: simulate with toast + activity log entry.
- Payments: allow manual add of payment rows; recalc balance locally.

## Rules & Edge Cases
- Immutable invoice numbers after "sent"; use credit note for reversals.
- Partial payments and balance display.
- Localized templates and currencies.
