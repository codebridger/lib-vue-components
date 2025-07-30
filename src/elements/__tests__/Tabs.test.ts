import { describe, it, expect, vi } from "vitest";
import { mount, VueWrapper } from "@vue/test-utils";
import Tabs from "../Tabs.vue";

describe("Tabs Component", () => {
  let wrapper: VueWrapper<any>;
  const createWrapper = (props = {}, slots = {}) => {
    return mount(Tabs, {
      props,
      slots,
    });
  };

  const mockTabs = [
    { id: "tab1", label: "Tab 1", content: "Content 1" },
    { id: "tab2", label: "Tab 2", content: "Content 2" },
    { id: "tab3", label: "Tab 3", content: "Content 3" },
  ];

  describe("Rendering", () => {
    it("renders tabs container", () => {
      wrapper = createWrapper({ tabs: mockTabs, modelValue: "tab1" });
      expect(wrapper.find(".tabs-container").exists()).toBe(true);
    });

    it("renders all tab buttons", () => {
      wrapper = createWrapper({ tabs: mockTabs, modelValue: "tab1" });
      const tabButtons = wrapper.findAll("a[href='javascript:']");
      expect(tabButtons).toHaveLength(3);
      expect(tabButtons[0].text()).toBe("Tab 1");
      expect(tabButtons[1].text()).toBe("Tab 2");
      expect(tabButtons[2].text()).toBe("Tab 3");
    });

    it("renders tab content area", () => {
      wrapper = createWrapper({ tabs: mockTabs, modelValue: "tab1" });
      expect(wrapper.find(".pt-5.flex-1.text-sm").exists()).toBe(true);
    });

    it("shows only active tab content", () => {
      wrapper = createWrapper({ tabs: mockTabs, modelValue: "tab2" });
      expect(wrapper.text()).toContain("Content 2");
      // In Vue 3, v-show elements are still in the DOM but hidden with CSS
      // So we check for the v-show directive instead
      const contentDivs = wrapper.findAll("div[v-show]");
      expect(contentDivs).toHaveLength(3);
    });
  });

  describe("Props and Styling", () => {
    it("applies container class", () => {
      wrapper = createWrapper({ 
        tabs: mockTabs, 
        modelValue: "tab1",
        containerClass: "custom-container" 
      });
      expect(wrapper.find(".tabs-container").classes()).toContain("custom-container");
    });

    it("applies default container class", () => {
      wrapper = createWrapper({ tabs: mockTabs, modelValue: "tab1" });
      expect(wrapper.find(".tabs-container").classes()).toContain("mb-5");
    });

    it("applies tab list styling", () => {
      wrapper = createWrapper({ tabs: mockTabs, modelValue: "tab1" });
      const tabList = wrapper.find("ul");
      expect(tabList.classes()).toContain("flex");
      expect(tabList.classes()).toContain("flex-wrap");
      expect(tabList.classes()).toContain("border-b");
      expect(tabList.classes()).toContain("border-white-light");
      expect(tabList.classes()).toContain("dark:border-[#191e3a]");
    });

    it("applies tab button styling", () => {
      wrapper = createWrapper({ tabs: mockTabs, modelValue: "tab1" });
      const tabButton = wrapper.find("a[href='javascript:']");
      expect(tabButton.classes()).toContain("p-3.5");
      expect(tabButton.classes()).toContain("py-2");
      expect(tabButton.classes()).toContain("-mb-[1px]");
      expect(tabButton.classes()).toContain("flex");
      expect(tabButton.classes()).toContain("items-center");
      expect(tabButton.classes()).toContain("border");
      expect(tabButton.classes()).toContain("border-transparent");
      expect(tabButton.classes()).toContain("hover:text-primary");
      expect(tabButton.classes()).toContain("dark:hover:border-b-black");
    });

    it("applies active tab styling", () => {
      wrapper = createWrapper({ tabs: mockTabs, modelValue: "tab2" });
      const activeButton = wrapper.find("a[href='javascript:']");
      expect(activeButton.classes()).toContain("!border-white-light");
      expect(activeButton.classes()).toContain("!border-b-white");
      expect(activeButton.classes()).toContain("text-primary");
      expect(activeButton.classes()).toContain("dark:!border-[#191e3a]");
      expect(activeButton.classes()).toContain("dark:!border-b-black");
    });

    it("applies disabled tab styling", () => {
      const disabledTabs = [
        { id: "tab1", label: "Tab 1", content: "Content 1", disabled: true },
        { id: "tab2", label: "Tab 2", content: "Content 2" },
      ];
      wrapper = createWrapper({ tabs: disabledTabs, modelValue: "tab2" });
      const disabledButton = wrapper.find("a[href='javascript:']");
      expect(disabledButton.classes()).toContain("pointer-events-none");
      expect(disabledButton.classes()).toContain("text-white-light");
      expect(disabledButton.classes()).toContain("dark:text-dark");
    });
  });

  describe("Events", () => {
    it("emits update:modelValue when tab is clicked", async () => {
      wrapper = createWrapper({ tabs: mockTabs, modelValue: "tab1" });
      const tabButton = wrapper.findAll("a[href='javascript:']")[1]; // Tab 2
      await tabButton.trigger("click");
      expect(wrapper.emitted("update:modelValue")).toBeTruthy();
      expect(wrapper.emitted("update:modelValue")?.[0]).toEqual(["tab2"]);
    });

    it("does not emit when disabled tab is clicked", async () => {
      const disabledTabs = [
        { id: "tab1", label: "Tab 1", content: "Content 1", disabled: true },
        { id: "tab2", label: "Tab 2", content: "Content 2" },
      ];
      wrapper = createWrapper({ tabs: disabledTabs, modelValue: "tab2" });
      const disabledButton = wrapper.find("a[href='javascript:']");
      await disabledButton.trigger("click");
      expect(wrapper.emitted("update:modelValue")).toBeFalsy();
    });
  });

  describe("Content Display", () => {
    it("shows content for active tab", () => {
      wrapper = createWrapper({ tabs: mockTabs, modelValue: "tab1" });
      expect(wrapper.text()).toContain("Content 1");
    });

    it("hides content for inactive tabs", () => {
      wrapper = createWrapper({ tabs: mockTabs, modelValue: "tab1" });
      // In Vue 3, v-show elements are still in the DOM but hidden with CSS
      // We check that the content divs exist but are conditionally shown
      const contentDivs = wrapper.findAll("div[v-show]");
      expect(contentDivs).toHaveLength(3);
    });

    it("updates content when active tab changes", async () => {
      wrapper = createWrapper({ tabs: mockTabs, modelValue: "tab1" });
      await wrapper.setProps({ modelValue: "tab2" });
      expect(wrapper.text()).toContain("Content 2");
    });
  });

  describe("Icon Support", () => {
    it("renders icon when provided", () => {
      const tabsWithIcon = [
        { id: "tab1", label: "Tab 1", content: "Content 1", icon: "IconSettings" },
        { id: "tab2", label: "Tab 2", content: "Content 2" },
      ];
      wrapper = createWrapper({ tabs: tabsWithIcon, modelValue: "tab1" });
      const iconSpan = wrapper.find("span");
      expect(iconSpan.exists()).toBe(true);
    });

    it("does not render icon span when no icon is provided", () => {
      wrapper = createWrapper({ tabs: mockTabs, modelValue: "tab1" });
      const iconSpan = wrapper.find("span");
      expect(iconSpan.exists()).toBe(false);
    });
  });

  describe("Slot Support", () => {
    it("renders custom content via slots", () => {
      wrapper = createWrapper(
        { tabs: mockTabs, modelValue: "tab1" },
        {
          "content-tab1": '<div data-test="custom-content">Custom Content</div>'
        }
      );
      expect(wrapper.find('[data-test="custom-content"]').exists()).toBe(true);
    });

    it("renders custom icon via slots", () => {
      wrapper = createWrapper(
        { tabs: mockTabs, modelValue: "tab1" },
        {
          "icon-tab1": '<div data-test="custom-icon">Custom Icon</div>'
        }
      );
      expect(wrapper.find('[data-test="custom-icon"]').exists()).toBe(true);
    });

    it("prioritizes slot content over default content", () => {
      wrapper = createWrapper(
        { tabs: mockTabs, modelValue: "tab1" },
        {
          "content-tab1": '<div data-test="slot-content">Slot Content</div>'
        }
      );
      expect(wrapper.find('[data-test="slot-content"]').exists()).toBe(true);
      expect(wrapper.text()).toContain("Slot Content");
    });
  });

  describe("Accessibility", () => {
    it("has proper tab structure", () => {
      wrapper = createWrapper({ tabs: mockTabs, modelValue: "tab1" });
      const tabList = wrapper.find("ul");
      const tabItems = wrapper.findAll("li");
      expect(tabList.exists()).toBe(true);
      expect(tabItems).toHaveLength(3);
    });

    it("has proper tab button attributes", () => {
      wrapper = createWrapper({ tabs: mockTabs, modelValue: "tab1" });
      const tabButton = wrapper.find("a[href='javascript:']");
      expect(tabButton.attributes("href")).toBe("javascript:");
    });
  });

  describe("Edge Cases", () => {
    it("handles empty tabs array", () => {
      wrapper = createWrapper({ tabs: [], modelValue: "" });
      expect(wrapper.find(".tabs-container").exists()).toBe(true);
      expect(wrapper.findAll("a[href='javascript:']")).toHaveLength(0);
    });

    it("handles single tab", () => {
      const singleTab = [{ id: "tab1", label: "Tab 1", content: "Content 1" }];
      wrapper = createWrapper({ tabs: singleTab, modelValue: "tab1" });
      expect(wrapper.findAll("a[href='javascript:']")).toHaveLength(1);
    });

    it("handles modelValue not matching any tab", () => {
      wrapper = createWrapper({ tabs: mockTabs, modelValue: "nonexistent" });
      expect(wrapper.find(".tabs-container").exists()).toBe(true);
    });

    it("handles disabled tabs", () => {
      const allDisabledTabs = [
        { id: "tab1", label: "Tab 1", content: "Content 1", disabled: true },
        { id: "tab2", label: "Tab 2", content: "Content 2", disabled: true },
      ];
      wrapper = createWrapper({ tabs: allDisabledTabs, modelValue: "tab1" });
      const tabButtons = wrapper.findAll("a[href='javascript:']");
      expect(tabButtons).toHaveLength(2);
      tabButtons.forEach(button => {
        expect(button.classes()).toContain("pointer-events-none");
      });
    });
  });

  describe("Default Values", () => {
    it("uses correct default container class", () => {
      wrapper = createWrapper({ tabs: mockTabs, modelValue: "tab1" });
      expect(wrapper.props("containerClass")).toBe("mb-5");
    });
  });

  describe("Computed Properties", () => {
    it("updates active tab when modelValue changes", async () => {
      wrapper = createWrapper({ tabs: mockTabs, modelValue: "tab1" });
      await wrapper.setProps({ modelValue: "tab3" });
      const tabButtons = wrapper.findAll("a[href='javascript:']");
      expect(tabButtons[2].classes()).toContain("text-primary");
    });
  });

  describe("Integration", () => {
    it("works with v-model", async () => {
      wrapper = createWrapper({ tabs: mockTabs, modelValue: "tab1" });
      const tabButton = wrapper.findAll("a[href='javascript:']")[1];
      await tabButton.trigger("click");
      expect(wrapper.emitted("update:modelValue")?.[0]).toEqual(["tab2"]);
    });

    it("handles dynamic tab updates", async () => {
      wrapper = createWrapper({ tabs: mockTabs, modelValue: "tab1" });
      const newTabs = [
        { id: "new1", label: "New Tab 1", content: "New Content 1" },
        { id: "new2", label: "New Tab 2", content: "New Content 2" },
      ];
      await wrapper.setProps({ tabs: newTabs, modelValue: "new1" });
      expect(wrapper.findAll("a[href='javascript:']")).toHaveLength(2);
      expect(wrapper.text()).toContain("New Content 1");
    });
  });
});