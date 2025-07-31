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

// Mock Headless UI transition utilities
vi.mock('@headlessui/vue', async () => {
  const actual = await vi.importActual('@headlessui/vue');
  return {
    ...actual,
    // Mock transition utilities to prevent errors
    Transition: {
      name: 'Transition',
      template: '<div><slot /></div>',
      props: ['appear', 'show', 'enter', 'enterFrom', 'enterTo', 'leave', 'leaveFrom', 'leaveTo'],
    },
    TransitionChild: {
      name: 'TransitionChild',
      template: '<div><slot /></div>',
      props: ['appear', 'show', 'enter', 'enterFrom', 'enterTo', 'leave', 'leaveFrom', 'leaveTo'],
    },
  };
});

// Mock CSS transition utilities to prevent Headless UI errors
Object.defineProperty(window, 'getComputedStyle', {
  value: (element: Element) => ({
    getPropertyValue: (prop: string) => {
      if (prop === 'transition-duration') return '0s';
      if (prop === 'transition-delay') return '0s';
      if (prop === 'direction') return 'ltr';
      return '';
    },
    transitionDuration: '0s',
    transitionDelay: '0s',
  }),
});
