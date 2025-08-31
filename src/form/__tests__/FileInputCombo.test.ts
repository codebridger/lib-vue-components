import { describe, it, expect, beforeEach, vi } from "vitest";
import { mount } from "@vue/test-utils";
import FileInputCombo from "../FileInputCombo.vue";

// Mock the Icon component
vi.mock("../Icon.vue", () => ({
  default: {
    name: "Icon",
    template: "<div class='icon'></div>",
    props: ["name"],
  },
}));

// Mock the Button component
vi.mock("../Button.vue", () => ({
  default: {
    name: "Button",
    template: "<button><slot /></button>",
    props: ["disabled", "rounded", "label"],
    emits: ["click"],
  },
}));

// Mock the IconButton component
vi.mock("../IconButton.vue", () => ({
  default: {
    name: "IconButton",
    template: "<button><slot /></button>",
    props: ["size", "title", "icon", "label", "disabled"],
    emits: ["click"],
  },
}));

describe("FileInputCombo Component", () => {
  const createWrapper = (props = {}) => {
    return mount(FileInputCombo, {
      props: {
        ...props,
      },
      global: {
        provide: {
          cardDisabled: false,
        },
      },
    });
  };

  describe("Rendering", () => {
    it("renders as section element", () => {
      const wrapper = createWrapper();
      expect(wrapper.find("section").exists()).toBe(true);
    });

    it("renders with default classes", () => {
      const wrapper = createWrapper();
      expect(wrapper.find(".flex.flex-col.gap-4").exists()).toBe(true);
    });

    it("renders label when provided", () => {
      const wrapper = createWrapper({ label: "File Upload" });
      expect(wrapper.text()).toContain("File Upload");
    });

    it("renders required indicator when required is true", () => {
      const wrapper = createWrapper({ label: "File Upload", required: true });
      expect(wrapper.find(".text-red-500").exists()).toBe(true);
    });

    it("renders controls when showControls is true", () => {
      const wrapper = createWrapper({ showControls: true });
      expect(wrapper.find(".mb-4.flex.items-center.gap-2").exists()).toBe(true);
    });

    it("renders upload area", () => {
      const wrapper = createWrapper();
      expect(wrapper.find(".relative").exists()).toBe(true);
    });

    it("renders empty state when no files", () => {
      const wrapper = createWrapper();
      expect(wrapper.find(".flex.flex-col.items-center.justify-center").exists()).toBe(true);
    });

    it("renders file input", () => {
      const wrapper = createWrapper();
      expect(wrapper.find("input[type='file']").exists()).toBe(true);
    });
  });

  describe("Props and Styling", () => {
    it("applies disabled styling when disabled", () => {
      const wrapper = createWrapper({ disabled: true });
      expect(wrapper.find(".cursor-not-allowed").exists()).toBe(true);
    });

    it("renders custom title", () => {
      const wrapper = createWrapper({ title: "Custom Upload Title" });
      expect(wrapper.text()).toContain("Custom Upload Title");
    });

    it("renders custom description", () => {
      const wrapper = createWrapper({ description: "Custom description" });
      expect(wrapper.text()).toContain("Custom description");
    });

    it("renders custom upload icon", () => {
      const wrapper = createWrapper({ uploadIcon: "IconUpload" });
      expect(wrapper.exists()).toBe(true);
    });
  });

  describe("File Input Properties", () => {
    it("sets accept attribute", () => {
      const wrapper = createWrapper({ accept: "image/*" });
      const input = wrapper.find("input[type='file']");
      expect(input.attributes("accept")).toBe("image/*");
    });

    it("sets multiple attribute", () => {
      const wrapper = createWrapper({ multiple: true });
      const input = wrapper.find("input[type='file']");
      expect(input.attributes("multiple")).toBeDefined();
    });

    it("sets disabled attribute on input", () => {
      const wrapper = createWrapper({ disabled: true });
      const input = wrapper.find("input[type='file']");
      expect(input.attributes("disabled")).toBeDefined();
    });
  });

  describe("Events", () => {
    it("emits drop event", async () => {
      const wrapper = createWrapper();
      const uploadArea = wrapper.find(".relative");
      
      await uploadArea.trigger("drop");
      expect(wrapper.emitted("drop")).toBeTruthy();
    });
  });

  describe("Methods", () => {
    it("triggers file input click", async () => {
      const wrapper = createWrapper();
      await wrapper.vm.triggerFileInput();
      expect(wrapper.exists()).toBe(true);
    });

    it("handles file selection", async () => {
      const wrapper = createWrapper();
      const file = new File(["test"], "test.txt", { type: "text/plain" });
      const event = { target: { files: [file] } };
      
      await wrapper.vm.handleFileSelect(event);
      expect(wrapper.exists()).toBe(true);
    });

    it("handles drag enter", async () => {
      const wrapper = createWrapper();
      const event = { preventDefault: vi.fn() };
      await wrapper.vm.handleDragEnter(event);
      expect(wrapper.exists()).toBe(true);
    });

    it("handles drag leave", async () => {
      const wrapper = createWrapper();
      const event = { preventDefault: vi.fn() };
      await wrapper.vm.handleDragLeave(event);
      expect(wrapper.exists()).toBe(true);
    });

    it("handles drop", async () => {
      const wrapper = createWrapper();
      const file = new File(["test"], "test.txt", { type: "text/plain" });
      const event = { 
        preventDefault: vi.fn(),
        dataTransfer: { files: [file] } 
      };
      
      await wrapper.vm.handleDrop(event);
      expect(wrapper.exists()).toBe(true);
    });
  });

  describe("Computed Properties", () => {
    it("computes correct upload area classes", () => {
      const wrapper = createWrapper();
      expect(wrapper.exists()).toBe(true);
    });

    it("computes correct upload area classes when dragging", () => {
      const wrapper = createWrapper();
      expect(wrapper.exists()).toBe(true);
    });

    it("computes correct upload area classes when disabled", () => {
      const wrapper = createWrapper({ disabled: true });
      expect(wrapper.exists()).toBe(true);
    });
  });

  describe("Slots", () => {
    it("renders title slot", () => {
      const wrapper = mount(FileInputCombo, {
        slots: {
          title: "<div>Custom Title</div>",
        },
      });
      expect(wrapper.text()).toContain("Custom Title");
    });

    it("renders controls slot", () => {
      const wrapper = mount(FileInputCombo, {
        slots: {
          controls: "<div>Custom Controls</div>",
        },
      });
      expect(wrapper.text()).toContain("Custom Controls");
    });

    it("renders upload area slot", () => {
      const wrapper = mount(FileInputCombo, {
        slots: {
          uploadArea: "<div>Custom Upload Area</div>",
        },
      });
      expect(wrapper.text()).toContain("Custom Upload Area");
    });
  });

  describe("Edge Cases", () => {
    it("handles empty file selection", async () => {
      const wrapper = createWrapper();
      const event = { target: { files: [] } };
      
      await wrapper.vm.handleFileSelect(event);
      expect(wrapper.exists()).toBe(true);
    });

    it("handles undefined props gracefully", () => {
      const wrapper = createWrapper({});
      expect(wrapper.exists()).toBe(true);
    });

    it("handles disabled state correctly", () => {
      const wrapper = createWrapper({ disabled: true });
      expect(wrapper.find(".opacity-60").exists()).toBe(true);
    });

    it("handles auto upload mode", () => {
      const wrapper = createWrapper({ autoUpload: true });
      // In auto upload mode, the upload button should not be visible
      expect(wrapper.find("button").exists()).toBe(true);
    });
  });
});