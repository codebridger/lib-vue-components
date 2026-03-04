import { type App } from "vue";

import { createPinia } from "pinia";
import Popper from "vue3-popper";
import PerfectScrollbar from "vue3-perfect-scrollbar";

import "./assets/css/app.css";
import appSetting from "./app-setting";
import * as ShellComponents from "./shell/components";
import { PluginOptionsType } from "./types/initialize.type";

// Export all components from root level
export * from "./shell/components";
export * from "./elements/components";
export * from "./form/components";
export * from "./complex/components";

export default {
  install: (app: App, options: PluginOptionsType) => {
    const {
      dontInstallPinia = false,
      dontInstallPopper = false,
      dontInstallPerfectScrollbar = false,
      theme = "light",
      menu = "vertical",
      layout = "full",
      rtlClass = "ltr",
      animation = "animate__fadeIn",
      navbar = "navbar-sticky",
      semidark = false,
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

    // Components are now imported individually by users for better tree-shaking and flexibility.

    // Check if we're on client-side
    if (typeof window !== "undefined") {
      appSetting.init({
        theme,
        menu,
        layout,
        rtlClass,
        animation,
        navbar,
        semidark,
      });
    }
  },
};
