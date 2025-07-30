import { describe, it, expect, vi } from "vitest";
import { mount, VueWrapper } from "@vue/test-utils";
import Tabs from "../Tabs.vue";

describe("Tabs Component", () => {
  let wrapper: VueWrapper<any>;

  const mockTabs = [
    { id: "tab1", label: "Tab 1", content: "Content 1" },
    { id: "tab2", label: "Tab 2", content: "Content 2" },
    { id: "tab3", label: "Tab 3", content: "Content 3", disabled: true },
  ];

  // Helper function to create wrapper with default props
  const createWrapper = (props = {}) => {
    return mount(Tabs, {
      props: {
        tabs: mockTabs,
        modelValue: "tab1",
        ...props,
      },
    });
  };

  describe("Rendering", () => {
    it("renders tabs container", () => {
      wrapper = createWrapper();
      expect(wrapper.find(".tabs-container").exists()).toBe(true);
    });

    it("renders tab buttons for each tab", () => {
      wrapper = createWrapper();
      const tabButtons = wrapper.findAll("a");
      expect(tabButtons).toHaveLength(3);
    });

    it("renders tab labels", () => {
      wrapper = createWrapper();
      expect(wrapper.text()).toContain("Tab 1");
      expect(wrapper.text()).toContain("Tab 2");
      expect(wrapper.text()).toContain("Tab 3");
    });

    it("renders tab content", () => {
      wrapper = createWrapper();
      expect(wrapper.text()).toContain("Content 1");
    });

    it("shows only active tab content", () => {
      wrapper = createWrapper({ modelValue: "tab2" });
      expect(wrapper.text()).toContain("Content 2");
      expect(wrapper.text()).not.toContain("Content 1");
      expect(wrapper.text()).not.toContain("Content 3");
    });

    it("renders tab icons when provided", () => {
      const tabsWithIcons = [
        { id: "tab1", label: "Tab 1", icon: "IconHome" },
        { id: "tab2", label: "Tab 2", icon: "IconSettings" },
      ];
      wrapper = createWrapper({ tabs: tabsWithIcons });
      const iconSlots = wrapper.findAll("span");
      expect(iconSlots.length).toBeGreaterThan(0);
    });
  });

  describe("Props and Styling", () => {
    it("applies container class", () => {
      wrapper = createWrapper({ containerClass: "custom-container" });
      expect(wrapper.find(".tabs-container").classes()).toContain("custom-container");
    });

    it("applies default container class", () => {
      wrapper = createWrapper();
      expect(wrapper.find(".tabs-container").classes()).toContain("mb-5");
    });

    it("applies base tab list classes", () => {
      wrapper = createWrapper();
      const tabList = wrapper.find("ul");
      expect(tabList.classes()).toContain("flex");
      expect(tabList.classes()).toContain("flex-wrap");
      expect(tabList.classes()).toContain("border-b");
      expect(tabList.classes()).toContain("border-white-light");
      expect(tabList.classes()).toContain("dark:border-[#191e3a]");
    });

    it("applies base tab item classes", () => {
      wrapper = createWrapper();
      const tabItems = wrapper.findAll("li");
      tabItems.forEach((item) => {
        expect(item.classes()).toContain("flex-1");
      });
    });

    it("applies base tab button classes", () => {
      wrapper = createWrapper();
      const tabButtons = wrapper.findAll("a");
      tabButtons.forEach((button) => {
        expect(button.classes()).toContain("p-3.5");
        expect(button.classes()).toContain("py-2");
        expect(button.classes()).toContain("-mb-[1px]");
        expect(button.classes()).toContain("flex");
        expect(button.classes()).toContain("items-center");
        expect(button.classes()).toContain("border");
        expect(button.classes()).toContain("border-transparent");
        expect(button.classes()).toContain("hover:text-primary");
        expect(button.classes()).toContain("dark:hover:border-b-black");
      });
    });

    it("applies active tab styling", () => {
      wrapper = createWrapper({ modelValue: "tab2" });
      const activeButton = wrapper.find("a[href='javascript:']");
      expect(activeButton.classes()).toContain("!border-white-light");
      expect(activeButton.classes()).toContain("!border-b-white");
      expect(activeButton.classes()).toContain("text-primary");
      expect(activeButton.classes()).toContain("dark:!border-[#191e3a]");
      expect(activeButton.classes()).toContain("dark:!border-b-black");
    });

    it("applies disabled tab styling", () => {
      wrapper = createWrapper();
      const disabledButton = wrapper.findAll("a")[2]; // Third tab is disabled
      expect(disabledButton.classes()).toContain("pointer-events-none");
      expect(disabledButton.classes()).toContain("text-white-light");
      expect(disabledButton.classes()).toContain("dark:text-dark");
    });

    it("applies content container classes", () => {
      wrapper = createWrapper();
      const contentContainer = wrapper.find(".pt-5.flex-1.text-sm");
      expect(contentContainer.exists()).toBe(true);
    });
  });

  describe("Tab Interaction", () => {
    it("emits update:modelValue when tab is clicked", async () => {
      wrapper = createWrapper();
      const tabButton = wrapper.findAll("a")[1]; // Second tab
      await tabButton.trigger("click");
      expect(wrapper.emitted("update:modelValue")?.[0]).toEqual(["tab2"]);
    });

    it("does not emit event when disabled tab is clicked", async () => {
      wrapper = createWrapper();
      const disabledButton = wrapper.findAll("a")[2]; // Third tab is disabled
      await disabledButton.trigger("click");
      expect(wrapper.emitted("update:modelValue")).toBeFalsy();
    });

    it("updates active tab when modelValue changes", async () => {
      wrapper = createWrapper({ modelValue: "tab1" });
      await wrapper.setProps({ modelValue: "tab2" });
      const activeButton = wrapper.findAll("a")[1];
      expect(activeButton.classes()).toContain("text-primary");
    });
  });

  describe("Content Display", () => {
    it("shows content for active tab", () => {
      wrapper = createWrapper({ modelValue: "tab1" });
      expect(wrapper.text()).toContain("Content 1");
    });

    it("hides content for inactive tabs", () => {
      wrapper = createWrapper({ modelValue: "tab1" });
      expect(wrapper.text()).not.toContain("Content 2");
      expect(wrapper.text()).not.toContain("Content 3");
    });

    it("updates content when active tab changes", async () => {
      wrapper = createWrapper({ modelValue: "tab1" });
      await wrapper.setProps({ modelValue: "tab2" });
      expect(wrapper.text()).toContain("Content 2");
      expect(wrapper.text()).not.toContain("Content 1");
    });
  });

  describe("Icon Support", () => {
    it("renders icon slot when icon is provided", () => {
      const tabsWithIcons = [
        { id: "tab1", label: "Tab 1", icon: "IconHome" },
        { id: "tab2", label: "Tab 2", icon: "IconSettings" },
      ];
      wrapper = createWrapper({ tabs: tabsWithIcons });
      const iconSpans = wrapper.findAll("span");
      expect(iconSpans.length).toBeGreaterThan(0);
    });

    it("applies icon styling", () => {
      const tabsWithIcons = [
        { id: "tab1", label: "Tab 1", icon: "IconHome" },
      ];
      wrapper = createWrapper({ tabs: tabsWithIcons });
      const iconSpan = wrapper.find("span");
      expect(iconSpan.classes()).toContain("mr-2");
    });

    it("renders component icon when icon is an object", () => {
      const MockIcon = { template: '<div>Icon</div>' };
      const tabsWithComponentIcons = [
        { id: "tab1", label: "Tab 1", icon: MockIcon },
      ];
      wrapper = createWrapper({ tabs: tabsWithComponentIcons });
      expect(wrapper.text()).toContain("Icon");
    });
  });

  describe("Slot Support", () => {
    it("renders custom content via slots", () => {
      wrapper = createWrapper({}, {
        "content-tab1": '<div data-test="custom-content">Custom Content</div>'
      });
      expect(wrapper.find('[data-test="custom-content"]').exists()).toBe(true);
    });

    it("renders custom icon via slots", () => {
      wrapper = createWrapper({}, {
        "icon-tab1": '<div data-test="custom-icon">Custom Icon</div>'
      });
      expect(wrapper.find('[data-test="custom-icon"]').exists()).toBe(true);
    });

    it("prioritizes slot content over default content", () => {
      wrapper = createWrapper({}, {
        "content-tab1": '<div data-test="slot-content">Slot Content</div>'
      });
      expect(wrapper.find('[data-test="slot-content"]').exists()).toBe(true);
      expect(wrapper.text()).toContain("Slot Content");
    });
  });

  describe("Accessibility", () => {
    it("has proper tab structure", () => {
      wrapper = createWrapper();
      const tabList = wrapper.find("ul");
      const tabItems = wrapper.findAll("li");
      expect(tabList.exists()).toBe(true);
      expect(tabItems).toHaveLength(3);
    });

    it("has proper tab button attributes", () => {
      wrapper = createWrapper();
      const tabButtons = wrapper.findAll("a");
      tabButtons.forEach((button) => {
        expect(button.attributes("href")).toBe("javascript:");
      });
    });

    it("disables pointer events for disabled tabs", () => {
      wrapper = createWrapper();
      const disabledButton = wrapper.findAll("a")[2];
      expect(disabledButton.classes()).toContain("pointer-events-none");
    });
  });

  describe("Dark Theme Support", () => {
    it("applies dark theme classes to tab list", () => {
      wrapper = createWrapper();
      const tabList = wrapper.find("ul");
      expect(tabList.classes()).toContain("dark:border-[#191e3a]");
    });

    it("applies dark theme classes to tab buttons", () => {
      wrapper = createWrapper();
      const tabButtons = wrapper.findAll("a");
      tabButtons.forEach((button) => {
        expect(button.classes()).toContain("dark:hover:border-b-black");
      });
    });

    it("applies dark theme classes to active tab", () => {
      wrapper = createWrapper({ modelValue: "tab1" });
      const activeButton = wrapper.find("a");
      expect(activeButton.classes()).toContain("dark:!border-[#191e3a]");
      expect(activeButton.classes()).toContain("dark:!border-b-black");
    });

    it("applies dark theme classes to disabled tab", () => {
      wrapper = createWrapper();
      const disabledButton = wrapper.findAll("a")[2];
      expect(disabledButton.classes()).toContain("dark:text-dark");
    });
  });

  describe("Edge Cases", () => {
    it("handles empty tabs array", () => {
      wrapper = createWrapper({ tabs: [] });
      expect(wrapper.find("ul").exists()).toBe(true);
      expect(wrapper.findAll("li")).toHaveLength(0);
    });

    it("handles undefined modelValue", () => {
      wrapper = createWrapper({ modelValue: undefined as any });
      expect(wrapper.find(".tabs-container").exists()).toBe(true);
    });

    it("handles non-existent active tab", () => {
      wrapper = createWrapper({ modelValue: "non-existent" });
      expect(wrapper.find(".tabs-container").exists()).toBe(true);
    });

    it("handles tabs without content", () => {
      const tabsWithoutContent = [
        { id: "tab1", label: "Tab 1" },
        { id: "tab2", label: "Tab 2" },
      ];
      wrapper = createWrapper({ tabs: tabsWithoutContent });
      expect(wrapper.find(".tabs-container").exists()).toBe(true);
    });

    it("handles tabs without icons", () => {
      const tabsWithoutIcons = [
        { id: "tab1", label: "Tab 1", content: "Content 1" },
        { id: "tab2", label: "Tab 2", content: "Content 2" },
      ];
      wrapper = createWrapper({ tabs: tabsWithoutIcons });
      expect(wrapper.find(".tabs-container").exists()).toBe(true);
    });
  });

  describe("Default Values", () => {
    it("uses correct default values", () => {
      wrapper = createWrapper();
      expect(wrapper.props("containerClass")).toBe("mb-5");
    });
  });

  describe("Required Props", () => {
    it("requires tabs prop", () => {
      wrapper = createWrapper();
      expect(wrapper.props("tabs")).toEqual(mockTabs);
    });

    it("requires modelValue prop", () => {
      wrapper = createWrapper();
      expect(wrapper.props("modelValue")).toBe("tab1");
    });
  });

  describe("Tab Item Interface", () => {
    it("supports all TabItem properties", () => {
      const complexTabs = [
        { 
          id: "tab1", 
          label: "Tab 1", 
          icon: "IconHome", 
          content: "Content 1", 
          disabled: false 
        },
        { 
          id: "tab2", 
          label: "Tab 2", 
          icon: "IconSettings", 
          content: "Content 2", 
          disabled: true 
        },
      ];
      wrapper = createWrapper({ tabs: complexTabs });
      expect(wrapper.find(".tabs-container").exists()).toBe(true);
    });
  });
});