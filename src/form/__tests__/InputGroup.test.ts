import { describe, it, expect, vi, beforeEach } from "vitest";
import { mount, VueWrapper } from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";
import InputGroup from "../InputGroup.vue";
import Input from "../Input.vue";
import Button from "../../elements/Button.vue";

// Mock the store
vi.mock("../../stores/index", () => ({
  useAppStore: vi.fn(() => ({
    isRtl: false,
    isDarkMode: false,
  })),
}));

describe("InputGroup Component", () => {
  let wrapper: VueWrapper<any>;

  beforeEach(() => {
    const pinia = createPinia();
    setActivePinia(pinia);
  });

  // Helper function to create wrapper with default props
  const createWrapper = (props = {}, slots = {}) => {
    return mount(InputGroup, {
      props,
      slots,
      global: {
        components: {
          Input,
          Button,
        },
      },
    });
  };

  describe("Rendering", () => {
    it("renders as div element", () => {
      wrapper = createWrapper();
      expect(wrapper.find("div").exists()).toBe(true);
    });

    it("renders with slot content", () => {
      wrapper = mount(InputGroup, {
        slots: {
          default: `<Input model-value="test" />`,
        },
        global: {
          components: {
            Input,
          },
        },
      });
      expect(wrapper.find("input").exists()).toBe(true);
    });

    it("renders label when provided", () => {
      wrapper = createWrapper({ label: "Username" });
      expect(wrapper.find("label").exists()).toBe(true);
      expect(wrapper.find("label").text()).toBe("Username");
    });

    it("renders required indicator when required is true", () => {
      wrapper = createWrapper({
        label: "Username",
        required: true,
      });
      expect(wrapper.find("label span").text()).toBe("*");
    });

    it("renders error message when error is true", () => {
      wrapper = createWrapper({
        error: true,
        errorMessage: "This field is required",
      });
      expect(wrapper.find("span").text()).toBe("This field is required");
    });

    it("does not render label when not provided", () => {
      wrapper = createWrapper();
      expect(wrapper.find("label").exists()).toBe(false);
    });

    it("does not render error message when error is false", () => {
      wrapper = createWrapper({ error: false });
      expect(wrapper.find("span").exists()).toBe(false);
    });
  });

  describe("Props and Styling", () => {
    it("applies correct classes for label", () => {
      wrapper = createWrapper({ label: "Test Label" });
      const label = wrapper.find("label");
      expect(label.classes()).toContain("text-sm");
      expect(label.classes()).toContain("font-medium");
      expect(label.classes()).toContain("text-gray-700");
    });

    it("applies correct classes for error message", () => {
      wrapper = createWrapper({
        error: true,
        errorMessage: "Error message",
      });
      const errorSpan = wrapper.find("span");
      expect(errorSpan.classes()).toContain("text-sm");
      expect(errorSpan.classes()).toContain("text-red-500");
      expect(errorSpan.classes()).toContain("mt-1");
    });

    it("applies correct classes for input group container", () => {
      wrapper = createWrapper();
      const container = wrapper.find("div.flex.w-full.gap-0");
      expect(container.exists()).toBe(true);
    });
  });

  describe("Child Component Integration", () => {
    it("passes error prop to child components", () => {
      wrapper = mount(InputGroup, {
        props: { error: true },
        slots: {
          default: `<Input model-value="test" />`,
        },
        global: {
          components: { Input },
        },
      });

      // The Input component should receive the error prop
      const inputComponent = wrapper.findComponent(Input);
      expect(inputComponent.props("error")).toBe(true);
    });

    it("provides disabled state via context when child disabled is undefined", () => {
      wrapper = mount(InputGroup, {
        props: { disabled: true },
        slots: {
          default: `<Input model-value="test" />`,
        },
        global: {
          components: { Input },
        },
      });

      // The Input component should use InputGroup's disabled state via context
      const inputComponent = wrapper.findComponent(Input);
      expect(inputComponent.find("input").element.disabled).toBe(true);
    });
  });

  describe("Position Detection", () => {
    it("detects first child position correctly", () => {
      wrapper = mount(InputGroup, {
        slots: {
          default: `
            <Input model-value="first" />
            <Input model-value="second" />
          `,
        },
        global: {
          components: { Input },
        },
      });

      const firstInput = wrapper.findAllComponents(Input)[0];
      expect(firstInput.attributes("data-input-group-position")).toBe("first");
    });

    it("detects last child position correctly", () => {
      wrapper = mount(InputGroup, {
        slots: {
          default: `
            <Input model-value="first" />
            <Input model-value="last" />
          `,
        },
        global: {
          components: { Input },
        },
      });

      const lastInput = wrapper.findAllComponents(Input)[1];
      expect(lastInput.attributes("data-input-group-position")).toBe("last");
    });

    it("detects only child position correctly", () => {
      wrapper = mount(InputGroup, {
        slots: {
          default: `<Input model-value="only" />`,
        },
        global: {
          components: { Input },
        },
      });

      const onlyInput = wrapper.findComponent(Input);
      expect(onlyInput.attributes("data-input-group-position")).toBe("only");
    });

    it("detects middle child position correctly", () => {
      wrapper = mount(InputGroup, {
        slots: {
          default: `
            <Input model-value="first" />
            <Input model-value="middle" />
            <Input model-value="last" />
          `,
        },
        global: {
          components: { Input },
        },
      });

      const middleInput = wrapper.findAllComponents(Input)[1];
      expect(middleInput.attributes("data-input-group-position")).toBe(
        "middle"
      );
    });
  });

  describe("Border Management", () => {
    it("applies border removal classes to non-last children", () => {
      wrapper = mount(InputGroup, {
        slots: {
          default: `
            <Input model-value="first" />
            <Input model-value="last" />
          `,
        },
        global: {
          components: { Input },
        },
      });

      const firstInput = wrapper.findAllComponents(Input)[0];
      const lastInput = wrapper.findAllComponents(Input)[1];

      expect(
        firstInput.attributes("data-input-group-remove-right-border")
      ).toBe("true");
      expect(lastInput.attributes("data-input-group-remove-right-border")).toBe(
        "false"
      );
    });
  });

  describe("Focus Management", () => {
    it("handles child focus events", async () => {
      wrapper = mount(InputGroup, {
        slots: {
          default: `<Input model-value="test" />`,
        },
        global: {
          components: { Input },
        },
      });

      const input = wrapper.findComponent(Input);
      await input.vm.$emit("focus");

      // The focus should be tracked internally
      expect(wrapper.vm.focusedChildIndex).toBe(0);
    });

    it("handles child blur events", async () => {
      wrapper = mount(InputGroup, {
        slots: {
          default: `<Input model-value="test" />`,
        },
        global: {
          components: { Input },
        },
      });

      const input = wrapper.findComponent(Input);
      await input.vm.$emit("focus");
      await input.vm.$emit("blur");

      // The focus should be cleared
      expect(wrapper.vm.focusedChildIndex).toBe(null);
    });
  });

  describe("Error States", () => {
    it("applies error styling when error is true", () => {
      wrapper = createWrapper({
        error: true,
        errorMessage: "Error message",
      });

      expect(wrapper.find("span.text-red-500").exists()).toBe(true);
    });

    it("does not apply error styling when error is false", () => {
      wrapper = createWrapper({ error: false });

      expect(wrapper.find("span.text-red-500").exists()).toBe(false);
    });
  });

  describe("Disabled States", () => {
    it("uses InputGroup disabled state when child disabled is undefined", () => {
      wrapper = mount(InputGroup, {
        props: { disabled: true },
        slots: {
          default: `<Input model-value="test" />`,
        },
        global: {
          components: { Input },
        },
      });

      const input = wrapper.findComponent(Input);
      // Child doesn't have disabled prop, so it should use InputGroup's disabled state
      expect(input.find("input").element.disabled).toBe(true);
    });

    it("prioritizes child disabled prop over InputGroup disabled prop", () => {
      wrapper = mount(InputGroup, {
        props: { disabled: true },
        slots: {
          default: `<Input model-value="test" :disabled="false" />`,
        },
        global: {
          components: { Input },
        },
      });

      const input = wrapper.findComponent(Input);
      // Child's disabled=false should override InputGroup's disabled=true
      // Check the actual disabled property of the DOM element
      expect(input.find("input").element.disabled).toBe(false);
    });

    it("uses InputGroup disabled when child disabled is undefined (duplicate test)", () => {
      wrapper = mount(InputGroup, {
        props: { disabled: true },
        slots: {
          default: `<Input model-value="test" />`,
        },
        global: {
          components: { Input },
        },
      });

      const input = wrapper.findComponent(Input);
      // Should use InputGroup's disabled=true when child disabled is undefined
      expect(input.find("input").element.disabled).toBe(true);
    });

    it("prioritizes child disabled=true over InputGroup disabled=false", () => {
      wrapper = mount(InputGroup, {
        props: { disabled: false },
        slots: {
          default: `<Input model-value="test" :disabled="true" />`,
        },
        global: {
          components: { Input },
        },
      });

      const input = wrapper.findComponent(Input);
      // Child's disabled=true should override InputGroup's disabled=false
      expect(input.find("input").element.disabled).toBe(true);
    });
  });

  describe("Event Handling", () => {
    it("handles child focus events without errors", async () => {
      wrapper = mount(InputGroup, {
        slots: {
          default: `<Input model-value="test" />`,
        },
        global: {
          components: { Input },
        },
      });

      const input = wrapper.findComponent(Input);

      // Should not throw errors when focus events are triggered
      expect(async () => {
        await input.vm.$emit("focus");
        await input.vm.$emit("blur");
      }).not.toThrow();
    });
  });

  describe("Edge Cases", () => {
    it("handles empty slot gracefully", () => {
      wrapper = createWrapper({}, { default: [] });

      expect(wrapper.find("div.flex.w-full.gap-0").exists()).toBe(true);
      expect(wrapper.findAllComponents(Input)).toHaveLength(0);
    });

    it("handles single child correctly", () => {
      wrapper = mount(InputGroup, {
        slots: {
          default: `<Input model-value="single" />`,
        },
        global: {
          components: { Input },
        },
      });

      const input = wrapper.findComponent(Input);
      expect(input.attributes("data-input-group-position")).toBe("only");
      expect(input.attributes("data-input-group-remove-right-border")).toBe(
        "false"
      );
    });

    it("handles multiple children correctly", () => {
      wrapper = mount(InputGroup, {
        slots: {
          default: `
            <Input model-value="first" />
            <Input model-value="last" />
          `,
        },
        global: {
          components: { Input },
        },
      });

      const inputComponents = wrapper.findAllComponents(Input);
      expect(inputComponents).toHaveLength(2);

      // First child should have remove-right-border
      expect(
        inputComponents[0].attributes("data-input-group-remove-right-border")
      ).toBe("true");
      // Last child should not have remove-right-border
      expect(
        inputComponents[1].attributes("data-input-group-remove-right-border")
      ).toBe("false");
    });
  });
});
