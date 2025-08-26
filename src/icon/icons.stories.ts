import type { Meta, StoryObj } from "@storybook/vue3";
import Icon from "./Icon.vue";

import IconGallery from "../views/icons-gallery.vue";
import variantIcons from "./variant-icons";
import staticIcons from "./static-icons";
import menuIcons from "./menu-icons";

const iconDescription = `
Renders SVG icons from bundled packs (variant, static, and menu). Provides a simple API for choosing names and optional fill styles.

## Features
- Multiple icon packs unified under a single component
- Optional fill rendering for outlined vs. filled appearance
- Works seamlessly with dark mode and RTL

## Usage
Use semantic icon names. Pair with IconButton for interactive actions, or inline in inputs and menus.
`;
const meta = {
  // title: "Icons",
  component: Icon,
  parameters: {
    docs: {
      description: {
        component: iconDescription,
      },
    },
  },
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

// @ts-ignore
export const iconGallery: Story = {
  render(args) {
    return {
      components: { IconGallery },
      template: "<IconGallery />",
    };
  },
};
