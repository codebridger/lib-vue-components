import type { Meta, StoryObj } from "@storybook/vue3";
import Icon from "./Icon.vue";

import IconGallery from "../views/icons-gallery.vue";
import variantIcons from "./variant-icons";
import staticIcons from "./static-icons";
import menuIcons from "./menu-icons";

const meta = {
  // title: "Icons",
  component: Icon,
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default Avatar
export const variant: Story = {
  argTypes: {
    name: {
      control: "select",
      options: Object.keys(variantIcons),
    },
    fill: {
      control: "boolean",
    },
  },
  args: {
    name: "IconAirplay",
    fill: false,
  },
};

export const SingleVariant: Story = {
  argTypes: {
    name: {
      control: "select",
      options: Object.keys(staticIcons).concat(Object.keys(menuIcons)),
    },
  },
  args: {
    name: "IconMenuScrumboard",
  },
};

export const iconGallery: Story = {
  render(args) {
    return {
      components: { IconGallery },
      template: "<IconGallery />",
    };
  },
};
