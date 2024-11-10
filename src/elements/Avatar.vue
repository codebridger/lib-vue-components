<template>
  <div
    class="h-20 w-20 overflow-hidden relative flex justify-center items-center text-center text-2xl"
  >
    <img
      :class="['w-full h-full', 'object-cover', computedRounded]"
      src="http://localhost:3001/_nuxt/assets/images/profile-12.jpeg"
      alt=""
    />
    <span
      :class="[
        'absolute',
        'ltr:right-0 rtl:left-0',
        'w-7 h-7',
        'ring-2 ring-white dark:ring-white-dark',
        'bottom-0',
        'rounded-full',
        props.indicatorBackgroundColor,
      ]"
    >
      <slot></slot>
    </span>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

// Define Icon button props interface
interface AvatarProps {
  /**
   * -Configurable border radius ranging from none to fully rounded
   */
  rounded?: "full" | "none" | "xs" | "sm" | "md" | "lg" | "xl";
  /**
   * -Status indicator with customizable background colors
     -Support for both Tailwind and custom CSS classes
   */
  indicatorBackgroundColor?: string;
}

// Define Icon button props with defaults
const props = withDefaults(defineProps<AvatarProps>(), {
  rounded: "full",
  indicatorBackgroundColor: "bg-success",
});

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
