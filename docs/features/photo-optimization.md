# Photo Auto-Optimization

## Goal
Automatically resize/optimize photos before upload to speed transfers while keeping detail.

## Scope (frontend POC)
- Frontend-only: run client-side resize/compress; no server pipeline.
- Visible UX: toggle to enable optimization, preview of original vs optimized size/quality.

## Frontend Implementation (POC)
- Components: upload control with per-file optimization step; diff panel showing size reduction; quality slider (preset).
- State: per-file original + optimized blob URLs; progress indicators.
- Mocking: use canvas/worker to downscale; simulate larger savings in UI.

## Edge/UX
- Fallback to original if optimization fails; show notice.
- Honor EXIF orientation; strip GPS by default.
