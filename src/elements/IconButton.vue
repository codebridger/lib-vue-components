<template>
  <a
    @click="emit('click')"
    :class="[
      'flex',
      'items-center',
      'bg-white-light/40',
      'hover:bg-white-light/90',
      'hover:text-primary',
      'dark:bg-dark/40',
      'dark:text-[#d0d2d6]',
      'dark:hover:bg-dark/60',
      'dark:hover:text-primary',
      'w-fit',
      computedRounded,
    ]"
  >
    <slot> <Icon name="IconSun" class="w-5 h-5" /></slot>
  </a>
</template>

<script setup lang="ts">
import { computed } from "vue";
import Icon from "../icon/Icon.vue";

// Define Icon button props interface
interface IconButtonProps {
  rounded?: "full" | "none" | "xs" | "sm" | "md" | "lg" | "xl";
}

// Define Icon button props with defaults
const props = withDefaults(defineProps<IconButtonProps>(), {
  rounded: "full",
});

// Define the emits with TypeScript typing
const emit = defineEmits<{
  (e: "click"): void;
}>();

// Computed properties
const computedRounded = computed(() => {
  if (props.rounded) {
    const roundedTypes = {
      full: "rounded-full",
      none: "rounded-none",
      xs: "rounded-xs",
      sm: "rounded-sm",
      md: "rounded-md",
      lg: "rounded-lg",
      xl: "rounded-xl",
    };
    return roundedTypes[props.rounded];
  }
});
</script>
