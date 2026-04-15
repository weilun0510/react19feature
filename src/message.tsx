import { Tent, Inbox } from 'lucide-react';
import { use } from 'react';
import { getMessage } from '@/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type MessageProps = {
  promise?: ReturnType<typeof getMessage>;
};

function Message({ promise }: MessageProps) {
  if (!promise) {
    return (
      <Card className="border-dashed border-sky-200 bg-sky-50/80 text-slate-900">
        <CardContent className="flex items-center gap-3 pt-6 text-sm text-slate-600">
          <Inbox className="size-4 text-sky-500" />
          还没有异步结果，先点击上面的按钮创建一个 promise。
        </CardContent>
      </Card>
    );
  }

  const message = use(promise);
  return (
    <Card className="border-sky-100 bg-white/90 text-slate-900 shadow-sm shadow-sky-100/70">
      <CardHeader className="flex flex-row items-center gap-3 space-y-0">
        <Tent className="size-5 text-sky-500" />
        <CardTitle className="text-lg">最终结果</CardTitle>
      </CardHeader>
      <CardContent className="text-sm leading-7 text-slate-600">
        {message.value}
      </CardContent>
    </Card>
  );
}

export default Message;
