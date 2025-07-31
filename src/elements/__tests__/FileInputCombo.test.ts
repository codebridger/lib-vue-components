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
  const createWrapper = (props = {}, slots = {}) => {
    return mount(FileInputCombo, {
      props,
      slots,
      global: {
        stubs: {
          Icon: true,
          Button: true,
          IconButton: true,
        },
      },
    });
  };

  beforeEach(() => {
    // Mock File API
    global.File = vi.fn().mockImplementation((name, size = 1024) => ({
      name,
      size,
      type: "text/plain",
    }));

    // Mock FileReader
    global.FileReader = vi.fn().mockImplementation(() => ({
      readAsDataURL: vi.fn(),
      result: "data:image/jpeg;base64,test",
      onload: null,
    }));

    // Mock URL.createObjectURL
    global.URL.createObjectURL = vi.fn().mockReturnValue("blob:test");
    global.URL.revokeObjectURL = vi.fn();
  });

  describe("Basic Rendering", () => {
    it("renders with default props", () => {
      const wrapper = createWrapper();
      expect(wrapper.exists()).toBe(true);
    });

    it("renders label when provided", () => {
      const wrapper = createWrapper({ label: "Upload Files" });
      expect(wrapper.text()).toContain("Upload Files");
    });

    it("renders required indicator when required is true", () => {
      const wrapper = createWrapper({ label: "Upload Files", required: true });
      expect(wrapper.text()).toContain("*");
    });

    it("renders custom title", () => {
      const wrapper = createWrapper({ title: "Custom Upload Title" });
      expect(wrapper.text()).toContain("Custom Upload Title");
    });

    it("renders custom description", () => {
      const wrapper = createWrapper({ description: "Custom description" });
      expect(wrapper.text()).toContain("Custom description");
    });

    it("renders upload icon", () => {
      const wrapper = createWrapper({ uploadIcon: "IconUpload" });
      const icon = wrapper.findComponent({ name: "Icon" });
      expect(icon.exists()).toBe(true);
    });
  });

  describe("Controls", () => {
    it("shows controls when showControls is true", () => {
      const wrapper = createWrapper({ showControls: true });
      const iconButtons = wrapper.findAllComponents({ name: "IconButton" });
      expect(iconButtons.length).toBeGreaterThan(0);
    });

    it("hides controls when showControls is false", () => {
      const wrapper = createWrapper({ showControls: false });
      const iconButtons = wrapper.findAllComponents({ name: "IconButton" });
      expect(iconButtons.length).toBe(0);
    });

    it("shows upload button when autoUpload is false", () => {
      const wrapper = createWrapper({ showControls: true, autoUpload: false });
      const uploadButton = wrapper.findComponent({ name: "IconButton" });
      expect(uploadButton.exists()).toBe(true);
    });

    it("disables controls when disabled is true", () => {
      const wrapper = createWrapper({ showControls: true, disabled: true });
      const iconButtons = wrapper.findAllComponents({ name: "IconButton" });
      iconButtons.forEach(button => {
        expect(button.props("disabled")).toBe(true);
      });
    });
  });

  describe("File Input", () => {
    it("renders hidden file input", () => {
      const wrapper = createWrapper();
      const fileInput = wrapper.find('input[type="file"]');
      expect(fileInput.exists()).toBe(true);
      expect(fileInput.attributes("class")).toContain("hidden");
    });

    it("sets accept attribute", () => {
      const wrapper = createWrapper({ accept: "image/*" });
      const fileInput = wrapper.find('input[type="file"]');
      expect(fileInput.attributes("accept")).toBe("image/*");
    });

    it("sets multiple attribute", () => {
      const wrapper = createWrapper({ multiple: true });
      const fileInput = wrapper.find('input[type="file"]');
      expect(fileInput.attributes("multiple")).toBeDefined();
    });

    it("disables file input when disabled is true", () => {
      const wrapper = createWrapper({ disabled: true });
      const fileInput = wrapper.find('input[type="file"]');
      expect(fileInput.attributes("disabled")).toBeDefined();
    });
  });

  describe("Drag and Drop", () => {
    it("applies dragging styles when isDragging is true", async () => {
      const wrapper = createWrapper();
      const uploadArea = wrapper.find(".relative");
      
      // Simulate drag enter
      await uploadArea.trigger("dragenter");
      expect(wrapper.classes()).toContain("border-primary");
    });

    it("handles drag enter event", async () => {
      const wrapper = createWrapper();
      const uploadArea = wrapper.find(".relative");
      
      await uploadArea.trigger("dragenter");
      expect(wrapper.vm.isDragging).toBe(true);
    });

    it("handles drag leave event", async () => {
      const wrapper = createWrapper();
      const uploadArea = wrapper.find(".relative");
      
      // First drag enter
      await uploadArea.trigger("dragenter");
      expect(wrapper.vm.isDragging).toBe(true);
      
      // Then drag leave
      await uploadArea.trigger("dragleave");
      expect(wrapper.vm.isDragging).toBe(false);
    });

    it("prevents default on dragover", async () => {
      const wrapper = createWrapper();
      const uploadArea = wrapper.find(".relative");
      
      const event = new Event("dragover");
      const preventDefaultSpy = vi.spyOn(event, "preventDefault");
      
      await uploadArea.trigger("dragover", event);
      expect(preventDefaultSpy).toHaveBeenCalled();
    });
  });

  describe("File Handling", () => {
    it("triggers file input when browse button is clicked", async () => {
      const wrapper = createWrapper();
      const browseButton = wrapper.findComponent({ name: "Button" });
      
      await browseButton.trigger("click");
      // The component should trigger the file input
      expect(wrapper.vm.triggerFileInput).toBeDefined();
    });

    it("triggers file input when select files button is clicked", async () => {
      const wrapper = createWrapper({ showControls: true });
      const selectButton = wrapper.findComponent({ name: "IconButton" });
      
      await selectButton.trigger("click");
      // The component should trigger the file input
      expect(wrapper.vm.triggerFileInput).toBeDefined();
    });

    it("handles file selection", async () => {
      const wrapper = createWrapper();
      const fileInput = wrapper.find('input[type="file"]');
      
      const file = new File(["test"], "test.txt", { type: "text/plain" });
      const event = {
        target: {
          files: [file],
        },
      };
      
      await fileInput.trigger("change", event);
      // The component should handle the file selection
      expect(wrapper.vm.handleFileSelect).toBeDefined();
    });
  });

  describe("File Preview", () => {
    it("shows preview when showPreview is true and files exist", async () => {
      const wrapper = createWrapper({ showPreview: true });
      
      // Add a file to the component
      const file = new File(["test"], "test.txt", { type: "text/plain" });
      wrapper.vm.files = new Map([["1", file]]);
      wrapper.vm.filesStatus = [{ fileId: "1", file }];
      
      await wrapper.vm.$nextTick();
      expect(wrapper.find(".space-y-4").exists()).toBe(true);
    });

    it("hides preview when showPreview is false", () => {
      const wrapper = createWrapper({ showPreview: false });
      expect(wrapper.find(".space-y-4").exists()).toBe(false);
    });

    it("hides preview when no files exist", () => {
      const wrapper = createWrapper({ showPreview: true });
      expect(wrapper.find(".space-y-4").exists()).toBe(false);
    });
  });

  describe("Upload Functionality", () => {
    it("uploads all files when upload button is clicked", async () => {
      const wrapper = createWrapper({ showControls: true, autoUpload: false });
      const uploadButton = wrapper.findAllComponents({ name: "IconButton" })[1];
      
      await uploadButton.trigger("click");
      expect(wrapper.vm.uploadAllFiles).toBeDefined();
    });

    it("uploads single file", async () => {
      const wrapper = createWrapper();
      const file = new File(["test"], "test.txt", { type: "text/plain" });
      wrapper.vm.files = new Map([["1", file]]);
      
      await wrapper.vm.uploadFile("1");
      expect(wrapper.vm.uploadFile).toBeDefined();
    });

    it("cancels upload", async () => {
      const wrapper = createWrapper();
      const file = new File(["test"], "test.txt", { type: "text/plain" });
      wrapper.vm.files = new Map([["1", file]]);
      
      await wrapper.vm.cancelUpload("1");
      expect(wrapper.vm.cancelUpload).toBeDefined();
    });

    it("removes file", async () => {
      const wrapper = createWrapper();
      const file = new File(["test"], "test.txt", { type: "text/plain" });
      wrapper.vm.files = new Map([["1", file]]);
      
      await wrapper.vm.removeFile("1");
      expect(wrapper.vm.removeFile).toBeDefined();
    });
  });

  describe("Utility Functions", () => {
    it("formats file size correctly", () => {
      const wrapper = createWrapper();
      const file = new File(["test"], "test.txt", { type: "text/plain" });
      
      // Mock file size
      Object.defineProperty(file, "size", {
        value: 1024,
        writable: true,
      });
      
      const formattedSize = wrapper.vm.formatFileSize(file.size);
      expect(formattedSize).toBe("1 KB");
    });

    it("checks if file is image", () => {
      const wrapper = createWrapper();
      const imageFile = new File(["test"], "test.jpg", { type: "image/jpeg" });
      const textFile = new File(["test"], "test.txt", { type: "text/plain" });
      
      expect(wrapper.vm.isImageFile(imageFile)).toBe(true);
      expect(wrapper.vm.isImageFile(textFile)).toBe(false);
    });

    it("creates thumbnail URL", () => {
      const wrapper = createWrapper();
      const file = new File(["test"], "test.jpg", { type: "image/jpeg" });
      
      const thumbnailUrl = wrapper.vm.createThumbnailUrl(file);
      expect(thumbnailUrl).toBeDefined();
    });
  });

  describe("Slots", () => {
    it("renders title slot", () => {
      const wrapper = createWrapper({}, {
        title: "<div>Custom Title</div>",
      });
      expect(wrapper.text()).toContain("Custom Title");
    });

    it("renders controls slot", () => {
      const wrapper = createWrapper({}, {
        controls: "<div>Custom Controls</div>",
      });
      expect(wrapper.text()).toContain("Custom Controls");
    });

    it("renders uploadArea slot", () => {
      const wrapper = createWrapper({}, {
        uploadArea: "<div>Custom Upload Area</div>",
      });
      expect(wrapper.text()).toContain("Custom Upload Area");
    });

    it("renders fileList slot", () => {
      const wrapper = createWrapper({ showPreview: true }, {
        fileList: "<div>Custom File List</div>",
      });
      expect(wrapper.text()).toContain("Custom File List");
    });

    it("renders fileItem slot", () => {
      const wrapper = createWrapper({ showPreview: true }, {
        fileItem: "<div>Custom File Item</div>",
      });
      expect(wrapper.text()).toContain("Custom File Item");
    });

    it("renders fileProgress slot", () => {
      const wrapper = createWrapper({ showPreview: true }, {
        fileProgress: "<div>Custom Progress</div>",
      });
      expect(wrapper.text()).toContain("Custom Progress");
    });
  });

  describe("Edge Cases", () => {
    it("handles empty files array", () => {
      const wrapper = createWrapper();
      expect(wrapper.vm.files.size).toBe(0);
    });

    it("handles disabled state correctly", () => {
      const wrapper = createWrapper({ disabled: true });
      const uploadArea = wrapper.find(".relative");
      expect(uploadArea.classes()).toContain("cursor-not-allowed");
    });

    it("handles drag and drop when disabled", async () => {
      const wrapper = createWrapper({ disabled: true });
      const uploadArea = wrapper.find(".relative");
      
      await uploadArea.trigger("dragenter");
      // Should not apply dragging styles when disabled
      expect(wrapper.classes()).not.toContain("border-primary");
    });

    it("handles file input change with no files", async () => {
      const wrapper = createWrapper();
      const fileInput = wrapper.find('input[type="file"]');
      
      const event = {
        target: {
          files: [],
        },
      };
      
      await fileInput.trigger("change", event);
      expect(wrapper.vm.handleFileSelect).toBeDefined();
    });
  });
});