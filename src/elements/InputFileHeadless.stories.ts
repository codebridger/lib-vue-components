import type { Meta, StoryObj } from "@storybook/vue3";
import InputFileHeadless from "./InputFileHeadless.vue";

const meta = {
  title: "Elements/InputFileHeadless",
  component: InputFileHeadless,
  tags: ["autodocs"],
  argTypes: {
    multiple: {
      control: "boolean",
      description: "Allow multiple file selection",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Size of the input",
    },
    disabled: {
      control: "boolean",
      description: "Disable the input",
    },
    error: {
      control: "boolean",
      description: "Show error state",
    },
    accept: {
      control: "text",
      description: "Accept attribute for file input (e.g., 'image/*', '.pdf')",
    },
    capture: {
      control: "select",
      options: ["user", "environment", false],
      description: "Capture attribute for file input",
    },
    filterFileDropped: {
      control: false,
      description: "Function to filter which files are accepted",
    },
  },
  args: {
    multiple: false,
    size: "md",
    disabled: false,
    error: false,
    accept: undefined,
    capture: undefined,
    filterFileDropped: () => true,
  },
  parameters: {
    docs: {
      description: {
        component: `
# InputFileHeadless Component

A headless file input component that provides a flexible and customizable interface for file selection, drag and drop, and file management.

## Features

- **Headless Design**: Completely unstyled, allowing full customization
- **Drag and Drop**: Built-in drag and drop support
- **File Preview**: Preview support for files
- **Multiple Selection**: Support for single and multiple file selection
- **File Filtering**: Custom file type filtering
- **Accessibility**: Proper ARIA attributes and keyboard support
- **Responsive**: Works well on all screen sizes

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| \`id\` | \`string\` | \`undefined\` | The form input identifier |
| \`multiple\` | \`boolean\` | \`false\` | Allow multiple file selection |
| \`size\` | \`'sm' | 'md' | 'lg'\` | \`'md'\` | Size of the input |
| \`disabled\` | \`boolean\` | \`false\` | Disable the input |
| \`error\` | \`boolean\` | \`false\` | Show error state |
| \`accept\` | \`string\` | \`undefined\` | Accept attribute for file input |
| \`capture\` | \`'user' | 'environment' | boolean\` | \`undefined\` | Capture attribute for file input |
| \`filterFileDropped\` | \`(file: File) => boolean\` | \`() => true\` | Function to filter which files are accepted |

## Events

| Event | Payload | Description |
|-------|---------|-------------|
| \`update:modelValue\` | \`FileList | null\` | Emitted when files change |
| \`change\` | \`Event\` | Emitted when files are selected |
| \`drop\` | \`DragEvent\` | Emitted when files are dropped |
| \`remove\` | \`File\` | Emitted when a file is removed |
| \`blur\` | \`FocusEvent\` | Emitted when the input loses focus |
| \`focus\` | \`FocusEvent\` | Emitted when the input gains focus |

## Slot Props

| Prop | Type | Description |
|------|------|-------------|
| \`files\` | \`FileList | null\` | The current FileList |
| \`open\` | \`() => void\` | Function to open the file selector |
| \`remove\` | \`(file: File) => void\` | Function to remove a file |
| \`preview\` | \`(file: File) => string | undefined\` | Function to get file preview |
| \`drop\` | \`(event: DragEvent) => void\` | Function to handle file drops |
| \`isDragging\` | \`boolean\` | Whether files are being dragged over |
| \`isDisabled\` | \`boolean\` | Whether the input is disabled |
| \`hasError\` | \`boolean\` | Whether there's an error |
| \`size\` | \`'sm' | 'md' | 'lg'\` | Current size prop value |
| \`hasFiles\` | \`boolean\` | Whether files are selected |
| \`fileCount\` | \`number\` | Number of selected files |

## Usage Example

\`\`\`vue
<template>
  <InputFileHeadless
    v-model="files"
    :multiple="true"
    :accept="'image/*'"
    @change="handleChange"
    @drop="handleDrop"
  >
    <template #default="slotProps">
      <div 
        class="border-2 border-dashed rounded-lg p-4"
        :class="{
          'border-gray-300': !slotProps.hasError && !slotProps.isDisabled,
          'border-red-500': slotProps.hasError,
          'border-gray-200 bg-gray-50': slotProps.isDisabled,
          'border-primary': slotProps.isDragging
        }"
        @click="slotProps.open"
        @dragover.prevent
        @drop="slotProps.drop"
      >
        <!-- Your custom content -->
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
    multiple: false,
    size: "md",
    disabled: false,
    error: false,
  },
  render: (args) => ({
    components: { InputFileHeadless },
    setup() {
      return { args };
    },
    template: `
      <InputFileHeadless v-bind="args">
        <template #default="{ open, files, remove, preview, drop, isDragging, isDisabled, hasError, hasFiles, fileCount }">
          <div 
            class="border-2 border-dashed rounded-lg p-4 transition-colors cursor-pointer"
            :class="{
              'border-gray-300 hover:border-gray-400': !hasError && !isDisabled,
              'border-red-500': hasError,
              'border-gray-200 bg-gray-50': isDisabled,
              'border-primary': isDragging,
              'cursor-not-allowed': isDisabled
            }"
            @click="open"
            @dragover.prevent
            @drop="drop"
          >
            <div class="text-center">
              <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              <p class="mt-1 text-sm text-gray-600">
                {{ hasFiles ? \`\${fileCount} files selected\` : 'Drag and drop files here, or click to select files' }}
              </p>
              <p class="mt-1 text-xs text-gray-500">
                Any file type
              </p>
            </div>
          </div>
        </template>
      </InputFileHeadless>
    `,
  }),
};

export const Multiple: Story = {
  args: {
    multiple: true,
    size: "md",
    disabled: false,
    error: false,
  },
};

export const Small: Story = {
  args: {
    multiple: false,
    size: "sm",
    disabled: false,
    error: false,
  },
};

export const Large: Story = {
  args: {
    multiple: false,
    size: "lg",
    disabled: false,
    error: false,
  },
};

export const Disabled: Story = {
  args: {
    multiple: false,
    size: "md",
    disabled: true,
    error: false,
  },
};

export const Error: Story = {
  args: {
    multiple: false,
    size: "md",
    disabled: false,
    error: true,
  },
};

export const WithFileList: Story = {
  args: {
    multiple: true,
    size: "md",
    disabled: false,
    error: false,
  },
  render: (args) => ({
    components: { InputFileHeadless },
    setup() {
      return { args };
    },
    template: `
      <InputFileHeadless v-bind="args">
        <template #default="{ open, files, remove, preview, drop, isDragging, isDisabled, hasError, hasFiles, fileCount }">
          <div class="space-y-4">
            <div 
              class="border-2 border-dashed rounded-lg p-4 transition-colors cursor-pointer"
              :class="{
                'border-gray-300 hover:border-gray-400': !hasError && !isDisabled,
                'border-red-500': hasError,
                'border-gray-200 bg-gray-50': isDisabled,
                'border-primary': isDragging,
                'cursor-not-allowed': isDisabled
              }"
              @click="open"
              @dragover.prevent
              @drop="drop"
            >
              <div class="text-center">
                <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                  <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                <p class="mt-1 text-sm text-gray-600">
                  {{ hasFiles ? \`\${fileCount} files selected\` : 'Drag and drop files here, or click to select files' }}
                </p>
                <p class="mt-1 text-xs text-gray-500">
                  Any file type
                </p>
              </div>
            </div>

            <div v-if="hasFiles" class="space-y-2">
              <div v-for="file in files" :key="file.name" class="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                <div class="flex items-center space-x-2">
                  <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span class="text-sm text-gray-600">{{ file.name }}</span>
                </div>
                <button 
                  @click="remove(file)"
                  class="text-gray-400 hover:text-red-500 transition-colors"
                  :disabled="isDisabled"
                >
                  <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </template>
      </InputFileHeadless>
    `,
  }),
};

export const WithImagePreview: Story = {
  args: {
    multiple: true,
    size: "md",
    disabled: false,
    error: false,
    accept: "image/*",
  },
  render: (args) => ({
    components: { InputFileHeadless },
    setup() {
      return { args };
    },
    template: `
      <InputFileHeadless v-bind="args">
        <template #default="{ open, files, remove, preview, drop, isDragging, isDisabled, hasError, hasFiles, fileCount }">
          <div class="space-y-4">
            <div 
              class="border-2 border-dashed rounded-lg p-4 transition-colors cursor-pointer"
              :class="{
                'border-gray-300 hover:border-gray-400': !hasError && !isDisabled,
                'border-red-500': hasError,
                'border-gray-200 bg-gray-50': isDisabled,
                'border-primary': isDragging,
                'cursor-not-allowed': isDisabled
              }"
              @click="open"
              @dragover.prevent
              @drop="drop"
            >
              <div class="text-center">
                <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                  <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                <p class="mt-1 text-sm text-gray-600">
                  {{ hasFiles ? \`\${fileCount} images selected\` : 'Drag and drop images here, or click to select' }}
                </p>
                <p class="mt-1 text-xs text-gray-500">
                  Images only
                </p>
              </div>
            </div>

            <div v-if="hasFiles" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              <div v-for="file in files" :key="file.name" class="relative group">
                <img 
                  :src="preview(file)" 
                  :alt="file.name"
                  class="w-full h-32 object-cover rounded-lg"
                />
                <button 
                  @click="remove(file)"
                  class="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  :disabled="isDisabled"
                >
                  <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </template>
      </InputFileHeadless>
    `,
  }),
};

export const WithFileTypeFilter: Story = {
  args: {
    multiple: true,
    size: "md",
    disabled: false,
    error: false,
    filterFileDropped: (file: File) => file.type.startsWith("image/"),
  },
  render: (args) => ({
    components: { InputFileHeadless },
    setup() {
      return { args };
    },
    template: `
      <InputFileHeadless v-bind="args">
        <template #default="{ open, files, remove, preview, drop, isDragging, isDisabled, hasError, hasFiles, fileCount }">
          <div class="space-y-4">
            <div 
              class="border-2 border-dashed rounded-lg p-4 transition-colors cursor-pointer"
              :class="{
                'border-gray-300 hover:border-gray-400': !hasError && !isDisabled,
                'border-red-500': hasError,
                'border-gray-200 bg-gray-50': isDisabled,
                'border-primary': isDragging,
                'cursor-not-allowed': isDisabled
              }"
              @click="open"
              @dragover.prevent
              @drop="drop"
            >
              <div class="text-center">
                <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                  <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                <p class="mt-1 text-sm text-gray-600">
                  {{ hasFiles ? \`\${fileCount} images selected\` : 'Drag and drop images here, or click to select' }}
                </p>
                <p class="mt-1 text-xs text-gray-500">
                  Only image files will be accepted
                </p>
              </div>
            </div>

            <div v-if="hasFiles" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              <div v-for="file in files" :key="file.name" class="relative group">
                <img 
                  :src="preview(file)" 
                  :alt="file.name"
                  class="w-full h-32 object-cover rounded-lg"
                />
                <button 
                  @click="remove(file)"
                  class="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  :disabled="isDisabled"
                >
                  <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </template>
      </InputFileHeadless>
    `,
  }),
};

export const WithCameraCapture: Story = {
  args: {
    multiple: false,
    size: "md",
    disabled: false,
    error: false,
    accept: "image/*",
    capture: "environment",
  },
  render: (args) => ({
    components: { InputFileHeadless },
    setup() {
      return { args };
    },
    template: `
      <InputFileHeadless v-bind="args">
        <template #default="{ open, files, remove, preview, drop, isDragging, isDisabled, hasError, hasFiles, fileCount }">
          <div class="space-y-4">
            <div 
              class="border-2 border-dashed rounded-lg p-4 transition-colors cursor-pointer"
              :class="{
                'border-gray-300 hover:border-gray-400': !hasError && !isDisabled,
                'border-red-500': hasError,
                'border-gray-200 bg-gray-50': isDisabled,
                'border-primary': isDragging,
                'cursor-not-allowed': isDisabled
              }"
              @click="open"
              @dragover.prevent
              @drop="drop"
            >
              <div class="text-center">
                <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                  <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                <p class="mt-1 text-sm text-gray-600">
                  {{ hasFiles ? 'Photo captured' : 'Click to take a photo' }}
                </p>
                <p class="mt-1 text-xs text-gray-500">
                  Using camera
                </p>
              </div>
            </div>

            <div v-if="hasFiles" class="grid grid-cols-1 gap-4">
              <div v-for="file in files" :key="file.name" class="relative group">
                <img 
                  :src="preview(file)" 
                  :alt="file.name"
                  class="w-full h-64 object-cover rounded-lg"
                />
                <button 
                  @click="remove(file)"
                  class="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  :disabled="isDisabled"
                >
                  <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </template>
      </InputFileHeadless>
    `,
  }),
};
