import { useState } from 'react';
import { Sheet } from '@/components/ui/Sheet';
import { getMockConfig, setMockConfig } from '@/services/mockConfig';

const ENDPOINTS = [
  { key: 'products', label: 'Product list' },
  { key: 'product', label: 'Product details' },
  { key: 'emi', label: 'EMI plans' },
  { key: 'order', label: 'Plan confirmation' },
];

/**
 * Reviewer-facing switchboard for the mock backend, so loading, slow-network
 * and failure states can be checked without editing code.
 */
export function NetworkSettings() {
  const [open, setOpen] = useState(false);
  const [config, setConfig] = useState(getMockConfig());

  const update = (patch: Partial<typeof config>) => {
    setMockConfig(patch);
    setConfig({ ...getMockConfig() });
  };

  const toggleFailure = (key: string) => {
    const failing = config.failing.includes(key)
      ? config.failing.filter((item) => item !== key)
      : [...config.failing, key];
    update({ failing });
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Network simulation settings"
        className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-white hover:bg-white/25"
      >
        ⚙
      </button>

      <Sheet open={open} title="Simulate network" onClose={() => setOpen(false)}>
        <p className="pb-4 text-[13px] text-muted">
          The marketplace runs on a mock API. Use these switches to check loading, slow-network and
          error handling.
        </p>

        <div className="pb-4">
          <p className="label-text">Response delay</p>
          <div className="mt-2 flex gap-2">
            {[0, 700, 2500].map((value) => (
              <button
                key={value}
                onClick={() => update({ latencyMs: value })}
                className={`flex-1 rounded-xl border px-3 py-2 text-[13px] font-medium ${
                  config.latencyMs === value
                    ? 'border-brand bg-brand-soft text-brand'
                    : 'border-line text-ink'
                }`}
              >
                {value === 0 ? 'Instant' : `${value} ms`}
              </button>
            ))}
          </div>
        </div>

        <div className="pb-6">
          <p className="label-text">Force failure</p>
          <div className="mt-2 flex flex-col gap-2">
            {ENDPOINTS.map((endpoint) => (
              <label
                key={endpoint.key}
                className="flex items-center justify-between rounded-xl border border-line px-3 py-2.5 text-[14px]"
              >
                {endpoint.label}
                <input
                  type="checkbox"
                  checked={config.failing.includes(endpoint.key)}
                  onChange={() => toggleFailure(endpoint.key)}
                  className="h-4 w-4 accent-[#6C28D9]"
                />
              </label>
            ))}
          </div>
        </div>
      </Sheet>
    </>
  );
}
