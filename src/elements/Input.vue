<template>
  <div class="flex flex-col gap-1">
    <label v-if="label" :for="id" class="text-sm font-medium text-gray-700">
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </label>

    <div class="relative">
      <Icon
        v-if="iconName"
        :name="iconName"
        class="absolute ltr:left-3 rtl:right-3 top-1/2 transform -translate-y-1/2"
      />
      <input
        :class="[
          iconName ? 'ltr:pl-10 rtl:pr-10' : '',
          // base classes
          { 'form-input': type !== 'range' },

          // specific for range type
          { 'w-full py-2.5': type === 'range' },

          disabled || cardDisabled
            ? 'bg-gray-100 cursor-not-allowed'
            : 'bg-white',
          error ? 'border-red-500' : 'border-gray-300',
        ]"
        :id="id"
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled || cardDisabled"
        :required="required"
        :min="type === 'range' ? min : undefined"
        :max="type === 'range' ? max : undefined"
        @input="(e) => $emit('update:modelValue', (e.target as HTMLInputElement).value)"
        @blur="$emit('blur', $event)"
        @focus="$emit('focus', $event)"
      />
    </div>

    <span v-if="error && errorMessage" class="text-sm text-red-500 mt-1">{{
      errorMessage
    }}</span>
  </div>
</template>

<script setup lang="ts">
import { inject } from "vue";
import Icon from "../icon/Icon.vue";

interface InputProps {
  modelValue?: string;
  type?:
    | "text"
    | "range"
    | "email"
    | "password"
    | "number"
    | "tel"
    | "url"
    | "search";
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  error?: boolean;
  errorMessage?: string;
  label?: string;
  id?: string;
  min?: string | number;
  max?: string | number;
  iconName?: string; // Add this line
}

const props = withDefaults(defineProps<InputProps>(), {
  modelValue: "",
  type: "text",
  placeholder: "",
  disabled: false,
  required: false,
  error: false,
  errorMessage: "",
  label: "",
  id: "",
  min: 0,
  max: 100,
  iconName: "", // Add this line
});

const cardDisabled = inject<boolean>("cardDisabled", false);

defineEmits<{
  "update:modelValue": [value: string];
  blur: [event: FocusEvent];
  focus: [event: FocusEvent];
}>();
</script>
