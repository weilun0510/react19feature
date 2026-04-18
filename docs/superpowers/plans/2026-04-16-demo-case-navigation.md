# Demo Case Navigation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refactor the current `use + Suspense` demo into a topic page with a left-side case menu so each learning case has its own component and stable URL.

**Architecture:** Keep the current homepage route, but replace the single `use-suspense-page` implementation with a topic container driven by route params and a case registry. Each case becomes an independent component under a topic-specific folder, while the topic page handles navigation, lookup, fallback routing, and shared layout.

**Tech Stack:** React 19, TypeScript, React Router 7, Vite 6, shadcn/ui, Tailwind CSS v4

---

## File Map

- Modify: `src/router.tsx`
- Modify: `src/routes/home-page.tsx`
- Replace: `src/routes/use-suspense-page.tsx`
- Create: `src/demos/use-suspense/use-suspense-cases.tsx`
- Create: `src/demos/use-suspense/use-suspense-topic-page.tsx`
- Create: `src/demos/use-suspense/cases/basic-case.tsx`
- Create: `src/demos/use-suspense/cases/click-fetch-case.tsx`
- Create: `src/demos/use-suspense/cases/init-fetch-case.tsx`
- Create: `src/demos/use-suspense/cases/shared-demo-card.tsx`
- Modify: `src/message.tsx`
- Modify: `src/api/index.ts`
- Modify: `src/utils/index.ts`

## Notes on Verification

This refactor is primarily route and component organization work. The project does not include a React component test runner, so verification will rely on:

- Route and import compilation via `npm run build`
- Valid dynamic route wiring for topic cases
- Removal of comment-based case switching from the topic page

### Task 1: Define the Topic Route and Case URL Shape

**Files:**
- Modify: `src/router.tsx`
- Modify: `src/routes/home-page.tsx`

- [ ] **Step 1: Replace the single topic route with a param-based route**

Set `src/router.tsx` to:

```tsx
import { createBrowserRouter, Navigate } from 'react-router';
import HomePage from './routes/home-page';
import UseSuspensePage from './routes/use-suspense-page';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/demo/use-suspense',
    element: <Navigate to="/demo/use-suspense/basic" replace />,
  },
  {
    path: '/demo/use-suspense/:caseSlug',
    element: <UseSuspensePage />,
  },
]);
```

- [ ] **Step 2: Keep the homepage card pointing to the topic entry**

Update the card link in `src/routes/home-page.tsx` to:

```tsx
<Link to="/demo/use-suspense/basic">
  打开示例
  <ArrowRight className="size-4" />
</Link>
```

### Task 2: Extract Shared Topic Metadata

**Files:**
- Create: `src/demos/use-suspense/use-suspense-cases.tsx`

- [ ] **Step 1: Create the case registry**

Create `src/demos/use-suspense/use-suspense-cases.tsx` with:

```tsx
import type { ComponentType } from 'react';
import BasicCase from './cases/basic-case';
import ClickFetchCase from './cases/click-fetch-case';
import InitFetchCase from './cases/init-fetch-case';

export type UseSuspenseCaseDefinition = {
  slug: string;
  indexLabel: string;
  title: string;
  group: string;
  summary: string;
  notes: string[];
  component: ComponentType;
};

export const useSuspenseCases: UseSuspenseCaseDefinition[] = [
  {
    slug: 'basic',
    indexLabel: '05',
    title: 'use 基础知识',
    group: '试读一',
    summary: '先看最基础的 use(promise) 读取方式，理解 promise 是如何进入渲染流程的。',
    notes: [
      '先用一个立即 resolve 的 promise 建立最小认知。',
      '这个 case 重点不是等待态，而是 use(...) 的读取方式。',
      '适合先理解“组件为什么能直接拿到异步结果”。',
    ],
    component: BasicCase,
  },
  {
    slug: 'click-fetch',
    indexLabel: '07',
    title: '点击之后按钮获取数据',
    group: '试读一',
    summary: '点击按钮时创建 promise，观察 Suspense 如何接管加载中状态。',
    notes: [
      '按钮触发 setPromise(getMessage())。',
      'Message 组件通过 use(promise) 进入挂起。',
      'Suspense fallback 只在等待期间出现。',
    ],
    component: ClickFetchCase,
  },
  {
    slug: 'init-fetch',
    indexLabel: '08',
    title: '初始获取数据并更新',
    group: '试读一',
    summary: '页面初始化时就发起请求，适合对比和“点击后再请求”的差别。',
    notes: [
      '初始 state 直接放入 getMessage()。',
      '页面第一次渲染就会进入 Suspense fallback。',
      '适合观察初始加载体验和重新请求时机。',
    ],
    component: InitFetchCase,
  },
];

export const defaultUseSuspenseCase = useSuspenseCases[0];
```

### Task 3: Create Small Independent Case Components

**Files:**
- Create: `src/demos/use-suspense/cases/shared-demo-card.tsx`
- Create: `src/demos/use-suspense/cases/basic-case.tsx`
- Create: `src/demos/use-suspense/cases/click-fetch-case.tsx`
- Create: `src/demos/use-suspense/cases/init-fetch-case.tsx`
- Modify: `src/message.tsx`
- Modify: `src/api/index.ts`
- Modify: `src/utils/index.ts`

