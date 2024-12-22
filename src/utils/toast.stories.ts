import { Meta, StoryObj } from "@storybook/vue3";
import { showToast } from "./toast";
import Button from "../elements/Button.vue";

const meta: Meta = {
  title: "Utilities/Toast",
  //   component: Button,
  //   tags: ["autodocs"],
  argTypes: {
    message: { control: "text" },
    variant: {
      control: "radio",
      options: ["default", "success", "danger", "warning", "info"],
    },
    position: {
      control: "radio",
      options: ["top-right", "top-left", "bottom-right", "bottom-left"],
    },
    duration: { control: "number" },
    showCloseButton: { control: "boolean" },
    onDismiss: { action: "dismissed" },
    containerId: { control: "text" },
    isRTL: { control: "boolean" },
  },
  args: {
    message: "This is a toast message",
    variant: "default",
    position: "top-right",
    duration: 3000,
    showCloseButton: true,
    onDismiss: () => {},
    containerId: "",
    isRTL: false,
  },

  parameters: {
    layout: "centered",
    docs: {
      source: {
        type: "code",
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const DefaultToast: Story = {
  render: (args) => ({
    components: { Button },
    setup() {
      return { args };
    },
    template:
      '<Button color="primary" @click="showToast(args)">Send a Toast</Button>',
    methods: {
      showToast,
    },
  }),
};
