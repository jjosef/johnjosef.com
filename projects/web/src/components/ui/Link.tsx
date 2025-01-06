import { LinkElementProps } from '@/types';
import { Link as TSLink } from '@tanstack/react-router';
import classNames from 'classnames';

export const Link = ({ children, className }: LinkElementProps) => (
  <TSLink
    className={classNames('underline', 'hover:text-slate-400', className)}
  >
    {children}
  </TSLink>
);
