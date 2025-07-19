import type { Meta, StoryObj } from "@storybook/vue3";
import CheckboxInput from "./CheckboxInput.vue";
import { ref } from "vue";

const meta: Meta<typeof CheckboxInput> = {
  title: "Elements/CheckboxInput",
  component: CheckboxInput,
  tags: ["autodocs"],
  argTypes: {
    label: {
      control: "text",
      description: "Label for the checkbox group",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "undefined" },
      },
    },
    text: {
      control: "text",
      description: "Text displayed next to the checkbox",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "undefined" },
      },
    },
    value: {
      control: "text",
      description: "Value of the checkbox",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "undefined" },
      },
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
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "primary" },
      },
    },
    variant: {
      control: "select",
      options: ["default", "outline", "rounded", "outline-rounded"],
      description: "Visual variant of checkbox",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "default" },
      },
    },
    disabled: {
      control: "boolean",
      description: "Disabled state",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    required: {
      control: "boolean",
      description: "Required state",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    error: {
      control: "boolean",
      description: "Error state",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    errorMessage: {
      control: "text",
      description: "Error message text",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "undefined" },
      },
    },
    id: {
      control: "text",
      description: "ID for the checkbox",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "undefined" },
      },
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
      source: {
        type: "code",
      },
      description: {
        component: `
A flexible single checkbox component that supports various visual variants, color schemes, and states. 
The component features:

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

## Usage

The CheckboxInput component can be used for single checkbox selections:

\`\`\`vue
<CheckboxInput
  v-model="isChecked"
  text="Accept terms and conditions"
  value="terms"
  color="primary"
  variant="default"
/>
\`\`\`

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
`,
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof CheckboxInput>;

export const Default: Story = {
  render: (args) => ({
    components: { CheckboxInput },
    setup() {
      const isChecked = ref(false);
      return { args, isChecked };
    },
    template: `
      <CheckboxInput 
        v-bind="args"
        v-model="isChecked"
        text="Accept terms and conditions"
        value="terms"
      />
    `,
  }),
};

export const WithLabel: Story = {
  args: {
    label: "Terms and Conditions",
    text: "I agree to the terms and conditions",
    value: "terms",
    id: "terms-checkbox",
  },
  render: (args) => ({
    components: { CheckboxInput },
    setup() {
      const isChecked = ref(false);
      return { args, isChecked };
    },
    template: `
      <CheckboxInput 
        v-bind="args"
        v-model="isChecked"
      />
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: "A checkbox with a label and descriptive text for form sections",
      },
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
  render: (args) => ({
    components: { CheckboxInput },
    setup() {
      const isChecked = ref(true);
      return { args, isChecked };
    },
    template: `
      <CheckboxInput 
        v-bind="args"
        v-model="isChecked"
      />
    `,
  }),
  parameters: {
    docs: {
      description: {
        story:
          "A checkbox using the success color variant for positive confirmations",
      },
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
  render: (args) => ({
    components: { CheckboxInput },
    setup() {
      const isChecked = ref(false);
      return { args, isChecked };
    },
    template: `
      <CheckboxInput 
        v-bind="args"
        v-model="isChecked"
      />
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: "A checkbox combining outline styling with rounded corners",
      },
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
  render: (args) => ({
    components: { CheckboxInput },
    setup() {
      const isChecked = ref(false);
      return { args, isChecked };
    },
    template: `
      <CheckboxInput 
        v-bind="args"
        v-model="isChecked"
      />
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: "A disabled checkbox that cannot be interacted with",
      },
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
  render: (args) => ({
    components: { CheckboxInput },
    setup() {
      const isChecked = ref(false);
      return { args, isChecked };
    },
    template: `
      <CheckboxInput 
        v-bind="args"
        v-model="isChecked"
      />
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: "A checkbox in an error state with a validation message",
      },
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
  render: (args) => ({
    components: { CheckboxInput },
    setup() {
      const isChecked = ref(false);
      return { args, isChecked };
    },
    template: `
      <CheckboxInput 
        v-bind="args"
        v-model="isChecked"
      />
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: "A required checkbox with a required field indicator",
      },
    },
  },
};

export const MultipleCheckboxes: Story = {
  render: (args) => ({
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
        {
          label: "Updates",
          value: "updates",
          text: "Get product updates",
        },
      ];

      return {
        args,
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
          "Multiple checkboxes demonstrating how to create a checkbox group with reactive state tracking",
      },
    },
  },
};
