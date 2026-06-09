import { vi } from 'vitest';

vi.mock('react-ga4', () => ({
  default: {
    initialize: vi.fn(),
    send: vi.fn(),
  },
}));

const storage = new Map();

Object.defineProperty(globalThis, 'localStorage', {
  value: {
    getItem: vi.fn((key) => storage.get(key) ?? null),
    setItem: vi.fn((key, value) => storage.set(key, String(value))),
    removeItem: vi.fn((key) => storage.delete(key)),
    clear: vi.fn(() => storage.clear()),
  },
  configurable: true,
});

Object.defineProperty(window, 'matchMedia', {
  value: vi.fn(() => ({
    matches: false,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  })),
  configurable: true,
});
