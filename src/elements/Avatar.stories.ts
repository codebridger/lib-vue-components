import type { Meta, StoryObj } from "@storybook/vue3";

import Avatar from "./Avatar.vue";

const meta = {
  title: "Elements/Avatar",
  component: Avatar,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  argTypes: {
    rounded: {
      control: "inline-radio",
      options: ["full", "none", "xs", "sm", "md", "lg", "xl"],
    },
    indicatorBackgroundColor: {
      control: "inline-radio",
      options: [
        "bg-primary",
        "bg-info",
        "bg-success",
        "bg-warning",
        "bg-danger",
        "bg-secondary",
        "bg-dark",
        "bg-gradient",
      ],
    },
  },
  args: {},
} satisfies Meta<typeof Avatar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    rounded: "full",
    indicatorBackgroundColor: "bg-danger",
  },
};
