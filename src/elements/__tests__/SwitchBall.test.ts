import { describe, it, expect, vi } from "vitest";
import { mount, VueWrapper } from "@vue/test-utils";
import SwitchBall from "../SwitchBall.vue";
import Icon from "../../icon/Icon.vue";

describe("SwitchBall Component", () => {
  let wrapper: VueWrapper<any>;

  // Helper function to create wrapper with default props
  const createWrapper = (props = {}) => {
    return mount(SwitchBall, {
      props: {
        id: "test-switch",
        modelValue: false,
        label: "Test Label",
        sublabel: "Test Sublabel",
        ...props,
      },
      global: {
        components: {
          Icon,
        },
      },
    });
  };

  describe("Rendering", () => {
    it("renders switch container", () => {
      wrapper = createWrapper();
      expect(wrapper.find("label").exists()).toBe(true);
    });

    it("renders input element", () => {
      wrapper = createWrapper();
      expect(wrapper.find("input[type='checkbox']").exists()).toBe(true);
    });

    it("renders background track", () => {
      wrapper = createWrapper();
      expect(wrapper.find("span").exists()).toBe(true);
    });

    it("renders moving ball", () => {
      wrapper = createWrapper();
      const ball = wrapper.findAll("span")[1];
      expect(ball.classes()).toContain("rounded-full");
      expect(ball.classes()).toContain("bg-white");
    });

    it("renders icon when iconName is provided", () => {
      wrapper = createWrapper({ iconName: "IconCheck" });
      expect(wrapper.findComponent(Icon).exists()).toBe(true);
      expect(wrapper.findComponent(Icon).props("name")).toBe("IconCheck");
    });

    it("renders label text", () => {
      wrapper = createWrapper({ label: "Toggle Switch" });
      expect(wrapper.text()).toContain("Toggle Switch");
    });

    it("renders sublabel when provided", () => {
      wrapper = createWrapper({ 
        label: "Toggle Switch", 
        sublabel: "Additional description" 
      });
      expect(wrapper.text()).toContain("Additional description");
    });

    it("does not render sublabel when not provided", () => {
      wrapper = createWrapper({ label: "Toggle Switch" });
      expect(wrapper.text()).not.toContain("Additional description");
    });
  });

  describe("Props and Styling", () => {
    it("applies base label classes", () => {
      wrapper = createWrapper();
      const label = wrapper.find("label");
      expect(label.classes()).toContain("relative");
      expect(label.classes()).toContain("inline-flex");
      expect(label.classes()).toContain("items-center");
      expect(label.classes()).toContain("cursor-pointer");
    });

    it("applies base switch container classes", () => {
      wrapper = createWrapper();
      const container = wrapper.find(".relative.inline-flex.h-5.w-10");
      expect(container.exists()).toBe(true);
    });

    it("applies input classes", () => {
      wrapper = createWrapper();
      const input = wrapper.find("input");
      expect(input.classes()).toContain("sr-only");
      expect(input.classes()).toContain("peer");
    });

    it("applies background track classes", () => {
      wrapper = createWrapper();
      const track = wrapper.findAll("span")[0];
      expect(track.classes()).toContain("absolute");
      expect(track.classes()).toContain("inset-0");
      expect(track.classes()).toContain("mx-auto");
      expect(track.classes()).toContain("rounded-full");
      expect(track.classes()).toContain("transition-colors");
      expect(track.classes()).toContain("duration-300");
    });

    it("applies moving ball classes", () => {
      wrapper = createWrapper();
      const ball = wrapper.findAll("span")[1];
      expect(ball.classes()).toContain("absolute");
      expect(ball.classes()).toContain("mx-0.5");
      expect(ball.classes()).toContain("my-0.5");
      expect(ball.classes()).toContain("h-4");
      expect(ball.classes()).toContain("w-4");
      expect(ball.classes()).toContain("rounded-full");
      expect(ball.classes()).toContain("bg-white");
      expect(ball.classes()).toContain("transition-all");
      expect(ball.classes()).toContain("duration-300");
      expect(ball.classes()).toContain("z-10");
    });

    it("applies color classes correctly", () => {
      const colors = [
        "default", "primary", "info", "success", 
        "warning", "danger", "secondary", "dark", "gradient"
      ];
      
      colors.forEach((color) => {
        wrapper = createWrapper({ color });
        const track = wrapper.findAll("span")[0];
        if (color === "default") {
          expect(track.classes()).toContain("peer-checked:bg-gray-500");
        } else if (color === "primary") {
          expect(track.classes()).toContain("peer-checked:bg-primary");
        } else if (color === "info") {
          expect(track.classes()).toContain("peer-checked:bg-info");
        } else if (color === "success") {
          expect(track.classes()).toContain("peer-checked:bg-success");
        } else if (color === "warning") {
          expect(track.classes()).toContain("peer-checked:bg-warning");
        } else if (color === "danger") {
          expect(track.classes()).toContain("peer-checked:bg-danger");
        } else if (color === "secondary") {
          expect(track.classes()).toContain("peer-checked:bg-secondary");
        } else if (color === "dark") {
          expect(track.classes()).toContain("peer-checked:bg-dark");
        } else if (color === "gradient") {
          expect(track.classes()).toContain("peer-checked:bg-gradient");
        }
        expect(track.classes()).toContain("bg-gray-200");
        expect(track.classes()).toContain("dark:bg-gray-700");
      });
    });

    it("applies icon classes", () => {
      wrapper = createWrapper({ iconName: "IconCheck" });
      const icon = wrapper.findComponent(Icon);
      expect(icon.classes()).toContain("absolute");
      expect(icon.classes()).toContain("top-1/2");
      expect(icon.classes()).toContain("-translate-y-1/2");
      expect(icon.classes()).toContain("w-3");
      expect(icon.classes()).toContain("h-3");
      expect(icon.classes()).toContain("text-gray-400");
      expect(icon.classes()).toContain("peer-checked:text-white");
      expect(icon.classes()).toContain("transition-colors");
      expect(icon.classes()).toContain("duration-300");
    });
  });

  describe("v-model Integration", () => {
    it("binds modelValue to input checked state", () => {
      wrapper = createWrapper({ modelValue: true });
      expect(wrapper.find("input").element.checked).toBe(true);
    });

    it("updates modelValue when input changes", async () => {
      wrapper = createWrapper({ modelValue: false });
      const input = wrapper.find("input");
      await input.setChecked();
      expect(wrapper.emitted("update:modelValue")?.[0]).toEqual([true]);
    });

    it("toggles modelValue correctly", async () => {
      wrapper = createWrapper({ modelValue: true });
      const input = wrapper.find("input");
      await input.setChecked(false);
      expect(wrapper.emitted("update:modelValue")?.[0]).toEqual([false]);
    });
  });

  describe("Events", () => {
    it("emits update:modelValue when input changes", async () => {
      wrapper = createWrapper({ modelValue: false });
      const input = wrapper.find("input");
      await input.trigger("change");
      expect(wrapper.emitted("update:modelValue")).toBeTruthy();
      expect(wrapper.emitted("update:modelValue")?.[0]).toEqual([true]);
    });

    it("emits correct value when toggling from true to false", async () => {
      wrapper = createWrapper({ modelValue: true });
      const input = wrapper.find("input");
      await input.trigger("change");
      expect(wrapper.emitted("update:modelValue")?.[0]).toEqual([false]);
    });
  });

  describe("Accessibility", () => {
    it("has proper id attribute", () => {
      wrapper = createWrapper({ id: "custom-switch" });
      expect(wrapper.find("input").attributes("id")).toBe("custom-switch");
    });

    it("associates label with input using for attribute", () => {
      wrapper = createWrapper({ id: "custom-switch" });
      const label = wrapper.find("label");
      expect(label.attributes("for")).toBe("custom-switch");
    });

    it("has proper checkbox type", () => {
      wrapper = createWrapper();
      expect(wrapper.find("input").attributes("type")).toBe("checkbox");
    });
  });

  describe("Label and Sublabel", () => {
    it("renders label with proper styling", () => {
      wrapper = createWrapper({ label: "Test Label" });
      const labelSpan = wrapper.find("span.text-sm.font-medium");
      expect(labelSpan.text()).toBe("Test Label");
      expect(labelSpan.classes()).toContain("text-gray-800");
      expect(labelSpan.classes()).toContain("dark:text-gray-100");
    });

    it("renders sublabel with proper styling", () => {
      wrapper = createWrapper({ 
        label: "Test Label", 
        sublabel: "Test Sublabel" 
      });
      const sublabelSpan = wrapper.find("span.text-xs.text-gray-400");
      expect(sublabelSpan.text()).toBe("Test Sublabel");
      expect(sublabelSpan.classes()).toContain("text-gray-400");
      expect(sublabelSpan.classes()).toContain("dark:text-gray-500");
    });

    it("applies RTL margin classes to label container", () => {
      wrapper = createWrapper({ label: "Test Label" });
      const labelContainer = wrapper.find(".ltr\\:ml-3.rtl\\:mr-3");
      expect(labelContainer.exists()).toBe(true);
    });
  });

  describe("RTL Support", () => {
    it("applies RTL positioning to ball", () => {
      wrapper = createWrapper();
      const ball = wrapper.findAll("span")[1];
      expect(ball.classes()).toContain("ltr:left-0");
      expect(ball.classes()).toContain("rtl:right-0");
    });

    it("applies RTL translation to ball when checked", () => {
      wrapper = createWrapper();
      const ball = wrapper.findAll("span")[1];
      expect(ball.classes()).toContain("ltr:peer-checked:translate-x-5");
      expect(ball.classes()).toContain("rtl:peer-checked:-translate-x-5");
    });

    it("applies RTL positioning to icon", () => {
      wrapper = createWrapper({ iconName: "IconCheck" });
      const icon = wrapper.findComponent(Icon);
      expect(icon.classes()).toContain("ltr:left-1");
      expect(icon.classes()).toContain("rtl:right-1");
    });
  });

  describe("Focus States", () => {
    it("applies focus outline classes to track", () => {
      wrapper = createWrapper();
      const track = wrapper.findAll("span")[0];
      expect(track.classes()).toContain("peer-focus:outline-dashed");
      expect(track.classes()).toContain("peer-focus:outline-gray-300");
      expect(track.classes()).toContain("peer-focus:outline-offset-2");
      expect(track.classes()).toContain("dark:peer-focus:outline-gray-600");
    });
  });

  describe("Dark Theme Support", () => {
    it("applies dark theme classes to track", () => {
      wrapper = createWrapper();
      const track = wrapper.findAll("span")[0];
      expect(track.classes()).toContain("dark:bg-gray-700");
    });

    it("applies dark theme classes to ball shadow", () => {
      wrapper = createWrapper();
      const ball = wrapper.findAll("span")[1];
      expect(ball.classes()).toContain("shadow-gray-500");
      expect(ball.classes()).toContain("dark:shadow-gray-800/50");
    });

    it("applies dark theme classes to label", () => {
      wrapper = createWrapper({ label: "Test Label" });
      const labelSpan = wrapper.find("span.text-sm.font-medium");
      expect(labelSpan.classes()).toContain("dark:text-gray-100");
    });

    it("applies dark theme classes to sublabel", () => {
      wrapper = createWrapper({ 
        label: "Test Label", 
        sublabel: "Test Sublabel" 
      });
      const sublabelSpan = wrapper.find("span.text-xs.text-gray-400");
      expect(sublabelSpan.classes()).toContain("dark:text-gray-500");
    });
  });

  describe("Edge Cases", () => {
    it("handles empty label gracefully", () => {
      wrapper = createWrapper({ label: "" });
      expect(wrapper.find("input").exists()).toBe(true);
    });

    it("handles empty sublabel gracefully", () => {
      wrapper = createWrapper({ 
        label: "Test Label", 
        sublabel: "" 
      });
      expect(wrapper.find("input").exists()).toBe(true);
    });

    it("handles undefined props gracefully", () => {
      wrapper = createWrapper({});
      expect(wrapper.find("input").exists()).toBe(true);
    });

    it("handles invalid color gracefully", () => {
      wrapper = createWrapper({ color: "invalid" as any });
      const track = wrapper.findAll("span")[0];
      // Should fall back to primary color
      expect(track.classes()).toContain("peer-checked:bg-primary");
    });
  });

  describe("Default Values", () => {
    it("uses correct default values", () => {
      wrapper = createWrapper();
      expect(wrapper.props("modelValue")).toBe(false);
      expect(wrapper.props("label")).toBe("Test Label");
      expect(wrapper.props("sublabel")).toBe("Test Sublabel");
      expect(wrapper.props("color")).toBe("primary");
      expect(wrapper.props("iconName")).toBe("IconCheck");
    });
  });

  describe("Required Props", () => {
    it("requires id prop", () => {
      wrapper = createWrapper();
      expect(wrapper.props("id")).toBe("test-switch");
    });

    it("requires modelValue prop", () => {
      wrapper = createWrapper();
      expect(wrapper.props("modelValue")).toBe(false);
    });

    it("requires label prop", () => {
      wrapper = createWrapper();
      expect(wrapper.props("label")).toBe("Test Label");
    });

    it("requires sublabel prop", () => {
      wrapper = createWrapper();
      expect(wrapper.props("sublabel")).toBe("Test Sublabel");
    });
  });
});