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
    color: {
      control: "select",
      options: [
        "primary",
        "info",
        "success",
        "warning",
        "danger",
        "secondary",
        "dark",
      ],
      description: "The color of the progress bar",
    },
    size: {
      control: "select",
      options: ["default", "sm", "md", "lg", "xl"],
      description: "The size of the progress bar",
    },
    rounded: {
      control: "boolean",
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
    color: "primary",
    size: "default",
    rounded: true,
    striped: false,
    animated: false,
    showLabel: false,
    label: "",
  },
  parameters: {
    docs: {
      description: {
        component: `
A versatile progress bar component with a clean, modern design.

### Features
- Multiple sizes (xs, sm, md, lg, xl)
- Different border radius options
- Built-in RTL support using Tailwind's RTL utilities
- Dark mode support with smooth transitions
- Interactive hover and active states
- Animated progress and striped effects
- Accessible with ARIA attributes
- Labels with customizable text

### Usage
\`\`\`vue
<template>
  <!-- Basic usage -->
  <Progress :value="50" :max="100" />

  <!-- In RTL context (wrap in RTL container) -->
  <div dir="rtl">
    <Progress :value="75" :showLabel="true" />
  </div>

  <!-- With animations -->
  <Progress
    :value="75"
    :striped="true"
    :animated="true"
    :showLabel="true"
  />

  <!-- Dark mode compatible -->
  <Progress
    :value="90"
    color="primary"
    :showLabel="true"
  />
</template>
\`\`\`

### RTL Support
The component uses Tailwind's RTL utilities for bidirectional support:
- \`ltr:origin-left rtl:origin-right\` for proper transform origins
- CSS custom properties for RTL-aware animations
- Automatic support in RTL contexts (no extra props needed)

### Props
- \`value\`: The current progress value (number)
- \`max\`: The maximum progress value (number, default: 100)
- \`size\`: Size of the progress bar (default, sm, md, lg, xl)
- \`rounded\`: Whether to show a rounded progress bar (boolean)
- \`classes\`: Custom CSS classes for wrapper and progress elements
- \`striped\`: Whether to show a striped pattern (boolean)
- \`animated\`: Whether to animate the progress bar (boolean)
- \`showLabel\`: Whether to show a label inside the progress bar (boolean)
- \`label\`: Custom label text (string, defaults to percentage)

### Accessibility
The component includes proper ARIA attributes and follows accessibility best practices:
- \`role="progressbar"\`
- \`aria-valuenow\`: Current progress value
- \`aria-valuemax\`: Maximum progress value
- Automatic RTL support through HTML \`dir\` attribute
- Smooth transitions for visual changes

### Interactions & Animations
The component includes several interactive features:
1. Hover effect: Slight brightness increase
2. Active state: Subtle scale reduction
3. Smooth transitions for:
   - Progress value changes
   - Theme switching
   - Size changes
   - Color changes

### Best Practices
1. Use appropriate sizes based on context
2. Set the correct \`dir\` attribute on a parent container for RTL support
3. Ensure proper color contrast in both light and dark themes
4. Use animations judiciously to avoid overwhelming users
5. Provide clear labels for important progress indicators
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

// Progress Examples
export const ProgressExamples: Story = {
  render: () => ({
    components: { Progress },
    template: `
      <div class="space-y-4">
        <div>
          <h3 class="mb-2">Progress Examples</h3>
          <div class="space-y-2">
            <Progress :value="0" :showLabel="true" />
            <Progress :value="25" :showLabel="true" />
            <Progress :value="50" :showLabel="true" />
            <Progress :value="75" :showLabel="true" />
            <Progress :value="100" :showLabel="true" />
          </div>
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
        <Progress :value="50" size="default" />
        <Progress :value="50" size="sm" />
        <Progress :value="50" size="md" />
        <Progress :value="50" size="lg" />
        <Progress :value="50" size="xl" />
      </div>
    `,
  }),
};

// Striped & Animated Progress Bars
export const StripedAnimated: Story = {
  render: () => ({
    components: { Progress },
    template: `
      <div class="space-y-4">
        <Progress :value="25" :striped="true" :animated="true" :showLabel="true" />
        <Progress :value="50" :striped="true" :animated="true" :showLabel="true" />
        <Progress :value="75" :striped="true" :animated="true" :showLabel="true" />
        <Progress :value="100" :striped="true" :animated="true" :showLabel="true" />
      </div>
    `,
  }),
};
