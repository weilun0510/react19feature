# shadcn-ui Router React19 Demo Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Initialize `shadcn/ui`, add a learning homepage, and introduce a dedicated React 19 `use + Suspense` demo route in the existing Vite app.

**Architecture:** Keep the app as a Vite React SPA and move from a single `App.tsx` demo to a route-based structure using `createBrowserRouter` and `RouterProvider`. Use `shadcn/ui` only for the learning shell and supporting UI, while keeping the actual React 19 async example simple and close to the original code.

**Tech Stack:** React 19, TypeScript, Vite 6, Tailwind CSS v4, `shadcn/ui`, React Router 7

---

## File Map

- Modify: `package.json`
- Modify: `package-lock.json`
- Modify: `tsconfig.json`
- Modify: `tsconfig.app.json`
- Modify: `vite.config.ts`
- Modify: `src/index.css`
- Modify: `src/main.tsx`
- Replace: `src/App.tsx`
- Replace: `src/message.tsx`
- Create: `components.json`
- Create: `src/lib/utils.ts`
- Create: `src/components/ui/button.tsx`
- Create: `src/components/ui/card.tsx`
- Create: `src/components/ui/badge.tsx`
- Create: `src/components/ui/separator.tsx`
- Create: `src/components/app/demo-shell.tsx`
- Create: `src/routes/home-page.tsx`
- Create: `src/routes/use-suspense-page.tsx`
- Create: `src/router.tsx`
- Modify: `src/api/index.ts`
- Modify: `src/utils/index.ts`

## Notes on Verification

This task includes configuration and generated UI scaffolding. The project does not currently include a test runner for React component tests, so verification will rely on:

- Successful `shadcn/ui` initialization and component generation
- Static TypeScript and Vite build success via `npm run build`
- Route wiring and component imports compiling cleanly

### Task 1: Align Project Config for shadcn/ui

**Files:**
- Modify: `tsconfig.json`
- Modify: `tsconfig.app.json`
- Modify: `vite.config.ts`
- Modify: `package.json`
- Modify: `package-lock.json`

- [ ] **Step 1: Add root-level alias config to `tsconfig.json`**

Set `tsconfig.json` to:

```json
{
  "files": [],
  "references": [
    { "path": "./tsconfig.app.json" },
    { "path": "./tsconfig.node.json" }
  ],
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

- [ ] **Step 2: Keep editor alias support in `tsconfig.app.json`**

Ensure this section exists in `tsconfig.app.json`:

```json
"moduleResolution": "bundler",
"baseUrl": ".",
"paths": {
  "@/*": ["./src/*"]
},
"allowImportingTsExtensions": true
```

- [ ] **Step 3: Update Vite alias resolution to the official path-based form**

Set `vite.config.ts` to:

```ts
import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
```

- [ ] **Step 4: Add the missing Node type dependency required by the config**

Run:

```bash
npm install -D @types/node
```

Expected:

```text
package.json and package-lock.json update successfully
```

### Task 2: Initialize shadcn/ui and Add Base Components

**Files:**
- Create: `components.json`
- Create: `src/lib/utils.ts`
- Create: `src/components/ui/button.tsx`
- Create: `src/components/ui/card.tsx`
- Create: `src/components/ui/badge.tsx`
- Create: `src/components/ui/separator.tsx`
- Modify: `src/index.css`
- Modify: `package.json`
- Modify: `package-lock.json`

- [ ] **Step 1: Run the shadcn init command**

Run:

```bash
npx shadcn@latest init -y
```

Expected:

```text
components.json is created and the project is prepared for shadcn/ui components
```

- [ ] **Step 2: Add the UI components used by the learning shell**

Run:

```bash
npx shadcn@latest add button card badge separator -y
```

Expected:

```text
Component files are created under src/components/ui
```

- [ ] **Step 3: Verify `components.json` uses the project alias**

Expected file shape:

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  }
}
```

- [ ] **Step 4: Keep `src/index.css` compatible with shadcn/ui output**

After CLI changes, ensure `src/index.css` still:

- imports Tailwind with `@import "tailwindcss";`
- keeps a simple full-height app background
- includes any base layer added by shadcn/ui

### Task 3: Introduce Route-Based App Entry

**Files:**
- Create: `src/router.tsx`
- Modify: `src/main.tsx`
- Replace: `src/App.tsx`

