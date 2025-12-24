import { NavLink } from 'react-router-dom';
import { ReactNode } from 'react';
import clsx from 'clsx';
import { LucideIcon } from 'lucide-react';

export type NavLinkItemProps = {
  to: string;
  icon?: LucideIcon;
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
  >
    {Icon && (
      <Icon className="h-5 w-5 shrink-0" strokeWidth={2} />
    )}
    <div className="absolute left-full ml-2 hidden group-hover:block pointer-events-none z-50">
      <div className="bg-gray-900 text-white text-xs rounded px-2 py-1 whitespace-nowrap shadow-lg">
        {children}
      </div>
    </div>
  </NavLink>
);
