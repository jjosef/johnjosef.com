import { Outlet } from '@tanstack/react-router';

export const Body = () => {
  return (
    <div className="flex-grow">
      <Outlet />
    </div>
  );
};
