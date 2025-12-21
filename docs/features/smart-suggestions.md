# Smart Suggestions & Recents

## Goal
Suggest recently used entities (customers, workshops, lawyers) to reduce typing.

## Scope (frontend POC)
- Frontend-only: local frequency/recency model; no real ML.
- Focus on visible UX: typeahead with "recent" and "suggested" sections; chips in forms.

## Frontend Implementation (POC)
- Components: typeahead input with grouped suggestions; recent chips beneath form fields; "pin favorite" action.
- State: local store tracking counts and last-used timestamps; seed with fixtures.
- Mocking: simple scoring (recency + count) to order suggestions; reset/clear button.

## Edge/UX
- Indicate why suggested ("used 3x this week").
- Provide keyboard support (arrows/enter) for speed.
