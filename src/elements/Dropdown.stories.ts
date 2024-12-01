import type { Meta, StoryObj } from "@storybook/vue3";
import type { Placement } from "@popperjs/core";
import Dropdown from "./Dropdown.vue";
import Icon from "@/icon/Icon.vue";
import Button from "./Button.vue";

const meta = {
  title: "Elements/Dropdown",
  component: Dropdown,

  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      story: {
        height: "250px",
      },
    },
  },
  argTypes: {
    triggerText: {
      control: "text",
      description: "Text for the dropdown trigger button",
    },
    placement: {
      control: "select",
      options: [
        "auto",
        "auto-start",
        "auto-end",
        "top",
        "top-start",
        "top-end",
        "bottom",
        "bottom-start",
        "bottom-end",
        "right",
        "right-start",
        "right-end",
        "left",
        "left-start",
        "left-end",
      ],
      description: "Preferred placement of the dropdown",
    },
    offsetDistance: {
      control: "number",
      description: "Offset in pixels away from the trigger element",
    },
    offsetSkid: {
      control: "number",
      description: "Offset in pixels along the trigger element",
    },
    hover: {
      control: "boolean",
      description: "Trigger the dropdown on hover",
    },
    disabled: {
      control: "boolean",
      description: "Disable the dropdown",
    },
    interactive: {
      control: "boolean",
      description: "Allow interaction with dropdown content",
    },
    arrow: {
      control: "boolean",
      description: "Show an arrow pointer",
    },
    locked: {
      control: "boolean",
      description: "Lock the dropdown in place (prevents auto-flipping)",
    },
    zIndex: {
      control: "number",
      description: "Z-index of the dropdown",
    },
    arrowPadding: {
      control: "number",
      description: "Padding for the arrow in pixels",
    },
    closeDelay: {
      control: "number",
      description: "Delay in milliseconds before closing the dropdown",
    },
    openDelay: {
      control: "number",
      description: "Delay in milliseconds before opening the dropdown",
    },
    disableClickAway: {
      control: "boolean",
      description: "Disable closing the dropdown on click away",
    },
    show: {
      control: "boolean",
      description: "Manually control the visibility of the dropdown",
    },
    content: {
      control: "text",
      description: "Text content for simple dropdowns",
    },
  },
  args: {
    triggerText: "Dropdown",
    placement: "bottom-end" as Placement,
    offsetDistance: 0,
    offsetSkid: 0,
    hover: false,
    disabled: false,
    interactive: true,
    arrow: false,
    locked: false,
    zIndex: 9999,
    arrowPadding: 0,
    closeDelay: 0,
    openDelay: 0,
    disableClickAway: false,
    show: null,
    content: "",
  },
} satisfies Meta<typeof Dropdown>;

export default meta;

type Story = StoryObj<typeof meta>;

const defaultTemplate = `
  <Dropdown v-bind="args">
    <template #body="{ close }">
      <ul @click="close()" class="whitespace-nowrap">
        <li><a href="javascript:;">Action</a></li>
        <li><a href="javascript:;">Another action</a></li>
        <li><a href="javascript:;">Something else here</a></li>
        <li><a href="javascript:;">Separated link</a></li>
      </ul>
    </template>
  </Dropdown>
`;

// Default dropdown story
export const Default: Story = {
  render: (args) => ({
    components: { Dropdown, Button, Icon },
    setup() {
      return { args, triggerText: "Action" };
    },
    template: defaultTemplate,
  }),
};

// Hover trigger story
export const HoverTrigger: Story = {
  args: {
    hover: true,
    placement: "bottom-start",
  },
  render: (args) => ({
    components: { Dropdown, Button, Icon },
    setup() {
      return { args, triggerText: "Hover Me" };
    },
    template: defaultTemplate,
  }),
};

// With arrow story
export const WithArrow: Story = {
  args: {
    arrow: true,
    offsetDistance: "12",
  },
  render: (args) => ({
    components: { Dropdown, Button, Icon },
    setup() {
      return { args, triggerText: "With Arrow" };
    },
    template: defaultTemplate,
  }),
};

// With custom offset story
export const CustomOffset: Story = {
  args: {
    offsetDistance: "20",
    offsetSkid: "10",
  },
  render: (args) => ({
    components: { Dropdown, Button, Icon },
    setup() {
      return { args, triggerText: "Custom Offset" };
    },
    template: defaultTemplate,
  }),
};

// Disabled state story
export const Disabled: Story = {
  args: {
    disabled: true,
  },
  render: (args) => ({
    components: { Dropdown, Button, Icon },
    setup() {
      return { args, triggerText: "Disabled" };
    },
    template: defaultTemplate,
  }),
};

// Interactive content story
export const InteractiveContent: Story = {
  args: {
    interactive: true,
    // offsetDistance: "8",
  },
  render: (args) => ({
    components: { Dropdown, Button, Icon },
    setup() {
      return { args };
    },
    template: `
      <Dropdown v-bind="args">
        <template #body="{ close }">
          <div class="p-4 min-w-[200px] bg-white dark:bg-black">
            <input type="text" class="form-input mb-2 w-full" placeholder="Type something..." />
            <button class="btn btn-primary w-full" @click="close">
              Submit
            </button>
          </div>
        </template>
      </Dropdown>
    `,
  }),
};

// RTL support story
export const RTLSupport: Story = {
  args: {
    triggerText: "قائمة منسدلة",
    placement: "bottom-start",
  },
  render: (args) => ({
    components: { Dropdown, Button, Icon },
    setup() {
      return { args };
    },
    template: `
      <div dir="rtl">
        <Dropdown v-bind="args">
          <template #body="{ close }">
            <ul @click="close()" class="whitespace-nowrap">
              <li><a href="javascript:;">العنصر الأول</a></li>
              <li><a href="javascript:;">العنصر الثاني</a></li>
              <li><a href="javascript:;">العنصر الثالث</a></li>
            </ul>
          </template>
        </Dropdown>
      </div>
    `,
  }),
};
