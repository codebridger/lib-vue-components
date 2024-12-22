import { Meta, StoryObj } from "@storybook/vue3";
import { showToast } from "./toast";
import Button from "../elements/Button.vue";
import { s } from "@storybook/vue3/dist/render-0377a2e9";

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

// export const SuccessToast: Story = {
//   render: (args) => ({
//     components: { Button },
//     setup() {
//       delete args["variant"];
//       return { args };
//     },
//     template:
//       '<Button @click="successToast(args.message, args)">Show Success Toast</Button>',
//     methods: {
//       successToast,
//     },
//   }),
// };

// export const ErrorToast: Story = {
//   render: (args) => ({
//     components: { Button },
//     setup() {
//       delete args["variant"];
//       return { args };
//     },
//     template:
//       '<Button @click="errorToast(args.message, args)">Show Error Toast</Button>',
//     methods: {
//       errorToast,
//     },
//   }),
// };

// export const WarningToast: Story = {
//   render: () => ({
//     components: { Button },
//     template:
//       "<Button @click=\"warningToast('This is a warning toast')\">Show Warning Toast</Button>",
//     methods: {
//       warningToast,
//     },
//   }),
// };

// export const InfoToast: Story = {
//   render: () => ({
//     components: { Button },
//     template:
//       "<Button @click=\"infoToast('This is an info toast')\">Show Info Toast</Button>",
//     methods: {
//       infoToast,
//     },
//   }),
// };
