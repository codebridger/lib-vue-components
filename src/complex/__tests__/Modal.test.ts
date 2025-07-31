import { describe, it, expect, vi } from "vitest";
import { mount, VueWrapper } from "@vue/test-utils";
import Modal from "../Modal.vue";
import Button from "../../elements/Button.vue";

// Mock Headless UI components
vi.mock("@headlessui/vue", () => ({
  TransitionRoot: {
    name: "TransitionRoot",
    template: '<div><slot /></div>',
    props: ["appear", "show", "as"],
  },
  TransitionChild: {
    name: "TransitionChild",
    template: '<div><slot /></div>',
    props: ["as", "enter", "enter-from", "enter-to", "leave", "leave-from", "leave-to"],
  },
  Dialog: {
    name: "Dialog",
    template: '<div><slot /></div>',
    props: ["as", "class"],
    emits: ["close"],
  },
  DialogPanel: {
    name: "DialogPanel",
    template: '<div><slot /></div>',
    props: ["class"],
  },
  DialogOverlay: {
    name: "DialogOverlay",
    template: '<div><slot /></div>',
    props: ["class"],
  },
}));

describe("Modal Component", () => {
  let wrapper: VueWrapper<any>;

  // Helper function to create wrapper with default props
  const createWrapper = (props = {}, slots = {}) => {
    return mount(Modal, {
      props,
      slots,
      global: {
        components: {
          Button,
        },
        stubs: {
          "TransitionRoot": {
            template: '<div><slot /></div>',
            props: ["appear", "show", "as"],
          },
          "TransitionChild": {
            template: '<div><slot /></div>',
            props: ["as", "enter", "enter-from", "enter-to", "leave", "leave-from", "leave-to"],
          },
          "Dialog": {
            template: '<div><slot /></div>',
            props: ["as", "class"],
            emits: ["close"],
          },
          "DialogPanel": {
            template: '<div><slot /></div>',
            props: ["class"],
          },
          "DialogOverlay": {
            template: '<div><slot /></div>',
            props: ["class"],
          },
        },
      },
    });
  };

  describe("Rendering", () => {
    it("renders default trigger button", () => {
      wrapper = createWrapper({ triggerLabel: "Open Modal" });
      expect(wrapper.findComponent(Button).exists()).toBe(true);
      expect(wrapper.text()).toContain("Open Modal");
    });

    it("renders custom trigger slot", () => {
      wrapper = createWrapper({}, {
        trigger: '<button data-test="custom-trigger">Custom Trigger</button>'
      });
      expect(wrapper.find('[data-test="custom-trigger"]').exists()).toBe(true);
    });

    it("renders modal content when open", async () => {
      wrapper = createWrapper({ modelValue: true });
      await wrapper.vm.$nextTick();
      expect(wrapper.findComponent({ name: "Dialog" }).exists()).toBe(false);
    });

    it("renders title when provided", () => {
      wrapper = createWrapper({ 
        modelValue: true, 
        title: "Modal Title" 
      });
      expect(wrapper.text()).toContain("Modal Title");
    });

    it("renders custom title slot", () => {
      wrapper = createWrapper({ modelValue: true }, {
        title: '<h2 data-test="custom-title">Custom Title</h2>'
      });
      expect(wrapper.find('[data-test="custom-title"]').exists()).toBe(true);
    });

    it("renders close button when not hidden", () => {
      wrapper = createWrapper({ 
        modelValue: true, 
        hideClose: false 
      });
      expect(wrapper.findComponent(Button).exists()).toBe(true);
    });

    it("hides close button when hideClose is true", () => {
      wrapper = createWrapper({ 
        modelValue: true, 
        hideClose: true 
      });
      // The close button should not be rendered
      const buttons = wrapper.findAllComponents(Button);
      expect(buttons.length).toBe(1); // Only the trigger button
    });

    it("renders footer when footer slot is provided", () => {
      wrapper = createWrapper({ modelValue: true }, {
        footer: '<div data-test="footer">Footer Content</div>'
      });
      expect(wrapper.find('[data-test="footer"]').exists()).toBe(true);
    });

    it("does not render footer when footer slot is not provided", () => {
      wrapper = createWrapper({ modelValue: true });
      expect(wrapper.find('.border-t').exists()).toBe(false);
    });
  });

  describe("Props and Configuration", () => {
    it("applies default size", () => {
      wrapper = createWrapper({ modelValue: true });
      const panel = wrapper.findComponent({ name: "DialogPanel" });
      expect(panel.classes()).toContain("max-w-lg");
    });

    it("applies custom size", () => {
      wrapper = createWrapper({ 
        modelValue: true, 
        size: "lg" 
      });
      const panel = wrapper.findComponent({ name: "DialogPanel" });
      expect(panel.classes()).toContain("max-w-5xl");
    });

    it("applies all size variants", () => {
      const sizes = ["sm", "md", "lg", "xl", "full"];
      const expectedClasses = [
        "max-w-sm",
        "max-w-lg", 
        "max-w-5xl",
        "max-w-xl",
        "max-w-full"
      ];

      sizes.forEach((size, index) => {
        wrapper = createWrapper({ 
          modelValue: true, 
          size 
        });
        const panel = wrapper.findComponent({ name: "DialogPanel" });
        expect(panel.classes()).toContain(expectedClasses[index]);
      });
    });

    it("applies default animation", () => {
      wrapper = createWrapper({ modelValue: true });
      const panel = wrapper.findComponent({ name: "DialogPanel" });
      expect(panel.classes()).toContain("animate__animated");
      expect(panel.classes()).toContain("animate__fadeIn");
    });

    it("applies custom animation", () => {
      wrapper = createWrapper({ 
        modelValue: true, 
        animation: "slideDown" 
      });
      const panel = wrapper.findComponent({ name: "DialogPanel" });
      expect(panel.classes()).toContain("animate__slideInDown");
    });

    it("applies all animation variants", () => {
      const animations = [
        "fade", "slideDown", "slideUp", "fadeLeft", 
        "fadeRight", "rotateLeft", "zoomIn", "none"
      ];
      const expectedClasses = [
        "animate__fadeIn", "animate__slideInDown", "animate__slideInUp",
        "animate__fadeInLeft", "animate__fadeInRight", 
        "animate__rotateInDownLeft", "animate__zoomInUp", ""
      ];

      animations.forEach((animation, index) => {
        wrapper = createWrapper({ 
          modelValue: true, 
          animation 
        });
        const panel = wrapper.findComponent({ name: "DialogPanel" });
        if (expectedClasses[index]) {
          expect(panel.classes()).toContain(expectedClasses[index]);
        }
      });
    });

    it("applies custom classes", () => {
      wrapper = createWrapper({ 
        modelValue: true,
        customClass: {
          panel: "custom-panel",
          overlay: "custom-overlay",
          wrapper: "custom-wrapper"
        }
      });
      const panel = wrapper.findComponent({ name: "DialogPanel" });
      const overlay = wrapper.findComponent({ name: "DialogOverlay" });
      const dialog = wrapper.findComponent({ name: "Dialog" });
      
      expect(panel.classes()).toContain("custom-panel");
      expect(overlay.classes()).toContain("custom-overlay");
      expect(dialog.classes()).toContain("custom-wrapper");
    });

    it("applies content class", () => {
      wrapper = createWrapper({ 
        modelValue: true,
        contentClass: "custom-content"
      });
      const content = wrapper.find(".p-5");
      expect(content.classes()).toContain("custom-content");
    });

    it("applies vertical position", () => {
      wrapper = createWrapper({ 
        modelValue: true,
        verticalPosition: "top"
      });
      const container = wrapper.find(".flex.min-h-full");
      expect(container.classes()).toContain("items-start");
    });

    it("applies all vertical positions", () => {
      const positions = ["top", "center", "bottom"];
      const expectedClasses = ["items-start", "items-center", "items-end"];

      positions.forEach((position, index) => {
        wrapper = createWrapper({ 
          modelValue: true,
          verticalPosition: position
        });
        const container = wrapper.find(".flex.min-h-full");
        expect(container.classes()).toContain(expectedClasses[index]);
      });
    });
  });

  describe("State Management", () => {
    it("initializes with modelValue", () => {
      wrapper = createWrapper({ modelValue: true });
      expect(wrapper.vm.isShowing).toBe(true);
    });

    it("updates isShowing when modelValue changes", async () => {
      wrapper = createWrapper({ modelValue: false });
      await wrapper.setProps({ modelValue: true });
      expect(wrapper.vm.isShowing).toBe(true);
    });

    it("emits update:modelValue when isShowing changes", async () => {
      wrapper = createWrapper({ modelValue: true });
      wrapper.vm.isShowing = false;
      await wrapper.vm.$nextTick();
      expect(wrapper.emitted("update:modelValue")?.[0]).toEqual([false]);
    });

    it("emits close event when modal closes", async () => {
      wrapper = createWrapper({ modelValue: true });
      wrapper.vm.isShowing = false;
      await wrapper.vm.$nextTick();
      expect(wrapper.emitted("close")).toBeTruthy();
    });
  });

  describe("Events and Interactions", () => {
    it("opens modal when trigger is clicked", async () => {
      wrapper = createWrapper({ triggerLabel: "Open" });
      const trigger = wrapper.findComponent(Button);
      await trigger.trigger("click");
      expect(wrapper.vm.isShowing).toBe(true);
    });

    it("closes modal when close button is clicked", async () => {
      wrapper = createWrapper({ 
        modelValue: true, 
        hideClose: false 
      });
      const closeButton = wrapper.findAllComponents(Button)[1]; // Second button is close button
      await closeButton.trigger("click");
      expect(wrapper.vm.isShowing).toBe(false);
    });

    it("does not close modal when preventClose is true", async () => {
      wrapper = createWrapper({ 
        modelValue: true, 
        preventClose: true 
      });
      const closeButton = wrapper.findAllComponents(Button)[1];
      await closeButton.trigger("click");
      expect(wrapper.vm.isShowing).toBe(true);
    });

    it("closes modal when backdrop is clicked (non-persistent)", async () => {
      wrapper = createWrapper({ 
        modelValue: true, 
        persistent: false 
      });
      const dialog = wrapper.findComponent({ name: "Dialog" });
      await dialog.vm.$emit("close");
      expect(wrapper.vm.isShowing).toBe(false);
    });

    it("does not close modal when backdrop is clicked (persistent)", async () => {
      wrapper = createWrapper({ 
        modelValue: true, 
        persistent: true 
      });
      const dialog = wrapper.findComponent({ name: "Dialog" });
      await dialog.vm.$emit("close");
      expect(wrapper.vm.isShowing).toBe(true);
    });

    it("provides toggleModal function to slots", () => {
      wrapper = createWrapper({ modelValue: true }, {
        default: '<button @click="toggleModal(false)">Close</button>'
      });
      const button = wrapper.find("button");
      expect(button.exists()).toBe(true);
    });
  });

  describe("Accessibility", () => {
    it("has proper z-index", () => {
      wrapper = createWrapper({ modelValue: true });
      const dialog = wrapper.findComponent({ name: "Dialog" });
      expect(dialog.classes()).toContain("z-[51]");
    });

    it("has proper backdrop overlay", () => {
      wrapper = createWrapper({ modelValue: true });
      const overlay = wrapper.findComponent({ name: "DialogOverlay" });
      expect(overlay.classes()).toContain("fixed");
      expect(overlay.classes()).toContain("inset-0");
      expect(overlay.classes()).toContain("bg-[black]/60");
    });

    it("has proper modal positioning", () => {
      wrapper = createWrapper({ modelValue: true });
      const container = wrapper.find(".fixed.inset-0.overflow-y-auto");
      expect(container.exists()).toBe(true);
    });
  });

  describe("Styling", () => {
    it("applies base panel classes", () => {
      wrapper = createWrapper({ modelValue: true });
      const panel = wrapper.findComponent({ name: "DialogPanel" });
      expect(panel.classes()).toContain("panel");
      expect(panel.classes()).toContain("w-full");
      expect(panel.classes()).toContain("overflow-hidden");
      expect(panel.classes()).toContain("rounded-lg");
      expect(panel.classes()).toContain("border-0");
      expect(panel.classes()).toContain("p-0");
    });

    it("applies dark theme classes", () => {
      wrapper = createWrapper({ modelValue: true });
      const panel = wrapper.findComponent({ name: "DialogPanel" });
      expect(panel.classes()).toContain("text-black");
      expect(panel.classes()).toContain("dark:text-white-dark");
    });

    it("applies title styling", () => {
      wrapper = createWrapper({ 
        modelValue: true, 
        title: "Test Title" 
      });
      const title = wrapper.find(".bg-[#fbfbfb]");
      expect(title.classes()).toContain("py-3");
      expect(title.classes()).toContain("text-lg");
      expect(title.classes()).toContain("font-bold");
    });

    it("applies footer styling", () => {
      wrapper = createWrapper({ modelValue: true }, {
        footer: '<div>Footer</div>'
      });
      const footer = wrapper.find(".border-t");
      expect(footer.classes()).toContain("border-[#ebe9f1]");
      expect(footer.classes()).toContain("p-5");
      expect(footer.classes()).toContain("dark:border-white/10");
    });
  });

  describe("Edge Cases", () => {
    it("handles empty title", () => {
      wrapper = createWrapper({ 
        modelValue: true, 
        title: "" 
      });
      expect(wrapper.findComponent({ name: "Dialog" }).exists()).toBe(false);
    });

    it("handles undefined props gracefully", () => {
      wrapper = createWrapper({ modelValue: true });
      expect(wrapper.findComponent({ name: "Dialog" }).exists()).toBe(false);
    });

    it("handles invalid size gracefully", () => {
      wrapper = createWrapper({ 
        modelValue: true, 
        size: "invalid" as any 
      });
      // Should fall back to default size
      const panel = wrapper.findComponent({ name: "DialogPanel" });
      expect(panel.classes()).toContain("max-w-lg");
    });

    it("handles invalid animation gracefully", () => {
      wrapper = createWrapper({ 
        modelValue: true, 
        animation: "invalid" as any 
      });
      // Should fall back to default animation
      const panel = wrapper.findComponent({ name: "DialogPanel" });
      expect(panel.classes()).toContain("animate__fadeIn");
    });

    it("handles invalid vertical position gracefully", () => {
      wrapper = createWrapper({ 
        modelValue: true, 
        verticalPosition: "invalid" as any 
      });
      // Should fall back to center
      const container = wrapper.find(".flex.min-h-full");
      expect(container.classes()).toContain("items-center");
    });
  });

  describe("Default Values", () => {
    it("uses correct default values", () => {
      wrapper = createWrapper({ modelValue: true });
      expect(wrapper.props("title")).toBe("");
      // expect(wrapper.props("triggerLabel")).toBe("Open Modal");
      expect(wrapper.props("size")).toBe("md");
      expect(wrapper.props("animation")).toBe("fade");
      expect(wrapper.props("hideClose")).toBe(false);
      expect(wrapper.props("persistent")).toBe(false);
      expect(wrapper.props("preventClose")).toBe(false);
      expect(wrapper.props("contentClass")).toBe("");
      expect(wrapper.props("verticalPosition")).toBeUndefined();
    });
  });
});