- [ ] **Step 1: Create the central router**

Create `src/router.tsx` with:

```tsx
import { createBrowserRouter } from 'react-router';
import HomePage from './routes/home-page';
import UseSuspensePage from './routes/use-suspense-page';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/demo/use-suspense',
    element: <UseSuspensePage />,
  },
]);
```

- [ ] **Step 2: Render the router from `src/main.tsx`**

Set `src/main.tsx` to:

```tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router/dom';
import './index.css';
import { router } from './router';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
```

- [ ] **Step 3: Replace `src/App.tsx` with a tiny compatibility wrapper**

Set `src/App.tsx` to:

```tsx
import { RouterProvider } from 'react-router/dom';
import { router } from './router';

function App() {
  return <RouterProvider router={router} />;
}

export default App;
```

### Task 4: Build the Home Learning Page

**Files:**
- Create: `src/components/app/demo-shell.tsx`
- Create: `src/routes/home-page.tsx`
- Create: `src/routes/use-suspense-page.tsx`
- Modify: `src/index.css`

- [ ] **Step 1: Create a small reusable shell for page layout**

Create `src/components/app/demo-shell.tsx` with:

```tsx
import type { ReactNode } from 'react';

type DemoShellProps = {
  eyebrow?: ReactNode;
  title: string;
  description: string;
  actions?: ReactNode;
  children: ReactNode;
};

function DemoShell({ eyebrow, title, description, actions, children }: DemoShellProps) {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-slate-100">
      <div className="mx-auto flex max-w-6xl flex-col gap-8">
        <header className="space-y-4">
          {eyebrow}
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="space-y-3">
              <h1 className="text-4xl font-semibold tracking-tight text-white">{title}</h1>
              <p className="max-w-3xl text-base leading-7 text-slate-300">{description}</p>
            </div>
            {actions}
          </div>
        </header>
        {children}
      </div>
    </main>
  );
}

export default DemoShell;
```

- [ ] **Step 2: Create the home page**

Create `src/routes/home-page.tsx` with:

```tsx
import { Link } from 'react-router';
import { ArrowRight, Sparkles } from 'lucide-react';
import DemoShell from '@/components/app/demo-shell';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

function HomePage() {
  return (
    <DemoShell
      eyebrow={<Badge variant="secondary">React 19 Learning Hub</Badge>}
      title="React 19 demo playground"
      description="Use this project as a small learning lab. Each card opens an isolated route so you can experiment with one React 19 concept at a time."
    >
      <section className="grid gap-6 md:grid-cols-2">
        <Card className="border-white/10 bg-white/5 text-slate-100">
          <CardHeader>
            <CardTitle>use + Suspense</CardTitle>
            <CardDescription className="text-slate-300">
              Trigger an async request, suspend rendering, and let React reveal the result through a boundary.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex items-center gap-2 text-sm text-slate-400">
            <Sparkles className="size-4" />
            Includes a runnable example and short learning notes.
          </CardContent>
          <CardFooter>
            <Button asChild>
              <Link to="/demo/use-suspense">
                Open demo
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </section>
    </DemoShell>
  );
}

export default HomePage;
```

- [ ] **Step 3: Keep the page background and typography aligned with the new shell**

Ensure `src/index.css` preserves:

```css
html,
body,
#root {
  min-height: 100%;
}

body {
  margin: 0;
  min-width: 320px;
  background: #020617;
}
```

### Task 5: Move the React 19 Demo into Its Own Route

**Files:**
- Create: `src/routes/use-suspense-page.tsx`
- Replace: `src/message.tsx`
- Modify: `src/api/index.ts`
- Modify: `src/utils/index.ts`

- [ ] **Step 1: Clean up the async API helper so it is demo-oriented**

Set `src/api/index.ts` to:

```ts
import { createRandomMessage, delay } from '@/utils';

export async function getMessage() {
  await delay(900);
  return { value: createRandomMessage() };
}
```

- [ ] **Step 2: Keep the message utility focused on demo content**

Set `src/utils/index.ts` to:

```ts
export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const messages = [
  'The use(...) API lets a component read a promise result directly during render.',
  'Suspense handles the waiting state so your component can stay focused on the resolved UI.',
  'A suspended subtree pauses at the boundary, then reveals the final content once data is ready.',
];

export function createRandomMessage() {
  return messages[Math.floor(Math.random() * messages.length)];
}
```

