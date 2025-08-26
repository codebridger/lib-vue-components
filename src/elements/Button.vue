<template>
  <component
    :is="to && !chip ? 'a' : 'button'"
    @click="onClick"
    :href="!disabled && !cardDisabled && !chip ? to : undefined"
    :type="to && !chip ? undefined : 'button'"
    :style="chipGradientStyle"
    :class="[
      // base class
      'btn',
      'text-xs sm:text-sm', // responsive text size
      'transition-all', // transition effect
      { 'w-full': props.block }, // conditional full width
      disabled || cardDisabled
        ? 'bg-gray-100 cursor-not-allowed'
        : computedColor, // color class
      computedSize, // size class
      computedShadow, // shadow class
      computedRounded, // rounded corners class
      props.textTransform, // text transform class
      computedBorderType, // border type class
      computedActiveColor, // active effect class
      // Chip mode: disable pointer cursor and hover/active bg fills
      props.chip ? 'pointer-events-none cursor-default select-none' : undefined,
      // Loading: keep interactive but do not show pointer cursor
      isLoading ? 'cursor-default' : undefined,
      computedHoverNeutralizeClasses,
      props.chip ? 'is-chip' : undefined,
    ]"
    :disabled="disabled || cardDisabled ? true : undefined"
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
import { computed, inject, useSlots } from "vue";
import Icon from "../icon/Icon.vue";

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

const onClick = () => {
  // In chip mode, suppress default button click behavior entirely
  if (props.chip) return;
  if (!props.to) {
    emit("click");
  }
};

const onChipClick = () => {
  emit("chip-click");
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
