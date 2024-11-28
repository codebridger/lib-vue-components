import { defineStore } from "pinia";
import { ref } from "vue";

import appSetting from "../app-setting";

const isNotClient = typeof window === "undefined";
const isClient = typeof window !== "undefined";

export const useAppStore = defineStore("app", () => {
  const isDarkMode = ref(false);
  const mainLayout = ref("app");
  const theme = ref("light");
  const menu = ref("vertical");
  const layout = ref("full");
  const rtlClass = ref("ltr");
  const animation = ref("");
  const navbar = ref("navbar-sticky");
  const locale = ref("en");
  const sidebar = ref(false);
  const isShowMainLoader = ref(true);
  const semidark = ref(false);

  function setMainLayout(payload: any = null) {
    mainLayout.value = payload;
  }

  function setItem(key: string, payload: any) {
    if (isNotClient) return;
    localStorage.setItem(key, payload);
  }

  function toggleTheme(payload: "light" | "dark" | "system" | any = null) {
    payload = payload || theme.value;
    setItem("theme", payload);
    theme.value = payload;
    if (payload == "light") {
      isDarkMode.value = false;
    } else if (payload == "dark") {
      isDarkMode.value = true;
    } else if (payload == "system") {
      if (
        isClient &&
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
      ) {
        isDarkMode.value = true;
      } else {
        isDarkMode.value = false;
      }
    }

    if (isClient && isDarkMode.value) {
      document.querySelector("body")?.classList.add("dark");
    } else if (isClient) {
      document.querySelector("body")?.classList.remove("dark");
    }
  }

  function toggleMenuPosition(
    payload: "vertical" | "horizontal" | "collapsible-vertical" | string = ""
  ) {
    payload = payload || menu.value;
    sidebar.value = false;
    setItem("menu", payload);
    menu.value = payload;
  }

  function toggleLayout(payload: "boxed-layout" | "full" | any = null) {
    payload = payload || layout.value;
    setItem("layout", payload);
    layout.value = payload;
  }

  function toggleRTL(payload: "ltr" | "rtl" | any = null) {
    payload = payload || rtlClass.value;
    setItem("rtlClass", payload);
    rtlClass.value = payload;

    if (isClient) {
      document
        .querySelector("html")
        ?.setAttribute("dir", rtlClass.value || "ltr");
    }
  }

  function toggleAnimation(payload: any = null) {
    payload = payload || animation.value;
    payload = payload?.trim();
    setItem("animation", payload);
    animation.value = payload;
    appSetting.changeAnimation();
  }

  function toggleNavbar(
    payload: "navbar-sticky" | "navbar-static" | "navbar-floating"
  ) {
    payload = payload || navbar.value;
    setItem("navbar", payload);
    navbar.value = payload;
  }

  function toggleSemidark(payload: any = null) {
    payload = payload || false;
    setItem("semidark", payload);
    semidark.value = payload;
  }

  function toggleSidebar(state: boolean = false) {
    sidebar.value = !sidebar.value;
  }

  function toggleMainLoader(state: boolean = false) {
    isShowMainLoader.value = true;
    setTimeout(() => {
      isShowMainLoader.value = false;
    }, 500);
  }

  return {
    isDarkMode,
    mainLayout,
    theme,
    menu,
    layout,
    rtlClass,
    animation,
    navbar,
    locale,
    sidebar,
    isShowMainLoader,
    semidark,
    setMainLayout,
    toggleTheme,
    toggleMenuPosition,
    toggleLayout,
    toggleRTL,
    toggleAnimation,
    toggleNavbar,
    toggleSemidark,
    toggleSidebar,
    toggleMainLoader,
  };
});
