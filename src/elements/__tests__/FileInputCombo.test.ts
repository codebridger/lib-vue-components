import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { mount, VueWrapper } from "@vue/test-utils";
import FileInputCombo from "../FileInputCombo.vue";
import FileInputDropMode from "../FileInputDropMode.vue";
import Button from "../Button.vue";
import IconButton from "../IconButton.vue";
import Icon from "../../icon/Icon.vue";

describe("FileInputCombo Component", () => {
  let wrapper: VueWrapper<any>;

  // Helper function to create wrapper with default props
  const createWrapper = (props = {}, slots = {}) => {
    return mount(FileInputCombo, {
      props,
      slots,
      global: {
        components: {
          FileInputDropMode,
          Button,
          IconButton,
          Icon,
        },
        provide: {
          cardDisabled: false,
        },
      },
    });
  };

  beforeEach(() => {
    // Mock document.createElement and related methods
    const mockInput = {
      type: "",
      accept: "",
      multiple: false,
      style: { display: "" },
      addEventListener: vi.fn(),
      click: vi.fn(),
    };

    vi.spyOn(document, "createElement").mockReturnValue(mockInput as any);
    vi.spyOn(document.body, "appendChild").mockImplementation(() => {});
    vi.spyOn(document.body, "removeChild").mockImplementation(() => {});

    // Mock URL.createObjectURL
    global.URL.createObjectURL = vi.fn(() => "mock-url");
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("Rendering", () => {
    it("renders component container", () => {
      wrapper = createWrapper();
      expect(wrapper.find("section").exists()).toBe(true);
    });

    it("renders label when provided", () => {
      wrapper = createWrapper({ label: "Upload Files" });
      expect(wrapper.find("label").exists()).toBe(true);
      expect(wrapper.find("label").text()).toContain("Upload Files");
    });

    it("renders required indicator when required is true", () => {
      wrapper = createWrapper({ label: "Upload Files", required: true });
      expect(wrapper.find("span.text-red-500").exists()).toBe(true);
      expect(wrapper.find("span.text-red-500").text()).toBe("*");
    });

    it("renders controls when showControls is true", () => {
      wrapper = createWrapper({ showControls: true });
      const controls = wrapper.find(".mb-4.flex.items-center.gap-2");
      expect(controls.exists()).toBe(true);
    });

    it("does not render controls when showControls is false", () => {
      wrapper = createWrapper({ showControls: false });
      const controls = wrapper.find(".mb-4.flex.items-center.gap-2");
      expect(controls.exists()).toBe(false);
    });

    it("renders upload area when no files are selected", () => {
      wrapper = createWrapper();
      const uploadArea = wrapper.find(".flex.flex-col.items-center.justify-center.p-6");
      expect(uploadArea.exists()).toBe(true);
    });

    it("renders file preview when showPreview is true and files exist", async () => {
      wrapper = createWrapper({ showPreview: true });
      
      // Add a file to trigger preview
      const mockFile = new File(["test"], "test.txt", { type: "text/plain" });
      await wrapper.vm.handleFileSelect({
        target: { files: [mockFile] },
      } as any);
      
      expect(wrapper.find(".mt-4").exists()).toBe(true);
    });

    it("renders FileInputDropMode component", () => {
      wrapper = createWrapper();
      expect(wrapper.findComponent(FileInputDropMode).exists()).toBe(true);
    });

    it("renders error message when provided", () => {
      wrapper = createWrapper({ errorMessage: "Upload failed" });
      expect(wrapper.find(".text-sm.text-red-600").exists()).toBe(true);
      expect(wrapper.find(".text-sm.text-red-600").text()).toBe("Upload failed");
    });
  });

  describe("Props and Styling", () => {
    it("applies container classes", () => {
      wrapper = createWrapper();
      const container = wrapper.find(".flex.flex-col.gap-4");
      expect(container.exists()).toBe(true);
    });

    it("applies upload area styling", () => {
      wrapper = createWrapper();
      const uploadArea = wrapper.find(".flex.flex-col.items-center.justify-center.p-6");
      expect(uploadArea.classes()).toContain("border-2");
      expect(uploadArea.classes()).toContain("border-dashed");
      expect(uploadArea.classes()).toContain("rounded-lg");
    });

    it("applies dragging styles when isDragging is true", async () => {
      wrapper = createWrapper();
      await wrapper.setData({ isDragging: true });
      const uploadArea = wrapper.find(".flex.flex-col.items-center.justify-center.p-6");
      expect(uploadArea.classes()).toContain("bg-primary-50");
      expect(uploadArea.classes()).toContain("border-primary-400");
    });

    it("applies disabled styles when disabled", () => {
      wrapper = createWrapper({ disabled: true });
      const uploadArea = wrapper.find(".flex.flex-col.items-center.justify-center.p-6");
      expect(uploadArea.classes()).toContain("bg-gray-100");
      expect(uploadArea.classes()).toContain("cursor-not-allowed");
      expect(uploadArea.classes()).toContain("opacity-60");
    });

    it("applies disabled styles when cardDisabled is true", () => {
      wrapper = mount(FileInputCombo, {
        props: {},
        global: {
          components: {
            FileInputDropMode,
            Button,
            IconButton,
            Icon,
          },
          provide: {
            cardDisabled: true,
          },
        },
      });
      const uploadArea = wrapper.find(".flex.flex-col.items-center.justify-center.p-6");
      expect(uploadArea.classes()).toContain("bg-gray-100");
      expect(uploadArea.classes()).toContain("cursor-not-allowed");
      expect(uploadArea.classes()).toContain("opacity-60");
    });
  });

  describe("File Input Handling", () => {
    it("triggers file input when browse button is clicked", async () => {
      wrapper = createWrapper();
      const browseButton = wrapper.findComponent(Button);
      await browseButton.trigger("click");
      expect(document.createElement).toHaveBeenCalledWith("input");
    });

    it("triggers file input when select files button is clicked", async () => {
      wrapper = createWrapper({ showControls: true });
      const selectButton = wrapper.findAllComponents(IconButton)[0];
      await selectButton.trigger("click");
      expect(document.createElement).toHaveBeenCalledWith("input");
    });

    it("does not trigger file input when disabled", async () => {
      wrapper = createWrapper({ disabled: true });
      const browseButton = wrapper.findComponent(Button);
      await browseButton.trigger("click");
      expect(document.createElement).not.toHaveBeenCalled();
    });

    it("handles file selection", async () => {
      wrapper = createWrapper();
      const mockFile = new File(["test"], "test.txt", { type: "text/plain" });
      const mockEvent = {
        target: { files: [mockFile] },
      };

      await wrapper.vm.handleFileSelect(mockEvent as any);
      
      expect(wrapper.emitted("file-select")).toBeTruthy();
      expect(wrapper.vm.files.size).toBe(1);
    });

    it("validates file size when maxSize is set", async () => {
      wrapper = createWrapper({ maxSize: 100 });
      const mockFile = new File(["test".repeat(50)], "test.txt", { type: "text/plain" });
      const mockEvent = {
        target: { files: [mockFile] },
      };

      await wrapper.vm.handleFileSelect(mockEvent as any);
      
      expect(wrapper.vm.errorMessage).toContain("exceed the maximum size");
    });

    it("validates maximum number of files", async () => {
      wrapper = createWrapper({ maxFiles: 1 });
      const mockFile1 = new File(["test1"], "test1.txt", { type: "text/plain" });
      const mockFile2 = new File(["test2"], "test2.txt", { type: "text/plain" });
      const mockEvent = {
        target: { files: [mockFile1, mockFile2] },
      };

      await wrapper.vm.handleFileSelect(mockEvent as any);
      
      expect(wrapper.vm.errorMessage).toContain("Maximum 1 files allowed");
    });

    it("prevents duplicate files", async () => {
      wrapper = createWrapper();
      const mockFile = new File(["test"], "test.txt", { type: "text/plain" });
      
      // Add first file
      await wrapper.vm.handleFileSelect({
        target: { files: [mockFile] },
      } as any);
      
      // Try to add same file again
      await wrapper.vm.handleFileSelect({
        target: { files: [mockFile] },
      } as any);
      
      expect(wrapper.vm.errorMessage).toContain("already selected");
    });
  });

  describe("Drag and Drop", () => {
    it("handles drag enter", async () => {
      wrapper = createWrapper();
      const uploadArea = wrapper.find(".relative");
      await uploadArea.trigger("dragenter");
      expect(wrapper.vm.isDragging).toBe(true);
    });

    it("handles drag leave", async () => {
      wrapper = createWrapper();
      const uploadArea = wrapper.find(".relative");
      await uploadArea.trigger("dragenter");
      await uploadArea.trigger("dragleave");
      expect(wrapper.vm.isDragging).toBe(false);
    });

    it("handles file drop", async () => {
      wrapper = createWrapper();
      const mockFile = new File(["test"], "test.txt", { type: "text/plain" });
      const mockEvent = {
        preventDefault: vi.fn(),
        dataTransfer: { files: [mockFile] },
      };

      await wrapper.vm.handleDrop(mockEvent as any);
      
      expect(wrapper.vm.isDragging).toBe(false);
      expect(wrapper.emitted("file-select")).toBeTruthy();
    });

    it("handles global drop from FileInputDropMode", async () => {
      wrapper = createWrapper();
      const mockFile = new File(["test"], "test.txt", { type: "text/plain" });
      const mockFileList = {
        0: mockFile,
        length: 1,
        item: (index: number) => mockFile,
      } as FileList;

      await wrapper.vm.handleGlobalDrop(mockFileList);
      
      expect(wrapper.emitted("file-select")).toBeTruthy();
    });

    it("filters dropped files using filterFileDropped", async () => {
      const filterFn = vi.fn((file: File) => file.name.includes("allowed"));
      wrapper = createWrapper({ filterFileDropped: filterFn });
      
      const allowedFile = new File(["test"], "allowed.txt", { type: "text/plain" });
      const blockedFile = new File(["test"], "blocked.txt", { type: "text/plain" });
      const mockEvent = {
        preventDefault: vi.fn(),
        dataTransfer: { files: [allowedFile, blockedFile] },
      };

      await wrapper.vm.handleDrop(mockEvent as any);
      
      expect(filterFn).toHaveBeenCalledWith(allowedFile);
      expect(filterFn).toHaveBeenCalledWith(blockedFile);
    });
  });

  describe("File Upload", () => {
    it("uploads single file", async () => {
      wrapper = createWrapper();
      const mockFile = new File(["test"], "test.txt", { type: "text/plain" });
      const fileId = "test-file-id";
      wrapper.vm.files.set(fileId, mockFile);

      await wrapper.vm.uploadFile(fileId);
      
      expect(wrapper.emitted("file-upload")).toBeTruthy();
      expect(wrapper.vm.fileStates[fileId].status).toBe("uploading");
    });

    it("uploads all files", async () => {
      wrapper = createWrapper();
      const mockFile1 = new File(["test1"], "test1.txt", { type: "text/plain" });
      const mockFile2 = new File(["test2"], "test2.txt", { type: "text/plain" });
      wrapper.vm.files.set("file1", mockFile1);
      wrapper.vm.files.set("file2", mockFile2);

      await wrapper.vm.uploadAllFiles();
      
      expect(wrapper.emitted("file-upload-all")).toBeTruthy();
    });

    it("cancels file upload", async () => {
      wrapper = createWrapper();
      const mockFile = new File(["test"], "test.txt", { type: "text/plain" });
      const fileId = "test-file-id";
      wrapper.vm.files.set(fileId, mockFile);
      wrapper.vm.fileStates[fileId] = { progress: 50, status: "uploading", fileId };

      await wrapper.vm.cancelUpload(fileId);
      
      expect(wrapper.emitted("file-upload-cancel")).toBeTruthy();
      expect(wrapper.vm.fileStates[fileId].status).toBe("queue");
    });

    it("removes file", async () => {
      wrapper = createWrapper();
      const mockFile = new File(["test"], "test.txt", { type: "text/plain" });
      const fileId = "test-file-id";
      wrapper.vm.files.set(fileId, mockFile);

      await wrapper.vm.removeFile(fileId);
      
      expect(wrapper.emitted("file-remove")).toBeTruthy();
      expect(wrapper.vm.files.size).toBe(0);
    });
  });

  describe("File Progress and Status", () => {
    it("updates file progress", async () => {
      wrapper = createWrapper();
      const mockFile = new File(["test"], "test.txt", { type: "text/plain" });
      const fileId = "test-file-id";
      wrapper.vm.files.set(fileId, mockFile);

      await wrapper.vm.updateFileProgress(fileId, 50);
      
      expect(wrapper.vm.fileStates[fileId].progress).toBe(50);
      expect(wrapper.vm.fileStates[fileId].status).toBe("uploading");
      expect(wrapper.emitted("file-upload-progress")).toBeTruthy();
    });

    it("completes file upload when progress reaches 100", async () => {
      wrapper = createWrapper();
      const mockFile = new File(["test"], "test.txt", { type: "text/plain" });
      const fileId = "test-file-id";
      wrapper.vm.files.set(fileId, mockFile);

      await wrapper.vm.updateFileProgress(fileId, 100);
      
      expect(wrapper.vm.fileStates[fileId].status).toBe("finished");
      expect(wrapper.emitted("file-upload-complete")).toBeTruthy();
    });

    it("sets file status with error", async () => {
      wrapper = createWrapper();
      const mockFile = new File(["test"], "test.txt", { type: "text/plain" });
      const fileId = "test-file-id";
      wrapper.vm.files.set(fileId, mockFile);

      await wrapper.vm.setFileStatus(fileId, "error", "Upload failed");
      
      expect(wrapper.vm.fileStates[fileId].status).toBe("error");
      expect(wrapper.vm.fileStates[fileId].error).toBe("Upload failed");
      expect(wrapper.emitted("file-upload-error")).toBeTruthy();
    });

    it("sets file status to finished", async () => {
      wrapper = createWrapper();
      const mockFile = new File(["test"], "test.txt", { type: "text/plain" });
      const fileId = "test-file-id";
      wrapper.vm.files.set(fileId, mockFile);

      await wrapper.vm.setFileStatus(fileId, "finished");
      
      expect(wrapper.vm.fileStates[fileId].status).toBe("finished");
      expect(wrapper.vm.fileStates[fileId].progress).toBe(100);
      expect(wrapper.emitted("file-upload-complete")).toBeTruthy();
    });
  });

  describe("Auto Upload", () => {
    it("auto uploads files when autoUpload is true", async () => {
      wrapper = createWrapper({ autoUpload: true });
      const mockFile = new File(["test"], "test.txt", { type: "text/plain" });
      const mockEvent = {
        target: { files: [mockFile] },
      };

      await wrapper.vm.handleFileSelect(mockEvent as any);
      
      expect(wrapper.emitted("file-upload-all")).toBeTruthy();
    });

    it("does not auto upload when autoUpload is false", async () => {
      wrapper = createWrapper({ autoUpload: false });
      const mockFile = new File(["test"], "test.txt", { type: "text/plain" });
      const mockEvent = {
        target: { files: [mockFile] },
      };

      await wrapper.vm.handleFileSelect(mockEvent as any);
      
      expect(wrapper.emitted("file-upload-all")).toBeFalsy();
    });
  });

  describe("File Utilities", () => {
    it("identifies image files correctly", () => {
      wrapper = createWrapper();
      const imageFile = new File(["test"], "test.jpg", { type: "image/jpeg" });
      const textFile = new File(["test"], "test.txt", { type: "text/plain" });
      
      expect(wrapper.vm.isImageFile(imageFile)).toBe(true);
      expect(wrapper.vm.isImageFile(textFile)).toBe(false);
    });

    it("creates thumbnail URL for files", () => {
      wrapper = createWrapper();
      const mockFile = new File(["test"], "test.jpg", { type: "image/jpeg" });
      
      const url = wrapper.vm.createThumbnailUrl(mockFile);
      
      expect(url).toBe("mock-url");
      expect(URL.createObjectURL).toHaveBeenCalledWith(mockFile);
    });

    it("formats file size correctly", () => {
      wrapper = createWrapper();
      
      expect(wrapper.vm.formatFileSize(0)).toBe("0 Bytes");
      expect(wrapper.vm.formatFileSize(1024)).toBe("1 KB");
      expect(wrapper.vm.formatFileSize(1048576)).toBe("1 MB");
    });
  });

  describe("Computed Properties", () => {
    it("computes filesStatus correctly", async () => {
      wrapper = createWrapper();
      const mockFile = new File(["test"], "test.txt", { type: "text/plain" });
      const fileId = "test-file-id";
      wrapper.vm.files.set(fileId, mockFile);
      wrapper.vm.fileStates[fileId] = { progress: 50, status: "uploading", fileId };

      const status = wrapper.vm.filesStatus;
      
      expect(status).toHaveLength(1);
      expect(status[0].file).toBe(mockFile);
      expect(status[0].fileId).toBe(fileId);
      expect(status[0].progress).toBe(50);
      expect(status[0].status).toBe("uploading");
      expect(status[0].isUploading).toBe(true);
    });
  });

  describe("Exposed Methods", () => {
    it("exposes files as array", async () => {
      wrapper = createWrapper();
      const mockFile = new File(["test"], "test.txt", { type: "text/plain" });
      wrapper.vm.files.set("test-id", mockFile);

      const exposedFiles = wrapper.vm.files;
      
      expect(exposedFiles).toHaveLength(1);
      expect(exposedFiles[0]).toBe(mockFile);
    });

    it("exposes all required methods", () => {
      wrapper = createWrapper();
      
      expect(typeof wrapper.vm.uploadFile).toBe("function");
      expect(typeof wrapper.vm.uploadAllFiles).toBe("function");
      expect(typeof wrapper.vm.cancelUpload).toBe("function");
      expect(typeof wrapper.vm.removeFile).toBe("function");
      expect(typeof wrapper.vm.triggerFileInput).toBe("function");
      expect(typeof wrapper.vm.updateFileProgress).toBe("function");
      expect(typeof wrapper.vm.setFileStatus).toBe("function");
    });
  });

  describe("Default Values", () => {
    it("uses correct default values", () => {
      wrapper = createWrapper();
      expect(wrapper.props("accept")).toBe("");
      expect(wrapper.props("multiple")).toBe(true);
      expect(wrapper.props("disabled")).toBe(false);
      expect(wrapper.props("title")).toBe("");
      expect(wrapper.props("description")).toBe("");
      expect(wrapper.props("label")).toBe("");
      expect(wrapper.props("required")).toBe(false);
      expect(wrapper.props("showPreview")).toBe(true);
      expect(wrapper.props("showControls")).toBe(true);
      expect(wrapper.props("maxSize")).toBe(0);
      expect(wrapper.props("fileTypes")).toBe("");
      expect(wrapper.props("maxFiles")).toBe(0);
      expect(wrapper.props("autoUpload")).toBe(false);
      expect(wrapper.props("uploadIcon")).toBe("IconCloudUpload");
      expect(wrapper.props("dropModeIcon")).toBe("IconGallery");
      expect(wrapper.props("dropModeLabel")).toBe("Drop your files");
      expect(wrapper.props("errorMessage")).toBe("");
    });
  });

  describe("Edge Cases", () => {
    it("handles empty file selection", async () => {
      wrapper = createWrapper();
      const mockEvent = {
        target: { files: [] },
      };

      await wrapper.vm.handleFileSelect(mockEvent as any);
      
      expect(wrapper.vm.files.size).toBe(0);
    });

    it("handles null dataTransfer in drop event", async () => {
      wrapper = createWrapper();
      const mockEvent = {
        preventDefault: vi.fn(),
        dataTransfer: null,
      };

      await wrapper.vm.handleDrop(mockEvent as any);
      
      expect(wrapper.vm.isDragging).toBe(false);
    });

    it("handles non-existent file in upload", async () => {
      wrapper = createWrapper();
      await wrapper.vm.uploadFile("non-existent-id");
      expect(wrapper.emitted("file-upload")).toBeFalsy();
    });

    it("handles non-existent file in remove", async () => {
      wrapper = createWrapper();
      await wrapper.vm.removeFile("non-existent-id");
      expect(wrapper.emitted("file-remove")).toBeFalsy();
    });

    it("throws error when updating progress of finished file", async () => {
      wrapper = createWrapper();
      const mockFile = new File(["test"], "test.txt", { type: "text/plain" });
      const fileId = "test-file-id";
      wrapper.vm.files.set(fileId, mockFile);
      wrapper.vm.fileStates[fileId] = { progress: 100, status: "finished", fileId };

      expect(() => wrapper.vm.updateFileProgress(fileId, 50)).toThrow("File already finished");
    });
  });
});