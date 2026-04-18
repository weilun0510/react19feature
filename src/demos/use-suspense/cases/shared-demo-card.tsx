import type { ReactNode } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

type SharedDemoCardProps = {
  title: string;
  description: string;
  children: ReactNode;
};

function SharedDemoCard({
  title,
  description,
  children,
}: SharedDemoCardProps) {
  return (
    <Card className="border-sky-100/80 bg-white/82 text-slate-900 shadow-sm shadow-sky-100/70 backdrop-blur">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription className="text-slate-600">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">{children}</CardContent>
    </Card>
  );
}

export default SharedDemoCard;
