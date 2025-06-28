<template>
  <div
    @click="onClick"
    :class="[
      $attrs.class || '',
      // Base classes
      props.icon ? 'p-2' : '',
      'overflow-hidden',
      'w-fit',
      'select-none',
      'transition-all',

      // light - Base classes
      'flex items-center justify-center',
      disabled || cardDisabled || isLoading
        ? 'bg-gray-100 cursor-not-allowed'
        : 'bg-white-light/40 hover:bg-white-light/90 hover:text-primary hover:cursor-pointer',

      // dark - Base classes
      disabled || cardDisabled || isLoading
        ? 'bg-gray-100 cursor-not-allowed'
        : 'dark:bg-dark/40 dark:hover:bg-dark/60 dark:hover:text-primary hover:cursor-pointer',
      'dark:text-[#d0d2d6]',

      computedRounded,
    ]"
    :disabled="disabled || cardDisabled || isLoading"
  >
    <slot>
      <!-- Loading Icon -->
      <Icon
        v-if="isLoading"
        :name="loadingIcon"
        :class="[computedSize, 'animate-[spin_2s_linear_infinite]']"
      />
      <!-- Regular Icon -->
      <Icon
        v-else-if="!props.imgUrl && props.icon"
        :name="props.icon"
        :class="[computedSize]"
      />
      <!-- Image -->
      <img
        class="hover:opacity-80 transition-opacity"
        v-else-if="props.imgUrl && !isLoading"
        :src="props.imgUrl"
        :class="[computedSize]"
      />
    </slot>
  </div>
</template>

<script setup lang="ts">
import { computed, defineEmits, inject } from "vue";
import Icon from "../icon/Icon.vue";

// Define Icon button props interface
interface IconButtonProps {
  rounded?: "full" | "none" | "xs" | "sm" | "md" | "lg" | "xl";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  icon?: string;
  imgUrl?: string;
  disabled?: boolean;
  /**
   * You can insert the Icon's name from here or add your icons.
   */
  loadingIcon?: "IconLoader" | "IconRefresh" | "IconRestore" | string;
  isLoading?: boolean;
}

const cardDisabled = inject<boolean>("cardDisabled", false);

// Define Icon button props with defaults
const props = withDefaults(defineProps<IconButtonProps>(), {
  rounded: "full",
  isLoading: false,
  loadingIcon: "IconLoader",
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

const computedSize = computed(() => {
  const sizes = {
    xs: "w-4 h-4",
    sm: "w-5 h-5",
    md: "w-7 h-7",
    lg: "h-10 w-10",
    xl: "h-14 w-14",
  };
  return sizes[props.size || "lg"];
});

const onClick = () => {
  if (!props.isLoading && !props.disabled && !cardDisabled) {
    emit("click");
  }
};
</script>
