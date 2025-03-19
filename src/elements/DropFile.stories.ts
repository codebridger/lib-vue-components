import type { Meta, StoryObj } from "@storybook/vue3";
import DropFile from "./DropFile.vue";

const meta: Meta<typeof DropFile> = {
  title: "Elements/DropFile",
  component: DropFile,
  tags: ["autodocs"],
  argTypes: {
    accept: {
      control: "text",
      description:
        "File types that are allowed to be uploaded (e.g. '.jpg,.png')",
    },
    multiple: {
      control: "boolean",
      description: "Allow multiple file uploads",
    },
    disabled: {
      control: "boolean",
      description: "Disable the component",
    },
    title: {
      control: "text",
      description: "Custom title for the upload area",
    },
    description: {
      control: "text",
      description: "Custom description for the upload area",
    },
    showPreview: {
      control: "boolean",
      description: "Show file preview after upload",
    },
    maxSize: {
      control: "number",
      description: "Maximum file size in bytes",
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "A drag and drop file upload component with customizable appearance and validation options.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof DropFile>;

export const Default: Story = {
  args: {
    accept: "",
    multiple: true,
    disabled: false,
    title: "",
    description: "",
    showPreview: true,
    maxSize: 0,
  },
};

export const Disabled: Story = {
  args: {
    ...Default.args,
    disabled: true,
    title: "Upload Unavailable",
    description: "File uploads are currently disabled",
  },
};

export const NoPreview: Story = {
  args: {
    ...Default.args,
    showPreview: false,
    multiple: true,
    title: "Upload in Background",
    description: "Files will be uploaded without preview",
  },
};
