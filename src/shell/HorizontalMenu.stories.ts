import { useAppStore } from "@/stores";
import DashboardShell from "./DashboardShell.vue";
import HorizontalMenu from "./HorizontalMenu.vue";
import { horizontalMenuItems } from "./sidebar-data";
import { Meta, StoryFn } from "@storybook/vue3";

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
      story: {
        inline: false,
        height: "600px",
      },
    },
  },
  decorators: [
    (story: any) => {
      const store = useAppStore();
      store.toggleMenuPosition("horizontal");

      return {
        components: { story, DashboardShell },
        template: `
          <DashboardShell>
            <template #horizontal-menu>
              <story />
            </template>
          </DashboardShell>
        `,
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
