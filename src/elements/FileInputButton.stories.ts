import type { Meta, StoryObj } from "@storybook/vue3";
import { expect, within, userEvent } from "@storybook/test";
import FileInputButton from "./FileInputButton.vue";

const fileInputButtonDescription = `
# FileInputButton

Accessible file picker that pairs a styled button with a native file input under the hood. Supports accept filters, capture hints, and multiple selection.

## Features
- Button color themes; customizable label
- Accept and capture attributes; multiple selection
- Disabled/required states; error messaging

## Accessibility
- Uses a real input type=file with proper labeling; ensure descriptive button text.

## Usage
Use when you need a simple, button-driven file chooser without drag-and-drop.
`;
const meta: Meta<typeof FileInputButton> = {
  title: "Elements/FileInputButton",
  component: FileInputButton,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: fileInputButtonDescription,
      },
    },
  },
  argTypes: {
    buttonColor: {
      control: "select",
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
  },
};

export default meta;
type Story = StoryObj<typeof FileInputButton>;

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
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("Verify file input renders correctly", async () => {
      const fileInput = canvas.getByDisplayValue("");
      expect(fileInput).toBeInTheDocument();
    });

    await step("Verify label is present", async () => {
      const label = canvas.getByText("Upload File");
      expect(label).toBeInTheDocument();
    });
  },
};

export const WithAcceptedTypes: Story = {
  args: {
    ...Default.args,
    label: "Upload Images",
    accept: "image/*",
    multiple: true,
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step(
      "Verify file input with accepted types renders correctly",
      async () => {
        const fileInput = canvas.getByDisplayValue("");
        expect(fileInput).toBeInTheDocument();
      }
    );

    await step("Verify label is present", async () => {
      const label = canvas.getByText("Upload Images");
      expect(label).toBeInTheDocument();
    });
  },
};

export const WithError: Story = {
  args: {
    ...Default.args,
    label: "Upload Document",
    error: true,
    errorMessage: "Please select a valid file",
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("Verify file input with error renders correctly", async () => {
      const fileInput = canvas.getByDisplayValue("");
      expect(fileInput).toBeInTheDocument();
    });

    await step("Verify label is present", async () => {
      const label = canvas.getByText("Upload Document");
      expect(label).toBeInTheDocument();
    });

    await step("Verify error message is displayed", async () => {
      const errorMessage = canvas.getByText("Please select a valid file");
      expect(errorMessage).toBeInTheDocument();
    });
  },
};

export const Disabled: Story = {
  args: {
    ...Default.args,
    label: "Upload File",
    disabled: true,
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("Verify disabled file input renders correctly", async () => {
      const fileInput = canvas.getByDisplayValue("");
      expect(fileInput).toBeInTheDocument();
    });

    await step("Verify label is present", async () => {
      const label = canvas.getByText("Upload File");
      expect(label).toBeInTheDocument();
    });
  },
};

export const WithCapture: Story = {
  args: {
    ...Default.args,
    label: "Take Photo",
    accept: "image/*",
    capture: "environment",
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("Verify file input with capture renders correctly", async () => {
      const fileInput = canvas.getByDisplayValue("");
      expect(fileInput).toBeInTheDocument();
    });

    await step("Verify label is present", async () => {
      const label = canvas.getByText("Take Photo");
      expect(label).toBeInTheDocument();
    });
  },
};
