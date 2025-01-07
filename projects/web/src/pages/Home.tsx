import { SideBar } from '@/components';
import { getRandomStatus } from '@/lib/statuses';
import { useEffect, useState } from 'react';

export const Home = () => {
  const [status, setStatus] = useState(getRandomStatus());

  useEffect(() => {
    const iid = setInterval(() => setStatus(getRandomStatus()), 2000);

    return () => clearInterval(iid);
  }, []);

  return (
    <div className="flex flex-row">
      <div className="flex-grow">
        <div className="p-2">
          <code>
            const john = '<code className="text-green-500">{status}</code>';
          </code>
        </div>
      </div>
      <SideBar />
    </div>
  );
};
