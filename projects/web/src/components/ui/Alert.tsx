import { DivElementProps } from '@/types';
import classNames from 'classnames';

export const Alert = ({ children, className }: DivElementProps) => {
  return (
    <div className={classNames(className, 'p-4', 'rounded', 'border')}>
      {children}
    </div>
  );
};
