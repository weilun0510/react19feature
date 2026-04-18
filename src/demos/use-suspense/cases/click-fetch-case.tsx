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
