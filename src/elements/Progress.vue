<template>
  <div
    role="progressbar"
    :aria-valuenow="value"
    :aria-valuemax="props.max"
    class="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700"
    :class="[
      computedSize,
      computedContrast,
      computedColor,
      computedRounded,
      props.classes?.wrapper,
    ]"
  >
    <div
      class="h-2.5 rounded-full transition-all duration-300"
      :class="[
        isIndeterminate && 'animate-progress-indeterminate',
        props.classes?.progress,
      ]"
      :style="!isIndeterminate ? `width: ${value}%` : 'width: 100%'"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

interface ProgressProps {
  value: number;
  max: number;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  contrast?: "default" | "contrast";
  color?:
    | "primary"
    | "info"
    | "success"
    | "warning"
    | "danger"
    | "light"
    | "dark"
    | "black";
  rounded?: "none" | "sm" | "md" | "lg" | "full";
  classes?: {
    /**
     * CSS classes to apply to the wrapper element.
     */
    wrapper?: string | string[];

    /**
     * CSS classes to apply to the progress element.
     */
    progress?: string | string[];
  };
}

const props = withDefaults(defineProps<ProgressProps>(), {
  value: 0,
  max: 100,
  size: "md",
  contrast: "default",
  color: "primary",
  rounded: "full",
});

// Computed properties
const computedColor = computed(() => {
  if (props.color) {
    const colors = {
      primary: "bg-primary",
      info: "bg-info",
      success: "bg-success",
      warning: "bg-warning",
      danger: "bg-danger",
      light: "bg-light",
      dark: "bg-dark",
      black: "bg-black",
    };
    return colors[props.color];
  }
});

const computedContrast = computed(() => {
  if (props.contrast) {
    const contrasts = {
      default: "bg-gray-200 dark:bg-gray-700",
      contrast: "bg-gray-300 dark:bg-gray-600",
    };
    return contrasts[props.contrast];
  }
});

const computedRounded = computed(() => {
  if (props.rounded) {
    const roundedTypes = {
      none: "",
      sm: "rounded-sm",
      md: "rounded-md",
      lg: "rounded-lg",
      full: "rounded-full",
    };
    return roundedTypes[props.rounded];
  }
});

const computedSize = computed(() => {
  if (props.size) {
    const sizes = {
      xs: "h-1",
      sm: "h-1.5",
      md: "h-2.5",
      lg: "h-4",
      xl: "h-6",
    };
    return sizes[props.size];
  }
});

const value = computed(() => {
  const { value, max } = props;

  if (max === 0) {
    return 0;
  }
  return typeof value === "number" ? (value / max) * 100 : undefined;
});

const isIndeterminate = computed(() => typeof value.value !== "number");
</script>
