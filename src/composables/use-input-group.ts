import { inject, computed, getCurrentInstance } from "vue";

interface InputGroupContext {
  isRtl: boolean;
  isDarkMode: boolean;
  error: boolean;
  disabled: boolean;
}

export function useInputGroup() {
  const inputGroupContext = inject<InputGroupContext | null>(
    "inputGroupContext",
    null
  );

  if (!inputGroupContext) {
    return {
      isInInputGroup: false,
      position: null,
      inputGroupClasses: computed(() => []),
      inputGroupItemClasses: computed(() => []),
      inputGroupBorderClasses: "",
    };
  }

  const instance = getCurrentInstance();
  const position = instance?.vnode?.props?.["data-input-group-position"] as
    | string
    | null;

  const inputGroupClasses = computed(() => {
    const classes: string[] = [];
    const { isRtl, error, disabled } = inputGroupContext;

    // Base classes for input group children
    classes.push("border");

    if (error) {
      classes.push("border-red-500");
    } else {
      classes.push("border-gray-300 dark:border-gray-600");
    }

    if (disabled) {
      classes.push("bg-gray-100 dark:bg-gray-700 cursor-not-allowed");
    } else {
      classes.push("bg-white dark:bg-gray-800");
    }

    // Position-based styling
    if (position) {
      if (position === "first") {
        classes.push(isRtl ? "rounded-r-md" : "rounded-l-md");
        classes.push(isRtl ? "border-l-0" : "border-r-0");
      } else if (position === "last") {
        classes.push(isRtl ? "rounded-l-md" : "rounded-r-md");
        classes.push(isRtl ? "border-r-0" : "border-l-0");
      } else if (position === "only") {
        classes.push("rounded-md");
      } else {
        // Middle elements
        classes.push("rounded-none");
        classes.push("border-l-0 border-r-0");
      }
    }

    return classes;
  });

  // Additional classes for InputGroupItem (non-form elements)
  const inputGroupItemClasses = computed(() => {
    const classes = [...inputGroupClasses.value];

    // Add default styling for non-form elements
    classes.push("bg-gray-100 dark:bg-gray-700");
    classes.push(
      "flex items-center px-3 text-sm font-medium text-gray-700 dark:text-gray-300"
    );

    return classes;
  });

  return {
    isInInputGroup: true,
    position,
    inputGroupClasses,
    inputGroupItemClasses,
    inputGroupBorderClasses: inject<string>("inputGroupBorderClasses", ""),
    context: inputGroupContext,
  };
}
