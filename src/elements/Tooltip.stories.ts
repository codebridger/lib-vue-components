import type { Meta, StoryObj } from "@storybook/vue3";
import Tooltip from "./Tooltip.vue";
import Button from "./Button.vue";

const meta = {
  title: "Elements/Tooltip",
  component: Tooltip,
  tags: ["autodocs"],
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
    placement: {
      control: "select",
      options: ["top", "bottom", "left", "right"],
      description: "The placement of the tooltip",
      defaultValue: "bottom",
    },
    color: {
      control: "select",
      options: ["primary", "secondary", "success", "info", "warning", "danger"],
      description: "The color of the tooltip",
      defaultValue: "primary",
    },
    show: {
      control: "boolean",
      description: "Whether to show the tooltip",
      defaultValue: null,
    },
    disabled: {
      control: "boolean",
      description: "Whether to disable the tooltip",
      defaultValue: false,
    },
    interactive: {
      control: "boolean",
      description: "Whether the tooltip should be interactive",
      defaultValue: true,
    },
  },
  args: {
    text: "This is a helpful tooltip message",
    delay: 1000,
    placement: "bottom",
    color: "primary",
    show: null,
    disabled: false,
    interactive: true,
  },
  parameters: {
    docs: {
      description: {
        component:
          "A tooltip component that can wrap around any element and display text on hover with customizable delay.",
      },
    },
  },
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    text: "This is a helpful tooltip message",
    delay: 1000,
    placement: "bottom",
    color: "primary",
    show: null,
    disabled: false,
    interactive: true,
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
    placement: "bottom",
    color: "primary",
    show: null,
    disabled: false,
    interactive: true,
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
    placement: "bottom",
    color: "primary",
    show: null,
    disabled: false,
    interactive: true,
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
