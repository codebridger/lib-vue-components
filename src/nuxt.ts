import { AppSetting } from "./app-setting";
import vueInstall, { PluginOptions } from "./vue";

export const defineNuxtPlugin = (
  nuxtApp,
  options: PluginOptions & AppSetting
) => {
  const app = nuxtApp.vueApp;
  return vueInstall.install(app, options);
};
