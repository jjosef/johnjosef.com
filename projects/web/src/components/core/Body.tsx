import { Outlet } from '@tanstack/react-router';
import { SideBar } from './SideBar';

export const Body = () => {
  return (
    <div className="flex-grow flex flex-col md:flex-row">
      <div className="flex-grow">
        <Outlet />
      </div>
      <SideBar />
    </div>
  );
};
