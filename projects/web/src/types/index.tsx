import { LinkProps } from '@tanstack/react-router';
import { HTMLAttributes, PropsWithChildren } from 'react';

export type DivElementProps = PropsWithChildren &
  HTMLAttributes<HTMLDivElement>;

export type LinkElementProps = LinkProps & HTMLAttributes<HTMLLinkElement>;
