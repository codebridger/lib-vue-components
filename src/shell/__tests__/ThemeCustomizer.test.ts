import { describe, it, expect, vi, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import ThemeCustomizer from "@/shell/ThemeCustomizer.vue";

// Mock the store
const mockStore = {
  theme: "light",
  menu: "vertical",
  layout: "full",
  rtlClass: "ltr",
  animation: "animate__fadeIn",
  navbar: "navbar-sticky",
  semidark: false,
  toggleTheme: vi.fn(),
  toggleMenuStyle: vi.fn(),
  toggleLayout: vi.fn(),
  toggleRTL: vi.fn(),
  toggleAnimation: vi.fn(),
  toggleNavbar: vi.fn(),
  toggleSemidark: vi.fn(),
};

vi.mock("@/stores/index", () => ({
  useAppStore: () => mockStore,
}));

// Mock Icon component
vi.mock("@/icon/Icon.vue", () => ({
  default: {
    name: "Icon",
    template: "<span class='icon'></span>",
    props: ["name"],
  },
}));

describe("ThemeCustomizer Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockStore.theme = "light";
    mockStore.menu = "vertical";
    mockStore.layout = "full";
    mockStore.rtlClass = "ltr";
    mockStore.animation = "animate__fadeIn";
    mockStore.navbar = "navbar-sticky";
    mockStore.semidark = false;
  });

  describe("Rendering", () => {
    it("renders as div element", () => {
      const wrapper = mount(ThemeCustomizer);

      expect(wrapper.element.tagName).toBe("DIV");
    });

    it("renders toggle button", () => {
      const wrapper = mount(ThemeCustomizer);

      const toggleButton = wrapper.find('a[href="javascript:;"]');
      expect(toggleButton.exists()).toBe(true);
    });

    it("renders settings icon in toggle button", () => {
      const wrapper = mount(ThemeCustomizer);

      const icon = wrapper.find('a[href="javascript:;"] .icon');
      expect(icon.exists()).toBe(true);
    });

    it("renders overlay when customizer is open", async () => {
      const wrapper = mount(ThemeCustomizer);

      // Initially overlay should be hidden
      const overlay = wrapper.find(".fixed.inset-0");
      expect(overlay.classes()).toContain("hidden");

      // Click toggle button to open customizer
      await wrapper.find('a[href="javascript:;"]').trigger("click");

      // Overlay should now be visible
      expect(overlay.classes()).toContain("!block");
    });

    it("renders customizer panel", () => {
      const wrapper = mount(ThemeCustomizer);

      const panel = wrapper.find("nav.bg-white");
      expect(panel.exists()).toBe(true);
    });

    it("shows panel when customizer is open", async () => {
      const wrapper = mount(ThemeCustomizer);

      // Initially panel should be closed
      const panel = wrapper.find("nav.bg-white");
      expect(panel.classes()).not.toContain("ltr:!right-0");

      // Click toggle button to open
      await wrapper.find('a[href="javascript:;"]').trigger("click");

      // Panel should now be open
      expect(panel.classes()).toContain("ltr:!right-0");
    });

    it("closes panel when overlay is clicked", async () => {
      const wrapper = mount(ThemeCustomizer);

      // Open customizer first
      await wrapper.find('a[href="javascript:;"]').trigger("click");

      // Click overlay to close
      const overlay = wrapper.find(".fixed.inset-0");
      if (overlay.exists()) {
        await overlay.trigger("click");
      }

      // Panel should be closed
      const panel = wrapper.find("nav.bg-white");
      expect(panel.classes()).not.toContain("ltr:!right-0");
    });

    it("closes panel when close button is clicked", async () => {
      const wrapper = mount(ThemeCustomizer);

      // Open customizer first
      await wrapper.find('a[href="javascript:;"]').trigger("click");

      // Click close button
      const closeButtons = wrapper.findAll('a[href="javascript:;"]');
      await closeButtons[1].trigger("click");

      // Panel should be closed
      const panel = wrapper.find("nav.bg-white");
      expect(panel.classes()).not.toContain("ltr:!right-0");
    });
  });

  describe("Color Scheme Section", () => {
    it("renders color scheme section", () => {
      const wrapper = mount(ThemeCustomizer);

      expect(wrapper.text()).toContain("Color Scheme");
    });

    it("renders light theme button", () => {
      const wrapper = mount(ThemeCustomizer);

      const buttons = wrapper.findAll("button");
      const lightButton = buttons.find((button) =>
        button.text().includes("Light")
      );
      expect(lightButton?.exists()).toBe(true);
    });

    it("renders dark theme button", () => {
      const wrapper = mount(ThemeCustomizer);

      const buttons = wrapper.findAll("button");
      const darkButton = buttons.find((button) =>
        button.text().includes("Dark")
      );
      expect(darkButton?.exists()).toBe(true);
    });

    it("renders system theme button", () => {
      const wrapper = mount(ThemeCustomizer);

      const buttons = wrapper.findAll("button");
      const systemButton = buttons.find((button) =>
        button.text().includes("System")
      );
      expect(systemButton?.exists()).toBe(true);
    });

    it("applies primary class to active theme button", () => {
      mockStore.theme = "dark";
      const wrapper = mount(ThemeCustomizer);

      const buttons = wrapper.findAll("button");
      const darkButton = buttons.find((button) =>
        button.text().includes("Dark")
      );
      expect(darkButton?.classes()).toContain("btn-primary");
    });

    it("applies outline class to inactive theme buttons", () => {
      mockStore.theme = "dark";
      const wrapper = mount(ThemeCustomizer);

      const buttons = wrapper.findAll("button");
      const lightButton = buttons.find((button) =>
        button.text().includes("Light")
      );
      const systemButton = buttons.find((button) =>
        button.text().includes("System")
      );

      expect(lightButton?.classes()).toContain("btn-outline-primary");
      expect(systemButton?.classes()).toContain("btn-outline-primary");
    });

    it("calls toggleTheme when light button is clicked", async () => {
      const wrapper = mount(ThemeCustomizer);

      const buttons = wrapper.findAll("button");
      const lightButton = buttons.find((button) =>
        button.text().includes("Light")
      );
      await lightButton?.trigger("click");

      expect(mockStore.toggleTheme).toHaveBeenCalledWith("light");
    });

    it("calls toggleTheme when dark button is clicked", async () => {
      const wrapper = mount(ThemeCustomizer);

      const buttons = wrapper.findAll("button");
      const darkButton = buttons.find((button) =>
        button.text().includes("Dark")
      );
      await darkButton?.trigger("click");

      expect(mockStore.toggleTheme).toHaveBeenCalledWith("dark");
    });

    it("calls toggleTheme when system button is clicked", async () => {
      const wrapper = mount(ThemeCustomizer);

      const buttons = wrapper.findAll("button");
      const systemButton = buttons.find((button) =>
        button.text().includes("System")
      );
      await systemButton?.trigger("click");

      expect(mockStore.toggleTheme).toHaveBeenCalledWith("system");
    });
  });

  describe("Navigation Position Section", () => {
    it("renders navigation position section", () => {
      const wrapper = mount(ThemeCustomizer);

      expect(wrapper.text()).toContain("Navigation Position");
      expect(wrapper.text()).toContain(
        "Select the primary navigation paradigm for your app."
      );
    });

    it("renders horizontal button", () => {
      const wrapper = mount(ThemeCustomizer);

      const buttons = wrapper.findAll("button");
      const horizontalButton = buttons.find((button) =>
        button.text().includes("Horizontal")
      );
      expect(horizontalButton?.exists()).toBe(true);
    });

    it("renders vertical button", () => {
      const wrapper = mount(ThemeCustomizer);

      const buttons = wrapper.findAll("button");
      const verticalButton = buttons.find((button) =>
        button.text().includes("Vertical")
      );
      expect(verticalButton?.exists()).toBe(true);
    });

    it("renders collapsible button", () => {
      const wrapper = mount(ThemeCustomizer);

      const buttons = wrapper.findAll("button");
      const collapsibleButton = buttons.find((button) =>
        button.text().includes("Collapsible")
      );
      expect(collapsibleButton?.exists()).toBe(true);
    });

    it("applies primary class to active menu style button", () => {
      mockStore.menu = "horizontal";
      const wrapper = mount(ThemeCustomizer);

      const buttons = wrapper.findAll("button");
      const horizontalButton = buttons.find((button) =>
        button.text().includes("Horizontal")
      );
      expect(horizontalButton?.classes()).toContain("btn-primary");
    });

    it("calls toggleMenuStyle when horizontal button is clicked", async () => {
      const wrapper = mount(ThemeCustomizer);

      const buttons = wrapper.findAll("button");
      const horizontalButton = buttons.find((button) =>
        button.text().includes("Horizontal")
      );
      await horizontalButton?.trigger("click");

      expect(mockStore.toggleMenuStyle).toHaveBeenCalledWith("horizontal");
    });

    it("calls toggleMenuStyle when vertical button is clicked", async () => {
      const wrapper = mount(ThemeCustomizer);

      const buttons = wrapper.findAll("button");
      const verticalButton = buttons.find((button) =>
        button.text().includes("Vertical")
      );
      await verticalButton?.trigger("click");

      expect(mockStore.toggleMenuStyle).toHaveBeenCalledWith("vertical");
    });

    it("calls toggleMenuStyle when collapsible button is clicked", async () => {
      const wrapper = mount(ThemeCustomizer);

      const buttons = wrapper.findAll("button");
      const collapsibleButton = buttons.find((button) =>
        button.text().includes("Collapsible")
      );
      await collapsibleButton?.trigger("click");

      expect(mockStore.toggleMenuStyle).toHaveBeenCalledWith(
        "collapsible-vertical"
      );
    });

    it("renders semi dark checkbox", () => {
      const wrapper = mount(ThemeCustomizer);

      const checkbox = wrapper.find('input[type="checkbox"]');
      expect(checkbox.exists()).toBe(true);
      expect(wrapper.text()).toContain("Semi Dark (Sidebar & Header)");
    });

    it("binds semidark value to checkbox", () => {
      mockStore.semidark = true;
      const wrapper = mount(ThemeCustomizer);

      const checkbox = wrapper.find('input[type="checkbox"]');
      expect(checkbox.element.checked).toBe(true);
    });

    it("calls toggleSemidark when checkbox is changed", async () => {
      const wrapper = mount(ThemeCustomizer);

      const checkbox = wrapper.find('input[type="checkbox"]');
      await checkbox.setValue(true);

      expect(mockStore.toggleSemidark).toHaveBeenCalledWith(true);
    });
  });

  describe("Layout Style Section", () => {
    it("renders layout style section", () => {
      const wrapper = mount(ThemeCustomizer);

      expect(wrapper.text()).toContain("Layout Style");
      expect(wrapper.text()).toContain(
        "Select the primary layout style for your app."
      );
    });

    it("renders box layout button", () => {
      const wrapper = mount(ThemeCustomizer);

      const buttons = wrapper.findAll("button");
      const boxButton = buttons.find((button) => button.text().includes("Box"));
      expect(boxButton?.exists()).toBe(true);
    });

    it("renders full layout button", () => {
      const wrapper = mount(ThemeCustomizer);

      const buttons = wrapper.findAll("button");
      const fullButton = buttons.find((button) =>
        button.text().includes("Full")
      );
      expect(fullButton?.exists()).toBe(true);
    });

    it("applies primary class to active layout button", () => {
      mockStore.layout = "boxed-layout";
      const wrapper = mount(ThemeCustomizer);

      const buttons = wrapper.findAll("button");
      const boxButton = buttons.find((button) => button.text().includes("Box"));
      expect(boxButton?.classes()).toContain("btn-primary");
    });

    it("calls toggleLayout when box button is clicked", async () => {
      const wrapper = mount(ThemeCustomizer);

      const buttons = wrapper.findAll("button");
      const boxButton = buttons.find((button) => button.text().includes("Box"));
      await boxButton?.trigger("click");

      expect(mockStore.toggleLayout).toHaveBeenCalledWith("boxed-layout");
    });

    it("calls toggleLayout when full button is clicked", async () => {
      const wrapper = mount(ThemeCustomizer);

      const buttons = wrapper.findAll("button");
      const fullButton = buttons.find((button) =>
        button.text().includes("Full")
      );
      await fullButton?.trigger("click");

      expect(mockStore.toggleLayout).toHaveBeenCalledWith("full");
    });
  });

  describe("Direction Section", () => {
    it("renders direction section", () => {
      const wrapper = mount(ThemeCustomizer);

      expect(wrapper.text()).toContain("Direction");
      expect(wrapper.text()).toContain("Select the direction for your app.");
    });

    it("renders LTR button", () => {
      const wrapper = mount(ThemeCustomizer);

      const buttons = wrapper.findAll("button");
      const ltrButton = buttons.find((button) => button.text().includes("LTR"));
      expect(ltrButton?.exists()).toBe(true);
    });

    it("renders RTL button", () => {
      const wrapper = mount(ThemeCustomizer);

      const buttons = wrapper.findAll("button");
      const rtlButton = buttons.find((button) => button.text().includes("RTL"));
      expect(rtlButton?.exists()).toBe(true);
    });

    it("applies primary class to active direction button", () => {
      mockStore.rtlClass = "rtl";
      const wrapper = mount(ThemeCustomizer);

      const buttons = wrapper.findAll("button");
      const rtlButton = buttons.find((button) => button.text().includes("RTL"));
      expect(rtlButton?.classes()).toContain("btn-primary");
    });

    it("calls toggleRTL when LTR button is clicked", async () => {
      const wrapper = mount(ThemeCustomizer);

      const buttons = wrapper.findAll("button");
      const ltrButton = buttons.find((button) => button.text().includes("LTR"));
      await ltrButton?.trigger("click");

      expect(mockStore.toggleRTL).toHaveBeenCalledWith("ltr");
    });

    it("calls toggleRTL when RTL button is clicked", async () => {
      const wrapper = mount(ThemeCustomizer);

      const buttons = wrapper.findAll("button");
      const rtlButton = buttons.find((button) => button.text().includes("RTL"));
      await rtlButton?.trigger("click");

      expect(mockStore.toggleRTL).toHaveBeenCalledWith("rtl");
    });
  });

  describe("Navbar Type Section", () => {
    it("renders navbar type section", () => {
      const wrapper = mount(ThemeCustomizer);

      expect(wrapper.text()).toContain("Navbar Type");
      expect(wrapper.text()).toContain("Sticky or Floating.");
    });

    it("renders sticky radio button", () => {
      const wrapper = mount(ThemeCustomizer);

      const stickyRadio = wrapper.find('input[value="navbar-sticky"]');
      expect(stickyRadio.exists()).toBe(true);
      expect(wrapper.text()).toContain("Sticky");
    });

    it("renders floating radio button", () => {
      const wrapper = mount(ThemeCustomizer);

      const floatingRadio = wrapper.find('input[value="navbar-floating"]');
      expect(floatingRadio.exists()).toBe(true);
      expect(wrapper.text()).toContain("Floating");
    });

    it("renders static radio button", () => {
      const wrapper = mount(ThemeCustomizer);

      const staticRadio = wrapper.find('input[value="navbar-static"]');
      expect(staticRadio.exists()).toBe(true);
      expect(wrapper.text()).toContain("Static");
    });

    it("checks active navbar type radio button", () => {
      mockStore.navbar = "navbar-floating";
      const wrapper = mount(ThemeCustomizer);

      const floatingRadio = wrapper.find('input[value="navbar-floating"]');
      expect(floatingRadio.element.checked).toBe(true);
    });

    it("calls toggleNavbar when sticky radio is changed", async () => {
      const wrapper = mount(ThemeCustomizer);

      const stickyRadio = wrapper.find('input[value="navbar-sticky"]');
      await stickyRadio.trigger("change");

      expect(mockStore.toggleNavbar).toHaveBeenCalledWith("navbar-sticky");
    });

    it("calls toggleNavbar when floating radio is changed", async () => {
      const wrapper = mount(ThemeCustomizer);

      const floatingRadio = wrapper.find('input[value="navbar-floating"]');
      await floatingRadio.trigger("change");

      expect(mockStore.toggleNavbar).toHaveBeenCalledWith("navbar-floating");
    });

    it("calls toggleNavbar when static radio is changed", async () => {
      const wrapper = mount(ThemeCustomizer);

      const staticRadio = wrapper.find('input[value="navbar-static"]');
      await staticRadio.trigger("change");

      expect(mockStore.toggleNavbar).toHaveBeenCalledWith("navbar-static");
    });
  });

  describe("Router Transition Section", () => {
    it("renders router transition section", () => {
      const wrapper = mount(ThemeCustomizer);

      expect(wrapper.text()).toContain("Router Transition");
      expect(wrapper.text()).toContain("Animation of main content.");
    });

    it("renders animation select dropdown", () => {
      const wrapper = mount(ThemeCustomizer);

      const select = wrapper.find("select");
      expect(select.exists()).toBe(true);
    });

    it("binds animation value to select", () => {
      mockStore.animation = "animate__fadeInDown";
      const wrapper = mount(ThemeCustomizer);

      const select = wrapper.find("select");
      expect(select.element.value).toBe("animate__fadeInDown");
    });

    it("calls toggleAnimation when select is changed", async () => {
      const wrapper = mount(ThemeCustomizer);

      const select = wrapper.find("select");
      await select.setValue("animate__fadeInUp");

      expect(mockStore.toggleAnimation).toHaveBeenCalled();
    });

    it("has all animation options", () => {
      const wrapper = mount(ThemeCustomizer);

      const select = wrapper.find("select");
      const options = select.findAll("option");

      const optionValues = options.map((option) => option.element.value);
      expect(optionValues).toContain("");
      expect(optionValues).toContain("animate__fadeIn");
      expect(optionValues).toContain("animate__fadeInDown");
      expect(optionValues).toContain("animate__fadeInUp");
      expect(optionValues).toContain("animate__fadeInLeft");
      expect(optionValues).toContain("animate__fadeInRight");
      expect(optionValues).toContain("animate__slideInDown");
      expect(optionValues).toContain("animate__slideInLeft");
      expect(optionValues).toContain("animate__slideInRight");
      expect(optionValues).toContain("animate__zoomIn");
    });
  });

  describe("User Interactions", () => {
    it("toggles customizer visibility when toggle button is clicked", async () => {
      const wrapper = mount(ThemeCustomizer);

      // Initially customizer should be closed
      const panel = wrapper.find("nav.bg-white");
      expect(panel.classes()).not.toContain("ltr:!right-0");

      // Click toggle button to open
      const toggleButton = wrapper.find('a[href="javascript:;"]');
      await toggleButton.trigger("click");

      // Panel should now be open
      expect(panel.classes()).toContain("ltr:!right-0");
    });

    it("closes customizer when overlay is clicked", async () => {
      const wrapper = mount(ThemeCustomizer);

      // Open customizer first
      const toggleButton = wrapper.find('a[href="javascript:;"]');
      await toggleButton.trigger("click");

      // Click overlay to close
      const overlay = wrapper.find(".fixed.inset-0");
      await overlay.trigger("click");

      // Panel should be closed
      const panel = wrapper.find("nav.bg-white");
      expect(panel.classes()).not.toContain("ltr:!right-0");
    });

    it("closes customizer when close button is clicked", async () => {
      const wrapper = mount(ThemeCustomizer);

      // Open customizer first
      const toggleButton = wrapper.find('a[href="javascript:;"]');
      await toggleButton.trigger("click");

      // Click close button (the X button inside the panel)
      const closeButtons = wrapper.findAll('a[href="javascript:;"]');
      await closeButtons[1].trigger("click"); // Second close button

      // Panel should be closed
      const panel = wrapper.find("nav.bg-white");
      expect(panel.classes()).not.toContain("ltr:!right-0");
    });
  });

  describe("Store Integration", () => {
    it("uses store values for initial state", () => {
      mockStore.theme = "dark";
      mockStore.menu = "horizontal";
      mockStore.layout = "boxed-layout";
      mockStore.rtlClass = "rtl";
      mockStore.animation = "animate__fadeInUp";
      mockStore.navbar = "navbar-floating";
      mockStore.semidark = true;

      const wrapper = mount(ThemeCustomizer);

      // Check that buttons reflect store state
      const buttons = wrapper.findAll("button");
      const darkButton = buttons.find((button) =>
        button.text().includes("Dark")
      );
      const horizontalButton = buttons.find((button) =>
        button.text().includes("Horizontal")
      );
      const boxButton = buttons.find((button) => button.text().includes("Box"));
      const rtlButton = buttons.find((button) => button.text().includes("RTL"));
      const floatingRadio = wrapper.find('input[value="navbar-floating"]');
      const checkbox = wrapper.find('input[type="checkbox"]');
      const select = wrapper.find("select");

      expect(darkButton?.classes()).toContain("btn-primary");
      expect(horizontalButton?.classes()).toContain("btn-primary");
      expect(boxButton?.classes()).toContain("btn-primary");
      expect(rtlButton?.classes()).toContain("btn-primary");
      expect(floatingRadio.element.checked).toBe(true);
      expect(checkbox.element.checked).toBe(true);
      expect(select.element.value).toBe("animate__fadeInUp");
    });

    it("calls store methods for all theme changes", async () => {
      const wrapper = mount(ThemeCustomizer);

      // Test all theme change buttons
      const buttons = wrapper.findAll("button");
      const darkButton = buttons.find((button) =>
        button.text().includes("Dark")
      );
      const horizontalButton = buttons.find((button) =>
        button.text().includes("Horizontal")
      );
      const boxButton = buttons.find((button) => button.text().includes("Box"));
      const rtlButton = buttons.find((button) => button.text().includes("RTL"));

      await darkButton?.trigger("click");
      await horizontalButton?.trigger("click");
      await boxButton?.trigger("click");
      await rtlButton?.trigger("click");
      await wrapper.find('input[value="navbar-floating"]').setValue(true);
      await wrapper.find('input[type="checkbox"]').setValue(true);
      await wrapper.find("select").setValue("animate__fadeInUp");

      expect(mockStore.toggleTheme).toHaveBeenCalledWith("dark");
      expect(mockStore.toggleMenuStyle).toHaveBeenCalledWith("horizontal");
      expect(mockStore.toggleLayout).toHaveBeenCalledWith("boxed-layout");
      expect(mockStore.toggleRTL).toHaveBeenCalledWith("rtl");
      expect(mockStore.toggleNavbar).toHaveBeenCalledWith("navbar-floating");
      expect(mockStore.toggleSemidark).toHaveBeenCalledWith(true);
      expect(mockStore.toggleAnimation).toHaveBeenCalled();
    });
  });

  describe("Edge Cases", () => {
    it("handles undefined store values gracefully", () => {
      mockStore.theme = undefined;
      mockStore.menu = undefined;
      mockStore.layout = undefined;
      mockStore.rtlClass = undefined;
      mockStore.animation = undefined;
      mockStore.navbar = undefined;
      mockStore.semidark = undefined;

      const wrapper = mount(ThemeCustomizer);

      expect(wrapper.exists()).toBe(true);
    });

    it("handles empty string store values", () => {
      mockStore.theme = "";
      mockStore.menu = "";
      mockStore.layout = "";
      mockStore.rtlClass = "";
      mockStore.animation = "";
      mockStore.navbar = "";

      const wrapper = mount(ThemeCustomizer);

      expect(wrapper.exists()).toBe(true);
    });

    it("handles multiple rapid clicks", async () => {
      const wrapper = mount(ThemeCustomizer);

      const toggleButton = wrapper.find('a[href="javascript:;"]');

      // Multiple rapid clicks
      await toggleButton.trigger("click");
      await toggleButton.trigger("click");
      await toggleButton.trigger("click");

      // Should still work without errors
      expect(wrapper.exists()).toBe(true);
    });
  });
});
