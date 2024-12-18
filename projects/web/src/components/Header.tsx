import { Link } from '@tanstack/react-router';
import CodingImg from '../assets/coding-white.png';

export const Header = () => {
  return (
    <header className="container flex flex-row">
      <div className="icon flex flex-row items-end">
        <Link to="/">
          <img src={CodingImg} alt="John Josef" width="50" height="50" />
        </Link>
        <h1 className="mx-4 font-mono text-lg">John Josef</h1>
      </div>
    </header>
  );
};
