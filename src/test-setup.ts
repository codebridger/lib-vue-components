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

// Mock matchMedia
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock scrollTo
window.scrollTo = vi.fn();

// Mock URL.createObjectURL
global.URL.createObjectURL = vi.fn(() => "mock-url");

// Mock Headless UI components
vi.mock("@headlessui/vue", () => ({
  TransitionRoot: {
    name: "TransitionRoot",
    template: "<div><slot /></div>",
    props: ["show", "appear", "unmount", "tag", "as"],
  },
  Dialog: {
    name: "Dialog",
    template: "<div><slot /></div>",
    props: ["open", "static", "unmount", "as"],
  },
  DialogOverlay: {
    name: "DialogOverlay",
    template: "<div><slot /></div>",
    props: ["as", "static", "unmount"],
  },
  DialogPanel: {
    name: "DialogPanel",
    template: "<div><slot /></div>",
    props: ["as", "static", "unmount"],
  },
  Listbox: {
    name: "Listbox",
    template: "<div><slot /></div>",
    props: ["modelValue", "by", "disabled"],
  },
  ListboxButton: {
    name: "ListboxButton",
    template: "<button><slot /></button>",
    props: ["as", "disabled"],
  },
  ListboxOptions: {
    name: "ListboxOptions",
    template: "<ul><slot /></ul>",
    props: ["as", "static", "unmount", "hold"],
  },
  ListboxOption: {
    name: "ListboxOption",
    template: "<li><slot /></li>",
    props: ["value", "as", "disabled", "class"],
  },
}));

// Mock vue3-popper
vi.mock("vue3-popper", () => ({
  default: {
    name: "Popper",
    template: `
      <div class="popper">
        <slot />
        <slot name="content" />
      </div>
    `,
    props: ["placement", "hover", "arrow", "open-delay", "close-delay", "z-index", "disabled"],
  },
}));
