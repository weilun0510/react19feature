import { Tent, Inbox } from 'lucide-react';
import { use } from 'react';
import { getMessage } from './api';

const Message = (props: { promise?: ReturnType<typeof getMessage> }) => {
  if (!props.promise) {
    return (
      <div className="border border-gray-200 dark:border-0 dark:inset-ring dark:inset-ring-white/10 p-4">
        <Inbox />
        <div className="mt-2 text-sm">no data.</div>
      </div>
    );
  }

  const message = use(props.promise);
  return (
    <div className="flex border border-gray-200 dark:border-0 dark:inset-ring dark:inset-ring-white/10 p-4 items-start">
      <Tent />
      <div className="flex-1 ml-3">
        <div>React introduction</div>
        <div className="text-sm leading-6 mt-2 text-gray-600 dark:text-gray-400">
          {message.value}
        </div>
      </div>
    </div>
  );
};

export default Message;
