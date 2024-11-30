import { Meta, StoryObj } from "@storybook/vue3/*";
import DashboardShell from "./DashboardShell.vue";
import { getNavPosition } from "../../.storybook/globalTypes";

// Import the markdown content
// import DashboardShellDocs from "./DashboardShell.mdx";
import Button from "../elements/Button.vue";

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
