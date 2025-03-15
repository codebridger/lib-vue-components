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
    fileTypes: {
      control: "text",
      description: "Human-readable description of accepted file types",
    },
    maxFiles: {
      control: "number",
      description: "Maximum number of files allowed",
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
    multiple: false,
    disabled: false,
    title: "",
    description: "",
    showPreview: true,
    maxSize: 0,
    fileTypes: "",
    maxFiles: 0,
  },
};

export const SingleImageUpload: Story = {
  args: {
    ...Default.args,
    accept: "image/*",
    fileTypes: "JPG, PNG, GIF",
    title: "Upload Profile Picture",
    description: "Drop your profile image or click to browse",
  },
};

export const MultipleDocumentUpload: Story = {
  args: {
    ...Default.args,
    accept: ".pdf,.doc,.docx",
    fileTypes: "PDF, DOC, DOCX",
    multiple: true,
    title: "Upload Documents",
    description: "Drop your documents or click to browse",
  },
};

export const LimitedFileSize: Story = {
  args: {
    ...Default.args,
    accept: "image/*",
    fileTypes: "Images",
    maxSize: 1024 * 1024, // 1MB
    title: "Upload Image",
    description: "Maximum file size: 1MB",
  },
};

export const LimitedFileCount: Story = {
  args: {
    ...Default.args,
    accept: "image/*",
    multiple: true,
    maxFiles: 3,
    title: "Upload Gallery Images",
    description: "Upload up to 3 images",
  },
};

export const CustomStyling: Story = {
  args: {
    ...Default.args,
    title: "Upload Your Design",
    description: "Drag and drop your creative designs here",
    fileTypes: "SVG, AI, PSD, PNG",
    accept: ".svg,.ai,.psd,.png",
  },
  parameters: {
    docs: {
      description: {
        story:
          "A customized version of the DropFile component with specialized text for designers.",
      },
    },
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
