import { Meta, StoryFn } from "@storybook/vue3";

import AppRoot from "./AppRoot.vue";

export default {
  title: "Shell/AppRoot",
  component: AppRoot,
  //   tags: ["autodocs"],
  args: {
    showSettings: true,
  },
  parameters: {
    layout: "fullscreen", // Remove padding in docs too
    docs: {
      story: {
        inline: false,
        height: "300px",
      },
    },
  },
} as Meta<typeof AppRoot>;

export const Default: StoryFn<typeof AppRoot> = (args) => ({
  components: { AppRoot },
  parameters: {
    skipMainDecorator: true,
  },
  args: {
    showSettings: true,
  },
  setup() {
    return { args };
  },
  template: `
	  <AppRoot v-bind="args">
  		<div class="h-screen flex justify-center items-center">
		  <p>The very beginning of the app</p>
  		</div>
	  </AppRoot>
	`,
});
