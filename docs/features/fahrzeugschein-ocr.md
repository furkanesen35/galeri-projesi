# Fahrzeugschein Scanner (OCR)

## Goal
Showcase scanning/uploading a Fahrzeugschein to auto-fill vehicle/holder fields.

## Scope (frontend POC)
- Frontend-only: mock OCR results from a sample image; allow manual correction.
- Highlight the visible UX: upload/scan, side-by-side photo + extracted fields, hover-to-verify.

## Frontend Implementation (POC)
- Components: upload/drag-drop; preview with zoom; extracted fields form (VIN, holder, registration data) with confidence badges; "apply" button to fill a case form.
- State: in-memory extracted payload; allow edit/override; store last used image in session.
- Mocking: use a fixture JSON per sample image; add 400–800 ms artificial delay; surface confidence per field.

## Edge/UX
- Show mismatch highlighting when user edits vs. extracted.
- Provide "retry" and "use manual entry" fallbacks.
- Indicate GPS/EXIF strip info for privacy.
