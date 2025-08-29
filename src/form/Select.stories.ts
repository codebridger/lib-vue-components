import type { Meta, StoryObj } from "@storybook/vue3";
import { ref } from "vue";
import Select from "./Select.vue";

const meta = {
  title: "Form/Select",
  component: Select,
  tags: ["autodocs"],
  argTypes: {
    modelValue: {
      control: "text",
      description: "The v-model value for the select component",
    },
    options: {
      control: "object",
      description: "Array of options to display in the dropdown",
    },
    placeholder: {
      control: "text",
      description: "Placeholder text when no option is selected",
    },
    disabled: {
      control: "boolean",
      description: "Whether the select component is disabled",
    },
    required: {
      control: "boolean",
      description: "Whether the field is required (shows asterisk)",
    },
    error: {
      control: "boolean",
      description: "Whether to show error styling",
    },
    errorMessage: {
      control: "text",
      description: "Error message to display below the select",
    },
    label: {
      control: "text",
      description: "Label text for the select field",
    },
    id: {
      control: "text",
      description: "Unique identifier for the select field",
    },
    searchable: {
      control: "boolean",
      description: "Whether to show a search input in the dropdown",
    },
    searchPlaceholder: {
      control: "text",
      description: "Placeholder text for the search input",
    },
    multiple: {
      control: "boolean",
      description: "Whether to allow multiple option selection",
    },
    grouped: {
      control: "boolean",
      description: "Whether options are grouped",
    },
    groupLabel: {
      control: "text",
      description: "Property name for group labels when grouped is true",
    },
    groupValues: {
      control: "text",
      description: "Property name for group option arrays when grouped is true",
    },
    trackBy: {
      control: "text",
      description: "Property name to use for option identification",
    },
    labelKey: {
      control: "text",
      description: "Property name to use for option display text",
    },
    valueKey: {
      control: "text",
      description: "Property name to use for option values",
    },
    noOptionsMessage: {
      control: "text",
      description: "Message to show when no options are available",
    },
    iconName: {
      control: "text",
      description: "Name of the icon to display",
    },
    iconOppositePosition: {
      control: "boolean",
      description: "Whether to position icon on the opposite side",
    },
    preselectFirst: {
      control: "boolean",
      description: "Whether to automatically select the first option",
    },
    allowEmpty: {
      control: "boolean",
      description: "Whether to allow no selection",
    },
    "onUpdate:modelValue": {
      action: "update:modelValue",
      description: "Event emitted when value changes",
      table: {
        category: "events",
        type: { summary: "any" },
      },
    },
    onChange: {
      action: "change",
      description: "Event emitted when selection changes",
      table: {
        category: "events",
        type: { summary: "any" },
      },
    },
    onOpen: {
      action: "open",
      description: "Event emitted when dropdown opens",
      table: {
        category: "events",
      },
    },
    onClose: {
      action: "close",
      description: "Event emitted when dropdown closes",
      table: {
        category: "events",
      },
    },
  },
  args: {
    placeholder: "Select an option",
    disabled: false,
    required: false,
    error: false,
    errorMessage: "",
    label: "",
    id: "",
    searchable: false,
    searchPlaceholder: "Search...",
    multiple: false,
    grouped: false,
    groupLabel: "group_name",
    groupValues: "list",
    trackBy: "value",
    labelKey: "label",
    valueKey: "value",
    noOptionsMessage: "No options available",
    iconName: "",
    iconOppositePosition: false,
    preselectFirst: false,
    allowEmpty: true,
  },
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
# Select Component

A flexible and accessible select dropdown component that supports single and multiple selection, search functionality, grouped options, and various customization options.

## Features

- **Single & Multiple Selection**: Support for both single choice and multiple choice selection
- **Search Functionality**: Built-in search with real-time filtering
- **Grouped Options**: Organize options into logical groups
- **Customizable Display**: Configure how options are displayed and identified
- **Accessibility**: Full ARIA support and keyboard navigation
- **Theme Support**: Light/dark mode and RTL layout support
- **Icon Integration**: Optional icon support with flexible positioning
- **Validation States**: Error styling and message display
- **Keyboard Navigation**: Full keyboard support for accessibility

## Usage

\`\`\`vue
<template>
  <Select
    v-model="selectedValue"
    :options="options"
    label="Choose an option"
    placeholder="Select..."
  />
</template>

<script setup>
import { ref } from 'vue';
import { Select } from '@codebridger/lib-vue-components/form';

const selectedValue = ref('');
const options = ['Option 1', 'Option 2', 'Option 3'];
</script>
\`\`\`

## Props

The component accepts various props for customization:

- **Basic Props**: \`modelValue\`, \`options\`, \`placeholder\`, \`label\`
- **Behavior Props**: \`searchable\`, \`multiple\`, \`grouped\`, \`disabled\`
- **Display Props**: \`trackBy\`, \`labelKey\`, \`valueKey\`, \`iconName\`
- **Validation Props**: \`required\`, \`error\`, \`errorMessage\`
- **Advanced Props**: \`preselectFirst\`, \`allowEmpty\`, \`groupLabel\`, \`groupValues\`

## Events

- \`update:modelValue\`: Emitted when the selected value changes
- \`change\`: Emitted when selection changes
- \`open\`: Emitted when dropdown opens
- \`close\`: Emitted when dropdown closes

## Accessibility

The component includes comprehensive accessibility features:

- Proper ARIA attributes (\`aria-expanded\`, \`aria-haspopup\`, \`aria-selected\`)
- Keyboard navigation (Enter, Space, Escape, Arrow keys)
- Screen reader support with proper roles and labels
- Focus management and visible focus indicators
        `,
      },
    },
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic Select
export const Default: Story = {
  render: (args) => ({
    components: { Select },
    setup() {
      const selectedValue = ref("");
      return { args, selectedValue };
    },
    template: `
      <Select
        v-model="selectedValue"
        v-bind="args"
        @update:modelValue="selectedValue = $event"
      />
      <div class="mt-4 text-sm text-gray-600">
        Selected value: {{ selectedValue || 'None' }}
      </div>
    `,
  }),
  args: {
    options: ["Orange", "White", "Purple", "Yellow", "Red", "Green"],
    placeholder: "Choose a color",
  },
};

