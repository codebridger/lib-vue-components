import type { Meta, StoryObj } from "@storybook/vue3";
import Tooltip from "./Tooltip.vue";
import Button from "./Button.vue";

const tooltipDescription = `
Wrap any element to show helpful text on hover or focus. Placement, delay, and color are configurable for consistent guidance.

## Features
- Top/bottom/left/right placement
- Delay before showing to avoid flicker
- Color themes for contrast on light/dark backgrounds
- Disable when not needed

## Accessibility
- Should appear on focus as well as hover; ensure the trigger is keyboard reachable and supply concise, informative text.

## Usage
Use for short hints, not long-form content. Prefer inline help or docs links for complex explanations.
`;
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
      options: [
        "primary",
        "success",
        "info",
        "warning",
        "danger",
        "secondary",
        "white",
        "black",
        "system",
      ],
      description: "The color of the tooltip",
      defaultValue: "primary",
    },
    disabled: {
      control: "boolean",
      description: "Whether to disable the tooltip",
      defaultValue: false,
    },
  },
  args: {
    text: "This is a helpful tooltip message",
    delay: 0,
    placement: "bottom",
    color: "primary",
    disabled: false,
  },
  parameters: {
    docs: {
      description: {
        component: tooltipDescription,
      },
    },
  },
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    text: "This is a helpful tooltip message",
    delay: 0,
    placement: "bottom",
    color: "primary",
    disabled: false,
  },
  render: (args) => ({
    components: { Tooltip, Button },
    setup() {
      return { args };
    },
    template: `
      <Tooltip v-bind="args" class="flex justify-center">
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
    disabled: false,
  },
  render: (args) => ({
    components: { Tooltip, Button },
    setup() {
      return { args };
    },
    template: `
      <Tooltip v-bind="args" class="flex justify-center">
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
    disabled: false,
  },

  render: (args) => ({
    components: { Tooltip, Button },
    setup() {
      return { args };
    },
    template: `
      <Tooltip v-bind="args" class="flex justify-center">
        <Button label="Long tooltip text" color="success" />
      </Tooltip>
    `,
  }),
};
