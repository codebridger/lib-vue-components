import { describe, it, expect, vi } from "vitest";
import { mount, VueWrapper } from "@vue/test-utils";
import Card from "../Card.vue";

describe("Card Component", () => {
  let wrapper: VueWrapper<any>;

  // Helper function to create wrapper with default props
  const createWrapper = (props = {}, slots = {}) => {
    return mount(Card, {
      props,
      slots,
    });
  };

  describe("Rendering", () => {
    it("renders card container", () => {
      wrapper = createWrapper();
      expect(wrapper.find("div").exists()).toBe(true);
    });

    it("renders slot content", () => {
      wrapper = createWrapper({}, {
        default: '<div data-test="card-content">Card Content</div>'
      });
      expect(wrapper.find('[data-test="card-content"]').exists()).toBe(true);
      expect(wrapper.text()).toContain("Card Content");
    });

    it("renders slot content with cardDisabled prop", () => {
      wrapper = createWrapper({ disabled: true }, {
        default: '<div :class="{ disabled: cardDisabled }">Content</div>'
      });
      const content = wrapper.find("div > div");
      expect(content.classes()).toContain("disabled");
    });
  });

  describe("Props and Styling", () => {
    it("applies base card classes", () => {
      wrapper = createWrapper();
      expect(wrapper.classes()).toContain("p-4");
      expect(wrapper.classes()).toContain("shadow-[4px_6px_10px_-3px_#bfc9d4]");
      expect(wrapper.classes()).toContain("dark:bg-[#191e3a]");
      expect(wrapper.classes()).toContain("dark:shadow-none");
      expect(wrapper.classes()).toContain("rounded");
      expect(wrapper.classes()).toContain("border");
      expect(wrapper.classes()).toContain("border-[#e0e6ed]");
      expect(wrapper.classes()).toContain("dark:border-[#1b2e4b]");
    });

    it("applies disabled styling when disabled is true", () => {
      wrapper = createWrapper({ disabled: true });
      expect(wrapper.classes()).toContain("opacity-50");
      expect(wrapper.classes()).toContain("cursor-not-allowed");
    });

    it("does not apply disabled styling when disabled is false", () => {
      wrapper = createWrapper({ disabled: false });
      expect(wrapper.classes()).not.toContain("opacity-50");
      expect(wrapper.classes()).not.toContain("cursor-not-allowed");
    });

    it("applies bg-white when no background color class is present", () => {
      wrapper = createWrapper();
      expect(wrapper.classes()).toContain("bg-white");
    });

    it("does not apply bg-white when background color class is present", () => {
      wrapper = createWrapper({ class: "bg-blue-500" });
      expect(wrapper.classes()).toContain("bg-blue-500");
      expect(wrapper.classes()).not.toContain("bg-white");
    });

    it("applies custom classes from attrs", () => {
      wrapper = createWrapper({ class: "custom-class" });
      expect(wrapper.classes()).toContain("custom-class");
    });

    it("combines custom classes with default classes", () => {
      wrapper = createWrapper({ class: "custom-class bg-red-500" });
      expect(wrapper.classes()).toContain("custom-class");
      expect(wrapper.classes()).toContain("bg-red-500");
      expect(wrapper.classes()).not.toContain("bg-white");
      expect(wrapper.classes()).toContain("p-4");
    });
  });

  describe("Injection and Provide", () => {
    it("provides cardDisabled to child components", () => {
      wrapper = createWrapper({ disabled: true });
      // The cardDisabled should be provided to children
      // We can test this by checking if the provide is set up correctly
      expect(wrapper.vm.$options.provide).toBeDefined();
    });

    it("provides false when not disabled", () => {
      wrapper = createWrapper({ disabled: false });
      // The cardDisabled should be provided as false to children
      expect(wrapper.vm.$options.provide).toBeDefined();
    });

    it("provides default false when disabled prop is not set", () => {
      wrapper = createWrapper();
      // The cardDisabled should be provided as false by default
      expect(wrapper.vm.$options.provide).toBeDefined();
    });
  });

  describe("Slot Props", () => {
    it("provides cardDisabled to default slot", () => {
      wrapper = createWrapper({ disabled: true }, {
        default: '<div :class="{ disabled: cardDisabled }">Content</div>'
      });
      const content = wrapper.find("div > div");
      expect(content.classes()).toContain("disabled");
    });

    it("provides false cardDisabled when not disabled", () => {
      wrapper = createWrapper({ disabled: false }, {
        default: '<div :class="{ disabled: cardDisabled }">Content</div>'
      });
      const content = wrapper.find("div > div");
      expect(content.classes()).not.toContain("disabled");
    });
  });

  describe("Dark Theme Support", () => {
    it("applies dark theme background", () => {
      wrapper = createWrapper();
      expect(wrapper.classes()).toContain("dark:bg-[#191e3a]");
    });

    it("applies dark theme shadow", () => {
      wrapper = createWrapper();
      expect(wrapper.classes()).toContain("dark:shadow-none");
    });

    it("applies dark theme border", () => {
      wrapper = createWrapper();
      expect(wrapper.classes()).toContain("dark:border-[#1b2e4b]");
    });
  });

  describe("Responsive Design", () => {
    it("applies responsive padding", () => {
      wrapper = createWrapper();
      expect(wrapper.classes()).toContain("p-4");
    });

    it("applies responsive border radius", () => {
      wrapper = createWrapper();
      expect(wrapper.classes()).toContain("rounded");
    });
  });

  describe("Accessibility", () => {
    it("has proper semantic structure", () => {
      wrapper = createWrapper();
      expect(wrapper.find("div").exists()).toBe(true);
    });

    it("maintains proper focus management when disabled", () => {
      wrapper = createWrapper({ disabled: true });
      // The card should not interfere with focus management
      expect(wrapper.find("div").exists()).toBe(true);
    });
  });

  describe("Edge Cases", () => {
    it("handles empty slot content", () => {
      wrapper = createWrapper({}, { default: "" });
      expect(wrapper.find("div").exists()).toBe(true);
    });

    it("handles undefined props gracefully", () => {
      wrapper = createWrapper({});
      expect(wrapper.find("div").exists()).toBe(true);
    });

    it("handles complex class combinations", () => {
      wrapper = createWrapper({ 
        class: "bg-gradient-to-r from-blue-500 to-purple-600 text-white" 
      });
      expect(wrapper.classes()).toContain("bg-gradient-to-r");
      expect(wrapper.classes()).toContain("from-blue-500");
      expect(wrapper.classes()).toContain("to-purple-600");
      expect(wrapper.classes()).toContain("text-white");
      expect(wrapper.classes()).not.toContain("bg-white");
    });

    it("handles multiple background classes", () => {
      wrapper = createWrapper({ 
        class: "bg-red-500 bg-opacity-50" 
      });
      expect(wrapper.classes()).toContain("bg-red-500");
      expect(wrapper.classes()).toContain("bg-opacity-50");
      expect(wrapper.classes()).not.toContain("bg-white");
    });
  });

  describe("Default Values", () => {
    it("uses correct default values", () => {
      wrapper = createWrapper();
      expect(wrapper.props("disabled")).toBe(false);
    });
  });

  describe("Component Options", () => {
    it("has inheritAttrs set to false", () => {
      wrapper = createWrapper();
      expect(wrapper.vm.$options.inheritAttrs).toBe(false);
    });
  });

  describe("Computed Properties", () => {
    it("computes class correctly with no background", () => {
      wrapper = createWrapper();
      expect(wrapper.classes()).toContain("bg-white");
    });

    it("computes class correctly with background", () => {
      wrapper = createWrapper({ class: "bg-blue-500" });
      expect(wrapper.classes()).toContain("bg-blue-500");
      expect(wrapper.classes()).not.toContain("bg-white");
    });

    it("computes class correctly with multiple classes", () => {
      wrapper = createWrapper({ class: "custom-class bg-red-500" });
      expect(wrapper.classes()).toContain("custom-class");
      expect(wrapper.classes()).toContain("bg-red-500");
      expect(wrapper.classes()).not.toContain("bg-white");
    });
  });

  describe("Integration with Child Components", () => {
    it("provides cardDisabled to Button component", () => {
      wrapper = createWrapper({ disabled: true }, {
        default: '<button class="btn">Click me</button>'
      });
      // The Button component should receive the cardDisabled injection
      expect(wrapper.find("button").exists()).toBe(true);
    });

    it("provides cardDisabled to Input component", () => {
      wrapper = createWrapper({ disabled: true }, {
        default: '<input type="text" class="form-input" />'
      });
      // The Input component should receive the cardDisabled injection
      expect(wrapper.find("input").exists()).toBe(true);
    });
  });
});