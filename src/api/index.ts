import { delay, createRandomMessage } from '@/utils';

export async function getMessage() {
  await delay(300);
  return { value: createRandomMessage() };
}
