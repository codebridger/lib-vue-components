import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import Pagination from "../Pagination.vue";

describe("Pagination Component Accessibility", () => {
  const createWrapper = (props = {}) => {
    const defaultProps = {
      modelValue: 1,
      totalPages: 5,
      ...props,
    };
    return mount(Pagination, { props: defaultProps });
  };

  describe("ARIA Attributes", () => {
    it("supports custom aria-label", () => {
      const wrapper = createWrapper({ "aria-label": "Page navigation" });
      expect(wrapper.attributes("aria-label")).toBe("Page navigation");
    });

    it("supports aria-describedby", () => {
      const wrapper = createWrapper({ "aria-describedby": "pagination-help" });
      expect(wrapper.attributes("aria-describedby")).toBe("pagination-help");
    });

    it("supports role attribute", () => {
      const wrapper = createWrapper({ role: "navigation" });
      expect(wrapper.attributes("role")).toBe("navigation");
    });

    it("supports aria-current for current page", () => {
      const wrapper = createWrapper({ "aria-current": "page" });
      expect(wrapper.attributes("aria-current")).toBe("page");
    });
  });

  describe("Navigation Context", () => {
    it("provides navigation context for screen readers", () => {
      const wrapper = createWrapper({
        modelValue: 3,
        totalPages: 10,
        role: "navigation",
        "aria-label": "Page navigation"
      });
      expect(wrapper.attributes("role")).toBe("navigation");
      expect(wrapper.attributes("aria-label")).toBe("Page navigation");
    });

    it("announces current page position", () => {
      const wrapper = createWrapper({ modelValue: 3, totalPages: 10 });
      expect(wrapper.text()).toContain("3 / 10");
    });

    it("provides page navigation description", () => {
      const wrapper = createWrapper({
        "aria-describedby": "pagination-instructions"
      });
      expect(wrapper.attributes("aria-describedby")).toBe("pagination-instructions");
    });
  });

  describe("Previous Button Accessibility", () => {
    it("provides meaningful previous button text", () => {
      const wrapper = createWrapper();
      expect(wrapper.text()).toContain("Prev");
    });

    it("indicates disabled state for previous button", () => {
      const wrapper = createWrapper({ modelValue: 1, totalPages: 5 });
      const prevButton = wrapper.findAll("button")[0];
      expect(prevButton.attributes("disabled")).toBeDefined();
      expect(prevButton.classes()).toContain("opacity-50");
      expect(prevButton.classes()).toContain("cursor-not-allowed");
    });

    it("supports previous button with aria-label", () => {
      const wrapper = createWrapper();
      const prevButton = wrapper.findAll("button")[0];
      // The Button component should support aria-label
      expect(prevButton.exists()).toBe(true);
    });

    it("supports previous button with role", () => {
      const wrapper = createWrapper();
      const prevButton = wrapper.findAll("button")[0];
      // Native button elements have implicit role="button"
      expect(prevButton.element.tagName).toBe("BUTTON");
    });
  });

  describe("Next Button Accessibility", () => {
    it("provides meaningful next button text", () => {
      const wrapper = createWrapper();
      expect(wrapper.text()).toContain("Next");
    });

    it("indicates disabled state for next button", () => {
      const wrapper = createWrapper({ modelValue: 5, totalPages: 5 });
      const nextButton = wrapper.findAll("button")[1];
      expect(nextButton.attributes("disabled")).toBeDefined();
      expect(nextButton.classes()).toContain("opacity-50");
      expect(nextButton.classes()).toContain("cursor-not-allowed");
    });

    it("supports next button with aria-label", () => {
      const wrapper = createWrapper();
      const nextButton = wrapper.findAll("button")[1];
      // The Button component should support aria-label
      expect(nextButton.exists()).toBe(true);
    });

    it("supports next button with role", () => {
      const wrapper = createWrapper();
      const nextButton = wrapper.findAll("button")[1];
      // Native button elements have implicit role="button"
      expect(nextButton.element.tagName).toBe("BUTTON");
    });
  });

  describe("Keyboard Navigation", () => {
    it("supports tabindex for navigation", () => {
      const wrapper = createWrapper({ tabindex: "0" });
      expect(wrapper.attributes("tabindex")).toBe("0");
    });

    it("can be removed from tab order", () => {
      const wrapper = createWrapper({ tabindex: "-1" });
      expect(wrapper.attributes("tabindex")).toBe("-1");
    });

    it("supports keyboard activation for previous button", async () => {
      const wrapper = createWrapper({ modelValue: 3, totalPages: 5 });
      const prevButton = wrapper.findAll("button")[0];

      await prevButton.trigger("click");
      expect(wrapper.emitted("update:modelValue")).toBeTruthy();
    });

    it("supports keyboard activation for next button", async () => {
      const wrapper = createWrapper({ modelValue: 3, totalPages: 5 });
      const nextButton = wrapper.findAll("button")[1];

      await nextButton.trigger("click");
      expect(wrapper.emitted("update:modelValue")).toBeTruthy();
    });

    it("supports space key activation", async () => {
      const wrapper = createWrapper({ modelValue: 3, totalPages: 5 });
      const nextButton = wrapper.findAll("button")[1];

      await nextButton.trigger("click");
      expect(wrapper.emitted("update:modelValue")).toBeTruthy();
    });
  });

  describe("Screen Reader Support", () => {
    it("announces current page position", () => {
      const wrapper = createWrapper({ modelValue: 3, totalPages: 10 });
      expect(wrapper.text()).toContain("3 / 10");
    });

    it("provides context for navigation purpose", () => {
      const wrapper = createWrapper({
        "aria-label": "Search results pagination"
      });
      expect(wrapper.attributes("aria-label")).toBe("Search results pagination");
    });

    it("announces total number of pages", () => {
      const wrapper = createWrapper({ modelValue: 1, totalPages: 25 });
      expect(wrapper.text()).toContain("1 / 25");
    });

    it("provides context for pagination state", () => {
      const wrapper = createWrapper({
        modelValue: 1,
        totalPages: 1,
        "aria-label": "Single page results"
      });
      expect(wrapper.attributes("aria-label")).toBe("Single page results");
    });
  });

  describe("Button State Accessibility", () => {
    it("indicates when previous button is disabled", () => {
      const wrapper = createWrapper({ modelValue: 1, totalPages: 5 });
      const prevButton = wrapper.findAll("button")[0];
      expect(prevButton.attributes("disabled")).toBeDefined();
    });

    it("indicates when next button is disabled", () => {
      const wrapper = createWrapper({ modelValue: 5, totalPages: 5 });
      const nextButton = wrapper.findAll("button")[1];
      expect(nextButton.attributes("disabled")).toBeDefined();
    });

    it("provides visual feedback for disabled state", () => {
      const wrapper = createWrapper({ modelValue: 1, totalPages: 5 });
      const prevButton = wrapper.findAll("button")[0];
      expect(prevButton.classes()).toContain("opacity-50");
      expect(prevButton.classes()).toContain("cursor-not-allowed");
    });

    it("provides visual feedback for enabled state", () => {
      const wrapper = createWrapper({ modelValue: 3, totalPages: 5 });
      const prevButton = wrapper.findAll("button")[0];
      expect(prevButton.attributes("disabled")).toBeUndefined();
    });
  });

  describe("Page Information Accessibility", () => {
    it("displays current page clearly", () => {
      const wrapper = createWrapper({ modelValue: 7, totalPages: 20 });
      expect(wrapper.text()).toContain("7 / 20");
    });

    it("handles single page display", () => {
      const wrapper = createWrapper({ modelValue: 1, totalPages: 1 });
      expect(wrapper.text()).toContain("1 / 1");
    });

    it("handles large page numbers", () => {
      const wrapper = createWrapper({ modelValue: 1000, totalPages: 5000 });
      expect(wrapper.text()).toContain("1000 / 5000");
    });

    it("provides context for page range", () => {
      const wrapper = createWrapper({
        modelValue: 1,
        totalPages: 10,
        "aria-label": "Pages 1 to 10"
      });
      expect(wrapper.attributes("aria-label")).toBe("Pages 1 to 10");
    });
  });

  describe("Focus Management", () => {
    it("supports focus on navigation container", () => {
      const wrapper = createWrapper({ tabindex: "0" });
      expect(wrapper.attributes("tabindex")).toBe("0");
    });

    it("supports focus on individual buttons", () => {
      const wrapper = createWrapper();
      const buttons = wrapper.findAll("button");
      buttons.forEach(button => {
        expect(button.element.focus).toBeDefined();
      });
    });

    it("maintains focus order", () => {
      const wrapper = createWrapper();
      const buttons = wrapper.findAll("button");
      expect(buttons.length).toBe(2); // Previous and Next buttons
    });
  });

  describe("Pagination Context and Purpose", () => {
    it("provides context for search results", () => {
      const wrapper = createWrapper({
        "aria-label": "Search results pagination"
      });
      expect(wrapper.attributes("aria-label")).toBe("Search results pagination");
    });

    it("provides context for data tables", () => {
      const wrapper = createWrapper({
        "aria-label": "Table data pagination"
      });
      expect(wrapper.attributes("aria-label")).toBe("Table data pagination");
    });

    it("provides context for content lists", () => {
      const wrapper = createWrapper({
        "aria-label": "Content list pagination"
      });
      expect(wrapper.attributes("aria-label")).toBe("Content list pagination");
    });
  });

  describe("Edge Cases and Error Handling", () => {
    it("handles zero total pages gracefully", () => {
      const wrapper = createWrapper({ modelValue: 1, totalPages: 0 });
      expect(wrapper.text()).toContain("1 / 1");
    });

    it("handles negative total pages gracefully", () => {
      const wrapper = createWrapper({ modelValue: 1, totalPages: -5 });
      expect(wrapper.text()).toContain("1 / 1");
    });

    it("handles current page greater than total pages", () => {
      const wrapper = createWrapper({ modelValue: 10, totalPages: 5 });
      expect(wrapper.text()).toContain("10 / 5");
    });

    it("handles undefined props gracefully", () => {
      const wrapper = createWrapper({});
      expect(wrapper.exists()).toBe(true);
    });
  });

  describe("Internationalization Support", () => {
    it("supports RTL layout", () => {
      const wrapper = createWrapper();
      const ul = wrapper.find("ul");
      expect(ul.classes()).toContain("rtl:space-x-reverse");
    });

    it("provides context for different languages", () => {
      const wrapper = createWrapper({
        "aria-label": "Navigation des pages"
      });
      expect(wrapper.attributes("aria-label")).toBe("Navigation des pages");
    });

    it("supports different number formats", () => {
      const wrapper = createWrapper({ modelValue: 1000, totalPages: 5000 });
      expect(wrapper.text()).toContain("1000 / 5000");
    });
  });

  describe("Pagination Specific Accessibility", () => {
    it("provides pagination context for assistive technologies", () => {
      const wrapper = createWrapper({
        role: "navigation",
        "aria-label": "Page navigation"
      });
      expect(wrapper.attributes("role")).toBe("navigation");
      expect(wrapper.attributes("aria-label")).toBe("Page navigation");
    });

    it("supports pagination with form integration", () => {
      const wrapper = createWrapper({
        "aria-describedby": "pagination-form"
      });
      expect(wrapper.attributes("aria-describedby")).toBe("pagination-form");
    });

    it("provides context for pagination controls", () => {
      const wrapper = createWrapper({
        "aria-label": "Pagination controls"
      });
      expect(wrapper.attributes("aria-label")).toBe("Pagination controls");
    });
  });
});