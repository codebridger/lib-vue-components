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
      <slot />
    </div>

    <span v-if="error && errorMessage" class="text-sm text-red-500 mt-1">
      {{ errorMessage }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { provide, computed } from "vue";
import { useAppStore } from "../stores/index";

interface InputGroupProps {
  label?: string;
  id?: string;
  required?: boolean;
  error?: boolean;
  errorMessage?: string;
  disabled?: boolean;
}

const props = withDefaults(defineProps<InputGroupProps>(), {
  label: "",
  id: "",
  required: false,
  error: false,
  errorMessage: "",
  disabled: false,
});

const store = useAppStore();

// Provide context to child components for styling coordination
const inputGroupContext = computed(() => ({
  isRtl: store.isRtl,
  isDarkMode: store.isDarkMode,
  error: props.error,
  disabled: props.disabled,
}));

provide("inputGroupContext", inputGroupContext);
</script>
