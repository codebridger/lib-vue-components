import { describe, it, expect, vi } from "vitest";
import { mount, VueWrapper } from "@vue/test-utils";
import Tooltip from "../Tooltip.vue";

// Mock the Popper component
vi.mock("vue3-popper", () => ({
  default: {
    name: "Popper",
    template: `
      <div class="popper-wrapper">
        <slot />
        <div v-if="show" class="popper-content">
          <slot name="content" />
        </div>
      </div>
    `,
    props: [
      "placement",
      "hover",
      "arrow",
      "open-delay",
      "close-delay",
      "z-index",
      "disabled"
    ],
  }
}));

describe("Tooltip Component", () => {
  let wrapper: VueWrapper<any>;

  // Helper function to create wrapper with default props
  const createWrapper = (props = {}, slots = {}) => {
    return mount(Tooltip, {
      props,
      slots,
      global: {
        stubs: {
          "vue3-popper": {
            template: `
              <div class="popper-wrapper">
                <slot />
                <div v-if="show" class="popper-content">
                  <slot name="content" />
                </div>
              </div>
            `,
            props: [
              "placement",
              "hover",
              "arrow",
              "open-delay",
              "close-delay",
              "z-index",
              "disabled"
            ],
          }
        }
      },
    });
  };

  describe("Rendering", () => {
    it("renders tooltip wrapper", () => {
      wrapper = createWrapper({ text: "Tooltip text" });
      expect(wrapper.find(".tooltip-wrapper").exists()).toBe(true);
    });

    it("renders trigger slot content", () => {
      wrapper = createWrapper({ text: "Tooltip text" }, {
        default: '<button data-test="trigger">Hover me</button>'
      });
      expect(wrapper.find('[data-test="trigger"]').exists()).toBe(true);
    });

    it("renders tooltip content", () => {
      wrapper = createWrapper({ text: "Tooltip text" });
      expect(wrapper.text()).toContain("Tooltip text");
    });

    it("renders Popper component", () => {
      wrapper = createWrapper({ text: "Tooltip text" });
      expect(wrapper.findComponent({ name: "Popper" }).exists()).toBe(true);
    });
  });

  describe("Props and Configuration", () => {
    it("passes text prop to tooltip content", () => {
      wrapper = createWrapper({ text: "Custom tooltip text" });
      expect(wrapper.text()).toContain("Custom tooltip text");
    });

    it("passes placement prop to Popper", () => {
      wrapper = createWrapper({ 
        text: "Tooltip text", 
        placement: "top" 
      });
      const popper = wrapper.findComponent({ name: "Popper" });
      expect(popper.props("placement")).toBe("top");
    });

    it("passes delay prop to Popper", () => {
      wrapper = createWrapper({ 
        text: "Tooltip text", 
        delay: 500 
      });
      const popper = wrapper.findComponent({ name: "Popper" });
      expect(popper.props("open-delay")).toBe(500);
      expect(popper.props("close-delay")).toBe(500);
    });

    it("passes disabled prop to Popper", () => {
      wrapper = createWrapper({ 
        text: "Tooltip text", 
        disabled: true 
      });
      const popper = wrapper.findComponent({ name: "Popper" });
      expect(popper.props("disabled")).toBe(true);
    });

    it("passes default Popper props", () => {
      wrapper = createWrapper({ text: "Tooltip text" });
      const popper = wrapper.findComponent({ name: "Popper" });
      expect(popper.props("hover")).toBe(true);
      expect(popper.props("arrow")).toBe(true);
      expect(popper.props("z-index")).toBe(9999);
    });
  });

  describe("Color Variants", () => {
    it("applies primary color class", () => {
      wrapper = createWrapper({ 
        text: "Tooltip text", 
        color: "primary" 
      });
      expect(wrapper.classes()).toContain("tooltip-primary");
    });

    it("applies success color class", () => {
      wrapper = createWrapper({ 
        text: "Tooltip text", 
        color: "success" 
      });
      expect(wrapper.classes()).toContain("tooltip-success");
    });

    it("applies info color class", () => {
      wrapper = createWrapper({ 
        text: "Tooltip text", 
        color: "info" 
      });
      expect(wrapper.classes()).toContain("tooltip-info");
    });

    it("applies warning color class", () => {
      wrapper = createWrapper({ 
        text: "Tooltip text", 
        color: "warning" 
      });
      expect(wrapper.classes()).toContain("tooltip-warning");
    });

    it("applies danger color class", () => {
      wrapper = createWrapper({ 
        text: "Tooltip text", 
        color: "danger" 
      });
      expect(wrapper.classes()).toContain("tooltip-danger");
    });

    it("applies secondary color class", () => {
      wrapper = createWrapper({ 
        text: "Tooltip text", 
        color: "secondary" 
      });
      expect(wrapper.classes()).toContain("tooltip-secondary");
    });

    it("applies white color class", () => {
      wrapper = createWrapper({ 
        text: "Tooltip text", 
        color: "white" 
      });
      expect(wrapper.classes()).toContain("tooltip-white");
    });

    it("applies black color class", () => {
      wrapper = createWrapper({ 
        text: "Tooltip text", 
        color: "black" 
      });
      expect(wrapper.classes()).toContain("tooltip-black");
    });

    it("applies system color class", () => {
      wrapper = createWrapper({ 
        text: "Tooltip text", 
        color: "system" 
      });
      expect(wrapper.classes()).toContain("tooltip-system");
    });

    it("applies computed color classes to tooltip content", () => {
      wrapper = createWrapper({ 
        text: "Tooltip text", 
        color: "primary" 
      });
      const tooltipContent = wrapper.find(".tooltip-content");
      expect(tooltipContent.classes()).toContain("!bg-primary");
      expect(tooltipContent.classes()).toContain("!text-white");
      expect(tooltipContent.classes()).toContain("!border-primary/20");
    });
  });

  describe("Placement Options", () => {
    it("supports top placement", () => {
      wrapper = createWrapper({ 
        text: "Tooltip text", 
        placement: "top" 
      });
      const popper = wrapper.findComponent({ name: "Popper" });
      expect(popper.props("placement")).toBe("top");
    });

    it("supports bottom placement", () => {
      wrapper = createWrapper({ 
        text: "Tooltip text", 
        placement: "bottom" 
      });
      const popper = wrapper.findComponent({ name: "Popper" });
      expect(popper.props("placement")).toBe("bottom");
    });

    it("supports left placement", () => {
      wrapper = createWrapper({ 
        text: "Tooltip text", 
        placement: "left" 
      });
      const popper = wrapper.findComponent({ name: "Popper" });
      expect(popper.props("placement")).toBe("left");
    });

    it("supports right placement", () => {
      wrapper = createWrapper({ 
        text: "Tooltip text", 
        placement: "right" 
      });
      const popper = wrapper.findComponent({ name: "Popper" });
      expect(popper.props("placement")).toBe("right");
    });
  });

  describe("Accessibility", () => {
    it("has proper tooltip structure", () => {
      wrapper = createWrapper({ text: "Tooltip text" });
      expect(wrapper.find(".tooltip-wrapper").exists()).toBe(true);
    });

    it("passes through attributes to wrapper", () => {
      wrapper = createWrapper({ 
        text: "Tooltip text",
        "data-testid": "tooltip-component"
      });
      expect(wrapper.attributes("data-testid")).toBe("tooltip-component");
    });
  });

  describe("Default Values", () => {
    it("uses correct default values", () => {
      wrapper = createWrapper({ text: "Tooltip text" });
      expect(wrapper.props("delay")).toBe(0);
      expect(wrapper.props("placement")).toBe("bottom");
      expect(wrapper.props("color")).toBe("primary");
      expect(wrapper.props("disabled")).toBe(false);
    });
  });

  describe("Required Props", () => {
    it("requires text prop", () => {
      wrapper = createWrapper({ text: "Tooltip text" });
      expect(wrapper.props("text")).toBe("Tooltip text");
    });
  });

  describe("Edge Cases", () => {
    it("handles empty text", () => {
      wrapper = createWrapper({ text: "" });
      expect(wrapper.find(".tooltip-wrapper").exists()).toBe(true);
    });

    it("handles undefined props gracefully", () => {
      wrapper = createWrapper({ text: "Tooltip text" });
      expect(wrapper.find(".tooltip-wrapper").exists()).toBe(true);
    });

    it("handles invalid placement gracefully", () => {
      wrapper = createWrapper({ 
        text: "Tooltip text", 
        placement: "invalid" as any 
      });
      const popper = wrapper.findComponent({ name: "Popper" });
      expect(popper.props("placement")).toBe("invalid");
    });

    it("handles invalid color gracefully", () => {
      wrapper = createWrapper({ 
        text: "Tooltip text", 
        color: "invalid" as any 
      });
      // Should not apply any color class
      expect(wrapper.classes()).not.toContain("tooltip-invalid");
    });

    it("handles negative delay", () => {
      wrapper = createWrapper({ 
        text: "Tooltip text", 
        delay: -100 
      });
      const popper = wrapper.findComponent({ name: "Popper" });
      expect(popper.props("open-delay")).toBe(-100);
      expect(popper.props("close-delay")).toBe(-100);
    });
  });

  describe("Computed Properties", () => {
    it("computes color class correctly for primary", () => {
      wrapper = createWrapper({ 
        text: "Tooltip text", 
        color: "primary" 
      });
      const tooltipContent = wrapper.find(".tooltip-content");
      expect(tooltipContent.classes()).toContain("!bg-primary");
      expect(tooltipContent.classes()).toContain("!text-white");
      expect(tooltipContent.classes()).toContain("!border-primary/20");
    });

    it("computes color class correctly for white", () => {
      wrapper = createWrapper({ 
        text: "Tooltip text", 
        color: "white" 
      });
      const tooltipContent = wrapper.find(".tooltip-content");
      expect(tooltipContent.classes()).toContain("!bg-white");
      expect(tooltipContent.classes()).toContain("!text-gray-800");
      expect(tooltipContent.classes()).toContain("!border-gray-200");
    });

    it("computes color class correctly for system", () => {
      wrapper = createWrapper({ 
        text: "Tooltip text", 
        color: "system" 
      });
      const tooltipContent = wrapper.find(".tooltip-content");
      expect(tooltipContent.classes()).toBe("tooltip-content");
    });
  });

  describe("Slot Integration", () => {
    it("renders default slot content", () => {
      wrapper = createWrapper({ text: "Tooltip text" }, {
        default: '<span data-test="trigger-content">Hover me</span>'
      });
      expect(wrapper.find('[data-test="trigger-content"]').exists()).toBe(true);
    });

    it("renders content slot", () => {
      wrapper = createWrapper({ text: "Tooltip text" });
      const popper = wrapper.findComponent({ name: "Popper" });
      expect(popper.exists()).toBe(true);
    });
  });

  describe("Styling", () => {
    it("applies tooltip wrapper classes", () => {
      wrapper = createWrapper({ text: "Tooltip text" });
      expect(wrapper.classes()).toContain("tooltip-wrapper");
      expect(wrapper.classes()).toContain("tooltip-primary");
    });

    it("applies tooltip content classes", () => {
      wrapper = createWrapper({ text: "Tooltip text" });
      const tooltipContent = wrapper.find(".tooltip-content");
      expect(tooltipContent.exists()).toBe(true);
    });
  });

  describe("Type Safety", () => {
    it("accepts valid placement types", () => {
      const placements = ["top", "bottom", "left", "right"];
      placements.forEach((placement) => {
        wrapper = createWrapper({ 
          text: "Tooltip text", 
          placement: placement as any 
        });
        const popper = wrapper.findComponent({ name: "Popper" });
        expect(popper.props("placement")).toBe(placement);
      });
    });

    it("accepts valid color types", () => {
      const colors = [
        "primary", "success", "info", "warning", 
        "danger", "secondary", "white", "black", "system"
      ];
      colors.forEach((color) => {
        wrapper = createWrapper({ 
          text: "Tooltip text", 
          color: color as any 
        });
        expect(wrapper.classes()).toContain(`tooltip-${color}`);
      });
    });
  });
});