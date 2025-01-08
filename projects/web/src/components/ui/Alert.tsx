import { DivElementProps } from '@/types';
import classNames from 'clsx';

export const Alert = ({ children, className, ...props }: DivElementProps) => {
  return (
    <div
      className={classNames(className, 'p-4', 'rounded', 'border')}
      {...props}
    >
      {children}
    </div>
  );
};
