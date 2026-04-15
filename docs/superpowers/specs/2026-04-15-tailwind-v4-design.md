# Tailwind v4 Integration Design

## Goal

Add Tailwind CSS v4 to the current `React 19 + Vite 6 + TypeScript` project and leave behind a small visible example so we can confirm the setup is working immediately.

## Scope

- Install `tailwindcss` and `@tailwindcss/vite`
- Register the Tailwind v4 plugin in Vite
- Convert the global stylesheet entry to Tailwind v4 style
- Rewrite the current demo page with Tailwind utility classes
- Remove the old default Vite demo style dependency if it is no longer needed

## Out of Scope

- No UI component library
- No full theme system
- No unrelated refactor of business code

## Chosen Approach

Use the official `Tailwind v4 + @tailwindcss/vite` integration path. This is the cleanest fit for the current Vite project and avoids carrying older config patterns unless they are actually needed later.

## Design

### Dependencies

Add:

- `tailwindcss`
- `@tailwindcss/vite`

### Build Integration

Update `vite.config.ts` to register the Tailwind v4 Vite plugin alongside the existing React plugin. No other build behavior should change.

### Global Styles

Replace the current default template CSS in `src/index.css` with:

- `@import "tailwindcss";`
- A small amount of base global styling for `body`
- A minimum height rule for `#root`

This keeps the global layer small and lets Tailwind utilities drive the page styling.

### Demo Page

Update `src/App.tsx` to:

- Stop importing `src/App.css`
- Use Tailwind utility classes for layout and visual styling
- Keep one simple interactive button so we confirm React state updates still work after the styling change

The page is only a proof of integration, not a full redesign.

### Verification

Success will be checked by:

- `npm run build` completes successfully
- No Tailwind integration errors appear during build
- The demo page visibly uses Tailwind-driven spacing, color, radius, and layout styles

## Risks

- If plugin versions are incompatible, align them to the official Tailwind v4 Vite setup
- If old template CSS conflicts with the new utility classes, remove the old CSS import rather than keeping two style sources active

## Success Criteria

- The project builds successfully
- Tailwind classes in `src/App.tsx` take effect
- Future pages can use Tailwind utility classes without extra setup