// Select with Label
export const WithLabel: Story = {
  render: (args) => ({
    components: { Select },
    setup() {
      const selectedValue = ref("");
      return { args, selectedValue };
    },
    template: `
      <Select
        v-model="selectedValue"
        v-bind="args"
        @update:modelValue="selectedValue = $event"
      />
      <div class="mt-4 text-sm text-gray-600">
        Selected value: {{ selectedValue || 'None' }}
      </div>
    `,
  }),
  args: {
    label: "Favorite Color",
    options: ["Orange", "White", "Purple", "Yellow", "Red", "Green"],
    placeholder: "Choose a color",
  },
};

// Required Field
export const Required: Story = {
  render: (args) => ({
    components: { Select },
    setup() {
      const selectedValue = ref("");
      return { args, selectedValue };
    },
    template: `
      <Select
        v-model="selectedValue"
        v-bind="args"
        @update:modelValue="selectedValue = $event"
      />
      <div class="mt-4 text-sm text-gray-600">
        Selected value: {{ selectedValue || 'None' }}
      </div>
    `,
  }),
  args: {
    label: "Favorite Color",
    required: true,
    options: ["Orange", "White", "Purple", "Yellow", "Red", "Green"],
    placeholder: "Choose a color",
  },
};

// With Icon
export const WithIcon: Story = {
  render: (args) => ({
    components: { Select },
    setup() {
      const selectedValue = ref("");
      return { args, selectedValue };
    },
    template: `
      <Select
        v-model="selectedValue"
        v-bind="args"
        @update:modelValue="selectedValue = $event"
      />
      <div class="mt-4 text-sm text-gray-600">
        Selected value: {{ selectedValue || 'None' }}
      </div>
    `,
  }),
  args: {
    label: "Search Category",
    iconName: "IconSearch",
    options: ["Products", "Services", "Support", "About"],
    placeholder: "Select category",
  },
};

// Searchable Select
export const Searchable: Story = {
  render: (args) => ({
    components: { Select },
    setup() {
      const selectedValue = ref("");
      return { args, selectedValue };
    },
    template: `
      <Select
        v-model="selectedValue"
        v-bind="args"
        @update:modelValue="selectedValue = $event"
      />
      <div class="mt-4 text-sm text-gray-600">
        Selected value: {{ selectedValue || 'None' }}
      </div>
    `,
  }),
  args: {
    label: "Search Country",
    searchable: true,
    options: [
      "United States",
      "Canada",
      "United Kingdom",
      "Germany",
      "France",
      "Spain",
      "Italy",
      "Japan",
      "China",
      "India",
      "Brazil",
      "Australia",
    ],
    placeholder: "Type to search countries",
  },
};

// Multiple Selection
export const Multiple: Story = {
  render: (args) => ({
    components: { Select },
    setup() {
      const selectedValues = ref([]);
      return { args, selectedValues };
    },
    template: `
      <Select
        v-model="selectedValues"
        v-bind="args"
        @update:modelValue="selectedValues = $event"
      />
      <div class="mt-4 text-sm text-gray-600">
        Selected values: {{ selectedValues.length > 0 ? selectedValues.join(', ') : 'None' }}
      </div>
    `,
  }),
  args: {
    label: "Select Colors",
    multiple: true,
    options: ["Orange", "White", "Purple", "Yellow", "Red", "Green"],
    placeholder: "Choose multiple colors",
  },
};

