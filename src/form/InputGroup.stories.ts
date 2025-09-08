import type { Meta, StoryObj } from "@storybook/vue3";
import { ref } from "vue";
import InputGroup from "./InputGroup.vue";
import Input from "./Input.vue";
import Select from "./Select.vue";
import Button from "../elements/Button.vue";
import Icon from "../icon/Icon.vue";
import InputGroupItem from "./InputGroupItem.vue";

const componentDocs = `
# InputGroup

A flexible container component that groups form elements together with proper styling coordination. The InputGroup automatically manages border radius, error states, and spacing for its child components.

## Features
- **Slot-based Architecture**: Accepts any number of child components through a single default slot
- **Automatic Styling**: Manages border radius for first, middle, and last children
- **Error State Management**: Coordinates error styling across all children
- **RTL Support**: Proper right-to-left layout support
- **Theme Support**: Works with light, dark, and semidark themes
- **Flexible Layout**: Input components automatically take available width with flex-1

## Common Use Cases
- Input with prefix/suffix text or icons
- Input with action buttons
- Multiple related form elements
- Search input with submit button
- Currency input with symbol prefix
- URL input with domain suffix

## Accessibility
- Proper label association for screen readers
- Error message announcement
- Keyboard navigation support
- ARIA attributes for form validation

Note: This section intentionally omits code; Storybook shows usage code automatically.
`;

const meta = {
  title: "Form/InputGroup",
  component: InputGroup,
  tags: ["autodocs"],
  argTypes: {
    label: {
      control: "text",
      description: "Label text for the input group",
    },
    id: {
      control: "text",
      description: "ID for the input group (used for label association)",
    },
    required: {
      control: "boolean",
      description: "Whether the input group is required",
    },
    error: {
      control: "boolean",
      description: "Whether the input group has an error state",
    },
    errorMessage: {
      control: "text",
      description: "Error message to display when error is true",
    },
    disabled: {
      control: "boolean",
      description: "Whether the input group is disabled",
    },
  } as any,
  args: {
    label: "Username",
    id: "username",
    required: false,
    error: false,
    errorMessage: "",
    disabled: false,
  } as any,
  parameters: {
    docs: {
      description: {
        component: componentDocs,
      },
    },
  },
} satisfies Meta<typeof InputGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic Examples
export const Default: Story = {
  render: (args) => ({
    components: { InputGroup, Input, Button, InputGroupItem },
    setup() {
      const username = ref("");
      return { args, username };
    },
    template: `
      <InputGroup v-bind="args">
        <InputGroupItem>
          @
        </InputGroupItem>
        <Input 
          v-model="username" 
          placeholder="Enter username"
        />
        <Button variant="primary">
          Submit
        </Button>
      </InputGroup>
    `,
  }),
};

export const WithSuffix: Story = {
  render: (args) => ({
    components: { InputGroup, Input, InputGroupItem },
    setup() {
      const email = ref("");
      return { args, email };
    },
    template: `
      <InputGroup v-bind="args">
        <Input 
          v-model="email" 
          placeholder="username"
        />
        <InputGroupItem>
          @example.com
        </InputGroupItem>
      </InputGroup>
    `,
  }),
};

export const WithPrefixAndSuffix: Story = {
  render: (args) => ({
    components: { InputGroup, Input, InputGroupItem },
    setup() {
      const amount = ref("");
      return { args, amount };
    },
    template: `
      <InputGroup v-bind="args">
        <InputGroupItem>
          $
        </InputGroupItem>
        <Input 
          v-model="amount" 
          placeholder="0.00"
        />
        <InputGroupItem>
          .00
        </InputGroupItem>
      </InputGroup>
    `,
  }),
};

// Button Examples
export const WithButtons: Story = {
  render: (args) => ({
    components: { InputGroup, Input, Button },
    setup() {
      const search = ref("");
      return { args, search };
    },
    template: `
      <InputGroup v-bind="args">
        <Button variant="primary">
          Search
        </Button>
        <Input 
          v-model="search" 
          placeholder="Enter search term"
        />
        <Button variant="secondary">
          Clear
        </Button>
      </InputGroup>
    `,
  }),
};

export const ButtonGroup: Story = {
  render: (args) => ({
    components: { InputGroup, Button },
    setup() {
      return { args };
    },
    template: `
      <InputGroup v-bind="args">
        <Button variant="primary">
          Left
        </Button>
        <Button variant="secondary">
          Middle
        </Button>
        <Button variant="success">
          Right
        </Button>
      </InputGroup>
    `,
  }),
};

// Icon Examples
export const WithIcons: Story = {
  render: (args) => ({
    components: { InputGroup, Input, Icon, InputGroupItem },
    setup() {
      const search = ref("");
      return { args, search };
    },
    template: `
      <InputGroup v-bind="args">
        <InputGroupItem>
          <Icon name="IconSearch" class="w-4 h-4" />
        </InputGroupItem>
        <Input 
          v-model="search" 
          placeholder="Search..."
        />
        <InputGroupItem>
          <Icon name="IconHorizontalDots" class="w-4 h-4" />
        </InputGroupItem>
      </InputGroup>
    `,
  }),
};

// Error States
export const WithError: Story = {
  render: (args) => ({
    components: { InputGroup, Input, Button, InputGroupItem },
    setup() {
      const email = ref("");
      return { args, email };
    },
    template: `
      <InputGroup 
        v-bind="args" 
        error 
        error-message="Please enter a valid email address"
      >
        <InputGroupItem>
          @
        </InputGroupItem>
        <Input 
          v-model="email" 
          placeholder="Enter email"
        />
        <Button variant="primary">
          Submit
        </Button>
      </InputGroup>
    `,
  }),
};

