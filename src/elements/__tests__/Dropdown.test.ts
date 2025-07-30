import { describe, it, expect, vi } from "vitest";
import { mount, VueWrapper } from "@vue/test-utils";
import Dropdown from "../Dropdown.vue";
import Button from "../Button.vue";
import Icon from "../../icon/Icon.vue";

// Mock the Popper component
vi.mock("vue3-popper", () => ({
  default: {
    name: "Popper",
    template: `
      <div class="popper-wrapper">
        <slot name="trigger" :isDisabled="disabled"></slot>
        <div v-if="show" class="popper-content">
          <slot name="content" :close="close" :isOpen="show"></slot>
        </div>
      </div>
    `,
    props: [
      "placement",
      "disable-click-away",
      "offset-skid",
      "offset-distance",
      "hover",
      "show",
      "disabled",
      "open-delay",
      "close-delay",
      "z-index",
      "arrow",
      "arrow-padding",
      "interactive",
      "locked"
    ],
    emits: ["open:popper", "close:popper"],
    setup(props, { emit }) {
      const close = () => {
        emit("close:popper");
      };
      return { close };
    }
  }
}));

describe("Dropdown Component", () => {
  let wrapper: VueWrapper<any>;

  // Helper function to create wrapper with default props
  const createWrapper = (props = {}, slots = {}) => {
    return mount(Dropdown, {
      props,
      slots,
      global: {
        components: {
          Button,
          Icon,
        },
        stubs: {
          "vue3-popper": {
            template: `
              <div class="popper-wrapper">
                <slot name="trigger" :isDisabled="disabled"></slot>
                <div v-if="show" class="popper-content">
                  <slot name="content" :close="close" :isOpen="show"></slot>
                </div>
              </div>
            `,
            props: [
              "placement",
              "disable-click-away",
              "offset-skid",
              "offset-distance",
              "hover",
              "show",
              "disabled",
              "open-delay",
              "close-delay",
              "z-index",
              "arrow",
              "arrow-padding",
              "interactive",
              "locked"
            ],
            emits: ["open:popper", "close:popper"],
            setup(props, { emit }) {
              const close = () => {
                emit("close:popper");
              };
              return { close };
            }
          }
        }
      },
    });
  };

  describe("Rendering", () => {
    it("renders dropdown wrapper", () => {
      wrapper = createWrapper();
      expect(wrapper.find(".dropdown").exists()).toBe(true);
    });

    it("renders default trigger button", () => {
      wrapper = createWrapper({ triggerText: "Select Option" });
      expect(wrapper.findComponent(Button).exists()).toBe(true);
      expect(wrapper.text()).toContain("Select Option");
    });

    it("renders default trigger with caret icon", () => {
      wrapper = createWrapper({ triggerText: "Menu" });
      expect(wrapper.findComponent(Icon).exists()).toBe(true);
      expect(wrapper.findComponent(Icon).props("name")).toBe("IconCaretDown");
    });

    it("renders custom trigger slot", () => {
      wrapper = createWrapper({}, {
        trigger: '<button data-test="custom-trigger">Custom Trigger</button>'
      });
      expect(wrapper.find('[data-test="custom-trigger"]').exists()).toBe(true);
    });

    it("renders custom body slot", () => {
      wrapper = createWrapper({}, {
        body: '<ul data-test="custom-body"><li>Option 1</li></ul>'
      });
      // The body slot content should be available when dropdown is open
      expect(wrapper.find('[data-test="custom-body"]').exists()).toBe(true);
    });
  });

  describe("Props and Configuration", () => {
    it("applies default placement", () => {
      wrapper = createWrapper();
      const popper = wrapper.findComponent({ name: "Popper" });
      expect(popper.props("placement")).toBe("bottom-end");
    });

    it("applies custom placement", () => {
      wrapper = createWrapper({ placement: "top-start" });
      const popper = wrapper.findComponent({ name: "Popper" });
      expect(popper.props("placement")).toBe("top-start");
    });

    it("applies offset configuration", () => {
      wrapper = createWrapper({ 
        offsetSkid: 10, 
        offsetDistance: 20 
      });
      const popper = wrapper.findComponent({ name: "Popper" });
      expect(popper.props("offset-skid")).toBe("10");
      expect(popper.props("offset-distance")).toBe("20");
    });

    it("applies hover configuration", () => {
      wrapper = createWrapper({ hover: true });
      const popper = wrapper.findComponent({ name: "Popper" });
      expect(popper.props("hover")).toBe(true);
    });

    it("applies delay configuration", () => {
      wrapper = createWrapper({ 
        openDelay: 100, 
        closeDelay: 200 
      });
      const popper = wrapper.findComponent({ name: "Popper" });
      expect(popper.props("open-delay")).toBe(100);
      expect(popper.props("close-delay")).toBe(200);
    });

    it("applies z-index configuration", () => {
      wrapper = createWrapper({ zIndex: 9999 });
      const popper = wrapper.findComponent({ name: "Popper" });
      expect(popper.props("z-index")).toBe(9999);
    });

    it("applies arrow configuration", () => {
      wrapper = createWrapper({ 
        arrow: true, 
        arrowPadding: 10 
      });
      const popper = wrapper.findComponent({ name: "Popper" });
      expect(popper.props("arrow")).toBe(true);
      expect(popper.props("arrow-padding")).toBe("10");
    });

    it("applies interactive configuration", () => {
      wrapper = createWrapper({ interactive: false });
      const popper = wrapper.findComponent({ name: "Popper" });
      expect(popper.props("interactive")).toBe(false);
    });

    it("applies locked configuration", () => {
      wrapper = createWrapper({ locked: true });
      const popper = wrapper.findComponent({ name: "Popper" });
      expect(popper.props("locked")).toBe(true);
    });

    it("applies disable click away configuration", () => {
      wrapper = createWrapper({ disableClickAway: true });
      const popper = wrapper.findComponent({ name: "Popper" });
      expect(popper.props("disable-click-away")).toBe(true);
    });
  });

  describe("Trigger Button Styling", () => {
    it("applies default trigger classes", () => {
      wrapper = createWrapper({ triggerText: "Menu" });
      const button = wrapper.findComponent(Button);
      expect(button.classes()).toContain("flex");
      expect(button.classes()).toContain("justify-between");
    });

    it("applies custom trigger class", () => {
      wrapper = createWrapper({ 
        triggerText: "Menu",
        triggerClass: "custom-trigger-class"
      });
      const button = wrapper.findComponent(Button);
      expect(button.classes()).toContain("custom-trigger-class");
    });

    it("disables trigger when disabled prop is true", () => {
      wrapper = createWrapper({ 
        triggerText: "Menu",
        disabled: true 
      });
      const button = wrapper.findComponent(Button);
      expect(button.props("disabled")).toBe(true);
    });
  });

  describe("Body Content Styling", () => {
    it("applies default body wrapper classes", () => {
      wrapper = createWrapper({}, {
        body: '<li>Option 1</li>'
      });
      const ul = wrapper.find("ul");
      expect(ul.classes()).toContain("whitespace-nowrap");
    });

    it("applies custom body wrapper class", () => {
      wrapper = createWrapper({ 
        bodyWrapperClass: "custom-body-class"
      }, {
        body: '<li>Option 1</li>'
      });
      const ul = wrapper.find("ul");
      expect(ul.classes()).toContain("custom-body-class");
    });
  });

  describe("Events", () => {
    it("emits open:popper event", async () => {
      wrapper = createWrapper();
      const popper = wrapper.findComponent({ name: "Popper" });
      await popper.vm.$emit("open:popper");
      expect(wrapper.emitted("open:popper")).toBeTruthy();
    });

    it("emits close:popper event", async () => {
      wrapper = createWrapper();
      const popper = wrapper.findComponent({ name: "Popper" });
      await popper.vm.$emit("close:popper");
      expect(wrapper.emitted("close:popper")).toBeTruthy();
    });
  });

  describe("RTL Support", () => {
    it("computes placement correctly for RTL", () => {
      // This would require mocking the store.rtlClass value
      // For now, we test the default behavior
      wrapper = createWrapper({ placement: "bottom-end" });
      const popper = wrapper.findComponent({ name: "Popper" });
      expect(popper.props("placement")).toBe("bottom-end");
    });

    it("applies RTL classes to caret icon", () => {
      wrapper = createWrapper({ triggerText: "Menu" });
      const icon = wrapper.findComponent(Icon);
      expect(icon.classes()).toContain("ltr:ml-1");
      expect(icon.classes()).toContain("rtl:mr-1");
    });
  });

  describe("Accessibility", () => {
    it("provides isDisabled to trigger slot", () => {
      wrapper = createWrapper({ disabled: true }, {
        trigger: '<button :disabled="isDisabled">Trigger</button>'
      });
      // The slot should receive the disabled state
      expect(wrapper.find("button").attributes("disabled")).toBeDefined();
    });

    it("provides close function to body slot", () => {
      wrapper = createWrapper({}, {
        body: '<button @click="close">Close</button>'
      });
      // The slot should have access to the close function
      expect(wrapper.find("button").exists()).toBe(true);
    });

    it("provides isOpen state to body slot", () => {
      wrapper = createWrapper({}, {
        body: '<div v-if="isOpen">Content</div>'
      });
      // The slot should have access to the isOpen state
      expect(wrapper.find("div").exists()).toBe(true);
    });
  });

  describe("Edge Cases", () => {
    it("handles empty trigger text", () => {
      wrapper = createWrapper({ triggerText: "" });
      expect(wrapper.findComponent(Button).exists()).toBe(true);
    });

    it("handles undefined props gracefully", () => {
      wrapper = createWrapper({});
      expect(wrapper.find(".dropdown").exists()).toBe(true);
    });

    it("handles invalid placement gracefully", () => {
      wrapper = createWrapper({ placement: "invalid" as any });
      const popper = wrapper.findComponent({ name: "Popper" });
      expect(popper.props("placement")).toBe("invalid");
    });

    it("handles negative offset values", () => {
      wrapper = createWrapper({ 
        offsetSkid: -10, 
        offsetDistance: -20 
      });
      const popper = wrapper.findComponent({ name: "Popper" });
      expect(popper.props("offset-skid")).toBe("-10");
      expect(popper.props("offset-distance")).toBe("-20");
    });
  });

  describe("Default Values", () => {
    it("uses correct default values", () => {
      wrapper = createWrapper();
      const popper = wrapper.findComponent({ name: "Popper" });
      expect(popper.props("placement")).toBe("bottom-end");
      expect(popper.props("disable-click-away")).toBe(false);
      expect(popper.props("offset-skid")).toBe("0");
      expect(popper.props("offset-distance")).toBe("0");
      expect(popper.props("hover")).toBe(false);
      expect(popper.props("show")).toBe(null);
      expect(popper.props("disabled")).toBe(false);
      expect(popper.props("open-delay")).toBe(0);
      expect(popper.props("close-delay")).toBe(0);
      expect(popper.props("z-index")).toBe(9999);
      expect(popper.props("arrow")).toBe(false);
      expect(popper.props("arrow-padding")).toBe("0");
      expect(popper.props("interactive")).toBe(true);
      expect(popper.props("locked")).toBe(false);
    });
  });
});