# User Roles & Permissions

## Goal
Control access to financials, cases, and admin settings.

## Scope (frontend POC)
- Frontend-only: role/permission toggles and view-hiding logic; no real auth/SSO.
- Demonstrate visible effects: financial widgets hide/show, edit buttons disabled, permission-denied states.

## User Stories
- As an admin, I manage roles (owner, admin, assessor, billing, read-only).
- As a user, I see only cases I’m allowed to see (own/team).

## Data Model
- User: id, email, name, roles[], teams[], status.
- Role: id, name, permissions[].
- Permission examples: cases.read, cases.write, finances.read, finances.write, templates.admin, users.admin.
- Access Control List: userId/roleId → scope (all/team/own).

## Frontend Implementation (POC)
- Components: roles list with permissions matrix; per-user role selector; demo switcher to impersonate roles.
- Guards: route/component guards that hide financial cards and disable edits when lacking permission.
- State: local store with roles/permissions; default seed for owner/admin/assessor/billing/read-only.

## UI
- Admin panel for users/roles; scope selectors (all/team/own).
- Permission-denied UX with request-access flow.

## Mocking & Stubs
- Audit log: local list of role changes to show UX.
- SSO placeholder: simple "Connected" badge with tooltip.

## Rules & Edge Cases
- Enforce row-level filtering by scope.
- Audit every permission change.
- Protect financial routes by default; need explicit grant.