// Object Options
export const ObjectOptions: Story = {
  render: (args) => ({
    components: { Select },
    setup() {
      const selectedValue = ref(null);
      return { args, selectedValue };
    },
    template: `
      <Select
        v-model="selectedValue"
        v-bind="args"
        @update:modelValue="selectedValue = $event"
      />
      <div class="mt-4 text-sm text-gray-600">
        Selected value: {{ selectedValue ? JSON.stringify(selectedValue, null, 2) : 'None' }}
      </div>
    `,
  }),
  args: {
    label: "Select User",
    options: [
      { id: 1, name: "John Doe", email: "john@example.com" },
      { id: 2, name: "Jane Smith", email: "jane@example.com" },
      { id: 3, name: "Bob Johnson", email: "bob@example.com" },
    ],
    trackBy: "id",
    labelKey: "name",
    valueKey: "id",
    placeholder: "Choose a user",
  },
};

// Grouped Options
export const Grouped: Story = {
  render: (args) => ({
    components: { Select },
    setup() {
      const selectedValue = ref(null);
      return { args, selectedValue };
    },
    template: `
      <Select
        v-model="selectedValue"
        v-bind="args"
        @update:modelValue="selectedValue = $event"
      />
      <div class="mt-4 text-sm text-gray-600">
        Selected value: {{ selectedValue ? JSON.stringify(selectedValue, null, 2) : 'None' }}
      </div>
    `,
  }),
  args: {
    label: "Select Category",
    grouped: true,
    options: [
      {
        group_name: "Fruits",
        list: [
          { name: "Apple", value: "apple" },
          { name: "Banana", value: "banana" },
          { name: "Orange", value: "orange" },
        ],
      },
      {
        group_name: "Vegetables",
        list: [
          { name: "Carrot", value: "carrot" },
          { name: "Broccoli", value: "broccoli" },
          { name: "Spinach", value: "spinach" },
        ],
      },
    ],
    groupLabel: "group_name",
    groupValues: "list",
    trackBy: "value",
    labelKey: "name",
    valueKey: "value",
    placeholder: "Choose a category",
  },
};

// With Error State
export const WithError: Story = {
  render: (args) => ({
    components: { Select },
    setup() {
      const selectedValue = ref("");
      return { args, selectedValue };
    },
    template: `
      <Select
        v-model="selectedValue"
        v-bind="args"
        @update:modelValue="selectedValue = $event"
      />
      <div class="mt-4 text-sm text-gray-600">
        Selected value: {{ selectedValue || 'None' }}
      </div>
    `,
  }),
  args: {
    label: "Required Field",
    required: true,
    error: true,
    errorMessage: "This field is required",
    options: ["Option 1", "Option 2", "Option 3"],
    placeholder: "Please select an option",
  },
};

// Disabled State
export const Disabled: Story = {
  render: (args) => ({
    components: { Select },
    setup() {
      const selectedValue = ref("");
      return { args, selectedValue };
    },
    template: `
      <Select
        v-model="selectedValue"
        v-bind="args"
        @update:modelValue="selectedValue = $event"
      />
      <div class="mt-4 text-sm text-gray-600">
        Selected value: {{ selectedValue || 'None' }}
      </div>
    `,
  }),
  args: {
    label: "Disabled Select",
    disabled: true,
    options: ["Option 1", "Option 2", "Option 3"],
    placeholder: "This select is disabled",
  },
};

// Preselect First Option
export const PreselectFirst: Story = {
  render: (args) => ({
    components: { Select },
    setup() {
      const selectedValue = ref("");
      return { args, selectedValue };
    },
    template: `
      <Select
        v-model="selectedValue"
        v-bind="args"
        @update:modelValue="selectedValue = $event"
      />
      <div class="mt-4 text-sm text-gray-600">
        Selected value: {{ selectedValue || 'None' }}
      </div>
    `,
  }),
  args: {
    label: "Auto-select First",
    preselectFirst: true,
    options: ["First Option", "Second Option", "Third Option"],
    placeholder: "First option will be selected automatically",
  },
};

// Interactive Example
export const Interactive: Story = {
  render: (args) => ({
    components: { Select },
    setup() {
      const selectedValue = ref(args.modelValue || "");
      const handleChange = (value: any) => {
        selectedValue.value = value;
      };
      return { args, selectedValue, handleChange };
    },
    template: `
      <div class="space-y-4">
        <Select 
          v-bind="args" 
          :model-value="selectedValue"
          @update:model-value="handleChange"
        />
        <div class="mt-4 p-3 bg-gray-100 dark:bg-gray-800 rounded-md">
          <p class="text-sm font-medium text-gray-700 dark:text-gray-300">Selected Value:</p>
          <pre class="mt-1 text-sm text-gray-600 dark:text-gray-400">{{ JSON.stringify(selectedValue, null, 2) }}</pre>
        </div>
      </div>
    `,
  }),
  args: {
    label: "Interactive Select",
    options: ["Option A", "Option B", "Option C", "Option D"],
    placeholder: "Select an option to see the value",
  },
};

