import { NavLink } from 'react-router-dom';
import { ReactNode, ElementType } from 'react';
import clsx from 'clsx';

export type NavLinkItemProps = {
  to: string;
  icon?: ElementType;
  children: ReactNode;
};

export const NavLinkItem = ({ to, icon: Icon, children }: NavLinkItemProps) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      clsx(
        'group relative flex items-center justify-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all',
        isActive
          ? 'bg-primary text-primary-text shadow'
          : 'text-text-secondary hover:bg-surface-hover hover:text-foreground'
      )
    }
    title={typeof children === 'string' ? children : undefined}
  >
    {Icon && (
      <Icon className="h-5 w-5 shrink-0" strokeWidth={2} />
    )}
  </NavLink>
);
