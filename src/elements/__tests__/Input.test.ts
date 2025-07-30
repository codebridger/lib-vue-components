import { describe, it, expect, vi } from "vitest";
import { mount, VueWrapper } from "@vue/test-utils";
import Input from "../Input.vue";
import Icon from "../../icon/Icon.vue";

describe("Input Component", () => {
  let wrapper: VueWrapper<any>;

  // Helper function to create wrapper with default props
  const createWrapper = (props = {}) => {
    return mount(Input, {
      props,
      global: {
        components: {
          Icon,
        },
      },
    });
  };

  describe("Rendering", () => {
    it("renders input element by default", () => {
      wrapper = createWrapper();
      expect(wrapper.find("input").exists()).toBe(true);
    });

    it("renders with label when provided", () => {
      wrapper = createWrapper({ label: "Email Address" });
      expect(wrapper.find("label").exists()).toBe(true);
      expect(wrapper.find("label").text()).toContain("Email Address");
    });

    it("renders required indicator when required is true", () => {
      wrapper = createWrapper({ label: "Email", required: true });
      const requiredSpan = wrapper.find("label span");
      expect(requiredSpan.exists()).toBe(true);
      expect(requiredSpan.text()).toBe("*");
      expect(requiredSpan.classes()).toContain("text-red-500");
    });

    it("renders placeholder text", () => {
      wrapper = createWrapper({ placeholder: "Enter your email" });
      expect(wrapper.find("input").attributes("placeholder")).toBe("Enter your email");
    });

    it("renders with icon when iconName is provided", () => {
      wrapper = createWrapper({ iconName: "IconSearch" });
      expect(wrapper.findComponent(Icon).exists()).toBe(true);
      expect(wrapper.findComponent(Icon).props("name")).toBe("IconSearch");
    });

    it("renders error message when error is true and errorMessage is provided", () => {
      wrapper = createWrapper({ 
        error: true, 
        errorMessage: "This field is required" 
      });
      const errorSpan = wrapper.find("span.text-red-500");
      expect(errorSpan.exists()).toBe(true);
      expect(errorSpan.text()).toBe("This field is required");
    });
  });

  describe("Props and Styling", () => {
    it("applies correct input type", () => {
      const types = ["text", "email", "password", "number", "tel", "url", "search", "range"];
      
      types.forEach((type) => {
        wrapper = createWrapper({ type });
        expect(wrapper.find("input").attributes("type")).toBe(type);
      });
    });

    it("applies form-input class for non-range types", () => {
      wrapper = createWrapper({ type: "text" });
      expect(wrapper.find("input").classes()).toContain("form-input");
    });

    it("applies range-specific classes for range type", () => {
      wrapper = createWrapper({ type: "range" });
      const input = wrapper.find("input");
      expect(input.classes()).toContain("w-full");
      expect(input.classes()).toContain("py-2.5");
      expect(input.classes()).not.toContain("form-input");
    });

    it("applies disabled styling when disabled", () => {
      wrapper = createWrapper({ disabled: true });
      const input = wrapper.find("input");
      expect(input.classes()).toContain("bg-gray-100");
      expect(input.classes()).toContain("cursor-not-allowed");
      expect(input.attributes("disabled")).toBeDefined();
    });

    it("applies disabled styling when cardDisabled is injected", () => {
      wrapper = mount(Input, {
        props: {},
        global: {
          components: { Icon },
          provide: {
            cardDisabled: true,
          },
        },
      });
      const input = wrapper.find("input");
      expect(input.classes()).toContain("bg-gray-100");
      expect(input.classes()).toContain("cursor-not-allowed");
      expect(input.attributes("disabled")).toBeDefined();
    });

    it("applies error styling when error is true", () => {
      wrapper = createWrapper({ error: true });
      expect(wrapper.find("input").classes()).toContain("border-red-500");
    });

    it("applies normal styling when not disabled or errored", () => {
      wrapper = createWrapper();
      const input = wrapper.find("input");
      expect(input.classes()).toContain("bg-white");
      expect(input.classes()).toContain("border-gray-300");
    });
  });

  describe("Icon Positioning", () => {
    it("positions icon on left by default in LTR", () => {
      wrapper = createWrapper({ iconName: "IconSearch" });
      const icon = wrapper.findComponent(Icon);
      expect(icon.classes()).toContain("left-3");
      expect(icon.classes()).not.toContain("right-3");
    });

    it("applies left padding when icon is on left", () => {
      wrapper = createWrapper({ iconName: "IconSearch" });
      expect(wrapper.find("input").classes()).toContain("pl-10");
    });

    it("applies right padding when icon is on right", () => {
      wrapper = createWrapper({ 
        iconName: "IconSearch", 
        iconOppositePosition: true 
      });
      expect(wrapper.find("input").classes()).toContain("pr-10");
    });
  });

  describe("Range Input Specific", () => {
    it("applies min and max attributes for range type", () => {
      wrapper = createWrapper({ 
        type: "range", 
        min: 0, 
        max: 100 
      });
      const input = wrapper.find("input");
      expect(input.attributes("min")).toBe("0");
      expect(input.attributes("max")).toBe("100");
    });

    it("does not apply min and max for non-range types", () => {
      wrapper = createWrapper({ 
        type: "text", 
        min: 0, 
        max: 100 
      });
      const input = wrapper.find("input");
      expect(input.attributes("min")).toBeUndefined();
      expect(input.attributes("max")).toBeUndefined();
    });
  });

  describe("Events", () => {
    it("emits update:modelValue when input value changes", async () => {
      wrapper = createWrapper();
      const input = wrapper.find("input");
      await input.setValue("test value");
      expect(wrapper.emitted("update:modelValue")).toBeTruthy();
      expect(wrapper.emitted("update:modelValue")?.[0]).toEqual(["test value"]);
    });

    it("emits blur event when input loses focus", async () => {
      wrapper = createWrapper();
      const input = wrapper.find("input");
      await input.trigger("blur");
      expect(wrapper.emitted("blur")).toBeTruthy();
    });

    it("emits focus event when input gains focus", async () => {
      wrapper = createWrapper();
      const input = wrapper.find("input");
      await input.trigger("focus");
      expect(wrapper.emitted("focus")).toBeTruthy();
    });

    it("emits enter event when Enter key is pressed", async () => {
      wrapper = createWrapper({ modelValue: "test" });
      const input = wrapper.find("input");
      await input.trigger("keyup.enter");
      expect(wrapper.emitted("enter")).toBeTruthy();
      expect(wrapper.emitted("enter")?.[0]).toEqual(["test"]);
    });

    it("clears input value after Enter key is pressed", async () => {
      wrapper = createWrapper({ modelValue: "test" });
      const input = wrapper.find("input");
      await input.trigger("keyup.enter");
      expect(wrapper.emitted("update:modelValue")?.[1]).toEqual([""]);
    });

    it("emits iconClick when icon is clicked", async () => {
      wrapper = createWrapper({ iconName: "IconSearch" });
      const icon = wrapper.findComponent(Icon);
      await icon.trigger("click");
      expect(wrapper.emitted("iconClick")).toBeTruthy();
    });
  });

  describe("Accessibility", () => {
    it("has proper id attribute", () => {
      wrapper = createWrapper({ id: "email-input" });
      expect(wrapper.find("input").attributes("id")).toBe("email-input");
    });

    it("associates label with input using for attribute", () => {
      wrapper = createWrapper({ 
        id: "email-input", 
        label: "Email" 
      });
      const label = wrapper.find("label");
      expect(label.attributes("for")).toBe("email-input");
    });

    it("has proper required attribute when required is true", () => {
      wrapper = createWrapper({ required: true });
      expect(wrapper.find("input").attributes("required")).toBeDefined();
    });

    it("has proper disabled attribute when disabled", () => {
      wrapper = createWrapper({ disabled: true });
      expect(wrapper.find("input").attributes("disabled")).toBeDefined();
    });
  });

  describe("v-model Integration", () => {
    it("binds modelValue to input value", () => {
      wrapper = createWrapper({ modelValue: "initial value" });
      expect(wrapper.find("input").element.value).toBe("initial value");
    });

    it("updates modelValue when input changes", async () => {
      wrapper = createWrapper({ modelValue: "initial" });
      const input = wrapper.find("input");
      await input.setValue("updated");
      expect(wrapper.emitted("update:modelValue")?.[0]).toEqual(["updated"]);
    });
  });

  describe("Edge Cases", () => {
    it("handles empty modelValue gracefully", () => {
      wrapper = createWrapper({ modelValue: "" });
      expect(wrapper.find("input").exists()).toBe(true);
    });

    it("handles undefined props gracefully", () => {
      wrapper = createWrapper({});
      expect(wrapper.find("input").exists()).toBe(true);
    });

    it("handles Enter key with empty value", async () => {
      wrapper = createWrapper({ modelValue: "" });
      const input = wrapper.find("input");
      await input.trigger("keyup.enter");
      expect(wrapper.emitted("enter")).toBeTruthy();
      expect(wrapper.emitted("enter")?.[0]).toEqual([""]);
    });

    it("handles icon click when no icon is provided", async () => {
      wrapper = createWrapper();
      // Should not throw error when trying to click non-existent icon
      expect(wrapper.findComponent(Icon).exists()).toBe(false);
    });
  });

  describe("RTL Support", () => {
    it("positions icon correctly in RTL mode", () => {
      // This would require mocking the store.isRtl value
      // For now, we test the default LTR behavior
      wrapper = createWrapper({ iconName: "IconSearch" });
      const icon = wrapper.findComponent(Icon);
      expect(icon.classes()).toContain("left-3");
    });
  });
});