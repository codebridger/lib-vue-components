import { type App } from "vue";

import { createPinia } from "pinia";
import Popper from "vue3-popper";
import PerfectScrollbar from "vue3-perfect-scrollbar";

import "./assets/css/app.css";
import appSetting from "./app-setting";
import * as ShellComponents from "./shell/components";
import * as Components from "./elements/components";
import * as FormComponents from "./form/components";
import * as ComplexComponents from "./complex/components";
import { PluginOptionsType } from "./types/initialize.type";

// Export all components from root level
export * from "./shell/components";
export * from "./elements/components";
export * from "./form/components";
export * from "./complex/components";

export default {
  install: (app: App, options: PluginOptionsType) => {
    const {
      prefix = "CL",
      dontInstallPinia = true,
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

    if (!prefix)
      throw "Component library needs a prefix to be added for all components";

    Object.keys(ShellComponents).forEach((key) => {
      app.component(prefix + key, ShellComponents[key]);
    });

    Object.keys(Components).forEach((key) => {
      app.component(prefix + key, ShellComponents[key]);
    });

    Object.keys(FormComponents).forEach((key) => {
      app.component(prefix + key, FormComponents[key]);
    });

    Object.keys(ComplexComponents).forEach((key) => {
      app.component(prefix + key, ComplexComponents[key]);
    });

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
