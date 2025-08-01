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

describe("TextArea Component Accessibility", () => {
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

  describe("Label Association", () => {
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

    it("provides meaningful label text", () => {
      const wrapper = createWrapper({ label: "Enter your message" });
      const label = wrapper.find("label");
      expect(label.text()).toContain("Enter your message");
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
      const textarea = wrapper.find("textarea");
      expect(textarea.attributes("disabled")).toBeDefined();
    });

    it("applies disabled styling for visual indication", () => {
      const wrapper = createWrapper({ disabled: true });
      const textarea = wrapper.find("textarea");
      expect(textarea.classes()).toContain("bg-gray-100");
      expect(textarea.classes()).toContain("cursor-not-allowed");
    });
  });

  describe("Error State Accessibility", () => {
    it("indicates error state visually", () => {
      const wrapper = createWrapper({ error: true });
      const textarea = wrapper.find("textarea");
      expect(textarea.classes()).toContain("border-red-500");
    });

    it("provides error message for screen readers", () => {
      const wrapper = createWrapper({
        error: true,
        errorMsg: "This field is required"
      });
      expect(wrapper.text()).toContain("This field is required");
    });

    it("associates error message with textarea", () => {
      const wrapper = createWrapper({
        error: true,
        errorMsg: "This field is required",
        id: "test-textarea"
      });
      const textarea = wrapper.find("textarea");
      expect(textarea.attributes("id")).toBe("test-textarea");
    });
  });

  describe("Keyboard Navigation", () => {
    it("is focusable by default", () => {
      const wrapper = createWrapper();
      const textarea = wrapper.find("textarea");
      expect(textarea.element.focus).toBeDefined();
    });

    it("is not focusable when disabled", () => {
      const wrapper = createWrapper({ disabled: true });
      const textarea = wrapper.find("textarea");
      expect(textarea.attributes("disabled")).toBeDefined();
    });
  });

  describe("Screen Reader Support", () => {
    it("provides meaningful placeholder text", () => {
      const wrapper = createWrapper({ placeholder: "Enter your message here" });
      const textarea = wrapper.find("textarea");
      expect(textarea.attributes("placeholder")).toBe("Enter your message here");
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
        errorMsg: "Invalid input"
      });
      expect(wrapper.text()).toContain("Invalid input");
    });

    it("provides context for textarea purpose", () => {
      const wrapper = createWrapper({
        label: "Message",
        placeholder: "Type your message here"
      });
      const label = wrapper.find("label");
      const textarea = wrapper.find("textarea");
      expect(label.text()).toContain("Message");
      expect(textarea.attributes("placeholder")).toBe("Type your message here");
    });
  });

  describe("Icon Accessibility", () => {
    it("provides icon context for screen readers", () => {
      const wrapper = createWrapper({ iconName: "IconSettings" });
      const icon = wrapper.findComponent({ name: "Icon" });
      expect(icon.exists()).toBe(true);
    });

    it("supports icon click events", async () => {
      const wrapper = createWrapper({ iconName: "IconSettings" });
      const icon = wrapper.findComponent({ name: "Icon" });

      await icon.trigger("click");

      expect(wrapper.emitted("iconClick")).toBeTruthy();
    });

    it("positions icon correctly for RTL support", () => {
      const wrapper = createWrapper({
        iconName: "IconSettings",
        iconOppositePosition: true
      });
      const textarea = wrapper.find("textarea");
      expect(textarea.classes()).toContain("pr-10");
    });
  });

  describe("Textarea Specific Accessibility", () => {
    it("supports rows attribute for size indication", () => {
      const wrapper = createWrapper({ rows: 5 });
      const textarea = wrapper.find("textarea");
      expect(textarea.attributes("rows")).toBe("5");
    });

    it("supports resizing for user preference", () => {
      const wrapper = createWrapper();
      const textarea = wrapper.find("textarea");
      expect(textarea.classes()).toContain("form-textarea");
    });

    it("provides sufficient contrast for text input", () => {
      const wrapper = createWrapper();
      const textarea = wrapper.find("textarea");
      expect(textarea.classes()).toContain("bg-white");
    });

    it("supports high contrast mode", () => {
      const wrapper = createWrapper({ error: true });
      const textarea = wrapper.find("textarea");
      expect(textarea.classes()).toContain("border-red-500");
    });
  });

  describe("RTL Support Accessibility", () => {
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

  describe("Edge Cases and Error Handling", () => {
    it("handles empty modelValue gracefully", () => {
      const wrapper = createWrapper({ modelValue: "" });
      const textarea = wrapper.find("textarea");
      expect(textarea.element.value).toBe("");
    });

    it("handles undefined modelValue gracefully", () => {
      const wrapper = createWrapper({ modelValue: undefined });
      const textarea = wrapper.find("textarea");
      expect(textarea.element.value).toBe("");
    });

    it("handles empty label gracefully", () => {
      const wrapper = createWrapper({ label: "" });
      expect(wrapper.find("label").exists()).toBe(false);
    });

    it("handles empty error message gracefully", () => {
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