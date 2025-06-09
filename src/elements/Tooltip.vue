<template>
  <Popper
    :hover="true"
    :arrow="true"
    :delayShow="delay"
    :delayHide="100"
    placement="top"
    :z-index="9999"
    class="inline-block"
  >
    <!-- Trigger element (wrapped content) -->
    <slot />

    <!-- Tooltip content -->
    <template #content>
      <div class="tooltip-content">
        {{ text }}
      </div>
    </template>
  </Popper>
</template>

<script setup lang="ts">
import Popper from "vue3-popper/dist/popper.esm.js";

// Define tooltip props interface
interface TooltipProps {
  /** The text content to display in the tooltip */
  text: string;
  /** Delay in milliseconds before showing the tooltip on hover */
  delay?: number;
}

// Define tooltip props with defaults
const props = withDefaults(defineProps<TooltipProps>(), {
  delay: 0,
});
</script>
