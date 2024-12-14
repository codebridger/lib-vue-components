<template>
  <div v-bind="$attrs">
    <div
      :class="[
        //size class
        'max-w-[19rem] w-full',

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
  </div>
</template>

<script setup lang="ts">
// Define props with explicit attrs inheritance
defineOptions({
  inheritAttrs: false,
});

interface CardProps {
  disabled?: boolean;
}

withDefaults(defineProps<CardProps>(), {
  disabled: false,
});
</script>
