<template>
  <div v-bind="$attrs" :class="['tooltip-wrapper', `tooltip-${color}`]">
    <Popper
      :placement="placement"
      :hover="true"
      :arrow="true"
      :open-delay="delay"
      :close-delay="delay"
      :z-index="9999"
      :disabled="disabled"
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
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

// Define placement options
type PlacementType = "top" | "bottom" | "left" | "right";

// Define color variants
type ColorType = "primary" | "success" | "info" | "warning" | "danger";

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
  /** Whether the tooltip is disabled */
  disabled?: boolean;
}

// Define tooltip props with defaults
const props = withDefaults(defineProps<TooltipProps>(), {
  delay: 0,
  placement: "bottom",
  color: "primary",
  disabled: false,
});

// Computed property for color class following the project's pattern
const computedColorClass = computed(() => {
  const colorClasses = {
    primary: "!bg-primary !text-white !border-primary/20",
    success: "!bg-success !text-white !border-success/20",
    info: "!bg-info !text-white !border-info/20",
    warning: "!bg-warning !text-white !border-warning/20",
    danger: "!bg-danger !text-white !border-danger/20",
  };
  return colorClasses[props.color];
});

// Remove the computed arrow class since we're using a different approach
</script>

<style scoped>
/* Tooltip content styling */
:deep(.tooltip-content) {
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 14px;
  line-height: 1.4;
  white-space: nowrap;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  border: 1px solid transparent;
  position: relative;
}

/* Base arrow styling for all tooltips */
:deep(.popper) {
  z-index: 9999;
}

:deep(.popper #arrow) {
  width: 8px;
  height: 8px;
  position: absolute;
}

:deep(.popper #arrow::before) {
  content: "";
  position: absolute;
  width: 8px;
  height: 8px;
  transform: rotate(45deg);
  border-radius: 2px;
}

/* Primary color variant */
.tooltip-primary :deep(.tooltip-content) {
  background-color: #4361ee;
  color: white;
  border-color: rgba(67, 97, 238, 0.2);
}

.tooltip-primary :deep(.popper #arrow::before) {
  background-color: #4361ee;
  border: 1px solid rgba(67, 97, 238, 0.2);
}

/* Success color variant */
.tooltip-success :deep(.tooltip-content) {
  background-color: #00ab55;
  color: white;
  border-color: rgba(0, 171, 85, 0.2);
}

.tooltip-success :deep(.popper #arrow::before) {
  background-color: #00ab55;
  border: 1px solid rgba(0, 171, 85, 0.2);
}

/* Info color variant */
.tooltip-info :deep(.tooltip-content) {
  background-color: #2196f3;
  color: white;
  border-color: rgba(33, 150, 243, 0.2);
}

.tooltip-info :deep(.popper #arrow::before) {
  background-color: #2196f3;
  border: 1px solid rgba(33, 150, 243, 0.2);
}

/* Warning color variant */
.tooltip-warning :deep(.tooltip-content) {
  background-color: #e2a03f;
  color: white;
  border-color: rgba(226, 160, 63, 0.2);
}

.tooltip-warning :deep(.popper #arrow::before) {
  background-color: #e2a03f;
  border: 1px solid rgba(226, 160, 63, 0.2);
}

/* Danger color variant */
.tooltip-danger :deep(.tooltip-content) {
  background-color: #e7515a;
  color: white;
  border-color: rgba(231, 81, 90, 0.2);
}

.tooltip-danger :deep(.popper #arrow::before) {
  background-color: #e7515a;
  border: 1px solid rgba(231, 81, 90, 0.2);
}

/* Arrow positioning for different placements */
:deep(.popper[data-popper-placement^="top"] #arrow) {
  bottom: -4px;
}

:deep(.popper[data-popper-placement^="bottom"] #arrow) {
  top: -4px;
}

:deep(.popper[data-popper-placement^="left"] #arrow) {
  right: -4px;
}

:deep(.popper[data-popper-placement^="right"] #arrow) {
  left: -4px;
}

/* Shadow effects for better visual integration */
:deep(.popper[data-popper-placement^="top"] #arrow::before) {
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
}

:deep(.popper[data-popper-placement^="bottom"] #arrow::before) {
  box-shadow: -2px -2px 4px rgba(0, 0, 0, 0.1);
}

:deep(.popper[data-popper-placement^="left"] #arrow::before) {
  box-shadow: 2px -2px 4px rgba(0, 0, 0, 0.1);
}

:deep(.popper[data-popper-placement^="right"] #arrow::before) {
  box-shadow: -2px 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
