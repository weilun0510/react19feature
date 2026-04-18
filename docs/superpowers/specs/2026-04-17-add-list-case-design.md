# Add List Case Design

## Goal

Add a new `09 新增数据到列表` case under the existing `use + Suspense` topic to demonstrate a promise-array based pattern for appending async items to a list.

## Problem

The older approach for list updates may appear clever, but it tends to introduce extra complexity:

- initialization can accidentally trigger duplicate requests
- repeated rapid clicks can make request ordering and rendering harder to reason about
- the mental model becomes more complex than necessary for a learning demo

This new case should show a simpler and more React-19-oriented way to think about list growth.

## Scope

- Add one new case to the existing `试读一` group
- Keep the current topic page and left-side navigation structure
- Model list items as an array of promises
- Initialize the list with one async item
- Allow users to append a new async item by clicking a button
- Render each list item through its own `Suspense` boundary
- Add short Chinese learning notes explaining why this approach is useful

## Out of Scope

- No new topic page
- No deletion, sorting, or editing behavior
- No server persistence

## Chosen Approach

Use `useState(() => [getMessage()])` to store a promise array, then append new promises with `setPromises((current) => [...current, getMessage()])`. Each promise is rendered as one list row wrapped by its own `Suspense`, so each row can resolve independently without forcing the whole list into one loading state.

## Learning Focus

This case should teach three ideas:

1. When the state concept is “future data,” storing promises directly can be a natural model
2. Lazy initialization avoids accidental duplicate initialization work
3. Independent `Suspense` boundaries make repeated appends easier to reason about than a shared imperative loading flow

## UI Plan

The case should include:

- A button labeled `新增数据`
- A vertically stacked list of async items
- A small loading card or skeleton-like fallback per item
- Notes that explain:
  - why the state is an array of promises
  - why this helps avoid the older race-prone mental model
  - why `useState(() => [getMessage()])` is preferred over eager initialization

## Code Organization

Add this case without disturbing the existing topic shape:

- Register one more case entry in the topic registry
- Create a dedicated case component file
- Optionally create a tiny item component if it improves readability

Suggested files:

- `src/demos/use-suspense/cases/add-to-list-case.tsx`
- optional helper component in the same folder if the list row needs to stay focused
- `src/demos/use-suspense/use-suspense-cases.tsx` updated with the new registry entry

## Implementation Notes

- Prefer a stable key strategy that does not regenerate on every render
- Do not use a per-render random `uuid()` key
- Keep all user-facing copy in Chinese where practical

## Verification

Success will be checked by:

- the new case appears in the left navigation as `09 新增数据到列表`
- the case is grouped under `试读一`
- first render shows one async item request
- clicking the button appends another async item
- each list row can resolve independently
- `npm run build` succeeds

## Success Criteria

- The new case fits naturally into the current case-navigation system
- The code clearly demonstrates the promise-array mental model
- The learning explanation is clearer than a comment-based comparison alone
