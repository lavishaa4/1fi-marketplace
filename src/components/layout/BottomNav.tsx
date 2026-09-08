import { NavLink } from 'react-router-dom';
import type { ReactNode } from 'react';

const icon = (path: ReactNode) => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.7"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    {path}
  </svg>
);

const TABS = [
  {
    to: '/home',
    label: 'Home',
    icon: icon(
      <>
        <path d="M3 10.5 12 3l9 7.5" />
        <path d="M5 9.8V20h14V9.8" />
      </>,
    ),
  },
  {
    to: '/shop',
    label: 'Shop',
    icon: icon(
      <>
        <path d="M4 8h16l-1 3.2a3 3 0 0 1-5.6.6 3 3 0 0 1-4.8 0 3 3 0 0 1-5.6-.6L4 8Z" />
        <path d="M5 13v7h14v-7" />
        <path d="M6 8V5.5A1.5 1.5 0 0 1 7.5 4h9A1.5 1.5 0 0 1 18 5.5V8" />
      </>,
    ),
  },
  {
    to: '/emi-dues',
    label: 'EMI Dues',
    icon: icon(
      <>
        <path d="M6 3h12v18l-3-2-3 2-3-2-3 2V3Z" />
        <path d="M9 8h6M9 12h4" />
      </>,
    ),
  },
  {
    to: '/limit',
    label: 'Limit',
    icon: icon(
      <>
        <path d="M5 20V12M10 20V8M15 20v-6M20 20V5" />
      </>,
    ),
  },
  {
    to: '/profile',
    label: 'Profile',
    icon: icon(
      <>
        <circle cx="12" cy="8" r="3.4" />
        <path d="M5 20c1.3-3.4 4-5 7-5s5.7 1.6 7 5" />
      </>,
    ),
  },
];

export function BottomNav() {
  return (
    <nav
      aria-label="Primary"
      className="sticky bottom-0 z-20 mx-auto w-full max-w-app border-t border-line bg-white pb-[max(8px,env(safe-area-inset-bottom))] pt-2"
    >
      <ul className="grid grid-cols-5">
        {TABS.map((tab) => (
          <li key={tab.to}>
            <NavLink
              to={tab.to}
              className={({ isActive }) =>
                `relative flex flex-col items-center gap-1 py-1 text-[11px] font-medium ${
                  isActive ? 'text-brand' : 'text-muted'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <span
                      aria-hidden
                      className="absolute -top-2 h-[3px] w-8 rounded-full bg-brand"
                    />
                  )}
                  {tab.icon}
                  {tab.label}
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