- [ ] **Step 3: Replace `src/message.tsx` with a focused result card**

Set `src/message.tsx` to:

```tsx
import { use } from 'react';
import { Inbox, Tent } from 'lucide-react';
import { getMessage } from './api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type MessageProps = {
  promise?: ReturnType<typeof getMessage>;
};

function Message({ promise }: MessageProps) {
  if (!promise) {
    return (
      <Card className="border-dashed border-white/10 bg-white/5 text-slate-100">
        <CardContent className="flex items-center gap-3 pt-6 text-sm text-slate-300">
          <Inbox className="size-4" />
          No async result yet. Start the demo to create a promise.
        </CardContent>
      </Card>
    );
  }

  const message = use(promise);

  return (
    <Card className="border-white/10 bg-white/5 text-slate-100">
      <CardHeader className="flex flex-row items-center gap-3 space-y-0">
        <Tent className="size-5 text-cyan-300" />
        <CardTitle className="text-lg">Resolved message</CardTitle>
      </CardHeader>
      <CardContent className="text-sm leading-7 text-slate-300">
        {message.value}
      </CardContent>
    </Card>
  );
}

export default Message;
```

- [ ] **Step 4: Create the `use + Suspense` route page**

Create `src/routes/use-suspense-page.tsx` with:

```tsx
import { Suspense, useState } from 'react';
import { Link } from 'react-router';
import DemoShell from '@/components/app/demo-shell';
import Message from '@/message';
import { getMessage } from '@/api';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

function UseSuspensePage() {
  const [promise, setPromise] = useState<ReturnType<typeof getMessage>>();

  return (
    <DemoShell
      eyebrow={<Badge variant="secondary">React 19 Demo</Badge>}
      title="use + Suspense"
      description="Click the button to create a promise. The result card reads it with use(...), and Suspense shows the fallback while React waits for the data."
      actions={
        <Button asChild variant="outline">
          <Link to="/">Back to home</Link>
        </Button>
      }
    >
      <section className="grid gap-6 lg:grid-cols-[1.3fr_0.9fr]">
        <Card className="border-white/10 bg-white/5 text-slate-100">
          <CardHeader>
            <CardTitle>Live demo</CardTitle>
            <CardDescription className="text-slate-300">
              Create an async request and let Suspense handle the waiting state.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button onClick={() => setPromise(getMessage())}>Fetch message</Button>
            <Suspense
              fallback={
                <Card className="border-white/10 bg-slate-900/80 text-slate-100">
                  <CardContent className="pt-6 text-sm text-slate-300">
                    Loading through Suspense...
                  </CardContent>
                </Card>
              }
            >
              <Message promise={promise} />
            </Suspense>
          </CardContent>
        </Card>

        <Card className="border-white/10 bg-white/5 text-slate-100">
          <CardHeader>
            <CardTitle>How to read this demo</CardTitle>
            <CardDescription className="text-slate-300">
              Keep these ideas in mind while clicking through the example.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-sm leading-7 text-slate-300">
            <p>1. The button creates a promise and stores it in state.</p>
            <Separator className="bg-white/10" />
            <p>2. The child component calls use(promise), which suspends until the promise resolves.</p>
            <Separator className="bg-white/10" />
            <p>3. Suspense shows the fallback automatically, then reveals the final UI once data is ready.</p>
          </CardContent>
        </Card>
      </section>
    </DemoShell>
  );
}

export default UseSuspensePage;
```

### Task 6: Verify the Whole App

**Files:**
- Verify current workspace state

- [ ] **Step 1: Run the production build**

Run:

```bash
npm run build
```

Expected:

```text
TypeScript compilation succeeds and Vite emits a production build without route or shadcn errors
```

- [ ] **Step 2: Confirm generated UI files exist**

Run:

```bash
Get-ChildItem src/components/ui, src/routes, src/components/app
```

Expected:

```text
button, card, badge, separator, route pages, and demo shell are present
```

- [ ] **Step 3: Confirm the router entry is wired from `src/main.tsx`**

Run:

```bash
Get-Content -Raw src/main.tsx
```

Expected:

```text
main.tsx renders RouterProvider with the exported router
```
