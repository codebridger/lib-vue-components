<template>
  <div
    :class="[
      computedClass,

      //size class
      'p-4',

      //card class
      'shadow-[4px_6px_10px_-3px_#bfc9d4] dark:bg-[#191e3a] dark:shadow-none',

      //border class
      'rounded border border-[#e0e6ed] dark:border-[#1b2e4b]',

      // Interactions
      disabled && 'opacity-50 cursor-not-allowed',
    ]"
  >
    <slot name="default" :cardDisabled="disabled"></slot>
  </div>
</template>

<script setup lang="ts">
import { provide, computed, useAttrs } from "vue";

// Define props with explicit attrs inheritance
defineOptions({
  inheritAttrs: false,
});

const props = withDefaults(defineProps<CardProps>(), {
  disabled: false,
});

// Provide cardDisabled prop to children
provide("cardDisabled", props.disabled);

interface CardProps {
  disabled?: boolean;
}

// Computed property to add bg-white if no bg color class is present
const attrs = useAttrs();
const computedClass = computed(() => {
  const classes = typeof attrs.class === "string" ? attrs.class : "";
  const hasBgColor = classes.split(" ").some((cls) => cls.startsWith("bg-"));
  return hasBgColor ? classes : `${classes} bg-white`;
});
</script>
