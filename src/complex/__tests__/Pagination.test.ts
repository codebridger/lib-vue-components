import { describe, it, expect, vi } from "vitest";
import { mount, VueWrapper } from "@vue/test-utils";
import Pagination from "../Pagination.vue";
import Button from "../../elements/Button.vue";

describe("Pagination Component", () => {
  let wrapper: VueWrapper<any>;

  // Helper function to create wrapper with default props
  const createWrapper = (props = {}) => {
    return mount(Pagination, {
      props,
      global: {
        components: {
          Button,
        },
      },
    });
  };

  describe("Rendering", () => {
    it("renders pagination container", () => {
      wrapper = createWrapper();
      expect(wrapper.find("div").exists()).toBe(true);
    });

    it("renders pagination list", () => {
      wrapper = createWrapper();
      expect(wrapper.find("ul").exists()).toBe(true);
    });

    it("renders previous button", () => {
      wrapper = createWrapper();
      const buttons = wrapper.findAllComponents(Button);
      expect(buttons[0].props("label")).toBe("Prev");
    });

    it("renders next button", () => {
      wrapper = createWrapper();
      const buttons = wrapper.findAllComponents(Button);
      expect(buttons[1].props("label")).toBe("Next");
    });

    it("renders page indicator", () => {
      wrapper = createWrapper({ modelValue: 2, totalPages: 5 });
      expect(wrapper.text()).toContain("2 / 5");
    });

    it("renders three list items", () => {
      wrapper = createWrapper();
      const listItems = wrapper.findAll("li");
      expect(listItems).toHaveLength(3);
    });
  });

  describe("Props and Styling", () => {
    it("applies container classes", () => {
      wrapper = createWrapper();
      const container = wrapper.find("div");
      expect(container.classes()).toContain("flex");
      expect(container.classes()).toContain("w-full");
      expect(container.classes()).toContain("flex-col");
      expect(container.classes()).toContain("justify-center");
      expect(container.classes()).toContain("items-center");
    });

    it("applies list classes", () => {
      wrapper = createWrapper();
      const list = wrapper.find("ul");
      expect(list.classes()).toContain("m-auto");
      expect(list.classes()).toContain("mb-4");
      expect(list.classes()).toContain("inline-flex");
      expect(list.classes()).toContain("items-center");
      expect(list.classes()).toContain("space-x-4");
      expect(list.classes()).toContain("rtl:space-x-reverse");
    });

    it("applies button outline prop", () => {
      wrapper = createWrapper();
      const buttons = wrapper.findAllComponents(Button);
      buttons.forEach((button) => {
        expect(button.props("outline")).toBe(true);
      });
    });
  });

  describe("Page Navigation", () => {
    it("disables previous button on first page", () => {
      wrapper = createWrapper({ modelValue: 1, totalPages: 5 });
      const prevButton = wrapper.findAllComponents(Button)[0];
      expect(prevButton.props("disabled")).toBe(true);
      expect(prevButton.classes()).toContain("opacity-50");
      expect(prevButton.classes()).toContain("cursor-not-allowed");
    });

    it("enables previous button when not on first page", () => {
      wrapper = createWrapper({ modelValue: 2, totalPages: 5 });
      const prevButton = wrapper.findAllComponents(Button)[0];
      expect(prevButton.props("disabled")).toBe(false);
      expect(prevButton.classes()).not.toContain("opacity-50");
      expect(prevButton.classes()).not.toContain("cursor-not-allowed");
    });

    it("disables next button on last page", () => {
      wrapper = createWrapper({ modelValue: 5, totalPages: 5 });
      const nextButton = wrapper.findAllComponents(Button)[1];
      expect(nextButton.props("disabled")).toBe(true);
      expect(nextButton.classes()).toContain("opacity-50");
      expect(nextButton.classes()).toContain("cursor-not-allowed");
    });

    it("enables next button when not on last page", () => {
      wrapper = createWrapper({ modelValue: 4, totalPages: 5 });
      const nextButton = wrapper.findAllComponents(Button)[1];
      expect(nextButton.props("disabled")).toBe(false);
      expect(nextButton.classes()).not.toContain("opacity-50");
      expect(nextButton.classes()).not.toContain("cursor-not-allowed");
    });
  });

  describe("Events", () => {
    it("emits update:modelValue when previous button is clicked", async () => {
      wrapper = createWrapper({ modelValue: 3, totalPages: 5 });
      const prevButton = wrapper.findAllComponents(Button)[0];
      await prevButton.trigger("click");
      expect(wrapper.emitted("update:modelValue")?.[0]).toEqual([2]);
    });

    it("emits change-page when previous button is clicked", async () => {
      wrapper = createWrapper({ modelValue: 3, totalPages: 5 });
      const prevButton = wrapper.findAllComponents(Button)[0];
      await prevButton.trigger("click");
      expect(wrapper.emitted("change-page")?.[0]).toEqual([2]);
    });

    it("emits update:modelValue when next button is clicked", async () => {
      wrapper = createWrapper({ modelValue: 3, totalPages: 5 });
      const nextButton = wrapper.findAllComponents(Button)[1];
      await nextButton.trigger("click");
      expect(wrapper.emitted("update:modelValue")?.[0]).toEqual([4]);
    });

    it("emits change-page when next button is clicked", async () => {
      wrapper = createWrapper({ modelValue: 3, totalPages: 5 });
      const nextButton = wrapper.findAllComponents(Button)[1];
      await nextButton.trigger("click");
      expect(wrapper.emitted("change-page")?.[0]).toEqual([4]);
    });

    it("does not emit events when previous button is disabled", async () => {
      wrapper = createWrapper({ modelValue: 1, totalPages: 5 });
      const prevButton = wrapper.findAllComponents(Button)[0];
      await prevButton.trigger("click");
      expect(wrapper.emitted("update:modelValue")).toBeFalsy();
      expect(wrapper.emitted("change-page")).toBeFalsy();
    });

    it("does not emit events when next button is disabled", async () => {
      wrapper = createWrapper({ modelValue: 5, totalPages: 5 });
      const nextButton = wrapper.findAllComponents(Button)[1];
      await nextButton.trigger("click");
      expect(wrapper.emitted("update:modelValue")).toBeFalsy();
      expect(wrapper.emitted("change-page")).toBeFalsy();
    });
  });

  describe("Page Calculation", () => {
    it("calculates total pages correctly", () => {
      wrapper = createWrapper({ modelValue: 1, totalPages: 10 });
      expect(wrapper.vm.calculatedTotalPages).toBe(10);
    });

    it("returns 1 for total pages when totalPages is 1", () => {
      wrapper = createWrapper({ modelValue: 1, totalPages: 1 });
      expect(wrapper.vm.calculatedTotalPages).toBe(1);
    });

    it("returns 1 for total pages when totalPages is less than 1", () => {
      wrapper = createWrapper({ modelValue: 1, totalPages: 0 });
      expect(wrapper.vm.calculatedTotalPages).toBe(1);
    });

    it("displays correct page indicator", () => {
      wrapper = createWrapper({ modelValue: 3, totalPages: 7 });
      expect(wrapper.text()).toContain("3 / 7");
    });
  });

  describe("Navigation Logic", () => {
    it("decrements page when previous is clicked", async () => {
      wrapper = createWrapper({ modelValue: 5, totalPages: 10 });
      const prevButton = wrapper.findAllComponents(Button)[0];
      await prevButton.trigger("click");
      expect(wrapper.emitted("update:modelValue")?.[0]).toEqual([4]);
    });

    it("increments page when next is clicked", async () => {
      wrapper = createWrapper({ modelValue: 3, totalPages: 10 });
      const nextButton = wrapper.findAllComponents(Button)[1];
      await nextButton.trigger("click");
      expect(wrapper.emitted("update:modelValue")?.[0]).toEqual([4]);
    });

    it("prevents navigation below page 1", async () => {
      wrapper = createWrapper({ modelValue: 1, totalPages: 5 });
      const prevButton = wrapper.findAllComponents(Button)[0];
      await prevButton.trigger("click");
      expect(wrapper.emitted("update:modelValue")).toBeFalsy();
    });

    it("prevents navigation above total pages", async () => {
      wrapper = createWrapper({ modelValue: 5, totalPages: 5 });
      const nextButton = wrapper.findAllComponents(Button)[1];
      await nextButton.trigger("click");
      expect(wrapper.emitted("update:modelValue")).toBeFalsy();
    });
  });

  describe("Accessibility", () => {
    it("has proper button labels", () => {
      wrapper = createWrapper();
      const buttons = wrapper.findAllComponents(Button);
      expect(buttons[0].props("label")).toBe("Prev");
      expect(buttons[1].props("label")).toBe("Next");
    });

    it("has proper disabled states", () => {
      wrapper = createWrapper({ modelValue: 1, totalPages: 1 });
      const buttons = wrapper.findAllComponents(Button);
      expect(buttons[0].props("disabled")).toBe(true);
      expect(buttons[1].props("disabled")).toBe(true);
    });
  });

  describe("RTL Support", () => {
    it("applies RTL spacing classes", () => {
      wrapper = createWrapper();
      const list = wrapper.find("ul");
      expect(list.classes()).toContain("rtl:space-x-reverse");
    });
  });

  describe("Edge Cases", () => {
    it("handles single page", () => {
      wrapper = createWrapper({ modelValue: 1, totalPages: 1 });
      expect(wrapper.text()).toContain("1 / 1");
      const buttons = wrapper.findAllComponents(Button);
      expect(buttons[0].props("disabled")).toBe(true);
      expect(buttons[1].props("disabled")).toBe(true);
    });

    it("handles zero total pages", () => {
      wrapper = createWrapper({ modelValue: 1, totalPages: 0 });
      expect(wrapper.text()).toContain("1 / 1");
    });

    it("handles negative total pages", () => {
      wrapper = createWrapper({ modelValue: 1, totalPages: -5 });
      expect(wrapper.text()).toContain("1 / 1");
    });

    it("handles undefined props gracefully", () => {
      wrapper = createWrapper({});
      expect(wrapper.find("ul").exists()).toBe(true);
    });

    it("handles modelValue greater than totalPages", () => {
      wrapper = createWrapper({ modelValue: 10, totalPages: 5 });
      expect(wrapper.text()).toContain("10 / 5");
      const nextButton = wrapper.findAllComponents(Button)[1];
      expect(nextButton.props("disabled")).toBe(true);
    });
  });

  describe("Default Values", () => {
    it("uses correct default values", () => {
      wrapper = createWrapper();
      expect(wrapper.props("modelValue")).toBe(1);
      expect(wrapper.props("totalPages")).toBe(1);
    });
  });

  describe("Computed Properties", () => {
    it("calculates total pages correctly for different values", () => {
      const testCases = [
        { totalPages: 1, expected: 1 },
        { totalPages: 5, expected: 5 },
        { totalPages: 0, expected: 1 },
        { totalPages: -1, expected: 1 },
      ];

      testCases.forEach(({ totalPages, expected }) => {
        wrapper = createWrapper({ totalPages });
        expect(wrapper.vm.calculatedTotalPages).toBe(expected);
      });
    });
  });

  describe("Event Handling", () => {
    it("handles previous click correctly", async () => {
      wrapper = createWrapper({ modelValue: 3, totalPages: 5 });
      await wrapper.vm.handlePrevClick();
      expect(wrapper.emitted("update:modelValue")?.[0]).toEqual([2]);
      expect(wrapper.emitted("change-page")?.[0]).toEqual([2]);
    });

    it("handles next click correctly", async () => {
      wrapper = createWrapper({ modelValue: 3, totalPages: 5 });
      await wrapper.vm.handleNextClick();
      expect(wrapper.emitted("update:modelValue")?.[0]).toEqual([4]);
      expect(wrapper.emitted("change-page")?.[0]).toEqual([4]);
    });

    it("prevents previous click when on first page", async () => {
      wrapper = createWrapper({ modelValue: 1, totalPages: 5 });
      await wrapper.vm.handlePrevClick();
      expect(wrapper.emitted("update:modelValue")).toBeFalsy();
      expect(wrapper.emitted("change-page")).toBeFalsy();
    });

    it("prevents next click when on last page", async () => {
      wrapper = createWrapper({ modelValue: 5, totalPages: 5 });
      await wrapper.vm.handleNextClick();
      expect(wrapper.emitted("update:modelValue")).toBeFalsy();
      expect(wrapper.emitted("change-page")).toBeFalsy();
    });
  });

  describe("Component Integration", () => {
    it("integrates with Button component correctly", () => {
      wrapper = createWrapper({ modelValue: 2, totalPages: 5 });
      const buttons = wrapper.findAllComponents(Button);
      expect(buttons).toHaveLength(2);
      
      // Check button props
      buttons.forEach((button) => {
        expect(button.props("outline")).toBe(true);
        expect(typeof button.props("label")).toBe("string");
        expect(typeof button.props("disabled")).toBe("boolean");
      });
    });
  });
});