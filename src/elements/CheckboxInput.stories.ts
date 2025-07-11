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
    text: {
      control: "text",
      description: "Text displayed next to the checkbox",
    },
    value: {
      control: "text",
      description: "Value of the checkbox",
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
      description: "Color variant for checkbox",
    },
    variant: {
      control: "select",
      options: ["default", "outline", "rounded", "outline-rounded"],
      description: "Visual variant of checkbox",
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
      description: "ID for the checkbox",
    },
  },
  args: {
    label: "Checkbox Label",
    text: "Checkbox Text",
    value: "checkbox-value",
    color: "primary",
    variant: "default",
    disabled: false,
    required: false,
    error: false,
    errorMessage: "",
    id: "checkbox-input",
  },
  parameters: {
    docs: {
      description: {
        component: `
# CheckboxInput Component

A flexible single checkbox component that supports various visual variants, color schemes, and states. This component is built with accessibility in mind and supports form validation states.

## Features
- Single checkbox with customizable text
- Various color variants (primary, success, secondary, danger, warning, info, dark)
- Visual variants (default, outline, rounded, outline-rounded)
- Error state with custom error message
- Disabled state
- Required field indicator
- Fully reactive with Vue's v-model
- Change events
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

## Usage with Multiple Options
To create a checkbox group, you can loop through multiple options:

\`\`\`vue
<template>
  <div class="space-y-2">
    <CheckboxInput
      v-for="option in options"
      :key="option.value"
      v-model="selectedValues[option.value]"
      :text="option.label"
      :value="option.value"
      :label="option.label"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import CheckboxInput from './CheckboxInput.vue'

const options = [
  { label: 'Option 1', value: 'opt1' },
  { label: 'Option 2', value: 'opt2' },
  { label: 'Option 3', value: 'opt3' }
]

const selectedValues = ref({})
</script>
\`\`\`
        `,
      },
    },
  },
} satisfies Meta<typeof CheckboxInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    text: "Accept terms and conditions",
    value: "terms",
  },
  parameters: {
    docs: {
      description: {
        story: "Default checkbox with primary color and standard styling.",
      },
      source: { type: "code" },
    },
  },
};

export const WithLabel: Story = {
  args: {
    label: "Terms and Conditions",
    text: "I agree to the terms and conditions",
    value: "terms",
    id: "terms-checkbox",
  },
  parameters: {
    docs: {
      description: {
        story: "Checkbox with a descriptive label to improve accessibility.",
      },
      source: { type: "code" },
    },
  },
};

export const SuccessColor: Story = {
  args: {
    label: "Success Variant",
    text: "Task completed successfully",
    color: "success",
    value: "completed",
  },
  parameters: {
    docs: {
      description: {
        story: "Checkbox with success color variant.",
      },
      source: { type: "code" },
    },
  },
};

export const DangerColor: Story = {
  args: {
    label: "Danger Variant",
    text: "Delete this item permanently",
    color: "danger",
    value: "delete",
  },
  parameters: {
    docs: {
      description: {
        story: "Checkbox with danger color variant.",
      },
      source: { type: "code" },
    },
  },
};

export const OutlineVariant: Story = {
  args: {
    label: "Outline Variant",
    text: "Enable notifications",
    variant: "outline",
    value: "notifications",
  },
  parameters: {
    docs: {
      description: {
        story: "Checkbox with outline styling variant.",
      },
      source: { type: "code" },
    },
  },
};

export const RoundedVariant: Story = {
  args: {
    label: "Rounded Variant",
    text: "Subscribe to newsletter",
    variant: "rounded",
    value: "newsletter",
  },
  parameters: {
    docs: {
      description: {
        story: "Checkbox with rounded corners variant.",
      },
      source: { type: "code" },
    },
  },
};

export const OutlineRoundedVariant: Story = {
  args: {
    label: "Outline Rounded Variant",
    text: "Enable dark mode",
    variant: "outline-rounded",
    value: "dark-mode",
  },
  parameters: {
    docs: {
      description: {
        story: "Checkbox with combined outline and rounded styling.",
      },
      source: { type: "code" },
    },
  },
};

export const Disabled: Story = {
  args: {
    label: "Disabled Checkbox",
    text: "This option is currently unavailable",
    disabled: true,
    value: "disabled-option",
  },
  parameters: {
    docs: {
      description: {
        story: "Checkbox in disabled state.",
      },
      source: { type: "code" },
    },
  },
};

export const WithError: Story = {
  args: {
    label: "Checkbox with Error",
    text: "Accept terms and conditions",
    error: true,
    errorMessage: "You must accept the terms to continue",
    value: "terms",
  },
  parameters: {
    docs: {
      description: {
        story: "Checkbox with error state and error message.",
      },
      source: { type: "code" },
    },
  },
};

export const Required: Story = {
  args: {
    label: "Required Checkbox",
    text: "I confirm that I am over 18 years old",
    required: true,
    value: "age-confirmation",
  },
  parameters: {
    docs: {
      description: {
        story: "Checkbox marked as required with asterisk indicator.",
      },
      source: { type: "code" },
    },
  },
};

export const MultipleCheckboxes: Story = {
  render: () => ({
    components: { CheckboxInput },
    setup() {
      const selectedValues = ref({
        notifications: false,
        newsletter: false,
        marketing: false,
        updates: false,
      });

      const options = [
        {
          label: "Email Notifications",
          value: "notifications",
          text: "Receive email notifications",
        },
        {
          label: "Newsletter",
          value: "newsletter",
          text: "Subscribe to our newsletter",
        },
        {
          label: "Marketing",
          value: "marketing",
          text: "Receive marketing communications",
        },
        { label: "Updates", value: "updates", text: "Get product updates" },
      ];

      return {
        selectedValues,
        options,
      };
    },
    template: `
      <div class="space-y-4">
        <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100">Communication Preferences</h3>
        <div class="space-y-3">
          <CheckboxInput
            v-for="option in options"
            :key="option.value"
            v-model="selectedValues[option.value]"
            :text="option.text"
            :value="option.value"
            :label="option.label"
            color="primary"
          />
        </div>
        <div class="mt-4 p-3 bg-gray-100 dark:bg-gray-800 rounded">
          <p class="text-sm text-gray-600 dark:text-gray-400">
            Selected: {{ Object.keys(selectedValues).filter(key => selectedValues[key]).join(', ') || 'None' }}
          </p>
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story:
          "Example of how to use multiple CheckboxInput components to create a checkbox group.",
      },
      source: { type: "code" },
    },
  },
};
