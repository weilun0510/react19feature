export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const messages = [
  'React 19 introduces stronger async rendering patterns for component trees.',
  'Tailwind v4 keeps styling close to the component while simplifying setup.',
  'Vite keeps the feedback loop fast, which is perfect for UI experiments.',
];

export function createRandomMessage() {
  return messages[Math.floor(Math.random() * messages.length)];
}
