<template>
  <div
    @click="onClick"
    :class="[
      // Base classes
      'p-2',
      'w-fit',
      'select-none',

      // light - Base classes
      'flex items-center',
      'bg-white-light/40',

      // dark - Base classes
      'dark:bg-dark/40',
      'dark:text-[#d0d2d6]',
      'dark:hover:bg-dark/60',
      'dark:hover:text-primary',

      computedRounded,

      // hooks
      'hover:cursor-pointer',
      'hover:bg-white-light/90',
      'hover:text-primary',
    ]"
  >
    <slot> <Icon :name="props.name" class="w-5 h-5" /></slot>
  </div>
</template>

<script setup lang="ts">
import { computed, defineEmits } from "vue";
import Icon from "../icon/Icon.vue";

// Define Icon button props interface
interface IconButtonProps {
  rounded?: "full" | "none" | "xs" | "sm" | "md" | "lg" | "xl";
  name: string;
}

// Define Icon button props with defaults
const props = withDefaults(defineProps<IconButtonProps>(), {
  rounded: "full",
  IconSun: "IconSun",
});

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

const onClick = () => {
  emit("click");
};
</script>
