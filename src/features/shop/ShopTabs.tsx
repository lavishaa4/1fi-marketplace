import { NavLink } from 'react-router-dom';

const TABS = [
  { to: '/shop/top-brands', label: 'Top Brands' },
  { to: '/shop/nearby-stores', label: 'Nearby Stores' },
  { to: '/shop/marketplace', label: '1Fi Marketplace' },
];

/** Segmented control that overlaps the banner, as in the existing Shop page. */
export function ShopTabs() {
  return (
    <div className="relative z-10 -mt-8 px-4">
      <nav
        aria-label="Shop sections"
        className="flex rounded-full bg-brand-soft p-1.5 shadow-card"
      >
        {TABS.map((tab) => (
          <NavLink
            key={tab.to}
            to={tab.to}
            className={({ isActive }) =>
              `relative flex-1 rounded-full px-2 py-2.5 text-center text-[13px] font-bold transition-colors ${
                isActive ? 'bg-white text-brand shadow-sm' : 'text-muted'
              }`
            }
          >
            {({ isActive }) => (
              <>
                {tab.label}
                {isActive && (
                  <span
                    aria-hidden
                    className="absolute bottom-1.5 left-1/2 h-[3px] w-6 -translate-x-1/2 rounded-full bg-brand"
                  />
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
