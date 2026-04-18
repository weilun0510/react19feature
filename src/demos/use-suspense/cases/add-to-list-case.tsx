import { Suspense, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { getMessage } from '@/api';
import Message from '@/message';
import SharedDemoCard from './shared-demo-card';

function AddToListCase() {
  const [promises, setPromises] = useState(() => [getMessage()]);

  function handleAdd() {
    setPromises((current) => [...current, getMessage()]);
  }

  return (
    <SharedDemoCard
      title="运行示例"
      description="初始化先请求一条数据，后续每点击一次按钮，就往列表里追加一个新的 promise。每一项都由自己的 Suspense 边界负责展示。"
    >
      <Button onClick={handleAdd}>新增数据</Button>

      <div className="space-y-4">
        {promises.map((promise, index) => (
          <Suspense
            key={index}
            fallback={
              <Card className="border-sky-100 bg-sky-50/90 text-slate-900">
                <CardContent className="pt-6 text-sm text-slate-600">
                  第 {index + 1} 条数据正在加载...
                </CardContent>
              </Card>
            }
          >
            <Message promise={promise} />
          </Suspense>
        ))}
      </div>
    </SharedDemoCard>
  );
}

export default AddToListCase;
