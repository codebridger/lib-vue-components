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
          <DashboardShell>
            <template #sidebar-menu>
              <story />
            </template >
          </DashboardShell>
        `,
      };
    },
  ],
} as Meta<typeof SidebarMenu>;

const Template: StoryFn<typeof SidebarMenu> = (args) => ({
  components: { SidebarMenu, DashboardShell },
  setup() {
    return { args };
  },
  template: '<SidebarMenu v-bind="args"/>',
});

export const DefaultSidebarMenu = Template.bind({});
DefaultSidebarMenu.args = {
  items: sidebarData,
};
