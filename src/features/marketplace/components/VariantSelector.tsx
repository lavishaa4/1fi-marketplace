import type { ProductVariant } from '@/types/marketplace';

interface VariantSelectorProps {
  variants: ProductVariant[];
  selected: ProductVariant;
  onSelect: (variant: ProductVariant) => void;
}

/**
 * Storage and colour are separate axes: picking one keeps the other where
 * possible, and combinations that are out of stock are shown as disabled.
 */
export function VariantSelector({ variants, selected, onSelect }: VariantSelectorProps) {
  const storages = [...new Set(variants.map((variant) => variant.storage))];
  const colours = [...new Set(variants.map((variant) => variant.colour))];

  const resolve = (storage: string, colour: string) =>
    variants.find((variant) => variant.storage === storage && variant.colour === colour);

  const pick = (storage: string, colour: string) => {
    const exact = resolve(storage, colour);
    const fallback =
      exact ??
      variants.find((variant) => variant.storage === storage) ??
      variants.find((variant) => variant.colour === colour);
    if (fallback) onSelect(fallback);
  };

  return (
    <div className="flex flex-col gap-4">
      <div>
        <p className="label-text">Storage</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {storages.map((storage) => {
            const isActive = storage === selected.storage;
            const variant = resolve(storage, selected.colour);
            const unavailable = variant ? !variant.inStock : false;
            return (
              <button
                key={storage}
                onClick={() => pick(storage, selected.colour)}
                aria-pressed={isActive}
                className={`rounded-xl border px-3.5 py-2 text-[13px] font-medium transition-colors ${
                  isActive ? 'border-brand bg-brand-soft text-brand' : 'border-line text-ink'
                } ${unavailable ? 'opacity-45' : ''}`}
              >
                {storage}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <p className="label-text">Colour</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {colours.map((colour) => {
            const isActive = colour === selected.colour;
            const swatch = variants.find((variant) => variant.colour === colour)!;
            return (
              <button
                key={colour}
                onClick={() => pick(selected.storage, colour)}
                aria-pressed={isActive}
                className={`flex items-center gap-2 rounded-xl border px-3 py-2 text-[13px] font-medium transition-colors ${
                  isActive ? 'border-brand bg-brand-soft text-brand' : 'border-line text-ink'
                }`}
              >
                <span
                  aria-hidden
                  className="h-4 w-4 rounded-full border border-black/10"
                  style={{ backgroundColor: swatch.colourHex }}
                />
                {colour}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
