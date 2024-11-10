<template>
  <div class="h-20 w-20 overflow-hidden">
    <img
      :class="['w-full h-full', 'object-cover', computedRounded]"
      src="http://localhost:3001/_nuxt/assets/images/profile-12.jpeg"
      alt=""
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

// Define Icon button props interface
interface AvatarProps {
  rounded?: "full" | "none" | "xs" | "sm" | "md" | "lg" | "xl";
}

// Define Icon button props with defaults
const props = withDefaults(defineProps<AvatarProps>(), {
  rounded: "full",
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
