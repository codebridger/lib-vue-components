import type { Meta, StoryObj } from "@storybook/vue3";
import InputFileDropMode from "./InputFileDropMode.vue";

const meta = {
  title: "Elements/InputFileDropMode",
  component: InputFileDropMode,
  tags: ["autodocs"],
  argTypes: {
    icon: {
      control: "text",
      description: "Icon name to display in the drop area",
    },
    label: {
      control: "text",
      description: "Text label to display in the drop area",
    },
    filterFileDropped: {
      control: false,
      description: "Function to filter which files are accepted",
    },
  },
  args: {
    icon: "IconGallery",
    label: "Drop your files",
    filterFileDropped: (file: File) => file.type.startsWith("image/"),
  },
  parameters: {
    docs: {
      description: {
        component: `
      # InputFileDropMode Component

A fullscreen file drop component that allows users to drag and drop files anywhere on the screen. The component provides visual feedback when files are being dragged over and supports file type filtering.

## Features

- **Fullscreen Drop Zone**: Files can be dropped anywhere on the screen
- **Custom Icon**: Optional icon display in the drop area
- **Custom Label**: Customizable text label
- **File Filtering**: Function to filter which files are accepted
- **Visual Feedback**: Shows a semi-transparent overlay when dragging files
- **Smooth Transitions**: Animated transitions for showing/hiding the drop area

## Usage

\`\`\`
<script setup lang="ts">
import InputFileDropMode from './components/InputFileDropMode.vue';

const handleDrop = (files: FileList) => {
  // Handle the dropped files
  console.log(files);
};
</script>

<template>
  <InputFileDropMode
    icon="IconCloudUpload"
    label="Drop your files here"
    :filterFileDropped="(file) => file.type.startsWith('image/')"
    @drop="handleDrop"
  />
</template>`,
      },
      source: { type: "code" },
    },
  },
} satisfies Meta<typeof InputFileDropMode>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const WithCustomIcon: Story = {
  args: {
    icon: "IconCloudUpload",
  },
};

export const WithCustomLabel: Story = {
  args: {
    label: "Drop your files here to upload",
  },
};

export const WithFileFilter: Story = {
  args: {
    filterFileDropped: (file: File) => file.type.startsWith("image/"),
    label: "Drop only image files",
  },
};
