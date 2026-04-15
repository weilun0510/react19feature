import { Suspense, useState } from 'react';
import { Link } from 'react-router';
import DemoShell from '@/components/app/demo-shell';
import { getMessage } from '@/api';
import Message from '@/message';
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
  // const [promise, setPromise] = useState<ReturnType<typeof getMessage>>();

  // 初始化时，先设置一个空的 promise，Message就不用判断 promise 是否为空了
  // 瑕疵就是初始化时也不可避免的显示了 Skeleton 组件
  const [promise, setPromise] = useState<ReturnType<typeof getMessage>>(
    Promise.resolve({ value: '' }),
  );

  return (
    <DemoShell
      eyebrow={<Badge variant="secondary">React 19 示例</Badge>}
      title="use + Suspense"
      description="点击按钮后会创建一个 promise。结果卡片通过 use(...) 读取它，React 在等待数据时会先显示 Suspense 的 fallback。"
      actions={
        <Button asChild variant="outline">
          <Link to="/">返回首页</Link>
        </Button>
      }
    >
      <section className="grid gap-6 lg:grid-cols-[1.3fr_0.9fr]">
        <Card className="border-sky-100/80 bg-white/82 text-slate-900 shadow-sm shadow-sky-100/70 backdrop-blur">
          <CardHeader>
            <CardTitle>运行示例</CardTitle>
            <CardDescription className="text-slate-600">
              手动触发一次异步请求，观察 Suspense 接管等待态的过程。
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button onClick={() => setPromise(getMessage())}>获取消息</Button>
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
          </CardContent>
        </Card>

        <Card className="border-sky-100/80 bg-white/82 text-slate-900 shadow-sm shadow-sky-100/70 backdrop-blur">
          <CardHeader>
            <CardTitle>这个示例怎么看</CardTitle>
            <CardDescription className="text-slate-600">
              一边点击按钮，一边对照下面这 3 个观察点。
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-sm leading-7 text-slate-600">
            <p>1. 按钮会创建一个 promise，并把它存进组件 state。</p>
            <Separator className="bg-sky-100" />
            <p>2. 子组件调用 use(promise) 后，会一直挂起到 promise resolve。</p>
            <Separator className="bg-sky-100" />
            <p>
              3. Suspense 会自动显示 fallback，等数据准备好后再切回最终 UI。
            </p>
          </CardContent>
        </Card>
      </section>
    </DemoShell>
  );
}

export default UseSuspensePage;
