import type { Meta, StoryObj } from "@storybook/vue3";

import AvatarGroup from "./AvatarGroup.vue";

const meta = {
  title: "Elements/AvatarGroup",
  component: AvatarGroup,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  argTypes: {
    rounded: {
      control: "inline-radio",
      options: ["full", "none", "xs", "sm", "md", "lg", "xl"],
    },
  },
  args: {},
} satisfies Meta<typeof AvatarGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    rounded: "full",
  },
};
