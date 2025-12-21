# Photo & Evidence Editor

## Goal
Manage and annotate photos for reports with minimal friction.

## Scope (frontend POC)
- Frontend-only: mock uploads and annotations; store in-memory/blob URLs.
- Spotlight visible UX: drag/drop upload, tag chips, annotation canvas with undo/redo, export preview.
- Simulate EXIF read and GPS stripping in UI (no real metadata writes).

## User Stories
- As an assessor, I upload multiple photos from mobile/desktop with auto-tags.
- As a reviewer, I annotate damages (arrows, circles, labels) and export web/PDF ready images.

## Data Model
- Photo: id, caseId, uri, mime, width, height, tags[], caption, takenAt, sourceDevice.
- Annotation: id, photoId, type (arrow/shape/text/blur), coords, color, text.

## Frontend Implementation (POC)
- Components: upload dropzone with per-file progress; gallery grid with filters; annotation modal/canvas with shapes/text/blur tools and undo stack; export button that generates a derived image client-side.
- State: store photos + annotations in local store; persist to session/localStorage for demo feel.
- Mock progress + latency for uploads; show error/retry states.

## UI
- Upload with drag/drop and progress per file.
- Tagging chips (overview, VIN, odometer, damage, documents).
- Annotation canvas with undo/redo; export optimized JPEG/WebP.

## Mocking & Stubs
- EXIF: parse via client lib; on export, show UI message that GPS was stripped.
- Thumbnails: generate client-side with canvas; keep originals in memory.

## Rules & Edge Cases
- Prevent blocking on large uploads; chunk + resume.
- Privacy: remove GPS unless explicitly kept.
- Maintain original + derivative versions; keep references in report.
