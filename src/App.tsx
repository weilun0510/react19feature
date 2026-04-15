import { useState, Suspense } from 'react';
import Message from './message';
import { getMessage } from './api';

function App() {
  const [count, setCount] = useState(0);
  const [promise, update] = useState<ReturnType<typeof getMessage>>();

  function handleClick() {
    update(getMessage());
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-16">
      <div className="text-right mb-4">
        <button className="button" onClick={handleClick}>
          更新数据
        </button>
      </div>
      <Suspense fallback={<Skeleton type="header" />}>
        <Message promise={promise} />
      </Suspense>
    </main>
  );
}

export default App;
