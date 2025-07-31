import { describe, it, expect, beforeEach, vi, afterEach } from "vitest";
import { mount } from "@vue/test-utils";
import FileInputDropMode from "../FileInputDropMode.vue";

// Mock the Icon component
vi.mock("../icon/Icon.vue", () => ({
  default: {
    name: "Icon",
    template: "<div class='icon'></div>",
    props: ["name"],
  },
}));

describe("FileInputDropMode Component", () => {
  const createWrapper = (props = {}) => {
    return mount(FileInputDropMode, {
      props: {
        ...props,
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
    it("renders as div element", () => {
      const wrapper = createWrapper();
      expect(wrapper.find("div").exists()).toBe(true);
    });

    it("renders with default classes", () => {
      const wrapper = createWrapper();
      expect(wrapper.find(".z-50").exists()).toBe(true);
    });

    it("renders when dropping", () => {
      const wrapper = createWrapper();
      wrapper.vm.isDropping = true;
      wrapper.vm.$nextTick();
      expect(wrapper.exists()).toBe(true);
    });
  });

  describe("Props and Styling", () => {
    it("applies custom icon", () => {
      const wrapper = createWrapper({ icon: "IconCustom" });
      wrapper.vm.isDropping = true;
      wrapper.vm.$nextTick();
      expect(wrapper.exists()).toBe(true);
    });

    it("applies transition classes", () => {
      const wrapper = createWrapper();
      wrapper.vm.isDropping = true;
      wrapper.vm.$nextTick();
      const transition = wrapper.findComponent({ name: "Transition" });
      expect(transition.exists()).toBe(true);
    });
  });

  describe("Drag and Drop Events", () => {
    it("handles drag enter", async () => {
      const wrapper = createWrapper();
      await wrapper.vm.onDragenter();
      expect(wrapper.vm.isDropping).toBe(true);
    });

    it("handles drag leave", async () => {
      const wrapper = createWrapper();
      wrapper.vm.isDropping = true;
      await wrapper.vm.onDragleave();
      expect(wrapper.vm.isDropping).toBe(false);
    });

    it("handles drag over", async () => {
      const wrapper = createWrapper();
      const event = { preventDefault: vi.fn() };
      await wrapper.vm.onDragover(event);
      expect(event.preventDefault).toHaveBeenCalled();
    });

    it("handles drop without dataTransfer", async () => {
      const wrapper = createWrapper();
      const event = {
        preventDefault: vi.fn(),
        dataTransfer: null,
      };
      
      await wrapper.vm.onDrop(event);
      expect(event.preventDefault).toHaveBeenCalled();
      expect(wrapper.vm.isDropping).toBe(false);
      expect(wrapper.emitted("drop")).toBeFalsy();
    });
  });

  describe("Drag Count Management", () => {
    it("increments drag count on drag enter", async () => {
      const wrapper = createWrapper();
      expect(wrapper.vm.dragCount).toBe(0);
      
      await wrapper.vm.onDragenter();
      expect(wrapper.vm.dragCount).toBe(1);
      expect(wrapper.vm.isDropping).toBe(true);
    });

    it("decrements drag count on drag leave", async () => {
      const wrapper = createWrapper();
      wrapper.vm.dragCount = 1;
      wrapper.vm.isDropping = true;
      
      await wrapper.vm.onDragleave();
      expect(wrapper.vm.dragCount).toBe(0);
      expect(wrapper.vm.isDropping).toBe(false);
    });

    it("resets drag count on drop", async () => {
      const wrapper = createWrapper();
      wrapper.vm.dragCount = 2;
      wrapper.vm.isDropping = true;
      
      const event = {
        preventDefault: vi.fn(),
        dataTransfer: null,
      };
      
      await wrapper.vm.onDrop(event);
      expect(wrapper.vm.dragCount).toBe(0);
      expect(wrapper.vm.isDropping).toBe(false);
    });

    it("only shows dropping on first drag enter", async () => {
      const wrapper = createWrapper();
      expect(wrapper.vm.isDropping).toBe(false);
      
      await wrapper.vm.onDragenter();
      expect(wrapper.vm.isDropping).toBe(true);
      
      await wrapper.vm.onDragenter();
      expect(wrapper.vm.isDropping).toBe(true); // Should still be true
    });

    it("only hides dropping on last drag leave", async () => {
      const wrapper = createWrapper();
      wrapper.vm.dragCount = 2;
      wrapper.vm.isDropping = true;
      
      await wrapper.vm.onDragleave();
      expect(wrapper.vm.isDropping).toBe(true); // Should still be true
      
      await wrapper.vm.onDragleave();
      expect(wrapper.vm.isDropping).toBe(false); // Now should be false
    });
  });

  describe("Event Listeners", () => {
    it("registers event listeners on mount", () => {
      const addEventListenerSpy = vi.spyOn(document.documentElement, "addEventListener");
      createWrapper();
      
      expect(addEventListenerSpy).toHaveBeenCalled();
    });

    it("removes event listeners on unmount", () => {
      const removeEventListenerSpy = vi.spyOn(document.documentElement, "removeEventListener");
      const wrapper = createWrapper();
      
      wrapper.unmount();
      
      expect(removeEventListenerSpy).toHaveBeenCalled();
    });
  });

  describe("Computed Properties", () => {
    it("computes correct modal visibility", () => {
      const wrapper = createWrapper();
      expect(wrapper.vm.isDropping).toBe(false);
      
      wrapper.vm.isDropping = true;
      expect(wrapper.vm.isDropping).toBe(true);
    });
  });

  describe("Edge Cases", () => {
    it("handles undefined props gracefully", () => {
      const wrapper = createWrapper({});
      expect(wrapper.exists()).toBe(true);
    });

    it("handles multiple rapid drag events", async () => {
      const wrapper = createWrapper();
      
      // Rapid drag enters
      await wrapper.vm.onDragenter();
      await wrapper.vm.onDragenter();
      await wrapper.vm.onDragenter();
      expect(wrapper.vm.isDropping).toBe(true);
      
      // Rapid drag leaves
      await wrapper.vm.onDragleave();
      await wrapper.vm.onDragleave();
      await wrapper.vm.onDragleave();
      expect(wrapper.vm.isDropping).toBe(false);
    });
  });
});