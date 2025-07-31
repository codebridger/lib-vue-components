import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import Tabs from "../Tabs.vue";

describe("Tabs Component", () => {
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

  describe("Rendering", () => {
    it("renders as div element by default", () => {
      const wrapper = createWrapper();
      expect(wrapper.find("div").exists()).toBe(true);
    });

    it("renders with default classes", () => {
      const wrapper = createWrapper();
      expect(wrapper.classes()).toContain("tabs-container");
      expect(wrapper.classes()).toContain("mb-5");
    });

    it("renders with custom class", () => {
      const wrapper = createWrapper({ containerClass: "custom-tabs" });
      expect(wrapper.classes()).toContain("custom-tabs");
    });

    it("renders tab buttons", () => {
      const wrapper = createWrapper();
      const tabButtons = wrapper.findAll("a");
      expect(tabButtons.length).toBe(3);
      expect(tabButtons[0].text()).toContain("Tab 1");
      expect(tabButtons[1].text()).toContain("Tab 2");
      expect(tabButtons[2].text()).toContain("Tab 3");
    });

    it("renders tab content", () => {
      const wrapper = createWrapper();
      expect(wrapper.text()).toContain("Content 1");
    });
  });

  describe("Props and Styling", () => {
    it("applies active tab styling", () => {
      const wrapper = createWrapper({ modelValue: "tab2" });
      const tabButtons = wrapper.findAll("a");
      expect(tabButtons[1].classes()).toContain("text-primary");
    });

    it("applies disabled tab styling", () => {
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

    it("shows active tab content", () => {
      const wrapper = createWrapper({ modelValue: "tab2" });
      expect(wrapper.text()).toContain("Content 2");
      // All content is rendered but only active tab is visible due to v-show
      expect(wrapper.text()).toContain("Content 1");
      expect(wrapper.text()).toContain("Content 3");
    });

    it("handles empty tabs array", () => {
      const wrapper = createWrapper({ tabs: [] });
      const tabButtons = wrapper.findAll("a");
      expect(tabButtons.length).toBe(0);
    });

    it("handles single tab", () => {
      const wrapper = createWrapper({
        tabs: [{ id: "tab1", label: "Single Tab", content: "Single Content" }],
      });
      const tabButtons = wrapper.findAll("a");
      expect(tabButtons.length).toBe(1);
      expect(tabButtons[0].text()).toContain("Single Tab");
    });
  });

  describe("Tab Navigation", () => {
    it("emits update:modelValue when tab is clicked", async () => {
      const wrapper = createWrapper();
      const tabButtons = wrapper.findAll("a");

      await tabButtons[1].trigger("click");

      expect(wrapper.emitted("update:modelValue")).toBeTruthy();
      expect(wrapper.emitted("update:modelValue")[0]).toEqual(["tab2"]);
    });

    it("does not emit when disabled tab is clicked", async () => {
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

    it("navigates between tabs correctly", async () => {
      const wrapper = createWrapper();
      const tabButtons = wrapper.findAll("a");

      // Click second tab
      await tabButtons[1].trigger("click");
      expect(wrapper.emitted("update:modelValue")[0]).toEqual(["tab2"]);

      // Click third tab
      await tabButtons[2].trigger("click");
      expect(wrapper.emitted("update:modelValue")[1]).toEqual(["tab3"]);
    });
  });

  describe("Tab Content", () => {
    it("renders default content", () => {
      const wrapper = createWrapper();
      expect(wrapper.text()).toContain("Content 1");
    });

    it("renders custom content via slots", () => {
      const wrapper = createWrapper({}, {
        "content-tab1": "<div>Custom Content 1</div>",
        "content-tab2": "<div>Custom Content 2</div>",
      });
      expect(wrapper.text()).toContain("Custom Content 1");
    });

    it("switches content when active tab changes", async () => {
      const wrapper = createWrapper({}, {
        "content-tab1": "<div>Custom Content 1</div>",
        "content-tab2": "<div>Custom Content 2</div>",
      });

      // Initially shows first tab content
      expect(wrapper.text()).toContain("Custom Content 1");
      expect(wrapper.text()).toContain("Custom Content 2");

      // Change to second tab
      await wrapper.setProps({ modelValue: "tab2" });
      expect(wrapper.text()).toContain("Custom Content 2");
      expect(wrapper.text()).toContain("Custom Content 1");
    });

    it("handles tabs without content", () => {
      const wrapper = createWrapper({
        tabs: [
          { id: "tab1", label: "Tab 1" },
          { id: "tab2", label: "Tab 2" },
        ],
      });
      expect(wrapper.text()).toContain("Tab 1");
      expect(wrapper.text()).toContain("Tab 2");
    });
  });

  describe("Tab Icons", () => {
    it("renders icon when provided", () => {
      const wrapper = createWrapper({
        tabs: [
          { id: "tab1", label: "Tab 1", content: "Content 1", icon: "IconHome" },
          { id: "tab2", label: "Tab 2", content: "Content 2" },
        ],
      });
      const firstTab = wrapper.findAll("a")[0];
      expect(firstTab.find("span").exists()).toBe(true);
    });

    it("renders custom icon via slots", () => {
      const wrapper = createWrapper({
        tabs: [
          { id: "tab1", label: "Tab 1", content: "Content 1", icon: "IconHome" },
        ],
      }, {
        "icon-tab1": "<span>Custom Icon</span>",
      });
      expect(wrapper.text()).toContain("Custom Icon");
    });

    it("handles tabs without icons", () => {
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

  describe("Tab States", () => {
    it("handles disabled tabs", () => {
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

    it("handles mixed disabled and enabled tabs", () => {
      const wrapper = createWrapper({
        tabs: [
          { id: "tab1", label: "Tab 1", content: "Content 1", disabled: true },
          { id: "tab2", label: "Tab 2", content: "Content 2" },
          { id: "tab3", label: "Tab 3", content: "Content 3", disabled: true },
        ],
      });
      const tabButtons = wrapper.findAll("a");
      expect(tabButtons[0].classes()).toContain("pointer-events-none");
      expect(tabButtons[1].classes()).not.toContain("pointer-events-none");
      expect(tabButtons[2].classes()).toContain("pointer-events-none");
    });

    it("allows clicking enabled tabs when some are disabled", async () => {
      const wrapper = createWrapper({
        tabs: [
          { id: "tab1", label: "Tab 1", content: "Content 1", disabled: true },
          { id: "tab2", label: "Tab 2", content: "Content 2" },
          { id: "tab3", label: "Tab 3", content: "Content 3", disabled: true },
        ],
      });
      const tabButtons = wrapper.findAll("a");

      await tabButtons[1].trigger("click");

      expect(wrapper.emitted("update:modelValue")).toBeTruthy();
      expect(wrapper.emitted("update:modelValue")[0]).toEqual(["tab2"]);
    });
  });

  describe("Edge Cases", () => {
    it("handles undefined modelValue", () => {
      const wrapper = createWrapper({ modelValue: undefined });
      expect(wrapper.exists()).toBe(true);
    });

    it("handles modelValue that doesn't match any tab", () => {
      const wrapper = createWrapper({ modelValue: "nonexistent" });
      expect(wrapper.exists()).toBe(true);
      // No tab should be active
      const tabButtons = wrapper.findAll("a");
      tabButtons.forEach(button => {
        expect(button.classes()).not.toContain("text-primary");
      });
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

    it("handles very long tab labels", () => {
      const longLabel = "This is a very long tab label that might wrap to multiple lines";
      const wrapper = createWrapper({
        tabs: [
          { id: "tab1", label: longLabel, content: "Content 1" },
          { id: "tab2", label: "Tab 2", content: "Content 2" },
        ],
      });
      expect(wrapper.text()).toContain(longLabel);
    });

    it("handles special characters in tab labels", () => {
      const wrapper = createWrapper({
        tabs: [
          { id: "tab1", label: "Tab & Content", content: "Content 1" },
          { id: "tab2", label: "Tab < 2 >", content: "Content 2" },
        ],
      });
      expect(wrapper.text()).toContain("Tab & Content");
      expect(wrapper.text()).toContain("Tab < 2 >");
    });
  });

  describe("Accessibility", () => {
    it("supports aria-label", () => {
      const wrapper = createWrapper({ "aria-label": "Tab navigation" });
      expect(wrapper.attributes("aria-label")).toBe("Tab navigation");
    });

    it("supports role attribute", () => {
      const wrapper = createWrapper({ role: "tablist" });
      expect(wrapper.attributes("role")).toBe("tablist");
    });

    it("supports tabindex", () => {
      const wrapper = createWrapper({ tabindex: "0" });
      expect(wrapper.attributes("tabindex")).toBe("0");
    });
  });
});
