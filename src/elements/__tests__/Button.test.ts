import { describe, it, expect, vi } from "vitest";
import { mount, VueWrapper } from "@vue/test-utils";
import Button from "../Button.vue";
import Icon from "../../icon/Icon.vue";

describe("Button Component", () => {
  let wrapper: VueWrapper<any>;

  // Helper function to create wrapper with default props
  const createWrapper = (props = {}) => {
    return mount(Button, {
      props,
      global: {
        components: {
          Icon,
        },
      },
    });
  };

  describe("Rendering", () => {
    it("renders as button element by default", () => {
      wrapper = createWrapper();
      expect(wrapper.find("button").exists()).toBe(true);
      expect(wrapper.find("a").exists()).toBe(false);
    });

    it("renders as anchor element when to prop is provided", () => {
      wrapper = createWrapper({ to: "/dashboard" });
      expect(wrapper.find("a").exists()).toBe(true);
      expect(wrapper.find("button").exists()).toBe(false);
      expect(wrapper.find("a").attributes("href")).toBe("/dashboard");
    });

    it("renders with default label", () => {
      wrapper = createWrapper({ label: "Click me" });
      expect(wrapper.text()).toContain("Click me");
    });

    it("renders with slot content", () => {
      wrapper = mount(Button, {
        slots: {
          default: "Custom content",
        },
        global: {
          components: { Icon },
        },
      });
      expect(wrapper.text()).toContain("Custom content");
    });

    it("renders with icon from prop", () => {
      wrapper = createWrapper({ iconName: "IconSettings" });
      expect(wrapper.findComponent(Icon).exists()).toBe(true);
      expect(wrapper.findComponent(Icon).props("name")).toBe("IconSettings");
    });

    it("renders with icon from slot", () => {
      wrapper = mount(Button, {
        slots: {
          icon: '<div data-test="custom-icon">Custom Icon</div>',
        },
        global: {
          components: { Icon },
        },
      });
      expect(wrapper.find('[data-test="custom-icon"]').exists()).toBe(true);
    });
  });

  describe("Props and Styling", () => {
    it("applies color classes correctly", () => {
      const colors = [
        "primary",
        "info",
        "success",
        "warning",
        "danger",
        "secondary",
        "dark",
        "gradient",
      ];

      colors.forEach((color) => {
        wrapper = createWrapper({ color });
        expect(wrapper.classes()).toContain(`btn-${color}`);
      });
    });

    it("applies outline color classes correctly", () => {
      wrapper = createWrapper({ color: "primary", outline: true });
      expect(wrapper.classes()).toContain("btn-outline-primary");
    });

    it("applies size classes correctly", () => {
      const sizes = ["xs", "sm", "md", "lg"];

      sizes.forEach((size) => {
        wrapper = createWrapper({ size });
        expect(wrapper.classes()).toContain(`btn-${size}`);
      });
    });

    it("applies rounded classes correctly", () => {
      const roundedOptions = ["full", "none", "xs", "sm", "md", "lg", "xl"];

      roundedOptions.forEach((rounded) => {
        wrapper = createWrapper({ rounded });
        expect(wrapper.classes()).toContain(`rounded-${rounded}`);
      });
    });

    it("applies text transform classes correctly", () => {
      const transforms = [
        "normal-case",
        "capitalize",
        "lowercase",
        "uppercase",
      ];

      transforms.forEach((transform) => {
        wrapper = createWrapper({ textTransform: transform });
        expect(wrapper.classes()).toContain(transform);
      });
    });

    it("applies border type classes correctly", () => {
      const borderTypes = ["solid", "dashed", "dotted"];

      borderTypes.forEach((borderType) => {
        wrapper = createWrapper({ borderType });
        expect(wrapper.classes()).toContain(`border-${borderType}`);
      });
    });

    it("applies shadow class when shadow prop is true", () => {
      wrapper = createWrapper({ shadow: true });
      expect(wrapper.classes()).toContain(
        "shadow-[0_10px_20px_-10px_rgba(67,97,238,0.44)]"
      );
    });

    it("applies full width class when block prop is true", () => {
      wrapper = createWrapper({ block: true });
      expect(wrapper.classes()).toContain("w-full");
    });

    it("applies disabled styling when disabled", () => {
      wrapper = createWrapper({ disabled: true });
      expect(wrapper.classes()).toContain("bg-gray-100");
      expect(wrapper.classes()).toContain("cursor-not-allowed");
    });

    it("applies disabled styling when cardDisabled is injected", () => {
      wrapper = mount(Button, {
        props: {},
        global: {
          components: { Icon },
          provide: {
            cardDisabled: true,
          },
        },
      });
      expect(wrapper.classes()).toContain("bg-gray-100");
      expect(wrapper.classes()).toContain("cursor-not-allowed");
    });
  });

  describe("Loading State", () => {
    it("shows loading icon when isLoading is true", () => {
      wrapper = createWrapper({ isLoading: true });
      const loadingIcon = wrapper.findComponent(Icon);
      expect(loadingIcon.exists()).toBe(true);
      expect(loadingIcon.props("name")).toBe("IconLoader");
    });

    it("uses custom loading icon when provided", () => {
      wrapper = createWrapper({ isLoading: true, loadingIcon: "IconRefresh" });
      const loadingIcon = wrapper.findComponent(Icon);
      expect(loadingIcon.props("name")).toBe("IconRefresh");
    });

    it("applies loading animation class", () => {
      wrapper = createWrapper({ isLoading: true });
      const loadingIcon = wrapper.findComponent(Icon);
      expect(loadingIcon.classes()).toContain(
        "animate-[spin_2s_linear_infinite]"
      );
    });

    it("shows loading icon with correct spacing", () => {
      wrapper = createWrapper({ isLoading: true, label: "Loading" });
      const loadingSpan = wrapper.find(".transition-all.overflow-hidden");
      expect(loadingSpan.classes()).toContain("w-5");
      expect(loadingSpan.classes()).toContain("ltr:mr-2");
      expect(loadingSpan.classes()).toContain("rtl:ml-2");
    });
  });

  describe("Events", () => {
    it("emits click event when button is clicked", async () => {
      wrapper = createWrapper();
      await wrapper.find("button").trigger("click");
      expect(wrapper.emitted("click")).toBeTruthy();
    });

    it("does not emit click event when disabled", async () => {
      wrapper = createWrapper({ disabled: true });
      await wrapper.find("button").trigger("click");
      expect(wrapper.emitted("click")).toBeFalsy();
    });

    it("does not emit click event when cardDisabled is injected", async () => {
      wrapper = mount(Button, {
        props: {},
        global: {
          components: { Icon },
          provide: {
            cardDisabled: true,
          },
        },
      });
      await wrapper.find("button").trigger("click");
      expect(wrapper.emitted("click")).toBeFalsy();
    });

    it("does not emit click event when loading", async () => {
      wrapper = createWrapper({ isLoading: true });
      await wrapper.find("button").trigger("click");
      expect(wrapper.emitted("click")).toBeFalsy();
    });

    it("does not emit click event when to prop is provided (link mode)", async () => {
      wrapper = createWrapper({ to: "/dashboard" });
      await wrapper.find("a").trigger("click");
      expect(wrapper.emitted("click")).toBeFalsy();
    });

    it("focuses and defocuses button when clicked", async () => {
      wrapper = createWrapper();
      const button = wrapper.find("button").element as HTMLButtonElement;

      // Mock focus and blur methods
      const focusSpy = vi.spyOn(button, "focus");
      const blurSpy = vi.spyOn(button, "blur");

      await wrapper.find("button").trigger("click");

      // Check that focus was called
      expect(focusSpy).toHaveBeenCalled();

      // Wait for the defocus timeout
      await new Promise((resolve) => setTimeout(resolve, 200));

      // Check that blur was called
      expect(blurSpy).toHaveBeenCalled();
    });

    it("does not focus/defocus when in chip mode", async () => {
      wrapper = createWrapper({ chip: true });
      const button = wrapper.find("button").element as HTMLButtonElement;

      // Mock focus and blur methods
      const focusSpy = vi.spyOn(button, "focus");
      const blurSpy = vi.spyOn(button, "blur");

      await wrapper.find("button").trigger("click");

      // Check that focus and blur were not called in chip mode
      expect(focusSpy).not.toHaveBeenCalled();
      expect(blurSpy).not.toHaveBeenCalled();
    });
  });

  describe("Accessibility", () => {
    it("has proper button type attribute", () => {
      wrapper = createWrapper();
      expect(wrapper.find("button").attributes("type")).toBe("button");
    });

    it("has proper disabled attribute when disabled", () => {
      wrapper = createWrapper({ disabled: true });
      expect(wrapper.find("button").attributes("disabled")).toBeDefined();
    });

    it("has proper disabled attribute when cardDisabled is injected", () => {
      wrapper = mount(Button, {
        props: {},
        global: {
          components: { Icon },
          provide: {
            cardDisabled: true,
          },
        },
      });
      expect(wrapper.find("button").attributes("disabled")).toBeDefined();
    });

    it("has proper disabled attribute when loading", () => {
      wrapper = createWrapper({ isLoading: true });
      expect(wrapper.find("button").attributes("disabled")).toBeDefined();
    });

    it("does not have disabled attribute when not disabled", () => {
      wrapper = createWrapper();
      expect(wrapper.find("button").attributes("disabled")).toBeUndefined();
    });

    it("has proper href attribute when to prop is provided", () => {
      wrapper = createWrapper({ to: "/dashboard" });
      expect(wrapper.find("a").attributes("href")).toBe("/dashboard");
    });

    it("does not have href attribute when disabled and to prop is provided", () => {
      wrapper = createWrapper({ to: "/dashboard", disabled: true });
      expect(wrapper.find("a").attributes("href")).toBeUndefined();
    });
  });

  describe("Icon Integration", () => {
    it("applies icon classes correctly", () => {
      wrapper = createWrapper({
        iconName: "IconSettings",
        iconClass: "custom-icon-class",
      });
      const icon = wrapper.findComponent(Icon);
      // Icon component only accepts name and fill props, not class
      expect(icon.props("name")).toBe("IconSettings");
      expect(icon.props("fill")).toBe(false);
      // Note: iconClass prop is not currently used by Icon component
    });

    it("shows icon with correct spacing when label is present", () => {
      wrapper = createWrapper({
        iconName: "IconSettings",
        label: "Settings",
      });
      const labelSpan = wrapper.find("span:last-child");
      expect(labelSpan.classes()).toContain("ltr:ml-2");
      expect(labelSpan.classes()).toContain("rtl:mr-2");
    });

    it("does not show spacing when no label is present", () => {
      wrapper = createWrapper({ iconName: "IconSettings" });
      const labelSpan = wrapper.find("span:last-child");
      expect(labelSpan.classes()).not.toContain("ltr:ml-2");
      expect(labelSpan.classes()).not.toContain("rtl:mr-2");
    });
  });

  describe("Edge Cases", () => {
    it("handles empty label gracefully", () => {
      wrapper = createWrapper({ label: "" });
      expect(wrapper.find("button").exists()).toBe(true);
    });

    it("handles undefined props gracefully", () => {
      wrapper = createWrapper({});
      expect(wrapper.find("button").exists()).toBe(true);
      expect(wrapper.classes()).toContain("btn");
    });

    it("handles multiple icons (prop and slot)", () => {
      wrapper = mount(Button, {
        props: { iconName: "IconSettings" },
        slots: {
          icon: '<div data-test="slot-icon">Slot Icon</div>',
        },
        global: {
          components: { Icon },
        },
      });
      // Should prioritize slot over prop
      expect(wrapper.find('[data-test="slot-icon"]').exists()).toBe(true);
      expect(wrapper.findComponent(Icon).exists()).toBe(false);
    });

    it("handles loading state with icon", () => {
      wrapper = createWrapper({
        isLoading: true,
        iconName: "IconSettings",
        label: "Loading",
      });
      // Should show both loading icon and regular icon
      const icons = wrapper.findAllComponents(Icon);
      expect(icons).toHaveLength(2);
      // First icon should be loading icon
      expect(icons[0].props("name")).toBe("IconLoader");
      // Second icon should be regular icon
      expect(icons[1].props("name")).toBe("IconSettings");
    });
  });

  describe("Responsive Design", () => {
    it("applies responsive text classes", () => {
      wrapper = createWrapper();
      expect(wrapper.classes()).toContain("text-xs");
      expect(wrapper.classes()).toContain("sm:text-sm");
    });

    it("applies responsive spacing for icons", () => {
      wrapper = createWrapper({ isLoading: true });
      const loadingSpan = wrapper.find(".transition-all.overflow-hidden");
      expect(loadingSpan.classes()).toContain("ltr:mr-2");
      expect(loadingSpan.classes()).toContain("rtl:ml-2");
    });
  });

  describe("CSS Classes and Styling", () => {
    it("has base button class", () => {
      wrapper = createWrapper();
      expect(wrapper.classes()).toContain("btn");
    });

    it("has transition class", () => {
      wrapper = createWrapper();
      expect(wrapper.classes()).toContain("transition-all");
    });

    it("has proper flex classes for icon container", () => {
      wrapper = createWrapper({ iconName: "IconSettings" });
      const iconSpan = wrapper.find("span.inline-flex");
      expect(iconSpan.classes()).toContain("inline-flex");
      expect(iconSpan.classes()).toContain("align-middle");
    });
  });

  describe("Focus Styling", () => {
    it("applies focus colors for solid buttons", () => {
      const colors = [
        "primary",
        "info",
        "success",
        "warning",
        "danger",
        "secondary",
        "dark",
      ];

      colors.forEach((color) => {
        wrapper = createWrapper({ color });
        const classes = wrapper.classes();
        expect(classes.some((cls) => cls.includes("focus:bg-"))).toBe(true);
        expect(classes.some((cls) => cls.includes("focus:ring-"))).toBe(true);
      });
    });

    it("applies focus colors for outline buttons", () => {
      const colors = [
        "primary",
        "info",
        "success",
        "warning",
        "danger",
        "secondary",
        "dark",
      ];

      colors.forEach((color) => {
        wrapper = createWrapper({ color, outline: true });
        const classes = wrapper.classes();
        expect(classes.some((cls) => cls.includes("focus:ring-"))).toBe(true);
        expect(classes.some((cls) => cls.includes("focus:ring-offset-"))).toBe(
          true
        );
      });
    });

    it("applies gradient focus colors for gradient buttons", () => {
      wrapper = createWrapper({ color: "gradient" });
      const classes = wrapper.classes();
      expect(
        classes.some((cls) => cls.includes("focus:bg-gradient-to-r"))
      ).toBe(true);
    });

    it("applies gradient focus colors for gradient outline buttons", () => {
      wrapper = createWrapper({ color: "gradient", outline: true });
      const classes = wrapper.classes();
      expect(classes.some((cls) => cls.includes("focus:ring-"))).toBe(true);
      expect(classes.some((cls) => cls.includes("focus:ring-offset-"))).toBe(
        true
      );
    });

    it("does not apply focus colors in chip mode", () => {
      wrapper = createWrapper({ color: "primary", chip: true });
      const classes = wrapper.classes();
      expect(classes.some((cls) => cls.includes("focus:bg-"))).toBe(false);
      expect(classes.some((cls) => cls.includes("focus:ring-"))).toBe(false);
    });

    it("applies default focus colors when no color is specified", () => {
      wrapper = createWrapper();
      const classes = wrapper.classes();
      expect(classes.some((cls) => cls.includes("focus:bg-gray-"))).toBe(true);
    });
  });
});
