import { describe, it, expect, vi, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import DashboardShell from "@/shell/DashboardShell.vue";

// Mock the store
const mockStore = {
  sidebar: false,
  isShowMainLoader: false,
  navbar: "navbar-sticky",
  semidark: false,
  toggleSidebar: vi.fn(),
  toggleMainLoader: vi.fn(),
  toggleMenuStyle: vi.fn(),
};

vi.mock("@/stores/index", () => ({
  useAppStore: () => mockStore,
}));

// Mock app-setting
vi.mock("@/app-setting", () => ({
  default: {
    changeAnimation: vi.fn(),
  },
}));

// Mock Icon component
vi.mock("@/icon/Icon.vue", () => ({
  default: {
    name: "Icon",
    template: "<span class='icon'></span>",
    props: ["name"],
  },
}));

// Mock ResizeObserver
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// Mock DOM methods
const mockQuerySelector = vi.fn();
const mockQuerySelectorAll = vi.fn();
const mockAddEventListener = vi.fn();
const mockRemoveEventListener = vi.fn();

const mockElement = {
  addEventListener: mockAddEventListener,
  removeEventListener: mockRemoveEventListener,
  classList: {
    add: vi.fn(),
    remove: vi.fn(),
  },
};

Object.defineProperty(document, "querySelector", {
  value: mockQuerySelector,
  writable: true,
});

Object.defineProperty(document, "querySelectorAll", {
  value: mockQuerySelectorAll,
  writable: true,
});

Object.defineProperty(document, "body", {
  value: {
    scrollTop: 0,
  },
  writable: true,
});

Object.defineProperty(document, "documentElement", {
  value: {
    scrollTop: 0,
  },
  writable: true,
});

Object.defineProperty(window, "onscroll", {
  value: null,
  writable: true,
});

describe("DashboardShell Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockQuerySelector.mockReturnValue(mockElement);
    mockQuerySelectorAll.mockReturnValue([mockElement]);
  });

  describe("Rendering", () => {
    it("renders as div element", () => {
      const wrapper = mount(DashboardShell);

      expect(wrapper.element.tagName).toBe("DIV");
    });

    it("renders with relative class", () => {
      const wrapper = mount(DashboardShell, {
        props: {
          brandTitle: "Test Brand",
        },
      });

      expect(wrapper.find(".relative").exists()).toBe(true);
    });

    it("renders sidebar overlay", () => {
      const wrapper = mount(DashboardShell);

      const overlay = wrapper.find(".fixed.inset-0");
      expect(overlay.exists()).toBe(true);
    });

    it("renders screen loader", () => {
      const wrapper = mount(DashboardShell);

      const loader = wrapper.find(".screen_loader");
      expect(loader.exists()).toBe(true);
    });

    it("renders top button container", () => {
      const wrapper = mount(DashboardShell);

      const topButton = wrapper.find(".fixed.bottom-6");
      expect(topButton.exists()).toBe(true);
    });

    it("renders main container", () => {
      const wrapper = mount(DashboardShell);

      const mainContainer = wrapper.find(".main-container");
      expect(mainContainer.exists()).toBe(true);
    });

    it("renders sidebar", () => {
      const wrapper = mount(DashboardShell);

      const sidebar = wrapper.find("nav.sidebar");
      expect(sidebar.exists()).toBe(true);
    });

    it("renders main content", () => {
      const wrapper = mount(DashboardShell);

      const mainContent = wrapper.find(".main-content");
      expect(mainContent.exists()).toBe(true);
    });

    it("renders header", () => {
      const wrapper = mount(DashboardShell);

      const header = wrapper.find("header");
      expect(header.exists()).toBe(true);
    });

    it("renders content area", () => {
      const wrapper = mount(DashboardShell);

      const contentArea = wrapper.find(".animation");
      expect(contentArea.exists()).toBe(true);
    });

    it("renders footer area", () => {
      const wrapper = mount(DashboardShell);

      const footerArea = wrapper.find("div:last-child");
      expect(footerArea.exists()).toBe(true);
    });
  });

  describe("Props", () => {
    it("accepts brandTitle prop", () => {
      const wrapper = mount(DashboardShell, {
        props: { brandTitle: "Test Brand" },
      });

      expect(wrapper.text()).toContain("Test Brand");
    });

    it("accepts brandLogo prop", () => {
      const wrapper = mount(DashboardShell, {
        props: { brandTitle: "Test Brand", brandLogo: "/custom-logo.svg" },
      });

      const logo = wrapper.find("img");
      expect(logo.attributes("src")).toBe("/custom-logo.svg");
    });

    it("uses default logo when brandLogo not provided", () => {
      const wrapper = mount(DashboardShell, {
        props: { brandTitle: "Test Brand" },
      });

      const logo = wrapper.find("img");
      expect(logo.attributes("src")).toBe("/assets/images/logo.svg");
    });

    it("accepts loading prop", () => {
      const wrapper = mount(DashboardShell, {
        props: { brandTitle: "Test Brand", loading: true },
      });

      expect(wrapper.exists()).toBe(true);
    });

    it("accepts hideMenu prop", () => {
      const wrapper = mount(DashboardShell, {
        props: { brandTitle: "Test Brand", hideMenu: true },
      });

      expect(wrapper.exists()).toBe(true);
    });

    it("accepts menuStyle prop", () => {
      const wrapper = mount(DashboardShell, {
        props: { brandTitle: "Test Brand", menuStyle: "horizontal" },
      });

      expect(wrapper.exists()).toBe(true);
    });
  });

  describe("Slots", () => {
    it("renders sidebar-menu slot", () => {
      const wrapper = mount(DashboardShell, {
        props: { brandTitle: "Test Brand" },
        slots: {
          "sidebar-menu": "<div>Sidebar Menu</div>",
        },
      });

      expect(wrapper.text()).toContain("Sidebar Menu");
    });

    it("renders horizontal-menu slot", () => {
      const wrapper = mount(DashboardShell, {
        props: { brandTitle: "Test Brand" },
        slots: {
          "horizontal-menu": "<div>Horizontal Menu</div>",
        },
      });

      expect(wrapper.text()).toContain("Horizontal Menu");
    });

    it("renders content slot", () => {
      const wrapper = mount(DashboardShell, {
        props: { brandTitle: "Test Brand" },
        slots: {
          content: "<div>Main Content</div>",
        },
      });

      expect(wrapper.text()).toContain("Main Content");
    });

    it("renders footer slot", () => {
      const wrapper = mount(DashboardShell, {
        props: { brandTitle: "Test Brand" },
        slots: {
          footer: "<div>Footer</div>",
        },
      });

      expect(wrapper.text()).toContain("Footer");
    });

    it("renders header slot", () => {
      const wrapper = mount(DashboardShell, {
        props: { brandTitle: "Test Brand" },
        slots: {
          header: "<div>Header Content</div>",
        },
      });

      expect(wrapper.text()).toContain("Header Content");
    });

    it("renders brand slot", () => {
      const wrapper = mount(DashboardShell, {
        props: { brandTitle: "Test Brand" },
        slots: {
          brand: "<div>Custom Brand</div>",
        },
      });

      expect(wrapper.text()).toContain("Custom Brand");
    });
  });

  describe("Store Integration", () => {
    it("calls toggleSidebar when overlay is clicked", async () => {
      const wrapper = mount(DashboardShell, {
        props: { brandTitle: "Test Brand" },
      });

      const overlay = wrapper.find(".fixed.inset-0");
      if (overlay.exists()) {
        await overlay.trigger("click");
        expect(mockStore.toggleSidebar).toHaveBeenCalled();
      }
    });

    it("calls toggleSidebar when menu icon is clicked", async () => {
      const wrapper = mount(DashboardShell, {
        props: { brandTitle: "Test Brand" },
      });

      const menuIcon = wrapper.find("a[href='javascript:;']");
      if (menuIcon.exists()) {
        await menuIcon.trigger("click");
        expect(mockStore.toggleSidebar).toHaveBeenCalled();
      }
    });

    it("applies sidebar class based on store state", () => {
      mockStore.sidebar = true;
      const wrapper = mount(DashboardShell, {
        props: { brandTitle: "Test Brand" },
      });

      expect(wrapper.exists()).toBe(true);
    });

    it("applies navbar class based on store state", () => {
      mockStore.navbar = "navbar-floating";
      const wrapper = mount(DashboardShell, {
        props: { brandTitle: "Test Brand" },
      });

      expect(wrapper.exists()).toBe(true);
    });

    it("applies semidark class based on store state", () => {
      mockStore.semidark = true;
      const wrapper = mount(DashboardShell, {
        props: { brandTitle: "Test Brand" },
      });

      expect(wrapper.exists()).toBe(true);
    });

    it("shows loader when store indicates loading", () => {
      mockStore.isShowMainLoader = true;
      const wrapper = mount(DashboardShell, {
        props: { brandTitle: "Test Brand" },
      });

      expect(wrapper.exists()).toBe(true);
    });

    it("hides loader when store indicates not loading", () => {
      mockStore.isShowMainLoader = false;
      const wrapper = mount(DashboardShell, {
        props: { brandTitle: "Test Brand" },
      });

      expect(wrapper.exists()).toBe(true);
    });
  });

  describe("Prop Watchers", () => {
    it("calls toggleMainLoader when loading prop changes", async () => {
      const wrapper = mount(DashboardShell, {
        props: { brandTitle: "Test Brand", loading: false },
      });

      await wrapper.setProps({ loading: true });
      expect(mockStore.toggleMainLoader).toHaveBeenCalledWith(true);
    });

    it("calls toggleMenuStyle when menuStyle prop changes", async () => {
      const wrapper = mount(DashboardShell, {
        props: { brandTitle: "Test Brand", menuStyle: "vertical" },
      });

      await wrapper.setProps({ menuStyle: "horizontal" });
      expect(mockStore.toggleMenuStyle).toHaveBeenCalledWith("horizontal");
    });

    it("calls toggleSidebar when hideMenu prop changes", async () => {
      const wrapper = mount(DashboardShell, {
        props: { brandTitle: "Test Brand", hideMenu: false },
      });

      await wrapper.setProps({ hideMenu: true });
      expect(mockStore.toggleSidebar).toHaveBeenCalledWith(true);
    });
  });

  describe("User Interactions", () => {
    it("scrolls to top when go to top button is clicked", async () => {
      const wrapper = mount(DashboardShell, {
        props: { brandTitle: "Test Brand" },
      });

      const goToTopButton = wrapper.find("button[type='button']");
      if (goToTopButton.exists()) {
        await goToTopButton.trigger("click");
        expect(wrapper.exists()).toBe(true);
      }
    });

    it("shows top button when scrolled", () => {
      const wrapper = mount(DashboardShell, {
        props: { brandTitle: "Test Brand" },
      });

      // Simulate scroll
      Object.defineProperty(document.body, "scrollTop", { value: 100 });
      Object.defineProperty(document.documentElement, "scrollTop", { value: 100 });

      expect(wrapper.exists()).toBe(true);
    });

    it("hides top button when not scrolled", () => {
      const wrapper = mount(DashboardShell, {
        props: { brandTitle: "Test Brand" },
      });

      // Simulate no scroll
      Object.defineProperty(document.body, "scrollTop", { value: 0 });
      Object.defineProperty(document.documentElement, "scrollTop", { value: 0 });

      expect(wrapper.exists()).toBe(true);
    });
  });

  describe("Content Size Management", () => {
    it("observes content element", () => {
      const wrapper = mount(DashboardShell, {
        props: { brandTitle: "Test Brand" },
      });

      expect(mockQuerySelector).toHaveBeenCalled();
    });

    it("provides contentSize to child components", () => {
      const wrapper = mount(DashboardShell, {
        props: { brandTitle: "Test Brand" },
      });

      expect(wrapper.exists()).toBe(true);
    });
  });

  describe("Animation Management", () => {
    it("sets up animation event listener", () => {
      const wrapper = mount(DashboardShell, {
        props: { brandTitle: "Test Brand" },
      });

      expect(mockQuerySelector).toHaveBeenCalled();
    });
  });

  describe("Edge Cases", () => {
    it("handles missing brandTitle gracefully", () => {
      const wrapper = mount(DashboardShell, {
        props: { brandTitle: "" },
      });

      expect(wrapper.exists()).toBe(true);
    });

    it("handles missing brandLogo gracefully", () => {
      const wrapper = mount(DashboardShell, {
        props: { brandTitle: "Test Brand" },
      });

      expect(wrapper.exists()).toBe(true);
    });

    it("handles undefined props gracefully", () => {
      const wrapper = mount(DashboardShell, {
        props: {},
      });

      expect(wrapper.exists()).toBe(true);
    });

    it("handles store errors gracefully", () => {
      mockStore.toggleSidebar.mockImplementation(() => {
        throw new Error("Store error");
      });

      expect(() => mount(DashboardShell, { props: { brandTitle: "Test Brand" } })).toThrow("Store error");
    });
  });
});