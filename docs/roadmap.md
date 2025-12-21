# Frontend POC Roadmap (autoiXpert-inspired)

Goal: Ship a visible, demo-ready frontend that mirrors the key UX highlights, using mocks/fixtures and swappable adapters.

## Guiding Principles
- Frontend-only: no real backend calls; fixtures + mock delays; API adapters isolated.
- Showcase-first: prioritize screens the site highlights (hero, CTA flows, wizards, photo UX, exports).
- Reuse: shared layout, design tokens, mock service layer, and state hooks (Zustand/React Query mock).

## Suggested Order
1) **Foundation & Layout**
   - App shell/nav, theming tokens, typography/spacing, responsive grid.
   - Mock service layer with fixtures + latency; adapter interfaces.
2) **Marketing Shell**
   - Hero with dual CTA/video modal, trust logos, hotspot explainer, webinar strip, testimonial carousel, cookie banner, footer.
3) **Dashboard Snapshot**
   - KPI cards fed by fixtures; charts with date filter; quick links to key flows.
4) **Damage Intake + Photos**
   - Case wizard, damage grid/table (inline edit), status timeline, photo gallery with tags + annotation modal; mock upload progress.
5) **Photo Auto-Optimization**
   - Client-side resize/compress toggle; original vs optimized preview.
6) **Fahrzeugschein Scanner (OCR mock)**
   - Upload + extracted fields pane with confidence badges; apply to case form.
7) **Valuation + Mietwagenspiegel + Estimate**
   - VIN/plate decode mock, value card (base→adjustments→final), comparables list.
   - Mietwagenspiegel lookup mock; attach rate to estimate.
   - Estimate grid with live totals, tax breakdown, depreciation card, restwert offers list (mock).
8) **Billing & Factoring CTA**
   - Invoice builder from mock estimate, status chips, reminder list; mock PDF preview.
   - Factoring CTA card with eligibility checklist and request modal (mock decision).
9) **1-Click Exports**
   - Provider cards (Audatex/DAT/GT Motive/Restwert), mapping summary, progress + retry, history log (UI only).
10) **Text Modules & Branding**
    - Template library with variable chips + preview; export/import JSON.
    - Letterhead/branding configurator with presets, logo upload, color/font controls, live preview.
11) **Smart Suggestions & Sticky Preferences**
    - Typeahead with recents/suggestions; pin favorites.
    - Preference hook storing view/layout/defaults in localStorage; reset controls.
12) **Shortcuts & Micro-Efficiencies**
    - Command palette/universal search; date shortcuts; math/percent in currency fields; hotkey guide.
13) **Permissions Facade**
    - Role switcher demo; guard/hide financial widgets and edit buttons based on local role.
14) **Webinars/Events Strip**
    - Upcoming events cards, register modal (mock), recording badges.
15) **Reporting & Exports**
    - KPI cards + charts with fixtures, export CSV client-side, empty/loading states.

## Cross-Cutting Setup
- Design tokens: spacing, colors (light/dark), typography scale, shadows, radii.
- Data: seed fixtures per feature; mock latency; error states; skeletons.
- State: keep stores modular (cases, photos, valuation, estimate, invoices, templates, prefs, roles).
- Accessibility: focus states, reduced motion, keyboard paths for key flows (command palette, typeahead, shortcuts).

## Milestone Cuts
- M1: Foundation + Marketing Shell + Dashboard snapshot.
- M2: Damage intake + Photos + Optimization + OCR mock.
- M3: Valuation + Mietwagenspiegel + Estimate + Billing UI.
- M4: Exports + Branding/Text modules + Suggestions/Prefs + Shortcuts.
- M5: Permissions facade + Webinars strip + Reporting export.

## Next Steps (immediate)
- Wire mock service layer + design tokens.
- Build Marketing Shell page and Dashboard snapshot.
- Start Damage Intake + Photo gallery/annotation with mock uploads.
