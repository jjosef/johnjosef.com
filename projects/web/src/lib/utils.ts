import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const zodiacAnimals: string[] = [
  'Rat',
  'Ox',
  'Tiger',
  'Rabbit',
  'Dragon',
  'Snake',
  'Horse',
  'Goat',
  'Monkey',
  'Rooster',
  'Dog',
  'Pig',
];

export const zodiacAnimalTWColors: string[] = [
  'text-yellow-700',
  'text-yellow-700',
  'text-orange-400',
  'text-white',
  'text-lime-600',
  'text-lime-600',
  'text-yellow-700',
  'text-white',
  'text-yellow-700',
  'text-rose-700',
  'text-violet-50',
  'text-pink-300',
];

export type ZodiacObj = {
  name: string;
  colorClass: string;
};

export const getChineseZodiacAnimal = (year: number): ZodiacObj => {
  const startYear = 1924; // Starting point, and the year of the rat. Every 12 years they repeat.
  const index = (year - startYear) % 12;

  return {
    name: zodiacAnimals[index],
    colorClass: zodiacAnimalTWColors[index],
  };
};
