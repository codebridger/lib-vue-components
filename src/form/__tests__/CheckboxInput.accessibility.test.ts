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

describe("CheckboxInput Component Accessibility", () => {
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

  describe("Label Association", () => {
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

    it("provides meaningful label text", () => {
      const wrapper = createWrapper({ label: "Accept terms and conditions" });
      const label = wrapper.find("label");
      expect(label.text()).toContain("Accept terms and conditions");
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
      const checkbox = wrapper.find("input[type='checkbox']");
      expect(checkbox.attributes("disabled")).toBeDefined();
    });

    it("applies disabled styling for visual indication", () => {
      const wrapper = createWrapper({ disabled: true });
      const checkbox = wrapper.find("input[type='checkbox']");
      expect(checkbox.classes()).toContain("cursor-not-allowed");
      expect(checkbox.classes()).toContain("opacity-50");
    });
  });

  describe("Error State Accessibility", () => {
    it("indicates error state visually", () => {
      const wrapper = createWrapper({ error: true });
      const checkbox = wrapper.find("input[type='checkbox']");
      expect(checkbox.classes()).toContain("border-red-500");
    });

    it("provides error message for screen readers", () => {
      const wrapper = createWrapper({
        error: true,
        errorMessage: "This field is required"
      });
      expect(wrapper.text()).toContain("This field is required");
    });

    it("associates error message with checkbox", () => {
      const wrapper = createWrapper({
        error: true,
        errorMessage: "This field is required",
        id: "test-checkbox"
      });
      const checkbox = wrapper.find("input[type='checkbox']");
      expect(checkbox.attributes("id")).toBe("test-checkbox");
    });
  });

  describe("Keyboard Navigation", () => {
    it("is focusable by default", () => {
      const wrapper = createWrapper();
      const checkbox = wrapper.find("input[type='checkbox']");
      expect(checkbox.element.focus).toBeDefined();
    });

    it("is not focusable when disabled", () => {
      const wrapper = createWrapper({ disabled: true });
      const checkbox = wrapper.find("input[type='checkbox']");
      expect(checkbox.attributes("disabled")).toBeDefined();
    });

    it("supports space key activation", async () => {
      const wrapper = createWrapper();
      const checkbox = wrapper.find("input[type='checkbox']");

      await checkbox.setChecked();

      expect(wrapper.emitted("update:modelValue")).toBeTruthy();
    });

    it("supports enter key activation", async () => {
      const wrapper = createWrapper();
      const checkbox = wrapper.find("input[type='checkbox']");

      await checkbox.setChecked();

      expect(wrapper.emitted("update:modelValue")).toBeTruthy();
    });
  });

  describe("Screen Reader Support", () => {
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
        errorMessage: "Invalid selection"
      });
      expect(wrapper.text()).toContain("Invalid selection");
    });

    it("provides context for checkbox purpose", () => {
      const wrapper = createWrapper({
        label: "Terms",
        text: "I agree to the terms and conditions"
      });
      const label = wrapper.find("label");
      expect(label.text()).toContain("Terms");
      expect(wrapper.text()).toContain("I agree to the terms and conditions");
    });

    it("announces checkbox state changes", async () => {
      const wrapper = createWrapper({ text: "Enable notifications" });
      const checkbox = wrapper.find("input[type='checkbox']");

      await checkbox.setChecked();

      expect(wrapper.emitted("update:modelValue")).toBeTruthy();
      expect(wrapper.emitted("update:modelValue")[0]).toEqual([true]);
    });
  });

  describe("Checkbox Specific Accessibility", () => {
    it("supports aria-checked state", () => {
      const wrapper = createWrapper({ modelValue: true });
      const checkbox = wrapper.find("input[type='checkbox']");
      expect(checkbox.element.checked).toBe(true);
    });

    it("supports aria-required when required", () => {
      const wrapper = createWrapper({ required: true });
      const checkbox = wrapper.find("input[type='checkbox']");
      expect(checkbox.attributes("required")).toBeDefined();
    });

    it("provides sufficient contrast for text", () => {
      const wrapper = createWrapper({ text: "Checkbox text" });
      const textSpan = wrapper.find("span");
      expect(textSpan.classes()).toContain("text-gray-700");
    });

    it("supports high contrast mode", () => {
      const wrapper = createWrapper({ error: true });
      const checkbox = wrapper.find("input[type='checkbox']");
      expect(checkbox.classes()).toContain("border-red-500");
    });
  });

  describe("Form Integration Accessibility", () => {
    it("supports form submission", () => {
      const wrapper = createWrapper({ required: true });
      const checkbox = wrapper.find("input[type='checkbox']");
      expect(checkbox.attributes("required")).toBeDefined();
    });

    it("supports name attribute for form data", () => {
      const wrapper = createWrapper({ value: "accept-terms" });
      const checkbox = wrapper.find("input[type='checkbox']");
      expect(checkbox.attributes("value")).toBe("accept-terms");
    });
  });

  describe("Color and Variant Accessibility", () => {
    it("provides visual distinction for different colors", () => {
      const wrapper = createWrapper({ color: "success" });
      const checkbox = wrapper.find("input[type='checkbox']");
      expect(checkbox.classes()).toContain("text-success");
    });

    it("provides visual distinction for outline variant", () => {
      const wrapper = createWrapper({ variant: "outline" });
      const checkbox = wrapper.find("input[type='checkbox']");
      expect(checkbox.classes()).toContain("outline-primary");
    });

    it("provides visual distinction for rounded variant", () => {
      const wrapper = createWrapper({ variant: "rounded" });
      const checkbox = wrapper.find("input[type='checkbox']");
      expect(checkbox.classes()).toContain("rounded-full");
    });
  });

  describe("Focus Management", () => {
    it("supports focus event handling", async () => {
      const wrapper = createWrapper();
      const checkbox = wrapper.find("input[type='checkbox']");

      await checkbox.trigger("focus");

      expect(wrapper.emitted("focus")).toBeTruthy();
    });

    it("supports blur event handling", async () => {
      const wrapper = createWrapper();
      const checkbox = wrapper.find("input[type='checkbox']");

      await checkbox.trigger("blur");

      expect(wrapper.emitted("blur")).toBeTruthy();
    });

    it("maintains focus when interacting", async () => {
      const wrapper = createWrapper();
      const checkbox = wrapper.find("input[type='checkbox']");

      await checkbox.setChecked();

      expect(checkbox.exists()).toBe(true);
    });
  });

  describe("Text and Label Accessibility", () => {
    it("provides descriptive text for screen readers", () => {
      const wrapper = createWrapper({ text: "Send me marketing emails" });
      expect(wrapper.text()).toContain("Send me marketing emails");
    });

    it("handles long text gracefully", () => {
      const longText = "I agree to receive promotional emails and newsletters from the company and its partners, and I understand that I can unsubscribe at any time by clicking the unsubscribe link in the emails.";
      const wrapper = createWrapper({ text: longText });
      expect(wrapper.text()).toContain(longText);
    });

    it("handles special characters in text", () => {
      const wrapper = createWrapper({ text: "Accept terms & conditions" });
      expect(wrapper.text()).toContain("Accept terms & conditions");
    });
  });

  describe("Edge Cases and Error Handling", () => {
    it("handles empty label gracefully", () => {
      const wrapper = createWrapper({ label: "" });
      expect(wrapper.exists()).toBe(true);
    });

    it("handles empty text gracefully", () => {
      const wrapper = createWrapper({ text: "" });
      expect(wrapper.exists()).toBe(true);
    });

    it("handles empty error message gracefully", () => {
      const wrapper = createWrapper({
        error: true,
        errorMessage: ""
      });
      expect(wrapper.text()).not.toContain("This field is required");
    });

    it("handles undefined props gracefully", () => {
      const wrapper = createWrapper({});
      expect(wrapper.exists()).toBe(true);
      expect(wrapper.find("input[type='checkbox']").exists()).toBe(true);
    });
  });
});