<template>
  <label :for="id" class="relative inline-flex items-center cursor-pointer">
    <!-- Switch container -->
    <div class="relative inline-flex h-5 w-10">
      <input
        :id="id"
        ref="inputRef"
        :checked="modelValue"
        v-bind="$attrs"
        type="checkbox"
        class="sr-only peer"
        @change="$emit('update:modelValue', !modelValue)"
      />
      <!-- Background track -->
      <span
        :class="[
          'absolute inset-0 mx-auto rounded-full transition-colors duration-300',
          computedColor,
          'peer-focus:outline-dashed peer-focus:outline-gray-300 peer-focus:outline-offset-2 dark:peer-focus:outline-gray-600',
        ]"
      />
      <!-- Moving ball -->
      <span
        :class="[
          'absolute left-0 mx-0.5 my-0.5 h-4 w-4 rounded-full bg-white transition-all duration-300 z-10',
          'peer-checked:translate-x-5 peer-checked:bg-white',
          'shadow-gray-500 dark:shadow-gray-800/50 shadow-sm',
        ]"
      />
      <!-- Icon -->
      <Icon
        v-if="iconName"
        :name="iconName"
        :class="[
          'absolute left-1 top-1/2 -translate-y-1/2 w-3 h-3',
          'text-gray-400 peer-checked:text-white',
          'transition-colors duration-300',
        ]"
      />
    </div>

    <!-- Label section -->
    <div v-if="!sublabel" class="ml-3">
      <span class="text-sm font-medium text-gray-800 dark:text-gray-100">
        {{ label }}
      </span>
    </div>
    <div v-else class="ml-3">
      <span class="block text-sm font-medium text-gray-800 dark:text-gray-100">
        {{ label }}
      </span>
      <span class="block text-xs text-gray-400">
        {{ sublabel }}
      </span>
    </div>
  </label>
</template>

<script setup lang="ts">
import { computed } from "vue";
import Icon from "../icon/Icon.vue";

interface SwitchBallProps {
  id: string;
  modelValue: boolean;
  label: string;
  sublabel: string;
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
  iconName?: string;
}

const props = withDefaults(defineProps<SwitchBallProps>(), {
  modelValue: false,
  label: "",
  sublabel: "",
  color: "primary",
  iconName: "IconCheck",
});

// Add computed color property
const computedColor = computed(() => {
  if (props.color) {
    const colors = {
      default: "peer-checked:bg-gray-500 bg-gray-200 dark:bg-gray-700",
      primary: "peer-checked:bg-primary bg-gray-200 dark:bg-gray-700",
      info: "peer-checked:bg-info bg-gray-200 dark:bg-gray-700",
      success: "peer-checked:bg-success bg-gray-200 dark:bg-gray-700",
      warning: "peer-checked:bg-warning bg-gray-200 dark:bg-gray-700",
      danger: "peer-checked:bg-danger bg-gray-200 dark:bg-gray-700",
      secondary: "peer-checked:bg-secondary bg-gray-200 dark:bg-gray-700",
      dark: "peer-checked:bg-dark bg-gray-200 dark:bg-gray-700",
      gradient: "peer-checked:bg-gradient bg-gray-200 dark:bg-gray-700",
    };
    return colors[props.color];
  }
  return "peer-checked:bg-primary bg-gray-200 dark:bg-gray-700";
});

defineEmits<{
  (e: "update:modelValue", value: boolean): void;
}>();
</script>
