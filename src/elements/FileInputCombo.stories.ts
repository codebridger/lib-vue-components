import type { Meta, StoryObj } from "@storybook/vue3";
import FileInputCombo from "./FileInputCombo.vue";
import { ref } from "vue";

// Define type for the component instance
type FileInputComboInstance = InstanceType<typeof FileInputCombo>;

const meta = {
  title: "Elements/FileInputCombo",
  component: FileInputCombo,
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
    label: {
      control: "text",
      description: "Label for the input",
    },
    required: {
      control: "boolean",
      description: "Whether the field is required",
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
    showControls: {
      control: "boolean",
      description: "Show upload controls",
    },
    maxSize: {
      control: "number",
      description: "Maximum file size in bytes",
    },
    maxFiles: {
      control: "number",
      description: "Maximum number of files allowed",
    },
    autoUpload: {
      control: "boolean",
      description: "Automatically start upload when files are added",
    },
    uploadIcon: {
      control: "text",
      description: "Icon to show in the upload area",
    },
    dropModeIcon: {
      control: "text",
      description: "Icon to show in the drop mode overlay",
    },
    dropModeLabel: {
      control: "text",
      description: "Label to show in the drop mode overlay",
    },
  },
  args: {
    multiple: true,
    disabled: false,
    required: false,
    showPreview: true,
    showControls: true,
    maxSize: 0,
    maxFiles: 0,
    autoUpload: false,
    uploadIcon: "IconCloudUpload",
    dropModeIcon: "IconGallery",
    dropModeLabel: "Drop your files",
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

## Storybook Demo Note

In this Storybook demo, the file upload process is simulated with progress updates that happen automatically via intervals. In a real application, you would need to implement the actual upload logic and update the file states accordingly.

## Usage in Real Applications

\`\`\`
<script setup lang="ts">
import { FileInputCombo } from "@codebridger/lib-vue-components/elements";
import { ref } from "vue";

// Get a reference to the component
const fileInput = ref(null);

// Handle file selection
const handleFileSelect = (files) => {
  console.log('Selected files:', files);
};

// Handle file upload
const handleFileUpload = async (file, index) => {
  try {
    // Create a FormData object for your API request
    const formData = new FormData();
    formData.append('file', file);
    
    // Example API upload with progress monitoring
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/api/upload', true);
    
    // Update progress as it happens
    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        const progress = Math.round((event.loaded / event.total) * 100);
        // Update the component's progress display
        fileInput.value.updateFileProgress(index, progress);
      }
    };
    
    // Handle completion
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        // Mark upload as complete
        fileInput.value.setFileStatus(index, 'finished');
      } else {
        // Handle error
        fileInput.value.setFileStatus(index, 'error', 'Upload failed');
      }
    };
    
    // Handle network errors
    xhr.onerror = () => {
      fileInput.value.setFileStatus(index, 'error', 'Network error');
    };
    
    // Start the upload
    xhr.send(formData);
  } catch (error) {
    fileInput.value.setFileStatus(index, 'error', error.message);
  }
};
</script>

<template>
  <FileInputCombo
    ref="fileInput"
    label="Upload Documents"
    accept=".pdf,.doc,.docx"
    :max-size="5 * 1024 * 1024"
    :auto-upload="true"
    @file-select="handleFileSelect"
    @file-upload="handleFileUpload"
  />
</template>
\`\`\``,
      },
      source: { type: "code" },
    },
  },
  // Custom render function to handle the simulation
  render: (args) => ({
    components: { FileInputCombo },
    setup() {
      const fileInputRef = ref<FileInputComboInstance | null>(null);
      const uploadIntervals = ref<Record<number, number>>({});

      // File upload handler with simulation
      const handleFileUpload = (file: File, index: number) => {
        // Clear existing interval if any
        if (uploadIntervals.value[index]) {
          clearInterval(uploadIntervals.value[index]);
        }

        // Start upload simulation
        let progress = 0;
        uploadIntervals.value[index] = window.setInterval(() => {
          progress += 10;

          // Handle different simulation scenarios
          const isErrorDemo =
            window.location.href.includes("withuploaderror") && progress >= 30;

          if (isErrorDemo) {
            // Simulate error at 30%
            fileInputRef.value?.setFileStatus(
              index,
              "error",
              "Connection failed"
            );
            clearInterval(uploadIntervals.value[index]);
          } else if (progress <= 100) {
            // Update progress
            fileInputRef.value?.updateFileProgress(index, progress);

            // Complete when done
            if (progress >= 100) {
              clearInterval(uploadIntervals.value[index]);
            }
          }
        }, 300);
      };

      // Clean up intervals
      const cleanup = () => {
        Object.values(uploadIntervals.value).forEach((interval) =>
          clearInterval(interval)
        );
      };

      // Return everything needed for the template
      return {
        args,
        fileInputRef,
        handleFileUpload,
        onUnmounted: cleanup,
      };
    },
    template: `
      <FileInputCombo
        v-bind="args"
        ref="fileInputRef"
        @file-upload="handleFileUpload"
      />
    `,
    beforeUnmount() {
      this.onUnmounted();
    },
  }),
} satisfies Meta<typeof FileInputCombo>;

export default meta;
type Story = StoryObj<typeof meta>;

// Export the stories
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

export const WithUploadError: Story = {
  args: {
    label: "Upload with Error Simulation",
    autoUpload: true,
    description: "Files will fail to upload after progress reaches 30%",
  },
};
