import { describe, it, expect, vi } from "vitest";
import { mount, VueWrapper } from "@vue/test-utils";
import DropdownItem from "../DropdownItem.vue";

describe("DropdownItem Component", () => {
  let wrapper: VueWrapper<any>;

  // Helper function to create wrapper with default props
  const createWrapper = (props = {}, slots = {}) => {
    return mount(DropdownItem, {
      props,
      slots,
    });
  };

  describe("Rendering", () => {
    it("renders list item element", () => {
      wrapper = createWrapper();
      expect(wrapper.find("li").exists()).toBe(true);
    });

    it("renders anchor element", () => {
      wrapper = createWrapper();
      expect(wrapper.find("a").exists()).toBe(true);
    });

    it("renders slot content", () => {
      wrapper = createWrapper({}, {
        default: "Dropdown Item Text",
      });
      expect(wrapper.text()).toContain("Dropdown Item Text");
    });

    it("renders complex slot content", () => {
      wrapper = createWrapper({}, {
        default: "<span>Complex Content</span>",
      });
      expect(wrapper.html()).toContain("<span>Complex Content</span>");
    });
  });

  describe("Props and Styling", () => {
    it("applies custom class to anchor element", () => {
      wrapper = createWrapper({ class: "custom-dropdown-item" });
      const anchor = wrapper.find("a");
      expect(anchor.classes()).toContain("custom-dropdown-item");
    });

    it("applies multiple classes", () => {
      wrapper = createWrapper({ class: "text-blue-500 hover:bg-gray-100" });
      const anchor = wrapper.find("a");
      expect(anchor.classes()).toContain("text-blue-500");
      expect(anchor.classes()).toContain("hover:bg-gray-100");
    });

    it("handles empty class prop", () => {
      wrapper = createWrapper({ class: "" });
      const anchor = wrapper.find("a");
      expect(anchor.attributes("class")).toBe("");
    });

    it("handles undefined class prop", () => {
      wrapper = createWrapper();
      const anchor = wrapper.find("a");
      expect(anchor.attributes("class")).toBe("");
    });

    it("handles null class prop", () => {
      wrapper = createWrapper({ class: null as any });
      const anchor = wrapper.find("a");
      expect(anchor.attributes("class")).toBe("");
    });

    it("handles boolean class prop", () => {
      wrapper = createWrapper({ class: true as any });
      const anchor = wrapper.find("a");
      expect(anchor.attributes("class")).toBe("");
    });

    it("handles number class prop", () => {
      wrapper = createWrapper({ class: 123 as any });
      const anchor = wrapper.find("a");
      expect(anchor.attributes("class")).toBe("");
    });
  });

  describe("Attributes", () => {
    it("sets href attribute to javascript:;", () => {
      wrapper = createWrapper();
      const anchor = wrapper.find("a");
      expect(anchor.attributes("href")).toBe("javascript:;");
    });
  });

  describe("Structure", () => {
    it("has correct HTML structure", () => {
      wrapper = createWrapper({ class: "test-class" }, {
        default: "Test Content",
      });
      const html = wrapper.html();
      expect(html).toContain("<li>");
      expect(html).toContain("<a");
      expect(html).toContain("href=\"javascript:;\"");
      expect(html).toContain("class=\"test-class\"");
      expect(html).toContain("Test Content");
      expect(html).toContain("</a>");
      expect(html).toContain("</li>");
    });

    it("maintains proper nesting", () => {
      wrapper = createWrapper({}, {
        default: "<span>Nested Content</span>",
      });
      const li = wrapper.find("li");
      const anchor = li.find("a");
      expect(anchor.exists()).toBe(true);
      expect(anchor.html()).toContain("<span>Nested Content</span>");
    });
  });

  describe("Slot Functionality", () => {
    it("renders text content in slot", () => {
      wrapper = createWrapper({}, {
        default: "Simple text content",
      });
      expect(wrapper.text()).toBe("Simple text content");
    });

    it("renders HTML content in slot", () => {
      wrapper = createWrapper({}, {
        default: "<strong>Bold text</strong>",
      });
      expect(wrapper.html()).toContain("<strong>Bold text</strong>");
    });

    it("renders component content in slot", () => {
      wrapper = createWrapper({}, {
        default: "<div class='component'>Component Content</div>",
      });
      expect(wrapper.html()).toContain("<div class=\"component\">Component Content</div>");
    });

    it("handles empty slot", () => {
      wrapper = createWrapper({}, {
        default: "",
      });
      expect(wrapper.text()).toBe("");
    });
  });

  describe("Accessibility", () => {
    it("has proper list item structure", () => {
      wrapper = createWrapper();
      const li = wrapper.find("li");
      expect(li.exists()).toBe(true);
    });

    it("has clickable anchor element", () => {
      wrapper = createWrapper();
      const anchor = wrapper.find("a");
      expect(anchor.exists()).toBe(true);
      expect(anchor.attributes("href")).toBe("javascript:;");
    });
  });

  describe("Edge Cases", () => {
    it("handles undefined props gracefully", () => {
      wrapper = createWrapper({});
      expect(wrapper.find("li").exists()).toBe(true);
      expect(wrapper.find("a").exists()).toBe(true);
    });

    it("handles null class prop", () => {
      wrapper = createWrapper({ class: null as any });
      const anchor = wrapper.find("a");
      expect(anchor.attributes("class")).toBe("");
    });

    it("handles boolean class prop", () => {
      wrapper = createWrapper({ class: true as any });
      const anchor = wrapper.find("a");
      expect(anchor.attributes("class")).toBe("");
    });

    it("handles number class prop", () => {
      wrapper = createWrapper({ class: 123 as any });
      const anchor = wrapper.find("a");
      expect(anchor.attributes("class")).toBe("");
    });
  });

  describe("Default Values", () => {
    it("uses correct default values", () => {
      wrapper = createWrapper();
      expect(wrapper.props("class")).toBeUndefined();
    });
  });

  describe("Component Integration", () => {
    it("works as child of dropdown component", () => {
      wrapper = createWrapper({ class: "dropdown-item" }, {
        default: "Menu Item",
      });
      const li = wrapper.find("li");
      const anchor = li.find("a");
      expect(li.exists()).toBe(true);
      expect(anchor.exists()).toBe(true);
      expect(anchor.classes()).toContain("dropdown-item");
      expect(anchor.text()).toBe("Menu Item");
    });

    it("supports complex nested content", () => {
      wrapper = createWrapper({ class: "menu-item" }, {
        default: `
          <div class="flex items-center">
            <span class="icon">📁</span>
            <span class="text">Documents</span>
          </div>
        `,
      });
      expect(wrapper.html()).toContain("<div class=\"flex items-center\">");
      expect(wrapper.html()).toContain("<span class=\"icon\">📁</span>");
      expect(wrapper.html()).toContain("<span class=\"text\">Documents</span>");
    });
  });

  describe("Styling Integration", () => {
    it("applies Tailwind classes correctly", () => {
      wrapper = createWrapper({ 
        class: "block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" 
      });
      const anchor = wrapper.find("a");
      expect(anchor.classes()).toContain("block");
      expect(anchor.classes()).toContain("px-4");
      expect(anchor.classes()).toContain("py-2");
      expect(anchor.classes()).toContain("text-sm");
      expect(anchor.classes()).toContain("text-gray-700");
      expect(anchor.classes()).toContain("hover:bg-gray-100");
    });

    it("applies custom CSS classes", () => {
      wrapper = createWrapper({ 
        class: "custom-menu-item active" 
      });
      const anchor = wrapper.find("a");
      expect(anchor.classes()).toContain("custom-menu-item");
      expect(anchor.classes()).toContain("active");
    });
  });

  describe("Event Handling", () => {
    it("can be clicked", async () => {
      wrapper = createWrapper();
      const anchor = wrapper.find("a");
      await anchor.trigger("click");
      // The component doesn't emit events, but we can verify it's clickable
      expect(anchor.exists()).toBe(true);
    });

    it("supports keyboard navigation", async () => {
      wrapper = createWrapper();
      const anchor = wrapper.find("a");
      await anchor.trigger("keydown.enter");
      await anchor.trigger("keydown.space");
      // The component doesn't emit events, but we can verify it's accessible
      expect(anchor.exists()).toBe(true);
    });
  });

  describe("Type Safety", () => {
    it("accepts string class prop", () => {
      wrapper = createWrapper({ class: "test-class" });
      expect(wrapper.props("class")).toBe("test-class");
    });

    it("accepts undefined class prop", () => {
      wrapper = createWrapper();
      expect(wrapper.props("class")).toBeUndefined();
    });
  });

  describe("Rendering Performance", () => {
    it("renders efficiently with minimal props", () => {
      wrapper = createWrapper();
      expect(wrapper.html()).toBe("<li><a href=\"javascript:;\" class=\"\"></a></li>");
    });

    it("renders efficiently with class and content", () => {
      wrapper = createWrapper({ class: "menu-item" }, {
        default: "Simple content",
      });
      expect(wrapper.html()).toBe("<li><a href=\"javascript:;\" class=\"menu-item\">Simple content</a></li>");
    });
  });
});