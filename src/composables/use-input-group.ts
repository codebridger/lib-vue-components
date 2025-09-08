import { inject, computed } from "vue";

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
    };
  }

  const inputGroupClasses = computed(() => {
    const classes: string[] = [];
    const { isRtl, error, disabled } = inputGroupContext;

    // Base classes for input group children
    classes.push("border-gray-300 dark:border-gray-600");

    if (error) {
      classes.push("border-red-500");
    }

    if (disabled) {
      classes.push("bg-gray-100 dark:bg-gray-700 cursor-not-allowed");
    } else {
      classes.push("bg-white dark:bg-gray-800");
    }

    return classes;
  });

  return {
    isInInputGroup: true,
    position: null,
    inputGroupClasses,
    context: inputGroupContext,
  };
}
