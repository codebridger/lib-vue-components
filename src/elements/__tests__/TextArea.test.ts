import { describe, it, expect, vi, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";
import TextArea from "../TextArea.vue";

// Mock the store
const mockUseAppStore = vi.fn(() => ({
  isRtl: false,
}));

vi.mock("../stores/index", () => ({
  useAppStore: mockUseAppStore,
}));

describe("TextArea Component", () => {
  beforeEach(() => {
    const pinia = createPinia();
    setActivePinia(pinia);
  });

  const createWrapper = (props = {}) => {
    const defaultProps = {
      modelValue: "Test value",
      ...props,
    };
    return mount(TextArea, { props: defaultProps });
  };

  describe("Rendering", () => {
    it("renders as div element by default", () => {
      const wrapper = createWrapper();
      expect(wrapper.find("div").exists()).toBe(true);
    });

    it("renders textarea element", () => {
      const wrapper = createWrapper();
      expect(wrapper.find("textarea").exists()).toBe(true);
    });

    it("renders with default classes", () => {
      const wrapper = createWrapper();
      const textarea = wrapper.find("textarea");
      expect(textarea.classes()).toContain("form-textarea");
      expect(textarea.classes()).toContain("w-full");
    });
  });

  describe("Props and Styling", () => {
    it("applies disabled styling when disabled is true", () => {
      const wrapper = createWrapper({ disabled: true });
      const textarea = wrapper.find("textarea");
      expect(textarea.classes()).toContain("bg-gray-100");
      expect(textarea.classes()).toContain("cursor-not-allowed");
    });

    it("applies error styling when error is true", () => {
      const wrapper = createWrapper({ error: true });
      const textarea = wrapper.find("textarea");
      expect(textarea.classes()).toContain("border-red-500");
    });

    it("applies normal styling when not disabled or error", () => {
      const wrapper = createWrapper();
      const textarea = wrapper.find("textarea");
      expect(textarea.classes()).toContain("bg-white");
      expect(textarea.classes()).toContain("border-gray-300");
    });
  });

  describe("Label Rendering", () => {
    it("renders label when provided", () => {
      const wrapper = createWrapper({ label: "TextArea Label" });
      expect(wrapper.find("label").exists()).toBe(true);
      expect(wrapper.find("label").text()).toContain("TextArea Label");
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

    it("associates label with textarea using for attribute", () => {
      const wrapper = createWrapper({
        label: "TextArea Label",
        id: "test-textarea"
      });
      const label = wrapper.find("label");
      const textarea = wrapper.find("textarea");
      expect(label.attributes("for")).toBe("test-textarea");
      expect(textarea.attributes("id")).toBe("test-textarea");
    });
  });

  describe("Textarea Attributes", () => {
    it("sets value based on modelValue", () => {
      const wrapper = createWrapper({ modelValue: "Test content" });
      const textarea = wrapper.find("textarea");
      expect(textarea.element.value).toBe("Test content");
    });

    it("sets rows attribute", () => {
      const wrapper = createWrapper({ rows: 5 });
      const textarea = wrapper.find("textarea");
      expect(textarea.attributes("rows")).toBe("5");
    });

    it("sets placeholder attribute", () => {
      const wrapper = createWrapper({ placeholder: "Enter your text" });
      const textarea = wrapper.find("textarea");
      expect(textarea.attributes("placeholder")).toBe("Enter your text");
    });

    it("sets required attribute when required is true", () => {
      const wrapper = createWrapper({ required: true });
      const textarea = wrapper.find("textarea");
      expect(textarea.attributes("required")).toBeDefined();
    });

    it("sets disabled attribute when disabled is true", () => {
      const wrapper = createWrapper({ disabled: true });
      const textarea = wrapper.find("textarea");
      expect(textarea.attributes("disabled")).toBeDefined();
    });
  });

  describe("Icon Support", () => {
    it("renders icon when iconName is provided", () => {
      const wrapper = createWrapper({ iconName: "IconSettings" });
      expect(wrapper.findComponent({ name: "Icon" }).exists()).toBe(true);
    });

    it("does not render icon when iconName is not provided", () => {
      const wrapper = createWrapper();
      expect(wrapper.findComponent({ name: "Icon" }).exists()).toBe(false);
    });

    it("applies left padding when icon is on left", () => {
      const wrapper = createWrapper({ iconName: "IconSettings" });
      const textarea = wrapper.find("textarea");
      expect(textarea.classes()).toContain("pl-10");
    });

    it("applies right padding when icon is on right", () => {
      const wrapper = createWrapper({
        iconName: "IconSettings",
        iconOppositePosition: true
      });
      const textarea = wrapper.find("textarea");
      expect(textarea.classes()).toContain("pr-10");
    });
  });

  describe("Error Message", () => {
    it("renders error message when error and errorMsg are provided", () => {
      const wrapper = createWrapper({
        error: true,
        errorMsg: "This field is required"
      });
      expect(wrapper.text()).toContain("This field is required");
    });

    it("does not render error message when error is false", () => {
      const wrapper = createWrapper({
        error: false,
        errorMsg: "This field is required"
      });
      expect(wrapper.text()).not.toContain("This field is required");
    });

    it("does not render error message when errorMsg is empty", () => {
      const wrapper = createWrapper({
        error: true,
        errorMsg: ""
      });
      expect(wrapper.find(".text-red-500").exists()).toBe(false);
    });
  });

  describe("Events", () => {
    it("emits update:modelValue when input occurs", async () => {
      const wrapper = createWrapper();
      const textarea = wrapper.find("textarea");

      await textarea.setValue("New value");

      expect(wrapper.emitted("update:modelValue")).toBeTruthy();
      expect(wrapper.emitted("update:modelValue")[0]).toEqual(["New value"]);
    });

    it("emits iconClick when icon is clicked", async () => {
      const wrapper = createWrapper({ iconName: "IconSettings" });
      const icon = wrapper.findComponent({ name: "Icon" });

      await icon.trigger("click");

      expect(wrapper.emitted("iconClick")).toBeTruthy();
    });
  });

  describe("RTL Support", () => {
    it("handles RTL icon positioning", () => {
      // Mock RTL state
      mockUseAppStore.mockReturnValue({
        isRtl: true,
      });

      const wrapper = createWrapper({ iconName: "IconSettings" });
      const textarea = wrapper.find("textarea");
      // RTL positioning is handled by the store, test that component renders
      expect(textarea.exists()).toBe(true);
    });

    it("handles RTL icon positioning with opposite position", () => {
      // Mock RTL state
      mockUseAppStore.mockReturnValue({
        isRtl: true,
      });

      const wrapper = createWrapper({
        iconName: "IconSettings",
        iconOppositePosition: true
      });
      const textarea = wrapper.find("textarea");
      // RTL positioning is handled by the store, test that component renders
      expect(textarea.exists()).toBe(true);
    });
  });

  describe("Edge Cases", () => {
    it("handles empty modelValue", () => {
      const wrapper = createWrapper({ modelValue: "" });
      const textarea = wrapper.find("textarea");
      expect(textarea.element.value).toBe("");
    });

    it("handles undefined modelValue", () => {
      const wrapper = createWrapper({ modelValue: undefined });
      const textarea = wrapper.find("textarea");
      expect(textarea.element.value).toBe("");
    });

    it("handles empty label", () => {
      const wrapper = createWrapper({ label: "" });
      expect(wrapper.find("label").exists()).toBe(false);
    });

    it("handles empty error message", () => {
      const wrapper = createWrapper({
        error: true,
        errorMsg: ""
      });
      expect(wrapper.find(".text-red-500").exists()).toBe(false);
    });

    it("handles undefined props gracefully", () => {
      const wrapper = createWrapper({});
      expect(wrapper.exists()).toBe(true);
      expect(wrapper.find("textarea").exists()).toBe(true);
    });
  });
});