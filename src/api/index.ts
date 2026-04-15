import { delay, createRandomMessage } from '@/utils';

export async function getMessage() {
  await delay(900);
  return { value: createRandomMessage() };
}
