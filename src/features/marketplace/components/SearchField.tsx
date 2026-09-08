interface SearchFieldProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}

export function SearchField({ value, onChange, placeholder }: SearchFieldProps) {
  return (
    <div className="relative">
      <span aria-hidden className="absolute left-4 top-1/2 -translate-y-1/2 text-muted">
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.2-3.2" />
        </svg>
      </span>
      <label className="sr-only" htmlFor="marketplace-search">
        Search products
      </label>
      <input
        id="marketplace-search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="h-[52px] w-full rounded-full border border-line bg-white pl-11 pr-4 text-[14px] text-ink placeholder:text-muted"
      />
    </div>
  );
}
