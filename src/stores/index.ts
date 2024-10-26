import { defineStore } from "pinia";
import { ref } from "vue";
import i18n from "../i18n";
import appSetting from "../app-setting";

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
  const languageList = ref([
    { code: "zh", name: "Chinese" },
    { code: "da", name: "Danish" },
    { code: "en", name: "English" },
    { code: "fr", name: "French" },
    { code: "de", name: "German" },
    { code: "el", name: "Greek" },
    { code: "hu", name: "Hungarian" },
    { code: "it", name: "Italian" },
    { code: "ja", name: "Japanese" },
    { code: "pl", name: "Polish" },
    { code: "pt", name: "Portuguese" },
    { code: "ru", name: "Russian" },
    { code: "es", name: "Spanish" },
    { code: "sv", name: "Swedish" },
    { code: "tr", name: "Turkish" },
    { code: "ae", name: "Arabic" },
  ]);
  const isShowMainLoader = ref(true);
  const semidark = ref(false);

  function setMainLayout(payload: any = null) {
    mainLayout.value = payload;
  }

  function toggleTheme(payload: any = null) {
    payload = payload || theme.value;
    localStorage.setItem("theme", payload);
    theme.value = payload;
    if (payload == "light") {
      isDarkMode.value = false;
    } else if (payload == "dark") {
      isDarkMode.value = true;
    } else if (payload == "system") {
      if (
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
      ) {
        isDarkMode.value = true;
      } else {
        isDarkMode.value = false;
      }
    }

    if (isDarkMode.value) {
      document.querySelector("body")?.classList.add("dark");
    } else {
      document.querySelector("body")?.classList.remove("dark");
    }
  }

  function toggleMenu(payload: any = null) {
    payload = payload || menu.value;
    sidebar.value = false;
    localStorage.setItem("menu", payload);
    menu.value = payload;
  }

  function toggleLayout(payload: any = null) {
    payload = payload || layout.value;
    localStorage.setItem("layout", payload);
    layout.value = payload;
  }

  function toggleRTL(payload: any = null) {
    payload = payload || rtlClass.value;
    localStorage.setItem("rtlClass", payload);
    rtlClass.value = payload;
    document
      .querySelector("html")
      ?.setAttribute("dir", rtlClass.value || "ltr");
  }

  function toggleAnimation(payload: any = null) {
    payload = payload || animation.value;
    payload = payload?.trim();
    localStorage.setItem("animation", payload);
    animation.value = payload;
    appSetting.changeAnimation();
  }

  function toggleNavbar(payload: any = null) {
    payload = payload || navbar.value;
    localStorage.setItem("navbar", payload);
    navbar.value = payload;
  }

  function toggleSemidark(payload: any = null) {
    payload = payload || false;
    localStorage.setItem("semidark", payload);
    semidark.value = payload;
  }

  function toggleLocale(payload: any = null) {
    payload = payload || locale.value;
    i18n.global.locale.value = payload;
    localStorage.setItem("i18n_locale", payload);
    locale.value = payload;
    if (locale.value?.toLowerCase() === "ae") {
      toggleRTL("rtl");
    } else {
      toggleRTL("ltr");
    }
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
    languageList,
    isShowMainLoader,
    semidark,
    setMainLayout,
    toggleTheme,
    toggleMenu,
    toggleLayout,
    toggleRTL,
    toggleAnimation,
    toggleNavbar,
    toggleSemidark,
    toggleLocale,
    toggleSidebar,
    toggleMainLoader,
  };
});
