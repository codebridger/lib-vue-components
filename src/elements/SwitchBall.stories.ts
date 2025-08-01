import type { Meta, StoryObj } from "@storybook/vue3";
import { expect, within, userEvent } from "@storybook/test";
import SwitchBall from "./SwitchBall.vue";

const meta = {
  title: "Elements/SwitchBall",
  component: SwitchBall,
  tags: ["autodocs"],
  argTypes: {
    modelValue: {
      control: "boolean",
      description: "Switch state (on/off)",
    },
    label: {
      control: "text",
      description: "Label text",
    },
    sublabel: {
      control: "text",
      description: "Secondary label text displayed below the main label",
    },
    color: {
      control: "select",
      options: [
        "primary",
        "info",
        "success",
        "warning",
        "danger",
        "secondary",
        "dark",
        "gradient",
      ],
      description: "Color theme of the switch",
    },
    iconName: {
      control: "text",
      description: "Icon name to be displayed",
    },
    id: {
      control: "text",
      description: "Input ID attribute for label association",
    },
  },
  args: {
    modelValue: false,
    label: "",
    sublabel: "",
    color: "primary",
    iconName: "IconCheck",
    id: "switch-1",
  },
  parameters: {
    docs: {
      description: {
        component: `
# SwitchBall Component

A customizable switch/toggle component with support for labels, sublabels, and various color themes.

## Features
- Toggle switch with smooth animations
- Support for main label and sublabel
- Multiple color themes
- Icon integration
- Accessible design with proper ARIA attributes

## Basic Usage

\`\`\`vue
<template>
  <SwitchBall
    v-model="isEnabled"
    label="Notifications"
    sublabel="Receive email notifications"
    color="primary"
    icon-name="IconBell"
    id="notifications-switch"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import SwitchBall from './SwitchBall.vue'

const isEnabled = ref(false)
</script>
\`\`\`
        `,
      },
      source: {
        type: "code",
      },
    },
  },
} satisfies Meta<typeof SwitchBall>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Default Switch",
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("Verify switch renders correctly", async () => {
      const switchInput = canvas.getByRole("checkbox");
      expect(switchInput).toBeInTheDocument();
      expect(switchInput).not.toBeChecked();
    });

    await step("Verify label is displayed", async () => {
      const label = canvas.getByText("Default Switch");
      expect(label).toBeInTheDocument();
    });

    await step("Test switch interaction", async () => {
      const switchInput = canvas.getByRole("checkbox");
      await userEvent.click(switchInput);
      expect(switchInput).toBeChecked();
    });
  },
};

export const WithSublabel: Story = {
  args: {
    label: "Notifications",
    sublabel: "Receive email notifications",
    id: "notifications-switch",
  },
  parameters: {
    docs: {
      description: {
        story: "Switch with both main label and descriptive sublabel.",
      },
    },
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("Verify switch with sublabel renders correctly", async () => {
      const switchInput = canvas.getByRole("checkbox");
      expect(switchInput).toBeInTheDocument();
      expect(switchInput).not.toBeChecked();
    });

    await step("Verify main label is displayed", async () => {
      const label = canvas.getByText("Notifications");
      expect(label).toBeInTheDocument();
    });

    await step("Verify sublabel is displayed", async () => {
      const sublabel = canvas.getByText("Receive email notifications");
      expect(sublabel).toBeInTheDocument();
    });

    await step("Test switch interaction", async () => {
      const switchInput = canvas.getByRole("checkbox");
      await userEvent.click(switchInput);
      expect(switchInput).toBeChecked();
    });
  },
};

export const CustomIcon: Story = {
  args: {
    label: "Custom Icon Switch",
    iconName: "IconMail",
    color: "info",
  },
  parameters: {
    docs: {
      description: {
        story: "Switch with a custom icon instead of the default check icon.",
      },
    },
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("Verify custom icon switch renders correctly", async () => {
      const switchInput = canvas.getByRole("checkbox");
      expect(switchInput).toBeInTheDocument();
      expect(switchInput).not.toBeChecked();
    });

    await step("Verify label is displayed", async () => {
      const label = canvas.getByText("Custom Icon Switch");
      expect(label).toBeInTheDocument();
    });

    await step("Test switch interaction", async () => {
      const switchInput = canvas.getByRole("checkbox");
      await userEvent.click(switchInput);
      expect(switchInput).toBeChecked();
    });
  },
};
