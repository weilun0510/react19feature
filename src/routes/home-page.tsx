import { ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router';
import DemoShell from '@/components/app/demo-shell';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

function HomePage() {
  return (
    <DemoShell
      eyebrow={<Badge variant="secondary">React 19 学习首页</Badge>}
      title="React 19 Demo 练习场"
      description="把这个项目当成一个小型学习实验室。每张卡片都是一个独立路由，方便你按主题逐个练习 React 19 的能力。"
    >
      <section className="grid gap-6 md:grid-cols-2">
        <Card className="border-sky-100/80 bg-white/80 text-slate-900 shadow-sm shadow-sky-100/70 backdrop-blur">
          <CardHeader>
            <CardTitle>use + Suspense</CardTitle>
            <CardDescription className="text-slate-600">
              触发一次异步请求，让组件在等待时暂停渲染，再由 React 通过
              Suspense 边界展示最终结果。
            </CardDescription>
          </CardHeader>
          <CardContent className="flex items-center gap-2 text-sm text-slate-500">
            <Sparkles className="size-4 text-sky-500" />
            包含可运行示例和简短学习说明。
          </CardContent>
          <CardFooter>
            <Button asChild>
              <Link to="/demo/use-suspense">
                打开示例
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </section>
    </DemoShell>
  );
}

export default HomePage;
