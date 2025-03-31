import type { Meta, StoryObj } from "@storybook/vue3";
import { ref } from "vue";
import InputFileDragMode from "./InputFileDragMode.vue";

const meta = {
  title: "Elements/InputFileDragMode",
  component: InputFileDragMode,
  tags: ["autodocs"],
  argTypes: {
    accept: {
      control: "text",
      description:
        "File types that are allowed to be uploaded (e.g. '.jpg,.png')",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "" },
      },
    },
    multiple: {
      control: "boolean",
      description: "Allow multiple file uploads",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "true" },
      },
    },
    disabled: {
      control: "boolean",
      description: "Disable the component",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    label: {
      control: "text",
      description: "Label for the input",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "" },
      },
    },
    required: {
      control: "boolean",
      description: "Whether the field is required",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    title: {
      control: "text",
      description: "Custom title for the upload area",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "Drop files to upload" },
      },
    },
    description: {
      control: "text",
      description: "Custom description for the upload area",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "Click to browse files" },
      },
    },
    showPreview: {
      control: "boolean",
      description: "Show file preview after upload",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "true" },
      },
    },
    showControls: {
      control: "boolean",
      description: "Show upload controls",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "true" },
      },
    },
    maxSize: {
      control: "number",
      description: "Maximum file size in bytes",
      table: {
        type: { summary: "number" },
        defaultValue: { summary: "0" },
      },
    },
    maxFiles: {
      control: "number",
      description: "Maximum number of files allowed",
      table: {
        type: { summary: "number" },
        defaultValue: { summary: "0" },
      },
    },
    autoUpload: {
      control: "boolean",
      description: "Automatically start upload when files are added",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    uploadIcon: {
      control: "text",
      description: "Icon to show in the upload area",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "IconCloudUpload" },
      },
    },
    dropModeIcon: {
      control: "text",
      description: "Icon to show in the drop mode overlay",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "IconGallery" },
      },
    },
    dropModeLabel: {
      control: "text",
      description: "Label to show in the drop mode overlay",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "Drop your files" },
      },
    },
  },
  parameters: {
    docs: {
      description: {
        component: `
A versatile file upload component that supports both drag-and-drop and click-to-upload functionality. The component provides a modern interface with file previews, upload progress tracking, and comprehensive file management features.

## Features

- **Dual Upload Modes**: Support for both drag-and-drop and click-to-upload
- **File Preview**: Visual preview of selected files with thumbnails
- **Progress Tracking**: Real-time upload progress indicators
- **Auto Upload**: Option to automatically start uploads when files are selected
- **File Validation**: Built-in file type and size restrictions
- **Multiple File Support**: Handle multiple file uploads with individual progress tracking
- **Customizable UI**: Custom icons, labels, and descriptions
- **Accessibility**: Full keyboard navigation and ARIA support
- **Responsive Design**: Works well on all screen sizes

## Usage

\`\`\`
<script setup lang="ts">
import InputFileDragMode from './components/InputFileDragMode.vue';

const handleFileSelect = (files) => {
  console.log('Selected files:', files);
};

const handleUploadProgress = (file, progress) => {
  console.log(\`Upload progress for \${file.name}: \${progress}%\`);
};
</script>

<template>
  <InputFileDragMode
    label="Upload Documents"
    accept=".pdf,.doc,.docx"
    :max-size="5 * 1024 * 1024"
    :auto-upload="true"
    @file-select="handleFileSelect"
    @file-upload-progress="handleUploadProgress"
  />
</template>
\`\`\``,
      },
      source: { type: "code" },
    },
  },
} satisfies Meta<typeof InputFileDragMode>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const WithLabel: Story = {
  args: {
    label: "Upload Documents",
    required: true,
  },
};

export const ImageUploader: Story = {
  args: {
    label: "Upload Images",
    accept: ".jpg,.jpeg,.png,.gif,.webp",
    title: "Drop your images here",
    description: "JPG, PNG, GIF and WebP files only",
    uploadIcon: "IconImage",
    maxSize: 5 * 1024 * 1024, // 5MB
  },
};

export const DocumentUploader: Story = {
  args: {
    label: "Upload Documents",
    accept: ".pdf,.doc,.docx,.txt,.rtf",
    title: "Drop your documents here",
    description: "PDF, Word, and text files only",
    uploadIcon: "IconDocument",
    maxFiles: 3,
  },
};

export const AutoUpload: Story = {
  args: {
    label: "Auto Upload Files",
    autoUpload: true,
    showControls: false,
    title: "Files will upload automatically",
  },
};

export const Disabled: Story = {
  args: {
    label: "Disabled Upload",
    disabled: true,
    title: "Upload disabled",
    description: "You cannot upload files at this time",
  },
};

export const NoPreview: Story = {
  args: {
    showPreview: false,
    title: "Simple Upload",
    description: "No file previews will be shown",
  },
};

export const CustomIcons: Story = {
  args: {
    uploadIcon: "IconUpload",
    dropModeIcon: "IconCloud",
    dropModeLabel: "Drop files anywhere",
  },
};

export const WithFileSizeLimit: Story = {
  args: {
    label: "Limited Upload Size",
    maxSize: 1024 * 1024, // 1MB
    description: "Maximum file size: 1MB",
  },
};

export const WithMaxFiles: Story = {
  args: {
    label: "Limited Number of Files",
    maxFiles: 2,
    description: "Maximum 2 files allowed",
  },
};

export const WithCustomSlots = {
  render: (args) => ({
    components: { InputFileDragMode },
    setup() {
      return { args };
    },
    template: `
      <InputFileDragMode v-bind="args">
        <template #label>
          <div class="flex items-center gap-2 text-blue-600 font-bold">
            <span>📁</span>
            <span>Custom Label Slot</span>
          </div>
        </template>
        <template #controls>
          <div class="flex justify-between items-center p-2 bg-gray-100 rounded">
            <span class="text-sm font-medium">Custom Controls</span>
            <button class="px-3 py-1 bg-blue-500 text-white rounded" @click="() => {}">
              Browse Files
            </button>
          </div>
        </template>
      </InputFileDragMode>
    `,
  }),
};

// Example with event handling
export const WithEventHandling = {
  render: (args) => ({
    components: { InputFileDragMode },
    setup() {
      const selectedFiles = ref([]);
      const uploadingStatus = ref("");

      const handleFileSelect = (files) => {
        selectedFiles.value = files;
        uploadingStatus.value = `Selected ${files.length} files`;
      };

      const handleFileUpload = (file) => {
        uploadingStatus.value = `Uploading: ${file.name}`;
      };

      const handleUploadComplete = (file) => {
        uploadingStatus.value = `Upload completed: ${file.name}`;
      };

      return {
        args,
        selectedFiles,
        uploadingStatus,
        handleFileSelect,
        handleFileUpload,
        handleUploadComplete,
      };
    },
    template: `
      <div>
        <InputFileDragMode 
          v-bind="args"
          @file-select="handleFileSelect"
          @file-upload="handleFileUpload"
          @file-upload-complete="handleUploadComplete"
        />
        <div v-if="uploadingStatus" class="mt-4 p-2 bg-gray-50 border rounded">
          <p>{{ uploadingStatus }}</p>
        </div>
      </div>
    `,
  }),
  args: {
    label: "With Event Handling",
  },
};
