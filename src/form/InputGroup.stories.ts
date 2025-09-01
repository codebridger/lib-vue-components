import type { Meta, StoryObj } from "@storybook/vue3";
import { expect, within, userEvent } from "@storybook/test";
import InputGroup from "./InputGroup.vue";
import Input from "./Input.vue";
import TextArea from "./TextArea.vue";
import Select from "./Select.vue";
import Button from "../elements/Button.vue";
import { ref } from "vue";
import Icon from "../icon/Icon.vue";

const componentDocs = `
# InputGroup Component

A flexible wrapper component that allows you to add content before and after any input field. This component provides a consistent layout for input groups with addons.

## Features
- Left and right addons via named slots
- Works with any input component (Input, TextArea, Select, etc.)
- Multiple size variants (sm, md, lg)
- Theme support (light/dark)
- RTL support
- Form validation states
- Accessible with proper ARIA attributes

## Usage
The InputGroup component uses slots for layout:
- \`leftAddon\`: Content displayed before the input
- \`rightAddon\`: Content displayed after the input
- \`default\`: The main input component

## Accessibility
- Proper label association with input IDs
- Keyboard navigation support
- Screen reader friendly with appropriate ARIA attributes
- High contrast support in both light and dark themes
`;

const meta = {
  title: "Form/InputGroup",
  component: InputGroup,
  tags: ["autodocs"],
  argTypes: {
    label: {
      control: "text",
      description: "Label of input group",
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
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Size of the input group",
    },
    id: {
      control: "text",
      description: "Input ID attribute for label association",
    },
  },
  args: {
    label: "Input Group",
    required: false,
    error: false,
    errorMessage: "",
    size: "md",
    id: "",
  },
  parameters: {
    docs: {
      description: {
        component: componentDocs,
      },
      source: {
        type: "code",
      },
    },
  },
} satisfies Meta<typeof InputGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic stories
export const Default: Story = {
  render: (args) => ({
    components: { InputGroup, Input },
    setup() {
      return { args };
    },
    template: `
      <InputGroup v-bind="args">
        <template #leftAddon>@</template>
        <Input placeholder="Enter username" />
        <template #rightAddon>.com</template>
      </InputGroup>
    `,
  }),
  parameters: {
    docs: {
      source: {
        type: "code",
      },
    },
  },
};

export const TextAddons: Story = {
  render: (args) => ({
    components: { InputGroup, Input },
    setup() {
      return { args };
    },
    template: `
      <div class="space-y-4">
        <InputGroup v-bind="args" label="Username">
          <template #leftAddon>@</template>
          <Input placeholder="Enter username" />
        </InputGroup>
        
        <InputGroup v-bind="args" label="Email">
          <Input placeholder="username" />
          <template #rightAddon>@example.com</template>
        </InputGroup>
        
        <InputGroup v-bind="args" label="URL">
          <template #leftAddon>https://</template>
          <Input placeholder="example.com/users/" />
        </InputGroup>
        
        <InputGroup v-bind="args" label="Price">
          <template #leftAddon>$</template>
          <Input placeholder="0.00" />
          <template #rightAddon>.00</template>
        </InputGroup>
      </div>
    `,
  }),
  parameters: {
    docs: {
      source: {
        type: "code",
      },
    },
  },
};

export const IconAddons: Story = {
  render: (args) => ({
    components: { InputGroup, Input, Icon },
    setup() {
      return { args };
    },
    template: `
      <div class="space-y-4">
        <InputGroup v-bind="args" label="Search">
          <template #leftAddon>
            <Icon name="IconSearch" class="w-4 h-4" />
          </template>
          <Input placeholder="Search..." />
        </InputGroup>
        
        <InputGroup v-bind="args" label="Email">
          <template #leftAddon>
            <Icon name="IconMail" class="w-4 h-4" />
          </template>
          <Input placeholder="Enter email" />
          <template #rightAddon>
            <Icon name="IconEye" class="w-4 h-4 cursor-pointer" />
          </template>
        </InputGroup>
        
        <InputGroup v-bind="args" label="Password">
          <template #leftAddon>
            <Icon name="IconLock" class="w-4 h-4" />
          </template>
          <Input type="password" placeholder="Enter password" />
          <template #rightAddon>
            <Icon name="IconEye" class="w-4 h-4 cursor-pointer" />
          </template>
        </InputGroup>
      </div>
    `,
  }),
  parameters: {
    docs: {
      source: {
        type: "code",
      },
    },
  },
};

export const ButtonAddons: Story = {
  render: (args) => ({
    components: { InputGroup, Input, Button },
    setup() {
      return { args };
    },
    template: `
      <div class="space-y-4">
        <InputGroup v-bind="args" label="Search with button">
          <Input placeholder="Search..." />
          <template #rightAddon>
            <Button variant="primary" size="sm" class="rounded-r-md">
              Search
            </Button>
          </template>
        </InputGroup>
        
        <InputGroup v-bind="args" label="Input with dropdown">
          <template #leftAddon>
            <Button variant="secondary" size="sm" class="rounded-l-md">
              Options
            </Button>
          </template>
          <Input placeholder="Select option" />
        </InputGroup>
        
        <InputGroup v-bind="args" label="Multiple buttons">
          <template #leftAddon>
            <Button variant="success" size="sm" class="rounded-l-md">
              Save
            </Button>
          </template>
          <Input placeholder="Enter data" />
          <template #rightAddon>
            <Button variant="danger" size="sm" class="rounded-r-md">
              Clear
            </Button>
          </template>
        </InputGroup>
      </div>
    `,
  }),
  parameters: {
    docs: {
      source: {
        type: "code",
      },
    },
  },
};

