import type { Meta, StoryObj } from "@storybook/vue3";
import { expect, within, userEvent } from "@storybook/test";
import { ref } from "vue";
import Select from "./Select.vue";

const componentDocs = `
# Select Component

A flexible and customizable select component that supports both default and custom modes. The Select component provides a comprehensive dropdown interface with support for single/multiple selection, search functionality, grouped options, and custom rendering through slots.

## Features

- **Default Mode**: Traditional dropdown with built-in search, styling, and interactions
- **Custom Mode**: Complete customization through three specialized slots (header, each, footer)
- **Confirmation Mode**: Built-in confirmation footer with Accept/Cancel buttons for improved UX
- **Multiple Selection**: Support for selecting multiple options with toggle behavior
- **Search Functionality**: Built-in search with filtering capabilities
- **Grouped Options**: Support for categorized option groups
- **Accessibility**: Full ARIA support and keyboard navigation
- **Theme Integration**: Light/dark mode support with Tailwind CSS
- **RTL Support**: Right-to-left layout support
- **Icon Integration**: Optional icon placement and interaction

## Confirmation Mode

When \`confirm={true}\`, the component automatically shows a built-in footer with Accept and Cancel buttons. This mode works in both single and multiple selection modes and provides improved UX by allowing users to make temporary selections before committing.

**Key Benefits:**
- **Value Preservation**: Original selection is preserved until confirmed
- **Better UX**: Users can review their choices before committing
- **Built-in Footer**: No need to implement custom footer logic
- **Universal Support**: Works with single, multiple, and grouped options

## Custom Mode Slots

When \`custom={true}\`, the component provides three specialized slots:

### Header Slot
- **Purpose**: Custom search widgets, filters, or additional controls
- **Scoped Variables**: 
  - \`allOptions\`: Array of all available options
  - \`setNewList\`: Function to update the options list

### Each Slot
- **Purpose**: Custom rendering for each individual option
- **Scoped Variables**:
  - \`option\`: The current option data
  - \`isSelected\`: Boolean indicating if option is selected
  - \`setSelected\`: Function to select/deselect the option

### Footer Slot
- **Purpose**: Custom actions, accept/reject buttons, or additional controls
- **Scoped Variables**:
  - \`close\`: Function to close dropdown with acceptance parameter

## Accessibility

- Full keyboard navigation support (Enter, Space, Arrow keys, Escape)
- Proper ARIA attributes (aria-expanded, aria-haspopup, aria-selected)
- Screen reader friendly with proper role attributes
- Focus management for search inputs and options

## Usage Guidelines

- Use **Default Mode** for standard dropdown requirements
- Use **Custom Mode** when you need complete control over the dropdown appearance and behavior
- Always provide meaningful labels and placeholders for accessibility
- Consider using the \`required\` prop for form validation
- Use \`error\` and \`errorMessage\` props for validation feedback

Note: This section intentionally omits code; Storybook shows usage code automatically.
`;

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
      control: "select",
      options: ["", "IconSearch", "IconMail", "IconUser", "IconX"],
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
    custom: {
      control: "boolean",
      description: "Whether to enable custom mode with slot-based rendering",
    },
    confirm: {
      control: "boolean",
      description:
        "Whether to show a confirmation footer with Accept/Cancel buttons",
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
    custom: false,
    confirm: false,
  },
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: componentDocs,
      },
      story: {
        height: "320px",
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
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("Open dropdown", async () => {
      const trigger = canvas.getByText("Choose a color");
      await userEvent.click(trigger);
    });

    await step("Select an option", async () => {
      const option = await canvas.findByText("Red");
      await userEvent.click(option);
    });

    await step("Verify selection bound to v-model", async () => {
      const result = await canvas.findByText(/Selected value:\s*Red/i);
      expect(result).toBeInTheDocument();
    });
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
  parameters: {
    docs: {
      story: {},
    },
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("Open dropdown", async () => {
      const trigger = canvas.getByText("Type to search countries");
      await userEvent.click(trigger);
    });

    await step("Filter and select", async () => {
      const search = await canvas.findByPlaceholderText("Search...");
      await userEvent.type(search, "Japan");
      const option = await canvas.findByText("Japan");
      await userEvent.click(option);
    });

    await step("Verify selection", async () => {
      const result = await canvas.findByText(/Selected value:\s*Japan/i);
      expect(result).toBeInTheDocument();
    });
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
  parameters: {
    docs: {
      story: {},
    },
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("Open dropdown", async () => {
      const trigger = canvas.getByText("Choose multiple colors");
      await userEvent.click(trigger);
    });

    await step("Select multiple options", async () => {
      const red = await canvas.findByText("Red");
      await userEvent.click(red);
      const green = await canvas.findByText("Green");
      await userEvent.click(green);
    });

    await step("Verify selections", async () => {
      const result = await canvas.findByText(
        /Selected values:\s*(.*Red.*Green|.*Green.*Red)/i
      );
      expect(result).toBeInTheDocument();
    });
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
  parameters: {
    docs: {
      story: {},
    },
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("Open dropdown", async () => {
      const trigger = canvas.getByText("Choose a category");
      await userEvent.click(trigger);
    });

    await step("Verify groups visible", async () => {
      expect(await canvas.findByText("Fruits")).toBeInTheDocument();
      expect(await canvas.findByText("Vegetables")).toBeInTheDocument();
    });

    await step("Select an option from a group", async () => {
      const banana = await canvas.findByText("Banana");
      await userEvent.click(banana);
    });

    await step("Verify selection reflected", async () => {
      const result = await canvas.findByText(/banana/i);
      expect(result).toBeInTheDocument();
    });
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
  render: () => {
    const selectedValue = ref({ name: "Option 1" });
    const options = [
      {
        group_name: "Group 1",
        list: [{ name: "Option 1" }, { name: "Option 2" }],
      },
      {
        group_name: "Group 2",
        list: [{ name: "Option 3" }],
      },
    ];

    return {
      components: { Select },
      setup() {
        return { selectedValue, options };
      },
      template: `
        <div class="space-y-4">
          <Select
            v-model="selectedValue"
            :options="options"
            grouped
            group-label="group_name"
            group-values="list"
            label-key="name"
            placeholder="Select from grouped options"
            label="Complex Grouped Select"
          />
          <div class="text-sm text-gray-600">
            Selected: {{ selectedValue ? selectedValue.name : 'None' }}
          </div>
        </div>
      `,
    };
  },
};

// Confirmation Mode
export const ConfirmationMode: Story = {
  render: () => {
    const selectedValue = ref("Option 1");
    const options = [
      "Option 1",
      "Option 2",
      "Option 3",
      "Option 4",
      "Option 5",
    ];

    return {
      components: { Select },
      setup() {
        return { selectedValue, options };
      },
      template: `
        <div class="space-y-4">
          <Select
            v-model="selectedValue"
            :options="options"
            confirm
            placeholder="Select an option (confirmation required)"
            label="Confirmation Mode Select (Single)"
          />
          <div class="text-sm text-gray-600">
            Selected: {{ selectedValue || 'None' }}
          </div>
        </div>
      `,
    };
  },
  parameters: {
    docs: {
      description: {
        story: `
This story demonstrates the **Confirmation Mode** functionality of the Select component. When \`confirm={true}\`, the component shows a built-in footer with Accept and Cancel buttons.

**Key Features:**
- **Built-in Footer**: Automatically shows Accept/Cancel buttons
- **Value Preservation**: Original value is preserved until confirmed
- **Single Mode**: Works seamlessly with single selection
- **Improved UX**: Users can make temporary selections and confirm or cancel them

The confirmation footer appears below the options and provides clear actions for the user to either accept their selection or cancel and revert to the original value.
        `,
      },
    },
  },
};

// Multiple Confirmation Mode
export const MultipleConfirmationMode: Story = {
  render: () => {
    const selectedValues = ref(["Option 1"]);
    const options = [
      "Option 1",
      "Option 2",
      "Option 3",
      "Option 4",
      "Option 5",
    ];

    return {
      components: { Select },
      setup() {
        return { selectedValues, options };
      },
      template: `
        <div class="space-y-4">
          <Select
            v-model="selectedValues"
            :options="options"
            confirm
            multiple
            placeholder="Select multiple options (confirmation required)"
            label="Confirmation Mode Select (Multiple)"
          />
          <div class="text-sm text-gray-600">
            Selected: {{ selectedValues.length > 0 ? selectedValues.join(', ') : 'None' }}
          </div>
        </div>
      `,
    };
  },
  parameters: {
    docs: {
      description: {
        story: `
This story demonstrates the **Multiple Confirmation Mode** functionality. When \`confirm={true}\` and \`multiple={true}\`, users can select multiple options and then confirm or cancel their selection.

**Key Features:**
- **Multiple Selection**: Users can select/deselect multiple options
- **Built-in Footer**: Accept/Cancel buttons for final confirmation
- **Value Preservation**: Original selection is preserved until confirmed
- **Enhanced UX**: Perfect for scenarios where users need to review their choices

This mode is particularly useful for forms where users need to make multiple selections and want to review them before committing.
        `,
      },
    },
  },
};

// Custom Mode
export const CustomMode: Story = {
  render: () => {
    const selectedValue = ref(["Option 1"]);
    const options = [
      "Option 1",
      "Option 2",
      "Option 3",
      "Option 4",
      "Option 5",
    ];

    return {
      components: { Select },
      setup() {
        return { selectedValue, options };
      },
      template: `
        <div class="space-y-4">
          <Select
            v-model="selectedValue"
            :options="options"
            custom
            multiple
            placeholder="Custom select with slots"
            label="Custom Mode Select (Multiple)"
          >
            <!-- Header Slot -->
            <template #header="{ allOptions, setNewList }">
              <div class="p-3 bg-blue-50 dark:bg-blue-900/20">
                <div class="flex items-center justify-between mb-2">
                  <h4 class="text-sm font-medium text-blue-900 dark:text-blue-100">
                    Custom Search Widget
                  </h4>
                  <span class="text-xs text-blue-600 dark:text-blue-400">
                    {{ allOptions.length }} options available
                  </span>
                </div>
                <input
                  type="text"
                  placeholder="Search options..."
                  class="w-full px-3 py-2 text-sm border border-blue-200 dark:border-blue-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  @input="(e) => {
                    const query = e.target.value.toLowerCase();
                    const filtered = allOptions.filter(opt => 
                      opt.toLowerCase().includes(query)
                    );
                    setNewList(filtered);
                  }"
                />
              </div>
            </template>

            <!-- Each Option Slot -->
            <template #each="{ option, isSelected, setSelected }">
              <div
                :class="[
                  'px-3 py-2 cursor-pointer transition-colors duration-150',
                  isSelected 
                    ? 'bg-blue-500 text-white' 
                    : 'hover:bg-blue-50 dark:hover:bg-blue-900/20'
                ]"
                @click="setSelected"
              >
                <div class="flex items-center justify-between">
                  <span class="text-sm">{{ option }}</span>
                  <div v-if="isSelected" class="flex-shrink-0">
                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>
            </template>

            <!-- Footer Slot -->
            <template #footer="{ close }">
              <div class="p-3 bg-gray-50 dark:bg-gray-800">
                <div class="flex items-center justify-between">
                  <span class="text-sm text-gray-600 dark:text-gray-400">
                    Custom footer with actions
                  </span>
                  <div class="flex gap-2">
                    <button
                      @click="close(false)"
                      class="px-3 py-1.5 text-xs font-medium text-gray-600 dark:text-gray-400 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors duration-150"
                    >
                      Cancel
                    </button>
                    <button
                      @click="close(true)"
                      class="px-3 py-1.5 text-xs font-medium text-white bg-blue-600 border border-blue-600 rounded-md hover:bg-blue-700 transition-colors duration-150"
                    >
                      Accept
                    </button>
                  </div>
                </div>
              </div>
            </template>
          </Select>
          <div class="text-sm text-gray-600">
            Selected: {{ selectedValue.length > 0 ? selectedValue.join(', ') : 'None' }}
          </div>
        </div>
      `,
    };
  },
  parameters: {
    docs: {
      story: {
        height: "520px",
      },
      description: {
        story: `
This story demonstrates the **Custom Mode** functionality of the Select component, showcasing how to use the three specialized slots for complete customization:

- **Header Slot**: Custom search widget with option count display
- **Each Slot**: Custom option rendering with selection indicators
- **Footer Slot**: Custom actions (Accept/Cancel buttons)

The component is configured with \`custom={true}\` and \`multiple={true}\` to enable custom mode with multiple selection support. In custom mode, the dropdown height is increased to accommodate all content including the footer section.
        `,
      },
    },
  },
};
