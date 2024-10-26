import { Meta, StoryObj } from "@storybook/vue3/*";
import DashboardShell from "./DashboardShell.vue";
import SidebarMenu from "./SidebarMenu.vue";
import HorizontalMenu from "./HorizontalMenu.vue";
import Footer from "./Footer.vue";

// Import the markdown content
// import DashboardShellDocs from "./DashboardShell.mdx";

const meta = {
  title: "Shell/DashboardShell",
  component: DashboardShell,
  subcomponents: { SidebarMenu, HorizontalMenu, Footer },
  tags: ["autodocs"],
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
  render() {
    return {
      components: { DashboardShell, SidebarMenu, HorizontalMenu, Footer },
      template: `
	  <dashboard-shell>
		<template #horizontal-menu>
			<HorizontalMenu />
		</template>
			
		<template #sidebar-menu>
			<SidebarMenu />
		</template>

		<template #content>
			<h1>This is the body place holder</h1>
		</template>

		<template #footer>
			<h1>This is the footer place holder</h1>
		</template>
	  </dashboard-shell>
	  `,
    };
  },
};
