import { SideBar } from '@/components';

export const Home = () => {
  return (
    <div className="flex flex-row">
      <div className="flex-grow">
        <div className="p-2">Home Content</div>
      </div>
      <SideBar />
    </div>
  );
};
