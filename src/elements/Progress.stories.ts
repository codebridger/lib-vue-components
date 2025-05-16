import type { Meta, StoryObj } from "@storybook/vue3";
import Progress from "./Progress.vue";

const meta = {
  title: "Elements/Progress",
  component: Progress,
  tags: ["autodocs"],
  argTypes: {
    value: {
      control: { type: "range", min: 0, max: 100 },
      description: "The current progress value",
    },
    max: {
      control: { type: "number" },
      description: "The maximum progress value",
    },
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
      description: "The size of the progress bar",
    },
    rounded: {
      control: "select",
      options: ["none", "sm", "md", "lg", "full"],
      description: "The border radius of the progress bar",
    },
    classes: {
      control: "object",
      description: "Custom CSS classes for wrapper and progress elements",
    },
    striped: {
      control: "boolean",
      description: "Whether to show a striped pattern",
    },
    animated: {
      control: "boolean",
      description: "Whether to animate the progress bar",
    },
    showLabel: {
      control: "boolean",
      description: "Whether to show a label inside the progress bar",
    },
    label: {
      control: "text",
      description: "Custom label text (defaults to percentage)",
    },
  },
  args: {
    value: 50,
    max: 100,
  },
  parameters: {
    docs: {
      description: {
        component: `
A versatile progress bar component that automatically changes color based on the progress value.

### Features
- Multiple sizes (xs, sm, md, lg, xl)
- Automatic color changes based on value:
  - Red (< 25%): Indicating initial progress
  - Yellow (25-49%): Indicating moderate progress
  - Blue (50-74%): Indicating significant progress
  - Green (≥ 75%): Indicating near completion or completion
- Different border radius options (none, sm, md, lg, full)
- Custom class support for both wrapper and progress elements
- Dark mode support
- Accessible with ARIA attributes
- Striped progress bars
- Animated progress bars
- Labels inside progress bars

### Usage
\`\`\`vue
<template>
  <!-- Basic usage -->
  <Progress :value="50" :max="100" />

  <!-- With size -->
  <Progress :value="75" size="lg" />

  <!-- With label -->
  <Progress :value="85" :showLabel="true" />

  <!-- Striped and animated -->
  <Progress
    :value="75"
    :striped="true"
    :animated="true"
  />

  <!-- With custom label -->
  <Progress
    :value="90"
    :showLabel="true"
    label="Loading..."
  />
</template>
\`\`\`

### Props
- \`value\`: The current progress value (number)
- \`max\`: The maximum progress value (number, default: 100)
- \`size\`: Size of the progress bar (xs, sm, md, lg, xl)
- \`rounded\`: Border radius (none, sm, md, lg, full)
- \`classes\`: Custom CSS classes for wrapper and progress elements
- \`striped\`: Whether to show a striped pattern (boolean)
- \`animated\`: Whether to animate the progress bar (boolean)
- \`showLabel\`: Whether to show a label inside the progress bar (boolean)
- \`label\`: Custom label text (string, defaults to percentage)

### Accessibility
The component includes proper ARIA attributes:
- \`role="progressbar"\`
- \`aria-valuenow\`: Current progress value
- \`aria-valuemax\`: Maximum progress value

### Best Practices
1. Always provide a meaningful value and max for progress bars
2. Consider using labels for important progress indicators
3. Use animations to indicate ongoing processes
4. Choose appropriate sizes based on context
5. Ensure proper color contrast for accessibility
`,
      },
      source: {
        type: "code",
      },
    },
  },
} satisfies Meta<typeof Progress>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic Progress Bar
export const Default: Story = {
  args: {
    value: 50,
    max: 100,
  },
};

// Different Values
export const Values: Story = {
  render: () => ({
    components: { Progress },
    template: `
      <div class="space-y-4">
        <div>
          <h3 class="mb-2">Initial Progress (< 25%)</h3>
          <Progress :value="20" :showLabel="true" />
        </div>
        <div>
          <h3 class="mb-2">Moderate Progress (25-49%)</h3>
          <Progress :value="40" :showLabel="true" />
        </div>
        <div>
          <h3 class="mb-2">Significant Progress (50-74%)</h3>
          <Progress :value="60" :showLabel="true" />
        </div>
        <div>
          <h3 class="mb-2">Near Completion (≥ 75%)</h3>
          <Progress :value="85" :showLabel="true" />
        </div>
      </div>
    `,
  }),
};

// Different Sizes
export const Sizes: Story = {
  render: () => ({
    components: { Progress },
    template: `
      <div class="space-y-4">
        <Progress :value="50" size="xs" />
        <Progress :value="50" size="sm" />
        <Progress :value="50" size="md" />
        <Progress :value="50" size="lg" />
        <Progress :value="50" size="xl" />
      </div>
    `,
  }),
};

// Different Border Radius
export const BorderRadius: Story = {
  render: () => ({
    components: { Progress },
    template: `
      <div class="space-y-4">
        <Progress :value="50" rounded="none" />
        <Progress :value="50" rounded="sm" />
        <Progress :value="50" rounded="md" />
        <Progress :value="50" rounded="lg" />
        <Progress :value="50" rounded="full" />
      </div>
    `,
  }),
};

// Striped Progress Bars
export const Striped: Story = {
  render: () => ({
    components: { Progress },
    template: `
      <div class="space-y-4">
        <Progress :value="20" :striped="true" :showLabel="true" />
        <Progress :value="40" :striped="true" :showLabel="true" />
        <Progress :value="60" :striped="true" :showLabel="true" />
        <Progress :value="85" :striped="true" :showLabel="true" />
      </div>
    `,
  }),
};

// Animated Progress Bars
export const Animated: Story = {
  render: () => ({
    components: { Progress },
    template: `
      <div class="space-y-4">
        <Progress :value="20" :striped="true" :animated="true" :showLabel="true" />
        <Progress :value="40" :striped="true" :animated="true" :showLabel="true" />
        <Progress :value="60" :striped="true" :animated="true" :showLabel="true" />
        <Progress :value="85" :striped="true" :animated="true" :showLabel="true" />
      </div>
    `,
  }),
};

// Labeled Progress Bars
export const Labels: Story = {
  render: () => ({
    components: { Progress },
    template: `
      <div class="space-y-4">
        <Progress :value="20" :showLabel="true" />
        <Progress :value="40" :showLabel="true" label="Loading..." />
        <Progress :value="60" :showLabel="true" label="Uploading" />
        <Progress :value="85" :showLabel="true" label="Almost Done" />
      </div>
    `,
  }),
};
