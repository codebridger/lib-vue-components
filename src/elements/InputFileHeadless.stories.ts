import type { Meta, StoryObj } from "@storybook/vue3";
import InputFileHeadless from "./InputFileHeadless.vue";
import { ref } from "vue";

const meta = {
  title: "Elements/InputFileHeadless",
  component: InputFileHeadless,
  tags: ["autodocs"],
  argTypes: {
    multiple: {
      control: "boolean",
      description: "Allow multiple file selection",
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
    filterFileDropped: {
      control: false,
      description: "Function to filter which files are accepted",
    },
  },
  args: {
    multiple: false,
    disabled: false,
    error: false,
    accept: undefined,
    filterFileDropped: () => true,
  },
  parameters: {
    docs: {
      description: {
        component: `
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
    disabled: false,
    error: false,
  },
  render: (args) => ({
    components: { InputFileHeadless },
    setup() {
      const files = ref([]);
      return { args, files };
    },
    template: `
      <InputFileHeadless v-bind="args" v-model="files">
        <template #default="{ open, files, remove, preview, drop, isDisabled, fileCount, hasFiles, id, el }">
          <div 
            class="border-2 border-dashed rounded-lg p-4 transition-colors"
            :class="{
              'border-gray-300 hover:border-gray-400 cursor-pointer': !args.error && !isDisabled,
              'border-red-500 cursor-pointer': args.error && !isDisabled,
              'border-gray-200 bg-gray-50 cursor-not-allowed': isDisabled,
              'border-primary': false
            }"
            @click="!isDisabled && open()"
            @dragover.prevent
            @drop="!isDisabled && drop($event)"
          >
            <div class="text-center">
              <svg class="mx-auto h-12 w-12" :class="{'text-gray-400': !isDisabled, 'text-gray-300': isDisabled}" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              <p class="mt-1 text-sm" :class="{'text-gray-600': !isDisabled, 'text-gray-400': isDisabled}">
                {{ hasFiles ? \`\${fileCount} files selected\` : 'Drag and drop files here, or click to select files' }}
              </p>
              <p class="mt-1 text-xs" :class="{'text-gray-500': !isDisabled, 'text-gray-400': isDisabled}">
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
    disabled: false,
    error: false,
  },
  render: (args) => ({
    components: { InputFileHeadless },
    setup() {
      const files = ref([]);
      return { args, files };
    },
    template: `
      <InputFileHeadless v-bind="args" v-model="files">
        <template #default="{ open, files, remove, preview, drop, isDisabled, fileCount, hasFiles, id, el }">
          <div 
            class="border-2 border-dashed rounded-lg p-4 transition-colors"
            :class="{
              'border-gray-300 hover:border-gray-400 cursor-pointer': !args.error && !isDisabled,
              'border-red-500 cursor-pointer': args.error && !isDisabled,
              'border-gray-200 bg-gray-50 cursor-not-allowed': isDisabled,
              'border-primary': false
            }"
            @click="!isDisabled && open()"
            @dragover.prevent
            @drop="!isDisabled && drop($event)"
          >
            <div class="text-center">
              <svg class="mx-auto h-12 w-12" :class="{'text-gray-400': !isDisabled, 'text-gray-300': isDisabled}" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              <p class="mt-1 text-sm" :class="{'text-gray-600': !isDisabled, 'text-gray-400': isDisabled}">
                {{ hasFiles ? \`\${fileCount} files selected\` : 'Drag and drop files here, or click to select files' }}
              </p>
              <p class="mt-1 text-xs" :class="{'text-gray-500': !isDisabled, 'text-gray-400': isDisabled}">
                Any file type
              </p>
            </div>
          </div>
        </template>
      </InputFileHeadless>
    `,
  }),
};

export const Disabled: Story = {
  args: {
    multiple: false,
    disabled: true,
    error: false,
  },
  render: (args) => ({
    components: { InputFileHeadless },
    setup() {
      const files = ref([]);
      return { args, files };
    },
    template: `
      <InputFileHeadless v-bind="args" v-model="files">
        <template #default="{ open, files, remove, preview, drop, isDisabled, fileCount, hasFiles, id, el }">
          <div 
            class="border-2 border-dashed rounded-lg p-4 transition-colors"
            :class="{
              'border-gray-300 hover:border-gray-400 cursor-pointer': !args.error && !isDisabled,
              'border-red-500 cursor-pointer': args.error && !isDisabled,
              'border-gray-200 bg-gray-50 cursor-not-allowed': isDisabled,
              'border-primary': false
            }"
            @click="!isDisabled && open()"
            @dragover.prevent
            @drop="!isDisabled && drop($event)"
          >
            <div class="text-center">
              <svg class="mx-auto h-12 w-12" :class="{'text-gray-400': !isDisabled, 'text-gray-300': isDisabled}" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              <p class="mt-1 text-sm" :class="{'text-gray-600': !isDisabled, 'text-gray-400': isDisabled}">
                {{ hasFiles ? \`\${fileCount} files selected\` : 'Drag and drop files here, or click to select files' }}
              </p>
              <p class="mt-1 text-xs" :class="{'text-gray-500': !isDisabled, 'text-gray-400': isDisabled}">
                Any file type
              </p>
            </div>
          </div>
        </template>
      </InputFileHeadless>
    `,
  }),
};

export const Error: Story = {
  args: {
    multiple: false,
    disabled: false,
    error: true,
  },
  render: (args) => ({
    components: { InputFileHeadless },
    setup() {
      const files = ref([]);
      return { args, files };
    },
    template: `
      <InputFileHeadless v-bind="args" v-model="files">
        <template #default="{ open, files, remove, preview, drop, isDisabled, fileCount, hasFiles, id, el }">
          <div 
            class="border-2 border-dashed rounded-lg p-4 transition-colors"
            :class="{
              'border-gray-300 hover:border-gray-400 cursor-pointer': !args.error && !isDisabled,
              'border-red-500 cursor-pointer': args.error && !isDisabled,
              'border-gray-200 bg-gray-50 cursor-not-allowed': isDisabled,
              'border-primary': false
            }"
            @click="!isDisabled && open()"
            @dragover.prevent
            @drop="!isDisabled && drop($event)"
          >
            <div class="text-center">
              <svg class="mx-auto h-12 w-12" :class="{'text-gray-400': !isDisabled, 'text-gray-300': isDisabled}" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              <p class="mt-1 text-sm" :class="{'text-gray-600': !isDisabled, 'text-gray-400': isDisabled}">
                {{ hasFiles ? \`\${fileCount} files selected\` : 'Drag and drop files here, or click to select files' }}
              </p>
              <p class="mt-1 text-xs" :class="{'text-gray-500': !isDisabled, 'text-gray-400': isDisabled}">
                Any file type
              </p>
            </div>
          </div>
        </template>
      </InputFileHeadless>
    `,
  }),
};
