import { useAppStore } from "@/stores";
import DashboardShell from "./DashboardShell.vue";
import SidebarMenu from "./SidebarMenu.vue";
import { sidebarData } from "./sidebar-data";
import { Meta, StoryFn } from "@storybook/vue3";

export default {
  title: "Shell/SidebarMenu",
  component: SidebarMenu,
  tags: ["autodocs"],
  args: {
    items: sidebarData,
  },
  argTypes: {
    items: { control: "object" },
  },
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `
# SidebarMenu

Vertical navigation menu suitable for dashboards and admin panels. Displays labeled items, groups, and nested sections.

## Features
- Sticky sidebar layout with collapsible sections
- Integrates with store to control visibility
- Dark mode and RTL support

## Usage
Provide an items tree with groups and links. Keep the hierarchy shallow for discoverability.
`,
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
      store.toggleSidebar(true);

      return {
        components: { story, DashboardShell },
        template: `
            <section class="w-[260px] h-full shadow">
              <story />
            </section>
        `,
      };
    },
  ],
} as Meta<typeof SidebarMenu>;

const Template: StoryFn<typeof SidebarMenu> = (args) => ({
  components: { SidebarMenu },
  setup() {
    return { args };
  },
  template: '<SidebarMenu v-bind="args"/>',
});

export const DefaultSidebarMenu = Template.bind({});
DefaultSidebarMenu.args = {
  items: sidebarData,
  title: "SIDEBAR",
};
