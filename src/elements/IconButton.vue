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

      // Base classes
      'flex items-center justify-center',
      props.color !== 'default' ? 'border' : '',
      disabled || cardDisabled || isLoading
        ? 'bg-gray-100 cursor-not-allowed'
        : 'hover:cursor-pointer',
      computedColor,

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
  color?:
    | "default"
    | "primary"
    | "info"
    | "success"
    | "warning"
    | "danger"
    | "secondary"
    | "dark"
    | "gradient";
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
  color: "default",
  rounded: "full",
  isLoading: false,
  loadingIcon: "IconLoader",
});

const emit = defineEmits<{
  (e: "click"): void;
}>();

// Computed properties
const computedColor = computed(() => {
  if (props.color) {
    const colors = {
      default:
        "bg-white-light/40 hover:bg-white-light/90 dark:bg-dark/40 dark:hover:bg-dark/60 dark:text-[#d0d2d6]",
      primary:
        "bg-primary text-white border-primary shadow-primary/60 hover:bg-primary/90 hover:shadow-primary/80",
      info: "bg-info text-white border-info shadow-info/60 hover:bg-info/90 hover:shadow-info/80",
      success:
        "bg-success text-white border-success shadow-success/60 hover:bg-success/90 hover:shadow-success/80",
      warning:
        "bg-warning text-white border-warning shadow-warning/60 hover:bg-warning/90 hover:shadow-warning/80",
      danger:
        "bg-danger text-white border-danger shadow-danger/60 hover:bg-danger/90 hover:shadow-danger/80",
      secondary:
        "bg-secondary text-white border-secondary shadow-secondary/60 hover:bg-secondary/90 hover:shadow-secondary/80",
      dark: "bg-dark text-white border-dark shadow-dark/60 hover:bg-dark/90 hover:shadow-dark/80",
      gradient:
        "bg-gradient text-white hover:from-[#4361EE] hover:to-[#EF1262]",
    };
    return colors[props.color];
  }
  return "bg-white-light/40 hover:bg-white-light/90 dark:bg-dark/40 dark:hover:bg-dark/60 dark:text-[#d0d2d6]"; // fallback
});

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
