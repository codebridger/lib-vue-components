<template>
  <textarea
    :value="modelValue"
    :rows="rows"
    :class="[
      'form-textarea',
      disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white',
    ]"
    :placeholder="placeholder"
    :required="required"
    :disabled="disabled"
    @input="
      $emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)
    "
  />
</template>

<script setup lang="ts">
interface TextAreaProps {
  modelValue?: string;
  rows?: string | number;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
}

withDefaults(defineProps<TextAreaProps>(), {
  modelValue: "",
  rows: 3,
  placeholder: "Enter Textarea",
  required: false,
  disabled: false,
});

defineEmits<{
  "update:modelValue": [value: string];
}>();
</script>
