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
  },
  args: {
    multiple: false,
    size: "md",
    disabled: false,
    error: false,
  },
  parameters: {
    docs: {
      description: {
        component:
          "InputFileHeadless is a component that allows users to select files from their device.",
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
        <template #default="{ open, files, remove, preview, drop }">
          <div 
            class="border-2 border-dashed rounded-lg p-4 transition-colors cursor-pointer"
            :class="{
              'border-gray-300 hover:border-gray-400': !args.error && !args.disabled,
              'border-red-500': args.error,
              'border-gray-200 bg-gray-50': args.disabled,
              'cursor-not-allowed': args.disabled
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
                Drag and drop files here, or click to select files
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
        <template #default="{ open, files, remove, preview, drop }">
          <div class="space-y-4">
            <div 
              class="border-2 border-dashed rounded-lg p-4 transition-colors cursor-pointer"
              :class="{
                'border-gray-300 hover:border-gray-400': !args.error && !args.disabled,
                'border-red-500': args.error,
                'border-gray-200 bg-gray-50': args.disabled,
                'cursor-not-allowed': args.disabled
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
                  Drag and drop files here, or click to select files
                </p>
                <p class="mt-1 text-xs text-gray-500">
                  Any file type
                </p>
              </div>
            </div>

            <div v-if="files?.length" class="space-y-2">
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
                  :disabled="args.disabled"
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
