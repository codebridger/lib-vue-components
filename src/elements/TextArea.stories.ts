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
  },
  args: {
    rows: 2,
    placeholder: "Enter Textarea ... ",
    required: false,
    disabled: false,
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
  },
};

export const Filled: Story = {
  args: {
    modelValue: "This is a sample text in the textarea",
    rows: 3,
    placeholder: "Enter Textarea",
    required: false,
    disabled: false,
  },
};

export const Required: Story = {
  args: {
    modelValue: "",
    rows: 3,
    placeholder: "Required textarea",
    required: true,
    disabled: false,
  },
};

export const Disabled: Story = {
  args: {
    modelValue: "This textarea is disabled",
    rows: 3,
    placeholder: "Enter Textarea",
    required: false,
    disabled: true,
  },
};

export const CustomRows: Story = {
  args: {
    modelValue: "",
    rows: 5,
    placeholder: "This textarea has 5 rows",
    required: false,
    disabled: false,
  },
};
