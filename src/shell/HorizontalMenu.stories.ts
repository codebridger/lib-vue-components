import { useAppStore } from "@/stores";
import HorizontalMenu from "./HorizontalMenu.vue";
import { horizontalMenuItems } from "./sidebar-data";
import { Meta, StoryFn } from "@storybook/vue3";

const horizontalMenuDescription = `
# HorizontalMenu

Responsive top navigation bar rendering a hierarchy of items with icons and labels. Integrates with the shell store to switch layout style.

## Features
- Renders menu items with nesting and icons
- Suited for wide screens; pairs with DashboardShell
- Works in LTR/RTL and dark mode contexts

## Usage
Supply a prepared items array. Keep labels concise; group related pages under dropdowns.
`;
export default {
  title: "Shell/HorizontalMenu",
  component: HorizontalMenu,
  tags: ["autodocs"],
  args: {
    items: horizontalMenuItems,
  },
  argTypes: {
    items: { control: "object" },
  },
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: horizontalMenuDescription,
      },
      story: {
        inline: false,
        height: "600px",
      },
    },
  },
  decorators: [
    (story: any) => {
      const store = useAppStore();
      store.toggleMenuStyle("horizontal");

      return {
        components: { story },
        template: `<story />`,
      };
    },
  ],
} as Meta<typeof HorizontalMenu>;

const Template: StoryFn<typeof HorizontalMenu> = (args) => ({
  components: { HorizontalMenu },
  setup() {
    return { args };
  },
  template: '<HorizontalMenu v-bind="args" />',
});

export const DefaultHorizontalMenu = Template.bind({});
DefaultHorizontalMenu.args = {
  items: horizontalMenuItems,
};
