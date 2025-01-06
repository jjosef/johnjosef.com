import { DivElementProps } from '@/types';
import classNames from 'classnames';

export const Heading = ({ children, className }: DivElementProps) => (
  <div className={classNames('text-2xl', className)}>{children}</div>
);
