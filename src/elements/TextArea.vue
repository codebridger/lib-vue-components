<template>
  <div>
    <textarea
      :value="modelValue"
      :rows="rows"
      :class="[
        'form-textarea',
        disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white',
        error ? 'border-red-500' : 'border-gray-300',
      ]"
      :placeholder="placeholder"
      :required="required"
      :disabled="disabled"
      @input="
        $emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)
      "
    />
    <span v-if="error && errorMsg" class="mt-1 text-sm text-red-500">{{
      errorMsg
    }}</span>
  </div>
</template>

<script setup lang="ts">
interface TextAreaProps {
  modelValue?: string;
  rows?: string | number;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  error?: boolean;
  errorMsg?: string;
}

withDefaults(defineProps<TextAreaProps>(), {
  modelValue: "",
  rows: 3,
  placeholder: "Enter Textarea",
  required: false,
  disabled: false,
  error: false,
  errorMsg: "",
});

defineEmits<{
  "update:modelValue": [value: string];
}>();
</script>
