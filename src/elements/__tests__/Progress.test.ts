import { describe, it, expect, vi } from "vitest";
import { mount, VueWrapper } from "@vue/test-utils";
import Progress from "../Progress.vue";

describe("Progress Component", () => {
  let wrapper: VueWrapper<any>;

  // Helper function to create wrapper with default props
  const createWrapper = (props = {}) => {
    return mount(Progress, {
      props,
    });
  };

  describe("Rendering", () => {
    it("renders progress container", () => {
      wrapper = createWrapper();
      expect(wrapper.find("div[role='progressbar']").exists()).toBe(true);
    });

    it("renders progress bar", () => {
      wrapper = createWrapper();
      expect(wrapper.find(".progress-bar").exists()).toBe(true);
    });

    it("renders label when showLabel is true", () => {
      wrapper = createWrapper({ showLabel: true });
      expect(wrapper.find("span").exists()).toBe(true);
      expect(wrapper.text()).toContain("50%");
    });

    it("renders custom label when provided", () => {
      wrapper = createWrapper({ 
        showLabel: true, 
        label: "Loading..." 
      });
      expect(wrapper.text()).toContain("Loading...");
    });

    it("does not render label when showLabel is false", () => {
      wrapper = createWrapper({ showLabel: false });
      expect(wrapper.find("span").exists()).toBe(false);
    });
  });

  describe("Props and Styling", () => {
    it("applies base wrapper classes", () => {
      wrapper = createWrapper();
      const container = wrapper.find("div[role='progressbar']");
      expect(container.classes()).toContain("w-full");
      expect(container.classes()).toContain("bg-gray-200");
      expect(container.classes()).toContain("dark:bg-gray-700");
      expect(container.classes()).toContain("relative");
      expect(container.classes()).toContain("overflow-hidden");
    });

    it("applies base progress bar classes", () => {
      wrapper = createWrapper();
      const progressBar = wrapper.find(".progress-bar");
      expect(progressBar.classes()).toContain("transition-all");
      expect(progressBar.classes()).toContain("duration-300");
      expect(progressBar.classes()).toContain("flex");
      expect(progressBar.classes()).toContain("items-center");
      expect(progressBar.classes()).toContain("justify-center");
      expect(progressBar.classes()).toContain("ltr:origin-left");
      expect(progressBar.classes()).toContain("rtl:origin-right");
    });

    it("applies color classes correctly", () => {
      const colors = [
        "primary", "info", "success", "warning", 
        "danger", "secondary", "dark", "gradient"
      ];
      
      colors.forEach((color) => {
        wrapper = createWrapper({ color });
        const progressBar = wrapper.find(".progress-bar");
        if (color === "primary") {
          expect(progressBar.classes()).toContain("bg-blue-600");
          expect(progressBar.classes()).toContain("dark:bg-blue-500");
        } else if (color === "info") {
          expect(progressBar.classes()).toContain("bg-blue-300");
          expect(progressBar.classes()).toContain("dark:bg-blue-200");
        } else if (color === "success") {
          expect(progressBar.classes()).toContain("bg-green-600");
          expect(progressBar.classes()).toContain("dark:bg-green-500");
        } else if (color === "warning") {
          expect(progressBar.classes()).toContain("bg-yellow-600");
          expect(progressBar.classes()).toContain("dark:bg-yellow-500");
        } else if (color === "danger") {
          expect(progressBar.classes()).toContain("bg-red-600");
          expect(progressBar.classes()).toContain("dark:bg-red-500");
        } else if (color === "secondary" || color === "dark") {
          expect(progressBar.classes()).toContain("bg-gray-600");
          expect(progressBar.classes()).toContain("dark:bg-gray-500");
        } else if (color === "gradient") {
          expect(progressBar.classes()).toContain("bg-gradient");
        }
      });
    });

    it("applies size classes correctly", () => {
      const sizes = ["default", "sm", "md", "lg", "xl"];
      const expectedClasses = ["h-4", "h-1", "h-2.5", "h-5", "h-6"];

      sizes.forEach((size, index) => {
        wrapper = createWrapper({ size });
        const container = wrapper.find("div[role='progressbar']");
        const progressBar = wrapper.find(".progress-bar");
        expect(container.classes()).toContain(expectedClasses[index]);
        expect(progressBar.classes()).toContain(expectedClasses[index]);
      });
    });

    it("applies rounded classes when rounded is true", () => {
      wrapper = createWrapper({ rounded: true });
      const container = wrapper.find("div[role='progressbar']");
      const progressBar = wrapper.find(".progress-bar");
      expect(container.classes()).toContain("rounded-full");
      expect(progressBar.classes()).toContain("rounded-full");
    });

    it("does not apply rounded classes when rounded is false", () => {
      wrapper = createWrapper({ rounded: false });
      const container = wrapper.find("div[role='progressbar']");
      const progressBar = wrapper.find(".progress-bar");
      expect(container.classes()).not.toContain("rounded-full");
      expect(progressBar.classes()).not.toContain("rounded-full");
    });

    it("applies striped class when striped is true", () => {
      wrapper = createWrapper({ striped: true });
      expect(wrapper.find(".progress-bar").classes()).toContain("striped-bar");
    });

    it("applies animated class when animated is true", () => {
      wrapper = createWrapper({ animated: true });
      expect(wrapper.find(".progress-bar").classes()).toContain("animated-progress");
    });

    it("applies custom wrapper classes", () => {
      wrapper = createWrapper({ 
        classes: { wrapper: "custom-wrapper-class" } 
      });
      const container = wrapper.find("div[role='progressbar']");
      expect(container.classes()).toContain("custom-wrapper-class");
    });

    it("applies custom progress classes", () => {
      wrapper = createWrapper({ 
        classes: { progress: "custom-progress-class" } 
      });
      const progressBar = wrapper.find(".progress-bar");
      expect(progressBar.classes()).toContain("custom-progress-class");
    });
  });

  describe("Progress Calculation", () => {
    it("calculates correct percentage for default values", () => {
      wrapper = createWrapper({ value: 50, max: 100 });
      const progressBar = wrapper.find(".progress-bar");
      expect(progressBar.attributes("style")).toContain("width: 50%");
    });

    it("calculates correct percentage for custom values", () => {
      wrapper = createWrapper({ value: 75, max: 150 });
      const progressBar = wrapper.find(".progress-bar");
      expect(progressBar.attributes("style")).toContain("width: 50%");
    });

    it("handles zero max value", () => {
      wrapper = createWrapper({ value: 50, max: 0 });
      const progressBar = wrapper.find(".progress-bar");
      expect(progressBar.attributes("style")).toContain("width: 0%");
    });

    it("handles negative value", () => {
      wrapper = createWrapper({ value: -10, max: 100 });
      const progressBar = wrapper.find(".progress-bar");
      expect(progressBar.attributes("style")).toContain("width: 0%");
    });

    it("handles value greater than max", () => {
      wrapper = createWrapper({ value: 150, max: 100 });
      const progressBar = wrapper.find(".progress-bar");
      expect(progressBar.attributes("style")).toContain("width: 100%");
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

  describe("Indeterminate State", () => {
    it("sets width to 100% when value is not a number", () => {
      wrapper = createWrapper({ value: "indeterminate" as any });
      const progressBar = wrapper.find(".progress-bar");
      expect(progressBar.attributes("style")).toContain("width: 100%");
    });

    it("applies indeterminate animation class", () => {
      wrapper = createWrapper({ value: "indeterminate" as any });
      expect(wrapper.find(".progress-bar").classes()).toContain("animate-progress-indeterminate");
    });

    it("does not apply indeterminate animation when value is numeric", () => {
      wrapper = createWrapper({ value: 50 });
      expect(wrapper.find(".progress-bar").classes()).not.toContain("animate-progress-indeterminate");
    });
  });

  describe("Accessibility", () => {
    it("has proper ARIA attributes", () => {
      wrapper = createWrapper({ value: 50, max: 100 });
      const container = wrapper.find("div[role='progressbar']");
      expect(container.attributes("role")).toBe("progressbar");
      expect(container.attributes("aria-valuenow")).toBe("50");
      expect(container.attributes("aria-valuemin")).toBe("0");
      expect(container.attributes("aria-valuemax")).toBe("100");
    });

    it("updates aria-valuenow when value changes", () => {
      wrapper = createWrapper({ value: 25, max: 100 });
      expect(wrapper.find("div[role='progressbar']").attributes("aria-valuenow")).toBe("25");
    });

    it("handles aria-valuenow for non-numeric values", () => {
      wrapper = createWrapper({ value: "indeterminate" as any, max: 100 });
      expect(wrapper.find("div[role='progressbar']").attributes("aria-valuenow")).toBe("0");
    });
  });

  describe("Label Display", () => {
    it("shows percentage when no custom label is provided", () => {
      wrapper = createWrapper({ showLabel: true, value: 75 });
      expect(wrapper.text()).toContain("75%");
    });

    it("shows custom label when provided", () => {
      wrapper = createWrapper({ 
        showLabel: true, 
        value: 75, 
        label: "Processing..." 
      });
      expect(wrapper.text()).toContain("Processing...");
    });

    it("applies label styling", () => {
      wrapper = createWrapper({ showLabel: true });
      const label = wrapper.find("span");
      expect(label.classes()).toContain("text-xs");
      expect(label.classes()).toContain("text-white");
      expect(label.classes()).toContain("transition-opacity");
      expect(label.classes()).toContain("duration-200");
    });
  });

  describe("Interactive States", () => {
    it("applies hover effects", () => {
      wrapper = createWrapper();
      const progressBar = wrapper.find(".progress-bar");
      expect(progressBar.classes()).toContain("hover:brightness-110");
    });

    it("applies active effects", () => {
      wrapper = createWrapper();
      const progressBar = wrapper.find(".progress-bar");
      expect(progressBar.classes()).toContain("active:brightness-90");
    });
  });

  describe("Edge Cases", () => {
    it("handles undefined props gracefully", () => {
      wrapper = createWrapper({});
      expect(wrapper.find("div[role='progressbar']").exists()).toBe(true);
    });

    it("handles empty custom classes", () => {
      wrapper = createWrapper({ classes: {} });
      expect(wrapper.find("div[role='progressbar']").exists()).toBe(true);
    });

    it("handles array custom classes", () => {
      wrapper = createWrapper({ 
        classes: { 
          wrapper: ["class1", "class2"],
          progress: ["class3", "class4"]
        } 
      });
      const container = wrapper.find("div[role='progressbar']");
      const progressBar = wrapper.find(".progress-bar");
      expect(container.classes()).toContain("class1");
      expect(container.classes()).toContain("class2");
      expect(progressBar.classes()).toContain("class3");
      expect(progressBar.classes()).toContain("class4");
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

  describe("RTL Support", () => {
    it("applies RTL origin classes", () => {
      wrapper = createWrapper();
      const progressBar = wrapper.find(".progress-bar");
      expect(progressBar.classes()).toContain("ltr:origin-left");
      expect(progressBar.classes()).toContain("rtl:origin-right");
    });
  });

  describe("Dark Theme Support", () => {
    it("applies dark theme classes to wrapper", () => {
      wrapper = createWrapper();
      const container = wrapper.find("div[role='progressbar']");
      expect(container.classes()).toContain("dark:bg-gray-700");
    });

    it("applies dark theme classes to progress bar", () => {
      wrapper = createWrapper({ color: "primary" });
      const progressBar = wrapper.find(".progress-bar");
      expect(progressBar.classes()).toContain("dark:bg-blue-500");
    });
  });
});