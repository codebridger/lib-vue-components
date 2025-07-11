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

    <div class="space-y-2">
      <label
        v-for="(option, index) in options"
        :key="index"
        :for="`${id}-${index}`"
        class="inline-flex items-center cursor-pointer transition-all duration-200 hover:opacity-80"
        :class="{ 'opacity-50 cursor-not-allowed': disabled || cardDisabled }"
      >
        <input
          :id="`${id}-${index}`"
          type="checkbox"
          :value="option.value"
          :checked="isChecked(option.value)"
          :disabled="disabled || cardDisabled"
          :required="required"
          :class="[
            'form-checkbox transition-all duration-200',
            // Color variants
            color === 'primary' ? '' : `text-${color}`,
            // Outline variant
            outline ? `outline-${color}` : '',
            // Rounded variant
            rounded ? 'rounded-full' : '',
            // Disabled state
            disabled || cardDisabled ? 'cursor-not-allowed opacity-50' : '',
            // Error state
            error ? 'border-red-500' : '',
            // Peer class for text color changes
            peerChecked ? 'peer' : '',
            // Hover effects
            !disabled && !cardDisabled
              ? 'hover:scale-105 focus:ring-2 focus:ring-offset-2'
              : '',
          ]"
          @change="handleChange(option.value, $event)"
          @blur="$emit('blur', $event)"
          @focus="$emit('focus', $event)"
        />
        <span
          class="ml-2 ltr:ml-2 rtl:mr-2 transition-colors duration-200"
          :class="[
            // Text color change on checked state
            peerChecked ? `peer-checked:text-${color}` : '',
            // Error state
            error ? 'text-red-500' : '',
            // Dark theme support
            'text-gray-700 dark:text-gray-300',
          ]"
        >
          {{ option.label }}
        </span>
      </label>
    </div>

    <span v-if="error && errorMessage" class="text-sm text-red-500 mt-1">
      {{ errorMessage }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { inject, computed } from "vue";
import { useAppStore } from "../stores/index";

interface CheckboxOption {
  label: string;
  value: string | number | boolean;
}

interface CheckboxInputProps {
  modelValue?: (string | number | boolean)[];
  options: CheckboxOption[];
  label?: string;
  color?:
    | "primary"
    | "success"
    | "secondary"
    | "danger"
    | "warning"
    | "info"
    | "dark";
  variant?: "default" | "outline" | "rounded" | "outline-rounded";
  disabled?: boolean;
  required?: boolean;
  error?: boolean;
  errorMessage?: string;
  id?: string;
}

const props = withDefaults(defineProps<CheckboxInputProps>(), {
  modelValue: () => [],
  options: () => [],
  label: "",
  color: "primary",
  variant: "default",
  disabled: false,
  required: false,
  error: false,
  errorMessage: "",
  id: "",
});

const cardDisabled = inject<boolean>("cardDisabled", false);
const store = useAppStore();

// Computed properties for variant styling
const outline = computed(
  () => props.variant === "outline" || props.variant === "outline-rounded"
);

const rounded = computed(
  () => props.variant === "rounded" || props.variant === "outline-rounded"
);

const peerChecked = computed(
  () => props.variant === "default" || props.variant === "rounded"
);

const emit = defineEmits<{
  /**
   * Emitted when the checkbox selection changes.
   * @storybook Use this to update v-model in stories.
   */
  "update:modelValue": [value: (string | number | boolean)[]];

  /**
   * Emitted when a checkbox loses focus.
   * @storybook Useful for simulating blur events in stories.
   */
  blur: [event: FocusEvent];

  /**
   * Emitted when a checkbox gains focus.
   * @storybook Useful for simulating focus events in stories.
   */
  focus: [event: FocusEvent];

  /**
   * Emitted when a checkbox value changes.
   * @storybook Use this to track individual checkbox changes in stories.
   */
  change: [value: string | number | boolean, checked: boolean, event: Event];
}>();

const isChecked = (value: string | number | boolean): boolean => {
  return props.modelValue.includes(value);
};

const handleChange = (value: string | number | boolean, event: Event) => {
  const target = event.target as HTMLInputElement;
  const checked = target.checked;

  let newValue: (string | number | boolean)[];

  if (checked) {
    newValue = [...props.modelValue, value];
  } else {
    newValue = props.modelValue.filter((v) => v !== value);
  }

  emit("update:modelValue", newValue);
  emit("change", value, checked, event);
};
</script>
