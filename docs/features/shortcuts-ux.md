# Shortcuts & Micro-Efficiencies

## Goal
Speed up daily tasks with small UX accelerators (date shortcuts, universal search, % math in currency fields).

## Scope (frontend POC)
- Frontend-only: implement keyboard shortcuts and smart inputs on key screens.
- Visible UX: helper tooltips, inline hints, command palette feel.

## Frontend Implementation (POC)
- Features: date input tokens ("g"=yesterday, "v"=day before), currency fields that accept math/percent, command palette/universal search for cases, keyboard shortcuts for save/next.
- Components: command palette modal; smart input with live parse; hint text under fields; hotkey guide.
- State: local parsing helpers; recent-search history.

## Edge/UX
- Show parsed result before commit; allow undo.
- Avoid clashing with browser shortcuts; configurable key map.
