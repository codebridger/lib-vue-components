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

      // light - Base classes
      'flex items-center',
      disabled || cardDisabled
        ? 'bg-gray-100 cursor-not-allowed'
        : 'bg-white-light/40',

      // dark - Base classes
      disabled || cardDisabled
        ? 'bg-gray-100 cursor-not-allowed'
        : 'dark:bg-dark/40',
      'dark:text-[#d0d2d6]',
      'dark:hover:bg-dark/60',
      'dark:hover:text-primary',

      computedRounded,

      // hooks
      'hover:cursor-pointer',
      'hover:bg-white-light/90',
      'hover:text-primary',
    ]"
    :disabled="disabled || cardDisabled"
  >
    <slot>
      <Icon
        v-if="!props.imgUrl && props.icon"
        :name="props.icon"
        :class="[computedSize]"
      />
      <img
        class="hover:opacity-80 transition-opacity"
        v-else-if="props.imgUrl"
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
}

const cardDisabled = inject<boolean>("cardDisabled", false);

// Define Icon button props with defaults
const props = withDefaults(defineProps<IconButtonProps>(), {
  rounded: "full",
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
  emit("click");
};
</script>
