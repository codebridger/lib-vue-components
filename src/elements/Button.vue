<template>
  <component
    ref="buttonRef"
    :is="to && !chip ? 'a' : 'button'"
    @click="onClick"
    :href="!disabled && !cardDisabled && !chip ? to : undefined"
    :type="to && !chip ? undefined : 'button'"
    :style="chipGradientStyle"
    :class="[
      // base class - only apply when NOT in InputGroup
      { btn: !isInInputGroup },
      'text-xs sm:text-sm', // responsive text size
      'transition-all', // transition effect
      { 'w-full': props.block }, // conditional full width
      // InputGroup styling takes precedence
      isInInputGroup
        ? [
            ...inputGroupButtonClasses,
            'h-10',
            'flex items-center justify-center',
            // Apply button color and effects even in InputGroup
            computedColor,
            computedActiveColor,
            computedFocusColor,
            computedHoverNeutralizeClasses,
          ]
        : [
            disabled || cardDisabled
              ? 'bg-gray-100 cursor-not-allowed'
              : computedColor, // color class
            computedSize, // size class
            computedShadow, // shadow class
            computedRounded, // rounded corners class
            props.textTransform, // text transform class
            computedBorderType, // border type class
            computedActiveColor, // active effect class
            computedFocusColor, // focus effect class
            // Chip mode: disable pointer cursor and hover/active bg fills
            props.chip
              ? 'pointer-events-none cursor-default select-none'
              : undefined,
            // Loading: keep interactive but do not show pointer cursor
            isLoading ? 'cursor-default' : undefined,
            computedHoverNeutralizeClasses,
            props.chip ? 'is-chip' : undefined,
          ],
    ]"
    :disabled="disabled || cardDisabled || isLoading ? true : undefined"
    @focus="handleFocusEvent"
    @blur="handleBlurEvent"
  >
    <!-- Loading Icon -->
    <span
      :class="[
        'transition-all overflow-hidden align-middle shrink-0 flex items-center justify-center',
        isLoading ? 'w-5 ltr:mr-2 rtl:ml-2' : 'w-0',
      ]"
    >
      <Icon
        v-if="isLoading"
        :name="loadingIcon"
        class="animate-[spin_2s_linear_infinite]"
      />
    </span>

    <!-- Icon Slot or Icon from props -->
    <span v-if="hasIcon" class="inline-flex align-middle">
      <slot name="icon">
        <Icon v-if="iconName" :name="iconName" :class="iconClass" />
      </slot>
    </span>

    <!-- Label Slot or Text Label -->
    <span
      :class="[{ 'ltr:ml-2 rtl:mr-2': hasIcon && label }]"
      :style="chipGradientTextStyle"
    >
      <slot>{{ label }}</slot>
    </span>

    <!-- Chip Close Icon (appears on opposite side of the text) -->
    <i
      v-if="chip"
      class="inline-flex align-middle cursor-pointer pointer-events-auto ltr:ml-2 rtl:mr-2 ltr:order-last rtl:order-first hover:opacity-80 active:opacity-70"
      @click.stop="onChipClick"
      aria-label="Remove"
      role="button"
    >
      <Icon name="IconX" class="w-4 h-4" />
    </i>
  </component>
</template>

<script setup lang="ts">
import { computed, inject, useSlots, ref, nextTick } from "vue";
import Icon from "../icon/Icon.vue";
import { useInputGroup } from "../composables/use-input-group";

// Define button props interface
interface ButtonProps {
  color?:
    | "primary"
    | "info"
    | "success"
    | "warning"
    | "danger"
    | "secondary"
    | "dark"
    | "gradient";
  size?: "xs" | "sm" | "md" | "lg";
  textTransform?: "normal-case" | "capitalize" | "lowercase" | "uppercase";
  rounded?: "full" | "none" | "xs" | "sm" | "md" | "lg" | "xl";
  label?: string;
  block?: boolean;
  outline?: boolean;
  shadow?: boolean;
  disabled?: boolean;
  /** Border type */
  borderType?: "solid" | "dashed" | "dotted";
  /**
   * You can insert the Icon's name from here or add your icons.
   */
  loadingIcon?: "IconLoader" | "IconRefresh" | "IconRestore" | string;
  isLoading?: boolean;
  /** Link path when button should act as a link */
  to?: string;
  /** Icon name to display */
  iconName?: string;
  /** Additional classes for the icon */
  iconClass?: string;
  /** Enable chip mode with close icon and dedicated click event */
  chip?: boolean;
}

