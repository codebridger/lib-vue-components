import { Meta, StoryObj } from "@storybook/vue3/*";
import DashboardShell from "./DashboardShell.vue";
import { getNavPosition } from "../../.storybook/globalTypes";

// Import the markdown content
// import DashboardShellDocs from "./DashboardShell.mdx";

const meta = {
  title: "Shell/DashboardShell",
  component: DashboardShell,
  // subcomponents: { SidebarMenu, HorizontalMenu, Footer },
  tags: ["autodocs"],
  args: {
    menuStyle: "vertical",
    brandTitle: "VRISTO",
  },
  argTypes: {
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
      story: {
        inline: false,
        height: "400px",
      },
    },
  },
} satisfies Meta<typeof DashboardShell>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SimpleShell: Story = {
  render(args) {
    return {
      components: { DashboardShell },
      setup() {
        return { args };
      },
      template: `
	  <dashboard-shell v-bind="args">
      <template #horizontal-menu>
        <div class="p-2 text-center">Horizontal Menu Placeholder</div>
      </template>
        
      <template #sidebar-menu="{closeSidebar}">
        <div class="p-2 text-center">
          <h1>Sidebar Menu Placeholder</h1>
          <button class="my-2" @click="closeSidebar">Click for close</button>
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
