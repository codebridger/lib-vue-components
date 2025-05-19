<template>
  <div>
    <label v-if="label" :for="id" class="text-sm font-medium text-gray-700">
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </label>

    <textarea
      :id="id"
      :value="modelValue"
      :rows="rows"
      :class="[
        'form-textarea w-full',
        disabled || cardDisabled
          ? 'bg-gray-100 cursor-not-allowed'
          : 'bg-white',
        error ? 'border-red-500' : 'border-gray-300',
      ]"
      :placeholder="placeholder"
      :required="required"
      :disabled="disabled || cardDisabled"
      @input="
        $emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)
      "
      @keyup.enter.prevent="handleEnterKey"
    />
    <span v-if="error && errorMsg" class="mt-1 text-sm text-red-500">{{
      errorMsg
    }}</span>
  </div>
</template>

<script setup lang="ts">
import { inject } from "vue";

interface TextAreaProps {
  modelValue?: string;
  rows?: string | number;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  error?: boolean;
  errorMsg?: string;
  label?: string;
  id?: string;
}

const cardDisabled = inject<boolean>("cardDisabled", false);

const props = withDefaults(defineProps<TextAreaProps>(), {
  modelValue: "",
  rows: 3,
  placeholder: "Enter Textarea",
  required: false,
  disabled: false,
  error: false,
  errorMsg: "",
  label: "",
  id: "",
});

const emit = defineEmits<{
  "update:modelValue": [value: string];
  enter: [value: string];
}>();

const handleEnterKey = (event: KeyboardEvent) => {
  const target = event.target as HTMLTextAreaElement;
  const value = target.value;

  if (value) {
    emit("enter", value);
    emit("update:modelValue", "");
  }
};
</script>
