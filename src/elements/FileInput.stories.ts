// FileInput.stories.ts
import type { Meta, StoryObj } from "@storybook/vue3";
import FileInput from "./FileInput.vue";

const meta: Meta<typeof FileInput> = {
  title: "Elements/FileInput",
  component: FileInput,
  tags: ["autodocs"],
  argTypes: {
    buttonColor: {
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
      description: "Color variant of the upload button",
    },
    accept: {
      control: "text",
      description: 'Allowed file types (e.g., ".jpg,.png,.pdf" or "image/*")',
    },
    capture: {
      control: "text",
      description:
        'Capture method for file input (e.g., "user" or "environment")',
    },
    multiple: {
      control: "boolean",
      description: "Allow multiple file selection",
    },
    size: {
      control: "number",
      description: "Size attribute for the file input",
    },
    label: {
      control: "text",
      description: "Input label text",
    },
    required: {
      control: "boolean",
      description: "Whether the input is required",
    },
    disabled: {
      control: "boolean",
      description: "Whether the input is disabled",
    },
    error: {
      control: "boolean",
      description: "Whether the input has an error",
    },
    errorMessage: {
      control: "text",
      description: "Error message to display",
    },
    onChange: {
      action: "change",
      description: "Triggered when files are selected",
    },
    onInput: {
      action: "input",
      description: "Triggered on input",
    },
    onCancel: {
      action: "cancel",
      description: "Triggered when file selection is cancelled",
    },
    onBlur: {
      action: "blur",
      description: "Triggered when input loses focus",
    },
    onFocus: {
      action: "focus",
      description: "Triggered when input gains focus",
    },
  },
};

export default meta;
type Story = StoryObj<typeof FileInput>;

export const Default: Story = {
  args: {
    label: "Upload File",
    buttonColor: "primary",
    accept: "",
    multiple: false,
    required: false,
    disabled: false,
    error: false,
    errorMessage: "",
  },
};

export const WithAcceptedTypes: Story = {
  args: {
    ...Default.args,
    label: "Upload Images",
    accept: "image/*",
    multiple: true,
  },
};

export const WithError: Story = {
  args: {
    ...Default.args,
    label: "Upload Document",
    error: true,
    errorMessage: "Please select a valid file",
  },
};

export const Disabled: Story = {
  args: {
    ...Default.args,
    label: "Upload File",
    disabled: true,
  },
};

export const WithCapture: Story = {
  args: {
    ...Default.args,
    label: "Take Photo",
    accept: "image/*",
    capture: "environment",
  },
};