const cardDisabled = inject<boolean>("cardDisabled", false);
const slots = useSlots();
const { isInInputGroup, inputGroupButtonClasses, handleFocus, handleBlur } =
  useInputGroup();

// Template ref for the button element
const buttonRef = ref<HTMLElement | null>(null);

// Define button props with defaults
const props = withDefaults(defineProps<ButtonProps>(), {
  textTransform: "normal-case",
  block: false,
  outline: false,
  shadow: false,
  borderType: "solid",
  isLoading: false,
  loadingIcon: "IconLoader",
  chip: false,
});

// Define the emits with TypeScript typing
const emit = defineEmits<{
  (e: "click"): void;
  (e: "chip-click"): void;
}>();

// Check if button has an icon (either via slot or prop)
//
const hasIcon = computed(() => {
  return !!props.iconName || !!slots.icon;
});

// Computed properties
const computedColor = computed(() => {
  if (props.color)
    if (props.outline) {
      const outlinecolors = {
        default: "btn-outline-white",
        primary: "btn-outline-primary",
        info: "btn-outline-info",
        success: "btn-outline-success",
        warning: "btn-outline-warning",
        danger: "btn-outline-danger",
        secondary: "btn-outline-secondary",
        dark: "btn-outline-dark",
        gradient: "btn-outline-gradient",
      };
      return outlinecolors[props.color];
    } else {
      const colors = {
        default: "btn-white",
        primary: "btn-primary",
        info: "btn-info",
        success: "btn-success",
        warning: "btn-warning",
        danger: "btn-danger",
        secondary: "btn-secondary",
        dark: "btn-dark",
        gradient: "btn-gradient",
      };
      return colors[props.color];
    }
});

const computedActiveColor = computed(() => {
  if (props.chip) return undefined;
  if (!props.color) return undefined;
  // For non-outline colored buttons, apply a subtle generic active effect
  if (!props.outline) return "active:brightness-95";
  // For outline and gradient outline, keep active the same as rest state
  return undefined;
});

const computedFocusColor = computed(() => {
  if (props.chip) return undefined;

  // Use the color prop or default to 'default' for focus styling
  const color = props.color || "default";

  if (props.outline) {
    // For outline buttons, focus should show only a ring around the button
    const focusColors = {
      default: "focus:ring-2 focus:ring-gray-300 focus:ring-offset-2",
      primary: "focus:ring-2 focus:ring-primary/30 focus:ring-offset-2",
      info: "focus:ring-2 focus:ring-info/30 focus:ring-offset-2",
      success: "focus:ring-2 focus:ring-success/30 focus:ring-offset-2",
      warning: "focus:ring-2 focus:ring-warning/30 focus:ring-offset-2",
      danger: "focus:ring-2 focus:ring-danger/30 focus:ring-offset-2",
      secondary: "focus:ring-2 focus:ring-secondary/30 focus:ring-offset-2",
      dark: "focus:ring-2 focus:ring-dark/30 focus:ring-offset-2",
      gradient: "focus:ring-2 focus:ring-primary/30 focus:ring-offset-2",
    };
    return focusColors[color];
  } else {
    // For solid buttons, focus should show a slightly brighter version
    const focusColors = {
      default:
        "focus:bg-gray-200 focus:ring-2 focus:ring-gray-300 focus:ring-offset-2",
      primary:
        "focus:bg-primary/90 focus:ring-2 focus:ring-primary/30 focus:ring-offset-2",
      info: "focus:bg-info/90 focus:ring-2 focus:ring-info/30 focus:ring-offset-2",
      success:
        "focus:bg-success/90 focus:ring-2 focus:ring-success/30 focus:ring-offset-2",
      warning:
        "focus:bg-warning/90 focus:ring-2 focus:ring-warning/30 focus:ring-offset-2",
      danger:
        "focus:bg-danger/90 focus:ring-2 focus:ring-danger/30 focus:ring-offset-2",
      secondary:
        "focus:bg-secondary/90 focus:ring-2 focus:ring-secondary/30 focus:ring-offset-2",
      dark: "focus:bg-dark/90 focus:ring-2 focus:ring-dark/30 focus:ring-offset-2",
      gradient:
        "focus:bg-gradient-to-r focus:from-primary/90 focus:to-danger/90 focus:ring-2 focus:ring-primary/30 focus:ring-offset-2",
    };
    return focusColors[color];
  }
});

