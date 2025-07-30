import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { mount, VueWrapper } from "@vue/test-utils";
import FileInputDropMode from "../FileInputDropMode.vue";
import Icon from "../../icon/Icon.vue";

describe("FileInputDropMode Component", () => {
  let wrapper: VueWrapper<any>;
  const createWrapper = (props = {}) => {
    return mount(FileInputDropMode, {
      props,
      global: {
        stubs: {
          Icon: true,
        },
      },
    });
  };

  beforeEach(() => {
    // Removed override of document.documentElement to use the real HTMLElement
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("Rendering", () => {
    it("renders drop overlay when isDropping is true", async () => {
      wrapper = createWrapper();
      // Trigger drag enter to set isDropping to true
      const dragenterEvent = new Event("dragenter");
      document.documentElement.dispatchEvent(dragenterEvent);
      await wrapper.vm.$nextTick();
      
      expect(wrapper.find(".bg-black\\/50").exists()).toBe(true);
    });

    it("renders drop modal when isDropping is true", async () => {
      wrapper = createWrapper();
      // Trigger drag enter to set isDropping to true
      const dragenterEvent = new Event("dragenter");
      document.documentElement.dispatchEvent(dragenterEvent);
      await wrapper.vm.$nextTick();
      
      expect(wrapper.find(".bg-white.rounded-lg.shadow-xl").exists()).toBe(true);
    });

    it("renders icon when provided", () => {
      wrapper = createWrapper({ icon: "IconUpload" });
      expect(wrapper.findComponent(Icon).exists()).toBe(true);
    });

    it("renders default icon when not provided", () => {
      wrapper = createWrapper();
      expect(wrapper.findComponent(Icon).exists()).toBe(true);
    });

    it("renders custom label", () => {
      wrapper = createWrapper({ label: "Custom Drop Label" });
      expect(wrapper.text()).toContain("Custom Drop Label");
    });

    it("renders default label when not provided", () => {
      wrapper = createWrapper();
      expect(wrapper.text()).toContain("Drop your files");
    });
  });

  describe("Props and Styling", () => {
    it("applies overlay styling", async () => {
      wrapper = createWrapper();
      const dragenterEvent = new Event("dragenter");
      document.documentElement.dispatchEvent(dragenterEvent);
      await wrapper.vm.$nextTick();
      
      const overlay = wrapper.find(".bg-black\\/50");
      expect(overlay.exists()).toBe(true);
    });

    it("applies modal styling", async () => {
      wrapper = createWrapper();
      const dragenterEvent = new Event("dragenter");
      document.documentElement.dispatchEvent(dragenterEvent);
      await wrapper.vm.$nextTick();
      
      const modal = wrapper.find(".bg-white.rounded-lg.shadow-xl");
      expect(modal.exists()).toBe(true);
    });

    it("applies modal content styling", async () => {
      wrapper = createWrapper();
      const dragenterEvent = new Event("dragenter");
      document.documentElement.dispatchEvent(dragenterEvent);
      await wrapper.vm.$nextTick();
      
      const modalContent = wrapper.find(".flex.flex-col.items-center.gap-4");
      expect(modalContent.exists()).toBe(true);
    });

    it("applies icon styling", () => {
      wrapper = createWrapper({ icon: "IconUpload" });
      const icon = wrapper.findComponent(Icon);
      expect(icon.exists()).toBe(true);
    });

    it("applies label styling", () => {
      wrapper = createWrapper({ label: "Test Label" });
      const label = wrapper.find(".text-lg.font-medium.text-gray-900.text-center");
      expect(label.exists()).toBe(true);
      expect(label.text()).toBe("Test Label");
    });
  });

  describe("Transition", () => {
    it("applies transition classes", async () => {
      wrapper = createWrapper();
      const dragenterEvent = new Event("dragenter");
      document.documentElement.dispatchEvent(dragenterEvent);
      await wrapper.vm.$nextTick();
      
      const transition = wrapper.findComponent({ name: "Transition" });
      expect(transition.exists()).toBe(true);
    });
  });

  describe("Drag Event Handlers", () => {
    it("registers global drag event listeners on mount", () => {
      wrapper = createWrapper();
      expect(document.documentElement.addEventListener).toHaveBeenCalledWith("dragenter", expect.any(Function), false);
      expect(document.documentElement.addEventListener).toHaveBeenCalledWith("dragleave", expect.any(Function), false);
      expect(document.documentElement.addEventListener).toHaveBeenCalledWith("dragover", expect.any(Function), false);
      expect(document.documentElement.addEventListener).toHaveBeenCalledWith("drop", expect.any(Function));
    });

    it("removes global drag event listeners on unmount", () => {
      wrapper = createWrapper();
      wrapper.unmount();
      expect(document.documentElement.removeEventListener).toHaveBeenCalledWith("dragenter", expect.any(Function));
      expect(document.documentElement.removeEventListener).toHaveBeenCalledWith("dragleave", expect.any(Function));
      expect(document.documentElement.removeEventListener).toHaveBeenCalledWith("dragover", expect.any(Function));
      expect(document.documentElement.removeEventListener).toHaveBeenCalledWith("drop", expect.any(Function));
    });

    it("handles drag enter event", async () => {
      wrapper = createWrapper();
      const dragenterEvent = new Event("dragenter");
      document.documentElement.dispatchEvent(dragenterEvent);
      await wrapper.vm.$nextTick();
      
      expect(wrapper.vm.isDropping).toBe(true);
    });

    it("handles drag leave event", async () => {
      wrapper = createWrapper();
      // First trigger drag enter
      const dragenterEvent = new Event("dragenter");
      document.documentElement.dispatchEvent(dragenterEvent);
      await wrapper.vm.$nextTick();
      
      // Then trigger drag leave
      const dragleaveEvent = new Event("dragleave");
      document.documentElement.dispatchEvent(dragleaveEvent);
      await wrapper.vm.$nextTick();
      
      expect(wrapper.vm.isDropping).toBe(false);
    });

    it("handles drag over event", () => {
      wrapper = createWrapper();
      const dragoverEvent = new Event("dragover");
      const preventDefaultSpy = vi.spyOn(dragoverEvent, "preventDefault");
      
      document.documentElement.dispatchEvent(dragoverEvent);
      expect(preventDefaultSpy).toHaveBeenCalled();
    });
  });

  describe("File Drop Handling", () => {
    it("emits drop event with filtered files", () => {
      wrapper = createWrapper();
      const mockFiles = [
        new File(["test"], "test.txt", { type: "text/plain" }),
        new File(["image"], "image.jpg", { type: "image/jpeg" }),
      ];
      
      const mockDataTransfer = {
        files: mockFiles,
        preventDefault: vi.fn(),
      };
      
      const dropEvent = new Event("drop");
      Object.defineProperty(dropEvent, "dataTransfer", {
        value: mockDataTransfer,
        writable: true,
      });
      
      document.documentElement.dispatchEvent(dropEvent);
      expect(wrapper.emitted("drop")).toBeTruthy();
    });

    it("uses custom filter function", () => {
      const filterFn = vi.fn((file: File) => file.type === "image/jpeg");
      wrapper = createWrapper({ filterFileDropped: filterFn });
      
      const mockFiles = [
        new File(["test"], "test.txt", { type: "text/plain" }),
        new File(["image"], "image.jpg", { type: "image/jpeg" }),
      ];
      
      const mockDataTransfer = {
        files: mockFiles,
        preventDefault: vi.fn(),
      };
      
      const dropEvent = new Event("drop");
      Object.defineProperty(dropEvent, "dataTransfer", {
        value: mockDataTransfer,
        writable: true,
      });
      
      document.documentElement.dispatchEvent(dropEvent);
      expect(filterFn).toHaveBeenCalled();
    });

    it("handles dataTransfer absence", () => {
      wrapper = createWrapper();
      const dropEvent = new Event("drop");
      Object.defineProperty(dropEvent, "dataTransfer", {
        value: null,
        writable: true,
      });
      
      expect(() => {
        document.documentElement.dispatchEvent(dropEvent);
      }).not.toThrow();
    });

    it("resets drag state after drop", async () => {
      wrapper = createWrapper();
      // First trigger drag enter
      const dragenterEvent = new Event("dragenter");
      document.documentElement.dispatchEvent(dragenterEvent);
      await wrapper.vm.$nextTick();
      
      // Then trigger drop
      const dropEvent = new Event("drop");
      Object.defineProperty(dropEvent, "dataTransfer", {
        value: { files: [], preventDefault: vi.fn() },
        writable: true,
      });
      document.documentElement.dispatchEvent(dropEvent);
      await wrapper.vm.$nextTick();
      
      expect(wrapper.vm.isDropping).toBe(false);
    });
  });

  describe("Default Values", () => {
    it("uses correct default values", () => {
      wrapper = createWrapper();
      expect(wrapper.props("label")).toBe("Drop your files");
      expect(wrapper.props("icon")).toBe("IconGallery");
    });
  });

  describe("Component Lifecycle", () => {
    it("sets up event listeners on mount", () => {
      wrapper = createWrapper();
      expect(document.documentElement.addEventListener).toHaveBeenCalledTimes(4);
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
      const dragenterEvent = new Event("dragenter");
      document.documentElement.dispatchEvent(dragenterEvent);
      await wrapper.vm.$nextTick();
      
      const modal = wrapper.find(".bg-white.rounded-lg.shadow-xl");
      expect(modal.exists()).toBe(true);
    });

    it("has proper icon and label structure", async () => {
      wrapper = createWrapper({ icon: "IconUpload", label: "Test Label" });
      const dragenterEvent = new Event("dragenter");
      document.documentElement.dispatchEvent(dragenterEvent);
      await wrapper.vm.$nextTick();
      
      const icon = wrapper.findComponent(Icon);
      const label = wrapper.find(".text-lg.font-medium.text-gray-900.text-center");
      expect(icon.exists()).toBe(true);
      expect(label.exists()).toBe(true);
    });
  });

  describe("Edge Cases", () => {
    it("handles multiple drag enter events", async () => {
      wrapper = createWrapper();
      const dragenterEvent1 = new Event("dragenter");
      const dragenterEvent2 = new Event("dragenter");
      
      document.documentElement.dispatchEvent(dragenterEvent1);
      document.documentElement.dispatchEvent(dragenterEvent2);
      await wrapper.vm.$nextTick();
      
      expect(wrapper.vm.isDropping).toBe(true);
    });

    it("handles multiple drag leave events", async () => {
      wrapper = createWrapper();
      // First trigger drag enter
      const dragenterEvent = new Event("dragenter");
      document.documentElement.dispatchEvent(dragenterEvent);
      await wrapper.vm.$nextTick();
      
      // Then trigger multiple drag leave events
      const dragleaveEvent1 = new Event("dragleave");
      const dragleaveEvent2 = new Event("dragleave");
      
      document.documentElement.dispatchEvent(dragleaveEvent1);
      document.documentElement.dispatchEvent(dragleaveEvent2);
      await wrapper.vm.$nextTick();
      
      expect(wrapper.vm.isDropping).toBe(false);
    });
  });

  describe("Integration with Icon Component", () => {
    it("passes correct props to Icon component", () => {
      wrapper = createWrapper({ icon: "IconUpload" });
      const icon = wrapper.findComponent(Icon);
      expect(icon.props("name")).toBe("IconUpload");
    });

    it("applies correct classes to Icon component", () => {
      wrapper = createWrapper({ icon: "IconUpload" });
      const icon = wrapper.findComponent(Icon);
      expect(icon.classes()).toContain("w-16");
      expect(icon.classes()).toContain("h-16");
      expect(icon.classes()).toContain("text-gray-600");
    });
  });
});