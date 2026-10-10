import { getRandomStatus } from '@/lib/statuses';
import { useEffect, useState } from 'react';

export const Home = () => {
  const [status, setStatus] = useState(getRandomStatus());

  useEffect(() => {
    const iid = setTimeout(() => setStatus(getRandomStatus()), 5000);

    return () => clearTimeout(iid);
  }, [status]);

  const skipStatus = () => {
    setStatus(getRandomStatus());
  };

  return (
    <div className="p-2 min-w-[320px]">
      <code className="block bg-slate-900 p-4">
        const john = '<code className="text-green-500">{status}</code>';
      </code>
      <div className="my-2">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold py-1 px-4 rounded-full"
          onClick={() => skipStatus()}
        >
          <small>Skip</small>
        </button>
      </div>
    </div>
  );
};
