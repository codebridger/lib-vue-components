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
    isLoading: {
      control: "boolean",
      description: "Shows a loading spinner when true",
    },
    loadingIcon: {
      control: "select",
      options: ["IconLoader", "IconRefresh", "IconRestore"],
      description: "Icon to show when loading",
    },
    disabled: {
      control: "boolean",
      description: "Disables the button",
    },
  },
  args: {
    size: "sm",
    isLoading: false,
    loadingIcon: "IconLoader",
    disabled: false,
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

export const Loading: Story = {
  args: {
    rounded: "full",
    icon: "IconSun",
    isLoading: true,
    size: "md",
  },
};

export const LoadingWithCustomIcon: Story = {
  args: {
    rounded: "full",
    icon: "IconSun",
    isLoading: true,
    loadingIcon: "IconRefresh",
    size: "lg",
  },
};

import userProfilePicUrl from "../../public/assets/images/user-profile.jpeg";
export const WithImages: Story = {
  args: {
    rounded: "full",
    size: "xl",
    imgUrl: userProfilePicUrl,
  },
};

export const Disabled: Story = {
  args: {
    rounded: "full",
    icon: "IconSun",
    disabled: true,
    size: "md",
  },
};
