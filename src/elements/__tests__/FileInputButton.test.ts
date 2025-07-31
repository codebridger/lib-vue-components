import { describe, it, expect, vi } from "vitest";
import { mount } from "@vue/test-utils";
import FileInputButton from "../FileInputButton.vue";

describe("FileInputButton Component", () => {
  const createWrapper = (props = {}) => {
    return mount(FileInputButton, {
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
    it("renders as div element by default", () => {
      const wrapper = createWrapper();
      expect(wrapper.find("div").exists()).toBe(true);
    });

    it("renders with default classes", () => {
      const wrapper = createWrapper();
      expect(wrapper.classes()).toContain("flex");
      expect(wrapper.classes()).toContain("flex-col");
      expect(wrapper.classes()).toContain("gap-1");
    });

    it("renders with custom class", () => {
      const wrapper = createWrapper({ class: "custom-file-input" });
      expect(wrapper.classes()).toContain("custom-file-input");
    });
  });

  describe("Label Rendering", () => {
    it("renders label when provided", () => {
      const wrapper = createWrapper({ label: "File Input Label" });
      expect(wrapper.text()).toContain("File Input Label");
    });

    it("does not render label when not provided", () => {
      const wrapper = createWrapper();
      const label = wrapper.find("label");
      expect(label.exists()).toBe(false);
    });

    it("renders required indicator when required is true", () => {
      const wrapper = createWrapper({ label: "Required Field", required: true });
      expect(wrapper.text()).toContain("*");
    });
  });

  describe("Input Rendering", () => {
    it("renders file input", () => {
      const wrapper = createWrapper();
      const input = wrapper.find('input[type="file"]');
      expect(input.exists()).toBe(true);
    });

    it("sets disabled state", () => {
      const wrapper = createWrapper({ disabled: true });
      const input = wrapper.find('input[type="file"]');
      expect(input.element.disabled).toBe(true);
    });

    it("sets required state", () => {
      const wrapper = createWrapper({ required: true });
      const input = wrapper.find('input[type="file"]');
      expect(input.element.required).toBe(true);
    });

    it("sets accept attribute", () => {
      const wrapper = createWrapper({ accept: "image/*" });
      const input = wrapper.find('input[type="file"]');
      expect(input.attributes("accept")).toBe("image/*");
    });

    it("sets multiple attribute", () => {
      const wrapper = createWrapper({ multiple: true });
      const input = wrapper.find('input[type="file"]');
      expect(input.attributes("multiple")).toBe("");
    });

    it("sets capture attribute", () => {
      const wrapper = createWrapper({ capture: "user" });
      const input = wrapper.find('input[type="file"]');
      expect(input.attributes("capture")).toBe("user");
    });
  });

  describe("Props and Styling", () => {
    it("applies disabled styling when disabled", () => {
      const wrapper = createWrapper({ disabled: true });
      const input = wrapper.find('input[type="file"]');
      expect(input.classes()).toContain("cursor-not-allowed");
      expect(input.classes()).toContain("bg-gray-100");
    });

    it("applies error styling when error is true", () => {
      const wrapper = createWrapper({ error: true });
      const input = wrapper.find('input[type="file"]');
      expect(input.classes()).toContain("border-red-500");
    });

    it("applies button color classes", () => {
      const colors = [
        "primary",
        "info",
        "success",
        "warning",
        "danger",
        "secondary",
        "dark",
        "gradient",
      ];
      colors.forEach((color) => {
        const wrapper = createWrapper({ buttonColor: color });
        const input = wrapper.find('input[type="file"]');
        expect(input.classes()).toContain(`file:bg-${color}/90`);
      });
    });
  });

  describe("Error Message", () => {
    it("renders error message when error and errorMessage are provided", () => {
      const wrapper = createWrapper({
        error: true,
        errorMessage: "Please select a file",
      });
      expect(wrapper.text()).toContain("Please select a file");
    });

    it("does not render error message when error is false", () => {
      const wrapper = createWrapper({
        error: false,
        errorMessage: "Please select a file",
      });
      expect(wrapper.text()).not.toContain("Please select a file");
    });
  });

  describe("Events", () => {
    it("emits change event when file is selected", async () => {
      const wrapper = createWrapper();
      const input = wrapper.find('input[type="file"]');
      await input.trigger("change");
      expect(wrapper.emitted("change")).toBeTruthy();
    });

    it("emits input event when input occurs", async () => {
      const wrapper = createWrapper();
      const input = wrapper.find('input[type="file"]');
      await input.trigger("input");
      expect(wrapper.emitted("input")).toBeTruthy();
    });

    it("emits cancel event when input is cancelled", async () => {
      const wrapper = createWrapper();
      const input = wrapper.find('input[type="file"]');
      await input.trigger("cancel");
      expect(wrapper.emitted("cancel")).toBeTruthy();
    });

    it("emits focus event when input is focused", async () => {
      const wrapper = createWrapper();
      const input = wrapper.find('input[type="file"]');
      await input.trigger("focus");
      expect(wrapper.emitted("focus")).toBeTruthy();
    });

    it("emits blur event when input loses focus", async () => {
      const wrapper = createWrapper();
      const input = wrapper.find('input[type="file"]');
      await input.trigger("blur");
      expect(wrapper.emitted("blur")).toBeTruthy();
    });
  });

  describe("Card Disabled State", () => {
    it("applies disabled state when cardDisabled is true", () => {
      const wrapper = mount(FileInputButton, {
        props: {},
        global: {
          provide: {
            cardDisabled: true,
          },
        },
      });
      const input = wrapper.find('input[type="file"]');
      expect(input.element.disabled).toBe(true);
    });
  });

  describe("Edge Cases", () => {
    it("handles empty label", () => {
      const wrapper = createWrapper({ label: "" });
      expect(wrapper.exists()).toBe(true);
    });

    it("handles empty error message", () => {
      const wrapper = createWrapper({ error: true, errorMessage: "" });
      expect(wrapper.exists()).toBe(true);
    });

    it("handles undefined props gracefully", () => {
      const wrapper = createWrapper({});
      expect(wrapper.exists()).toBe(true);
      expect(wrapper.find('input[type="file"]').exists()).toBe(true);
    });
  });
});