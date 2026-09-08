/** Shop hero, styled after the app's "Shop today, pay later using mutual funds" banner. */
export function ShopBanner() {
  return (
    <div className="relative overflow-hidden bg-[linear-gradient(135deg,#5B21B6_0%,#6D28D9_55%,#7C3AED_100%)] px-5 pb-14 pt-6 text-white">
      <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wide">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M12 2l2.2 5.6L20 9.5l-4.4 3.6L16.4 19 12 16.1 7.6 19l.8-5.9L4 9.5l5.8-1.9L12 2z" />
        </svg>
        No-cost EMIs
      </span>

      <h2 className="mt-4 max-w-[280px] text-[26px] font-extrabold leading-[1.15] tracking-tight">
        Shop today,
        <br />
        <em className="font-semibold not-italic italic">Pay later using</em>
        <br />
        Mutual funds.
      </h2>
      <p className="mt-3 max-w-[240px] text-[13px] leading-snug text-white/80">
        No credit score required. No interest. Backed by your investments.
      </p>

      <svg
        aria-hidden
        viewBox="0 0 180 180"
        className="pointer-events-none absolute -right-4 bottom-2 h-[190px] w-[190px] opacity-90"
      >
        <g opacity="0.9">
          <rect x="52" y="18" width="44" height="86" rx="10" fill="#B794F6" opacity="0.85" />
          <rect x="58" y="24" width="32" height="74" rx="6" fill="#3B0F73" />
          <rect x="88" y="44" width="72" height="52" rx="6" fill="#C4B5FD" opacity="0.9" />
          <rect x="93" y="49" width="62" height="42" rx="4" fill="#3B0F73" />
          <path d="M84 100h84l-8 8H92z" fill="#A78BFA" />
          <path d="M46 118h84l-10 46H56z" fill="#F6C453" />
          <path d="M64 118c0-14 8-22 24-22s24 8 24 22" stroke="#F6C453" strokeWidth="5" fill="none" />
          <circle cx="34" cy="52" r="4" fill="#F6C453" opacity="0.8" />
          <circle cx="168" cy="120" r="5" fill="#F6C453" opacity="0.7" />
          <rect x="20" y="96" width="14" height="5" rx="2.5" fill="#F6C453" opacity="0.7" />
        </g>
      </svg>
    </div>
  );
}
