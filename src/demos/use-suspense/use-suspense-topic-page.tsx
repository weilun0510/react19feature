import { Link, Navigate, useParams } from 'react-router';
import DemoShell from '@/components/app/demo-shell';
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
import {
  defaultUseSuspenseCase,
  useSuspenseCases,
} from './use-suspense-cases';

function UseSuspenseTopicPage() {
  const { caseSlug } = useParams();
  const currentCase =
    useSuspenseCases.find((item) => item.slug === caseSlug) ??
    defaultUseSuspenseCase;

  if (caseSlug !== currentCase.slug) {
    return <Navigate to={`/demo/use-suspense/${currentCase.slug}`} replace />;
  }

  const groups = Array.from(new Set(useSuspenseCases.map((item) => item.group)));
  const CurrentComponent = currentCase.component;

  return (
    <DemoShell
      eyebrow={<Badge variant="secondary">React 19 示例</Badge>}
      title="use + Suspense"
      description="把一个主题下的多种 case 拆开管理。左侧切换案例，右侧专注查看当前 case 的说明和运行结果。"
      actions={
        <Button asChild variant="outline">
          <Link to="/">返回首页</Link>
        </Button>
      }
    >
      <section className="grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
        <Card className="border-sky-100/80 bg-white/82 text-slate-900 shadow-sm shadow-sky-100/70">
          <CardHeader>
            <CardTitle>案例导航</CardTitle>
            <CardDescription className="text-slate-600">
              按主题顺序切换不同 case，不再依赖注释改代码。
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {groups.map((group) => (
              <div key={group} className="space-y-3">
                <div className="text-sm font-medium text-slate-500">{group}</div>
                <div className="space-y-2">
                  {useSuspenseCases
                    .filter((item) => item.group === group)
                    .map((item) => {
                      const isActive = item.slug === currentCase.slug;

                      return (
                        <Link
                          key={item.slug}
                          to={`/demo/use-suspense/${item.slug}`}
                          className={`block rounded-xl border px-4 py-3 transition ${
                            isActive
                              ? 'border-slate-900 bg-slate-100 text-slate-950'
                              : 'border-transparent bg-transparent text-slate-600 hover:border-sky-100 hover:bg-sky-50'
                          }`}
                        >
                          <div className="text-xs font-medium text-slate-400">
                            {item.indexLabel}
                          </div>
                          <div className="mt-1 text-sm font-medium">
                            {item.title}
                          </div>
                        </Link>
                      );
                    })}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="border-sky-100/80 bg-white/82 text-slate-900 shadow-sm shadow-sky-100/70">
            <CardHeader>
              <CardTitle>{currentCase.title}</CardTitle>
              <CardDescription className="text-slate-600">
                {currentCase.summary}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-sm leading-7 text-slate-600">
              {currentCase.notes.map((note, index) => (
                <div key={note} className="space-y-4">
                  <p>
                    {index + 1}. {note}
                  </p>
                  {index < currentCase.notes.length - 1 ? (
                    <Separator className="bg-sky-100" />
                  ) : null}
                </div>
              ))}
            </CardContent>
          </Card>

          <CurrentComponent />
        </div>
      </section>
    </DemoShell>
  );
}

export default UseSuspenseTopicPage;
