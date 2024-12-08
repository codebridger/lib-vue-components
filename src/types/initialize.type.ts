export type AnimationType =
  | ""
  | "animate__fadeIn"
  | "animate__fadeInDown"
  | "animate__fadeInUp"
  | "animate__fadeInLeft"
  | "animate__fadeInRight"
  | "animate__slideInDown"
  | "animate__slideInLeft"
  | "animate__slideInRight"
  | "animate__zoomIn";

export interface AppSettingType {
  theme?: "light" | "dark" | "system";
  menu?: "vertical" | "horizontal" | "collapsible-vertical" | string;
  layout?: "boxed-layout" | "full" | any;
  rtlClass?: "ltr" | "rtl" | any;
  animation?: AnimationType | any;
  navbar?: "navbar-sticky" | "navbar-static" | "navbar-floating" | any;
  semidark?: boolean;
}

export interface PluginOptionsType extends AppSettingType {
  prefix?: string;
  dontInstallPinia?: boolean;
  dontInstallPopper?: boolean;
  dontInstallPerfectScrollbar?: boolean;
}