// Multiple Selection Interactive
export const MultipleInteractive: Story = {
  render: (args) => ({
    components: { Select },
    setup() {
      const selectedValues = ref(args.modelValue || []);
      const handleChange = (value: any) => {
        selectedValues.value = value;
      };
      return { args, selectedValues, handleChange };
    },
    template: `
      <div class="space-y-4">
        <Select 
          v-bind="args" 
          :model-value="selectedValues"
          @update:model-value="handleChange"
        />
        <div class="mt-4 p-3 bg-gray-100 dark:bg-gray-800 rounded-md">
          <p class="text-sm font-medium text-gray-700 dark:text-gray-300">Selected Values:</p>
          <pre class="mt-1 text-sm text-gray-600 dark:text-gray-400">{{ JSON.stringify(selectedValues, null, 2) }}</pre>
        </div>
      </div>
    `,
  }),
  args: {
    label: "Multiple Selection",
    multiple: true,
    options: ["Red", "Green", "Blue", "Yellow", "Purple", "Orange"],
    placeholder: "Select multiple colors",
  },
};

// Searchable with Object Options
export const SearchableObjects: Story = {
  render: (args) => ({
    components: { Select },
    setup() {
      const selectedUser = ref(args.modelValue || null);
      const handleChange = (value: any) => {
        selectedUser.value = value;
      };
      return { args, selectedUser, handleChange };
    },
    template: `
      <div class="space-y-4">
        <Select 
          v-bind="args" 
          :model-value="selectedUser"
          @update:model-value="handleChange"
        />
        <div class="mt-4 p-3 bg-gray-100 dark:bg-gray-800 rounded-md">
          <p class="text-sm font-medium text-gray-700 dark:text-gray-300">Selected User:</p>
          <pre class="mt-1 text-sm text-gray-600 dark:text-gray-400">{{ JSON.stringify(selectedUser, null, 2) }}</pre>
        </div>
      </div>
    `,
  }),
  args: {
    label: "Search Users",
    searchable: true,
    options: [
      { id: 1, name: "John Doe", role: "Developer", department: "Engineering" },
      { id: 2, name: "Jane Smith", role: "Designer", department: "Design" },
      { id: 3, name: "Bob Johnson", role: "Manager", department: "Management" },
      {
        id: 4,
        name: "Alice Brown",
        role: "Developer",
        department: "Engineering",
      },
      { id: 5, name: "Charlie Wilson", role: "Designer", department: "Design" },
    ],
    trackBy: "id",
    labelKey: "name",
    valueKey: "id",
    placeholder: "Search by name, role, or department",
  },
};

// Complex Grouped Example
export const ComplexGrouped: Story = {
  render: (args) => ({
    components: { Select },
    setup() {
      const selectedItem = ref(args.modelValue || null);
      const handleChange = (value: any) => {
        selectedItem.value = value;
      };
      return { args, selectedItem, handleChange };
    },
    template: `
      <div class="space-y-4">
        <Select 
          v-bind="args" 
          :model-value="selectedItem"
          @update:model-value="handleChange"
        />
        <div class="mt-4 p-3 bg-gray-100 dark:bg-gray-800 rounded-md">
          <p class="text-sm font-medium text-gray-700 dark:text-gray-300">Selected Item:</p>
          <pre class="mt-1 text-sm text-gray-600 dark:text-gray-400">{{ JSON.stringify(selectedItem, null, 2) }}</pre>
        </div>
      </div>
    `,
  }),
  args: {
    label: "Select from Categories",
    grouped: true,
    searchable: true,
    options: [
      {
        group_name: "Programming Languages",
        list: [
          { name: "JavaScript", type: "language", year: 1995 },
          { name: "Python", type: "language", year: 1991 },
          { name: "TypeScript", type: "language", year: 2012 },
        ],
      },
      {
        group_name: "Frameworks",
        list: [
          { name: "React", type: "framework", year: 2013 },
          { name: "Vue.js", type: "framework", year: 2014 },
          { name: "Angular", type: "framework", year: 2010 },
        ],
      },
      {
        group_name: "Tools",
        list: [
          { name: "VS Code", type: "tool", year: 2015 },
          { name: "Git", type: "tool", year: 2005 },
          { name: "Docker", type: "tool", year: 2013 },
        ],
      },
    ],
    groupLabel: "group_name",
    groupValues: "list",
    trackBy: "name",
    labelKey: "name",
    valueKey: "name",
    placeholder: "Search and select from categories",
  },
};
