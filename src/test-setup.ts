import { vi } from "vitest";
import { createPinia, setActivePinia } from "pinia";

// Create and set active Pinia instance
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

// Mock DataTransfer
global.DataTransfer = vi.fn().mockImplementation(() => ({
  files: [],
  items: {
    add: vi.fn(),
    remove: vi.fn(),
    clear: vi.fn(),
  },
  setData: vi.fn(),
  getData: vi.fn(),
  clearData: vi.fn(),
  setDragImage: vi.fn(),
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
    getPropertyValue: vi.fn(),
  }),
});

// Mock URL.createObjectURL
global.URL.createObjectURL = vi.fn(() => "mock-url");

// Mock document.createElement for file input
const originalCreateElement = document.createElement;
document.createElement = vi.fn((tagName: string) => {
  if (tagName === "input") {
    return {
      type: "",
      accept: "",
      multiple: false,
      style: { display: "" },
      addEventListener: vi.fn(),
      click: vi.fn(),
      value: "",
    } as any;
  }
  return originalCreateElement.call(document, tagName);
});

// Mock document.body methods
document.body.appendChild = vi.fn();
document.body.removeChild = vi.fn();

// Mock document.documentElement
Object.defineProperty(document, "documentElement", {
  value: {
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  },
  writable: true,
});