- [ ] **Step 1: Create a shared card wrapper for runnable demos**

Create `src/demos/use-suspense/cases/shared-demo-card.tsx` with:

```tsx
import type { ReactNode } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

type SharedDemoCardProps = {
  title: string;
  description: string;
  children: ReactNode;
};

function SharedDemoCard({ title, description, children }: SharedDemoCardProps) {
  return (
    <Card className="border-sky-100/80 bg-white/82 text-slate-900 shadow-sm shadow-sky-100/70 backdrop-blur">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription className="text-slate-600">{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">{children}</CardContent>
    </Card>
  );
}

export default SharedDemoCard;
```

- [ ] **Step 2: Keep the async helper and message content case-friendly**

Set `src/api/index.ts` to:

```ts
import { createRandomMessage, delay } from '@/utils';

export async function getMessage() {
  await delay(900);
  return { value: createRandomMessage() };
}
```

Set `src/utils/index.ts` to:

```ts
export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const messages = [
  'use(...) 可以让组件在渲染阶段直接读取 promise 的结果。',
  'Suspense 会接管等待态，让组件把注意力放在拿到数据后的界面上。',
  '被挂起的子树会停在边界处，等数据准备好之后再一次性展示出来。',
];

export function createRandomMessage() {
  return messages[Math.floor(Math.random() * messages.length)];
}
```

- [ ] **Step 3: Keep `src/message.tsx` focused on displaying resolved content**

Set `src/message.tsx` to:

```tsx
import { Tent, Inbox } from 'lucide-react';
import { use } from 'react';
import { getMessage } from '@/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type MessageProps = {
  promise?: ReturnType<typeof getMessage>;
};

function Message({ promise }: MessageProps) {
  if (!promise) {
    return (
      <Card className="border-dashed border-sky-200 bg-sky-50/80 text-slate-900">
        <CardContent className="flex items-center gap-3 pt-6 text-sm text-slate-600">
          <Inbox className="size-4 text-sky-500" />
          还没有异步结果，先创建一个 promise。
        </CardContent>
      </Card>
    );
  }

  const message = use(promise);

  return (
    <Card className="border-sky-100 bg-white/90 text-slate-900 shadow-sm shadow-sky-100/70">
      <CardHeader className="flex flex-row items-center gap-3 space-y-0">
        <Tent className="size-5 text-sky-500" />
        <CardTitle className="text-lg">最终结果</CardTitle>
      </CardHeader>
      <CardContent className="text-sm leading-7 text-slate-600">
        {message.value}
      </CardContent>
    </Card>
  );
}

export default Message;
```

- [ ] **Step 4: Create the basic case**

Create `src/demos/use-suspense/cases/basic-case.tsx` with:

```tsx
import { Suspense } from 'react';
import Message from '@/message';
import SharedDemoCard from './shared-demo-card';

function BasicCase() {
  return (
    <SharedDemoCard
      title="运行示例"
      description="这个 case 用一个立即 resolve 的 promise，先帮助你理解 use(...) 如何读取异步结果。"
    >
      <Suspense fallback={null}>
        <Message promise={Promise.resolve({ value: '这是一个立即完成的 promise，用来观察 use(...) 的最小行为。' })} />
      </Suspense>
    </SharedDemoCard>
  );
}

export default BasicCase;
```

- [ ] **Step 5: Create the click-triggered fetch case**

Create `src/demos/use-suspense/cases/click-fetch-case.tsx` with:

```tsx
import { Suspense, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { getMessage } from '@/api';
import Message from '@/message';
import SharedDemoCard from './shared-demo-card';

function ClickFetchCase() {
  const [promise, setPromise] = useState<ReturnType<typeof getMessage>>();

  return (
    <SharedDemoCard
      title="运行示例"
      description="点击按钮后才创建 promise，这样最容易观察按钮动作和 Suspense fallback 的先后关系。"
    >
      <Button onClick={() => setPromise(getMessage())}>点击后获取数据</Button>
      <Suspense
        fallback={
          <Card className="border-sky-100 bg-sky-50/90 text-slate-900">
            <CardContent className="pt-6 text-sm text-slate-600">
              Suspense 正在等待数据...
            </CardContent>
          </Card>
        }
      >
        <Message promise={promise} />
      </Suspense>
    </SharedDemoCard>
  );
}

export default ClickFetchCase;
```

- [ ] **Step 6: Create the initial-load fetch case**

Create `src/demos/use-suspense/cases/init-fetch-case.tsx` with:

