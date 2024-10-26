import Popper from "vue3-popper";
import PerfectScrollbar from "vue3-perfect-scrollbar";
import appSetting from "./app-setting";
import components from "./components";

interface PluginOptions {
  prefix?: string;
}

export const defineNuxtPlugin = (nuxtApp, options: PluginOptions) => {
  const app = nuxtApp.vueApp;
  const prefix = options?.prefix || "";

  if (!prefix)
    throw "Component library needs a prefix to be added for all components";

  // Register components
  Object.keys(components).forEach((key) => {
    app.component(prefix + key, components[key]);
  });

  // Global components
  app.use(PerfectScrollbar);
  app.component("Popper", Popper);

  appSetting.init();
};
