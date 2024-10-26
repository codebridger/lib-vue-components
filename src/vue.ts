import { type App } from "vue";

import { createPinia } from "pinia";
import Popper from "vue3-popper";
import PerfectScrollbar from "vue3-perfect-scrollbar";

import "./assets/css/app.css";
import appSetting from "./app-setting";
import components from "./components";

interface PluginOptions {
  prefix?: string;
}

export default {
  install: (app: App, options: PluginOptions) => {
    const hasPinia =
      app.config.globalProperties.$pinia ||
      app._context?.provides?.pinia ||
      false;

    if (!hasPinia) {
      const pinia = createPinia();
      app.use(pinia);
    }

    const hasRouter =
      app.config.globalProperties.$router ||
      app._context?.provides?.router ||
      false;

    if (!hasRouter) {
      console.error(
        "Router not found. Make sure you have installed the router."
      );
    }

    app.use(PerfectScrollbar);

    app.component("Popper", Popper);

    // Register components
    const prefix = options.prefix || "";

    if (!prefix)
      throw "Component library needs a prefix to be added for all components";

    Object.keys(components).forEach((key) => {
      app.component(prefix + key, components[key]);
    });

    // Check if we're on client-side
    // const isClient = typeof window !== "undefined";
    // if (!isClient) {
    //   // Skip window-dependent operations during SSR
    //   return;
    // }

    appSetting.init();
  },
};