export const Sizes: Story = {
  render: (args) => ({
    components: { InputGroup, Input },
    setup() {
      return { args };
    },
    template: `
      <div class="space-y-4">
        <InputGroup v-bind="args" label="Small" size="sm">
          <template #leftAddon>@</template>
          <Input placeholder="Small input" />
          <template #rightAddon>.com</template>
        </InputGroup>
        
        <InputGroup v-bind="args" label="Medium" size="md">
          <template #leftAddon>@</template>
          <Input placeholder="Medium input" />
          <template #rightAddon>.com</template>
        </InputGroup>
        
        <InputGroup v-bind="args" label="Large" size="lg">
          <template #leftAddon>@</template>
          <Input placeholder="Large input" />
          <template #rightAddon>.com</template>
        </InputGroup>
      </div>
    `,
  }),
  parameters: {
    docs: {
      source: {
        type: "code",
      },
    },
  },
};

export const States: Story = {
  render: (args) => ({
    components: { InputGroup, Input },
    setup() {
      return { args };
    },
    template: `
      <div class="space-y-4">
        <InputGroup v-bind="args" label="Normal">
          <template #leftAddon>@</template>
          <Input placeholder="Normal state" />
        </InputGroup>
        
        <InputGroup v-bind="args" label="Disabled">
          <template #leftAddon>@</template>
          <Input disabled placeholder="Disabled state" />
        </InputGroup>
        
        <InputGroup v-bind="args" label="Error" error errorMessage="This field is required">
          <template #leftAddon>@</template>
          <Input error placeholder="Error state" />
        </InputGroup>
        
        <InputGroup v-bind="args" label="Required" required>
          <template #leftAddon>@</template>
          <Input required placeholder="Required field" />
        </InputGroup>
      </div>
    `,
  }),
  parameters: {
    docs: {
      source: {
        type: "code",
      },
    },
  },
};

export const Interactive: Story = {
  render: (args) => ({
    components: { InputGroup, Input },
    setup() {
      const value = ref("");
      const handleChange = (newValue: string) => {
        value.value = newValue;
      };
      return { args, value, handleChange };
    },
    template: `
      <div class="space-y-4">
        <InputGroup 
          v-bind="args" 
          label="Interactive Input"
        >
          <template #leftAddon>@</template>
          <Input 
            placeholder="Type something..."
            :model-value="value"
            @update:model-value="handleChange"
          />
          <template #rightAddon>.com</template>
        </InputGroup>
        
        <div class="text-sm text-gray-600">
          Current value: <span class="font-mono">{{ value || '(empty)' }}</span>
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      source: {
        type: "code",
      },
    },
  },
};

export const WithTextArea: Story = {
  render: (args) => ({
    components: { InputGroup, TextArea },
    setup() {
      return { args };
    },
    template: `
      <div class="space-y-4">
        <InputGroup v-bind="args" label="Description">
          <template #leftAddon>Note:</template>
          <TextArea placeholder="Enter description" rows="3" />
        </InputGroup>
      </div>
    `,
  }),
  parameters: {
    docs: {
      source: {
        type: "code",
      },
    },
  },
};

export const WithSelect: Story = {
  render: (args) => ({
    components: { InputGroup, Select },
    setup() {
      return { args };
    },
    template: `
      <div class="space-y-4">
        <InputGroup v-bind="args" label="Country">
          <template #leftAddon>+</template>
          <Select 
            :options="[
              { value: '1', label: '1' },
              { value: '44', label: '44' },
              { value: '91', label: '91' }
            ]"
            placeholder="Select country code"
          />
        </InputGroup>
      </div>
    `,
  }),
  parameters: {
    docs: {
      source: {
        type: "code",
      },
    },
  },
};

export const NoAddons: Story = {
  render: (args) => ({
    components: { InputGroup, Input },
    setup() {
      return { args };
    },
    template: `
      <InputGroup v-bind="args" label="Regular Input">
        <Input placeholder="No addons" />
      </InputGroup>
    `,
  }),
  parameters: {
    docs: {
      source: {
        type: "code",
      },
    },
  },
};

// Test stories
export const TestInteraction: Story = {
  render: (args) => ({
    components: { InputGroup, Input },
    setup() {
      return { args };
    },
    template: `
      <InputGroup 
        v-bind="args" 
        label="Test Input"
        data-testid="input-group"
      >
        <template #leftAddon data-testid="left-addon">@</template>
        <Input 
          placeholder="Test interaction"
          data-testid="input"
        />
        <template #rightAddon data-testid="right-addon">.com</template>
      </InputGroup>
    `,
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole("textbox");

    // Test typing
    await userEvent.type(input, "testuser");
    await expect(input).toHaveValue("testuser");

    // Test focus
    await userEvent.click(input);
    await expect(input).toHaveFocus();
  },
};
