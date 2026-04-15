# shadcn-ui Router React19 Demo Design

## Goal

Add `shadcn/ui` to the current Vite React project, create a small learning homepage for demos, and add a dedicated route for a React 19 `use + Suspense` example.

## Scope

- Initialize `shadcn/ui` in the existing project
- Add a small set of base components needed for the learning UI
- Introduce app routing with a homepage and one demo page
- Move the current async demo into a dedicated `use + Suspense` route
- Add short learning notes beside the working demo

## Out of Scope

- No full design system rollout
- No auth, data layer, or API architecture changes
- No additional React 19 demo pages in this task

## Chosen Approach

Use `shadcn/ui` as a lightweight UI layer for the homepage and demo layout, while keeping the demo logic itself plain React. Use `createBrowserRouter` so the route structure is easy to extend as more learning pages are added later.

## Information Architecture

### Home Route

`/`

The homepage acts as a learning hub:

- A simple title and short description of the project
- A card list for available demos
- One card for the first demo: `use + Suspense`
- A clear button or link that navigates to the demo route

### Demo Route

`/demo/use-suspense`

The demo page contains:

- A header with the demo title and a link back to the homepage
- A working async example using React 19 `use(...)`
- `Suspense` fallback behavior that is visible during loading
- A short explanation block with what the pattern does and what to watch out for

## UI Plan

Initialize `shadcn/ui` and add only the components needed now:

- `button`
- `card`
- `badge`
- `separator`

These are enough to build:

- The homepage demo card
- The demo page header
- The notes section

## Code Structure

Split the app into route-oriented files so future demos can be added without growing one large `App.tsx`.

Planned shape:

- Router setup in the app entry layer
- A home page component for the learning hub
- A demo page component for `use + Suspense`
- Small demo-focused UI components where it improves readability

## Data and Demo Behavior

Reuse the current simple async message-fetching flow:

- A button triggers an async request
- `Suspense` handles the loading boundary
- `use(promise)` reads the resolved data in the demo component

This keeps the example focused on React 19 behavior rather than unrelated app complexity.

## Verification

Success will be checked by:

- `shadcn/ui` components render correctly with Tailwind styling
- `/` shows the learning homepage
- `/demo/use-suspense` renders the demo page
- The async example loads data through `Suspense`
- `npm run build` succeeds

## Risks

- `shadcn/ui` initialization may require alias or config alignment in a Vite project
- The current ad hoc demo code may need small cleanup while being moved into route-based pages

## Success Criteria

- `shadcn/ui` is initialized and usable in the project
- The app has a homepage route and one demo route
- The `use + Suspense` demo is both runnable and explained
- The route structure is ready for more demo pages later
