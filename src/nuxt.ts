import vueInstall, { PluginOptions } from "./vue";

export const defineNuxtPlugin = (nuxtApp, options: PluginOptions) => {
  const app = nuxtApp.vueApp;
  return vueInstall.install(app, options);
};
