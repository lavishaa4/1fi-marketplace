import type { ReactNode } from 'react';
import { BottomNav } from './BottomNav';

interface AppShellProps {
  children: ReactNode;
  /** Sticky footer CTA rendered above the tab bar */
  footer?: ReactNode;
  showNav?: boolean;
}

export function AppShell({ children, footer, showNav = true }: AppShellProps) {
  return (
    <div className="app-frame">
      <main className={`flex-1 ${showNav ? 'pb-24' : 'pb-6'}`}>{children}</main>
      {footer && (
        <div className="sticky bottom-0 z-30 border-t border-line bg-white px-4 py-3">
          {footer}
        </div>
      )}
      {showNav && <BottomNav />}
    </div>
  );
}
