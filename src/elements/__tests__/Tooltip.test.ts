import { describe, it, expect, vi } from "vitest";
import { mount, VueWrapper } from "@vue/test-utils";
import Tooltip from "../Tooltip.vue";

// Mock the Popper component
vi.mock("vue3-popper", () => ({
  default: {
    name: "Popper",
    template: `
      <div class="popper">
        <slot />
        <slot name="content" />
      </div>
    `,
    props: ["placement", "hover", "arrow", "open-delay", "close-delay", "z-index", "disabled"],
  },
}));

describe("Tooltip Component", () => {
  let wrapper: VueWrapper<any>;
  const createWrapper = (props = {}, slots = {}) => {
    return mount(Tooltip, {
      props,
      slots,
      global: {
        stubs: {
          Popper: {
            name: "Popper",
            template: `
              <div class="popper">
                <slot />
                <slot name="content" />
              </div>
            `,
            props: ["placement", "hover", "arrow", "open-delay", "close-delay", "z-index", "disabled"],
          },
        },
      },
    });
  };

  describe("Rendering", () => {
    it("renders tooltip wrapper", () => {
      wrapper = createWrapper({ text: "Tooltip text" });
      expect(wrapper.find(".tooltip-wrapper").exists()).toBe(true);
    });

    it("renders Popper component", () => {
      wrapper = createWrapper({ text: "Tooltip text" });
      expect(wrapper.findComponent({ name: "Popper" }).exists()).toBe(true);
    });

    it("renders trigger slot content", () => {
      wrapper = createWrapper(
        { text: "Tooltip text" },
        { default: '<button>Hover me</button>' }
      );
      expect(wrapper.find("button").exists()).toBe(true);
      expect(wrapper.text()).toContain("Hover me");
    });

    it("renders tooltip content", () => {
      wrapper = createWrapper({ text: "Tooltip text" });
      const popper = wrapper.findComponent({ name: "Popper" });
      expect(popper.text()).toContain("Tooltip text");
    });
  });

  describe("Props and Configuration", () => {
    it("passes text prop to tooltip content", () => {
      wrapper = createWrapper({ text: "Custom tooltip text" });
      const popper = wrapper.findComponent({ name: "Popper" });
      expect(popper.text()).toContain("Custom tooltip text");
    });

    it("passes placement prop to Popper", () => {
      wrapper = createWrapper({ text: "Tooltip text", placement: "top" });
      const popper = wrapper.findComponent({ name: "Popper" });
      expect(popper.props("placement")).toBe("top");
    });

    it("passes delay prop to Popper", () => {
      wrapper = createWrapper({ text: "Tooltip text", delay: 500 });
      const popper = wrapper.findComponent({ name: "Popper" });
      expect(popper.props("open-delay")).toBe(500);
      expect(popper.props("close-delay")).toBe(500);
    });

    it("passes disabled prop to Popper", () => {
      wrapper = createWrapper({ text: "Tooltip text", disabled: true });
      const popper = wrapper.findComponent({ name: "Popper" });
      expect(popper.props("disabled")).toBe(true);
    });

    it("passes default Popper props", () => {
      wrapper = createWrapper({ text: "Tooltip text" });
      const popper = wrapper.findComponent({ name: "Popper" });
      expect(popper.props("hover")).toBe(true);
      expect(popper.props("arrow")).toBe(true);
      expect(popper.props("z-index")).toBe(9999);
      expect(popper.props("disabled")).toBe(false);
    });
  });

  describe("Color Variants", () => {
    it("applies primary color classes", () => {
      wrapper = createWrapper({ text: "Tooltip text", color: "primary" });
      expect(wrapper.classes()).toContain("tooltip-primary");
    });

    it("applies success color classes", () => {
      wrapper = createWrapper({ text: "Tooltip text", color: "success" });
      expect(wrapper.classes()).toContain("tooltip-success");
    });

    it("applies warning color classes", () => {
      wrapper = createWrapper({ text: "Tooltip text", color: "warning" });
      expect(wrapper.classes()).toContain("tooltip-warning");
    });

    it("applies danger color classes", () => {
      wrapper = createWrapper({ text: "Tooltip text", color: "danger" });
      expect(wrapper.classes()).toContain("tooltip-danger");
    });

    it("applies info color classes", () => {
      wrapper = createWrapper({ text: "Tooltip text", color: "info" });
      expect(wrapper.classes()).toContain("tooltip-info");
    });

    it("applies secondary color classes", () => {
      wrapper = createWrapper({ text: "Tooltip text", color: "secondary" });
      expect(wrapper.classes()).toContain("tooltip-secondary");
    });

    it("applies white color classes", () => {
      wrapper = createWrapper({ text: "Tooltip text", color: "white" });
      expect(wrapper.classes()).toContain("tooltip-white");
    });

    it("applies black color classes", () => {
      wrapper = createWrapper({ text: "Tooltip text", color: "black" });
      expect(wrapper.classes()).toContain("tooltip-black");
    });

    it("applies system color classes", () => {
      wrapper = createWrapper({ text: "Tooltip text", color: "system" });
      expect(wrapper.classes()).toContain("tooltip-system");
    });
  });

  describe("Placement Options", () => {
    it("supports top placement", () => {
      wrapper = createWrapper({ text: "Tooltip text", placement: "top" });
      const popper = wrapper.findComponent({ name: "Popper" });
      expect(popper.props("placement")).toBe("top");
    });

    it("supports bottom placement", () => {
      wrapper = createWrapper({ text: "Tooltip text", placement: "bottom" });
      const popper = wrapper.findComponent({ name: "Popper" });
      expect(popper.props("placement")).toBe("bottom");
    });

    it("supports left placement", () => {
      wrapper = createWrapper({ text: "Tooltip text", placement: "left" });
      const popper = wrapper.findComponent({ name: "Popper" });
      expect(popper.props("placement")).toBe("left");
    });

    it("supports right placement", () => {
      wrapper = createWrapper({ text: "Tooltip text", placement: "right" });
      const popper = wrapper.findComponent({ name: "Popper" });
      expect(popper.props("placement")).toBe("right");
    });
  });

  describe("Accessibility", () => {
    it("passes through attributes to wrapper", () => {
      wrapper = createWrapper({ 
        text: "Tooltip text",
        "aria-describedby": "tooltip-1"
      });
      expect(wrapper.attributes("aria-describedby")).toBe("tooltip-1");
    });

    it("has proper tooltip structure", () => {
      wrapper = createWrapper({ text: "Tooltip text" });
      expect(wrapper.find(".tooltip-wrapper").exists()).toBe(true);
      expect(wrapper.findComponent({ name: "Popper" }).exists()).toBe(true);
    });
  });

  describe("Edge Cases", () => {
    it("handles empty text", () => {
      wrapper = createWrapper({ text: "" });
      const popper = wrapper.findComponent({ name: "Popper" });
      expect(popper.text()).toBe("");
    });

    it("handles invalid placement gracefully", () => {
      wrapper = createWrapper({ text: "Tooltip text", placement: "invalid" as any });
      const popper = wrapper.findComponent({ name: "Popper" });
      expect(popper.props("placement")).toBe("invalid");
    });

    it("handles invalid color gracefully", () => {
      wrapper = createWrapper({ text: "Tooltip text", color: "invalid" as any });
      // Should not apply any color class
      expect(wrapper.classes()).not.toContain("tooltip-invalid");
    });

    it("handles negative delay", () => {
      wrapper = createWrapper({ text: "Tooltip text", delay: -100 });
      const popper = wrapper.findComponent({ name: "Popper" });
      expect(popper.props("open-delay")).toBe(-100);
      expect(popper.props("close-delay")).toBe(-100);
    });

    it("handles zero delay", () => {
      wrapper = createWrapper({ text: "Tooltip text", delay: 0 });
      const popper = wrapper.findComponent({ name: "Popper" });
      expect(popper.props("open-delay")).toBe(0);
      expect(popper.props("close-delay")).toBe(0);
    });
  });

  describe("Computed Properties", () => {
    it("computes color class correctly for primary", () => {
      wrapper = createWrapper({ text: "Tooltip text", color: "primary" });
      expect(wrapper.classes()).toContain("tooltip-primary");
    });

    it("computes color class correctly for white", () => {
      wrapper = createWrapper({ text: "Tooltip text", color: "white" });
      expect(wrapper.classes()).toContain("tooltip-white");
    });

    it("computes color class correctly for system", () => {
      wrapper = createWrapper({ text: "Tooltip text", color: "system" });
      expect(wrapper.classes()).toContain("tooltip-system");
    });
  });

  describe("Slot Integration", () => {
    it("renders content slot", () => {
      wrapper = createWrapper({ text: "Tooltip text" });
      const popper = wrapper.findComponent({ name: "Popper" });
      expect(popper.exists()).toBe(true);
    });

    it("renders trigger slot", () => {
      wrapper = createWrapper(
        { text: "Tooltip text" },
        { default: '<span>Trigger</span>' }
      );
      expect(wrapper.find("span").exists()).toBe(true);
      expect(wrapper.text()).toContain("Trigger");
    });
  });

  describe("Styling", () => {
    it("applies tooltip wrapper classes", () => {
      wrapper = createWrapper({ text: "Tooltip text" });
      expect(wrapper.classes()).toContain("tooltip-wrapper");
    });

    it("applies color-specific wrapper classes", () => {
      wrapper = createWrapper({ text: "Tooltip text", color: "primary" });
      expect(wrapper.classes()).toContain("tooltip-primary");
    });
  });

  describe("Type Safety", () => {
    it("accepts valid placement types", () => {
      const placements = ["top", "bottom", "left", "right"];
      placements.forEach(placement => {
        wrapper = createWrapper({ text: "Tooltip text", placement });
        const popper = wrapper.findComponent({ name: "Popper" });
        expect(popper.props("placement")).toBe(placement);
      });
    });

    it("accepts valid color types", () => {
      const colors = ["primary", "success", "info", "warning", "danger", "secondary", "white", "black", "system"];
      colors.forEach(color => {
        wrapper = createWrapper({ text: "Tooltip text", color });
        expect(wrapper.classes()).toContain(`tooltip-${color}`);
      });
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

  describe("Integration", () => {
    it("works with complex trigger content", () => {
      wrapper = createWrapper(
        { text: "Tooltip text" },
        { 
          default: `
            <div class="complex-trigger">
              <span>Icon</span>
              <span>Text</span>
            </div>
          `
        }
      );
      expect(wrapper.find(".complex-trigger").exists()).toBe(true);
      expect(wrapper.text()).toContain("Icon");
      expect(wrapper.text()).toContain("Text");
    });

    it("works with custom attributes", () => {
      wrapper = createWrapper({ 
        text: "Tooltip text",
        class: "custom-tooltip",
        id: "tooltip-1"
      });
      expect(wrapper.classes()).toContain("custom-tooltip");
      expect(wrapper.attributes("id")).toBe("tooltip-1");
    });
  });
});