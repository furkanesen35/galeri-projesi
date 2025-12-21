# Webinars & Events (Marketing)

## Goal
Promote live/recorded webinars and allow registration.

## Scope (frontend POC)
- Frontend-only: list upcoming webinars with CTA; registration form works against mock; reminder emails not sent.
- Mirror visible uniqueness from site: event strip on homepage, date/time chips, CTA buttons, recording links.

## User Stories
- As marketing, I list upcoming webinars with dates and links.
- As a visitor, I register for a webinar and receive reminders.

## Data Model
- Webinar: id, title, datetime, timezone, presenters, description, registrationUrl, videoUrl (recording), tags.
- Registration: id, webinarId, name, email, company, consent, status.

## Frontend Implementation (POC)
- Components: homepage events strip/cards; webinar detail modal/page with register form; success state; recording link badges.
- State: mock webinars array with dates; client-side register action that adds to local list and shows confirmation banner.
- Timezone display: format dates with locale; simple timezone dropdown for preview.

## UI
- Events strip on homepage with CTA.
- Webinar detail modal/page with register form.
- Recording links after event.

## Mocking & Stubs
- Confirmation: show inline alert and optional .ics download generated client-side.
- Prevent duplicate registration per email in local state; display hint.

## Rules & Edge Cases
- Enforce GDPR consent capture and storage.
- Prevent duplicate registrations per email per event.
- Handle timezone display correctly for users.
