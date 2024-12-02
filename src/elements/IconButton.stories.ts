import type { Meta, StoryObj } from "@storybook/vue3";

import IconButton from "./IconButton.vue";

const meta = {
  title: "Elements/IconButton",
  component: IconButton,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  argTypes: {
    rounded: {
      control: "inline-radio",
      options: ["full", "none", "xs", "sm", "md", "lg", "xl"],
    },
    size: {
      control: "inline-radio",
      options: ["xs", "sm", "md", "lg", "xl"],
    },
    icon: {
      control: "text",
    },
  },
  args: {
    size: "sm",
  },
} satisfies Meta<typeof IconButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    rounded: "full",
    icon: "IconSun",
  },
};

import userProfilePicUrl from "../../public/assets/images/user-profile.jpeg";
export const WithImages: Story = {
  args: {
    rounded: "none",
    imgUrl: userProfilePicUrl,
  },
};
