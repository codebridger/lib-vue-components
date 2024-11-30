import { type Preview, setup } from "@storybook/vue3";

import { type App } from "vue";

import router from "../src/router/index";

import PerfectScrollbar from "vue3-perfect-scrollbar";
import { createPinia } from "pinia";

import "../src/assets/css/app.css";
import "../src/assets/css/animate.css";

import { mainDecorator } from "./decorators";
import { getColorScheme, getDirection, getLayoutStyle } from "./globalTypes";

const pinia = createPinia();

setup((app: App) => {
  app.use(router);
  app.use(pinia);
  app.use(PerfectScrollbar);
});

const preview: Preview = {
  globalTypes: {
    colorScheme: getColorScheme(),
    direction: getDirection(),
    layoutStyle: getLayoutStyle(),
  },
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    options: {
      storySort: {
        // order of the stories including all mdx and stories files
        order: ["Getting Started", "Shell"],
      },
    },
  },
  decorators: [mainDecorator as any],
};

export default preview;
