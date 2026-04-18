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
        <Message
          promise={Promise.resolve({
            value: '这是一个立即完成的 promise，用来观察 use(...) 的最小行为。',
          })}
        />
      </Suspense>
    </SharedDemoCard>
  );
}

export default BasicCase;
