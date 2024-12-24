<template>
  <div
    :class="[
      $attrs.class,
      //size class
      'p-4',

      //card class
      'bg-white shadow-[4px_6px_10px_-3px_#bfc9d4] dark:bg-[#191e3a] dark:shadow-none',

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
import { provide } from "vue";

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
</script>
