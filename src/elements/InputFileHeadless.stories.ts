import type { Meta, StoryObj } from "@storybook/vue3";
import InputFileHeadless from "./InputFileHeadless.vue";
import { ref } from "vue";

const meta = {
  title: "Elements/InputFileHeadless",
  component: InputFileHeadless,
  tags: ["autodocs"],
  argTypes: {
    modelValue: {
      control: false,
      description: "The file list value (v-model)",
    },
    label: {
      control: "text",
      description: "Label text for the file input",
    },
    placeholder: {
      control: "text",
      description: "Placeholder text shown in the dropzone area",
    },
    iconName: {
      control: "text",
      description: "Icon name to be displayed in the dropzone area",
    },
    multiple: {
      control: "boolean",
      description: "Allow multiple file selection",
    },
    disabled: {
      control: "boolean",
      description: "Disable the input",
    },
    required: {
      control: "boolean",
      description: "Mark the input as required",
    },
    error: {
      control: "boolean",
      description: "Show error state",
    },
    errorMessage: {
      control: "text",
      description: "Error message text",
    },
    id: {
      control: "text",
      description: "Input ID attribute for label association",
    },
    accept: {
      control: "text",
      description: "Accepted file types (e.g., 'image/*', '.pdf')",
    },
    filterFileDropped: {
      control: false,
      description: "Function to filter which files are accepted when dropped",
    },
  },
  args: {
    label: "",
    placeholder: "Drop files to upload",
    iconName: "IconCloudUpload",
    multiple: false,
    disabled: false,
    required: false,
    error: false,
    errorMessage: "",
    id: "",
    accept: undefined,
  },
  parameters: {
    docs: {
      description: {
        component: `
## Features

- Drag and drop file upload
- Multiple file selection
- Custom UI through slots
- Error state with custom error message
- File filtering capabilities
- Preview file functionality
- Fully reactive with Vue's v-model

## Basic Usage

\`\`\`vue
<template>
  <InputFileHeadless v-model="files" accept="image/*" multiple>
    <!-- Default slot receives all needed props -->
  </InputFileHeadless>
</template>
\`\`\`

## Advanced Usage with Slots

\`\`\`vue
<template>
  <InputFileHeadless
    v-model="files"
    :multiple="true"
    :accept="'image/*'"
    @change="handleChange"
    @drop="handleDrop"
  >
    <template #default="{ open, files, remove, preview, drop, isDisabled, hasError, fileCount, hasFiles }">
      <div 
        class="border-2 border-dashed rounded-lg p-4"
        :class="{
          'border-gray-300': !hasError && !isDisabled,
          'border-red-500': hasError,
          'border-gray-200 bg-gray-50': isDisabled
        }"
        @click="!isDisabled && open()"
        @dragover.prevent
        @drop="!isDisabled && drop($event)"
      >
        <!-- Your custom UI here -->
        <div v-if="hasFiles">
          <div v-for="(file, index) in files" :key="index">
            {{ file.name }} - {{ (file.size / 1024).toFixed(2) }} KB
            <button @click.stop="remove(file)">Remove</button>
          </div>
        </div>
        <div v-else>
          <p>Drag and drop files here, or click to select files</p>
        </div>
      </div>
    </template>
  </InputFileHeadless>
</template>
\`\`\`
        `,
      },
      source: { type: "code" },
    },
  },
} satisfies Meta<typeof InputFileHeadless>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: "Drop files here or click to browse",
  },
  parameters: {
    docs: {
      description: {
        story: "Basic file upload component with default styling.",
      },
    },
  },
};

export const WithLabel: Story = {
  args: {
    label: "Upload Document",
    placeholder: "Drop your document here",
    id: "document-upload",
  },
  parameters: {
    docs: {
      description: {
        story: "File upload with a descriptive label to improve accessibility.",
      },
    },
  },
};

export const WithCustomIcon: Story = {
  args: {
    label: "Profile Picture",
    placeholder: "Upload your profile picture",
    iconName: "IconUser",
  },
  parameters: {
    docs: {
      description: {
        story: "File upload with a custom icon to indicate the upload type.",
      },
    },
  },
};

export const WithKebabCaseIcon: Story = {
  args: {
    label: "Document Upload",
    placeholder: "Upload your document",
    iconName: "icon-document",
  },
  parameters: {
    docs: {
      description: {
        story: "File upload with an icon name in kebab-case format.",
      },
    },
  },
};

export const Multiple: Story = {
  args: {
    label: "Upload Images",
    placeholder: "Drop multiple images here",
    multiple: true,
    accept: "image/*",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Allows selection of multiple files with image type restrictions.",
      },
    },
  },
};

export const WithError: Story = {
  args: {
    label: "Required Document",
    placeholder: "Please upload a document",
    error: true,
    errorMessage: "This field is required",
    required: true,
  },
  parameters: {
    docs: {
      description: {
        story: "File upload in an error state with a visible error message.",
      },
    },
  },
};

export const Disabled: Story = {
  args: {
    label: "Upload Document",
    placeholder: "This upload field is disabled",
    disabled: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Disabled file upload with visual indication of its unavailable state.",
      },
    },
  },
};

export const Required: Story = {
  args: {
    label: "Required Document",
    placeholder: "This field is required",
    required: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Required file upload with asterisk indicator next to the label.",
      },
    },
  },
};

export const AcceptOnlyImages: Story = {
  args: {
    label: "Upload Images",
    placeholder: "Only image files are accepted",
    accept: "image/*",
  },
  parameters: {
    docs: {
      description: {
        story:
          "File upload that only accepts image files (jpg, png, gif, etc.).",
      },
    },
  },
};
