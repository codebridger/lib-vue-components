import { Meta, StoryFn } from "@storybook/vue3";

import {
  getColorScheme,
  getDirection,
  getLayoutStyle,
} from "../../.storybook/globalTypes";
import AppRoot from "./AppRoot.vue";

export default {
  title: "Shell/AppRoot",
  component: AppRoot,
  tags: ["autodocs", "!dev"],
  args: {
    colorScheme: "light",
    layoutStyle: "full",
    direction: "ltr",
  },
  argTypes: {
    colorScheme: {
      control: "radio",
      options: getColorScheme().toolbar.items,
    },
    layoutStyle: {
      control: "radio",
      options: getLayoutStyle().toolbar.items,
    },
    direction: {
      control: "radio",
      options: getDirection().toolbar.items,
    },
  },
  parameters: {
    layout: "fullscreen",
    skipMainDecorator: true,
    docs: {
      story: {
        /**
         * https://storybook.js.org/docs/api/doc-blocks/doc-block-story#inline
         * Setting the inline option to false will prevent the associated controls from updating the story within the documentation page.
         * This is a known limitation of the current implementation and will be addressed in a future release.
         */
        inline: false,
        height: "300px",
      },
    },
  },
} as Meta<typeof AppRoot>;

export const Default: StoryFn<typeof AppRoot> = (args) => ({
  components: { AppRoot },
  setup() {
    console.log("args", args);
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
