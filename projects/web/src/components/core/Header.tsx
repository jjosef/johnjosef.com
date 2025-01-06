import { Link } from '@tanstack/react-router';
import CodingImg from '@/assets/coding-white.png';

export const Header = () => {
  return (
    <header className="container flex flex-row p-2">
      <div className="icon flex flex-row items-end">
        <Link to="/">
          <img
            src={CodingImg}
            alt="I generated this with AI"
            width="50"
            height="50"
          />
        </Link>
      </div>
    </header>
  );
};
