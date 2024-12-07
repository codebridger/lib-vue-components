import type { Meta, StoryObj } from "@storybook/vue3";
import Input from "./Input.vue";

const meta = {
  title: "Elements/Input",
  component: Input,
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "inline-radio",
      options: [
        "text",
        "email",
        "password",
        "number",
        "tel",
        "url",
        "search",
        "range",
      ],
      description: "Input type attribute",
    },
    label: {
      control: "text",
      description: "Label of input",
    },
    placeholder: {
      control: "text",
      description: "Placeholder text",
    },
    disabled: {
      control: "boolean",
      description: "Disabled state",
    },
    required: {
      control: "boolean",
      description: "Required state",
    },
    error: {
      control: "boolean",
      description: "Error state",
    },
    errorMessage: {
      control: "text",
      description: "Error message text",
    },
  },
  args: {
    type: "text",
    placeholder: "Some Text...",
    disabled: false,
    required: false,
    error: false,
    errorMessage: "",
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithPlaceholder: Story = {
  args: {
    placeholder: "Enter your text here...",
  },
};

export const WithLabel: Story = {
  args: {
    label: "Username",
    placeholder: "Enter username",
    id: "username-input",
  },
};

export const WithError: Story = {
  args: {
    label: "Email",
    placeholder: "Enter email",
    error: true,
    errorMessage: "This field is required",
  },
};

export const Range: Story = {
  args: {
    type: "range",
    label: "Volume",
    id: "volume-input",
    modelValue: "50",
    min: 0,
    max: 100,
  },
};
