# Demo Case Navigation Design

## Goal

Refactor the current demo routing so one React topic can contain many learning cases without relying on source code comments to switch behavior.

## Problem

The current `use + Suspense` demo page has started to accumulate multiple experimental variants inside one file. Switching between cases by commenting and uncommenting code is hard to maintain and makes the learning flow unclear.

## Scope

- Keep the homepage as the entry to all demo topics
- Turn the current `use + Suspense` demo into a topic page with a left-side case menu
- Represent each learning case as an independent component
- Use route params so each case has a stable URL
- Add a small case registry to describe labels, grouping, and the rendered case component

## Out of Scope

- No new React topics beyond the current `use + Suspense` area
- No global docs system
- No backend or persistent storage

## Chosen Approach

Use a topic route plus nested case selection. The topic stays grouped as one learning area, while each case gets its own URL and component. This avoids route explosion at the app root and removes the need to toggle examples through comments.

## Route Structure

### Home

`/`

The homepage continues to list demo topics.

### Topic Root

`/demo/use-suspense`

This route should redirect or default to the first available case for the topic.

### Topic Case Route

`/demo/use-suspense/:caseSlug`

Examples:

- `/demo/use-suspense/basic`
- `/demo/use-suspense/click-fetch`
- `/demo/use-suspense/init-fetch`

## Page Structure

The topic page uses a two-column layout:

- Left: case navigation grouped by section labels
- Right: current case title, explanation, and runnable demo area

This matches a learning workflow better than putting many variants into one component.

## Data Model

Create a case registry for the topic. Each case entry should define:

- `slug`
- `title`
- `group`
- `summary`
- `notes`
- `component`

The registry drives both:

- the left navigation
- the right content lookup

This avoids duplicated menu definitions and keeps the topic scalable.

## Code Organization

Split the current topic into focused files:

- Topic page container
- Topic case registry
- One component file per case
- Optional shared helpers for repeated async demo behavior

Suggested shape:

- `src/demos/use-suspense/use-suspense-topic-page.tsx`
- `src/demos/use-suspense/use-suspense-cases.tsx`
- `src/demos/use-suspense/cases/basic-case.tsx`
- `src/demos/use-suspense/cases/click-fetch-case.tsx`
- `src/demos/use-suspense/cases/init-fetch-case.tsx`

## UX Rules

- The selected case must be visually highlighted in the left navigation
- Each case must have a Chinese title and short summary
- The right side should explain what the case is demonstrating
- Missing or invalid `caseSlug` values should fall back to a valid default case

## Verification

Success will be checked by:

- No case-switching comments are needed in the topic page
- Each case has its own URL
- Left navigation highlights the current case
- The current `use + Suspense` topic remains runnable
- `npm run build` succeeds

## Success Criteria

- One topic can hold multiple cases cleanly
- Adding a new case means adding a new file and registry entry, not editing commented branches
- The learning flow is clearer than the current single-file approach
