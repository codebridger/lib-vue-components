import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import Pagination from "../Pagination.vue";

describe("Pagination Component", () => {
  const createWrapper = (props = {}) => {
    const defaultProps = {
      modelValue: 1,
      totalPages: 5,
      ...props,
    };
    return mount(Pagination, { props: defaultProps });
  };

  describe("Rendering", () => {
    it("renders as div element by default", () => {
      const wrapper = createWrapper();
      expect(wrapper.find("div").exists()).toBe(true);
    });

    it("renders with default classes", () => {
      const wrapper = createWrapper();
      expect(wrapper.classes()).toContain("flex");
      expect(wrapper.classes()).toContain("w-full");
      expect(wrapper.classes()).toContain("flex-col");
      expect(wrapper.classes()).toContain("justify-center");
      expect(wrapper.classes()).toContain("items-center");
    });

    it("renders with custom class", () => {
      const wrapper = createWrapper({ class: "custom-pagination" });
      expect(wrapper.classes()).toContain("custom-pagination");
    });

    it("renders ul element with correct classes", () => {
      const wrapper = createWrapper();
      const ul = wrapper.find("ul");
      expect(ul.exists()).toBe(true);
      expect(ul.classes()).toContain("m-auto");
      expect(ul.classes()).toContain("mb-4");
      expect(ul.classes()).toContain("inline-flex");
      expect(ul.classes()).toContain("items-center");
      expect(ul.classes()).toContain("space-x-4");
    });
  });

  describe("Props and Styling", () => {
    it("displays current page and total pages", () => {
      const wrapper = createWrapper({ modelValue: 3, totalPages: 10 });
      expect(wrapper.text()).toContain("3 / 10");
    });

    it("handles single page", () => {
      const wrapper = createWrapper({ modelValue: 1, totalPages: 1 });
      expect(wrapper.text()).toContain("1 / 1");
    });

    it("handles large page numbers", () => {
      const wrapper = createWrapper({ modelValue: 100, totalPages: 500 });
      expect(wrapper.text()).toContain("100 / 500");
    });

    it("handles zero total pages", () => {
      const wrapper = createWrapper({ modelValue: 1, totalPages: 0 });
      expect(wrapper.text()).toContain("1 / 1");
    });

    it("handles negative total pages", () => {
      const wrapper = createWrapper({ modelValue: 1, totalPages: -5 });
      expect(wrapper.text()).toContain("1 / 1");
    });
  });

  describe("Previous Button", () => {
    it("renders previous button", () => {
      const wrapper = createWrapper();
      const buttons = wrapper.findAll("button");
      expect(buttons.length).toBeGreaterThan(0);
      expect(wrapper.text()).toContain("Prev");
    });

    it("disables previous button on first page", () => {
      const wrapper = createWrapper({ modelValue: 1, totalPages: 5 });
      const prevButton = wrapper.findAll("button")[0];
      expect(prevButton.attributes("disabled")).toBeDefined();
      expect(prevButton.classes()).toContain("opacity-50");
      expect(prevButton.classes()).toContain("cursor-not-allowed");
    });

    it("enables previous button on other pages", () => {
      const wrapper = createWrapper({ modelValue: 3, totalPages: 5 });
      const prevButton = wrapper.findAll("button")[0];
      expect(prevButton.attributes("disabled")).toBeUndefined();
      expect(prevButton.classes()).not.toContain("opacity-50");
      expect(prevButton.classes()).not.toContain("cursor-not-allowed");
    });

    it("emits update:modelValue when previous button is clicked", async () => {
      const wrapper = createWrapper({ modelValue: 3, totalPages: 5 });
      const prevButton = wrapper.findAll("button")[0];

      await prevButton.trigger("click");

      expect(wrapper.emitted("update:modelValue")).toBeTruthy();
      expect(wrapper.emitted("update:modelValue")[0]).toEqual([2]);
    });

    it("emits change-page when previous button is clicked", async () => {
      const wrapper = createWrapper({ modelValue: 3, totalPages: 5 });
      const prevButton = wrapper.findAll("button")[0];

      await prevButton.trigger("click");

      expect(wrapper.emitted("change-page")).toBeTruthy();
      expect(wrapper.emitted("change-page")[0]).toEqual([2]);
    });

    it("does not emit events when previous button is disabled", async () => {
      const wrapper = createWrapper({ modelValue: 1, totalPages: 5 });
      const prevButton = wrapper.findAll("button")[0];

      await prevButton.trigger("click");

      expect(wrapper.emitted("update:modelValue")).toBeFalsy();
      expect(wrapper.emitted("change-page")).toBeFalsy();
    });
  });

  describe("Next Button", () => {
    it("renders next button", () => {
      const wrapper = createWrapper();
      const buttons = wrapper.findAll("button");
      expect(buttons.length).toBeGreaterThan(0);
      expect(wrapper.text()).toContain("Next");
    });

    it("disables next button on last page", () => {
      const wrapper = createWrapper({ modelValue: 5, totalPages: 5 });
      const nextButton = wrapper.findAll("button")[1];
      expect(nextButton.attributes("disabled")).toBeDefined();
      expect(nextButton.classes()).toContain("opacity-50");
      expect(nextButton.classes()).toContain("cursor-not-allowed");
    });

    it("enables next button on other pages", () => {
      const wrapper = createWrapper({ modelValue: 3, totalPages: 5 });
      const nextButton = wrapper.findAll("button")[1];
      expect(nextButton.attributes("disabled")).toBeUndefined();
      expect(nextButton.classes()).not.toContain("opacity-50");
      expect(nextButton.classes()).not.toContain("cursor-not-allowed");
    });

    it("emits update:modelValue when next button is clicked", async () => {
      const wrapper = createWrapper({ modelValue: 3, totalPages: 5 });
      const nextButton = wrapper.findAll("button")[1];

      await nextButton.trigger("click");

      expect(wrapper.emitted("update:modelValue")).toBeTruthy();
      expect(wrapper.emitted("update:modelValue")[0]).toEqual([4]);
    });

    it("emits change-page when next button is clicked", async () => {
      const wrapper = createWrapper({ modelValue: 3, totalPages: 5 });
      const nextButton = wrapper.findAll("button")[1];

      await nextButton.trigger("click");

      expect(wrapper.emitted("change-page")).toBeTruthy();
      expect(wrapper.emitted("change-page")[0]).toEqual([4]);
    });

    it("does not emit events when next button is disabled", async () => {
      const wrapper = createWrapper({ modelValue: 5, totalPages: 5 });
      const nextButton = wrapper.findAll("button")[1];

      await nextButton.trigger("click");

      expect(wrapper.emitted("update:modelValue")).toBeFalsy();
      expect(wrapper.emitted("change-page")).toBeFalsy();
    });
  });

  describe("Page Navigation", () => {
    it("navigates through pages correctly", async () => {
      const wrapper = createWrapper({ modelValue: 1, totalPages: 3 });

      // Go to next page
      const nextButton = wrapper.findAll("button")[1];
      await nextButton.trigger("click");
      expect(wrapper.emitted("update:modelValue")[0]).toEqual([2]);

      // Reset wrapper for next test
      const wrapper2 = createWrapper({ modelValue: 2, totalPages: 3 });
      
      // Go to previous page
      const prevButton = wrapper2.findAll("button")[0];
      await prevButton.trigger("click");
      expect(wrapper2.emitted("update:modelValue")[0]).toEqual([1]);
    });

    it("handles edge case of single page", async () => {
      const wrapper = createWrapper({ modelValue: 1, totalPages: 1 });

      const prevButton = wrapper.findAll("button")[0];
      const nextButton = wrapper.findAll("button")[1];

      await prevButton.trigger("click");
      await nextButton.trigger("click");

      expect(wrapper.emitted("update:modelValue")).toBeFalsy();
      expect(wrapper.emitted("change-page")).toBeFalsy();
    });

    it("handles edge case of two pages", async () => {
      const wrapper = createWrapper({ modelValue: 1, totalPages: 2 });

      // Can go to next page
      const nextButton = wrapper.findAll("button")[1];
      await nextButton.trigger("click");
      expect(wrapper.emitted("update:modelValue")[0]).toEqual([2]);

      // Cannot go to previous page from first page
      const prevButton = wrapper.findAll("button")[0];
      await prevButton.trigger("click");
      expect(wrapper.emitted("update:modelValue")).toHaveLength(1);
    });
  });

  describe("Computed Properties", () => {
    it("calculates total pages correctly", () => {
      const wrapper = createWrapper({ totalPages: 10 });
      expect(wrapper.text()).toContain("1 / 10");
    });

    it("handles total pages less than 1", () => {
      const wrapper = createWrapper({ totalPages: 0 });
      expect(wrapper.text()).toContain("1 / 1");
    });

    it("handles total pages equal to 1", () => {
      const wrapper = createWrapper({ totalPages: 1 });
      expect(wrapper.text()).toContain("1 / 1");
    });

    it("handles total pages greater than 1", () => {
      const wrapper = createWrapper({ totalPages: 5 });
      expect(wrapper.text()).toContain("1 / 5");
    });
  });

  describe("Edge Cases", () => {
    it("handles undefined modelValue", () => {
      const wrapper = createWrapper({ modelValue: undefined });
      expect(wrapper.text()).toContain("1 / 5");
    });

    it("handles undefined totalPages", () => {
      const wrapper = createWrapper({ totalPages: undefined });
      expect(wrapper.text()).toContain("1 / 1");
    });

    it("handles negative modelValue", () => {
      const wrapper = createWrapper({ modelValue: -1, totalPages: 5 });
      expect(wrapper.text()).toContain("-1 / 5");
    });

    it("handles modelValue greater than totalPages", () => {
      const wrapper = createWrapper({ modelValue: 10, totalPages: 5 });
      expect(wrapper.text()).toContain("10 / 5");
    });

    it("handles very large numbers", () => {
      const wrapper = createWrapper({ modelValue: 999999, totalPages: 1000000 });
      expect(wrapper.text()).toContain("999999 / 1000000");
    });
  });

  describe("Accessibility", () => {
    it("supports aria-label", () => {
      const wrapper = createWrapper({ "aria-label": "Pagination navigation" });
      expect(wrapper.attributes("aria-label")).toBe("Pagination navigation");
    });

    it("supports role attribute", () => {
      const wrapper = createWrapper({ role: "navigation" });
      expect(wrapper.attributes("role")).toBe("navigation");
    });

    it("supports tabindex", () => {
      const wrapper = createWrapper({ tabindex: "0" });
      expect(wrapper.attributes("tabindex")).toBe("0");
    });
  });
});