import { describe, it, expect, vi, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import AppRoot from "@/shell/AppRoot.vue";

// Mock the store
const mockStore = {
  sidebar: false,
  menu: "vertical",
  layout: "full",
  rtlClass: "ltr",
  toggleTheme: vi.fn(),
  toggleLayout: vi.fn(),
  toggleRTL: vi.fn(),
};

vi.mock("@/stores/index", () => ({
  useAppStore: () => mockStore,
}));

describe("AppRoot Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockStore.sidebar = false;
    mockStore.menu = "vertical";
    mockStore.layout = "full";
    mockStore.rtlClass = "ltr";
  });

  describe("Rendering", () => {
    it("renders as div element", () => {
      const wrapper = mount(AppRoot);
      
      expect(wrapper.element.tagName).toBe("DIV");
    });

    it("renders with default classes", () => {
      const wrapper = mount(AppRoot);
      
      expect(wrapper.classes()).toContain("main-section");
      expect(wrapper.classes()).toContain("antialiased");
      expect(wrapper.classes()).toContain("relative");
      expect(wrapper.classes()).toContain("font-nunito");
      expect(wrapper.classes()).toContain("text-sm");
      expect(wrapper.classes()).toContain("font-normal");
    });

    it("renders slot content", () => {
      const wrapper = mount(AppRoot, {
        slots: {
          default: "<div>Test content</div>",
        },
      });
      
      expect(wrapper.text()).toContain("Test content");
    });

    it("applies store-based classes", () => {
      const wrapper = mount(AppRoot);
      
      expect(wrapper.classes()).toContain("vertical");
      expect(wrapper.classes()).toContain("full");
      expect(wrapper.classes()).toContain("ltr");
    });

    it("applies toggle-sidebar class when sidebar is true", () => {
      mockStore.sidebar = true;
      const wrapper = mount(AppRoot);
      
      expect(wrapper.classes()).toContain("toggle-sidebar");
    });

    it("does not apply toggle-sidebar class when sidebar is false", () => {
      mockStore.sidebar = false;
      const wrapper = mount(AppRoot);
      
      expect(wrapper.classes()).not.toContain("toggle-sidebar");
    });
  });

  describe("Props and Store Integration", () => {
    it("applies different menu styles", () => {
      mockStore.menu = "horizontal";
      const wrapper = mount(AppRoot);
      
      expect(wrapper.classes()).toContain("horizontal");
    });

    it("applies different layout styles", () => {
      mockStore.layout = "boxed-layout";
      const wrapper = mount(AppRoot);
      
      expect(wrapper.classes()).toContain("boxed-layout");
    });

    it("applies different RTL classes", () => {
      mockStore.rtlClass = "rtl";
      const wrapper = mount(AppRoot);
      
      expect(wrapper.classes()).toContain("rtl");
    });
  });

  describe("Props Watchers", () => {
    it("watches colorScheme prop changes", async () => {
      const wrapper = mount(AppRoot, {
        props: {
          colorScheme: "light",
        },
      });

      await wrapper.setProps({ colorScheme: "dark" });

      expect(mockStore.toggleTheme).toHaveBeenCalledWith("dark");
    });

    it("watches layoutStyle prop changes", async () => {
      const wrapper = mount(AppRoot, {
        props: {
          layoutStyle: "full",
        },
      });

      await wrapper.setProps({ layoutStyle: "boxed-layout" });

      expect(mockStore.toggleLayout).toHaveBeenCalledWith("boxed-layout");
    });

    it("watches direction prop changes", async () => {
      const wrapper = mount(AppRoot, {
        props: {
          direction: "ltr",
        },
      });

      await wrapper.setProps({ direction: "rtl" });

      expect(mockStore.toggleRTL).toHaveBeenCalledWith("rtl");
    });

    it("does not call store methods when props are undefined", async () => {
      const wrapper = mount(AppRoot);

      await wrapper.setProps({ colorScheme: undefined });

      expect(mockStore.toggleTheme).not.toHaveBeenCalled();
    });

    it("does not call store methods on initial prop values (watchers only trigger on changes)", () => {
      mount(AppRoot, {
        props: {
          colorScheme: "dark",
          layoutStyle: "boxed-layout",
          direction: "rtl",
        },
      });

      // Watchers only trigger on prop changes, not initial values
      expect(mockStore.toggleTheme).not.toHaveBeenCalled();
      expect(mockStore.toggleLayout).not.toHaveBeenCalled();
      expect(mockStore.toggleRTL).not.toHaveBeenCalled();
    });
  });

  describe("Store State Changes", () => {
    it("updates classes when store state changes", async () => {
      const wrapper = mount(AppRoot);
      
      // Initially should have default classes
      expect(wrapper.classes()).toContain("vertical");
      expect(wrapper.classes()).toContain("full");
      expect(wrapper.classes()).toContain("ltr");

      // Update store state
      mockStore.menu = "horizontal";
      mockStore.layout = "boxed-layout";
      mockStore.rtlClass = "rtl";
      mockStore.sidebar = true;

      // Re-mount to see updated classes
      const wrapper2 = mount(AppRoot);
      
      expect(wrapper2.classes()).toContain("horizontal");
      expect(wrapper2.classes()).toContain("boxed-layout");
      expect(wrapper2.classes()).toContain("rtl");
      expect(wrapper2.classes()).toContain("toggle-sidebar");
    });
  });

  describe("Edge Cases", () => {
    it("handles undefined props gracefully", () => {
      const wrapper = mount(AppRoot);
      
      expect(wrapper.exists()).toBe(true);
      expect(wrapper.classes()).toContain("main-section");
    });

    it("handles empty slot content", () => {
      const wrapper = mount(AppRoot, {
        slots: {
          default: "",
        },
      });
      
      expect(wrapper.exists()).toBe(true);
      expect(wrapper.text()).toBe("");
    });

    it("handles complex slot content", () => {
      const wrapper = mount(AppRoot, {
        slots: {
          default: `
            <div>
              <h1>Title</h1>
              <p>Content</p>
            </div>
          `,
        },
      });
      
      expect(wrapper.text()).toContain("Title");
      expect(wrapper.text()).toContain("Content");
    });

    it("handles all store states being false/null", () => {
      mockStore.sidebar = false;
      mockStore.menu = "";
      mockStore.layout = "";
      mockStore.rtlClass = "";

      const wrapper = mount(AppRoot);
      
      expect(wrapper.exists()).toBe(true);
      expect(wrapper.classes()).toContain("main-section");
    });
  });

  describe("Accessibility", () => {
    it("provides semantic structure", () => {
      const wrapper = mount(AppRoot);
      
      expect(wrapper.element.tagName).toBe("DIV");
    });

    it("maintains proper class structure for styling", () => {
      const wrapper = mount(AppRoot);
      
      expect(wrapper.classes()).toContain("main-section");
      expect(wrapper.classes()).toContain("antialiased");
      expect(wrapper.classes()).toContain("relative");
    });
  });

  describe("Theme Integration", () => {
    it("supports light theme prop", async () => {
      const wrapper = mount(AppRoot, {
        props: {
          colorScheme: "light",
        },
      });

      // Watchers only trigger on changes, not initial values
      expect(mockStore.toggleTheme).not.toHaveBeenCalled();
    });

    it("supports dark theme prop", async () => {
      const wrapper = mount(AppRoot, {
        props: {
          colorScheme: "dark",
        },
      });

      // Watchers only trigger on changes, not initial values
      expect(mockStore.toggleTheme).not.toHaveBeenCalled();
    });

    it("supports system theme prop", async () => {
      const wrapper = mount(AppRoot, {
        props: {
          colorScheme: "system",
        },
      });

      // Watchers only trigger on changes, not initial values
      expect(mockStore.toggleTheme).not.toHaveBeenCalled();
    });
  });

  describe("Layout Integration", () => {
    it("supports full layout prop", async () => {
      const wrapper = mount(AppRoot, {
        props: {
          layoutStyle: "full",
        },
      });

      // Watchers only trigger on changes, not initial values
      expect(mockStore.toggleLayout).not.toHaveBeenCalled();
    });

    it("supports boxed layout prop", async () => {
      const wrapper = mount(AppRoot, {
        props: {
          layoutStyle: "boxed-layout",
        },
      });

      // Watchers only trigger on changes, not initial values
      expect(mockStore.toggleLayout).not.toHaveBeenCalled();
    });
  });

  describe("Direction Integration", () => {
    it("supports LTR direction prop", async () => {
      const wrapper = mount(AppRoot, {
        props: {
          direction: "ltr",
        },
      });

      // Watchers only trigger on changes, not initial values
      expect(mockStore.toggleRTL).not.toHaveBeenCalled();
    });

    it("supports RTL direction prop", async () => {
      const wrapper = mount(AppRoot, {
        props: {
          direction: "rtl",
        },
      });

      // Watchers only trigger on changes, not initial values
      expect(mockStore.toggleRTL).not.toHaveBeenCalled();
    });
  });
});