export const Disabled: Story = {
  render: (args) => ({
    components: { InputGroup, Input, Button, InputGroupItem },
    setup() {
      const username = ref("disabled@example.com");
      return { args, username };
    },
    template: `
      <InputGroup v-bind="args" disabled>
        <InputGroupItem>
          @
        </InputGroupItem>
        <Input 
          v-model="username" 
          placeholder="Enter username"
        />
        <Button variant="primary">
          Submit
        </Button>
      </InputGroup>
    `,
  }),
};

// Complex Examples
export const MultipleInputs: Story = {
  render: (args) => ({
    components: { InputGroup, Input, InputGroupItem },
    setup() {
      const firstName = ref("");
      const lastName = ref("");
      return { args, firstName, lastName };
    },
    template: `
      <InputGroup v-bind="args">
        <InputGroupItem>
          Name
        </InputGroupItem>
        <Input 
          v-model="firstName" 
          placeholder="First Name"
        />
        <Input 
          v-model="lastName" 
          placeholder="Last Name"
        />
      </InputGroup>
    `,
  }),
};

export const SearchWithDropdown: Story = {
  render: (args) => ({
    components: { InputGroup, Input, Select, Button, Icon },
    setup() {
      const search = ref("");
      const category = ref("");
      const categories = [
        { label: "All Categories", value: "" },
        { label: "Electronics", value: "electronics" },
        { label: "Clothing", value: "clothing" },
        { label: "Books", value: "books" },
        { label: "Home & Garden", value: "home" },
      ];
      return { args, search, category, categories };
    },
    template: `
      <InputGroup v-bind="args">
        <Input 
          v-model="search" 
          placeholder="Search products..."
        />
        <Select 
          v-model="category"
          :options="categories"
          placeholder="Category"
        />
        <Button variant="primary">
          <Icon name="IconSearch" class="w-4 h-4 ltr:mr-2 rtl:ml-2" />
          Search
        </Button>
      </InputGroup>
    `,
  }),
};

// Select Component Examples
export const WithSelectDropdown: Story = {
  render: (args) => ({
    components: { InputGroup, Select, Button, Icon },
    setup() {
      const category = ref("");
      const sortBy = ref("");
      const categories = [
        { label: "All Categories", value: "" },
        { label: "Electronics", value: "electronics" },
        { label: "Clothing", value: "clothing" },
        { label: "Books", value: "books" },
        { label: "Home & Garden", value: "home" },
      ];
      const sortOptions = [
        { label: "Sort by", value: "" },
        { label: "Price: Low to High", value: "price-asc" },
        { label: "Price: High to Low", value: "price-desc" },
        { label: "Name: A to Z", value: "name-asc" },
        { label: "Name: Z to A", value: "name-desc" },
        { label: "Newest First", value: "newest" },
      ];
      return { args, category, sortBy, categories, sortOptions };
    },
    template: `
      <InputGroup v-bind="args">
        <Select 
          v-model="category"
          :options="categories"
          placeholder="Category"
        />
        <Select 
          v-model="sortBy"
          :options="sortOptions"
          placeholder="Sort by"
        />
        <Button variant="secondary">
          <Icon name="IconRefresh" class="w-4 h-4 ltr:mr-2 rtl:ml-2" />
          Reset
        </Button>
      </InputGroup>
    `,
  }),
};

export const CurrencyInput: Story = {
  render: (args) => ({
    components: { InputGroup, Input, Select, Icon, InputGroupItem },
    setup() {
      const amount = ref("");
      const currency = ref("USD");
      const currencies = [
        { label: "USD", value: "USD" },
        { label: "EUR", value: "EUR" },
        { label: "GBP", value: "GBP" },
        { label: "JPY", value: "JPY" },
        { label: "CAD", value: "CAD" },
      ];
      return { args, amount, currency, currencies };
    },
    template: `
      <InputGroup v-bind="args">
        <InputGroupItem>
          <Icon name="IconDollarSign" class="w-4 h-4" />
        </InputGroupItem>
        <Input 
          v-model="amount" 
          placeholder="0.00"
          type="number"
        />
        <Select 
          v-model="currency"
          :options="currencies"
        />
      </InputGroup>
    `,
  }),
};

// Interactive Examples
export const Interactive: Story = {
  render: (args) => ({
    components: { InputGroup, Input, Button, Icon, InputGroupItem },
    setup() {
      const search = ref("");
      const isLoading = ref(false);

      const handleSearch = () => {
        isLoading.value = true;
        setTimeout(() => {
          isLoading.value = false;
        }, 2000);
      };

      return { args, search, isLoading, handleSearch };
    },
    template: `
      <div class="space-y-4">
        <InputGroup v-bind="args">
          <InputGroupItem>
            <Icon name="IconSearch" class="w-4 h-4" />
          </InputGroupItem>
          <Input 
            v-model="search" 
            placeholder="Search for anything..."
          />
          <Button 
            variant="primary" 
            :loading="isLoading"
            @click="handleSearch"
          >
            {{ isLoading ? 'Searching...' : 'Search' }}
          </Button>
        </InputGroup>
        
        <div v-if="search" class="text-sm text-gray-600 dark:text-gray-400">
          Searching for: "{{ search }}"
        </div>
      </div>
    `,
  }),
};
