<template>
  <button
    type="submit"
    :class="[
      'btn',
      'text-xs sm:text-sm',
      { 'w-full': props.block },
      props.outline,
      props.textTransform,
      computedRounded,
      computedShadow,
      computedSize,
      computedColor,
    ]"
  >
    <slot>{{ label }}</slot>
  </button>
</template>

<script setup lang="ts">
import { computed } from "vue";

interface Props {
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
  label: string;
  block?: boolean;
  outline?: boolean;
  shadow?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  textTransform: "normal-case",
  block: false,
  outline: false,
  shadow: false,
});

const computedColor = computed(() => {
  if (props.outline && props.color) {
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
    if (props.color) {
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
</script>
