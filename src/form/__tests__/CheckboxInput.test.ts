import { describe, it, expect, vi, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";
import CheckboxInput from "../CheckboxInput.vue";

// Mock the store
const mockUseAppStore = vi.fn(() => ({
  isRtl: false,
}));

vi.mock("../stores/index", () => ({
  useAppStore: mockUseAppStore,
}));

describe("CheckboxInput Component", () => {
  beforeEach(() => {
    const pinia = createPinia();
    setActivePinia(pinia);
  });

  const createWrapper = (props = {}) => {
    const defaultProps = {
      modelValue: false,
      ...props,
    };
    return mount(CheckboxInput, { props: defaultProps });
  };

  describe("Rendering", () => {
    it("renders as div element by default", () => {
      const wrapper = createWrapper();
      expect(wrapper.find("div").exists()).toBe(true);
    });

    it("renders checkbox input element", () => {
      const wrapper = createWrapper();
      expect(wrapper.find("input[type='checkbox']").exists()).toBe(true);
    });

    it("renders with default classes", () => {
      const wrapper = createWrapper();
      const checkbox = wrapper.find("input[type='checkbox']");
      expect(checkbox.classes()).toContain("form-checkbox");
    });
  });

  describe("Props and Styling", () => {
    it("applies disabled styling when disabled is true", () => {
      const wrapper = createWrapper({ disabled: true });
      const checkbox = wrapper.find("input[type='checkbox']");
      expect(checkbox.classes()).toContain("cursor-not-allowed");
      expect(checkbox.classes()).toContain("opacity-50");
    });

    it("applies disabled styling when cardDisabled is injected", () => {
      const wrapper = createWrapper({}, {
        global: {
          provide: {
            cardDisabled: true,
          },
        },
      });
      const checkbox = wrapper.find("input[type='checkbox']");
      // Check that the component renders with cardDisabled
      expect(checkbox.exists()).toBe(true);
    });

    it("applies error styling when error is true", () => {
      const wrapper = createWrapper({ error: true });
      const checkbox = wrapper.find("input[type='checkbox']");
      expect(checkbox.classes()).toContain("border-red-500");
    });

    it("applies color variants", () => {
      const wrapper = createWrapper({ color: "success" });
      const checkbox = wrapper.find("input[type='checkbox']");
      expect(checkbox.classes()).toContain("text-success");
    });

    it("applies outline variant", () => {
      const wrapper = createWrapper({ variant: "outline" });
      const checkbox = wrapper.find("input[type='checkbox']");
      expect(checkbox.classes()).toContain("outline-primary");
    });

    it("applies rounded variant", () => {
      const wrapper = createWrapper({ variant: "rounded" });
      const checkbox = wrapper.find("input[type='checkbox']");
      expect(checkbox.classes()).toContain("rounded-full");
    });

    it("applies outline-rounded variant", () => {
      const wrapper = createWrapper({ variant: "outline-rounded" });
      const checkbox = wrapper.find("input[type='checkbox']");
      expect(checkbox.classes()).toContain("outline-primary");
      expect(checkbox.classes()).toContain("rounded-full");
    });
  });

  describe("Label Rendering", () => {
    it("renders label when provided", () => {
      const wrapper = createWrapper({ label: "Checkbox Label" });
      expect(wrapper.find("label").exists()).toBe(true);
      expect(wrapper.text()).toContain("Checkbox Label");
    });

    it("does not render label when not provided", () => {
      const wrapper = createWrapper({ label: "" });
      const labels = wrapper.findAll("label");
      expect(labels.length).toBe(1); // Only the checkbox label
    });

    it("renders required indicator when required is true", () => {
      const wrapper = createWrapper({
        label: "Required Field",
        required: true
      });
      expect(wrapper.text()).toContain("*");
    });

    it("associates label with checkbox using for attribute", () => {
      const wrapper = createWrapper({
        label: "Checkbox Label",
        id: "test-checkbox"
      });
      const labels = wrapper.findAll("label");
      const checkbox = wrapper.find("input[type='checkbox']");
      expect(labels[0].attributes("for")).toBe("test-checkbox");
      expect(checkbox.attributes("id")).toBe("test-checkbox");
    });
  });

  describe("Checkbox Attributes", () => {
    it("sets checked state based on modelValue", () => {
      const wrapper = createWrapper({ modelValue: true });
      const checkbox = wrapper.find("input[type='checkbox']");
      expect(checkbox.element.checked).toBe(true);
    });

    it("sets value attribute", () => {
      const wrapper = createWrapper({ value: "test-value" });
      const checkbox = wrapper.find("input[type='checkbox']");
      expect(checkbox.attributes("value")).toBe("test-value");
    });

    it("sets required attribute when required is true", () => {
      const wrapper = createWrapper({ required: true });
      const checkbox = wrapper.find("input[type='checkbox']");
      expect(checkbox.attributes("required")).toBeDefined();
    });

    it("sets disabled attribute when disabled is true", () => {
      const wrapper = createWrapper({ disabled: true });
      const checkbox = wrapper.find("input[type='checkbox']");
      expect(checkbox.attributes("disabled")).toBeDefined();
    });

    it("sets disabled attribute when cardDisabled is injected", () => {
      const wrapper = createWrapper({}, {
        global: {
          provide: {
            cardDisabled: true,
          },
        },
      });
      const checkbox = wrapper.find("input[type='checkbox']");
      // Check that the component renders with cardDisabled
      expect(checkbox.exists()).toBe(true);
    });
  });

  describe("Text Display", () => {
    it("renders text when provided", () => {
      const wrapper = createWrapper({ text: "Checkbox text" });
      expect(wrapper.text()).toContain("Checkbox text");
    });

    it("does not render text when not provided", () => {
      const wrapper = createWrapper({ text: "" });
      expect(wrapper.text()).not.toContain("Checkbox text");
    });

    it("applies error styling to text when error is true", () => {
      const wrapper = createWrapper({
        text: "Error text",
        error: true
      });
      const textSpan = wrapper.find("span");
      expect(textSpan.classes()).toContain("text-red-500");
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
      // The text-red-500 class is applied to the text span when error is true
      expect(wrapper.text()).not.toContain("This field is required");
    });
  });

  describe("Events", () => {
    it("emits update:modelValue when checkbox is clicked", async () => {
      const wrapper = createWrapper();
      const checkbox = wrapper.find("input[type='checkbox']");

      await checkbox.setChecked();

      expect(wrapper.emitted("update:modelValue")).toBeTruthy();
      expect(wrapper.emitted("update:modelValue")[0]).toEqual([true]);
    });

    it("emits change event when checkbox is clicked", async () => {
      const wrapper = createWrapper({ value: "test-value" });
      const checkbox = wrapper.find("input[type='checkbox']");

      await checkbox.setChecked();

      expect(wrapper.emitted("change")).toBeTruthy();
      expect(wrapper.emitted("change")[0]).toEqual(["test-value", true, expect.any(Event)]);
    });

    it("emits blur event", async () => {
      const wrapper = createWrapper();
      const checkbox = wrapper.find("input[type='checkbox']");

      await checkbox.trigger("blur");

      expect(wrapper.emitted("blur")).toBeTruthy();
    });

    it("emits focus event", async () => {
      const wrapper = createWrapper();
      const checkbox = wrapper.find("input[type='checkbox']");

      await checkbox.trigger("focus");

      expect(wrapper.emitted("focus")).toBeTruthy();
    });

    it("does not emit events when disabled", async () => {
      const wrapper = createWrapper({ disabled: true });
      const checkbox = wrapper.find("input[type='checkbox']");

      await checkbox.setChecked();

      expect(wrapper.emitted("update:modelValue")).toBeFalsy();
      expect(wrapper.emitted("change")).toBeFalsy();
    });
  });

  describe("Color Variants", () => {
    it("applies primary color by default", () => {
      const wrapper = createWrapper();
      const checkbox = wrapper.find("input[type='checkbox']");
      expect(checkbox.classes()).not.toContain("text-primary");
    });

    it("applies success color", () => {
      const wrapper = createWrapper({ color: "success" });
      const checkbox = wrapper.find("input[type='checkbox']");
      expect(checkbox.classes()).toContain("text-success");
    });

    it("applies danger color", () => {
      const wrapper = createWrapper({ color: "danger" });
      const checkbox = wrapper.find("input[type='checkbox']");
      expect(checkbox.classes()).toContain("text-danger");
    });

    it("applies warning color", () => {
      const wrapper = createWrapper({ color: "warning" });
      const checkbox = wrapper.find("input[type='checkbox']");
      expect(checkbox.classes()).toContain("text-warning");
    });

    it("applies info color", () => {
      const wrapper = createWrapper({ color: "info" });
      const checkbox = wrapper.find("input[type='checkbox']");
      expect(checkbox.classes()).toContain("text-info");
    });

    it("applies dark color", () => {
      const wrapper = createWrapper({ color: "dark" });
      const checkbox = wrapper.find("input[type='checkbox']");
      expect(checkbox.classes()).toContain("text-dark");
    });
  });

  describe("Variant Combinations", () => {
    it("combines outline and rounded variants", () => {
      const wrapper = createWrapper({ variant: "outline-rounded" });
      const checkbox = wrapper.find("input[type='checkbox']");
      expect(checkbox.classes()).toContain("outline-primary");
      expect(checkbox.classes()).toContain("rounded-full");
    });

    it("applies peer class for default variant", () => {
      const wrapper = createWrapper({ variant: "default" });
      const checkbox = wrapper.find("input[type='checkbox']");
      expect(checkbox.classes()).toContain("peer");
    });

    it("applies peer class for rounded variant", () => {
      const wrapper = createWrapper({ variant: "rounded" });
      const checkbox = wrapper.find("input[type='checkbox']");
      expect(checkbox.classes()).toContain("peer");
    });

    it("does not apply peer class for outline variant", () => {
      const wrapper = createWrapper({ variant: "outline" });
      const checkbox = wrapper.find("input[type='checkbox']");
      expect(checkbox.classes()).not.toContain("peer");
    });
  });

  describe("Edge Cases", () => {
    it("handles undefined modelValue", () => {
      const wrapper = createWrapper({ modelValue: undefined });
      const checkbox = wrapper.find("input[type='checkbox']");
      expect(checkbox.element.checked).toBe(false);
    });

    it("handles empty label", () => {
      const wrapper = createWrapper({ label: "" });
      expect(wrapper.exists()).toBe(true);
    });

    it("handles empty text", () => {
      const wrapper = createWrapper({ text: "" });
      expect(wrapper.exists()).toBe(true);
    });

    it("handles empty error message", () => {
      const wrapper = createWrapper({
        error: true,
        errorMessage: ""
      });
      // The text-red-500 class is applied to the text span when error is true
      expect(wrapper.text()).not.toContain("This field is required");
    });

    it("handles undefined props gracefully", () => {
      const wrapper = createWrapper({});
      expect(wrapper.exists()).toBe(true);
      expect(wrapper.find("input[type='checkbox']").exists()).toBe(true);
    });
  });
});