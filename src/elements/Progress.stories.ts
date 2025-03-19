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
    contrast: {
      control: "select",
      options: ["default", "contrast"],
      description: "The contrast level of the progress bar",
    },
    color: {
      control: "select",
      options: [
        "primary",
        "info",
        "success",
        "warning",
        "danger",
        "light",
        "dark",
        "black",
      ],
      description: "The color of the progress bar",
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
  },
  args: {
    value: 50,
    max: 100,
  },
  parameters: {
    docs: {
      description: {
        component: `
A versatile progress bar component that supports various styles, sizes, and states.

### Features
- Multiple sizes (xs, sm, md, lg, xl)
- Various color options (primary, info, success, warning, danger, light, dark, black)
- Different border radius options (none, sm, md, lg, full)
- Contrast levels (default, contrast)
- Indeterminate state support
- Custom class support for both wrapper and progress elements
- Dark mode support
- Accessible with ARIA attributes

### Usage
\`\`\`vue
<template>
  <!-- Basic usage -->
  <Progress :value="50" :max="100" />

  <!-- With color and size -->
  <Progress value="75" color="success" size="lg" />

  <!-- Indeterminate state -->
  <Progress :value="undefined" color="info" />

  <!-- Custom styling -->
  <Progress
    value="85"
    color="primary"
    rounded="lg"
    contrast="contrast"
    :classes="{
      wrapper: 'bg-gray-100 p-4 rounded-lg',
      progress: 'shadow-lg'
    }"
  />
</template>
\`\`\`

### Props
- \`value\`: The current progress value (number)
- \`max\`: The maximum progress value (number, default: 100)
- \`size\`: Size of the progress bar (xs, sm, md, lg, xl)
- \`color\`: Color variant (primary, info, success, warning, danger, light, dark, black)
- \`rounded\`: Border radius (none, sm, md, lg, full)
- \`contrast\`: Contrast level (default, contrast)
- \`classes\`: Custom CSS classes for wrapper and progress elements

### Accessibility
The component includes proper ARIA attributes:
- \`role="progressbar"\`
- \`aria-valuenow\`: Current progress value
- \`aria-valuemax\`: Maximum progress value

### Best Practices
1. Always provide a meaningful value and max for determinate progress bars
2. Use indeterminate state when progress cannot be measured
3. Choose appropriate contrast levels based on background color
4. Consider using custom classes for specific styling needs
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

// Different Sizes
export const Sizes: Story = {
  args: {
    value: 50,
    max: 100,
  },
  render: () => ({
    components: { Progress },
    template: `
      <div class="space-y-4">
        <Progress value="50" size="xs" />
        <Progress value="50" size="sm" />
        <Progress value="50" size="md" />
        <Progress value="50" size="lg" />
        <Progress value="50" size="xl" />
      </div>
    `,
  }),
};

// Different Colors
export const Colors: Story = {
  args: {
    value: 50,
    max: 100,
  },
  render: () => ({
    components: { Progress },
    template: `
      <div class="space-y-4">
        <Progress value="50" color="primary" />
        <Progress value="50" color="info" />
        <Progress value="50" color="success" />
        <Progress value="50" color="warning" />
        <Progress value="50" color="danger" />
        <Progress value="50" color="light" />
        <Progress value="50" color="dark" />
        <Progress value="50" color="black" />
      </div>
    `,
  }),
};

// Different Border Radius
export const BorderRadius: Story = {
  args: {
    value: 50,
    max: 100,
  },
  render: () => ({
    components: { Progress },
    template: `
      <div class="space-y-4">
        <Progress value="50" rounded="none" />
        <Progress value="50" rounded="sm" />
        <Progress value="50" rounded="md" />
        <Progress value="50" rounded="lg" />
        <Progress value="50" rounded="full" />
      </div>
    `,
  }),
};

// Different Contrast Levels
export const Contrast: Story = {
  args: {
    value: 50,
    max: 100,
  },
  render: () => ({
    components: { Progress },
    template: `
      <div class="space-y-4">
        <Progress value="50" contrast="default" />
        <Progress value="50" contrast="contrast" />
      </div>
    `,
  }),
};

// Indeterminate Progress
export const Indeterminate: Story = {
  args: {
    value: 0,
    max: 100,
  },
  render: () => ({
    components: { Progress },
    template: `
      <Progress :value="undefined" max="100" />
    `,
  }),
};

// Custom Classes
export const CustomClasses: Story = {
  args: {
    value: 75,
    max: 100,
    classes: {
      wrapper: "bg-gray-100 p-4 rounded-lg",
      progress: "shadow-lg",
    },
  },
};

// Complete Example
export const CompleteExample: Story = {
  args: {
    value: 50,
    max: 100,
  },
  render: () => ({
    components: { Progress },
    template: `
      <div class="space-y-8 p-4">
        <div>
          <h3 class="mb-2">Basic Progress</h3>
          <Progress value="30" />
        </div>
        
        <div>
          <h3 class="mb-2">Success Progress</h3>
          <Progress value="70" color="success" />
        </div>
        
        <div>
          <h3 class="mb-2">Large Warning Progress</h3>
          <Progress value="45" color="warning" size="lg" />
        </div>
        
        <div>
          <h3 class="mb-2">Indeterminate Progress</h3>
          <Progress :value="undefined" color="info" />
        </div>
        
        <div>
          <h3 class="mb-2">Custom Styled Progress</h3>
          <Progress 
            value="85" 
            color="primary" 
            size="md" 
            rounded="lg"
            contrast="contrast"
            :classes="{
              wrapper: 'bg-gray-100 p-4 rounded-lg',
              progress: 'shadow-lg'
            }"
          />
        </div>
      </div>
    `,
  }),
};
