import { useAppStore } from "./stores/index";
import { AppSettingType } from "./types/initialize.type";

const isNotClient = typeof window === "undefined";

export default {
  init(
    config: AppSettingType = {
      theme: "light",
      menu: "vertical",
      layout: "full",
      rtlClass: "ltr",
      animation: "animate__fadeIn",
      navbar: "navbar-sticky",
      semidark: false,
    }
  ) {
    const store = useAppStore();

    // set default styles
    let val: any = localStorage.getItem("theme"); // light, dark, system
    val = val || config.theme;
    store.toggleTheme(val);

    val = localStorage.getItem("menu"); // vertical, collapsible-vertical, horizontal
    val = val || config.menu;
    store.toggleMenuStyle(val);

    val = localStorage.getItem("layout"); // full, boxed-layout
    val = val || config.layout;
    store.toggleLayout(val);

    val = localStorage.getItem("rtlClass"); // rtl, ltr
    val = val || config.rtlClass;
    store.toggleRTL(val);

    val = localStorage.getItem("animation"); // animate__fadeIn, animate__fadeInDown, animate__fadeInUp, animate__fadeInLeft, animate__fadeInRight, animate__slideInDown, animate__slideInLeft, animate__slideInRight, animate__zoomIn
    val = val || config.animation;
    store.toggleAnimation(val);

    val = localStorage.getItem("navbar"); // navbar-sticky, navbar-floating, navbar-static
    val = val || config.navbar;
    store.toggleNavbar(val);

    val = localStorage.getItem("semidark");
    val = val === "true" ? true : config.semidark;
    store.toggleSemidark(val);
  },

  changeAnimation(type = "add") {
    if (isNotClient) return;

    const store = useAppStore();

    if (store.animation) {
      const eleanimation: any = document.querySelector(".animation");

      if (type === "add") {
        eleanimation?.classList.add("animate__animated");
        eleanimation?.classList.add(store.animation);
      } else {
        eleanimation?.classList.remove("animate__animated");
        eleanimation?.classList.remove(store.animation);
      }
    }
  },
};
