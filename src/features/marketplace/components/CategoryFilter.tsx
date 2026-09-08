import type { ProductCategory } from '@/types/marketplace';

export type CategoryValue = ProductCategory | 'all';

const CATEGORIES: { value: CategoryValue; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'smartphone', label: 'Phones' },
  { value: 'laptop', label: 'Laptops & tablets' },
  { value: 'audio', label: 'Audio' },
  { value: 'wearable', label: 'Wearables' },
];

interface CategoryFilterProps {
  value: CategoryValue;
  onChange: (value: CategoryValue) => void;
}

export function CategoryFilter({ value, onChange }: CategoryFilterProps) {
  return (
    <div
      role="tablist"
      aria-label="Product categories"
      className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1"
    >
      {CATEGORIES.map((category) => {
        const isActive = category.value === value;
        return (
          <button
            key={category.value}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(category.value)}
            className={`shrink-0 rounded-full border px-3.5 py-2 text-[13px] font-medium transition-colors ${
              isActive
                ? 'border-brand bg-brand text-white'
                : 'border-line bg-white text-muted hover:border-brand-border'
            }`}
          >
            {category.label}
          </button>
        );
      })}
    </div>
  );
}
