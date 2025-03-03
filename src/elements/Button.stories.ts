import type { Meta, StoryObj } from "@storybook/vue3";
import { h } from "vue";
import Button from "./Button.vue";
import Icon from "../icon/Icon.vue";

const meta = {
  title: "Elements/Button",
  component: Button,
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
    size: { control: "inline-radio", options: ["xs", "sm", "md", "lg"] },
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
    borderType: {
      control: "inline-radio",
      options: ["solid", "dashed", "dotted"],
    },
    isLoading: { control: "boolean" },
    loadingIcon: {
      control: "text",
    },
    to: {
      control: "text",
      description: "URL path for link functionality",
    },
    iconName: {
      control: "text",
      description: "Icon name to display",
    },
    iconClass: {
      control: "text",
      description: "Additional classes for the icon",
    },
  },
  args: {
    block: false,
    outline: false,
    shadow: false,
    isLoading: false,
    borderType: "solid",
    loadingIcon: "IconLoader",
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

export const Loading: Story = {
  args: {
    label: "Button",
    color: "success",
    textTransform: "capitalize",
    outline: true,
    isLoading: true,
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

export const AsLink: Story = {
  args: {
    label: "Go to Dashboard",
    color: "primary",
    textTransform: "capitalize",
    size: "md",
    to: "/dashboard",
  },
};

export const WithIcon: Story = {
  args: {
    label: "Settings",
    color: "primary",
    iconName: "IconSettings",
    size: "md",
  },
};

export const Disabled: Story = {
  args: {
    label: "Disabled",
    color: "primary",
    size: "md",
    disabled: true,
    to: "/dashboard",
  },
};
