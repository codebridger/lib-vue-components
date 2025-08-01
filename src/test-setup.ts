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
  value: (element: Element) => ({
    getPropertyValue: (prop: string) => {
      if (prop === "direction") {
        return "ltr"; // Default to LTR for tests
      }
      if (prop === "transition-duration") return "0s";
      if (prop === "transition-delay") return "0s";
      return "";
    },
    transitionDuration: "0s",
    transitionDelay: "0s",
  }),
});

// Mock Element.prototype methods
Element.prototype.scrollIntoView = vi.fn();

// Mock HTMLElement.prototype methods
HTMLElement.prototype.focus = vi.fn();
HTMLElement.prototype.blur = vi.fn();

// Mock document methods
document.createRange = vi.fn(
  () =>
    ({
      setStart: vi.fn(),
      setEnd: vi.fn(),
      commonAncestorContainer: {
        nodeName: "BODY",
        ownerDocument: document,
      },
      cloneContents: vi.fn(),
      cloneRange: vi.fn(),
      collapse: vi.fn(),
      compareBoundaryPoints: vi.fn(),
      comparePoint: vi.fn(),
      createContextualFragment: vi.fn(),
      deleteContents: vi.fn(),
      extractContents: vi.fn(),
      getBoundingClientRect: vi.fn(),
      getClientRects: vi.fn(),
      insertNode: vi.fn(),
      intersectsNode: vi.fn(),
      isPointInRange: vi.fn(),
      selectNode: vi.fn(),
      selectNodeContents: vi.fn(),
      setEndAfter: vi.fn(),
      setEndBefore: vi.fn(),
      setStartAfter: vi.fn(),
      setStartBefore: vi.fn(),
      surroundContents: vi.fn(),
      toString: vi.fn(),
      startContainer: document,
      endContainer: document,
      startOffset: 0,
      endOffset: 0,
      collapsed: false,
    } as unknown as Range)
);

// Mock Headless UI transition utilities
vi.mock("@headlessui/vue", async () => {
  const actual = await vi.importActual("@headlessui/vue");
  return {
    ...actual,
    // Mock transition utilities to prevent errors
    Transition: {
      name: "Transition",
      template: "<div><slot /></div>",
      props: [
        "appear",
        "show",
        "enter",
        "enterFrom",
        "enterTo",
        "leave",
        "leaveFrom",
        "leaveTo",
      ],
    },
    TransitionChild: {
      name: "TransitionChild",
      template: "<div><slot /></div>",
      props: [
        "appear",
        "show",
        "enter",
        "enterFrom",
        "enterTo",
        "leave",
        "leaveFrom",
        "leaveTo",
      ],
    },
  };
});
