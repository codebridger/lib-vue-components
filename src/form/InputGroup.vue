<template>
  <div class="flex flex-col gap-1">
    <label
      v-if="label"
      :for="id"
      class="text-sm font-medium text-gray-700 dark:text-gray-300"
    >
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </label>

    <div class="flex">
      <!-- Left Addon -->
      <div
        v-if="$slots.leftAddon"
        :class="[
          'flex justify-center items-center px-3 font-semibold border border-gray-300 dark:border-gray-600',
          'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300',
          'ltr:rounded-l-md rtl:rounded-r-md ltr:border-r-0 rtl:border-l-0',
          sizeClasses,
        ]"
      >
        <slot name="leftAddon" />
      </div>

      <!-- Main Input Slot -->
      <div
        :class="[
          'flex-1',
          // Border radius based on addons
          !$slots.leftAddon && !$slots.rightAddon ? 'rounded-md' : '',
          $slots.leftAddon && !$slots.rightAddon
            ? 'ltr:rounded-l-none rtl:rounded-r-none'
            : '',
          !$slots.leftAddon && $slots.rightAddon
            ? 'ltr:rounded-r-none rtl:rounded-l-none'
            : '',
          $slots.leftAddon && $slots.rightAddon ? 'rounded-none' : '',
          // Border adjustments
          $slots.leftAddon ? 'ltr:border-l-0 rtl:border-r-0' : '',
          $slots.rightAddon ? 'ltr:border-r-0 rtl:border-l-0' : '',
        ]"
      >
        <slot />
      </div>

      <!-- Right Addon -->
      <div
        v-if="$slots.rightAddon"
        :class="[
          'flex justify-center items-center px-3 font-semibold border border-gray-300 dark:border-gray-600',
          'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300',
          'ltr:rounded-r-md rtl:rounded-l-md ltr:border-l-0 rtl:border-r-0',
          sizeClasses,
        ]"
      >
        <slot name="rightAddon" />
      </div>
    </div>

    <span v-if="error && errorMessage" class="text-sm text-red-500 mt-1">
      {{ errorMessage }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

interface InputGroupProps {
  label?: string;
  required?: boolean;
  error?: boolean;
  errorMessage?: string;
  id?: string;
  size?: "sm" | "md" | "lg";
}

const props = withDefaults(defineProps<InputGroupProps>(), {
  label: "",
  required: false,
  error: false,
  errorMessage: "",
  id: "",
  size: "md",
});

// Size classes
const sizeClasses = computed(() => {
  switch (props.size) {
    case "sm":
      return "py-1.5 text-xs";
    case "lg":
      return "py-3 text-base";
    default:
      return "py-2.5 text-sm";
  }
});
</script>
