export function getColorScheme(defaultValue: string = "light") {
  return {
    name: "colorScheme",
    description: "Overall light or dark presentation",
    defaultValue,
    toolbar: {
      title: "Color Scheme",
      items: ["light", "dark", "system"],
      dynamicTitle: true,
    },
  };
}

export function getNavPosition(defaultValue: string = "vertical") {
  return {
    name: "navPosition",
    description: "Primary navigation paradigm",
    defaultValue,
    toolbar: {
      title: "Nav Position",
      items: ["horizontal", "vertical", "collapsible-vertical"],
    },
  };
}

export function getSemiDark(defaultValue: boolean = false) {
  return {
    name: "semiDark",
    description: "Sidebar & Header theme",
    defaultValue,
    toolbar: {
      title: "Semi Dark",
      items: [
        { value: true, title: "On" },
        { value: false, title: "Off" },
      ],
    },
  };
}

export function getLayoutStyle(defaultValue: string = "full") {
  return {
    name: "layoutStyle",
    description: "Primary layout style",
    defaultValue,
    toolbar: {
      title: "Layout Style",
      items: ["box", "full"],
    },
  };
}

export function getDirection(defaultValue: string = "ltr") {
  return {
    name: "direction",
    description: "Layout direction",
    defaultValue,
    toolbar: {
      title: "Direction",
      items: ["ltr", "rtl"],
    },
  };
}

export function getNavbarType(defaultValue: string = "sticky") {
  return {
    name: "navbarType",
    description: "Sticky or Floating",
    defaultValue,
    toolbar: {
      title: "Navbar Type",
      items: ["sticky", "floating", "static"],
    },
  };
}
