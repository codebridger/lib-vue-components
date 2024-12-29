<template>
  <button
    @click="onClick"
    type="button"
    :class="[
      // base class
      'btn',
      'text-xs sm:text-sm', // responsive text size
      { 'w-full': props.block }, // conditional full width
      disabled || (cardDisabled ?? false)
        ? 'bg-gray-100 cursor-not-allowed'
        : computedColor, // color class
      computedSize, // size class
      computedShadow, // shadow class
      computedRounded, // rounded corners class
      props.textTransform, // text transform class
      computedBorderType, // border type class
    ]"
    :disabled="disabled || (cardDisabled ?? false)"
  >
    <slot>{{ label }}</slot>
  </button>
</template>

<script setup lang="ts">
import { computed, inject } from "vue";

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
}

const cardDisabled = inject<boolean>("cardDisabled", false);

// Define button props with defaults
const props = withDefaults(defineProps<ButtonProps>(), {
  textTransform: "normal-case",
  block: false,
  outline: false,
  shadow: false,
  disabled: false,
  borderType: "solid",
});

// Define the emits with TypeScript typing
const emit = defineEmits<{
  (e: "click"): void;
}>();

// Computed properties
const computedColor = computed(() => {
  if (props.color)
    if (props.outline) {
      const outlinecolors = {
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
  emit("click");
};
</script>
