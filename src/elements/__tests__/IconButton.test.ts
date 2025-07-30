import { describe, it, expect, vi } from "vitest";
import { mount, VueWrapper } from "@vue/test-utils";
import IconButton from "../IconButton.vue";
import Icon from "../../icon/Icon.vue";

describe("IconButton Component", () => {
  let wrapper: VueWrapper<any>;
  const createWrapper = (props = {}, slots = {}) => {
    return mount(IconButton, {
      props,
      slots,
      global: {
        provide: {
          cardDisabled: false,
        },
      },
    });
  };

  describe("Rendering", () => {
    it("renders component container", () => {
      wrapper = createWrapper();
      expect(wrapper.find("div").exists()).toBe(true);
    });

    it("renders icon when icon prop is provided", () => {
      wrapper = createWrapper({ icon: "IconSettings" });
      expect(wrapper.findComponent(Icon).exists()).toBe(true);
    });

    it("renders image when imgUrl prop is provided", () => {
      wrapper = createWrapper({ imgUrl: "test.jpg" });
      expect(wrapper.find("img").exists()).toBe(true);
      expect(wrapper.find("img").attributes("src")).toBe("test.jpg");
    });

    it("renders loading icon when isLoading is true", () => {
      wrapper = createWrapper({ isLoading: true });
      expect(wrapper.findComponent(Icon).exists()).toBe(true);
    });

    it("renders slot content when provided", () => {
      wrapper = createWrapper({}, {
        default: '<div data-test="slot-content">Custom Content</div>'
      });
      expect(wrapper.find('[data-test="slot-content"]').exists()).toBe(true);
    });

    it("prioritizes slot over icon prop", () => {
      wrapper = createWrapper({ icon: "IconSettings" }, {
        default: '<div data-test="slot-content">Custom Content</div>'
      });
      expect(wrapper.find('[data-test="slot-content"]').exists()).toBe(true);
      expect(wrapper.findComponent(Icon).exists()).toBe(false);
    });
  });

  describe("Props and Styling", () => {
    it("applies base container classes", () => {
      wrapper = createWrapper();
      const container = wrapper.find("div");
      expect(container.classes()).toContain("overflow-hidden");
      expect(container.classes()).toContain("w-fit");
      expect(container.classes()).toContain("select-none");
      expect(container.classes()).toContain("transition-all");
    });

    it("applies rounded classes based on rounded prop", () => {
      const roundedValues = ["full", "none", "xs", "sm", "md", "lg", "xl"];
      const expectedClasses = ["rounded-full", "rounded-none", "rounded-xs", "rounded-sm", "rounded-md", "rounded-lg", "rounded-xl"];

      roundedValues.forEach((rounded, index) => {
        wrapper = createWrapper({ rounded });
        expect(wrapper.classes()).toContain(expectedClasses[index]);
      });
    });

    it("applies size classes to icon", () => {
      const sizes = ["xs", "sm", "md", "lg", "xl"];
      const expectedClasses = ["w-4 h-4", "w-5 h-5", "w-7 h-7", "h-10 w-10", "h-14 w-14"];

      sizes.forEach((size, index) => {
        wrapper = createWrapper({ icon: "IconSettings", size });
        const icon = wrapper.findComponent(Icon);
        expect(icon.attributes("class")).toContain(expectedClasses[index]);
      });
    });

    it("applies padding when icon is provided", () => {
      wrapper = createWrapper({ icon: "IconSettings" });
      expect(wrapper.classes()).toContain("p-2");
    });

    it("does not apply padding when no icon is provided", () => {
      wrapper = createWrapper({ imgUrl: "test.jpg" });
      expect(wrapper.classes()).not.toContain("p-2");
    });
  });

  describe("State Styling", () => {
    it("applies disabled styling when disabled", () => {
      wrapper = createWrapper({ disabled: true });
      expect(wrapper.classes()).toContain("bg-gray-100");
      expect(wrapper.classes()).toContain("cursor-not-allowed");
      expect(wrapper.attributes("disabled")).toBe("true");
    });

    it("applies disabled styling when cardDisabled is true", () => {
      wrapper = mount(IconButton, {
        global: {
          provide: {
            cardDisabled: true,
          },
        },
      });
      expect(wrapper.classes()).toContain("bg-gray-100");
      expect(wrapper.classes()).toContain("cursor-not-allowed");
      expect(wrapper.attributes("disabled")).toBe("true");
    });

    it("applies loading styling when isLoading is true", () => {
      wrapper = createWrapper({ isLoading: true });
      expect(wrapper.classes()).toContain("bg-gray-100");
      expect(wrapper.classes()).toContain("cursor-not-allowed");
      expect(wrapper.attributes("disabled")).toBe("true");
    });

    it("applies enabled styling when not disabled", () => {
      wrapper = createWrapper();
      expect(wrapper.classes()).toContain("bg-white-light/40");
      expect(wrapper.classes()).toContain("hover:bg-white-light/90");
      expect(wrapper.classes()).toContain("hover:text-primary");
      expect(wrapper.classes()).toContain("hover:cursor-pointer");
      expect(wrapper.attributes("disabled")).toBe("false");
    });
  });

  describe("Events", () => {
    it("emits click event when clicked and not disabled", async () => {
      wrapper = createWrapper();
      await wrapper.trigger("click");
      expect(wrapper.emitted("click")).toBeTruthy();
    });

    it("does not emit click event when disabled", async () => {
      wrapper = createWrapper({ disabled: true });
      await wrapper.trigger("click");
      expect(wrapper.emitted("click")).toBeFalsy();
    });

    it("does not emit click event when cardDisabled is true", async () => {
      wrapper = mount(IconButton, {
        global: {
          provide: {
            cardDisabled: true,
          },
        },
      });
      await wrapper.trigger("click");
      expect(wrapper.emitted("click")).toBeFalsy();
    });

    it("does not emit click event when loading", async () => {
      wrapper = createWrapper({ isLoading: true });
      await wrapper.trigger("click");
      expect(wrapper.emitted("click")).toBeFalsy();
    });
  });

  describe("Loading State", () => {
    it("shows loading icon when isLoading is true", () => {
      wrapper = createWrapper({ isLoading: true });
      const icon = wrapper.findComponent(Icon);
      expect(icon.exists()).toBe(true);
      expect(icon.props("name")).toBe("IconLoader");
    });

    it("uses custom loading icon when provided", () => {
      wrapper = createWrapper({ isLoading: true, loadingIcon: "IconRefresh" });
      const icon = wrapper.findComponent(Icon);
      expect(icon.props("name")).toBe("IconRefresh");
    });

    it("applies animation class to loading icon", () => {
      wrapper = createWrapper({ isLoading: true });
      const icon = wrapper.findComponent(Icon);
      expect(icon.classes()).toContain("animate-[spin_2s_linear_infinite]");
    });
  });

  describe("Image Handling", () => {
    it("renders image with correct src", () => {
      wrapper = createWrapper({ imgUrl: "test-image.jpg" });
      const img = wrapper.find("img");
      expect(img.attributes("src")).toBe("test-image.jpg");
    });

    it("applies image styling classes", () => {
      wrapper = createWrapper({ imgUrl: "test.jpg" });
      const img = wrapper.find("img");
      expect(img.classes()).toContain("hover:opacity-80");
      expect(img.classes()).toContain("transition-opacity");
    });

    it("prioritizes icon over imgUrl when both are provided", () => {
      wrapper = createWrapper({ icon: "IconSettings", imgUrl: "test.jpg" });
      expect(wrapper.findComponent(Icon).exists()).toBe(true);
      expect(wrapper.find("img").exists()).toBe(false);
    });
  });

  describe("Dark Mode Support", () => {
    it("applies dark mode classes", () => {
      wrapper = createWrapper();
      expect(wrapper.classes()).toContain("dark:bg-dark/40");
      expect(wrapper.classes()).toContain("dark:hover:bg-dark/60");
      expect(wrapper.classes()).toContain("dark:hover:text-primary");
      expect(wrapper.classes()).toContain("dark:text-[#d0d2d6]");
    });
  });

  describe("Accessibility", () => {
    it("has disabled attribute when disabled", () => {
      wrapper = createWrapper({ disabled: true });
      expect(wrapper.attributes("disabled")).toBe("true");
    });

    it("has disabled attribute when cardDisabled is true", () => {
      wrapper = mount(IconButton, {
        global: {
          provide: {
            cardDisabled: true,
          },
        },
      });
      expect(wrapper.attributes("disabled")).toBe("true");
    });

    it("has disabled attribute when loading", () => {
      wrapper = createWrapper({ isLoading: true });
      expect(wrapper.attributes("disabled")).toBe("true");
    });

    it("does not have disabled attribute when enabled", () => {
      wrapper = createWrapper();
      expect(wrapper.attributes("disabled")).toBe("false");
    });
  });

  describe("Edge Cases", () => {
    it("handles empty imgUrl", () => {
      wrapper = createWrapper({ imgUrl: "" });
      expect(wrapper.find("img").exists()).toBe(true);
      expect(wrapper.find("img").attributes("src")).toBe("");
    });

    it("handles both icon and imgUrl props", () => {
      wrapper = createWrapper({ 
        icon: "IconSettings", 
        imgUrl: "test.jpg" 
      });
      // Should prioritize icon over imgUrl
      expect(wrapper.findComponent(Icon).exists()).toBe(true);
      expect(wrapper.find("img").exists()).toBe(false);
    });

    it("handles invalid size gracefully", () => {
      wrapper = createWrapper({ icon: "IconSettings", size: "invalid" as any });
      // Should fall back to default size (lg)
      const icon = wrapper.findComponent(Icon);
      expect(icon.attributes("class")).toContain("h-10");
      expect(icon.attributes("class")).toContain("w-10");
    });

    it("handles invalid rounded gracefully", () => {
      wrapper = createWrapper({ rounded: "invalid" as any });
      // Should not apply any rounded class
      expect(wrapper.classes()).not.toContain("rounded-");
    });
  });

  describe("Default Values", () => {
    it("uses correct default values", () => {
      wrapper = createWrapper();
      expect(wrapper.props("rounded")).toBe("full");
      expect(wrapper.props("isLoading")).toBe(false);
      expect(wrapper.props("loadingIcon")).toBe("IconLoader");
    });
  });

  describe("Computed Properties", () => {
    it("computes rounded class correctly", () => {
      wrapper = createWrapper({ rounded: "lg" });
      expect(wrapper.classes()).toContain("rounded-lg");
    });

    it("computes size class correctly", () => {
      wrapper = createWrapper({ icon: "IconSettings", size: "md" });
      const icon = wrapper.findComponent(Icon);
      expect(icon.classes()).toContain("w-7");
      expect(icon.classes()).toContain("h-7");
    });
  });

  describe("Integration with Icon Component", () => {
    it("passes correct props to Icon component", () => {
      wrapper = createWrapper({ icon: "IconSettings" });
      const icon = wrapper.findComponent(Icon);
      expect(icon.props("name")).toBe("IconSettings");
    });

    it("applies correct classes to Icon component", () => {
      wrapper = createWrapper({ icon: "IconSettings", size: "lg" });
      const icon = wrapper.findComponent(Icon);
      expect(icon.classes()).toContain("h-10");
      expect(icon.classes()).toContain("w-10");
    });
  });
});