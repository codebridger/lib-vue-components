import type { Meta, StoryObj } from "@storybook/vue3";
import { expect, within, userEvent } from "@storybook/test";
import FileInputCombo from "./FileInputCombo.vue";
import { ref } from "vue";
import {
  showToast,
  toastSuccess,
  toastError,
  toastInfo,
  toastWarning,
} from "../utils/toast";

// Define type for the component instance
type FileInputComboInstance = InstanceType<typeof FileInputCombo>;

// Helper function to format file size for display
function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

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
      source: {
        type: "auto",
      },
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

\`\`\`vue
<script setup>
import { FileInputCombo } from "@codebridger/lib-vue-components/elements";
import { ref } from "vue";

// Get a reference to the component
const fileInput = ref(null);
// Track active uploads to allow cancellation
const activeUploads = ref({});

// Handle file selection
const handleFileSelect = (payload) => {
  console.log('Selected files:', payload.files);
};

// Handle file upload
const handleFileUpload = async (payload) => {
  const { file, fileId } = payload;
  try {
    // Create a FormData object for your API request
    const formData = new FormData();
    formData.append('file', file);
    
    // Store the XHR request for potential cancellation
    const xhr = new XMLHttpRequest();
    
    // Track the upload for potential cancellation
    activeUploads.value[fileId] = xhr;
    
    xhr.open('POST', '/api/upload', true);
    
    // Update progress as it happens
    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        const progress = Math.round((event.loaded / event.total) * 100);
        // Update the component's progress display using fileId
        fileInput.value.updateFileProgress(fileId, progress);
      }
    };
    
    // Handle completion
    xhr.onload = () => {
      // Remove from active uploads
      delete activeUploads.value[fileId];
      
      if (xhr.status >= 200 && xhr.status < 300) {
        // Mark upload as complete using fileId
        fileInput.value.setFileStatus(fileId, 'finished');
      } else {
        // Handle error using fileId
        fileInput.value.setFileStatus(fileId, 'error', 'Upload failed');
      }
    };
    
    // Handle network errors
    xhr.onerror = () => {
      // Remove from active uploads
      delete activeUploads.value[fileId];
      fileInput.value.setFileStatus(fileId, 'error', 'Network error');
    };
    
    // Start the upload
    xhr.send(formData);
  } catch (error) {
    fileInput.value.setFileStatus(fileId, 'error', error.message);
  }
};

// Handle upload cancellation
const handleCancelUpload = (payload) => {
  const { file, fileId } = payload;
  if (activeUploads.value[fileId]) {
    // Abort the XHR request
    activeUploads.value[fileId].abort();
    delete activeUploads.value[fileId];
    console.log(\`Upload cancelled for \${file.name}\`);
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
    @file-upload-cancel="handleCancelUpload"
  />
</template>
\`\`\`
`,
      },
    },
  },
  // Custom render function to handle the simulation and toast notifications
  render: (args) => ({
    components: { FileInputCombo },
    setup() {
      const fileInputRef = ref<FileInputComboInstance | null>(null);
      const uploadIntervals = ref<Record<string, number>>({});

      // File upload handler with simulation
      const handleFileUpload = (payload: { file: File; fileId: string }) => {
        const { file, fileId } = payload;

        // Show toast notification
        showToast({
          message: `Starting upload: ${file.name} (${formatFileSize(
            file.size
          )})`,
          variant: "primary",
          position: "top-end",
        });

        // Clear existing interval if any
        if (uploadIntervals.value[fileId]) {
          clearInterval(uploadIntervals.value[fileId]);
        }

        // Start upload simulation
        let progress = 0;
        uploadIntervals.value[fileId] = window.setInterval(() => {
          progress += 10;

          // Check if this is the error demo story
          const isErrorDemo =
            args.title?.includes("error at 30%") ||
            window.location.href.includes("withuploaderror") ||
            window.location.href.includes("withErrorToasts");

          if (isErrorDemo && progress >= 30) {
            // Simulate error at 30%
            fileInputRef.value?.setFileStatus(
              fileId,
              "error",
              "Connection failed"
            );

            // Show error toast
            toastError(`Error uploading ${file.name}: Connection failed`, {
              position: "top-end",
              duration: 4000,
            });

            clearInterval(uploadIntervals.value[fileId]);
          } else if (progress <= 100) {
            // Update progress
            fileInputRef.value?.updateFileProgress(fileId, progress);

            // Show progress toast only at 50% to avoid too many notifications
            if (progress === 50) {
              toastInfo(`${file.name}: ${progress}% uploaded`, {
                position: "top-end",
                duration: 2000,
              });
            }

            // Complete when done
            if (progress >= 100) {
              // Show success toast
              toastSuccess(`Upload complete: ${file.name}`, {
                position: "top-end",
              });
              clearInterval(uploadIntervals.value[fileId]);
            }
          }
        }, 300);
      };

      // Handle cancel upload simulation
      const handleCancelUpload = (payload: { file: File; fileId: string }) => {
        const { file, fileId } = payload;

        // Show toast notification
        toastWarning(`Upload cancelled: ${file.name}`, { position: "top-end" });

        // If there's an active interval for this file, clear it
        if (uploadIntervals.value[fileId]) {
          clearInterval(uploadIntervals.value[fileId]);
          delete uploadIntervals.value[fileId];
        }
      };

      // Handle file selection event
      const handleFileSelect = (payload: { files: File[] }) => {
        const { files } = payload;
        const fileCount = files.length;
        toastInfo(`${fileCount} file${fileCount !== 1 ? "s" : ""} selected`, {
          position: "top-end",
        });
      };

      // Handle file removal event
      const handleFileRemove = (payload: { file: File; fileId: string }) => {
        const { file, fileId } = payload;

        // Show toast notification
        toastInfo(`File removed: ${file.name}`, { position: "top-end" });

        // Clear any active upload simulation for this file
        if (uploadIntervals.value[fileId]) {
          clearInterval(uploadIntervals.value[fileId]);
          delete uploadIntervals.value[fileId];
        }
      };

      // Handle upload-all event
      const handleUploadAll = () => {
        // Show toast notification
        showToast({
          message: "Starting upload of all files",
          variant: "primary",
          position: "top-end",
        });
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
        handleCancelUpload,
        handleFileSelect,
        handleFileRemove,
        handleUploadAll,
        onUnmounted: cleanup,
      };
    },
    template: `
      <div>
        <FileInputCombo
          v-bind="args"
          ref="fileInputRef"
          @file-upload="handleFileUpload"
          @file-upload-cancel="handleCancelUpload"
          @file-select="handleFileSelect"
          @file-remove="handleFileRemove"
          @file-upload-all="handleUploadAll"
        />
      </div>
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
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("Verify file input combo renders correctly", async () => {
      const uploadArea = canvas.getByText("Drop files to upload");
      expect(uploadArea).toBeInTheDocument();
    });

    await step("Verify browse button is present", async () => {
      const browseButton = canvas.getByText("Browse");
      expect(browseButton).toBeInTheDocument();
    });
  },
};

export const WithLabel: Story = {
  args: {
    label: "Upload Documents",
    required: true,
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step(
      "Verify file input combo with label renders correctly",
      async () => {
        const label = canvas.getByText("Upload Documents");
        expect(label).toBeInTheDocument();
      }
    );

    await step("Verify required indicator is present", async () => {
      const requiredIndicator = canvas.getByText("*");
      expect(requiredIndicator).toBeInTheDocument();
    });
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
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("Verify image uploader renders correctly", async () => {
      const title = canvas.getByText("Drop your images here");
      expect(title).toBeInTheDocument();
    });

    await step("Verify description is present", async () => {
      const description = canvas.getByText("JPG, PNG, GIF and WebP files only");
      expect(description).toBeInTheDocument();
    });
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
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("Verify document uploader renders correctly", async () => {
      const title = canvas.getByText("Drop your documents here");
      expect(title).toBeInTheDocument();
    });

    await step("Verify description is present", async () => {
      const description = canvas.getByText("PDF, Word, and text files only");
      expect(description).toBeInTheDocument();
    });
  },
};

export const AutoUpload: Story = {
  args: {
    label: "Auto Upload Files",
    autoUpload: true,
    showControls: false,
    title: "Files will upload automatically",
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("Verify auto upload renders correctly", async () => {
      const title = canvas.getByText("Files will upload automatically");
      expect(title).toBeInTheDocument();
    });
  },
};

export const Disabled: Story = {
  args: {
    label: "Disabled Upload",
    disabled: true,
    title: "Upload disabled",
    description: "You cannot upload files at this time",
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("Verify disabled upload renders correctly", async () => {
      const title = canvas.getByText("Upload disabled");
      expect(title).toBeInTheDocument();
    });

    await step("Verify disabled description is present", async () => {
      const description = canvas.getByText(
        "You cannot upload files at this time"
      );
      expect(description).toBeInTheDocument();
    });
  },
};

export const NoPreview: Story = {
  args: {
    showPreview: false,
    title: "Simple Upload",
    description: "No file previews will be shown",
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("Verify no preview upload renders correctly", async () => {
      const title = canvas.getByText("Simple Upload");
      expect(title).toBeInTheDocument();
    });

    await step("Verify description is present", async () => {
      const description = canvas.getByText("No file previews will be shown");
      expect(description).toBeInTheDocument();
    });
  },
};

export const CustomIcons: Story = {
  args: {
    uploadIcon: "IconUpload",
    dropModeIcon: "IconCloud",
    dropModeLabel: "Drop files anywhere",
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("Verify custom icons upload renders correctly", async () => {
      const browseButton = canvas.getByText("Browse");
      expect(browseButton).toBeInTheDocument();
    });
  },
};

export const WithFileSizeLimit: Story = {
  args: {
    label: "Limited Upload Size",
    maxSize: 1024 * 1024, // 1MB
    description: "Maximum file size: 1MB",
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("Verify file size limit upload renders correctly", async () => {
      const description = canvas.getByText("Maximum file size: 1MB");
      expect(description).toBeInTheDocument();
    });
  },
};

export const WithMaxFiles: Story = {
  args: {
    label: "Limited Number of Files",
    maxFiles: 2,
    description: "Maximum 2 files allowed",
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("Verify max files upload renders correctly", async () => {
      const description = canvas.getByText("Maximum 2 files allowed");
      expect(description).toBeInTheDocument();
    });
  },
};

export const WithUploadError: Story = {
  args: {
    label: "Upload with Error Simulation",
    autoUpload: true,
    description: "Files will fail to upload after progress reaches 30%",
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("Verify upload error simulation renders correctly", async () => {
      const description = canvas.getByText(
        "Files will fail to upload after progress reaches 30%"
      );
      expect(description).toBeInTheDocument();
    });
  },
};

export const WithToastNotifications: Story = {
  args: {
    label: "File Upload with Toast Notifications",
    title: "Upload files to see toast notifications",
    description:
      "All component events will be displayed as toast notifications",
    autoUpload: true,
    maxFiles: 5,
    showControls: true,
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step(
      "Verify toast notifications upload renders correctly",
      async () => {
        const title = canvas.getByText(
          "Upload files to see toast notifications"
        );
        expect(title).toBeInTheDocument();
      }
    );

    await step("Verify description is present", async () => {
      const description = canvas.getByText(
        "All component events will be displayed as toast notifications"
      );
      expect(description).toBeInTheDocument();
    });
  },
  parameters: {
    docs: {
      description: {
        story:
          "This story demonstrates toast notifications for all component events. Try selecting, uploading, cancelling and removing files to see different toast notifications.",
      },
    },
  },
};

export const WithtoastErrors: Story = {
  args: {
    label: "Upload with Error Notifications",
    title: "Files will error at 30% upload",
    description: "Demonstrates error toast notifications",
    autoUpload: true,
    maxFiles: 3,
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step(
      "Verify error notifications upload renders correctly",
      async () => {
        const title = canvas.getByText("Files will error at 30% upload");
        expect(title).toBeInTheDocument();
      }
    );

    await step("Verify description is present", async () => {
      const description = canvas.getByText(
        "Demonstrates error toast notifications"
      );
      expect(description).toBeInTheDocument();
    });
  },
  parameters: {
    name: "withuploaderror", // This triggers the error simulation
    docs: {
      description: {
        story:
          "This story demonstrates error toast notifications. All uploads will fail at 30% progress, displaying error toasts.",
      },
    },
  },
};