const computedSize = computed(() => {
  if (props.size) {
    const sizes = {
      xs: "btn-xs",
      sm: "btn-sm",
      md: "btn-md",
      lg: "btn-lg",
    };
    return sizes[props.size];
  }
});

const computedShadow = computed(() =>
  props.shadow
    ? "shadow-[0_10px_20px_-10px_rgba(67,97,238,0.44)]"
    : "shadow-none"
);

const computedRounded = computed(() => {
  if (props.rounded) {
    const roundedTypes = {
      full: "rounded-full",
      none: "rounded-none",
      xs: "rounded-xs",
      sm: "rounded-sm",
      md: "rounded-md",
      lg: "rounded-lg",
      xl: "rounded-xl",
    };
    return roundedTypes[props.rounded];
  }
  // Default rounding: in chip mode default to full, otherwise no extra rounding
  return props.chip ? "rounded-full" : undefined;
});

const computedBorderType = computed(() => {
  if (props.borderType) {
    const borderTypes = {
      solid: "border-solid",
      dashed: "border-dashed",
      dotted: "border-dotted",
    };
    return borderTypes[props.borderType];
  } else {
    return "border-solid";
  }
});

const onClick = async () => {
  // In chip mode, suppress default button click behavior entirely
  if (props.chip) return;

  // In loading mode, suppress click behavior entirely
  if (props.isLoading) return;

  // Focus the button first
  if (buttonRef.value) {
    buttonRef.value.focus();
  }

  // Emit click event if not a link
  if (!props.to) {
    emit("click");
  }

  // Defocus the button after a short delay to allow for visual feedback
  await nextTick();
  setTimeout(() => {
    if (buttonRef.value) {
      buttonRef.value.blur();
    }
  }, 150); // 150ms delay to show focus state briefly
};

const onChipClick = () => {
  emit("chip-click");
};

// Focus event handlers for InputGroup
const handleFocusEvent = (event: FocusEvent) => {
  if (isInInputGroup && handleFocus) {
    handleFocus();
  }
};

const handleBlurEvent = (event: FocusEvent) => {
  if (isInInputGroup && handleBlur) {
    handleBlur();
  }
};

// In chip + outline-gradient, Storybook CSS applies hover changes via utility classes.
// Neutralize by inlining base background when chip is true, and restore label gradient text.
const chipGradientStyle = computed(() => {
  if (!props.chip) return undefined;
  if (props.color === "gradient" && props.outline) {
    return {
      background:
        "linear-gradient(to right, #fafafa, #fafafa), linear-gradient(to right, #ef1262, #4361ee)",
      backgroundClip: "padding-box, border-box",
      backgroundOrigin: "padding-box, border-box",
    } as unknown as string;
  }
  return undefined;
});

const chipGradientTextStyle = computed(() => {
  if (!props.chip) return undefined;
  if (props.color === "gradient" && props.outline) {
    return {
      backgroundImage: "linear-gradient(to right, #ef1262, #4361ee)",
      backgroundClip: "text",
      WebkitBackgroundClip: "text",
      color: "transparent",
    } as unknown as string;
  }
  return undefined;
});

const computedHoverNeutralizeClasses = computed(() => {
  if (!props.chip || !props.outline) return undefined;
  // Neutralize background/active; keep text color same as base outline color
  const base = "hover:!bg-transparent active:!bg-transparent";
  if (props.color === "gradient") return base;
  const colorToText: Record<string, string> = {
    primary: "hover:!text-primary",
    secondary: "hover:!text-secondary",
    success: "hover:!text-success",
    danger: "hover:!text-danger",
    warning: "hover:!text-warning",
    info: "hover:!text-info",
    dark: "hover:!text-dark",
  };
  const textClass = props.color ? colorToText[props.color] : undefined;
  return [base, textClass].filter(Boolean).join(" ");
});
</script>
