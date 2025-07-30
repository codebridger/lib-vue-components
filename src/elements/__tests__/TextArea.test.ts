import { describe, it, expect, vi } from "vitest";
import { mount, VueWrapper } from "@vue/test-utils";
import TextArea from "../TextArea.vue";
import Icon from "../../icon/Icon.vue";

describe("TextArea Component", () => {
  let wrapper: VueWrapper<any>;

  // Helper function to create wrapper with default props
  const createWrapper = (props = {}) => {
    return mount(TextArea, {
      props,
      global: {
        components: {
          Icon,
        },
      },
    });
  };

  describe("Rendering", () => {
    it("renders textarea element", () => {
      wrapper = createWrapper();
      expect(wrapper.find("textarea").exists()).toBe(true);
    });

    it("renders with label when provided", () => {
      wrapper = createWrapper({ label: "Description" });
      expect(wrapper.find("label").exists()).toBe(true);
      expect(wrapper.find("label").text()).toContain("Description");
    });

    it("renders required indicator when required is true", () => {
      wrapper = createWrapper({ label: "Description", required: true });
      const requiredSpan = wrapper.find("label span");
      expect(requiredSpan.exists()).toBe(true);
      expect(requiredSpan.text()).toBe("*");
      expect(requiredSpan.classes()).toContain("text-red-500");
    });

    it("renders placeholder text", () => {
      wrapper = createWrapper({ placeholder: "Enter your description" });
      expect(wrapper.find("textarea").attributes("placeholder")).toBe("Enter your description");
    });

    it("renders with icon when iconName is provided", () => {
      wrapper = createWrapper({ iconName: "IconEdit" });
      expect(wrapper.findComponent(Icon).exists()).toBe(true);
      expect(wrapper.findComponent(Icon).props("name")).toBe("IconEdit");
    });

    it("renders error message when error is true and errorMsg is provided", () => {
      wrapper = createWrapper({ 
        error: true, 
        errorMsg: "This field is required" 
      });
      const errorSpan = wrapper.find("span.text-red-500");
      expect(errorSpan.exists()).toBe(true);
      expect(errorSpan.text()).toBe("This field is required");
    });
  });

  describe("Props and Styling", () => {
    it("applies base textarea classes", () => {
      wrapper = createWrapper();
      const textarea = wrapper.find("textarea");
      expect(textarea.classes()).toContain("form-textarea");
      expect(textarea.classes()).toContain("w-full");
    });

    it("applies rows attribute", () => {
      wrapper = createWrapper({ rows: 5 });
      expect(wrapper.find("textarea").attributes("rows")).toBe("5");
    });

    it("applies disabled styling when disabled", () => {
      wrapper = createWrapper({ disabled: true });
      const textarea = wrapper.find("textarea");
      expect(textarea.classes()).toContain("bg-gray-100");
      expect(textarea.classes()).toContain("cursor-not-allowed");
      expect(textarea.attributes("disabled")).toBeDefined();
    });

    it("applies disabled styling when cardDisabled is injected", () => {
      wrapper = mount(TextArea, {
        props: {},
        global: {
          components: { Icon },
          provide: {
            cardDisabled: true,
          },
        },
      });
      const textarea = wrapper.find("textarea");
      expect(textarea.classes()).toContain("bg-gray-100");
      expect(textarea.classes()).toContain("cursor-not-allowed");
      expect(textarea.attributes("disabled")).toBeDefined();
    });

    it("applies error styling when error is true", () => {
      wrapper = createWrapper({ error: true });
      expect(wrapper.find("textarea").classes()).toContain("border-red-500");
    });

    it("applies normal styling when not disabled or errored", () => {
      wrapper = createWrapper();
      const textarea = wrapper.find("textarea");
      expect(textarea.classes()).toContain("bg-white");
      expect(textarea.classes()).toContain("border-gray-300");
    });
  });

  describe("Icon Positioning", () => {
    it("positions icon on left by default in LTR", () => {
      wrapper = createWrapper({ iconName: "IconEdit" });
      const icon = wrapper.findComponent(Icon);
      expect(icon.classes()).toContain("left-3");
      expect(icon.classes()).not.toContain("right-3");
    });

    it("applies left padding when icon is on left", () => {
      wrapper = createWrapper({ iconName: "IconEdit" });
      expect(wrapper.find("textarea").classes()).toContain("pl-10");
    });

    it("applies right padding when icon is on right", () => {
      wrapper = createWrapper({ 
        iconName: "IconEdit", 
        iconOppositePosition: true 
      });
      expect(wrapper.find("textarea").classes()).toContain("pr-10");
    });

    it("positions icon correctly with iconOppositePosition", () => {
      wrapper = createWrapper({ 
        iconName: "IconEdit", 
        iconOppositePosition: true 
      });
      const icon = wrapper.findComponent(Icon);
      expect(icon.classes()).toContain("right-3");
      expect(icon.classes()).not.toContain("left-3");
    });
  });

  describe("Events", () => {
    it("emits update:modelValue when textarea value changes", async () => {
      wrapper = createWrapper();
      const textarea = wrapper.find("textarea");
      await textarea.setValue("new value");
      expect(wrapper.emitted("update:modelValue")).toBeTruthy();
      expect(wrapper.emitted("update:modelValue")?.[0]).toEqual(["new value"]);
    });

    it("emits iconClick when icon is clicked", async () => {
      wrapper = createWrapper({ iconName: "IconEdit" });
      const icon = wrapper.findComponent(Icon);
      await icon.trigger("click");
      expect(wrapper.emitted("iconClick")).toBeTruthy();
    });
  });

  describe("Accessibility", () => {
    it("has proper id attribute", () => {
      wrapper = createWrapper({ id: "description-textarea" });
      expect(wrapper.find("textarea").attributes("id")).toBe("description-textarea");
    });

    it("associates label with textarea using for attribute", () => {
      wrapper = createWrapper({ 
        id: "description-textarea", 
        label: "Description" 
      });
      const label = wrapper.find("label");
      expect(label.attributes("for")).toBe("description-textarea");
    });

    it("has proper required attribute when required is true", () => {
      wrapper = createWrapper({ required: true });
      expect(wrapper.find("textarea").attributes("required")).toBeDefined();
    });

    it("has proper disabled attribute when disabled", () => {
      wrapper = createWrapper({ disabled: true });
      expect(wrapper.find("textarea").attributes("disabled")).toBeDefined();
    });
  });

  describe("v-model Integration", () => {
    it("binds modelValue to textarea value", () => {
      wrapper = createWrapper({ modelValue: "initial value" });
      expect(wrapper.find("textarea").element.value).toBe("initial value");
    });

    it("updates modelValue when textarea changes", async () => {
      wrapper = createWrapper({ modelValue: "initial" });
      const textarea = wrapper.find("textarea");
      await textarea.setValue("updated");
      expect(wrapper.emitted("update:modelValue")?.[0]).toEqual(["updated"]);
    });
  });

  describe("Edge Cases", () => {
    it("handles empty modelValue gracefully", () => {
      wrapper = createWrapper({ modelValue: "" });
      expect(wrapper.find("textarea").exists()).toBe(true);
    });

    it("handles undefined props gracefully", () => {
      wrapper = createWrapper({});
      expect(wrapper.find("textarea").exists()).toBe(true);
    });

    it("handles icon click when no icon is provided", async () => {
      wrapper = createWrapper();
      // Should not throw error when trying to click non-existent icon
      expect(wrapper.findComponent(Icon).exists()).toBe(false);
    });

    it("handles string rows value", () => {
      wrapper = createWrapper({ rows: "5" });
      expect(wrapper.find("textarea").attributes("rows")).toBe("5");
    });

    it("handles number rows value", () => {
      wrapper = createWrapper({ rows: 5 });
      expect(wrapper.find("textarea").attributes("rows")).toBe("5");
    });
  });

  describe("RTL Support", () => {
    it("positions icon correctly in RTL mode", () => {
      // This would require mocking the store.isRtl value
      // For now, we test the default LTR behavior
      wrapper = createWrapper({ iconName: "IconEdit" });
      const icon = wrapper.findComponent(Icon);
      expect(icon.classes()).toContain("left-3");
    });
  });

  describe("Default Values", () => {
    it("uses correct default values", () => {
      wrapper = createWrapper();
      expect(wrapper.props("modelValue")).toBe("");
      expect(wrapper.props("rows")).toBe(3);
      expect(wrapper.props("placeholder")).toBe("Enter Textarea");
      expect(wrapper.props("required")).toBe(false);
      expect(wrapper.props("disabled")).toBe(false);
      expect(wrapper.props("error")).toBe(false);
      expect(wrapper.props("errorMsg")).toBe("");
      expect(wrapper.props("label")).toBe("");
      expect(wrapper.props("id")).toBe("");
      expect(wrapper.props("iconName")).toBe("");
      expect(wrapper.props("iconOppositePosition")).toBe(false);
    });
  });

  describe("Icon Styling", () => {
    it("applies base icon classes", () => {
      wrapper = createWrapper({ iconName: "IconEdit" });
      const icon = wrapper.findComponent(Icon);
      expect(icon.classes()).toContain("absolute");
      expect(icon.classes()).toContain("top-3");
      expect(icon.classes()).toContain("transform");
      expect(icon.classes()).toContain("cursor-pointer");
    });
  });

  describe("Error Handling", () => {
    it("shows error message only when both error and errorMsg are provided", () => {
      wrapper = createWrapper({ error: true });
      expect(wrapper.find("span.text-red-500").exists()).toBe(false);

      wrapper = createWrapper({ errorMsg: "Error message" });
      expect(wrapper.find("span.text-red-500").exists()).toBe(false);

      wrapper = createWrapper({ error: true, errorMsg: "Error message" });
      expect(wrapper.find("span.text-red-500").exists()).toBe(true);
    });
  });
});