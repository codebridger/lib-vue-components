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
      control: "select",
      options: [
        "default",
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
    size: { control: "select", options: ["xs", "sm", "md", "lg"] },
    textTransform: {
      control: "select",
      options: ["normal-case", "capitalize", "lowercase", "uppercase"],
    },
    rounded: {
      control: "select",
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

export const GradientBorders: Story = {
  render: () => ({
    components: { Button },
    template: `
      <div class="space-y-4">
        <div class="space-x-4">
          <Button color="gradient" outline>Default Solid</Button>
          <Button color="gradient" outline border-type="dashed">Dashed</Button>
          <Button color="gradient" outline border-type="dotted">Dotted</Button>
        </div>
        <div class="space-x-4">
          <Button color="gradient" outline size="sm">Small</Button>
          <Button color="gradient" outline size="md">Medium</Button>
          <Button color="gradient" outline size="lg">Large</Button>
        </div>
        <div class="space-x-4">
          <Button color="gradient" outline rounded="none">No Radius</Button>
          <Button color="gradient" outline rounded="md">Medium Radius</Button>
          <Button color="gradient" outline rounded="full">Full Radius</Button>
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story:
          "Testing gradient border functionality with different border types, sizes, and border radius values.",
      },
    },
  },
};
