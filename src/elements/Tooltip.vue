<template>
  <Popper
    :hover="true"
    :arrow="true"
    :open-delay="delay"
    :close-delay="delay"
    :placement="placement"
    :z-index="9999"
    class="inline-block"
  >
    <!-- Trigger element (wrapped content) -->
    <slot />

    <!-- Tooltip content -->
    <template #content>
      <div :class="['tooltip-content', computedColorClass]">
        {{ text }}
      </div>
    </template>
  </Popper>
</template>

<script setup lang="ts">
import Popper from "vue3-popper/dist/popper.esm.js";
import { computed } from "vue";

// Define placement options
type PlacementType = "top" | "bottom" | "left" | "right";

// Define color variants
type ColorType =
  | "primary"
  | "success"
  | "info"
  | "warning"
  | "danger"
  | "dark"
  | "light";

// Define tooltip props interface
interface TooltipProps {
  /** The text content to display in the tooltip */
  text: string;
  /** Delay in milliseconds before showing the tooltip on hover */
  delay?: number;
  /** Placement of the tooltip relative to the trigger element */
  placement?: PlacementType;
  /** Color variant of the tooltip */
  color?: ColorType;
}

// Define tooltip props with defaults
const props = withDefaults(defineProps<TooltipProps>(), {
  delay: 0,
  placement: "top",
  color: "dark",
});

// Computed property for color class following the project's pattern
const computedColorClass = computed(() => {
  const colorClasses = {
    primary: "!bg-primary !text-white !border-primary/20",
    success: "!bg-success !text-white !border-success/20",
    info: "!bg-info !text-white !border-info/20",
    warning: "!bg-warning !text-white !border-warning/20",
    danger: "!bg-danger !text-white !border-danger/20",
    dark: "!bg-dark !text-white !border-dark/20",
    light: "!bg-white !text-dark !border-dark/10",
  };
  return colorClasses[props.color];
});
</script>
