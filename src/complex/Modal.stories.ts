import type { Meta, StoryObj } from "@storybook/vue3";

import CustomModal from "./Modal.vue";

const meta = {
  title: "Complex/Modal",
  component: CustomModal,
  tags: ["autodocs"],
  parameters: {
    code: { type: "source" },
    layout: "centered",
  },
  argTypes: {
    modelValue: { control: "boolean" },
    title: { control: "text" },
    triggerLabel: { control: "text" },
    size: {
      control: "inline-radio",
      options: ["sm", "md", "lg", "xl", "full"],
    },
    animation: {
      control: "inline-radio",
      options: [
        "fade",
        "slideDown",
        "slideUp",
        "fadeLeft",
        "fadeRight",
        "rotateLeft",
        "zoomIn",
        "none",
      ],
    },
    hideClose: { control: "boolean" },
    persistent: { control: "boolean" },
    preventClose: { control: "boolean" },
    contentClass: { control: "text" },
  },
  args: {
    modelValue: false,
    title: "Modal Title",
    triggerLabel: "Open Modal",
    size: "md",
    animation: "fade",
    hideClose: false,
    persistent: false,
    preventClose: false,
    contentClass: "",
  },
} satisfies Meta<typeof CustomModal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    modelValue: false,
  },
};

export const WithTitle: Story = {
  args: {
    modelValue: false,
    title: "Custom Modal Title",
  },
};

export const Persistent: Story = {
  args: {
    modelValue: false,
    persistent: true,
  },
};

export const CustomSize: Story = {
  args: {
    modelValue: false,
    size: "lg",
  },
};

export const CustomAnimation: Story = {
  args: {
    modelValue: false,
    animation: "zoomIn",
  },
};
