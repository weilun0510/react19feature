import type { ComponentType } from 'react';
import AddToListCase from './cases/add-to-list-case';
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
  {
    slug: 'add-to-list',
    indexLabel: '09',
    title: '新增数据到列表',
    group: '试读一',
    summary: '把“未来会到达的数据”直接建模成 promise 数组，再通过 map + Suspense 独立渲染每一项。',
    notes: [
      'state 里存的是 promise 数组，而不是已经 resolve 的最终值。',
      '点击按钮时只是在数组末尾新增一个 promise，不需要手动拼接 loading 状态。',
      '每一项都有独立 Suspense 边界，所以连续新增时不容易出现整体渲染混乱。',
    ],
    component: AddToListCase,
  },
];

export const defaultUseSuspenseCase = useSuspenseCases[0];
