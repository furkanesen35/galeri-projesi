# Galeri Frontend (React + TypeScript + Tailwind)

Demo-ready scaffold that matches the design document: multi-language, theming, drag & drop, calendar, and admin panels for vehicles, tasks, photos, and settings.

## Stack
- React 18 + TypeScript
- Vite
- Tailwind CSS
- React Router
- Zustand (theme & language state)
- TanStack Query (data fetching-ready)
- @hello-pangea/dnd (drag & drop)
- react-big-calendar + dayjs (calendar)
- i18next + react-i18next (i18n)

## Getting started
```bash
npm install
npm run dev
```
App runs on http://localhost:5173

## Environment
- `VITE_API_BASE_URL` (optional): REST API base; defaults to http://localhost:8080/api.

## Next steps
- Wire real API endpoints in `src/api/client.ts`.
- Replace mock data in pages with TanStack Query hooks.
- Add auth guard/redirection to `/login`.
- Persist layout/drag order via backend endpoints.
- Flesh out form validation and upload endpoints.
