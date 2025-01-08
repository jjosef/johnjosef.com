import { LinkElementProps } from '@/types';
import { Link as TSLink } from '@tanstack/react-router';
import classNames from 'clsx';

export const Link = ({ children, className, ...props }: LinkElementProps) => {
  const cns = classNames('underline', 'hover:text-slate-400', className);
  // kind of a weird hacky thing with @tanstack/react-router.
  // mostly just didn't want multiple types of
  // doesn't make sense that `href` is a viable prop, but doesn't work.
  if (props.href) {
    return (
      <a {...props} className={cns}>
        {children}
      </a>
    );
  }
  return (
    <TSLink {...props} className={cns}>
      {children}
    </TSLink>
  );
};
