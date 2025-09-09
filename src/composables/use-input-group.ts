import { inject, computed, getCurrentInstance, ref } from "vue";

interface InputGroupContext {
  isRtl: boolean;
  isDarkMode: boolean;
  error: boolean;
  disabled: boolean;
  removeRightBorder?: boolean;
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
      inputGroupButtonClasses: computed(() => []),
      inputGroupBorderClasses: "",
    };
  }

  const instance = getCurrentInstance();
  const position = instance?.vnode?.props?.["data-input-group-position"] as
    | string
    | null;
  const removeRightBorder = instance?.vnode?.props?.[
    "data-input-group-remove-right-border"
  ] as boolean | null;
  const childIndex = instance?.vnode?.props?.["data-input-group-index"] as
    | number
    | null;

  // Track focus state for this specific child
  const isFocused = ref(false);

  const inputGroupClasses = computed(() => {
    const classes: string[] = [];
    const { isRtl, error, disabled } = inputGroupContext;

    // Base classes for input group children (replaces form-input)
    classes.push(
      "border px-4 py-2 text-sm font-semibold text-black dark:text-white-dark focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
    );

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

    // Position-based styling - with gaps, all elements get full borders and radius
    if (position) {
      if (position === "first") {
        classes.push(isRtl ? "rounded-r-md" : "rounded-l-md");
      } else if (position === "last") {
        classes.push(isRtl ? "rounded-l-md" : "rounded-r-md");
      } else if (position === "only") {
        classes.push("rounded-md");
      } else {
        // Middle elements - no radius
        classes.push("rounded-none");
      }
    }

    // Border removal for seamless connection - but not when focused
    if (removeRightBorder && !isFocused.value) {
      classes.push("border-r-0");
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

  // Classes for buttons in InputGroup (no flex-1, different styling)
  const inputGroupButtonClasses = computed(() => {
    const classes: string[] = [];
    const { isRtl, error, disabled } = inputGroupContext;

    // Base classes for buttons in input group - only border and padding
    classes.push(
      "border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
    );

    if (error) {
      classes.push("border-red-500");
    } else if (disabled) {
      classes.push("border-gray-300 dark:border-gray-600");
    }
    // Don't set border color when not disabled or error - let button color classes handle it

    if (disabled) {
      classes.push("bg-gray-100 dark:bg-gray-700 cursor-not-allowed");
    }
    // Don't set background color when not disabled - let button color classes handle it

    // Position-based styling - with gaps, all elements get full borders and radius
    if (position) {
      if (position === "first") {
        classes.push(isRtl ? "rounded-r-md" : "rounded-l-md");
      } else if (position === "last") {
        classes.push(isRtl ? "rounded-l-md" : "rounded-r-md");
      } else if (position === "only") {
        classes.push("rounded-md");
      } else {
        // Middle elements - no radius
        classes.push("rounded-none");
      }
    }

    // Border removal for seamless connection - but not when focused
    if (removeRightBorder && !isFocused.value) {
      classes.push("border-r-0");
    }

    return classes;
  });

  // Focus event handlers
  const handleFocus = () => {
    isFocused.value = true;
  };

  const handleBlur = () => {
    isFocused.value = false;
  };

  return {
    isInInputGroup: true,
    position,
    inputGroupClasses,
    inputGroupItemClasses,
    inputGroupButtonClasses,
    inputGroupBorderClasses: inject<string>("inputGroupBorderClasses", ""),
    context: inputGroupContext,
    handleFocus,
    handleBlur,
  };
}
