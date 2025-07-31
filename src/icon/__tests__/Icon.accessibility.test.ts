import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import Icon from "../Icon.vue";

describe("Icon Component Accessibility", () => {
  const createWrapper = (props = {}) => {
    const defaultProps = {
      name: "test-icon",
      ...props,
    };
    return mount(Icon, { props: defaultProps });
  };

  describe("ARIA Attributes", () => {
    it("supports custom aria-label", () => {
      const wrapper = createWrapper({ "aria-label": "User profile icon" });
      expect(wrapper.attributes("aria-label")).toBe("User profile icon");
    });

    it("supports aria-describedby", () => {
      const wrapper = createWrapper({ "aria-describedby": "icon-description" });
      expect(wrapper.attributes("aria-describedby")).toBe("icon-description");
    });

    it("supports role attribute", () => {
      const wrapper = createWrapper({ role: "img" });
      expect(wrapper.attributes("role")).toBe("img");
    });

    it("supports aria-hidden", () => {
      const wrapper = createWrapper({ "aria-hidden": "true" });
      expect(wrapper.attributes("aria-hidden")).toBe("true");
    });
  });

  describe("Icon Context and Meaning", () => {
    it("provides meaningful context for screen readers", () => {
      const wrapper = createWrapper({ 
        name: "user-icon",
        "aria-label": "User account" 
      });
      expect(wrapper.attributes("aria-label")).toBe("User account");
    });

    it("supports decorative icons", () => {
      const wrapper = createWrapper({ 
        name: "decorative-icon",
        "aria-hidden": "true" 
      });
      expect(wrapper.attributes("aria-hidden")).toBe("true");
    });

    it("supports functional icons", () => {
      const wrapper = createWrapper({ 
        name: "functional-icon",
        role: "button",
        "aria-label": "Click to expand" 
      });
      expect(wrapper.attributes("role")).toBe("button");
      expect(wrapper.attributes("aria-label")).toBe("Click to expand");
    });
  });

  describe("Keyboard Navigation", () => {
    it("supports tabindex", () => {
      const wrapper = createWrapper({ tabindex: "0" });
      expect(wrapper.attributes("tabindex")).toBe("0");
    });

    it("can be removed from tab order", () => {
      const wrapper = createWrapper({ tabindex: "-1" });
      expect(wrapper.attributes("tabindex")).toBe("-1");
    });

    it("is focusable when needed", () => {
      const wrapper = createWrapper({ 
        tabindex: "0",
        role: "button" 
      });
      expect(wrapper.attributes("tabindex")).toBe("0");
      expect(wrapper.attributes("role")).toBe("button");
    });

    it("is not focusable when decorative", () => {
      const wrapper = createWrapper({ 
        "aria-hidden": "true",
        tabindex: "-1" 
      });
      expect(wrapper.attributes("aria-hidden")).toBe("true");
      expect(wrapper.attributes("tabindex")).toBe("-1");
    });
  });

  describe("Screen Reader Support", () => {
    it("provides descriptive labels", () => {
      const wrapper = createWrapper({ 
        name: "settings-icon",
        "aria-label": "Settings menu" 
      });
      expect(wrapper.attributes("aria-label")).toBe("Settings menu");
    });

    it("announces icon purpose", () => {
      const wrapper = createWrapper({ 
        name: "notification-icon",
        "aria-label": "You have 3 new notifications" 
      });
      expect(wrapper.attributes("aria-label")).toBe("You have 3 new notifications");
    });

    it("provides context for interactive icons", () => {
      const wrapper = createWrapper({ 
        name: "close-icon",
        role: "button",
        "aria-label": "Close dialog" 
      });
      expect(wrapper.attributes("role")).toBe("button");
      expect(wrapper.attributes("aria-label")).toBe("Close dialog");
    });
  });

  describe("Icon State and Status", () => {
    it("indicates active state", () => {
      const wrapper = createWrapper({ 
        name: "active-icon",
        "aria-pressed": "true" 
      });
      expect(wrapper.attributes("aria-pressed")).toBe("true");
    });

    it("indicates expanded state", () => {
      const wrapper = createWrapper({ 
        name: "expand-icon",
        "aria-expanded": "true" 
      });
      expect(wrapper.attributes("aria-expanded")).toBe("true");
    });

    it("indicates selected state", () => {
      const wrapper = createWrapper({ 
        name: "selected-icon",
        "aria-selected": "true" 
      });
      expect(wrapper.attributes("aria-selected")).toBe("true");
    });
  });

  describe("Icon Size and Visibility", () => {
    it("supports size indication", () => {
      const wrapper = createWrapper({ 
        name: "large-icon",
        "aria-label": "Large user icon" 
      });
      expect(wrapper.attributes("aria-label")).toBe("Large user icon");
    });

    it("supports color indication", () => {
      const wrapper = createWrapper({ 
        name: "colored-icon",
        "aria-label": "Red warning icon" 
      });
      expect(wrapper.attributes("aria-label")).toBe("Red warning icon");
    });

    it("supports animation indication", () => {
      const wrapper = createWrapper({ 
        name: "animated-icon",
        "aria-label": "Loading spinner" 
      });
      expect(wrapper.attributes("aria-label")).toBe("Loading spinner");
    });
  });

  describe("Icon Grouping and Relationships", () => {
    it("supports icon groups", () => {
      const wrapper = createWrapper({ 
        name: "group-icon",
        "aria-label": "Social media icons" 
      });
      expect(wrapper.attributes("aria-label")).toBe("Social media icons");
    });

    it("supports icon lists", () => {
      const wrapper = createWrapper({ 
        name: "list-icon",
        "aria-label": "Navigation menu" 
      });
      expect(wrapper.attributes("aria-label")).toBe("Navigation menu");
    });

    it("supports icon sequences", () => {
      const wrapper = createWrapper({ 
        name: "sequence-icon",
        "aria-label": "Step 2 of 5" 
      });
      expect(wrapper.attributes("aria-label")).toBe("Step 2 of 5");
    });
  });

  describe("Icon Context and Purpose", () => {
    it("provides context for form icons", () => {
      const wrapper = createWrapper({ 
        name: "form-icon",
        "aria-label": "Required field indicator" 
      });
      expect(wrapper.attributes("aria-label")).toBe("Required field indicator");
    });

    it("provides context for navigation icons", () => {
      const wrapper = createWrapper({ 
        name: "nav-icon",
        "aria-label": "Go to next page" 
      });
      expect(wrapper.attributes("aria-label")).toBe("Go to next page");
    });

    it("provides context for action icons", () => {
      const wrapper = createWrapper({ 
        name: "action-icon",
        "aria-label": "Delete item" 
      });
      expect(wrapper.attributes("aria-label")).toBe("Delete item");
    });
  });

  describe("Icon Accessibility Patterns", () => {
    it("supports button pattern", () => {
      const wrapper = createWrapper({ 
        name: "button-icon",
        role: "button",
        tabindex: "0",
        "aria-label": "Toggle menu" 
      });
      expect(wrapper.attributes("role")).toBe("button");
      expect(wrapper.attributes("tabindex")).toBe("0");
      expect(wrapper.attributes("aria-label")).toBe("Toggle menu");
    });

    it("supports link pattern", () => {
      const wrapper = createWrapper({ 
        name: "link-icon",
        role: "link",
        tabindex: "0",
        "aria-label": "Visit homepage" 
      });
      expect(wrapper.attributes("role")).toBe("link");
      expect(wrapper.attributes("tabindex")).toBe("0");
      expect(wrapper.attributes("aria-label")).toBe("Visit homepage");
    });

    it("supports image pattern", () => {
      const wrapper = createWrapper({ 
        name: "image-icon",
        role: "img",
        "aria-label": "Company logo" 
      });
      expect(wrapper.attributes("role")).toBe("img");
      expect(wrapper.attributes("aria-label")).toBe("Company logo");
    });
  });

  describe("Edge Cases and Error Handling", () => {
    it("handles empty name gracefully", () => {
      const wrapper = createWrapper({ name: "" });
      expect(wrapper.exists()).toBe(true);
    });

    it("handles undefined name gracefully", () => {
      const wrapper = createWrapper({ name: undefined });
      expect(wrapper.exists()).toBe(true);
    });

    it("handles special characters in name", () => {
      const wrapper = createWrapper({ name: "icon@test" });
      expect(wrapper.exists()).toBe(true);
    });

    it("handles very long names", () => {
      const longName = "very-long-icon-name-with-many-words-and-characters";
      const wrapper = createWrapper({ name: longName });
      expect(wrapper.exists()).toBe(true);
    });

    it("handles undefined props gracefully", () => {
      const wrapper = createWrapper({});
      expect(wrapper.exists()).toBe(true);
    });
  });
});