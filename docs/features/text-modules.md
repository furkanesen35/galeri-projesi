# Text Modules & Templates

## Goal
Reusable, localized text blocks for reports, emails, and reminders.

## Scope (frontend POC)
- Frontend-only: manage template cards and preview rendering with mock variables.
- Focus on visible UX: library list with locale/context filters, editor with variable chips, live preview.
- No persistence; keep local store and export/import JSON for handoff.

## User Stories
- As an assessor, I insert predefined phrases into reports.
- As an admin, I manage templates with variables (customer name, claim no., vehicle).

## Data Model
- Template: id, name, locale, context (report/email/reminder), body (markdown/HTML), variables[], version, isActive.
- Variable: key, description, defaultValue, required.

## Frontend Implementation (POC)
- Components: template list/grid; detail drawer with editor (markdown/HTML toggle), variable picker, preview pane; insert flow stub for report editor.
- State: in-memory templates with version history list; simple publish toggle.
- Mock render: replace {{variable}} placeholders client-side; show validation errors when missing required vars.

## UI
- Template library with search/filter by locale/context.
- Editor with variable picker and preview.
- Insertion picker inside report editor.

## Mocking & Stubs
- Locale switcher to preview translations; seed a few locales.
- Export/import: allow download/upload of template JSON to mimic backend sync.

## Rules & Edge Cases
- Versioned templates; keep history and rollback.
- Validation that required variables are provided.
- Safe rendering (escape user input) to prevent injection.
