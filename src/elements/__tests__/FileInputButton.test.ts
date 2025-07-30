import { describe, it, expect, vi } from "vitest";
import { mount, VueWrapper } from "@vue/test-utils";
import FileInputButton from "../FileInputButton.vue";

describe("FileInputButton Component", () => {
  let wrapper: VueWrapper<any>;

  // Helper function to create wrapper with default props
  const createWrapper = (props = {}) => {
    return mount(FileInputButton, {
      props,
      global: {
        provide: {
          cardDisabled: false,
        },
      },
    });
  };

  describe("Rendering", () => {
    it("renders file input element", () => {
      wrapper = createWrapper();
      expect(wrapper.find('input[type="file"]').exists()).toBe(true);
    });

    it("renders label when provided", () => {
      wrapper = createWrapper({ label: "Upload File" });
      expect(wrapper.find("label").exists()).toBe(true);
      expect(wrapper.find("label").text()).toContain("Upload File");
    });

    it("does not render label when not provided", () => {
      wrapper = createWrapper();
      expect(wrapper.find("label").exists()).toBe(false);
    });

    it("renders required indicator when required is true", () => {
      wrapper = createWrapper({ label: "Upload File", required: true });
      expect(wrapper.find("span.text-red-500").exists()).toBe(true);
      expect(wrapper.find("span.text-red-500").text()).toBe("*");
    });

    it("renders error message when error and errorMessage are provided", () => {
      wrapper = createWrapper({
        error: true,
        errorMessage: "Please select a file",
      });
      expect(wrapper.find("span.text-red-500.mt-1").exists()).toBe(true);
      expect(wrapper.find("span.text-red-500.mt-1").text()).toBe(
        "Please select a file"
      );
    });

    it("does not render error message when error is false", () => {
      wrapper = createWrapper({
        error: false,
        errorMessage: "Please select a file",
      });
      expect(wrapper.find("span.text-red-500.mt-1").exists()).toBe(false);
    });

    it("does not render error message when errorMessage is empty", () => {
      wrapper = createWrapper({
        error: true,
        errorMessage: "",
      });
      expect(wrapper.find("span.text-red-500.mt-1").exists()).toBe(false);
    });
  });

  describe("Props and Styling", () => {
    it("applies base classes to input", () => {
      wrapper = createWrapper();
      const input = wrapper.find('input[type="file"]');
      expect(input.classes()).toContain("form-input");
      expect(input.classes()).toContain("file:border-0");
      expect(input.classes()).toContain("file:font-semibold");
      expect(input.classes()).toContain("w-full");
      expect(input.classes()).toContain("file:py-2");
      expect(input.classes()).toContain("file:px-4");
      expect(input.classes()).toContain("p-0");
      expect(input.classes()).toContain("transition-all");
    });

    it("applies direction classes", () => {
      wrapper = createWrapper();
      const input = wrapper.find('input[type="file"]');
      expect(input.classes()).toContain("ltr:file:mr-5");
      expect(input.classes()).toContain("rtl:file:ml-5");
    });

    it("applies file text color", () => {
      wrapper = createWrapper();
      const input = wrapper.find('input[type="file"]');
      expect(input.classes()).toContain("file:text-white");
    });

    it("applies disabled styling when disabled", () => {
      wrapper = createWrapper({ disabled: true });
      const input = wrapper.find('input[type="file"]');
      expect(input.classes()).toContain("bg-gray-100");
      expect(input.classes()).toContain("cursor-not-allowed");
    });

    it("applies disabled styling when cardDisabled is true", () => {
      wrapper = mount(FileInputButton, {
        props: {},
        global: {
          provide: {
            cardDisabled: true,
          },
        },
      });
      const input = wrapper.find('input[type="file"]');
      expect(input.classes()).toContain("bg-gray-100");
      expect(input.classes()).toContain("cursor-not-allowed");
    });

    it("applies error border when error is true", () => {
      wrapper = createWrapper({ error: true });
      const input = wrapper.find('input[type="file"]');
      expect(input.classes()).toContain("border-red-500");
    });

    it("applies default border when error is false", () => {
      wrapper = createWrapper({ error: false });
      const input = wrapper.find('input[type="file"]');
      expect(input.classes()).toContain("border-gray-300");
    });

    it("applies white background when not disabled", () => {
      wrapper = createWrapper();
      const input = wrapper.find('input[type="file"]');
      expect(input.classes()).toContain("bg-white");
    });
  });

  describe("Button Color Variants", () => {
    it("applies primary color by default", () => {
      wrapper = createWrapper();
      const input = wrapper.find('input[type="file"]');
      expect(input.classes()).toContain("file:bg-primary/90");
      expect(input.classes()).toContain("file:hover:bg-primary");
    });

    it("applies info color", () => {
      wrapper = createWrapper({ buttonColor: "info" });
      const input = wrapper.find('input[type="file"]');
      expect(input.classes()).toContain("file:bg-info/90");
      expect(input.classes()).toContain("file:hover:bg-info");
    });

    it("applies success color", () => {
      wrapper = createWrapper({ buttonColor: "success" });
      const input = wrapper.find('input[type="file"]');
      expect(input.classes()).toContain("file:bg-success/90");
      expect(input.classes()).toContain("file:hover:bg-success");
    });

    it("applies warning color", () => {
      wrapper = createWrapper({ buttonColor: "warning" });
      const input = wrapper.find('input[type="file"]');
      expect(input.classes()).toContain("file:bg-warning/90");
      expect(input.classes()).toContain("file:hover:bg-warning");
    });

    it("applies danger color", () => {
      wrapper = createWrapper({ buttonColor: "danger" });
      const input = wrapper.find('input[type="file"]');
      expect(input.classes()).toContain("file:bg-danger/90");
      expect(input.classes()).toContain("file:hover:bg-danger");
    });

    it("applies secondary color", () => {
      wrapper = createWrapper({ buttonColor: "secondary" });
      const input = wrapper.find('input[type="file"]');
      expect(input.classes()).toContain("file:bg-secondary/90");
      expect(input.classes()).toContain("file:hover:bg-secondary");
    });

    it("applies dark color", () => {
      wrapper = createWrapper({ buttonColor: "dark" });
      const input = wrapper.find('input[type="file"]');
      expect(input.classes()).toContain("file:bg-dark/90");
      expect(input.classes()).toContain("file:hover:bg-dark");
    });

    it("applies gradient color", () => {
      wrapper = createWrapper({ buttonColor: "gradient" });
      const input = wrapper.find('input[type="file"]');
      expect(input.classes()).toContain("file:bg-gradient/90");
      expect(input.classes()).toContain("file:hover:bg-gradient");
    });
  });

  describe("Input Attributes", () => {
    it("sets id attribute", () => {
      wrapper = createWrapper({ id: "file-upload" });
      const input = wrapper.find('input[type="file"]');
      expect(input.attributes("id")).toBe("file-upload");
    });

    it("sets accept attribute", () => {
      wrapper = createWrapper({ accept: "image/*" });
      const input = wrapper.find('input[type="file"]');
      expect(input.attributes("accept")).toBe("image/*");
    });

    it("sets capture attribute", () => {
      wrapper = createWrapper({ capture: "user" });
      const input = wrapper.find('input[type="file"]');
      expect(input.attributes("capture")).toBe("user");
    });

    it("sets multiple attribute when true", () => {
      wrapper = createWrapper({ multiple: true });
      const input = wrapper.find('input[type="file"]');
      expect(input.attributes("multiple")).toBeDefined();
    });

    it("does not set multiple attribute when false", () => {
      wrapper = createWrapper({ multiple: false });
      const input = wrapper.find('input[type="file"]');
      expect(input.attributes("multiple")).toBeUndefined();
    });

    it("sets size attribute", () => {
      wrapper = createWrapper({ size: 10 });
      const input = wrapper.find('input[type="file"]');
      expect(input.attributes("size")).toBe("10");
    });

    it("sets required attribute when true", () => {
      wrapper = createWrapper({ required: true });
      const input = wrapper.find('input[type="file"]');
      expect(input.attributes("required")).toBeDefined();
    });

    it("does not set required attribute when false", () => {
      wrapper = createWrapper({ required: false });
      const input = wrapper.find('input[type="file"]');
      expect(input.attributes("required")).toBeUndefined();
    });

    it("sets disabled attribute when disabled", () => {
      wrapper = createWrapper({ disabled: true });
      const input = wrapper.find('input[type="file"]');
      expect(input.attributes("disabled")).toBeDefined();
    });

    it("sets disabled attribute when cardDisabled is true", () => {
      wrapper = mount(FileInputButton, {
        props: {},
        global: {
          provide: {
            cardDisabled: true,
          },
        },
      });
      const input = wrapper.find('input[type="file"]');
      expect(input.attributes("disabled")).toBeDefined();
    });
  });

  describe("Events", () => {
    it("emits change event", async () => {
      wrapper = createWrapper();
      const input = wrapper.find('input[type="file"]');
      await input.trigger("change");
      expect(wrapper.emitted("change")).toBeTruthy();
    });

    it("emits input event", async () => {
      wrapper = createWrapper();
      const input = wrapper.find('input[type="file"]');
      await input.trigger("input");
      expect(wrapper.emitted("input")).toBeTruthy();
    });

    it("emits cancel event", async () => {
      wrapper = createWrapper();
      const input = wrapper.find('input[type="file"]');
      await input.trigger("cancel");
      expect(wrapper.emitted("cancel")).toBeTruthy();
    });

    it("emits blur event", async () => {
      wrapper = createWrapper();
      const input = wrapper.find('input[type="file"]');
      await input.trigger("blur");
      expect(wrapper.emitted("blur")).toBeTruthy();
    });

    it("emits focus event", async () => {
      wrapper = createWrapper();
      const input = wrapper.find('input[type="file"]');
      await input.trigger("focus");
      expect(wrapper.emitted("focus")).toBeTruthy();
    });

    it("emits file-change event with files when change occurs", async () => {
      wrapper = createWrapper();
      const input = wrapper.find('input[type="file"]');
      
      // Mock FileList
      const mockFile = new File(["test"], "test.txt", { type: "text/plain" });
      const mockFileList = {
        0: mockFile,
        length: 1,
        item: (index: number) => mockFile,
      } as FileList;

      // Mock the event target
      const mockEvent = {
        target: {
          files: mockFileList,
        },
      } as unknown as Event;

      // Trigger the change handler directly
      await wrapper.vm.handleFileChange(mockEvent);
      
      expect(wrapper.emitted("file-change")).toBeTruthy();
      expect(wrapper.emitted("file-change")?.[0]).toEqual([mockFileList]);
    });
  });

  describe("File Input Reference", () => {
    it("has fileInput ref", () => {
      wrapper = createWrapper();
      expect(wrapper.vm.fileInput).toBeDefined();
    });

    it("clears input value on cancel", async () => {
      wrapper = createWrapper();
      const input = wrapper.find('input[type="file"]');
      
      // Mock the fileInput ref
      const mockInput = {
        value: "test.txt",
      };
      wrapper.vm.fileInput = mockInput;

      await wrapper.vm.handleCancel({} as Event);
      
      expect(mockInput.value).toBe("");
    });
  });

  describe("Accessibility", () => {
    it("associates label with input using for attribute", () => {
      wrapper = createWrapper({ label: "Upload File", id: "file-upload" });
      const label = wrapper.find("label");
      expect(label.attributes("for")).toBe("file-upload");
    });

    it("has proper input type", () => {
      wrapper = createWrapper();
      const input = wrapper.find('input[type="file"]');
      expect(input.attributes("type")).toBe("file");
    });
  });

  describe("Edge Cases", () => {
    it("handles empty label", () => {
      wrapper = createWrapper({ label: "" });
      expect(wrapper.find("label").exists()).toBe(false);
    });

    it("handles undefined props gracefully", () => {
      wrapper = createWrapper({});
      expect(wrapper.find('input[type="file"]').exists()).toBe(true);
    });

    it("handles file change without files", async () => {
      wrapper = createWrapper();
      const mockEvent = {
        target: {
          files: null,
        },
      } as unknown as Event;

      await wrapper.vm.handleFileChange(mockEvent);
      
      expect(wrapper.emitted("change")).toBeTruthy();
      expect(wrapper.emitted("file-change")).toBeFalsy();
    });
  });

  describe("Default Values", () => {
    it("uses correct default values", () => {
      wrapper = createWrapper();
      expect(wrapper.props("disabled")).toBe(false);
      expect(wrapper.props("required")).toBe(false);
      expect(wrapper.props("error")).toBe(false);
      expect(wrapper.props("errorMessage")).toBe("");
      expect(wrapper.props("label")).toBe("");
      expect(wrapper.props("id")).toBe("");
      expect(wrapper.props("buttonColor")).toBe("primary");
      expect(wrapper.props("accept")).toBe("");
      expect(wrapper.props("multiple")).toBe(false);
      expect(wrapper.props("size")).toBe(0);
    });
  });

  describe("Computed Properties", () => {
    it("computes button color correctly for all variants", () => {
      const colorVariants = [
        "primary",
        "info",
        "success",
        "warning",
        "danger",
        "secondary",
        "dark",
        "gradient",
      ];

      colorVariants.forEach((color) => {
        wrapper = createWrapper({ buttonColor: color });
        const input = wrapper.find('input[type="file"]');
        expect(input.classes()).toContain(`file:bg-${color}/90`);
        expect(input.classes()).toContain(`file:hover:bg-${color}`);
      });
    });
  });

  describe("Label and Error Integration", () => {
    it("renders label with required indicator", () => {
      wrapper = createWrapper({
        label: "Upload Document",
        required: true,
      });
      const label = wrapper.find("label");
      expect(label.text()).toContain("Upload Document");
      expect(label.text()).toContain("*");
    });

    it("renders error message below input", () => {
      wrapper = createWrapper({
        error: true,
        errorMessage: "File is required",
      });
      const errorSpan = wrapper.find("span.text-red-500.mt-1");
      expect(errorSpan.text()).toBe("File is required");
    });

    it("applies error styling to input when error is true", () => {
      wrapper = createWrapper({ error: true });
      const input = wrapper.find('input[type="file"]');
      expect(input.classes()).toContain("border-red-500");
    });
  });

  describe("Container Styling", () => {
    it("applies container classes", () => {
      wrapper = createWrapper();
      const container = wrapper.find("div");
      expect(container.classes()).toContain("flex");
      expect(container.classes()).toContain("flex-col");
      expect(container.classes()).toContain("gap-1");
    });

    it("applies label styling", () => {
      wrapper = createWrapper({ label: "Upload File" });
      const label = wrapper.find("label");
      expect(label.classes()).toContain("text-sm");
      expect(label.classes()).toContain("font-medium");
      expect(label.classes()).toContain("text-gray-700");
    });
  });
});