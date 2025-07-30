import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { mount, VueWrapper } from "@vue/test-utils";
import FileInputDropMode from "../FileInputDropMode.vue";
import Icon from "../../icon/Icon.vue";

describe("FileInputDropMode Component", () => {
  let wrapper: VueWrapper<any>;

  // Helper function to create wrapper with default props
  const createWrapper = (props = {}) => {
    return mount(FileInputDropMode, {
      props,
      global: {
        components: {
          Icon,
        },
      },
    });
  };

  beforeEach(() => {
    // Mock document.documentElement
    Object.defineProperty(document, "documentElement", {
      value: {
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      },
      writable: true,
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("Rendering", () => {
    it("renders component container", () => {
      wrapper = createWrapper();
      expect(wrapper.find("div").exists()).toBe(true);
    });

    it("renders drop overlay when isDropping is true", async () => {
      wrapper = createWrapper();
      await wrapper.setData({ isDropping: true });
      expect(wrapper.find(".bg-black\\/50").exists()).toBe(true);
    });

    it("does not render drop overlay when isDropping is false", () => {
      wrapper = createWrapper();
      expect(wrapper.find(".bg-black\\/50").exists()).toBe(false);
    });

    it("renders drop modal when isDropping is true", async () => {
      wrapper = createWrapper();
      await wrapper.setData({ isDropping: true });
      expect(wrapper.find(".bg-white.rounded-lg.shadow-xl").exists()).toBe(true);
    });

    it("renders icon when provided", async () => {
      wrapper = createWrapper({ icon: "IconUpload" });
      await wrapper.setData({ isDropping: true });
      const icon = wrapper.findComponent(Icon);
      expect(icon.exists()).toBe(true);
      expect(icon.props("name")).toBe("IconUpload");
    });

    it("renders default icon when not provided", async () => {
      wrapper = createWrapper();
      await wrapper.setData({ isDropping: true });
      const icon = wrapper.findComponent(Icon);
      expect(icon.exists()).toBe(true);
      expect(icon.props("name")).toBe("IconGallery");
    });

    it("renders custom label", async () => {
      wrapper = createWrapper({ label: "Drop files here" });
      await wrapper.setData({ isDropping: true });
      expect(wrapper.text()).toContain("Drop files here");
    });

    it("renders default label when not provided", async () => {
      wrapper = createWrapper();
      await wrapper.setData({ isDropping: true });
      expect(wrapper.text()).toContain("Drop your files");
    });
  });

  describe("Props and Styling", () => {
    it("applies container z-index", () => {
      wrapper = createWrapper();
      const container = wrapper.find("div");
      expect(container.classes()).toContain("z-50");
    });

    it("applies overlay styling", async () => {
      wrapper = createWrapper();
      await wrapper.setData({ isDropping: true });
      const overlay = wrapper.find(".bg-black\\/50");
      expect(overlay.classes()).toContain("bg-black/50");
    });

    it("applies modal styling", async () => {
      wrapper = createWrapper();
      await wrapper.setData({ isDropping: true });
      const modal = wrapper.find(".bg-white.rounded-lg.shadow-xl");
      expect(modal.classes()).toContain("bg-white");
      expect(modal.classes()).toContain("rounded-lg");
      expect(modal.classes()).toContain("shadow-xl");
      expect(modal.classes()).toContain("p-8");
      expect(modal.classes()).toContain("max-w-md");
      expect(modal.classes()).toContain("w-full");
      expect(modal.classes()).toContain("mx-4");
    });

    it("applies modal content styling", async () => {
      wrapper = createWrapper();
      await wrapper.setData({ isDropping: true });
      const content = wrapper.find(".flex.flex-col.items-center.gap-4");
      expect(content.classes()).toContain("flex");
      expect(content.classes()).toContain("flex-col");
      expect(content.classes()).toContain("items-center");
      expect(content.classes()).toContain("gap-4");
    });

    it("applies icon styling", async () => {
      wrapper = createWrapper();
      await wrapper.setData({ isDropping: true });
      const icon = wrapper.findComponent(Icon);
      expect(icon.classes()).toContain("w-16");
      expect(icon.classes()).toContain("h-16");
      expect(icon.classes()).toContain("text-gray-600");
    });

    it("applies label styling", async () => {
      wrapper = createWrapper();
      await wrapper.setData({ isDropping: true });
      const label = wrapper.find(".text-lg.font-medium.text-gray-900.text-center");
      expect(label.classes()).toContain("text-lg");
      expect(label.classes()).toContain("font-medium");
      expect(label.classes()).toContain("text-gray-900");
      expect(label.classes()).toContain("text-center");
    });
  });

  describe("Transition", () => {
    it("applies transition classes", async () => {
      wrapper = createWrapper();
      await wrapper.setData({ isDropping: true });
      const transition = wrapper.findComponent({ name: "Transition" });
      expect(transition.props("enter-active-class")).toBe("transition duration-100 ease-out");
      expect(transition.props("enter-from-class")).toBe("transform scale-0 opacity-0");
      expect(transition.props("enter-to-class")).toBe("transform scale-1 opacity-100");
      expect(transition.props("leave-active-class")).toBe("transition duration-75 ease-in");
      expect(transition.props("leave-from-class")).toBe("transform scale-1 opacity-100");
      expect(transition.props("leave-to-class")).toBe("transform scale-0 opacity-0");
    });
  });

  describe("Drag Event Handlers", () => {
    it("registers drag event listeners on mount", () => {
      wrapper = createWrapper();
      expect(document.documentElement.addEventListener).toHaveBeenCalledWith("dragenter", expect.any(Function), false);
      expect(document.documentElement.addEventListener).toHaveBeenCalledWith("dragleave", expect.any(Function), false);
      expect(document.documentElement.addEventListener).toHaveBeenCalledWith("dragover", expect.any(Function), false);
      expect(document.documentElement.addEventListener).toHaveBeenCalledWith("drop", expect.any(Function));
    });

    it("removes drag event listeners on unmount", () => {
      wrapper = createWrapper();
      wrapper.unmount();
      expect(document.documentElement.removeEventListener).toHaveBeenCalledWith("dragenter", expect.any(Function));
      expect(document.documentElement.removeEventListener).toHaveBeenCalledWith("dragleave", expect.any(Function));
      expect(document.documentElement.removeEventListener).toHaveBeenCalledWith("dragover", expect.any(Function));
      expect(document.documentElement.removeEventListener).toHaveBeenCalledWith("drop", expect.any(Function));
    });

    it("shows drop overlay on first dragenter", () => {
      wrapper = createWrapper();
      const dragenterHandler = vi.mocked(document.documentElement.addEventListener).mock.calls.find(
        call => call[0] === "dragenter"
      )?.[1] as Function;
      
      dragenterHandler();
      expect(wrapper.vm.isDropping).toBe(true);
    });

    it("hides drop overlay when drag count reaches zero", () => {
      wrapper = createWrapper();
      const dragenterHandler = vi.mocked(document.documentElement.addEventListener).mock.calls.find(
        call => call[0] === "dragenter"
      )?.[1] as Function;
      const dragleaveHandler = vi.mocked(document.documentElement.addEventListener).mock.calls.find(
        call => call[0] === "dragleave"
      )?.[1] as Function;
      
      dragenterHandler(); // dragCount = 1, isDropping = true
      dragenterHandler(); // dragCount = 2, isDropping = true
      dragleaveHandler(); // dragCount = 1, isDropping = true
      dragleaveHandler(); // dragCount = 0, isDropping = false
      
      expect(wrapper.vm.isDropping).toBe(false);
    });

    it("prevents default on dragover", () => {
      wrapper = createWrapper();
      const dragoverHandler = vi.mocked(document.documentElement.addEventListener).mock.calls.find(
        call => call[0] === "dragover"
      )?.[1] as Function;
      
      const mockEvent = {
        preventDefault: vi.fn(),
      };
      
      dragoverHandler(mockEvent);
      expect(mockEvent.preventDefault).toHaveBeenCalled();
    });

    it("prevents default on drop", () => {
      wrapper = createWrapper();
      const dropHandler = vi.mocked(document.documentElement.addEventListener).mock.calls.find(
        call => call[0] === "drop"
      )?.[1] as Function;
      
      const mockEvent = {
        preventDefault: vi.fn(),
        dataTransfer: {
          files: [],
        },
      };
      
      dropHandler(mockEvent);
      expect(mockEvent.preventDefault).toHaveBeenCalled();
    });
  });

  describe("File Drop Handling", () => {
    it("emits drop event with filtered files", () => {
      wrapper = createWrapper();
      const dropHandler = vi.mocked(document.documentElement.addEventListener).mock.calls.find(
        call => call[0] === "drop"
      )?.[1] as Function;
      
      const mockFile1 = new File(["test1"], "test1.txt", { type: "text/plain" });
      const mockFile2 = new File(["test2"], "test2.txt", { type: "text/plain" });
      
      const mockEvent = {
        preventDefault: vi.fn(),
        dataTransfer: {
          files: [mockFile1, mockFile2],
        },
      };
      
      dropHandler(mockEvent);
      expect(wrapper.emitted("drop")).toBeTruthy();
      expect(wrapper.emitted("drop")?.[0][0]).toBeInstanceOf(FileList);
    });

    it("filters files using custom filter function", () => {
      const customFilter = vi.fn((file: File) => file.name.includes("test1"));
      wrapper = createWrapper({ filterFileDropped: customFilter });
      
      const dropHandler = vi.mocked(document.documentElement.addEventListener).mock.calls.find(
        call => call[0] === "drop"
      )?.[1] as Function;
      
      const mockFile1 = new File(["test1"], "test1.txt", { type: "text/plain" });
      const mockFile2 = new File(["test2"], "test2.txt", { type: "text/plain" });
      
      const mockEvent = {
        preventDefault: vi.fn(),
        dataTransfer: {
          files: [mockFile1, mockFile2],
        },
      };
      
      dropHandler(mockEvent);
      expect(customFilter).toHaveBeenCalledWith(mockFile1);
      expect(customFilter).toHaveBeenCalledWith(mockFile2);
    });

    it("handles drop without dataTransfer", () => {
      wrapper = createWrapper();
      const dropHandler = vi.mocked(document.documentElement.addEventListener).mock.calls.find(
        call => call[0] === "drop"
      )?.[1] as Function;
      
      const mockEvent = {
        preventDefault: vi.fn(),
        dataTransfer: null,
      };
      
      expect(() => dropHandler(mockEvent)).not.toThrow();
    });

    it("resets drag state after drop", () => {
      wrapper = createWrapper();
      const dropHandler = vi.mocked(document.documentElement.addEventListener).mock.calls.find(
        call => call[0] === "drop"
      )?.[1] as Function;
      
      // Set initial state
      wrapper.vm.isDropping = true;
      wrapper.vm.dragCount = 2;
      
      const mockEvent = {
        preventDefault: vi.fn(),
        dataTransfer: {
          files: [],
        },
      };
      
      dropHandler(mockEvent);
      expect(wrapper.vm.isDropping).toBe(false);
      expect(wrapper.vm.dragCount).toBe(0);
    });
  });

  describe("Default Values", () => {
    it("uses correct default values", () => {
      wrapper = createWrapper();
      expect(wrapper.props("label")).toBe("Drop your files");
      expect(wrapper.props("icon")).toBe("IconGallery");
      expect(typeof wrapper.props("filterFileDropped")).toBe("function");
    });
  });

  describe("Component Lifecycle", () => {
    it("initializes with correct default state", () => {
      wrapper = createWrapper();
      expect(wrapper.vm.isDropping).toBe(false);
    });

    it("cleans up event listeners on unmount", () => {
      wrapper = createWrapper();
      wrapper.unmount();
      expect(document.documentElement.removeEventListener).toHaveBeenCalledTimes(4);
    });
  });

  describe("Accessibility", () => {
    it("has proper modal structure", async () => {
      wrapper = createWrapper();
      await wrapper.setData({ isDropping: true });
      const modal = wrapper.find(".bg-white.rounded-lg.shadow-xl");
      expect(modal.exists()).toBe(true);
    });

    it("has proper icon and label structure", async () => {
      wrapper = createWrapper();
      await wrapper.setData({ isDropping: true });
      const icon = wrapper.findComponent(Icon);
      const label = wrapper.find(".text-lg.font-medium.text-gray-900.text-center");
      expect(icon.exists()).toBe(true);
      expect(label.exists()).toBe(true);
    });
  });

  describe("Edge Cases", () => {
    it("handles empty file list", () => {
      wrapper = createWrapper();
      const dropHandler = vi.mocked(document.documentElement.addEventListener).mock.calls.find(
        call => call[0] === "drop"
      )?.[1] as Function;
      
      const mockEvent = {
        preventDefault: vi.fn(),
        dataTransfer: {
          files: [],
        },
      };
      
      expect(() => dropHandler(mockEvent)).not.toThrow();
    });

    it("handles filter function that returns false for all files", () => {
      const rejectAllFilter = vi.fn(() => false);
      wrapper = createWrapper({ filterFileDropped: rejectAllFilter });
      
      const dropHandler = vi.mocked(document.documentElement.addEventListener).mock.calls.find(
        call => call[0] === "drop"
      )?.[1] as Function;
      
      const mockFile = new File(["test"], "test.txt", { type: "text/plain" });
      const mockEvent = {
        preventDefault: vi.fn(),
        dataTransfer: {
          files: [mockFile],
        },
      };
      
      dropHandler(mockEvent);
      expect(rejectAllFilter).toHaveBeenCalledWith(mockFile);
      expect(wrapper.emitted("drop")).toBeTruthy();
    });

    it("handles multiple dragenter events", () => {
      wrapper = createWrapper();
      const dragenterHandler = vi.mocked(document.documentElement.addEventListener).mock.calls.find(
        call => call[0] === "dragenter"
      )?.[1] as Function;
      
      dragenterHandler(); // dragCount = 1, isDropping = true
      expect(wrapper.vm.isDropping).toBe(true);
      
      dragenterHandler(); // dragCount = 2, isDropping = true
      expect(wrapper.vm.isDropping).toBe(true);
    });
  });

  describe("Integration with Icon Component", () => {
    it("passes correct props to Icon component", async () => {
      wrapper = createWrapper({ icon: "IconUpload" });
      await wrapper.setData({ isDropping: true });
      const icon = wrapper.findComponent(Icon);
      expect(icon.props("name")).toBe("IconUpload");
    });

    it("applies correct classes to Icon component", async () => {
      wrapper = createWrapper();
      await wrapper.setData({ isDropping: true });
      const icon = wrapper.findComponent(Icon);
      expect(icon.classes()).toContain("w-16");
      expect(icon.classes()).toContain("h-16");
      expect(icon.classes()).toContain("text-gray-600");
    });
  });
});