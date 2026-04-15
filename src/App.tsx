import { useState } from 'react';

function App() {
  const [count, setCount] = useState(0);

  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-16">
      <section className="w-full max-w-3xl rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl shadow-slate-950/40 backdrop-blur">
        <div className="mb-8 inline-flex rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-sm font-medium text-cyan-200">
          Tailwind CSS v4 is active
        </div>

        <div className="space-y-4">
          <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            React 19 + Vite 6 + Tailwind v4
          </h1>

          <p className="max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
            This page is styled entirely with Tailwind utility classes so we can
            verify the integration immediately.
          </p>
        </div>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
          <button
            type="button"
            onClick={() => setCount((current) => current + 1)}
            className="inline-flex items-center justify-center rounded-2xl bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
          >
            Count is {count}
          </button>

          <span className="text-sm text-slate-400">
            Click the button to confirm React state updates still work.
          </span>
        </div>
      </section>
    </main>
  );
}

export default App;
