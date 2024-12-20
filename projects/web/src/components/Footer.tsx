import { getChineseZodiacAnimal } from '@/lib/utils';

export const Footer = () => {
  const year = new Date().getFullYear();
  const sza = getChineseZodiacAnimal(year);

  return (
    <footer className="text-xs p-2">
      <p>
        <span>copyright {year}, the year of the</span>
        <span className={`pl-1 ${sza.colorClass}`}>{sza.name}</span>
        <span>, John Josef</span>
      </p>
    </footer>
  );
};
