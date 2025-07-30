import { describe, it, expect, vi } from "vitest";
import { mount, VueWrapper } from "@vue/test-utils";
import Progress from "../Progress.vue";

describe("Progress Component", () => {
  let wrapper: VueWrapper<any>;
  const createWrapper = (props = {}) => {
    return mount(Progress, {
      props,
    });
  };

  describe("Rendering", () => {
    it("renders progress container", () => {
      wrapper = createWrapper();
      expect(wrapper.find('[role="progressbar"]').exists()).toBe(true);
    });

    it("renders progress bar", () => {
      wrapper = createWrapper();
      expect(wrapper.find(".progress-bar").exists()).toBe(true);
    });

    it("renders label when showLabel is true", () => {
      wrapper = createWrapper({ showLabel: true });
      expect(wrapper.find("span").exists()).toBe(true);
    });

    it("does not render label when showLabel is false", () => {
      wrapper = createWrapper({ showLabel: false });
      expect(wrapper.find("span").exists()).toBe(false);
    });
  });

  describe("Props and Styling", () => {
    it("applies base container classes", () => {
      wrapper = createWrapper();
      const container = wrapper.find('[role="progressbar"]');
      expect(container.classes()).toContain("w-full");
      expect(container.classes()).toContain("bg-gray-200");
      expect(container.classes()).toContain("dark:bg-gray-700");
      expect(container.classes()).toContain("relative");
      expect(container.classes()).toContain("overflow-hidden");
    });

    it("applies progress bar classes", () => {
      wrapper = createWrapper();
      const progressBar = wrapper.find(".progress-bar");
      expect(progressBar.classes()).toContain("transition-all");
      expect(progressBar.classes()).toContain("duration-300");
      expect(progressBar.classes()).toContain("flex");
      expect(progressBar.classes()).toContain("items-center");
      expect(progressBar.classes()).toContain("justify-center");
    });

    it("applies size classes", () => {
      const sizes = ["default", "sm", "md", "lg", "xl"];
      const expectedClasses = ["h-4", "h-1", "h-2.5", "h-5", "h-6"];

      sizes.forEach((size, index) => {
        wrapper = createWrapper({ size });
        const container = wrapper.find('[role="progressbar"]');
        expect(container.classes()).toContain(expectedClasses[index]);
      });
    });

    it("applies rounded classes when rounded is true", () => {
      wrapper = createWrapper({ rounded: true });
      const container = wrapper.find('[role="progressbar"]');
      const progressBar = wrapper.find(".progress-bar");
      expect(container.classes()).toContain("rounded-full");
      expect(progressBar.classes()).toContain("rounded-full");
    });

    it("does not apply rounded classes when rounded is false", () => {
      wrapper = createWrapper({ rounded: false });
      const container = wrapper.find('[role="progressbar"]');
      const progressBar = wrapper.find(".progress-bar");
      expect(container.classes()).not.toContain("rounded-full");
      expect(progressBar.classes()).not.toContain("rounded-full");
    });
  });

  describe("Color Variants", () => {
    it("applies primary color classes", () => {
      wrapper = createWrapper({ color: "primary" });
      const progressBar = wrapper.find(".progress-bar");
      expect(progressBar.classes()).toContain("bg-blue-600");
      expect(progressBar.classes()).toContain("dark:bg-blue-500");
    });

    it("applies success color classes", () => {
      wrapper = createWrapper({ color: "success" });
      const progressBar = wrapper.find(".progress-bar");
      expect(progressBar.classes()).toContain("bg-green-600");
      expect(progressBar.classes()).toContain("dark:bg-green-500");
    });

    it("applies warning color classes", () => {
      wrapper = createWrapper({ color: "warning" });
      const progressBar = wrapper.find(".progress-bar");
      expect(progressBar.classes()).toContain("bg-yellow-600");
      expect(progressBar.classes()).toContain("dark:bg-yellow-500");
    });

    it("applies danger color classes", () => {
      wrapper = createWrapper({ color: "danger" });
      const progressBar = wrapper.find(".progress-bar");
      expect(progressBar.classes()).toContain("bg-red-600");
      expect(progressBar.classes()).toContain("dark:bg-red-500");
    });

    it("applies info color classes", () => {
      wrapper = createWrapper({ color: "info" });
      const progressBar = wrapper.find(".progress-bar");
      expect(progressBar.classes()).toContain("bg-blue-300");
      expect(progressBar.classes()).toContain("dark:bg-blue-200");
    });

    it("applies secondary color classes", () => {
      wrapper = createWrapper({ color: "secondary" });
      const progressBar = wrapper.find(".progress-bar");
      expect(progressBar.classes()).toContain("bg-gray-600");
      expect(progressBar.classes()).toContain("dark:bg-gray-500");
    });

    it("applies dark color classes", () => {
      wrapper = createWrapper({ color: "dark" });
      const progressBar = wrapper.find(".progress-bar");
      expect(progressBar.classes()).toContain("bg-gray-600");
      expect(progressBar.classes()).toContain("dark:bg-gray-500");
    });

    it("applies gradient color classes", () => {
      wrapper = createWrapper({ color: "gradient" });
      const progressBar = wrapper.find(".progress-bar");
      expect(progressBar.classes()).toContain("bg-gradient");
    });
  });

  describe("Progress Calculation", () => {
    it("calculates correct percentage for 50% progress", () => {
      wrapper = createWrapper({ value: 50, max: 100 });
      const progressBar = wrapper.find(".progress-bar");
      expect(progressBar.attributes("style")).toContain("width: 50%");
    });

    it("calculates correct percentage for 25% progress", () => {
      wrapper = createWrapper({ value: 25, max: 100 });
      const progressBar = wrapper.find(".progress-bar");
      expect(progressBar.attributes("style")).toContain("width: 25%");
    });

    it("calculates correct percentage for 100% progress", () => {
      wrapper = createWrapper({ value: 100, max: 100 });
      const progressBar = wrapper.find(".progress-bar");
      expect(progressBar.attributes("style")).toContain("width: 100%");
    });

    it("calculates correct percentage for 0% progress", () => {
      wrapper = createWrapper({ value: 0, max: 100 });
      const progressBar = wrapper.find(".progress-bar");
      expect(progressBar.attributes("style")).toContain("width: 0%");
    });

    it("handles custom max value", () => {
      wrapper = createWrapper({ value: 5, max: 10 });
      const progressBar = wrapper.find(".progress-bar");
      expect(progressBar.attributes("style")).toContain("width: 50%");
    });

    it("clamps value to 100% when exceeding max", () => {
      wrapper = createWrapper({ value: 150, max: 100 });
      const progressBar = wrapper.find(".progress-bar");
      expect(progressBar.attributes("style")).toContain("width: 100%");
    });

    it("clamps value to 0% when negative", () => {
      wrapper = createWrapper({ value: -10, max: 100 });
      const progressBar = wrapper.find(".progress-bar");
      expect(progressBar.attributes("style")).toContain("width: 0%");
    });

    it("handles zero max value", () => {
      wrapper = createWrapper({ value: 50, max: 0 });
      const progressBar = wrapper.find(".progress-bar");
      expect(progressBar.attributes("style")).toContain("width: 0%");
    });

    it("handles non-numeric value", () => {
      wrapper = createWrapper({ value: "invalid" as any, max: 100 });
      const progressBar = wrapper.find(".progress-bar");
      expect(progressBar.attributes("style")).toContain("width: 0%");
    });

    it("handles string numeric value", () => {
      wrapper = createWrapper({ value: "75" as any, max: 100 });
      const progressBar = wrapper.find(".progress-bar");
      expect(progressBar.attributes("style")).toContain("width: 75%");
    });
  });

  describe("Label Display", () => {
    it("shows percentage when showLabel is true and no custom label", () => {
      wrapper = createWrapper({ showLabel: true, value: 50 });
      const label = wrapper.find("span");
      expect(label.text()).toBe("50%");
    });

    it("shows custom label when provided", () => {
      wrapper = createWrapper({ showLabel: true, label: "Custom Label" });
      const label = wrapper.find("span");
      expect(label.text()).toBe("Custom Label");
    });

    it("applies label styling classes", () => {
      wrapper = createWrapper({ showLabel: true });
      const label = wrapper.find("span");
      expect(label.classes()).toContain("text-xs");
      expect(label.classes()).toContain("text-white");
      expect(label.classes()).toContain("transition-opacity");
      expect(label.classes()).toContain("duration-200");
    });
  });

  describe("Indeterminate Progress", () => {
    it("shows indeterminate animation when value is not a number", () => {
      wrapper = createWrapper({ value: null as any });
      const progressBar = wrapper.find(".progress-bar");
      expect(progressBar.classes()).toContain("animate-progress-indeterminate");
      expect(progressBar.attributes("style")).toContain("width: 100%");
    });

    it("shows indeterminate animation when value is null", () => {
      wrapper = createWrapper({ value: null as any });
      const progressBar = wrapper.find(".progress-bar");
      expect(progressBar.classes()).toContain("animate-progress-indeterminate");
      expect(progressBar.attributes("style")).toContain("width: 100%");
    });
  });

  describe("Striped and Animated", () => {
    it("applies striped classes when striped is true", () => {
      wrapper = createWrapper({ striped: true });
      const progressBar = wrapper.find(".progress-bar");
      expect(progressBar.classes()).toContain("striped-bar");
    });

    it("applies animated classes when animated is true", () => {
      wrapper = createWrapper({ animated: true });
      const progressBar = wrapper.find(".progress-bar");
      expect(progressBar.classes()).toContain("animated-progress");
    });
  });

  describe("Custom Classes", () => {
    it("applies custom wrapper classes", () => {
      wrapper = createWrapper({
        classes: { wrapper: "custom-wrapper-class" },
      });
      const container = wrapper.find('[role="progressbar"]');
      expect(container.classes()).toContain("custom-wrapper-class");
    });

    it("applies custom progress classes", () => {
      wrapper = createWrapper({
        classes: { progress: "custom-progress-class" },
      });
      const progressBar = wrapper.find(".progress-bar");
      expect(progressBar.classes()).toContain("custom-progress-class");
    });

    it("applies multiple custom wrapper classes", () => {
      wrapper = createWrapper({
        classes: { wrapper: ["class1", "class2"] },
      });
      const container = wrapper.find('[role="progressbar"]');
      expect(container.classes()).toContain("class1");
      expect(container.classes()).toContain("class2");
    });

    it("applies multiple custom progress classes", () => {
      wrapper = createWrapper({
        classes: { progress: ["class1", "class2"] },
      });
      const progressBar = wrapper.find(".progress-bar");
      expect(progressBar.classes()).toContain("class1");
      expect(progressBar.classes()).toContain("class2");
    });
  });

  describe("Accessibility", () => {
    it("has proper ARIA attributes", () => {
      wrapper = createWrapper({ value: 50, max: 100 });
      const container = wrapper.find('[role="progressbar"]');
      expect(container.attributes("role")).toBe("progressbar");
      expect(container.attributes("aria-valuenow")).toBe("50");
      expect(container.attributes("aria-valuemin")).toBe("0");
      expect(container.attributes("aria-valuemax")).toBe("100");
    });

    it("updates ARIA attributes when value changes", async () => {
      wrapper = createWrapper({ value: 25, max: 100 });
      await wrapper.setProps({ value: 75 });
      const container = wrapper.find('[role="progressbar"]');
      expect(container.attributes("aria-valuenow")).toBe("75");
    });
  });

  describe("RTL Support", () => {
    it("applies RTL origin classes", () => {
      wrapper = createWrapper();
      const progressBar = wrapper.find(".progress-bar");
      expect(progressBar.classes()).toContain("ltr:origin-left");
      expect(progressBar.classes()).toContain("rtl:origin-right");
    });
  });

  describe("Default Values", () => {
    it("uses correct default values", () => {
      wrapper = createWrapper();
      expect(wrapper.props("value")).toBe(50);
      expect(wrapper.props("max")).toBe(100);
      expect(wrapper.props("color")).toBe("primary");
      expect(wrapper.props("size")).toBe("default");
      expect(wrapper.props("rounded")).toBe(true);
      expect(wrapper.props("striped")).toBe(false);
      expect(wrapper.props("animated")).toBe(false);
      expect(wrapper.props("showLabel")).toBe(false);
      expect(wrapper.props("label")).toBe("");
    });
  });

  describe("Edge Cases", () => {
    it("handles very large values", () => {
      wrapper = createWrapper({ value: 999999, max: 100 });
      const progressBar = wrapper.find(".progress-bar");
      expect(progressBar.attributes("style")).toContain("width: 100%");
    });

    it("handles very small values", () => {
      wrapper = createWrapper({ value: 0.001, max: 100 });
      const progressBar = wrapper.find(".progress-bar");
      expect(progressBar.attributes("style")).toContain("width: 0.001%");
    });

    it("handles negative max value", () => {
      wrapper = createWrapper({ value: 50, max: -100 });
      const progressBar = wrapper.find(".progress-bar");
      expect(progressBar.attributes("style")).toContain("width: 0%");
    });
  });
});