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
        component:
          "A versatile card component that can pass disabled state to child interactive elements.",
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
            <p class="text-gray-600">This is a default card with some example content.</p>
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
  render: (args) => ({
    components: { Card, Input },
    template: `
      <Card v-bind="args">
        <template #default="{ cardDisabled }">
          <div class="p-4 space-y-4">
            <h3 class="text-lg font-bold mb-2">Card with Input</h3>
            <Input 
              label="Email Input" 
              :disabled="cardDisabled"
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
        story: "A card with input components that can be disabled together",
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
          <div class="p-4 text-center">
            <h3 class="text-lg font-bold mb-2">Card with Custom Classes</h3>
            <p class="text-gray-600">This card uses additional flex classes for layout.</p>
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
  render: (args) => ({
    components: { Card, Input },
    template: `
      <Card :disabled="true">
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
              class="w-full p-2 bg-blue-500 text-white rounded"
            >
              Disabled Button
            </button>
          </div>
        </template>
      </Card>
    `,
    args: {
      disabled: true,
    },
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
              class="w-full p-2 border rounded"
            >
              <option>Option 1</option>
              <option>Option 2</option>
            </select>
            <button 
              :disabled="cardDisabled"
              class="w-full p-2 bg-blue-500 text-white rounded"
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
