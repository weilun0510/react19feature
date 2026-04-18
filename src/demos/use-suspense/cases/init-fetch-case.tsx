import { Suspense, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { getMessage } from '@/api';
import Message from '@/message';
import SharedDemoCard from './shared-demo-card';

function InitFetchCase() {
  const [promise, setPromise] = useState<ReturnType<typeof getMessage>>(
    getMessage(),
  );

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

      <Card className="border-amber-100 bg-amber-50/70 text-slate-900 shadow-sm shadow-amber-100/60">
        <CardHeader>
          <CardTitle className="text-base">补充理解</CardTitle>
          <CardDescription className="text-slate-600">
            这里最容易混淆的地方，不是 Suspense，而是
            `useState(getMessage())` 和 `useState(() =&gt; getMessage())`
            的区别。
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-sm leading-7 text-slate-700">
          <p>
            1. `useState(getMessage())`
            的意思是先执行一次 `getMessage()`，再把它的返回值交给
            React。这样组件每次重新执行时，这个函数调用本身都有机会再次发生，
            如果里面是真实请求，就可能出现冗余调用。
          </p>
          <p>
            2. `useState(() =&gt; getMessage())`
            才是在把“如何得到初始值”这个动作交给 React。它更符合“仅在初始化
            state 时执行一次”的语义，所以比直接写 `getMessage()` 更稳。
          </p>
          <p>
            3. Compiler
            可能会帮你缓存某些表达式，减少重复执行，但这更像优化，不应该作为这里
            的根本依赖。这个场景里，更推荐先把写法改成 lazy initializer，
            再谈编译优化。
          </p>
        </CardContent>
      </Card>
    </SharedDemoCard>
  );
}

export default InitFetchCase;
