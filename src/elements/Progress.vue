<template>
  <div
    role="progressbar"
    :aria-valuenow="computedValue"
    :aria-valuemax="props.max"
    class="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700"
    :class="[computedSize, computedRounded, props.classes?.wrapper]"
  >
    <div
      class="h-2.5 rounded-full transition-all duration-300"
      :class="[
        computedValueColor,
        isIndeterminate && 'animate-progress-indeterminate',
        props.striped && 'striped-bar',
        props.animated && 'animated-progress',
        props.classes?.progress,
      ]"
      :style="[!isIndeterminate ? `width: ${computedValue}%` : 'width: 100%']"
    >
      <span v-if="props.showLabel" class="text-xs text-white px-2">
        {{ props.label || `${computedValue}%` }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

interface ProgressProps {
  value: number;
  max: number;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
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
  value: 0,
  max: 100,
  size: "md",
  rounded: "full",
  striped: false,
  animated: false,
  showLabel: false,
  label: "",
});

// Computed properties
const computedValueColor = computed(() => {
  const percentage = computedValue.value;

  if (percentage < 25) {
    return "bg-red-500 dark:bg-red-400"; // Danger
  } else if (percentage < 50) {
    return "bg-yellow-500 dark:bg-yellow-400"; // Warning
  } else if (percentage < 75) {
    return "bg-blue-500 dark:bg-blue-400"; // Primary
  } else {
    return "bg-green-500 dark:bg-green-400"; // Success
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
</style>
