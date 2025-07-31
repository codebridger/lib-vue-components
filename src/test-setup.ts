import { vi } from "vitest";
import { createPinia, setActivePinia } from "pinia";

// Create and set active Pinia for tests
const pinia = createPinia();
setActivePinia(pinia);

// Mock ResizeObserver
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// Mock IntersectionObserver
global.IntersectionObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// Mock matchMedia
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock scrollTo
window.scrollTo = vi.fn();

// Mock getComputedStyle
Object.defineProperty(window, "getComputedStyle", {
  value: () => ({
    getPropertyValue: (prop: string) => {
      if (prop === "direction") {
        return "ltr"; // Default to LTR for tests
      }
      return "";
    },
  }),
});

// Mock Element.prototype methods
Element.prototype.scrollIntoView = vi.fn();
Element.prototype.focus = vi.fn();
Element.prototype.blur = vi.fn();

// Mock HTMLElement.prototype methods
HTMLElement.prototype.focus = vi.fn();
HTMLElement.prototype.blur = vi.fn();

// Mock document methods
document.createRange = vi.fn(() => ({
  setStart: vi.fn(),
  setEnd: vi.fn(),
  commonAncestorContainer: {
    nodeName: 'BODY',
    ownerDocument: document,
  },
}));
