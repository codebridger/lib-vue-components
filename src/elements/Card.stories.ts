import type { Meta, StoryObj } from "@storybook/vue3";
import Card from "./Card.vue";
import Input from "./Input.vue";

const meta: Meta<typeof Card> = {
  title: "Elements/Card",
  component: Card,
  tags: ["autodocs"],
  argTypes: {
    disabled: {
      control: "boolean",
      description: "Disables the card and its child interactive elements",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
  },
  args: {
    disabled: false,
  },
  parameters: {
    docs: {
      source: {
        type: "code",
      },
      description: {
        component: `
A versatile Card component that serves as a container for content with consistent styling. 
The component features:

- Automatic dark mode support
- Consistent shadow and border styling
- Disabled state propagation to child components
- Full TypeScript support
- Tailwind CSS integration

## Usage

The Card component accepts a default slot that receives the cardDisabled state:

\`\`\`vue
<Card :disabled="false">
  <template #default="{ cardDisabled }">
    <div class="p-4">
      <h3>Card Title</h3>
      <Input :disabled="cardDisabled" />
    </div>
  </template>
</Card>
\`\`\`

## Styling

The card uses Tailwind CSS with:
- Light/dark mode support
- Configurable shadow and border
- Consistent padding
- Opacity changes for disabled state
`,
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Card>;

export const Default: Story = {
  render: (args) => ({
    components: { Card },
    template: `
      <Card v-bind="args">
        <template #default="{ cardDisabled }">
          <div class="p-4">
            <h3 class="text-lg font-bold mb-2">Default Card</h3>
            <p class="text-gray-600 dark:text-gray-300">This is a default card with some example content.</p>
          </div>
        </template>
      </Card>
    `,
    setup() {
      return { args };
    },
  }),
};

export const CardWithInput: Story = {
  args: {
    disabled: true,
  },
  render: (args) => ({
    components: { Card, Input },
    template: `
      <Card v-bind="args">
        <template #default="{ cardDisabled }">
          <div class="p-4 space-y-4">
            <h3 class="text-lg font-bold mb-2">Card with Input</h3>
            <Input 
              label="Email Input" 
              placeholder="Enter your email"
            />
            <Input 
              type="number" 
              label="Number Input" 
              :disabled="cardDisabled"
              placeholder="Enter a number"
            />
          </div>
        </template>
      </Card>
    `,
    setup() {
      return { args };
    },
  }),
  parameters: {
    docs: {
      description: {
        story: `A disabled card with input components that can be disabled together.
          <br>The first input is getting disabled by ancestor card component, the second input is disabled by itself.`,
      },
    },
  },
};

export const CustomClassCard: Story = {
  render: (args) => ({
    components: { Card },
    template: `
      <Card v-bind="args" class="flex items-center justify-start w-[600px] h-[200px]">
        <template #default="{ cardDisabled }">
          <div class="px-4">
            <h3 class="text-lg font-bold mb-2">Card with Custom Classes</h3>
            <p class="text-gray-600 dark:text-gray-300">This card uses additional flex classes for layout.</p>
          </div>
        </template>
      </Card>
    `,
    setup() {
      return { args };
    },
  }),
  parameters: {
    docs: {
      description: {
        story: "A card with custom classes for additional styling",
      },
    },
  },
};

export const DisabledCard: Story = {
  args: {
    disabled: true,
  },
  render: (args) => ({
    components: { Card, Input },
    template: `
      <Card v-bind="args">
        <template #default="{ cardDisabled }">
          <div class="p-4 space-y-4">
            <h3 class="text-lg font-bold mb-2">Disabled Card</h3>
            <Input 
              label="Disabled Input" 
              :disabled="cardDisabled"
              placeholder="This input is disabled"
            />
            <button 
              :disabled="cardDisabled"
              class="w-full p-2 bg-blue-500 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Disabled Button
            </button>
          </div>
        </template>
      </Card>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story:
          "A card in a disabled state with reduced opacity and disabled interactive elements",
      },
    },
  },
};

export const MultipleInteractiveElements: Story = {
  render: (args) => ({
    components: { Card, Input },
    template: `
      <Card v-bind="args">
        <template #default="{ cardDisabled }">
          <div class="p-4 space-y-4">
            <h3 class="text-lg font-bold">Interactive Elements</h3>
            <Input 
              label="Text Input" 
              :disabled="cardDisabled"
              placeholder="Enter text"
            />
            <select 
              :disabled="cardDisabled"
              class="w-full p-2 border rounded dark:bg-[#191e3a] dark:border-[#1b2e4b]"
            >
              <option>Option 1</option>
              <option>Option 2</option>
            </select>
            <button 
              :disabled="cardDisabled"
              class="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {{ cardDisabled ? 'Disabled Action' : 'Perform Action' }}
            </button>
          </div>
        </template>
      </Card>
    `,
    setup() {
      return { args };
    },
  }),
  parameters: {
    docs: {
      description: {
        story:
          "A card with multiple interactive elements that can be disabled together",
      },
    },
  },
};
