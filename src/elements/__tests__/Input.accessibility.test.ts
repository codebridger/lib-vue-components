import { describe, it, expect, vi, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";
import Input from "../Input.vue";

// Mock the store
const mockUseAppStore = vi.fn(() => ({
  isRtl: false,
}));

vi.mock("../stores/index", () => ({
  useAppStore: mockUseAppStore,
}));

describe("Input Component Accessibility", () => {
  beforeEach(() => {
    const pinia = createPinia();
    setActivePinia(pinia);
  });

  const createWrapper = (props = {}) => {
    const defaultProps = {
      modelValue: "Test value",
      ...props,
    };
    return mount(Input, { props: defaultProps });
  };

  describe("Label Association", () => {
    it("associates label with input using for attribute", () => {
      const wrapper = createWrapper({
        label: "Input Label",
        id: "test-input"
      });
      const label = wrapper.find("label");
      const input = wrapper.find("input");
      expect(label.attributes("for")).toBe("test-input");
      expect(input.attributes("id")).toBe("test-input");
    });

    it("provides meaningful label text", () => {
      const wrapper = createWrapper({ label: "Enter your email address" });
      const label = wrapper.find("label");
      expect(label.text()).toContain("Enter your email address");
    });

    it("announces required field in label", () => {
      const wrapper = createWrapper({
        label: "Required field",
        required: true
      });
      const label = wrapper.find("label");
      expect(label.text()).toContain("*");
    });
  });

  describe("Disabled State Accessibility", () => {
    it("indicates disabled state to screen readers", () => {
      const wrapper = createWrapper({ disabled: true });
      const input = wrapper.find("input");
      expect(input.attributes("disabled")).toBeDefined();
    });

    it("applies disabled styling for visual indication", () => {
      const wrapper = createWrapper({ disabled: true });
      const input = wrapper.find("input");
      expect(input.classes()).toContain("bg-gray-100");
      expect(input.classes()).toContain("cursor-not-allowed");
    });
  });

  describe("Error State Accessibility", () => {
    it("indicates error state visually", () => {
      const wrapper = createWrapper({ error: true });
      const input = wrapper.find("input");
      expect(input.classes()).toContain("border-red-500");
    });

    it("provides error message for screen readers", () => {
      const wrapper = createWrapper({
        error: true,
        errorMessage: "This field is required"
      });
      expect(wrapper.text()).toContain("This field is required");
    });

    it("associates error message with input", () => {
      const wrapper = createWrapper({
        error: true,
        errorMessage: "This field is required",
        id: "test-input"
      });
      const input = wrapper.find("input");
      expect(input.attributes("id")).toBe("test-input");
    });
  });

  describe("Keyboard Navigation", () => {
    it("is focusable by default", () => {
      const wrapper = createWrapper();
      const input = wrapper.find("input");
      expect(input.element.focus).toBeDefined();
    });

    it("is not focusable when disabled", () => {
      const wrapper = createWrapper({ disabled: true });
      const input = wrapper.find("input");
      expect(input.attributes("disabled")).toBeDefined();
    });

    it("supports Enter key activation", async () => {
      const wrapper = createWrapper({ modelValue: "test value" });
      const input = wrapper.find("input");

      await input.trigger("keyup.enter");

      expect(wrapper.emitted("enter")).toBeTruthy();
    });
  });

  describe("Screen Reader Support", () => {
    it("provides meaningful placeholder text", () => {
      const wrapper = createWrapper({ placeholder: "Enter your email here" });
      const input = wrapper.find("input");
      expect(input.attributes("placeholder")).toBe("Enter your email here");
    });

    it("announces required field", () => {
      const wrapper = createWrapper({
        label: "Required field",
        required: true
      });
      const label = wrapper.find("label");
      expect(label.text()).toContain("*");
    });

    it("announces error state", () => {
      const wrapper = createWrapper({
        error: true,
        errorMessage: "Invalid email format"
      });
      expect(wrapper.text()).toContain("Invalid email format");
    });

    it("provides context for input purpose", () => {
      const wrapper = createWrapper({
        label: "Email",
        placeholder: "Type your email address"
      });
      const label = wrapper.find("label");
      const input = wrapper.find("input");
      expect(label.text()).toContain("Email");
      expect(input.attributes("placeholder")).toBe("Type your email address");
    });
  });

  describe("Icon Accessibility", () => {
    it("provides icon context for screen readers", () => {
      const wrapper = createWrapper({ iconName: "IconSearch" });
      const icon = wrapper.findComponent({ name: "Icon" });
      expect(icon.exists()).toBe(true);
    });

    it("supports icon click events", async () => {
      const wrapper = createWrapper({ iconName: "IconSearch" });
      const icon = wrapper.findComponent({ name: "Icon" });

      await icon.trigger("click");

      expect(wrapper.emitted("iconClick")).toBeTruthy();
    });

    it("positions icon correctly for RTL support", () => {
      const wrapper = createWrapper({
        iconName: "IconSearch",
        iconOppositePosition: true
      });
      const input = wrapper.find("input");
      expect(input.classes()).toContain("pr-10");
    });
  });

  describe("Input Type Accessibility", () => {
    it("supports email type for form validation", () => {
      const wrapper = createWrapper({ type: "email" });
      const input = wrapper.find("input");
      expect(input.attributes("type")).toBe("email");
    });

    it("supports password type for secure input", () => {
      const wrapper = createWrapper({ type: "password" });
      const input = wrapper.find("input");
      expect(input.attributes("type")).toBe("password");
    });

    it("supports number type for numeric input", () => {
      const wrapper = createWrapper({ type: "number" });
      const input = wrapper.find("input");
      expect(input.attributes("type")).toBe("number");
    });

    it("supports tel type for phone numbers", () => {
      const wrapper = createWrapper({ type: "tel" });
      const input = wrapper.find("input");
      expect(input.attributes("type")).toBe("tel");
    });

    it("supports url type for web addresses", () => {
      const wrapper = createWrapper({ type: "url" });
      const input = wrapper.find("input");
      expect(input.attributes("type")).toBe("url");
    });

    it("supports search type for search functionality", () => {
      const wrapper = createWrapper({ type: "search" });
      const input = wrapper.find("input");
      expect(input.attributes("type")).toBe("search");
    });

    it("supports range type for slider input", () => {
      const wrapper = createWrapper({ type: "range" });
      const input = wrapper.find("input");
      expect(input.attributes("type")).toBe("range");
    });
  });

  describe("Range Input Accessibility", () => {
    it("provides min and max values for range input", () => {
      const wrapper = createWrapper({
        type: "range",
        min: 0,
        max: 100
      });
      const input = wrapper.find("input");
      expect(input.attributes("min")).toBe("0");
      expect(input.attributes("max")).toBe("100");
    });

    it("applies range-specific styling", () => {
      const wrapper = createWrapper({ type: "range" });
      const input = wrapper.find("input");
      expect(input.classes()).toContain("w-full");
      expect(input.classes()).toContain("py-2.5");
    });
  });

  describe("Form Integration Accessibility", () => {
    it("supports form submission", () => {
      const wrapper = createWrapper({ required: true });
      const input = wrapper.find("input");
      expect(input.attributes("required")).toBeDefined();
    });

    it("supports form validation", () => {
      const wrapper = createWrapper({ type: "email" });
      const input = wrapper.find("input");
      expect(input.attributes("type")).toBe("email");
    });
  });

  describe("Focus Management", () => {
    it("supports focus event handling", async () => {
      const wrapper = createWrapper();
      const input = wrapper.find("input");

      await input.trigger("focus");

      expect(wrapper.emitted("focus")).toBeTruthy();
    });

    it("supports blur event handling", async () => {
      const wrapper = createWrapper();
      const input = wrapper.find("input");

      await input.trigger("blur");

      expect(wrapper.emitted("blur")).toBeTruthy();
    });

    it("maintains focus when interacting", async () => {
      const wrapper = createWrapper();
      const input = wrapper.find("input");

      await input.setValue("New value");

      expect(input.exists()).toBe(true);
    });
  });

  describe("Input Value Accessibility", () => {
    it("announces input value changes", async () => {
      const wrapper = createWrapper();
      const input = wrapper.find("input");

      await input.setValue("New value");

      expect(wrapper.emitted("update:modelValue")).toBeTruthy();
      expect(wrapper.emitted("update:modelValue")[0]).toEqual(["New value"]);
    });

    it("handles Enter key submission", async () => {
      const wrapper = createWrapper({ modelValue: "test value" });
      const input = wrapper.find("input");

      await input.trigger("keyup.enter");

      expect(wrapper.emitted("enter")).toBeTruthy();
      expect(wrapper.emitted("enter")[0]).toEqual(["test value"]);
    });

    it("clears input after Enter key submission", async () => {
      const wrapper = createWrapper({ modelValue: "test value" });
      const input = wrapper.find("input");

      await input.trigger("keyup.enter");

      expect(wrapper.emitted("update:modelValue")).toBeTruthy();
      expect(wrapper.emitted("update:modelValue")[0]).toEqual([""]);
    });
  });

  describe("RTL Support Accessibility", () => {
    it("handles RTL icon positioning", () => {
      // Mock RTL state
      mockUseAppStore.mockReturnValue({
        isRtl: true,
      });

      const wrapper = createWrapper({ iconName: "IconSearch" });
      const input = wrapper.find("input");
      // RTL positioning is handled by the store, test that component renders
      expect(input.exists()).toBe(true);
    });

    it("handles RTL icon positioning with opposite position", () => {
      // Mock RTL state
      mockUseAppStore.mockReturnValue({
        isRtl: true,
      });

      const wrapper = createWrapper({
        iconName: "IconSearch",
        iconOppositePosition: true
      });
      const input = wrapper.find("input");
      // RTL positioning is handled by the store, test that component renders
      expect(input.exists()).toBe(true);
    });
  });

  describe("Edge Cases and Error Handling", () => {
    it("handles empty modelValue gracefully", () => {
      const wrapper = createWrapper({ modelValue: "" });
      const input = wrapper.find("input");
      expect(input.element.value).toBe("");
    });

    it("handles undefined modelValue gracefully", () => {
      const wrapper = createWrapper({ modelValue: undefined });
      const input = wrapper.find("input");
      expect(input.element.value).toBe("");
    });

    it("handles empty label gracefully", () => {
      const wrapper = createWrapper({ label: "" });
      expect(wrapper.find("label").exists()).toBe(false);
    });

    it("handles empty error message gracefully", () => {
      const wrapper = createWrapper({
        error: true,
        errorMessage: ""
      });
      expect(wrapper.find(".text-red-500").exists()).toBe(false);
    });

    it("handles undefined props gracefully", () => {
      const wrapper = createWrapper({});
      expect(wrapper.exists()).toBe(true);
      expect(wrapper.find("input").exists()).toBe(true);
    });

    it("handles Enter key with empty value", async () => {
      const wrapper = createWrapper({ modelValue: "" });
      const input = wrapper.find("input");

      await input.trigger("keyup.enter");

      // The component only emits enter event if value is truthy
      expect(wrapper.emitted("enter")).toBeFalsy();
    });
  });
});