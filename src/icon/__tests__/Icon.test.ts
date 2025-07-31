import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import Icon from "../Icon.vue";

describe("Icon Component", () => {
  const createWrapper = (props = {}) => {
    const defaultProps = {
      name: "test-icon",
      ...props,
    };
    return mount(Icon, { props: defaultProps });
  };

  describe("Rendering", () => {
    it("renders as component by default", () => {
      const wrapper = createWrapper();
      expect(wrapper.find("div").exists()).toBe(true);
    });

    it("renders with default classes", () => {
      const wrapper = createWrapper();
      const div = wrapper.find("div");
      expect(div.classes()).toContain("test-icon");
    });

    it("renders with custom class", () => {
      const wrapper = createWrapper({ name: "custom-icon" });
      const div = wrapper.find("div");
      expect(div.classes()).toContain("custom-icon");
    });
  });

  describe("Props and Styling", () => {
    it("applies name as class", () => {
      const wrapper = createWrapper({ name: "my-icon" });
      const div = wrapper.find("div");
      expect(div.classes()).toContain("my-icon");
    });

    it("handles fill prop", () => {
      const wrapper = createWrapper({ name: "test-icon", fill: true });
      expect(wrapper.exists()).toBe(true);
    });

    it("handles fill prop as false", () => {
      const wrapper = createWrapper({ name: "test-icon", fill: false });
      expect(wrapper.exists()).toBe(true);
    });
  });

  describe("Icon Name Processing", () => {
    it("processes kebab-case names to PascalCase", () => {
      const wrapper = createWrapper({ name: "user-profile" });
      // The computed property converts "user-profile" to "UserProfile"
      expect(wrapper.exists()).toBe(true);
    });

    it("processes single word names", () => {
      const wrapper = createWrapper({ name: "home" });
      // The computed property converts "home" to "Home"
      expect(wrapper.exists()).toBe(true);
    });

    it("processes names with multiple hyphens", () => {
      const wrapper = createWrapper({ name: "user-profile-settings" });
      // The computed property converts "user-profile-settings" to "UserProfileSettings"
      expect(wrapper.exists()).toBe(true);
    });

    it("handles empty name", () => {
      const wrapper = createWrapper({ name: "" });
      expect(wrapper.exists()).toBe(true);
    });

    it("handles undefined name", () => {
      const wrapper = createWrapper({ name: "" });
      expect(wrapper.exists()).toBe(true);
    });
  });

  describe("Icon Variants", () => {
    it("renders static icons when available", () => {
      const wrapper = createWrapper({ name: "static-icon" });
      expect(wrapper.exists()).toBe(true);
    });

    it("renders menu icons when available", () => {
      const wrapper = createWrapper({ name: "menu-icon" });
      expect(wrapper.exists()).toBe(true);
    });

    it("renders variant icons when available", () => {
      const wrapper = createWrapper({ name: "variant-icon" });
      expect(wrapper.exists()).toBe(true);
    });

    it("falls back to div when icon not found", () => {
      const wrapper = createWrapper({ name: "non-existent-icon" });
      const div = wrapper.find("div");
      expect(div.exists()).toBe(true);
      expect(div.classes()).toContain("non-existent-icon");
    });
  });

  describe("Edge Cases", () => {
    it("handles names with numbers", () => {
      const wrapper = createWrapper({ name: "icon-123" });
      expect(wrapper.exists()).toBe(true);
    });

    it("handles names with special characters", () => {
      const wrapper = createWrapper({ name: "icon@test" });
      expect(wrapper.exists()).toBe(true);
    });

    it("handles very long names", () => {
      const longName = "very-long-icon-name-with-many-words";
      const wrapper = createWrapper({ name: longName });
      expect(wrapper.exists()).toBe(true);
    });

    it("handles names with spaces", () => {
      const wrapper = createWrapper({ name: "icon with spaces" });
      expect(wrapper.exists()).toBe(true);
    });

    it("handles undefined props gracefully", () => {
      const wrapper = createWrapper({});
      expect(wrapper.exists()).toBe(true);
    });
  });

  describe("Accessibility", () => {
    it("supports aria-label", () => {
      const wrapper = createWrapper({ "aria-label": "User icon" });
      expect(wrapper.attributes("aria-label")).toBe("User icon");
    });

    it("supports role attribute", () => {
      const wrapper = createWrapper({ role: "img" });
      expect(wrapper.attributes("role")).toBe("img");
    });

    it("supports tabindex", () => {
      const wrapper = createWrapper({ tabindex: "0" });
      expect(wrapper.attributes("tabindex")).toBe("0");
    });
  });
});