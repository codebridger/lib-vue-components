<template>
  <div
    :class="[
      computedSize,
      'overflow-hidden',
      'relative',
      'flex',
      'justify-center',
      'items-center',
      'text-center',
      'text-2xl',
      { 'transition-all duration-300 hover:translate-x-2': hoverAnimation },
    ]"
  >
    <img
      :class="[
        'w-full h-full',
        'object-cover',
        computedRounded,
        { 'opacity-50': disabled },
      ]"
      :src="src"
      :alt="alt || 'User avatar'"
    />
    <!-- Status Indicator -->
    <span
      v-if="showStatus"
      :class="[
        'absolute',
        'ltr:right-0 rtl:left-0',
        'w-7 h-7',
        'ring-2',
        'ring-white dark:ring-white-dark',
        'bottom-0',
        'rounded-full',
        computedStatusColor,
      ]"
    >
      <slot name="status-icon"></slot>
    </span>
  </div>
</template>

<script setup lang="ts">
import { computed, inject } from "vue";

// Define Avatar props interface
interface AvatarProps {
  /**
   * Image source URL for the avatar
   */
  src: string;

  /**
   * Alternative text for the avatar image
   */
  alt?: string;

  /**
   * Configurable border radius ranging from none to fully rounded
   */
  rounded?: "full" | "none" | "xs" | "sm" | "md" | "lg" | "xl";

  /**
   * Whether to show the status indicator
   */
  showStatus?: boolean;

  /**
   * Status of the user - online, offline, away, or busy
   */
  status?: "online" | "offline" | "away" | "busy";

  /**
   * Whether the avatar is in a disabled state
   */
  disabled?: boolean;

  /**
   * Avatar size
   */
  size?: "xs" | "sm" | "md" | "lg";
}

// Define props with defaults
const props = withDefaults(defineProps<AvatarProps>(), {
  rounded: "full",
  showStatus: false,
  status: "online",
  disabled: false,
});

const hoverAnimation = inject("hoverAnimation", false);

// Computed properties
const computedRounded = computed(() => {
  const roundedMap = {
    none: "rounded-none",
    xs: "rounded-xs",
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    xl: "rounded-xl",
    full: "rounded-full",
  };
  return roundedMap[props.rounded];
});

const computedSize = computed(() => {
  const sizes = {
    xs: "w-12 h-12",
    sm: "w-14 h-14",
    md: "w-16 h-16",
    lg: "h-20 w-20",
  };
  return sizes[props.size || "lg"];
});

const computedStatusColor = computed(() => {
  const statusColorMap = {
    online: "bg-success",
    offline: "bg-secondary",
    away: "bg-warning",
    busy: "bg-danger",
  };
  return statusColorMap[props.status];
});
</script>