```tsx
import { Suspense, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { getMessage } from '@/api';
import Message from '@/message';
import SharedDemoCard from './shared-demo-card';

function InitFetchCase() {
  const [promise, setPromise] = useState<ReturnType<typeof getMessage>>(getMessage());

  return (
    <SharedDemoCard
      title="运行示例"
      description="页面一进入就会先请求一次数据。你可以继续点击按钮，再观察重新请求时的 fallback 行为。"
    >
      <Button onClick={() => setPromise(getMessage())}>重新获取数据</Button>
      <Suspense
        fallback={
          <Card className="border-sky-100 bg-sky-50/90 text-slate-900">
            <CardContent className="pt-6 text-sm text-slate-600">
              页面初始化后正在加载数据...
            </CardContent>
          </Card>
        }
      >
        <Message promise={promise} />
      </Suspense>
    </SharedDemoCard>
  );
}

export default InitFetchCase;
```

### Task 4: Replace the Topic Page with a Navigation-Driven Layout

**Files:**
- Create: `src/demos/use-suspense/use-suspense-topic-page.tsx`
- Replace: `src/routes/use-suspense-page.tsx`

- [ ] **Step 1: Create the topic page container**

Create `src/demos/use-suspense/use-suspense-topic-page.tsx` with:

```tsx
import { Link, Navigate, useParams } from 'react-router';
import DemoShell from '@/components/app/demo-shell';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { defaultUseSuspenseCase, useSuspenseCases } from './use-suspense-cases';

function UseSuspenseTopicPage() {
  const { caseSlug } = useParams();
  const currentCase =
    useSuspenseCases.find((item) => item.slug === caseSlug) ?? defaultUseSuspenseCase;

  if (caseSlug !== currentCase.slug) {
    return <Navigate to={`/demo/use-suspense/${currentCase.slug}`} replace />;
  }

  const groups = Array.from(new Set(useSuspenseCases.map((item) => item.group)));
  const CurrentComponent = currentCase.component;

  return (
    <DemoShell
      eyebrow={<Badge variant="secondary">React 19 示例</Badge>}
      title="use + Suspense"
      description="把一个主题下的多种 case 拆开管理。左侧切换案例，右侧专注查看当前 case 的说明和运行结果。"
      actions={
        <Button asChild variant="outline">
          <Link to="/">返回首页</Link>
        </Button>
      }
    >
      <section className="grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
        <Card className="border-sky-100/80 bg-white/82 text-slate-900 shadow-sm shadow-sky-100/70">
          <CardHeader>
            <CardTitle>案例导航</CardTitle>
            <CardDescription className="text-slate-600">
              按主题顺序切换不同 case，不再依赖注释改代码。
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {groups.map((group) => (
              <div key={group} className="space-y-3">
                <div className="text-sm font-medium text-slate-500">{group}</div>
                <div className="space-y-2">
                  {useSuspenseCases
                    .filter((item) => item.group === group)
                    .map((item) => {
                      const isActive = item.slug === currentCase.slug;

                      return (
                        <Link
                          key={item.slug}
                          to={`/demo/use-suspense/${item.slug}`}
                          className={`block rounded-xl border px-4 py-3 transition ${
                            isActive
                              ? 'border-slate-900 bg-slate-100 text-slate-950'
                              : 'border-transparent bg-transparent text-slate-600 hover:border-sky-100 hover:bg-sky-50'
                          }`}
                        >
                          <div className="text-xs font-medium text-slate-400">
                            {item.indexLabel}
                          </div>
                          <div className="mt-1 text-sm font-medium">{item.title}</div>
                        </Link>
                      );
                    })}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="border-sky-100/80 bg-white/82 text-slate-900 shadow-sm shadow-sky-100/70">
            <CardHeader>
              <CardTitle>{currentCase.title}</CardTitle>
              <CardDescription className="text-slate-600">
                {currentCase.summary}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-sm leading-7 text-slate-600">
              {currentCase.notes.map((note, index) => (
                <div key={note} className="space-y-4">
                  <p>
                    {index + 1}. {note}
                  </p>
                  {index < currentCase.notes.length - 1 ? (
                    <Separator className="bg-sky-100" />
                  ) : null}
                </div>
              ))}
            </CardContent>
          </Card>

          <CurrentComponent />
        </div>
      </section>
    </DemoShell>
  );
}

export default UseSuspenseTopicPage;
```

- [ ] **Step 2: Replace the old topic route file with the new container export**

Set `src/routes/use-suspense-page.tsx` to:

```tsx
import UseSuspenseTopicPage from '@/demos/use-suspense/use-suspense-topic-page';

function UseSuspensePage() {
  return <UseSuspenseTopicPage />;
}

export default UseSuspensePage;
```

### Task 5: Verify the Refactor

**Files:**
- Verify current workspace state

- [ ] **Step 1: Run the production build**

Run:

```bash
npm run build
```

Expected:

```text
TypeScript compilation succeeds and Vite emits a production build without route or component errors
```

- [ ] **Step 2: Confirm the new demo files exist**

Run:

```bash
Get-ChildItem src/demos/use-suspense -Recurse
```

Expected:

```text
Topic page, registry, and case component files are present
```

- [ ] **Step 3: Confirm the old comment-driven logic is gone from the route page**

Run:

```bash
Get-Content -Raw src/routes/use-suspense-page.tsx
```

Expected:

```text
The route page only delegates to the topic page and contains no commented case-switching code
```
