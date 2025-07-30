import { describe, it, expect, vi } from "vitest";
import { mount, VueWrapper } from "@vue/test-utils";
import CheckboxInput from "../CheckboxInput.vue";

describe("CheckboxInput Component", () => {
  let wrapper: VueWrapper<any>;

  // Helper function to create wrapper with default props
  const createWrapper = (props = {}) => {
    return mount(CheckboxInput, {
      props,
    });
  };

  describe("Rendering", () => {
    it("renders checkbox input element", () => {
      wrapper = createWrapper();
      expect(wrapper.find("input[type='checkbox']").exists()).toBe(true);
    });

    it("renders with label when provided", () => {
      wrapper = createWrapper({ label: "Accept Terms" });
      const labels = wrapper.findAll("label");
      expect(labels[0].text()).toContain("Accept Terms");
    });

    it("renders required indicator when required is true", () => {
      wrapper = createWrapper({ label: "Accept Terms", required: true });
      const requiredSpan = wrapper.find("label span");
      expect(requiredSpan.exists()).toBe(true);
      expect(requiredSpan.text()).toBe("*");
      expect(requiredSpan.classes()).toContain("text-red-500");
    });

    it("renders text content", () => {
      wrapper = createWrapper({ text: "I agree to the terms" });
      expect(wrapper.text()).toContain("I agree to the terms");
    });

    it("renders error message when error is true and errorMessage is provided", () => {
      wrapper = createWrapper({ 
        error: true, 
        errorMessage: "You must accept the terms" 
      });
      const errorSpan = wrapper.find("span.text-red-500.mt-1");
      expect(errorSpan.exists()).toBe(true);
      expect(errorSpan.text()).toBe("You must accept the terms");
    });
  });

  describe("Props and Styling", () => {
    it("applies correct color classes", () => {
      const colors = ["primary", "success", "secondary", "danger", "warning", "info", "dark"];
      
      colors.forEach((color) => {
        wrapper = createWrapper({ color });
        const input = wrapper.find("input");
        if (color === "primary") {
          expect(input.classes()).toContain("form-checkbox");
        } else {
          expect(input.classes()).toContain(`text-${color}`);
        }
      });
    });

    it("applies outline variant styling", () => {
      wrapper = createWrapper({ variant: "outline", color: "primary" });
      const input = wrapper.find("input");
      expect(input.classes()).toContain("outline-primary");
    });

    it("applies rounded variant styling", () => {
      wrapper = createWrapper({ variant: "rounded" });
      const input = wrapper.find("input");
      expect(input.classes()).toContain("rounded-full");
    });

    it("applies outline-rounded variant styling", () => {
      wrapper = createWrapper({ variant: "outline-rounded", color: "primary" });
      const input = wrapper.find("input");
      expect(input.classes()).toContain("outline-primary");
      expect(input.classes()).toContain("rounded-full");
    });

    it("applies disabled styling when disabled", () => {
      wrapper = createWrapper({ disabled: true });
      const input = wrapper.find("input");
      const label = wrapper.find("label");
      expect(input.classes()).toContain("cursor-not-allowed");
      expect(input.classes()).toContain("opacity-50");
      expect(label.classes()).toContain("opacity-50");
      expect(label.classes()).toContain("cursor-not-allowed");
      expect(input.attributes("disabled")).toBeDefined();
    });

    it("applies disabled styling when cardDisabled is injected", () => {
      wrapper = mount(CheckboxInput, {
        props: {},
        global: {
          provide: {
            cardDisabled: true,
          },
        },
      });
      const input = wrapper.find("input");
      const label = wrapper.find("label");
      expect(input.classes()).toContain("cursor-not-allowed");
      expect(input.classes()).toContain("opacity-50");
      expect(label.classes()).toContain("opacity-50");
      expect(label.classes()).toContain("cursor-not-allowed");
      expect(input.attributes("disabled")).toBeDefined();
    });

    it("applies error styling when error is true", () => {
      wrapper = createWrapper({ error: true });
      const input = wrapper.find("input");
      const textSpan = wrapper.find("span:last-child");
      expect(input.classes()).toContain("border-red-500");
      expect(textSpan.classes()).toContain("text-red-500");
    });

    it("applies hover effects when not disabled", () => {
      wrapper = createWrapper();
      const input = wrapper.find("input");
      expect(input.classes()).toContain("hover:scale-105");
      expect(input.classes()).toContain("focus:ring-2");
      expect(input.classes()).toContain("focus:ring-offset-2");
    });

    it("does not apply hover effects when disabled", () => {
      wrapper = createWrapper({ disabled: true });
      const input = wrapper.find("input");
      expect(input.classes()).not.toContain("hover:scale-105");
      expect(input.classes()).not.toContain("focus:ring-2");
      expect(input.classes()).not.toContain("focus:ring-offset-2");
    });
  });

  describe("v-model Integration", () => {
    it("binds modelValue to checkbox checked state", () => {
      wrapper = createWrapper({ modelValue: true });
      expect(wrapper.find("input").element.checked).toBe(true);
    });

    it("updates modelValue when checkbox changes", async () => {
      wrapper = createWrapper({ modelValue: false });
      const input = wrapper.find("input");
      await input.setChecked();
      expect(wrapper.emitted("update:modelValue")?.[0]).toEqual([true]);
    });

    it("unchecks checkbox when modelValue is false", async () => {
      wrapper = createWrapper({ modelValue: true });
      const input = wrapper.find("input");
      await input.setChecked(false);
      expect(wrapper.emitted("update:modelValue")?.[0]).toEqual([false]);
    });
  });

  describe("Events", () => {
    it("emits update:modelValue when checkbox is clicked", async () => {
      wrapper = createWrapper({ modelValue: false });
      const input = wrapper.find("input[type='checkbox']");
      await input.setChecked(true);
      expect(wrapper.emitted("update:modelValue")?.[0]).toEqual([true]);
    });

    it("emits change event with correct parameters", async () => {
      wrapper = createWrapper({ modelValue: false });
      const input = wrapper.find("input[type='checkbox']");
      await input.setChecked(true);
      expect(wrapper.emitted("change")?.[0]).toEqual([true]);
    });

    it("emits blur event when checkbox loses focus", async () => {
      wrapper = createWrapper();
      const input = wrapper.find("input");
      await input.trigger("blur");
      expect(wrapper.emitted("blur")).toBeTruthy();
    });

    it("emits focus event when checkbox gains focus", async () => {
      wrapper = createWrapper();
      const input = wrapper.find("input");
      await input.trigger("focus");
      expect(wrapper.emitted("focus")).toBeTruthy();
    });

    it("does not emit events when disabled", async () => {
      wrapper = createWrapper({ disabled: true });
      const input = wrapper.find("input");
      await input.trigger("change");
      expect(wrapper.emitted("update:modelValue")).toBeFalsy();
    });
  });

  describe("Accessibility", () => {
    it("has proper id attribute", () => {
      wrapper = createWrapper({ id: "terms-checkbox" });
      expect(wrapper.find("input").attributes("id")).toBe("terms-checkbox");
    });

    it("associates label with checkbox using for attribute", () => {
      wrapper = createWrapper({ 
        id: "terms-checkbox", 
        label: "Accept Terms" 
      });
      const labels = wrapper.findAll("label");
      expect(labels[0].attributes("for")).toBe("terms-checkbox");
      expect(labels[1].attributes("for")).toBe("terms-checkbox");
    });

    it("has proper required attribute when required is true", () => {
      wrapper = createWrapper({ required: true });
      expect(wrapper.find("input").attributes("required")).toBeDefined();
    });

    it("has proper disabled attribute when disabled", () => {
      wrapper = createWrapper({ disabled: true });
      expect(wrapper.find("input").attributes("disabled")).toBeDefined();
    });

    it("has proper value attribute", () => {
      wrapper = createWrapper({ value: "custom-value" });
      expect(wrapper.find("input").attributes("value")).toBe("custom-value");
    });
  });

  describe("Value Handling", () => {
    it("handles string values", () => {
      wrapper = createWrapper({ value: "terms" });
      expect(wrapper.find("input").attributes("value")).toBe("terms");
    });

    it("handles number values", () => {
      wrapper = createWrapper({ value: 123 });
      expect(wrapper.find("input").attributes("value")).toBe("123");
    });

    it("handles boolean values", () => {
      wrapper = createWrapper({ value: true });
      expect(wrapper.find("input").attributes("value")).toBe("true");
    });
  });

  describe("Variant Computed Properties", () => {
    it("computes outline property correctly", () => {
      wrapper = createWrapper({ variant: "outline" });
      // The outline class should be applied to the input
      expect(wrapper.find("input").classes()).toContain("outline-primary");
    });

    it("computes rounded property correctly", () => {
      wrapper = createWrapper({ variant: "rounded" });
      expect(wrapper.find("input").classes()).toContain("rounded-full");
    });

    it("computes peerChecked property correctly", () => {
      wrapper = createWrapper({ variant: "default" });
      expect(wrapper.find("input").classes()).toContain("peer");
    });
  });

  describe("Edge Cases", () => {
    it("handles empty text gracefully", () => {
      wrapper = createWrapper({ text: "" });
      expect(wrapper.find("input").exists()).toBe(true);
    });

    it("handles undefined props gracefully", () => {
      wrapper = createWrapper({});
      expect(wrapper.find("input").exists()).toBe(true);
    });

    it("handles both label and text props", () => {
      wrapper = createWrapper({ 
        label: "Terms Label", 
        text: "Terms Text" 
      });
      expect(wrapper.text()).toContain("Terms Label");
      expect(wrapper.text()).toContain("Terms Text");
    });

    it("handles change event with empty value", async () => {
      wrapper = createWrapper({ modelValue: false });
      const input = wrapper.find("input[type='checkbox']");
      await input.setChecked(true);
      expect(wrapper.emitted("change")?.[0]).toEqual([true]);
    });
  });

  describe("Dark Theme Support", () => {
    it("applies dark theme classes to text", () => {
      wrapper = createWrapper({ text: "Dark theme text" });
      const textSpan = wrapper.find("span:last-child");
      expect(textSpan.classes()).toContain("dark:text-gray-300");
    });

    it("applies dark theme classes to label", () => {
      wrapper = createWrapper({ label: "Dark theme label" });
      const label = wrapper.find("label");
      expect(label.classes()).toContain("dark:text-gray-300");
    });
  });

  describe("RTL Support", () => {
    it("applies RTL margin classes", () => {
      wrapper = createWrapper({ text: "RTL text" });
      const textSpan = wrapper.find("span:last-child");
      expect(textSpan.classes()).toContain("ltr:ml-2");
      expect(textSpan.classes()).toContain("rtl:mr-2");
    });
  });
});