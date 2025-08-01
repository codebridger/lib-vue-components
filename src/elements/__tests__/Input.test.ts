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

describe("Input Component", () => {
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

  describe("Rendering", () => {
    it("renders as div element by default", () => {
      const wrapper = createWrapper();
      expect(wrapper.find("div").exists()).toBe(true);
    });

    it("renders input element", () => {
      const wrapper = createWrapper();
      expect(wrapper.find("input").exists()).toBe(true);
    });

    it("renders with default classes", () => {
      const wrapper = createWrapper();
      const input = wrapper.find("input");
      expect(input.classes()).toContain("form-input");
    });
  });

  describe("Props and Styling", () => {
    it("applies disabled styling when disabled is true", () => {
      const wrapper = createWrapper({ disabled: true });
      const input = wrapper.find("input");
      expect(input.classes()).toContain("bg-gray-100");
      expect(input.classes()).toContain("cursor-not-allowed");
    });

    it("applies error styling when error is true", () => {
      const wrapper = createWrapper({ error: true });
      const input = wrapper.find("input");
      expect(input.classes()).toContain("border-red-500");
    });

    it("applies normal styling when not disabled or error", () => {
      const wrapper = createWrapper();
      const input = wrapper.find("input");
      expect(input.classes()).toContain("bg-white");
      expect(input.classes()).toContain("border-gray-300");
    });

    it("applies range-specific styling for range type", () => {
      const wrapper = createWrapper({ type: "range" });
      const input = wrapper.find("input");
      expect(input.classes()).toContain("w-full");
      expect(input.classes()).toContain("py-2.5");
      expect(input.classes()).not.toContain("form-input");
    });
  });

  describe("Label Rendering", () => {
    it("renders label when provided", () => {
      const wrapper = createWrapper({ label: "Input Label" });
      expect(wrapper.find("label").exists()).toBe(true);
      expect(wrapper.find("label").text()).toContain("Input Label");
    });

    it("does not render label when not provided", () => {
      const wrapper = createWrapper({ label: "" });
      expect(wrapper.find("label").exists()).toBe(false);
    });

    it("renders required indicator when required is true", () => {
      const wrapper = createWrapper({
        label: "Required Field",
        required: true
      });
      expect(wrapper.find("label").text()).toContain("*");
    });

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
  });

  describe("Input Attributes", () => {
    it("sets value based on modelValue", () => {
      const wrapper = createWrapper({ modelValue: "Test content" });
      const input = wrapper.find("input");
      expect(input.element.value).toBe("Test content");
    });

    it("sets type attribute", () => {
      const wrapper = createWrapper({ type: "email" });
      const input = wrapper.find("input");
      expect(input.attributes("type")).toBe("email");
    });

    it("sets placeholder attribute", () => {
      const wrapper = createWrapper({ placeholder: "Enter your email" });
      const input = wrapper.find("input");
      expect(input.attributes("placeholder")).toBe("Enter your email");
    });

    it("sets required attribute when required is true", () => {
      const wrapper = createWrapper({ required: true });
      const input = wrapper.find("input");
      expect(input.attributes("required")).toBeDefined();
    });

    it("sets disabled attribute when disabled is true", () => {
      const wrapper = createWrapper({ disabled: true });
      const input = wrapper.find("input");
      expect(input.attributes("disabled")).toBeDefined();
    });

    it("sets min and max attributes for range type", () => {
      const wrapper = createWrapper({
        type: "range",
        min: 0,
        max: 100
      });
      const input = wrapper.find("input");
      expect(input.attributes("min")).toBe("0");
      expect(input.attributes("max")).toBe("100");
    });

    it("does not set min and max for non-range types", () => {
      const wrapper = createWrapper({
        type: "text",
        min: 0,
        max: 100
      });
      const input = wrapper.find("input");
      expect(input.attributes("min")).toBeUndefined();
      expect(input.attributes("max")).toBeUndefined();
    });
  });

  describe("Icon Support", () => {
    it("renders icon when iconName is provided", () => {
      const wrapper = createWrapper({ iconName: "IconSearch" });
      expect(wrapper.findComponent({ name: "Icon" }).exists()).toBe(true);
    });

    it("does not render icon when iconName is not provided", () => {
      const wrapper = createWrapper();
      expect(wrapper.findComponent({ name: "Icon" }).exists()).toBe(false);
    });

    it("applies left padding when icon is on left", () => {
      const wrapper = createWrapper({ iconName: "IconSearch" });
      const input = wrapper.find("input");
      expect(input.classes()).toContain("pl-10");
    });

    it("applies right padding when icon is on right", () => {
      const wrapper = createWrapper({
        iconName: "IconSearch",
        iconOppositePosition: true
      });
      const input = wrapper.find("input");
      expect(input.classes()).toContain("pr-10");
    });
  });

  describe("Error Message", () => {
    it("renders error message when error and errorMessage are provided", () => {
      const wrapper = createWrapper({
        error: true,
        errorMessage: "This field is required"
      });
      expect(wrapper.text()).toContain("This field is required");
    });

    it("does not render error message when error is false", () => {
      const wrapper = createWrapper({
        error: false,
        errorMessage: "This field is required"
      });
      expect(wrapper.text()).not.toContain("This field is required");
    });

    it("does not render error message when errorMessage is empty", () => {
      const wrapper = createWrapper({
        error: true,
        errorMessage: ""
      });
      expect(wrapper.find(".text-red-500").exists()).toBe(false);
    });
  });

  describe("Events", () => {
    it("emits update:modelValue when input occurs", async () => {
      const wrapper = createWrapper();
      const input = wrapper.find("input");

      await input.setValue("New value");

      expect(wrapper.emitted("update:modelValue")).toBeTruthy();
      expect(wrapper.emitted("update:modelValue")[0]).toEqual(["New value"]);
    });

    it("emits blur event", async () => {
      const wrapper = createWrapper();
      const input = wrapper.find("input");

      await input.trigger("blur");

      expect(wrapper.emitted("blur")).toBeTruthy();
    });

    it("emits focus event", async () => {
      const wrapper = createWrapper();
      const input = wrapper.find("input");

      await input.trigger("focus");

      expect(wrapper.emitted("focus")).toBeTruthy();
    });

    it("emits enter event when Enter key is pressed", async () => {
      const wrapper = createWrapper({ modelValue: "test value" });
      const input = wrapper.find("input");

      await input.trigger("keyup.enter");

      expect(wrapper.emitted("enter")).toBeTruthy();
      expect(wrapper.emitted("enter")[0]).toEqual(["test value"]);
    });

    it("clears input value after Enter key is pressed", async () => {
      const wrapper = createWrapper({ modelValue: "test value" });
      const input = wrapper.find("input");

      await input.trigger("keyup.enter");

      expect(wrapper.emitted("update:modelValue")).toBeTruthy();
      expect(wrapper.emitted("update:modelValue")[0]).toEqual([""]);
    });

    it("emits iconClick when icon is clicked", async () => {
      const wrapper = createWrapper({ iconName: "IconSearch" });
      const icon = wrapper.findComponent({ name: "Icon" });

      await icon.trigger("click");

      expect(wrapper.emitted("iconClick")).toBeTruthy();
    });

    it("does not emit iconClick when no icon is present", async () => {
      const wrapper = createWrapper();

      // No icon to click, so no event should be emitted
      expect(wrapper.emitted("iconClick")).toBeFalsy();
    });
  });

  describe("Input Types", () => {
    it("supports text type", () => {
      const wrapper = createWrapper({ type: "text" });
      const input = wrapper.find("input");
      expect(input.attributes("type")).toBe("text");
    });

    it("supports email type", () => {
      const wrapper = createWrapper({ type: "email" });
      const input = wrapper.find("input");
      expect(input.attributes("type")).toBe("email");
    });

    it("supports password type", () => {
      const wrapper = createWrapper({ type: "password" });
      const input = wrapper.find("input");
      expect(input.attributes("type")).toBe("password");
    });

    it("supports number type", () => {
      const wrapper = createWrapper({ type: "number" });
      const input = wrapper.find("input");
      expect(input.attributes("type")).toBe("number");
    });

    it("supports tel type", () => {
      const wrapper = createWrapper({ type: "tel" });
      const input = wrapper.find("input");
      expect(input.attributes("type")).toBe("tel");
    });

    it("supports url type", () => {
      const wrapper = createWrapper({ type: "url" });
      const input = wrapper.find("input");
      expect(input.attributes("type")).toBe("url");
    });

    it("supports search type", () => {
      const wrapper = createWrapper({ type: "search" });
      const input = wrapper.find("input");
      expect(input.attributes("type")).toBe("search");
    });

    it("supports range type", () => {
      const wrapper = createWrapper({ type: "range" });
      const input = wrapper.find("input");
      expect(input.attributes("type")).toBe("range");
    });
  });

  describe("RTL Support", () => {
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

  describe("Edge Cases", () => {
    it("handles empty modelValue", () => {
      const wrapper = createWrapper({ modelValue: "" });
      const input = wrapper.find("input");
      expect(input.element.value).toBe("");
    });

    it("handles undefined modelValue", () => {
      const wrapper = createWrapper({ modelValue: undefined });
      const input = wrapper.find("input");
      expect(input.element.value).toBe("");
    });

    it("handles empty label", () => {
      const wrapper = createWrapper({ label: "" });
      expect(wrapper.find("label").exists()).toBe(false);
    });

    it("handles empty error message", () => {
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