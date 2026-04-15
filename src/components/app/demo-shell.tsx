import type { ReactNode } from 'react';

type DemoShellProps = {
  eyebrow?: ReactNode;
  title: string;
  description: string;
  actions?: ReactNode;
  children: ReactNode;
};

function DemoShell({
  eyebrow,
  title,
  description,
  actions,
  children,
}: DemoShellProps) {
  return (
    <main className="min-h-screen px-6 py-10 text-slate-900">
      <div className="mx-auto flex max-w-6xl flex-col gap-8">
        <header className="space-y-4">
          {eyebrow}
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="space-y-3">
              <h1 className="text-4xl font-semibold tracking-tight text-slate-950">
                {title}
              </h1>
              <p className="max-w-3xl text-base leading-7 text-slate-600">
                {description}
              </p>
            </div>
            {actions}
          </div>
        </header>
        {children}
      </div>
    </main>
  );
}

export default DemoShell;
