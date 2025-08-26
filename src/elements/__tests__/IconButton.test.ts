import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import IconButton from "../IconButton.vue";

describe("IconButton Component", () => {
  const createWrapper = (props = {}) => {
    return mount(IconButton, { props });
  };

  describe("Rendering", () => {
    it("renders as div element by default", () => {
      const wrapper = createWrapper();
      expect(wrapper.find("div").exists()).toBe(true);
    });

    it("renders with default classes", () => {
      const wrapper = createWrapper();
      expect(wrapper.classes()).toContain("overflow-hidden");
      expect(wrapper.classes()).toContain("w-fit");
      expect(wrapper.classes()).toContain("select-none");
      expect(wrapper.classes()).toContain("transition-all");
    });

    it("renders with custom class", () => {
      const wrapper = createWrapper({ class: "custom-icon-button" });
      expect(wrapper.classes()).toContain("custom-icon-button");
    });
  });

  describe("Props and Styling", () => {
    it("applies size classes correctly", () => {
      const sizes = ["xs", "sm", "md", "lg", "xl"];
      sizes.forEach((size) => {
        const wrapper = createWrapper({ size, icon: "IconSettings" });
        expect(wrapper.exists()).toBe(true);
      });
    });

    it("applies rounded classes correctly", () => {
      const roundeds = ["full", "none", "xs", "sm", "md", "lg", "xl"];
      roundeds.forEach((rounded) => {
        const wrapper = createWrapper({ rounded });
        const roundedClasses = {
          full: "rounded-full",
          none: "rounded-none",
          xs: "rounded-xs",
          sm: "rounded-sm",
          md: "rounded-md",
          lg: "rounded-lg",
          xl: "rounded-xl",
        };
        expect(wrapper.classes()).toContain(roundedClasses[rounded]);
      });
    });

    it("applies color classes correctly", () => {
      const colors = [
        "default",
        "primary",
        "info",
        "success",
        "warning",
        "danger",
        "secondary",
        "dark",
        "gradient",
      ];
      colors.forEach((color) => {
        const wrapper = createWrapper({ color });
        const colorClasses = {
          default: "bg-white-light/40",
          primary: "bg-primary",
          info: "bg-info",
          success: "bg-success",
          warning: "bg-warning",
          danger: "bg-danger",
          secondary: "bg-secondary",
          dark: "bg-dark",
          gradient: "bg-gradient",
        };
        expect(wrapper.classes()).toContain(colorClasses[color]);
      });
    });

    it("applies disabled styling when disabled", () => {
      const wrapper = createWrapper({ disabled: true });
      expect(wrapper.classes()).toContain("bg-gray-100");
      expect(wrapper.classes()).toContain("cursor-not-allowed");
    });

    it("applies loading styling when isLoading is true", () => {
      const wrapper = createWrapper({ isLoading: true });
      expect(wrapper.classes()).toContain("bg-gray-100");
      expect(wrapper.classes()).toContain("cursor-not-allowed");
    });

    it("applies badge styling when badge is true", () => {
      const wrapper = createWrapper({ badge: true, icon: "IconStar" });
      expect(wrapper.classes()).toContain("cursor-default");
      expect(wrapper.classes()).not.toContain("hover:cursor-pointer");
    });

    it("applies interactive styling when badge is false", () => {
      const wrapper = createWrapper({ badge: false, icon: "IconStar" });
      expect(wrapper.classes()).toContain("hover:cursor-pointer");
      expect(wrapper.classes()).not.toContain("cursor-default");
    });
  });

  describe("Icon Rendering", () => {
    it("renders icon when icon prop is provided", () => {
      const wrapper = createWrapper({ icon: "IconSettings" });
      expect(wrapper.exists()).toBe(true);
    });

    it("renders loading icon when isLoading is true", () => {
      const wrapper = createWrapper({
        isLoading: true,
        loadingIcon: "IconRefresh",
      });
      expect(wrapper.exists()).toBe(true);
    });

    it("renders image when imgUrl is provided", () => {
      const wrapper = createWrapper({ imgUrl: "test-image.jpg" });
      const img = wrapper.find("img");
      expect(img.exists()).toBe(true);
      expect(img.attributes("src")).toBe("test-image.jpg");
    });
  });

  describe("Events", () => {
    it("emits click event when clicked", async () => {
      const wrapper = createWrapper();
      await wrapper.trigger("click");
      expect(wrapper.emitted("click")).toBeTruthy();
    });

    it("does not emit click event when disabled", async () => {
      const wrapper = createWrapper({ disabled: true });
      await wrapper.trigger("click");
      expect(wrapper.emitted("click")).toBeFalsy();
    });

    it("does not emit click event when loading", async () => {
      const wrapper = createWrapper({ isLoading: true });
      await wrapper.trigger("click");
      expect(wrapper.emitted("click")).toBeFalsy();
    });

    it("does not emit click event when in badge mode", async () => {
      const wrapper = createWrapper({ badge: true, icon: "IconStar" });
      await wrapper.trigger("click");
      expect(wrapper.emitted("click")).toBeFalsy();
    });
  });

  describe("Card Disabled State", () => {
    it("applies disabled state when cardDisabled is true", () => {
      const wrapper = mount(IconButton, {
        props: {},
        global: {
          provide: {
            cardDisabled: true,
          },
        },
      });
      expect(wrapper.classes()).toContain("bg-gray-100");
      expect(wrapper.classes()).toContain("cursor-not-allowed");
    });

    it("does not emit click event when cardDisabled is true", async () => {
      const wrapper = mount(IconButton, {
        props: {},
        global: {
          provide: {
            cardDisabled: true,
          },
        },
      });
      await wrapper.trigger("click");
      expect(wrapper.emitted("click")).toBeFalsy();
    });
  });

  describe("Edge Cases", () => {
    it("handles empty icon name", () => {
      const wrapper = createWrapper({ icon: "" });
      expect(wrapper.exists()).toBe(true);
    });

    it("handles empty imgUrl", () => {
      const wrapper = createWrapper({ imgUrl: "" });
      expect(wrapper.exists()).toBe(true);
    });

    it("handles undefined props gracefully", () => {
      const wrapper = createWrapper({});
      expect(wrapper.exists()).toBe(true);
      expect(wrapper.classes()).toContain("overflow-hidden");
    });
  });
});
