<template>
  <div class="flex justify-center items-center w-full">
    <div
      class="max-w-[19rem] w-full bg-white shadow-[4px_6px_10px_-3px_#bfc9d4] rounded border border-[#e0e6ed] dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none"
      :class="[disabled && 'opacity-50 cursor-not-allowed']"
    >
      <slot name="default" :cardDisabled="disabled"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
interface CardProps {
  disabled?: boolean;
}

withDefaults(defineProps<CardProps>(), {
  disabled: false,
});
</script>
