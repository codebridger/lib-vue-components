import { PluginOptionsType } from "./types/initialize.type";
import vueInstall from "./vue";

export const defineNuxtPlugin = (nuxtApp, options: PluginOptionsType) => {
  const app = nuxtApp.vueApp;
  return vueInstall.install(app, options);
};
