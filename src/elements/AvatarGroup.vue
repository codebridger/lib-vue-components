<template>
  <div
    :class="[
      'flex',
      'items-center',
      'justify-center',
      '-space-x-4',
      'rtl:space-x-reverse',
      'text-white',
      'relative',
    ]"
    role="group"
    :aria-label="'Avatar group'"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed, provide, readonly } from "vue";

const props = defineProps<{
  /** Add animation effect when hovering avatars */
  hoverAnimation: boolean;
}>();

const hoverAnimation = computed(() => props.hoverAnimation);

provide("hoverAnimation", readonly(hoverAnimation));
</script>
