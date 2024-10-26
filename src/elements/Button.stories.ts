import type { Meta, StoryObj } from "@storybook/vue3";

import Button from "./Button.vue";

const meta = {
  title: "Elements/Button",
  component: Button,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  argTypes: {
    color: {
      control: "inline-radio",
      options: [
        "primary",
        "info",
        "success",
        "warning",
        "danger",
        "secondary",
        "dark",
        "gradient",
      ],
    },
    size: { control: "inline-radio", options: ["", "xs", "sm", "md", "lg"] },
    textTransform: {
      control: "inline-radio",
      options: ["normal-case", "capitalize", "lowercase", "uppercase"],
    },

    rounded: {
      control: "inline-radio",
      options: ["full", "none", "xs", "sm", "md", "lg", "xl"],
    },
    block: { control: "boolean" },
    outline: { control: "boolean" },
    shadow: { control: "boolean" },
  },
  args: {
    block: false,
    outline: false,
    shadow: false,
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Button",
    textTransform: "normal-case",
  },
};

export const Rounded: Story = {
  args: {
    label: "Button",
    color: "info",
    textTransform: "uppercase",
    rounded: "lg",
  },
};

export const Outline: Story = {
  args: {
    label: "Button",
    color: "success",
    textTransform: "capitalize",
    outline: true,
  },
};

export const Size: Story = {
  args: {
    label: "Button",
    color: "warning",
    textTransform: "capitalize",
    size: "lg",
    block: true,
  },
};

export const Shadow: Story = {
  args: {
    label: "Button",
    color: "secondary",
    textTransform: "capitalize",
    size: "lg",
    shadow: true,
  },
};
