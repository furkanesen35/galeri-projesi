import { NavLink } from 'react-router-dom';
import { ReactNode } from 'react';
import clsx from 'clsx';

export type NavLinkItemProps = {
  to: string;
  children: ReactNode;
};

export const NavLinkItem = ({ to, children }: NavLinkItemProps) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      clsx(
        'flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-all',
        isActive
          ? 'bg-primary text-primary-text shadow'
          : 'text-text-secondary hover:bg-surface-hover hover:text-foreground'
      )
    }
  >
    {children}
  </NavLink>
);
