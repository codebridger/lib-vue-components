import type { Meta, StoryObj } from "@storybook/vue3";
import CheckboxInput from "./CheckboxInput.vue";
import { ref } from "vue";

const meta = {
  title: "Elements/CheckboxInput",
  component: CheckboxInput,
  tags: ["autodocs"],
  argTypes: {
    label: {
      control: "text",
      description: "Label for the checkbox group",
    },
    color: {
      control: "select",
      options: [
        "primary",
        "success",
        "secondary",
        "danger",
        "warning",
        "info",
        "dark",
      ],
      description: "Color variant for checkboxes",
    },
    variant: {
      control: "select",
      options: ["default", "outline", "rounded", "outline-rounded"],
      description: "Visual variant of checkboxes",
    },
    disabled: {
      control: "boolean",
      description: "Disabled state",
    },
    required: {
      control: "boolean",
      description: "Required state",
    },
    error: {
      control: "boolean",
      description: "Error state",
    },
    errorMessage: {
      control: "text",
      description: "Error message text",
    },
    id: {
      control: "text",
      description: "ID for the checkbox group",
    },
  },
  args: {
    label: "Select Options",
    color: "primary",
    variant: "default",
    disabled: false,
    required: false,
    error: false,
    errorMessage: "",
    id: "checkbox-group",
  },
  parameters: {
    docs: {
      description: {
        component: `
# CheckboxInput Component

A flexible checkbox group component that supports various visual variants, color schemes, and states. This component is built with accessibility in mind and supports form validation states.

## Features
- Multiple checkbox options with labels
- Various color variants (primary, success, secondary, danger, warning, info, dark)
- Visual variants (default, outline, rounded, outline-rounded)
- Error state with custom error message
- Disabled state
- Required field indicator
- Fully reactive with Vue's v-model
- Individual checkbox change events
- RTL support with proper directional styling
- Dark theme support
- Smooth transitions and hover effects

## Variants
- **Default**: Standard checkbox appearance
- **Outline**: Checkbox with outline styling
- **Rounded**: Checkbox with rounded corners
- **Outline Rounded**: Combination of outline and rounded styles

## Colors
- **Primary**: Default primary color
- **Success**: Green color for success states
- **Secondary**: Secondary color variant
- **Danger**: Red color for error/danger states
- **Warning**: Orange color for warning states
- **Info**: Blue color for informational states
- **Dark**: Dark color variant

## RTL Support
The component automatically adapts to RTL layouts using Tailwind's RTL utilities:
- Text spacing adjusts automatically (ltr:ml-2 rtl:mr-2)
- All directional styles are RTL-aware

## Theme Support
Supports both light and dark themes:
- Labels and text adapt to theme colors
- Checkbox styling remains consistent across themes
        `,
      },
    },
  },
} satisfies Meta<typeof CheckboxInput>;

export default meta;
type Story = StoryObj<typeof meta>;

// Sample options for all stories
const sampleOptions = [
  { label: "Primary", value: "primary" },
  { label: "Success", value: "success" },
  { label: "Secondary", value: "secondary" },
  { label: "Danger", value: "danger" },
  { label: "Warning", value: "warning" },
  { label: "Info", value: "info" },
  { label: "Dark", value: "dark" },
];

export const Default: Story = {
  args: {
    options: sampleOptions,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Default checkbox group with primary color and standard styling.",
      },
      source: { type: "code" },
    },
  },
};

export const WithLabel: Story = {
  args: {
    label: "Select your preferences",
    options: sampleOptions,
    id: "preferences-checkbox",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Checkbox group with a descriptive label to improve accessibility.",
      },
      source: { type: "code" },
    },
  },
};

export const SuccessColor: Story = {
  args: {
    label: "Success Variant",
    color: "success",
    options: sampleOptions,
  },
  parameters: {
    docs: {
      description: {
        story: "Checkbox group with success color variant.",
      },
      source: { type: "code" },
    },
  },
};

export const DangerColor: Story = {
  args: {
    label: "Danger Variant",
    color: "danger",
    options: sampleOptions,
  },
  parameters: {
    docs: {
      description: {
        story: "Checkbox group with danger color variant.",
      },
      source: { type: "code" },
    },
  },
};

export const OutlineVariant: Story = {
  args: {
    label: "Outline Variant",
    variant: "outline",
    options: sampleOptions,
  },
  parameters: {
    docs: {
      description: {
        story: "Checkbox group with outline styling variant.",
      },
      source: { type: "code" },
    },
  },
};

export const RoundedVariant: Story = {
  args: {
    label: "Rounded Variant",
    variant: "rounded",
    options: sampleOptions,
  },
  parameters: {
    docs: {
      description: {
        story: "Checkbox group with rounded corners variant.",
      },
      source: { type: "code" },
    },
  },
};

export const OutlineRoundedVariant: Story = {
  args: {
    label: "Outline Rounded Variant",
    variant: "outline-rounded",
    options: sampleOptions,
  },
  parameters: {
    docs: {
      description: {
        story: "Checkbox group with combined outline and rounded styling.",
      },
      source: { type: "code" },
    },
  },
};

export const Disabled: Story = {
  args: {
    label: "Disabled Checkboxes",
    disabled: true,
    options: sampleOptions,
  },
  parameters: {
    docs: {
      description: {
        story: "Checkbox group in disabled state.",
      },
      source: { type: "code" },
    },
  },
};

export const WithError: Story = {
  args: {
    label: "Checkbox Group with Error",
    error: true,
    errorMessage: "Please select at least one option",
    options: sampleOptions,
  },
  parameters: {
    docs: {
      description: {
        story: "Checkbox group with error state and error message.",
      },
      source: { type: "code" },
    },
  },
};

export const Required: Story = {
  args: {
    label: "Required Checkbox Group",
    required: true,
    options: sampleOptions,
  },
  parameters: {
    docs: {
      description: {
        story: "Checkbox group marked as required with asterisk indicator.",
      },
      source: { type: "code" },
    },
  },
};
