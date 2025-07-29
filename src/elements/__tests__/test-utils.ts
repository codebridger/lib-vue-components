import { mount, VueWrapper } from "@vue/test-utils";
import { createPinia } from "pinia";
import { vi } from "vitest";
import Icon from "../../icon/Icon.vue";
import Button from "../Button.vue";

export function createTestWrapper(component: any, options = {}) {
  const pinia = createPinia();

  return mount(component, {
    global: {
      plugins: [pinia],
      components: {
        Icon,
      },
      stubs: {
        "router-link": true,
        "router-view": true,
      },
    },
    ...options,
  });
}

export function mockResizeObserver() {
  global.ResizeObserver = vi.fn().mockImplementation(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
  }));
}

export function mockIntersectionObserver() {
  global.IntersectionObserver = vi.fn().mockImplementation(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
  }));
}

export function mockMatchMedia() {
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
}

export function mockScrollTo() {
  window.scrollTo = vi.fn();
}

export function mockGetComputedStyle() {
  Object.defineProperty(window, "getComputedStyle", {
    value: () => ({
      getPropertyValue: vi.fn(),
    }),
  });
}

export function setupTestEnvironment() {
  mockResizeObserver();
  mockIntersectionObserver();
  mockMatchMedia();
  mockScrollTo();
  mockGetComputedStyle();
}

// Button-specific test helpers
export function createButtonWrapper(props = {}) {
  return createTestWrapper(Button, { props });
}

export function expectButtonToBeDisabled(wrapper: VueWrapper<any>) {
  expect(wrapper.find("button").attributes("disabled")).toBeDefined();
  expect(wrapper.classes()).toContain("bg-gray-100");
  expect(wrapper.classes()).toContain("cursor-not-allowed");
}

export function expectButtonToBeEnabled(wrapper: VueWrapper<any>) {
  expect(wrapper.find("button").attributes("disabled")).toBeUndefined();
  expect(wrapper.classes()).not.toContain("bg-gray-100");
  expect(wrapper.classes()).not.toContain("cursor-not-allowed");
}

export function expectButtonToHaveColor(
  wrapper: VueWrapper<any>,
  color: string
) {
  expect(wrapper.classes()).toContain(`btn-${color}`);
}

export function expectButtonToHaveSize(wrapper: VueWrapper<any>, size: string) {
  expect(wrapper.classes()).toContain(`btn-${size}`);
}

export function expectButtonToHaveIcon(
  wrapper: VueWrapper<any>,
  iconName?: string
) {
  const icon = wrapper.findComponent(Icon);
  expect(icon.exists()).toBe(true);
  if (iconName) {
    expect(icon.props("name")).toBe(iconName);
  }
}

export function expectButtonToEmitClick(wrapper: VueWrapper<any>) {
  expect(wrapper.emitted("click")).toBeTruthy();
}

export function expectButtonNotToEmitClick(wrapper: VueWrapper<any>) {
  expect(wrapper.emitted("click")).toBeFalsy();
}
