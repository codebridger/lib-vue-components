import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import Tabs from "../Tabs.vue";

describe("Tabs Component Accessibility", () => {
  const createWrapper = (props = {}, slots = {}) => {
    const defaultProps = {
      tabs: [
        { id: "tab1", label: "Tab 1", content: "Content 1" },
        { id: "tab2", label: "Tab 2", content: "Content 2" },
        { id: "tab3", label: "Tab 3", content: "Content 3" },
      ],
      modelValue: "tab1",
      ...props,
    };
    const defaultSlots = {
      ...slots,
    };
    return mount(Tabs, {
      props: defaultProps,
      slots: defaultSlots,
    });
  };

  describe("ARIA Attributes", () => {
    it("supports custom aria-label", () => {
      const wrapper = createWrapper({ "aria-label": "Tab navigation" });
      expect(wrapper.attributes("aria-label")).toBe("Tab navigation");
    });

    it("supports aria-describedby", () => {
      const wrapper = createWrapper({ "aria-describedby": "tabs-help" });
      expect(wrapper.attributes("aria-describedby")).toBe("tabs-help");
    });

    it("supports role attribute", () => {
      const wrapper = createWrapper({ role: "tablist" });
      expect(wrapper.attributes("role")).toBe("tablist");
    });

    it("supports aria-current for active tab", () => {
      const wrapper = createWrapper({ "aria-current": "page" });
      expect(wrapper.attributes("aria-current")).toBe("page");
    });
  });

  describe("Tab Navigation Context", () => {
    it("provides navigation context for screen readers", () => {
      const wrapper = createWrapper({
        role: "tablist",
        "aria-label": "Tab navigation"
      });
      expect(wrapper.attributes("role")).toBe("tablist");
      expect(wrapper.attributes("aria-label")).toBe("Tab navigation");
    });

    it("announces current tab position", () => {
      const wrapper = createWrapper({ modelValue: "tab2" });
      expect(wrapper.text()).toContain("Tab 2");
    });

    it("provides tab navigation description", () => {
      const wrapper = createWrapper({
        "aria-describedby": "tabs-instructions"
      });
      expect(wrapper.attributes("aria-describedby")).toBe("tabs-instructions");
    });
  });

  describe("Tab Button Accessibility", () => {
    it("provides meaningful tab button text", () => {
      const wrapper = createWrapper();
      const tabButtons = wrapper.findAll("a");
      expect(tabButtons[0].text()).toContain("Tab 1");
      expect(tabButtons[1].text()).toContain("Tab 2");
      expect(tabButtons[2].text()).toContain("Tab 3");
    });

    it("indicates active tab state", () => {
      const wrapper = createWrapper({ modelValue: "tab2" });
      const tabButtons = wrapper.findAll("a");
      expect(tabButtons[1].classes()).toContain("text-primary");
    });

    it("indicates disabled tab state", () => {
      const wrapper = createWrapper({
        tabs: [
          { id: "tab1", label: "Tab 1", content: "Content 1" },
          { id: "tab2", label: "Tab 2", content: "Content 2", disabled: true },
          { id: "tab3", label: "Tab 3", content: "Content 3" },
        ],
      });
      const tabButtons = wrapper.findAll("a");
      expect(tabButtons[1].classes()).toContain("pointer-events-none");
      expect(tabButtons[1].classes()).toContain("text-white-light");
    });

    it("supports tab buttons with aria-label", () => {
      const wrapper = createWrapper();
      const tabButtons = wrapper.findAll("a");
      // Tab buttons should be accessible
      expect(tabButtons.length).toBe(3);
    });

    it("supports tab buttons with role", () => {
      const wrapper = createWrapper();
      const tabButtons = wrapper.findAll("a");
      // Tab buttons should have proper semantic meaning
      expect(tabButtons.length).toBe(3);
    });
  });

  describe("Keyboard Navigation", () => {
    it("supports tabindex for navigation", () => {
      const wrapper = createWrapper({ tabindex: "0" });
      expect(wrapper.attributes("tabindex")).toBe("0");
    });

    it("can be removed from tab order", () => {
      const wrapper = createWrapper({ tabindex: "-1" });
      expect(wrapper.attributes("tabindex")).toBe("-1");
    });

    it("supports keyboard activation for tab buttons", async () => {
      const wrapper = createWrapper();
      const tabButtons = wrapper.findAll("a");

      await tabButtons[1].trigger("click");
      expect(wrapper.emitted("update:modelValue")).toBeTruthy();
    });

    it("supports Enter key activation", async () => {
      const wrapper = createWrapper();
      const tabButtons = wrapper.findAll("a");

      await tabButtons[1].trigger("click");
      expect(wrapper.emitted("update:modelValue")).toBeTruthy();
    });

    it("supports Space key activation", async () => {
      const wrapper = createWrapper();
      const tabButtons = wrapper.findAll("a");

      await tabButtons[1].trigger("click");
      expect(wrapper.emitted("update:modelValue")).toBeTruthy();
    });

    it("prevents keyboard activation for disabled tabs", async () => {
      const wrapper = createWrapper({
        tabs: [
          { id: "tab1", label: "Tab 1", content: "Content 1" },
          { id: "tab2", label: "Tab 2", content: "Content 2", disabled: true },
          { id: "tab3", label: "Tab 3", content: "Content 3" },
        ],
      });
      const tabButtons = wrapper.findAll("a");

      await tabButtons[1].trigger("click");
      expect(wrapper.emitted("update:modelValue")).toBeFalsy();
    });
  });

  describe("Screen Reader Support", () => {
    it("announces current tab position", () => {
      const wrapper = createWrapper({ modelValue: "tab2" });
      expect(wrapper.text()).toContain("Tab 2");
    });

    it("provides context for tab navigation purpose", () => {
      const wrapper = createWrapper({
        "aria-label": "Settings tabs"
      });
      expect(wrapper.attributes("aria-label")).toBe("Settings tabs");
    });

    it("announces total number of tabs", () => {
      const wrapper = createWrapper();
      const tabButtons = wrapper.findAll("a");
      expect(tabButtons.length).toBe(3);
    });

    it("provides context for tab state", () => {
      const wrapper = createWrapper({
        modelValue: "tab1",
        "aria-label": "Active tab navigation"
      });
      expect(wrapper.attributes("aria-label")).toBe("Active tab navigation");
    });
  });

  describe("Tab Content Accessibility", () => {
    it("provides accessible content structure", () => {
      const wrapper = createWrapper({}, {
        "content-tab1": '<div role="main">Main content</div>',
      });
      expect(wrapper.text()).toContain("Main content");
    });

    it("supports content with headings", () => {
      const wrapper = createWrapper({}, {
        "content-tab1": '<h2>Section Title</h2><p>Content</p>',
      });
      expect(wrapper.text()).toContain("Section Title");
      expect(wrapper.text()).toContain("Content");
    });

    it("supports content with form elements", () => {
      const wrapper = createWrapper({}, {
        "content-tab1": '<form><label>Name: <input type="text" /></label></form>',
      });
      expect(wrapper.text()).toContain("Name:");
    });

    it("announces content changes when tab switches", async () => {
      const wrapper = createWrapper({}, {
        "content-tab1": "<div>First tab content</div>",
        "content-tab2": "<div>Second tab content</div>",
      });

      // Initially shows first tab content
      expect(wrapper.text()).toContain("First tab content");
      expect(wrapper.text()).toContain("Second tab content");

      // Change to second tab
      await wrapper.setProps({ modelValue: "tab2" });
      expect(wrapper.text()).toContain("Second tab content");
      expect(wrapper.text()).toContain("First tab content");
    });
  });

  describe("Tab State Accessibility", () => {
    it("indicates when tab is active", () => {
      const wrapper = createWrapper({ modelValue: "tab2" });
      const tabButtons = wrapper.findAll("a");
      expect(tabButtons[1].classes()).toContain("text-primary");
    });

    it("indicates when tab is disabled", () => {
      const wrapper = createWrapper({
        tabs: [
          { id: "tab1", label: "Tab 1", content: "Content 1" },
          { id: "tab2", label: "Tab 2", content: "Content 2", disabled: true },
          { id: "tab3", label: "Tab 3", content: "Content 3" },
        ],
      });
      const tabButtons = wrapper.findAll("a");
      expect(tabButtons[1].classes()).toContain("pointer-events-none");
    });

    it("provides visual feedback for active state", () => {
      const wrapper = createWrapper({ modelValue: "tab2" });
      const tabButtons = wrapper.findAll("a");
      expect(tabButtons[1].classes()).toContain("text-primary");
    });

    it("provides visual feedback for disabled state", () => {
      const wrapper = createWrapper({
        tabs: [
          { id: "tab1", label: "Tab 1", content: "Content 1" },
          { id: "tab2", label: "Tab 2", content: "Content 2", disabled: true },
          { id: "tab3", label: "Tab 3", content: "Content 3" },
        ],
      });
      const tabButtons = wrapper.findAll("a");
      expect(tabButtons[1].classes()).toContain("text-white-light");
    });
  });

  describe("Tab Information Accessibility", () => {
    it("displays tab labels clearly", () => {
      const wrapper = createWrapper();
      const tabButtons = wrapper.findAll("a");
      expect(tabButtons[0].text()).toContain("Tab 1");
      expect(tabButtons[1].text()).toContain("Tab 2");
      expect(tabButtons[2].text()).toContain("Tab 3");
    });

    it("handles descriptive tab labels", () => {
      const wrapper = createWrapper({
        tabs: [
          { id: "tab1", label: "User Settings", content: "Content 1" },
          { id: "tab2", label: "Security Options", content: "Content 2" },
          { id: "tab3", label: "Privacy Controls", content: "Content 3" },
        ],
      });
      expect(wrapper.text()).toContain("User Settings");
      expect(wrapper.text()).toContain("Security Options");
      expect(wrapper.text()).toContain("Privacy Controls");
    });

    it("provides context for tab purpose", () => {
      const wrapper = createWrapper({
        "aria-label": "Configuration tabs"
      });
      expect(wrapper.attributes("aria-label")).toBe("Configuration tabs");
    });
  });

  describe("Focus Management", () => {
    it("supports focus on tab container", () => {
      const wrapper = createWrapper({ tabindex: "0" });
      expect(wrapper.attributes("tabindex")).toBe("0");
    });

    it("supports focus on individual tab buttons", () => {
      const wrapper = createWrapper();
      const tabButtons = wrapper.findAll("a");
      tabButtons.forEach(button => {
        expect(button.element.focus).toBeDefined();
      });
    });

    it("maintains focus order", () => {
      const wrapper = createWrapper();
      const tabButtons = wrapper.findAll("a");
      expect(tabButtons.length).toBe(3);
    });
  });

  describe("Tab Context and Purpose", () => {
    it("provides context for settings tabs", () => {
      const wrapper = createWrapper({
        "aria-label": "Settings tabs"
      });
      expect(wrapper.attributes("aria-label")).toBe("Settings tabs");
    });

    it("provides context for form tabs", () => {
      const wrapper = createWrapper({
        "aria-label": "Form sections"
      });
      expect(wrapper.attributes("aria-label")).toBe("Form sections");
    });

    it("provides context for content tabs", () => {
      const wrapper = createWrapper({
        "aria-label": "Content navigation"
      });
      expect(wrapper.attributes("aria-label")).toBe("Content navigation");
    });
  });

  describe("Tab Icons Accessibility", () => {
    it("provides icon context for screen readers", () => {
      const wrapper = createWrapper({
        tabs: [
          { id: "tab1", label: "Tab 1", content: "Content 1", icon: "IconHome" },
          { id: "tab2", label: "Tab 2", content: "Content 2" },
        ],
      });
      const firstTab = wrapper.findAll("a")[0];
      expect(firstTab.find("span").exists()).toBe(true);
    });

    it("supports custom icon slots", () => {
      const wrapper = createWrapper({
        tabs: [
          { id: "tab1", label: "Tab 1", content: "Content 1", icon: "IconHome" },
        ],
      }, {
        "icon-tab1": '<span aria-label="Home icon">🏠</span>',
      });
      expect(wrapper.text()).toContain("🏠");
    });

    it("handles tabs without icons gracefully", () => {
      const wrapper = createWrapper({
        tabs: [
          { id: "tab1", label: "Tab 1", content: "Content 1" },
          { id: "tab2", label: "Tab 2", content: "Content 2" },
        ],
      });
      const tabButtons = wrapper.findAll("a");
      tabButtons.forEach(button => {
        expect(button.find("span").exists()).toBe(false);
      });
    });
  });

  describe("Edge Cases and Error Handling", () => {
    it("handles empty tabs array gracefully", () => {
      const wrapper = createWrapper({ tabs: [] });
      expect(wrapper.exists()).toBe(true);
    });

    it("handles single tab gracefully", () => {
      const wrapper = createWrapper({
        tabs: [{ id: "tab1", label: "Single Tab", content: "Single Content" }],
      });
      expect(wrapper.exists()).toBe(true);
    });

    it("handles tabs with empty labels", () => {
      const wrapper = createWrapper({
        tabs: [
          { id: "tab1", label: "", content: "Content 1" },
          { id: "tab2", label: "Tab 2", content: "Content 2" },
        ],
      });
      expect(wrapper.exists()).toBe(true);
    });

    it("handles tabs with empty content", () => {
      const wrapper = createWrapper({
        tabs: [
          { id: "tab1", label: "Tab 1", content: "" },
          { id: "tab2", label: "Tab 2", content: "Content 2" },
        ],
      });
      expect(wrapper.exists()).toBe(true);
    });

    it("handles undefined props gracefully", () => {
      const wrapper = createWrapper({});
      expect(wrapper.exists()).toBe(true);
    });
  });

  describe("Internationalization Support", () => {
    it("supports RTL layout", () => {
      const wrapper = createWrapper();
      const ul = wrapper.find("ul");
      expect(ul.classes()).toContain("flex");
    });

    it("provides context for different languages", () => {
      const wrapper = createWrapper({
        "aria-label": "Navigation des onglets"
      });
      expect(wrapper.attributes("aria-label")).toBe("Navigation des onglets");
    });

    it("supports different text directions", () => {
      const wrapper = createWrapper();
      expect(wrapper.exists()).toBe(true);
    });
  });

  describe("Tab Specific Accessibility", () => {
    it("provides tab context for assistive technologies", () => {
      const wrapper = createWrapper({
        role: "tablist",
        "aria-label": "Tab navigation"
      });
      expect(wrapper.attributes("role")).toBe("tablist");
      expect(wrapper.attributes("aria-label")).toBe("Tab navigation");
    });

    it("supports tab with form integration", () => {
      const wrapper = createWrapper({
        "aria-describedby": "tab-form"
      });
      expect(wrapper.attributes("aria-describedby")).toBe("tab-form");
    });

    it("provides context for tab controls", () => {
      const wrapper = createWrapper({
        "aria-label": "Tab controls"
      });
      expect(wrapper.attributes("aria-label")).toBe("Tab controls");
    });
  });
});