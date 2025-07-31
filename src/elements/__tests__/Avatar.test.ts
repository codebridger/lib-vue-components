import { describe, it, expect, vi } from "vitest";
import { mount, VueWrapper } from "@vue/test-utils";
import Avatar from "../Avatar.vue";

describe("Avatar Component", () => {
  let wrapper: VueWrapper<any>;

  // Helper function to create wrapper with default props
  const createWrapper = (props = {}, slots = {}) => {
    return mount(Avatar, {
      props,
      slots,
    });
  };

  describe("Rendering", () => {
    it("renders avatar container", () => {
      wrapper = createWrapper({ src: "test.jpg" });
      expect(wrapper.find("div").exists()).toBe(true);
    });

    it("renders image with provided src", () => {
      wrapper = createWrapper({ src: "test.jpg" });
      const img = wrapper.find("img");
      expect(img.exists()).toBe(true);
      expect(img.attributes("src")).toBe("test.jpg");
    });

    it("renders with default alt text", () => {
      wrapper = createWrapper({ src: "test.jpg" });
      expect(wrapper.find("img").attributes("alt")).toBe("User avatar");
    });

    it("renders with custom alt text", () => {
      wrapper = createWrapper({ 
        src: "test.jpg", 
        alt: "John Doe" 
      });
      expect(wrapper.find("img").attributes("alt")).toBe("John Doe");
    });

    it("renders status indicator when showStatus is true", () => {
      wrapper = createWrapper({ 
        src: "test.jpg", 
        showStatus: true 
      });
      expect(wrapper.find("span").exists()).toBe(true);
    });

    it("does not render status indicator when showStatus is false", () => {
      wrapper = createWrapper({ 
        src: "test.jpg", 
        showStatus: false 
      });
      expect(wrapper.find("span").exists()).toBe(false);
    });

    it("renders status icon slot when provided", () => {
      wrapper = createWrapper({ 
        src: "test.jpg", 
        showStatus: true 
      }, {
        "status-icon": '<div data-test="status-icon">●</div>'
      });
      expect(wrapper.find('[data-test="status-icon"]').exists()).toBe(true);
    });
  });

  describe("Size Variants", () => {
    it("applies xs size classes", () => {
      wrapper = createWrapper({ 
        src: "test.jpg", 
        size: "xs" 
      });
      expect(wrapper.classes()).toContain("w-12");
      expect(wrapper.classes()).toContain("h-12");
    });

    it("applies sm size classes", () => {
      wrapper = createWrapper({ 
        src: "test.jpg", 
        size: "sm" 
      });
      expect(wrapper.classes()).toContain("w-14");
      expect(wrapper.classes()).toContain("h-14");
    });

    it("applies md size classes", () => {
      wrapper = createWrapper({ 
        src: "test.jpg", 
        size: "md" 
      });
      expect(wrapper.classes()).toContain("w-16");
      expect(wrapper.classes()).toContain("h-16");
    });

    it("applies lg size classes (default)", () => {
      wrapper = createWrapper({ src: "test.jpg" });
      expect(wrapper.classes()).toContain("h-20");
      expect(wrapper.classes()).toContain("w-20");
    });

    it("uses lg as default size when not specified", () => {
      wrapper = createWrapper({ src: "test.jpg" });
      expect(wrapper.classes()).toContain("h-20");
      expect(wrapper.classes()).toContain("w-20");
    });
  });

  describe("Rounded Variants", () => {
    it("applies full rounded classes (default)", () => {
      wrapper = createWrapper({ src: "test.jpg" });
      expect(wrapper.find("img").classes()).toContain("rounded-full");
    });

    it("applies none rounded classes", () => {
      wrapper = createWrapper({ 
        src: "test.jpg", 
        rounded: "none" 
      });
      expect(wrapper.find("img").classes()).toContain("rounded-none");
    });

    it("applies xs rounded classes", () => {
      wrapper = createWrapper({ 
        src: "test.jpg", 
        rounded: "xs" 
      });
      expect(wrapper.find("img").classes()).toContain("rounded-xs");
    });

    it("applies sm rounded classes", () => {
      wrapper = createWrapper({ 
        src: "test.jpg", 
        rounded: "sm" 
      });
      expect(wrapper.find("img").classes()).toContain("rounded-sm");
    });

    it("applies md rounded classes", () => {
      wrapper = createWrapper({ 
        src: "test.jpg", 
        rounded: "md" 
      });
      expect(wrapper.find("img").classes()).toContain("rounded-md");
    });

    it("applies lg rounded classes", () => {
      wrapper = createWrapper({ 
        src: "test.jpg", 
        rounded: "lg" 
      });
      expect(wrapper.find("img").classes()).toContain("rounded-lg");
    });

    it("applies xl rounded classes", () => {
      wrapper = createWrapper({ 
        src: "test.jpg", 
        rounded: "xl" 
      });
      expect(wrapper.find("img").classes()).toContain("rounded-xl");
    });
  });

  describe("Status Indicators", () => {
    it("applies online status color", () => {
      wrapper = createWrapper({ 
        src: "test.jpg", 
        showStatus: true, 
        status: "online" 
      });
      expect(wrapper.find("span").classes()).toContain("bg-success");
    });

    it("applies offline status color", () => {
      wrapper = createWrapper({ 
        src: "test.jpg", 
        showStatus: true, 
        status: "offline" 
      });
      expect(wrapper.find("span").classes()).toContain("bg-secondary");
    });

    it("applies away status color", () => {
      wrapper = createWrapper({ 
        src: "test.jpg", 
        showStatus: true, 
        status: "away" 
      });
      expect(wrapper.find("span").classes()).toContain("bg-warning");
    });

    it("applies busy status color", () => {
      wrapper = createWrapper({ 
        src: "test.jpg", 
        showStatus: true, 
        status: "busy" 
      });
      expect(wrapper.find("span").classes()).toContain("bg-danger");
    });

    it("uses online as default status", () => {
      wrapper = createWrapper({ 
        src: "test.jpg", 
        showStatus: true 
      });
      expect(wrapper.find("span").classes()).toContain("bg-success");
    });

    it("positions status indicator correctly", () => {
      wrapper = createWrapper({ 
        src: "test.jpg", 
        showStatus: true 
      });
      const statusSpan = wrapper.find("span");
      expect(statusSpan.classes()).toContain("absolute");
      expect(statusSpan.classes()).toContain("ltr:right-0");
      expect(statusSpan.classes()).toContain("rtl:left-0");
      expect(statusSpan.classes()).toContain("bottom-0");
      expect(statusSpan.classes()).toContain("w-7");
      expect(statusSpan.classes()).toContain("h-7");
      expect(statusSpan.classes()).toContain("ring-2");
      expect(statusSpan.classes()).toContain("ring-white");
      expect(statusSpan.classes()).toContain("dark:ring-white-dark");
      expect(statusSpan.classes()).toContain("rounded-full");
    });
  });

  describe("Disabled State", () => {
    it("applies disabled styling to image", () => {
      wrapper = createWrapper({ 
        src: "test.jpg", 
        disabled: true 
      });
      expect(wrapper.find("img").classes()).toContain("opacity-50");
    });

    it("does not apply disabled styling when not disabled", () => {
      wrapper = createWrapper({ src: "test.jpg" });
      expect(wrapper.find("img").classes()).not.toContain("opacity-50");
    });
  });

  describe("Hover Animation", () => {
    it("applies hover animation when injected", () => {
      wrapper = mount(Avatar, {
        props: { src: "test.jpg" },
        global: {
          provide: {
            hoverAnimation: true,
          },
        },
      });
      expect(wrapper.classes()).toContain("transition-all");
      expect(wrapper.classes()).toContain("duration-300");
      expect(wrapper.classes()).toContain("hover:translate-x-2");
    });

    it("does not apply hover animation when not injected", () => {
      wrapper = createWrapper({ src: "test.jpg" });
      expect(wrapper.classes()).not.toContain("hover:translate-x-2");
    });
  });

  describe("Container Styling", () => {
    it("applies base container classes", () => {
      wrapper = createWrapper({ src: "test.jpg" });
      expect(wrapper.classes()).toContain("overflow-hidden");
      expect(wrapper.classes()).toContain("relative");
      expect(wrapper.classes()).toContain("flex");
      expect(wrapper.classes()).toContain("justify-center");
      expect(wrapper.classes()).toContain("items-center");
      expect(wrapper.classes()).toContain("text-center");
      expect(wrapper.classes()).toContain("text-2xl");
    });
  });

  describe("Image Styling", () => {
    it("applies base image classes", () => {
      wrapper = createWrapper({ src: "test.jpg" });
      const img = wrapper.find("img");
      expect(img.classes()).toContain("w-full");
      expect(img.classes()).toContain("h-full");
      expect(img.classes()).toContain("object-cover");
    });
  });

  describe("Accessibility", () => {
    it("has proper alt attribute", () => {
      wrapper = createWrapper({ 
        src: "test.jpg", 
        alt: "User profile" 
      });
      expect(wrapper.find("img").attributes("alt")).toBe("User profile");
    });

    it("has proper alt attribute when not provided", () => {
      wrapper = createWrapper({ src: "test.jpg" });
      expect(wrapper.find("img").attributes("alt")).toBe("User avatar");
    });
  });

  describe("Edge Cases", () => {
    it("handles empty src gracefully", () => {
      wrapper = createWrapper({ src: "" });
      expect(wrapper.find("img").exists()).toBe(true);
      expect(wrapper.find("img").attributes("src")).toBe("");
    });

    it("handles undefined props gracefully", () => {
      wrapper = createWrapper({ src: "test.jpg" });
      expect(wrapper.find("img").exists()).toBe(true);
    });

    it("handles invalid status gracefully", () => {
      wrapper = createWrapper({ 
        src: "test.jpg", 
        showStatus: true, 
        status: "invalid" as any 
      });
      // Should fall back to default status (online)
      expect(wrapper.find("span").classes()).toContain("bg-success");
    });

    it("handles invalid size gracefully", () => {
      wrapper = createWrapper({ 
        src: "test.jpg", 
        size: "invalid" as any 
      });
      // Should fall back to default size (lg)
      expect(wrapper.classes()).toContain("h-20");
      expect(wrapper.classes()).toContain("w-20");
    });

    it("handles invalid rounded gracefully", () => {
      wrapper = createWrapper({ 
        src: "test.jpg", 
        rounded: "invalid" as any 
      });
      // Should fall back to default rounded (full)
      expect(wrapper.find("img").classes()).toContain("rounded-full");
    });
  });

  describe("Default Values", () => {
    it("uses correct default values", () => {
      wrapper = createWrapper({ src: "test.jpg" });
      expect(wrapper.props("rounded")).toBe("full");
      expect(wrapper.props("showStatus")).toBe(false);
      expect(wrapper.props("status")).toBe("online");
      expect(wrapper.props("disabled")).toBe(false);
      expect(wrapper.props("size")).toBe("lg");
    });
  });

  describe("RTL Support", () => {
    it("applies RTL positioning for status indicator", () => {
      wrapper = createWrapper({ 
        src: "test.jpg", 
        showStatus: true 
      });
      const statusSpan = wrapper.find("span");
      expect(statusSpan.classes()).toContain("ltr:right-0");
      expect(statusSpan.classes()).toContain("rtl:left-0");
    });
  });

  describe("Dark Theme Support", () => {
    it("applies dark theme classes to status ring", () => {
      wrapper = createWrapper({ 
        src: "test.jpg", 
        showStatus: true 
      });
      const statusSpan = wrapper.find("span");
      expect(statusSpan.classes()).toContain("ring-white");
      expect(statusSpan.classes()).toContain("dark:ring-white-dark");
    });
  });
});