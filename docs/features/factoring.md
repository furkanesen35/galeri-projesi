# Factoring CTA (Forderungen sofort bezahlt)

## Goal
Present the option to assign claims to a factoring provider and show instant payout conceptually.

## Scope (frontend POC)
- Frontend-only: informational CTA with a mock request flow; no real payouts.
- Emphasize UI: explainer, eligibility checklist, request modal, status badge.

## Frontend Implementation (POC)
- Components: CTA card in billing area; checklist of requirements; request form (amount, invoice ref); status pill (pending/approved/declined mock); confirmation screen.
- State: local request record; simulated provider decision after delay.
- Mocking: randomize outcome or select manually for demo.

## Edge/UX
- Clarify that this is a demo; link to docs/FAQ.
- Provide "contact sales" button to hand off.
