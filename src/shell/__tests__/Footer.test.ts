import { describe, it, expect, vi } from "vitest";
import { mount } from "@vue/test-utils";
import Footer from "@/shell/Footer.vue";

describe("Footer Component", () => {
  describe("Rendering", () => {
    it("renders as div element", () => {
      const wrapper = mount(Footer);
      
      expect(wrapper.element.tagName).toBe("DIV");
    });

    it("renders with correct classes", () => {
      const wrapper = mount(Footer);
      
      expect(wrapper.classes()).toContain("dark:text-white-dark");
      expect(wrapper.classes()).toContain("text-center");
      expect(wrapper.classes()).toContain("ltr:sm:text-left");
      expect(wrapper.classes()).toContain("rtl:sm:text-right");
      expect(wrapper.classes()).toContain("p-6");
      expect(wrapper.classes()).toContain("pt-0");
      expect(wrapper.classes()).toContain("mt-auto");
    });

    it("renders copyright text", () => {
      const wrapper = mount(Footer);
      
      expect(wrapper.text()).toContain("©");
      expect(wrapper.text()).toContain("Vristo All rights reserved");
    });

    it("renders current year", () => {
      const wrapper = mount(Footer);
      const currentYear = new Date().getFullYear();
      
      expect(wrapper.text()).toContain(currentYear.toString());
    });
  });

  describe("Content Structure", () => {
    it("has correct text content", () => {
      const wrapper = mount(Footer);
      const currentYear = new Date().getFullYear();
      
      expect(wrapper.text()).toBe(`© ${currentYear}. Vristo All rights reserved.`);
    });

    it("has proper spacing and punctuation", () => {
      const wrapper = mount(Footer);
      const currentYear = new Date().getFullYear();
      
      expect(wrapper.text()).toMatch(/© \d{4}\. Vristo All rights reserved\./);
    });
  });

  describe("Styling", () => {
    it("applies dark mode styling", () => {
      const wrapper = mount(Footer);
      
      expect(wrapper.classes()).toContain("dark:text-white-dark");
    });

    it("applies responsive text alignment", () => {
      const wrapper = mount(Footer);
      
      expect(wrapper.classes()).toContain("text-center");
      expect(wrapper.classes()).toContain("ltr:sm:text-left");
      expect(wrapper.classes()).toContain("rtl:sm:text-right");
    });

    it("applies padding and margin", () => {
      const wrapper = mount(Footer);
      
      expect(wrapper.classes()).toContain("p-6");
      expect(wrapper.classes()).toContain("pt-0");
      expect(wrapper.classes()).toContain("mt-auto");
    });
  });

  describe("Dynamic Year", () => {
    it("updates year dynamically", () => {
      const mockDate = new Date("2024-01-01");
      const originalDate = global.Date;
      global.Date = vi.fn(() => mockDate) as any;
      global.Date.getFullYear = vi.fn(() => 2024);

      const wrapper = mount(Footer);
      
      expect(wrapper.text()).toContain("2024");
      
      global.Date = originalDate;
    });

    it("works with different years", () => {
      const mockDate = new Date("2025-01-01");
      const originalDate = global.Date;
      global.Date = vi.fn(() => mockDate) as any;
      global.Date.getFullYear = vi.fn(() => 2025);

      const wrapper = mount(Footer);
      
      expect(wrapper.text()).toContain("2025");
      
      global.Date = originalDate;
    });
  });

  describe("Accessibility", () => {
    it("has semantic structure", () => {
      const wrapper = mount(Footer);
      
      expect(wrapper.element.tagName).toBe("DIV");
    });

    it("provides readable text content", () => {
      const wrapper = mount(Footer);
      const currentYear = new Date().getFullYear();
      
      expect(wrapper.text()).toBe(`© ${currentYear}. Vristo All rights reserved.`);
    });
  });

  describe("Edge Cases", () => {
    it("handles year change correctly", () => {
      const wrapper = mount(Footer);
      const currentYear = new Date().getFullYear();
      
      expect(wrapper.text()).toContain(currentYear.toString());
    });

    it("maintains consistent structure", () => {
      const wrapper = mount(Footer);
      
      expect(wrapper.element.children.length).toBe(0);
      expect(wrapper.text()).toMatch(/© \d{4}\. Vristo All rights reserved\./);
    });
  });
});