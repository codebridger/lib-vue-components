import { type App } from "vue";

import { createPinia } from "pinia";
import Popper from "vue3-popper";
import PerfectScrollbar from "vue3-perfect-scrollbar";

import "./assets/css/app.css";
import appSetting from "./app-setting";
import components from "./components";

export interface PluginOptions {
  prefix?: string;
  dontInstallPinia?: boolean;
  dontInstallPopper?: boolean;
  dontInstallPerfectScrollbar?: boolean;
}

export default {
  install: (app: App, options: PluginOptions) => {
    const {
      prefix = "CL",
      dontInstallPinia = true,
      dontInstallPopper = false,
      dontInstallPerfectScrollbar = false,
    } = options || {};

    const hasRouter =
      app.config.globalProperties.$router ||
      app._context?.provides?.router ||
      false;

    if (!hasRouter) {
      console.error(
        "Router not found. Make sure you have installed the router."
      );
    }

    if (!dontInstallPinia) {
      const pinia = createPinia();
      app.use(pinia);
    }

    if (!dontInstallPerfectScrollbar) {
      app.use(PerfectScrollbar);
    }

    if (!dontInstallPopper) {
      app.component("Popper", Popper);
    }

    if (!prefix)
      throw "Component library needs a prefix to be added for all components";

    Object.keys(components).forEach((key) => {
      app.component(prefix + key, components[key]);
    });

    // Check if we're on client-side
    if (typeof window !== "undefined") {
      appSetting.init();
    }
  },
};
