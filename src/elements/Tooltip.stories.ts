import type { Meta, StoryObj } from "@storybook/vue3";
import Tooltip from "./Tooltip.vue";
import Button from "./Button.vue";

const meta: Meta<typeof Tooltip> = {
  title: "Elements/Tooltip",
  component: Tooltip,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A tooltip component that can wrap around any element and display text on hover with customizable delay.",
      },
    },
  },
  argTypes: {
    text: {
      control: "text",
      description: "The text content to display in the tooltip",
    },
    delay: {
      control: "number",
      description: "Delay in milliseconds before showing the tooltip on hover",
      defaultValue: 0,
    },
  },
  args: {
    text: "This is a helpful tooltip message",
    delay: 0,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    text: "This is a helpful tooltip message",
    delay: 0,
  },
  render: (args) => ({
    components: { Tooltip, Button },
    setup() {
      return { args };
    },
    template: `
      <Tooltip v-bind="args">
        <Button label="Hover me" color="primary" />
      </Tooltip>
    `,
  }),
};

export const WithDelay: Story = {
  args: {
    text: "This tooltip appears after 2 seconds of hovering",
    delay: 2000,
  },
  render: (args) => ({
    components: { Tooltip, Button },
    setup() {
      return { args };
    },
    template: `
      <Tooltip v-bind="args">
        <Button label="Hover for 2 seconds" color="info" />
      </Tooltip>
    `,
  }),
};

export const LongText: Story = {
  args: {
    text: "This is a much longer tooltip message that demonstrates how the tooltip handles longer text content. It will wrap appropriately and maintain good readability.",
    delay: 500,
  },
  render: (args) => ({
    components: { Tooltip, Button },
    setup() {
      return { args };
    },
    template: `
      <Tooltip v-bind="args">
        <Button label="Long tooltip text" color="success" />
      </Tooltip>
    `,
  }),
};

export const MultipleTooltips: Story = {
  render: () => ({
    components: { Tooltip, Button },
    template: `
      <div class="flex gap-4 flex-wrap">
        <Tooltip text="Primary button tooltip" delay="0">
          <Button label="Primary" color="primary" />
        </Tooltip>
        
        <Tooltip text="Secondary button tooltip" delay="500">
          <Button label="Secondary" color="secondary" />
        </Tooltip>
        
        <Tooltip text="Success button tooltip" delay="1000">
          <Button label="Success" color="success" />
        </Tooltip>
        
        <Tooltip text="Warning button tooltip" delay="1500">
          <Button label="Warning" color="warning" />
        </Tooltip>
        
        <Tooltip text="Danger button tooltip" delay="2000">
          <Button label="Danger" color="danger" />
        </Tooltip>
      </div>
    `,
  }),
};

export const WithDifferentElements: Story = {
  render: () => ({
    components: { Tooltip },
    template: `
      <div class="flex gap-6 items-center flex-wrap">
        <Tooltip text="This is a text span with tooltip" delay="0">
          <span class="px-3 py-2 bg-blue-100 rounded cursor-pointer">Hover over this text</span>
        </Tooltip>
        
        <Tooltip text="Image with tooltip information" delay="500">
          <img 
            src="https://via.placeholder.com/100x60/4361ee/ffffff?text=Image" 
            alt="Placeholder" 
            class="rounded cursor-pointer"
          />
        </Tooltip>
        
        <Tooltip text="Input field tooltip" delay="1000">
          <input 
            type="text" 
            placeholder="Hover me" 
            class="px-3 py-2 border border-gray-300 rounded"
          />
        </Tooltip>
        
        <Tooltip text="Custom div with tooltip" delay="0">
          <div class="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg cursor-pointer flex items-center justify-center text-white font-bold">
            DIV
          </div>
        </Tooltip>
      </div>
    `,
  }),
};

export const ExampleFromUsage: Story = {
  args: {
    text: "This is a button that will display this message after 2 seconds if you continue to hover over it.",
    delay: 2000,
  },
  render: (args) => ({
    components: { Tooltip, Button },
    setup() {
      return { args };
    },
    template: `
      <Tooltip v-bind="args">
        <Button label="Example Button" color="primary" />
      </Tooltip>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story:
          "This story demonstrates the exact usage example provided in the requirements.",
      },
    },
  },
};
