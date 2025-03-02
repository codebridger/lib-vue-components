import type { Meta, StoryObj } from "@storybook/vue3";
import TextArea from "./TextArea.vue";

const meta = {
  title: "Elements/TextArea",
  component: TextArea,
  tags: ["autodocs"],
  argTypes: {
    modelValue: {
      control: "text",
      description: "The value of the textarea",
    },
    rows: {
      control: "number",
      description: "Number of rows to display",
    },
    placeholder: {
      control: "text",
      description: "Placeholder text",
    },
    required: {
      control: "boolean",
      description: "Whether the textarea is required",
    },
    disabled: {
      control: "boolean",
      description: "Whether the textarea is disabled",
    },
    error: {
      control: "boolean",
      description: "Whether the textarea is in error state",
    },
    errorMsg: {
      control: "text",
      description: "Error message to display",
    },
    label: {
      control: "text",
      description: "Label text for the textarea",
    },
    id: {
      control: "text",
      description: "ID for the textarea (used to associate label)",
    },
  },
  args: {
    rows: 2,
    placeholder: "Enter Textarea ... ",
    required: false,
    disabled: false,
    error: false,
    errorMsg: "",
  },
} satisfies Meta<typeof TextArea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    modelValue: "",
    rows: 3,
    placeholder: "Enter Textarea",
    required: false,
    disabled: false,
    error: false,
    errorMsg: "",
  },
};

export const Filled: Story = {
  args: {
    modelValue: "This is a sample text in the textarea",
    rows: 3,
    placeholder: "Enter Textarea",
    required: false,
    disabled: false,
    error: false,
    errorMsg: "",
  },
};

export const WithLabel: Story = {
  args: {
    modelValue: "",
    rows: 3,
    placeholder: "Enter your comments",
    required: false,
    disabled: false,
    error: false,
    errorMsg: "",
    label: "Comments",
  },
};

export const Required: Story = {
  args: {
    modelValue: "",
    rows: 3,
    placeholder: "Required textarea",
    required: true,
    disabled: false,
    error: false,
    errorMsg: "",
  },
};

export const Disabled: Story = {
  args: {
    modelValue: "This textarea is disabled",
    rows: 3,
    placeholder: "Enter Textarea",
    required: false,
    disabled: true,
    error: false,
    errorMsg: "",
  },
};

export const WithError: Story = {
  args: {
    modelValue: "",
    rows: 3,
    placeholder: "Enter Textarea",
    required: true,
    disabled: false,
    error: true,
    errorMsg: "This field is required",
  },
};

export const CustomRows: Story = {
  args: {
    modelValue: "",
    rows: 5,
    placeholder: "This textarea has 5 rows",
    required: false,
    disabled: false,
    error: false,
    errorMsg: "",
  },
};
