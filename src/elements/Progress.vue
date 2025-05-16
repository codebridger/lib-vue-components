<template>
  <div
    role="progressbar"
    :aria-valuenow="computedValue"
    :aria-valuemin="0"
    :aria-valuemax="props.max"
    class="w-full bg-gray-200 dark:bg-gray-700"
    :class="[computedSize, computedRounded, props.classes?.wrapper]"
  >
    <div
      class="transition-all duration-300 flex items-center justify-center progress-bar"
      :class="[
        isIndeterminate && 'animate-progress-indeterminate',
        props.striped && 'striped-bar',
        props.animated && 'animated-progress',
        props.classes?.progress,
        computedRounded,
        computedColor,
        computedSize,
      ]"
      :style="[
        !isIndeterminate ? { width: `${computedValue}%` } : { width: '100%' },
      ]"
    >
      <span v-if="props.showLabel" class="text-xs text-white">
        {{ props.label || `${computedValue}%` }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

interface ProgressProps {
  value?: number;
  max?: number;
  color?:
    | "primary"
    | "info"
    | "success"
    | "warning"
    | "danger"
    | "secondary"
    | "dark"
    | "gradient";
  size?: "default" | "sm" | "md" | "lg" | "xl";
  rounded?: boolean;
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
  /**
   * Whether to show a striped pattern
   */
  striped?: boolean;
  /**
   * Whether to animate the progress bar
   */
  animated?: boolean;
  /**
   * Whether to show a label inside the progress bar
   */
  showLabel?: boolean;
  /**
   * Custom label text (defaults to percentage)
   */
  label?: string;
}

const props = withDefaults(defineProps<ProgressProps>(), {
  value: 50,
  max: 100,
  color: "primary",
  size: "default",
  rounded: true,
  striped: false,
  animated: false,
  showLabel: false,
  label: "",
});

// Computed properties
const computedColor = computed(() => {
  if (props.color) {
    const colors = {
      primary: "bg-blue-600 dark:bg-blue-500",
      info: "bg-blue-300 dark:bg-blue-200",
      success: "bg-green-600 dark:bg-green-500",
      warning: "bg-yellow-600 dark:bg-yellow-500",
      danger: "bg-red-600 dark:bg-red-500",
      secondary: "bg-gray-600 dark:bg-gray-500",
      dark: "bg-gray-600 dark:bg-gray-500",
    };
    return colors[props.color];
  }
});

const computedSize = computed(() => {
  if (props.size) {
    const sizes = {
      default: "h-4",
      sm: "h-1",
      md: "h-2.5",
      lg: "h-5",
      xl: "h-6",
    };
    return sizes[props.size];
  }
});

const computedRounded = computed(() => {
  if (props.rounded) {
    return "rounded-full";
  }
  return "";
});

const computedValue = computed(() => {
  const { value, max } = props;

  if (max === 0) {
    return 0;
  }

  // Ensure value is a number and within bounds
  const numericValue = Number(value);
  if (isNaN(numericValue)) {
    return 0;
  }

  // Calculate percentage and ensure it's between 0 and 100
  const percentage = (numericValue / max) * 100;
  return Math.min(Math.max(percentage, 0), 100);
});

const isIndeterminate = computed(() => typeof props.value !== "number");
</script>

<style>
.striped-bar {
  background-image: linear-gradient(
    45deg,
    hsla(0, 0%, 100%, 0.15) 25%,
    transparent 0,
    transparent 50%,
    hsla(0, 0%, 100%, 0.15) 0,
    hsla(0, 0%, 100%, 0.15) 75%,
    transparent 0,
    transparent
  );
  background-size: 1rem 1rem;
}

.animated-progress {
  animation: progress-animation 1s linear infinite;
}

@keyframes progress-animation {
  0% {
    background-position: 1rem 0;
  }
  100% {
    background-position: 0 0;
  }
}

/* Dark mode adjustments */
.dark .progress-bar {
  filter: brightness(1.1);
}
</style>
