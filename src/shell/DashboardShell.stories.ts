import { Meta, StoryObj } from "@storybook/vue3/*";
import { getNavPosition } from "../../.storybook/globalTypes";

import DashboardShell from "./DashboardShell.vue";
import HorizontalMenu from "./HorizontalMenu.vue";
import SidebarMenu from "./SidebarMenu.vue";
import { sidebarData, horizontalMenuItems } from "./sidebar-data";

// Import the markdown content
// import DashboardShellDocs from "./DashboardShell.mdx";
import Button from "../elements/Button.vue";

const dashboardShellDescription = `
# DashboardShell

Composable page shell providing header, horizontal menu, sidebar, content, and footer slots. Supports vertical and horizontal navigation styles.

## Features
- Slot-based regions: header, horizontal-menu, sidebar-menu, content, footer
- Toggleable menu visibility; vertical/horizontal navigation styles
- Works with HorizontalMenu and SidebarMenu components

## Usage
Wrap application pages to provide consistent navigation and scaffolding. Fill slots with your own menus and content.
`;
const meta = {
  title: "Shell/DashboardShell",
  component: DashboardShell,
  tags: ["autodocs"],
  args: {
    menuStyle: "vertical",
    brandTitle: "PilotsUI",
    hideMenu: false,
  },
  argTypes: {
    hideMenu: {
      control: "boolean",
    },
    brandTitle: {
      control: "text",
    },
    menuStyle: {
      control: "radio",
      options: getNavPosition().toolbar.items,
    },
  },
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: dashboardShellDescription,
      },
      story: {
        inline: false,
        height: "400px",
      },
    },
  },
} satisfies Meta<typeof DashboardShell>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FullSetupShell: Story = {
  render(args) {
    return {
      components: { DashboardShell, HorizontalMenu, SidebarMenu },
      setup() {
        return { args, sidebarData, horizontalMenuItems };
      },
      template: `
	  <dashboard-shell v-bind="args">
      <template #header>
        <div class="p-2 text-center">Header Bar Placeholder</div>
      </template>

      <template #horizontal-menu>
        <HorizontalMenu :items="horizontalMenuItems" />
      </template>
        
      <template #sidebar-menu="{closeSidebar}">
        <SidebarMenu :items="sidebarData" :title="args.brandTitle"/>
      </template>

      <template #content>
        <div class="mt-2">
          <h1>Body Placeholder</h1>
        </div>
      </template>

      <template #footer>
        <div class="p-2 ml-4">
          <h1>Footer Placeholder</h1>
        </div>
      </template>
	  </dashboard-shell>
	  `,
    };
  },
};

export const SimpleShell: Story = {
  render(args) {
    return {
      components: { DashboardShell, Button },
      setup() {
        return { args };
      },
      template: `
	  <dashboard-shell v-bind="args">
      <template #horizontal-menu>
        <div class="p-2 text-center">Horizontal Menu Placeholder</div>
      </template>
        
      <template #sidebar-menu="{closeSidebar}">
        <h1 class="w-full text-center p-2 truncate">Sidebar Menu Placeholder</h1>
        <div class="p-2 flex flex-col items-center">
          <Button full size="xs" class="my-2 scale-75" @click="closeSidebar">Toggle</Button>
        </div>
      </template>

      <template #content>
        <div class="mt-2">
          <h1>Body Placeholder</h1>
        </div>
      </template>

      <template #footer>
        <div class="p-2 ml-4">
          <h1>Footer Placeholder</h1>
        </div>
      </template>
	  </dashboard-shell>
	  `,
    };
  },
};
