import RootApp from "../src/shell/AppRoot.vue";
import { useAppStore } from "../src/stores/index";
import { DecoratorFunction } from "storybook/internal/types";

export const mainDecorator: DecoratorFunction = (story: any, context: any) => {
  const store = useAppStore();

  if (context.globals.colorScheme) {
    store.toggleTheme(context.globals.colorScheme);
  }

  if (context.globals.navPosition) {
    store.toggleMenuStyle(context.globals.navPosition);
  }

  if (context.globals.layoutStyle) {
    store.toggleLayout(context.globals.layoutStyle);
  }

  if (context.globals.direction) {
    store.toggleRTL(context.globals.direction);
  }

  if (context.globals.navbarType) {
    store.toggleNavbar(context.globals.navbarType);
  }

  // Check if the story wants to skip this decorator
  if (context.parameters.skipMainDecorator) {
    return {
      name: "default",
      components: { story },
      template: "<story />",
    };
  }

  return {
    name: "default",
    components: { RootApp, story },
    template: "<RootApp><story/></RootApp>",
  };
};
