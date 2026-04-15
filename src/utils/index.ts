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
