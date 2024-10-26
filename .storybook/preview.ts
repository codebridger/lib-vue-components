import { type Preview, setup } from "@storybook/vue3";

import { h, type App } from "vue";

import router from "../src/router/index";

import PerfectScrollbar from "vue3-perfect-scrollbar";
import { createPinia } from "pinia";
import i18n from "../src/i18n";

import "../src/assets/css/app.css";
import "../src/assets/css/animate.css";

import { mainDecorator } from "./decorators";
import { getColorScheme, getDirection } from "./globalTypes";

const pinia = createPinia();

setup((app: App) => {
  app.use(router);
  app.use(pinia);
  app.use(i18n);
  app.use(PerfectScrollbar);
});

const preview: Preview = {
  globalTypes: { colorScheme: getColorScheme(), direction: getDirection() },
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
        order: ["Introduction"],
      },
    },
  },
  decorators: [mainDecorator as any],
};

export default preview;
