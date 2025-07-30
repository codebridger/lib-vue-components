import { describe, it, expect, vi } from "vitest";
import { mount, VueWrapper } from "@vue/test-utils";
import IconButton from "../IconButton.vue";
import Icon from "../../icon/Icon.vue";

describe("IconButton Component", () => {
  let wrapper: VueWrapper<any>;

  // Helper function to create wrapper with default props
  const createWrapper = (props = {}) => {
    return mount(IconButton, {
      props,
      global: {
        components: {
          Icon,
        },
      },
    });
  };

  describe("Rendering", () => {
    it("renders icon button container", () => {
      wrapper = createWrapper();
      expect(wrapper.find("div").exists()).toBe(true);
    });

    it("renders icon when icon prop is provided", () => {
      wrapper = createWrapper({ icon: "IconSettings" });
      expect(wrapper.findComponent(Icon).exists()).toBe(true);
      expect(wrapper.findComponent(Icon).props("name")).toBe("IconSettings");
    });

    it("renders image when imgUrl prop is provided", () => {
      wrapper = createWrapper({ imgUrl: "test.jpg" });
      expect(wrapper.find("img").exists()).toBe(true);
      expect(wrapper.find("img").attributes("src")).toBe("test.jpg");
    });

    it("renders loading icon when isLoading is true", () => {
      wrapper = createWrapper({ isLoading: true });
      expect(wrapper.findComponent(Icon).exists()).toBe(true);
      expect(wrapper.findComponent(Icon).props("name")).toBe("IconLoader");
    });

    it("renders custom loading icon", () => {
      wrapper = createWrapper({ 
        isLoading: true, 
        loadingIcon: "IconRefresh" 
      });
      expect(wrapper.findComponent(Icon).props("name")).toBe("IconRefresh");
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
    it("applies base classes", () => {
      wrapper = createWrapper();
      expect(wrapper.classes()).toContain("overflow-hidden");
      expect(wrapper.classes()).toContain("w-fit");
      expect(wrapper.classes()).toContain("select-none");
      expect(wrapper.classes()).toContain("transition-all");
      expect(wrapper.classes()).toContain("flex");
      expect(wrapper.classes()).toContain("items-center");
      expect(wrapper.classes()).toContain("justify-center");
    });

    it("applies padding when icon is provided", () => {
      wrapper = createWrapper({ icon: "IconSettings" });
      expect(wrapper.classes()).toContain("p-2");
    });

    it("applies rounded classes correctly", () => {
      const roundedOptions = ["full", "none", "xs", "sm", "md", "lg", "xl"];
      
      roundedOptions.forEach((rounded) => {
        wrapper = createWrapper({ rounded });
        expect(wrapper.classes()).toContain(`rounded-${rounded}`);
      });
    });

    it("applies size classes to icon", () => {
      const sizes = ["xs", "sm", "md", "lg", "xl"];
      const expectedClasses = [
        "w-4 h-4", "w-5 h-5", "w-7 h-7", "h-10 w-10", "h-14 w-14"
      ];

      sizes.forEach((size, index) => {
        wrapper = createWrapper({ icon: "IconSettings", size });
        const icon = wrapper.findComponent(Icon);
        expect(icon.classes()).toContain(expectedClasses[index]);
      });
    });

    it("applies size classes to image", () => {
      wrapper = createWrapper({ imgUrl: "test.jpg", size: "md" });
      const img = wrapper.find("img");
      expect(img.classes()).toContain("w-7");
      expect(img.classes()).toContain("h-7");
    });

    it("applies size classes to loading icon", () => {
      wrapper = createWrapper({ isLoading: true, size: "lg" });
      const icon = wrapper.findComponent(Icon);
      expect(icon.classes()).toContain("h-10");
      expect(icon.classes()).toContain("w-10");
    });

    it("uses lg as default size", () => {
      wrapper = createWrapper({ icon: "IconSettings" });
      const icon = wrapper.findComponent(Icon);
      expect(icon.classes()).toContain("h-10");
      expect(icon.classes()).toContain("w-10");
    });
  });

  describe("State Styling", () => {
    it("applies disabled styling when disabled", () => {
      wrapper = createWrapper({ disabled: true });
      expect(wrapper.classes()).toContain("bg-gray-100");
      expect(wrapper.classes()).toContain("cursor-not-allowed");
      expect(wrapper.attributes("disabled")).toBeDefined();
    });

    it("applies disabled styling when cardDisabled is injected", () => {
      wrapper = mount(IconButton, {
        props: {},
        global: {
          components: { Icon },
          provide: {
            cardDisabled: true,
          },
        },
      });
      expect(wrapper.classes()).toContain("bg-gray-100");
      expect(wrapper.classes()).toContain("cursor-not-allowed");
      expect(wrapper.attributes("disabled")).toBeDefined();
    });

    it("applies disabled styling when loading", () => {
      wrapper = createWrapper({ isLoading: true });
      expect(wrapper.classes()).toContain("bg-gray-100");
      expect(wrapper.classes()).toContain("cursor-not-allowed");
      expect(wrapper.attributes("disabled")).toBeDefined();
    });

    it("applies enabled styling when not disabled", () => {
      wrapper = createWrapper();
      expect(wrapper.classes()).toContain("bg-white-light/40");
      expect(wrapper.classes()).toContain("hover:bg-white-light/90");
      expect(wrapper.classes()).toContain("hover:text-primary");
      expect(wrapper.classes()).toContain("hover:cursor-pointer");
      expect(wrapper.attributes("disabled")).toBeUndefined();
    });

    it("applies dark theme classes", () => {
      wrapper = createWrapper();
      expect(wrapper.classes()).toContain("dark:bg-dark/40");
      expect(wrapper.classes()).toContain("dark:hover:bg-dark/60");
      expect(wrapper.classes()).toContain("dark:hover:text-primary");
      expect(wrapper.classes()).toContain("dark:text-[#d0d2d6]");
    });
  });

  describe("Loading State", () => {
    it("shows loading icon with animation", () => {
      wrapper = createWrapper({ isLoading: true });
      const icon = wrapper.findComponent(Icon);
      expect(icon.classes()).toContain("animate-[spin_2s_linear_infinite]");
    });

    it("uses default loading icon", () => {
      wrapper = createWrapper({ isLoading: true });
      expect(wrapper.findComponent(Icon).props("name")).toBe("IconLoader");
    });

    it("uses custom loading icon", () => {
      wrapper = createWrapper({ 
        isLoading: true, 
        loadingIcon: "IconRefresh" 
      });
      expect(wrapper.findComponent(Icon).props("name")).toBe("IconRefresh");
    });

    it("prioritizes loading over regular icon", () => {
      wrapper = createWrapper({ 
        isLoading: true, 
        icon: "IconSettings" 
      });
      const icons = wrapper.findAllComponents(Icon);
      expect(icons).toHaveLength(1);
      expect(icons[0].props("name")).toBe("IconLoader");
    });

    it("prioritizes loading over image", () => {
      wrapper = createWrapper({ 
        isLoading: true, 
        imgUrl: "test.jpg" 
      });
      expect(wrapper.findComponent(Icon).exists()).toBe(true);
      expect(wrapper.find("img").exists()).toBe(false);
    });
  });

  describe("Events", () => {
    it("emits click event when clicked", async () => {
      wrapper = createWrapper();
      await wrapper.find("div").trigger("click");
      expect(wrapper.emitted("click")).toBeTruthy();
    });

    it("does not emit click when disabled", async () => {
      wrapper = createWrapper({ disabled: true });
      await wrapper.find("div").trigger("click");
      expect(wrapper.emitted("click")).toBeFalsy();
    });

    it("does not emit click when cardDisabled is injected", async () => {
      wrapper = mount(IconButton, {
        props: {},
        global: {
          components: { Icon },
          provide: {
            cardDisabled: true,
          },
        },
      });
      await wrapper.find("div").trigger("click");
      expect(wrapper.emitted("click")).toBeFalsy();
    });

    it("does not emit click when loading", async () => {
      wrapper = createWrapper({ isLoading: true });
      await wrapper.find("div").trigger("click");
      expect(wrapper.emitted("click")).toBeFalsy();
    });
  });

  describe("Image Handling", () => {
    it("applies hover opacity to image", () => {
      wrapper = createWrapper({ imgUrl: "test.jpg" });
      const img = wrapper.find("img");
      expect(img.classes()).toContain("hover:opacity-80");
      expect(img.classes()).toContain("transition-opacity");
    });

    it("does not show image when loading", () => {
      wrapper = createWrapper({ 
        imgUrl: "test.jpg", 
        isLoading: true 
      });
      expect(wrapper.find("img").exists()).toBe(false);
    });
  });

  describe("Accessibility", () => {
    it("has proper disabled attribute when disabled", () => {
      wrapper = createWrapper({ disabled: true });
      expect(wrapper.attributes("disabled")).toBeDefined();
    });

    it("has proper disabled attribute when cardDisabled is injected", () => {
      wrapper = mount(IconButton, {
        props: {},
        global: {
          components: { Icon },
          provide: {
            cardDisabled: true,
          },
        },
      });
      expect(wrapper.attributes("disabled")).toBeDefined();
    });

    it("has proper disabled attribute when loading", () => {
      wrapper = createWrapper({ isLoading: true });
      expect(wrapper.attributes("disabled")).toBeDefined();
    });

    it("does not have disabled attribute when enabled", () => {
      wrapper = createWrapper();
      expect(wrapper.attributes("disabled")).toBeUndefined();
    });
  });

  describe("Edge Cases", () => {
    it("handles empty icon name", () => {
      wrapper = createWrapper({ icon: "" });
      expect(wrapper.findComponent(Icon).exists()).toBe(false);
    });

    it("handles empty imgUrl", () => {
      wrapper = createWrapper({ imgUrl: "" });
      expect(wrapper.find("img").exists()).toBe(true);
      expect(wrapper.find("img").attributes("src")).toBe("");
    });

    it("handles undefined props gracefully", () => {
      wrapper = createWrapper({});
      expect(wrapper.find("div").exists()).toBe(true);
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

    it("handles invalid rounded gracefully", () => {
      wrapper = createWrapper({ rounded: "invalid" as any });
      // Should not apply any rounded class
      expect(wrapper.classes()).not.toContain("rounded-invalid");
    });

    it("handles invalid size gracefully", () => {
      wrapper = createWrapper({ 
        icon: "IconSettings", 
        size: "invalid" as any 
      });
      // Should fall back to default size (lg)
      const icon = wrapper.findComponent(Icon);
      expect(icon.classes()).toContain("h-10");
      expect(icon.classes()).toContain("w-10");
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

  describe("Custom Classes", () => {
    it("applies custom class from attrs", () => {
      wrapper = createWrapper({ class: "custom-class" });
      expect(wrapper.classes()).toContain("custom-class");
    });

    it("combines custom class with default classes", () => {
      wrapper = createWrapper({ class: "custom-class" });
      expect(wrapper.classes()).toContain("custom-class");
      expect(wrapper.classes()).toContain("overflow-hidden");
      expect(wrapper.classes()).toContain("w-fit");
    });
  });
});