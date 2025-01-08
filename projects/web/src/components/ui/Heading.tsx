import { DivElementProps } from '@/types';
import classNames from 'clsx';

export const Heading = ({ children, className, ...props }: DivElementProps) => (
  <div className={classNames('text-2xl', className)} {...props}>
    {children}
  </div>
);
