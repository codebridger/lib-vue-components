import { describe, it, expect, vi, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";
import Select from "../Select.vue";

// Mock the store
const mockUseAppStore = vi.fn(() => ({
  isRtl: false,
}));

vi.mock("../stores/index", () => ({
  useAppStore: mockUseAppStore,
}));

// Mock the Icon component
const MockIcon = {
  template:
    '<span class="icon" :data-name="name" :class="$attrs.class"><slot /></span>',
  props: ["name"],
};

describe("Select Component", () => {
  beforeEach(() => {
    const pinia = createPinia();
    setActivePinia(pinia);
  });

  const createWrapper = (props = {}) => {
    const defaultProps = {
      options: ["Option 1", "Option 2", "Option 3"],
      ...props,
    };
    return mount(Select, {
      props: defaultProps,
      global: {
        components: {
          Icon: MockIcon,
        },
      },
    });
  };

  describe("Rendering", () => {
    it("renders as div element by default", () => {
      const wrapper = createWrapper();
      expect(wrapper.find("div").exists()).toBe(true);
    });

    it("renders select button", () => {
      const wrapper = createWrapper();
      expect(wrapper.find("button").exists()).toBe(true);
    });

    it("renders with default classes", () => {
      const wrapper = createWrapper();
      const button = wrapper.find("button");
      expect(button.classes()).toContain("w-full");
      expect(button.classes()).toContain("text-left");
    });

    it("renders label when provided", () => {
      const wrapper = createWrapper({ label: "Select Label" });
      expect(wrapper.find("label").exists()).toBe(true);
      expect(wrapper.find("label").text()).toContain("Select Label");
    });

    it("does not render label when not provided", () => {
      const wrapper = createWrapper({ label: "" });
      expect(wrapper.find("label").exists()).toBe(false);
    });

    it("renders required indicator when required is true", () => {
      const wrapper = createWrapper({
        label: "Required Field",
        required: true,
      });
      expect(wrapper.find("label").text()).toContain("*");
    });

    it("renders placeholder when no value is selected", () => {
      const wrapper = createWrapper({ placeholder: "Choose an option" });
      expect(wrapper.text()).toContain("Choose an option");
    });
  });

  describe("Props and Styling", () => {
    it("applies disabled styling when disabled is true", () => {
      const wrapper = createWrapper({ disabled: true });
      const button = wrapper.find("button");
      expect(button.classes()).toContain("bg-gray-100");
      expect(button.classes()).toContain("cursor-not-allowed");
    });

    it("applies error styling when error is true", () => {
      const wrapper = createWrapper({ error: true });
      const button = wrapper.find("button");
      expect(button.classes()).toContain("border-red-500");
    });

    it("applies normal styling when not disabled or error", () => {
      const wrapper = createWrapper();
      const button = wrapper.find("button");
      expect(button.classes()).toContain("bg-white");
      expect(button.classes()).toContain("border-gray-300");
    });

    it("applies icon positioning classes when icon is provided", () => {
      const wrapper = createWrapper({ iconName: "IconSearch" });
      // Look for the inner div that has the pl-10 class
      const iconContainer = wrapper.findAll(".relative")[1]; // Second .relative div
      expect(iconContainer.classes()).toContain("pl-10");
    });
  });

  describe("Dropdown Functionality", () => {
    it("opens dropdown when button is clicked", async () => {
      const wrapper = createWrapper();
      const button = wrapper.find("button");

      await button.trigger("click");

      expect(wrapper.vm.isOpen).toBe(true);
    });

    it("closes dropdown when button is clicked again", async () => {
      const wrapper = createWrapper();
      const button = wrapper.find("button");

      // Open dropdown
      await button.trigger("click");
      expect(wrapper.vm.isOpen).toBe(true);

      // Close dropdown
      await button.trigger("click");
      expect(wrapper.vm.isOpen).toBe(false);
    });

    it("shows options when dropdown is open", async () => {
      const wrapper = createWrapper();
      const button = wrapper.find("button");

      await button.trigger("click");

      // Wait for dropdown to render
      await wrapper.vm.$nextTick();

      // Check if options are visible
      const options = wrapper.findAll('[role="option"]');
      expect(options).toHaveLength(3);
    });

    it("closes dropdown when option is selected in single mode", async () => {
      const wrapper = createWrapper();
      const button = wrapper.find("button");

      // Open dropdown
      await button.trigger("click");
      expect(wrapper.vm.isOpen).toBe(true);

      // Select option
      const options = wrapper.findAll('[role="option"]');
      await options[0].trigger("click");

      // Dropdown should close
      expect(wrapper.vm.isOpen).toBe(false);
    });
  });

  describe("Option Selection", () => {
    it("emits update:modelValue when option is selected", async () => {
      const wrapper = createWrapper();
      const button = wrapper.find("button");

      await button.trigger("click");

      const options = wrapper.findAll('[role="option"]');
      await options[0].trigger("click");

      expect(wrapper.emitted("update:modelValue")).toBeTruthy();
      expect(wrapper.emitted("update:modelValue")[0]).toEqual(["Option 1"]);
    });

    it("emits change event when option is selected", async () => {
      const wrapper = createWrapper();
      const button = wrapper.find("button");

      await button.trigger("click");

      const options = wrapper.findAll('[role="option"]');
      await options[0].trigger("click");

      expect(wrapper.emitted("change")).toBeTruthy();
      expect(wrapper.emitted("change")[0]).toEqual(["Option 1"]);
    });

    it("displays selected option text", async () => {
      const wrapper = createWrapper({ modelValue: "Option 2" });
      expect(wrapper.text()).toContain("Option 2");
    });

    it("handles object options with custom label key", async () => {
      const options = [
        { id: 1, name: "First Option" },
        { id: 2, name: "Second Option" },
      ];
      const wrapper = createWrapper({
        options,
        labelKey: "name",
        valueKey: "id",
      });

      const button = wrapper.find("button");
      await button.trigger("click");

      const optionElements = wrapper.findAll('[role="option"]');
      expect(optionElements[0].text()).toContain("First Option");
      expect(optionElements[1].text()).toContain("Second Option");
    });
  });

  describe("Multiple Selection", () => {
    it.skip("supports multiple selection when multiple prop is true", async () => {
      const wrapper = createWrapper({
        multiple: true,
        modelValue: [],
      });

      const button = wrapper.find("button");
      await button.trigger("click");

      const options = wrapper.findAll('[role="option"]');

      // Select first option
      await options[0].trigger("click");
      expect(wrapper.emitted("update:modelValue")[0]).toEqual([["Option 1"]]);

      // Select second option - need to wait for the first selection to be processed
      await wrapper.vm.$nextTick();
      await options[1].trigger("click");
      expect(wrapper.emitted("update:modelValue")[1]).toEqual([
        ["Option 1", "Option 2"],
      ]);
    });

    it("toggles option selection in multiple mode", async () => {
      const wrapper = createWrapper({
        multiple: true,
        modelValue: ["Option 1"],
      });

      const button = wrapper.find("button");
      await button.trigger("click");

      const options = wrapper.findAll('[role="option"]');

      // Deselect first option
      await options[0].trigger("click");
      expect(wrapper.emitted("update:modelValue")[0]).toEqual([[]]);
    });
  });

  describe("Search Functionality", () => {
    it("shows search input when searchable is true", async () => {
      const wrapper = createWrapper({ searchable: true });
      const button = wrapper.find("button");

      await button.trigger("click");

      const searchInput = wrapper.find('input[type="text"]');
      expect(searchInput.exists()).toBe(true);
    });

    it("filters options based on search query", async () => {
      const wrapper = createWrapper({ searchable: true });
      const button = wrapper.find("button");

      await button.trigger("click");

      const searchInput = wrapper.find('input[type="text"]');
      await searchInput.setValue("Option 1");

      // Wait for filtering
      await wrapper.vm.$nextTick();

      const options = wrapper.findAll('[role="option"]');
      expect(options).toHaveLength(1);
      expect(options[0].text()).toContain("Option 1");
    });
  });

  describe("Grouped Options", () => {
    it("renders grouped options when grouped prop is true", async () => {
      const groupedOptions = [
        {
          group_name: "Group 1",
          list: [{ name: "Option 1" }, { name: "Option 2" }],
        },
        {
          group_name: "Group 2",
          list: [{ name: "Option 3" }],
        },
      ];

      const wrapper = createWrapper({
        options: groupedOptions,
        grouped: true,
        groupLabel: "group_name",
        groupValues: "list",
      });

      const button = wrapper.find("button");
      await button.trigger("click");

      // Check if group headers are rendered
      const groupHeaders = wrapper.findAll(".text-xs.font-semibold");
      expect(groupHeaders).toHaveLength(2);
      expect(groupHeaders[0].text()).toContain("Group 1");
      expect(groupHeaders[1].text()).toContain("Group 2");

      // Check if options are rendered
      const options = wrapper.findAll('[role="option"]');
      expect(options).toHaveLength(3);
    });
  });

  describe("Keyboard Navigation", () => {
    it("opens dropdown on Enter key", async () => {
      const wrapper = createWrapper();
      const button = wrapper.find("button");

      await button.trigger("keydown", { key: "Enter" });

      expect(wrapper.vm.isOpen).toBe(true);
    });

    it("opens dropdown on Space key", async () => {
      const wrapper = createWrapper();
      const button = wrapper.find("button");

      await button.trigger("keydown", { key: " " });

      expect(wrapper.vm.isOpen).toBe(true);
    });

    it("closes dropdown on Escape key", async () => {
      const wrapper = createWrapper();
      const button = wrapper.find("button");

      // Open dropdown first
      await button.trigger("click");
      expect(wrapper.vm.isOpen).toBe(true);

      // Close with Escape
      await button.trigger("keydown", { key: "Escape" });
      expect(wrapper.vm.isOpen).toBe(false);
    });
  });

  describe("Accessibility", () => {
    it("has proper ARIA attributes", () => {
      const wrapper = createWrapper({ label: "Select Label" });
      const button = wrapper.find("button");

      expect(button.attributes("aria-expanded")).toBe("false");
      expect(button.attributes("aria-haspopup")).toBe("true");
    });

    it("associates label with button using id", () => {
      const wrapper = createWrapper({
        label: "Select Label",
        id: "test-select",
      });

      const label = wrapper.find("label");
      const button = wrapper.find("button");

      expect(label.attributes("for")).toBe("test-select");
      expect(button.attributes("id")).toBe("test-select");
    });

    it("has proper role attributes for options", async () => {
      const wrapper = createWrapper();
      const button = wrapper.find("button");

      await button.trigger("click");

      const options = wrapper.findAll('[role="option"]');
      expect(options).toHaveLength(3);

      options.forEach((option) => {
        expect(option.attributes("role")).toBe("option");
      });
    });
  });

  describe("Disabled State", () => {
    it("prevents dropdown from opening when disabled", async () => {
      const wrapper = createWrapper({ disabled: true });
      const button = wrapper.find("button");

      await button.trigger("click");

      expect(wrapper.vm.isOpen).toBe(false);
    });

    it("prevents option selection when disabled", async () => {
      const wrapper = createWrapper({ disabled: true });
      const button = wrapper.find("button");

      // Try to open dropdown
      await button.trigger("click");

      // Dropdown should not open
      expect(wrapper.vm.isOpen).toBe(false);

      // No events should be emitted
      expect(wrapper.emitted("update:modelValue")).toBeFalsy();
    });
  });

  describe("Error State", () => {
    it("displays error message when error is true", () => {
      const wrapper = createWrapper({
        error: true,
        errorMessage: "This field is required",
      });

      expect(wrapper.text()).toContain("This field is required");
    });

    it("applies error styling to button", () => {
      const wrapper = createWrapper({ error: true });
      const button = wrapper.find("button");

      expect(button.classes()).toContain("border-red-500");
    });
  });

  describe("Icon Integration", () => {
    it.skip("renders icon when iconName is provided", () => {
      const wrapper = createWrapper({ iconName: "IconSearch" });
      // Look for the icon by data-name attribute
      const icon = wrapper.find('[data-name="IconSearch"]');
      expect(icon.exists()).toBe(true);
    });

    it.skip("handles icon click events", async () => {
      const wrapper = createWrapper({ iconName: "IconSearch" });
      // Look for the icon by data-name attribute
      const icon = wrapper.find('[data-name="IconSearch"]');

      await icon.trigger("click");

      expect(wrapper.vm.isOpen).toBe(true);
    });

    it("positions icon correctly based on iconOppositePosition", () => {
      const wrapper = createWrapper({
        iconName: "IconSearch",
        iconOppositePosition: true,
      });

      // Look for the inner div that has the pr-10 class
      const iconContainer = wrapper.findAll(".relative")[1]; // Second .relative div
      expect(iconContainer.classes()).toContain("pr-10");
    });
  });

  describe("Preselect First Option", () => {
    it("preselects first option when preselectFirst is true", async () => {
      const wrapper = createWrapper({ preselectFirst: true });

      // Wait for watcher to run
      await wrapper.vm.$nextTick();

      expect(wrapper.emitted("update:modelValue")).toBeTruthy();
      expect(wrapper.emitted("update:modelValue")[0]).toEqual(["Option 1"]);
    });

    it("does not preselect when preselectFirst is false", async () => {
      const wrapper = createWrapper({ preselectFirst: false });

      await wrapper.vm.$nextTick();

      expect(wrapper.emitted("update:modelValue")).toBeFalsy();
    });
  });
});
