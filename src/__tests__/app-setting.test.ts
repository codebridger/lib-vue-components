import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import appSetting from "@/app-setting";

// Mock the store
const mockStore = {
  toggleTheme: vi.fn(),
  toggleMenuStyle: vi.fn(),
  toggleLayout: vi.fn(),
  toggleRTL: vi.fn(),
  toggleAnimation: vi.fn(),
  toggleNavbar: vi.fn(),
  toggleSemidark: vi.fn(),
  animation: "animate__fadeIn",
};

vi.mock("@/stores/index", () => ({
  useAppStore: () => mockStore,
}));

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};

Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
});

// Mock document.querySelector
const mockQuerySelector = vi.fn();
Object.defineProperty(document, "querySelector", {
  value: mockQuerySelector,
});

describe("App Setting", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorageMock.getItem.mockReturnValue(null);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("init", () => {
    it("initializes with default config when no config provided", () => {
      appSetting.init();

      expect(mockStore.toggleTheme).toHaveBeenCalledWith("light");
      expect(mockStore.toggleMenuStyle).toHaveBeenCalledWith("vertical");
      expect(mockStore.toggleLayout).toHaveBeenCalledWith("full");
      expect(mockStore.toggleRTL).toHaveBeenCalledWith("ltr");
      expect(mockStore.toggleAnimation).toHaveBeenCalledWith("animate__fadeIn");
      expect(mockStore.toggleNavbar).toHaveBeenCalledWith("navbar-sticky");
      expect(mockStore.toggleSemidark).toHaveBeenCalledWith(false);
    });

    it("initializes with custom config", () => {
      const customConfig = {
        theme: "dark",
        menu: "horizontal",
        layout: "boxed-layout",
        rtlClass: "rtl",
        animation: "animate__fadeInUp",
        navbar: "navbar-floating",
        semidark: true,
      };

      appSetting.init(customConfig);

      expect(mockStore.toggleTheme).toHaveBeenCalledWith("dark");
      expect(mockStore.toggleMenuStyle).toHaveBeenCalledWith("horizontal");
      expect(mockStore.toggleLayout).toHaveBeenCalledWith("boxed-layout");
      expect(mockStore.toggleRTL).toHaveBeenCalledWith("rtl");
      expect(mockStore.toggleAnimation).toHaveBeenCalledWith("animate__fadeInUp");
      expect(mockStore.toggleNavbar).toHaveBeenCalledWith("navbar-floating");
      expect(mockStore.toggleSemidark).toHaveBeenCalledWith(true);
    });

    it("uses localStorage values when available", () => {
      localStorageMock.getItem
        .mockReturnValueOnce("dark") // theme
        .mockReturnValueOnce("horizontal") // menu
        .mockReturnValueOnce("boxed-layout") // layout
        .mockReturnValueOnce("rtl") // rtlClass
        .mockReturnValueOnce("animate__fadeInUp") // animation
        .mockReturnValueOnce("navbar-floating") // navbar
        .mockReturnValueOnce("true"); // semidark

      appSetting.init();

      expect(mockStore.toggleTheme).toHaveBeenCalledWith("dark");
      expect(mockStore.toggleMenuStyle).toHaveBeenCalledWith("horizontal");
      expect(mockStore.toggleLayout).toHaveBeenCalledWith("boxed-layout");
      expect(mockStore.toggleRTL).toHaveBeenCalledWith("rtl");
      expect(mockStore.toggleAnimation).toHaveBeenCalledWith("animate__fadeInUp");
      expect(mockStore.toggleNavbar).toHaveBeenCalledWith("navbar-floating");
      expect(mockStore.toggleSemidark).toHaveBeenCalledWith(true);
    });

    it("falls back to config when localStorage is null", () => {
      localStorageMock.getItem.mockReturnValue(null);

      const customConfig = {
        theme: "system",
        menu: "collapsible-vertical",
        layout: "full",
        rtlClass: "ltr",
        animation: "animate__slideInDown",
        navbar: "navbar-static",
        semidark: false,
      };

      appSetting.init(customConfig);

      expect(mockStore.toggleTheme).toHaveBeenCalledWith("system");
      expect(mockStore.toggleMenuStyle).toHaveBeenCalledWith("collapsible-vertical");
      expect(mockStore.toggleLayout).toHaveBeenCalledWith("full");
      expect(mockStore.toggleRTL).toHaveBeenCalledWith("ltr");
      expect(mockStore.toggleAnimation).toHaveBeenCalledWith("animate__slideInDown");
      expect(mockStore.toggleNavbar).toHaveBeenCalledWith("navbar-static");
      expect(mockStore.toggleSemidark).toHaveBeenCalledWith(false);
    });

    it("handles semidark boolean conversion correctly", () => {
      localStorageMock.getItem
        .mockReturnValueOnce("light") // theme
        .mockReturnValueOnce("vertical") // menu
        .mockReturnValueOnce("full") // layout
        .mockReturnValueOnce("ltr") // rtlClass
        .mockReturnValueOnce("animate__fadeIn") // animation
        .mockReturnValueOnce("navbar-sticky") // navbar
        .mockReturnValueOnce("false"); // semidark

      appSetting.init();

      expect(mockStore.toggleSemidark).toHaveBeenCalledWith(false);
    });

    it("calls all store methods exactly once", () => {
      appSetting.init();

      expect(mockStore.toggleTheme).toHaveBeenCalledTimes(1);
      expect(mockStore.toggleMenuStyle).toHaveBeenCalledTimes(1);
      expect(mockStore.toggleLayout).toHaveBeenCalledTimes(1);
      expect(mockStore.toggleRTL).toHaveBeenCalledTimes(1);
      expect(mockStore.toggleAnimation).toHaveBeenCalledTimes(1);
      expect(mockStore.toggleNavbar).toHaveBeenCalledTimes(1);
      expect(mockStore.toggleSemidark).toHaveBeenCalledTimes(1);
    });
  });

  describe("changeAnimation", () => {
    it("adds animation classes when type is 'add'", () => {
      const mockElement = {
        classList: {
          add: vi.fn(),
        },
      };
      mockQuerySelector.mockReturnValue(mockElement);

      appSetting.changeAnimation("add");

      expect(mockQuerySelector).toHaveBeenCalledWith(".animation");
      expect(mockElement.classList.add).toHaveBeenCalledWith("animate__animated");
      expect(mockElement.classList.add).toHaveBeenCalledWith("animate__fadeIn");
    });

    it("removes animation classes when type is 'remove'", () => {
      const mockElement = {
        classList: {
          remove: vi.fn(),
        },
      };
      mockQuerySelector.mockReturnValue(mockElement);

      appSetting.changeAnimation("remove");

      expect(mockQuerySelector).toHaveBeenCalledWith(".animation");
      expect(mockElement.classList.remove).toHaveBeenCalledWith("animate__animated");
      expect(mockElement.classList.remove).toHaveBeenCalledWith("animate__fadeIn");
    });

    it("handles missing animation element gracefully", () => {
      mockQuerySelector.mockReturnValue(null);

      expect(() => {
        appSetting.changeAnimation("add");
      }).not.toThrow();

      expect(mockQuerySelector).toHaveBeenCalledWith(".animation");
    });

    it("does nothing when animation is not set in store", () => {
      mockStore.animation = null;
      const mockElement = {
        classList: {
          add: vi.fn(),
        },
      };
      mockQuerySelector.mockReturnValue(mockElement);

      appSetting.changeAnimation("add");

      expect(mockElement.classList.add).not.toHaveBeenCalled();
    });

    it("uses default type 'add' when no type provided", () => {
      const mockElement = {
        classList: {
          add: vi.fn(),
        },
      };
      mockQuerySelector.mockReturnValue(mockElement);

      appSetting.changeAnimation();

      expect(mockQuerySelector).toHaveBeenCalledWith(".animation");
      expect(mockElement.classList.add).toHaveBeenCalledWith("animate__animated");
      expect(mockElement.classList.add).toHaveBeenCalledWith("animate__fadeIn");
    });

    it("handles different animation types", () => {
      mockStore.animation = "animate__slideInDown";
      const mockElement = {
        classList: {
          add: vi.fn(),
        },
      };
      mockQuerySelector.mockReturnValue(mockElement);

      appSetting.changeAnimation("add");

      expect(mockElement.classList.add).toHaveBeenCalledWith("animate__animated");
      expect(mockElement.classList.add).toHaveBeenCalledWith("animate__slideInDown");
    });
  });

  describe("Edge Cases", () => {
    it("handles empty string localStorage values", () => {
      localStorageMock.getItem.mockReturnValue("");

      appSetting.init();

      expect(mockStore.toggleTheme).toHaveBeenCalledWith("light");
      expect(mockStore.toggleMenuStyle).toHaveBeenCalledWith("vertical");
      expect(mockStore.toggleLayout).toHaveBeenCalledWith("full");
      expect(mockStore.toggleRTL).toHaveBeenCalledWith("ltr");
      expect(mockStore.toggleAnimation).toHaveBeenCalledWith("animate__fadeIn");
      expect(mockStore.toggleNavbar).toHaveBeenCalledWith("navbar-sticky");
      expect(mockStore.toggleSemidark).toHaveBeenCalledWith(false);
    });

    it("handles undefined localStorage values", () => {
      localStorageMock.getItem.mockReturnValue(undefined);

      appSetting.init();

      expect(mockStore.toggleTheme).toHaveBeenCalledWith("light");
      expect(mockStore.toggleMenuStyle).toHaveBeenCalledWith("vertical");
    });

    it("handles partial config object", () => {
      const partialConfig = {
        theme: "dark",
        // Other properties will use defaults
      };

      appSetting.init(partialConfig);

      expect(mockStore.toggleTheme).toHaveBeenCalledWith("dark");
      expect(mockStore.toggleMenuStyle).toHaveBeenCalledWith("vertical");
      expect(mockStore.toggleLayout).toHaveBeenCalledWith("full");
      expect(mockStore.toggleRTL).toHaveBeenCalledWith("ltr");
      expect(mockStore.toggleAnimation).toHaveBeenCalledWith("animate__fadeIn");
      expect(mockStore.toggleNavbar).toHaveBeenCalledWith("navbar-sticky");
      expect(mockStore.toggleSemidark).toHaveBeenCalledWith(false);
    });
  });
});