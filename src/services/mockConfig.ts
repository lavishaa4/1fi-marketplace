/**
 * Runtime switches for the mock backend. These let the reviewer exercise
 * loading, slow-network and error states without touching the code.
 * Read from the URL on first load (?latency=1200&fail=products) and then
 * persisted for the session.
 */
export interface MockConfig {
  latencyMs: number;
  /** Endpoints that should fail: 'products' | 'product' | 'emi' | 'order' */
  failing: string[];
}

const params = new URLSearchParams(window.location.search);

const config: MockConfig = {
  latencyMs: Number(params.get('latency')) || 700,
  failing: (params.get('fail') ?? '').split(',').filter(Boolean),
};

type Listener = (config: MockConfig) => void;
const listeners = new Set<Listener>();

export const getMockConfig = (): MockConfig => config;

export function setMockConfig(patch: Partial<MockConfig>) {
  Object.assign(config, patch);
  listeners.forEach((listener) => listener(config));
}

export function subscribeMockConfig(listener: Listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export const isFailing = (endpoint: string) => config.failing.includes(endpoint);
