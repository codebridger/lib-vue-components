<template>
  <div class="flex flex-col gap-1">
    <label v-if="label" :for="id" class="text-sm font-medium text-gray-700">
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </label>
    <input
      :id="id"
      ref="fileInput"
      type="file"
      :accept="accept"
      :capture="capture"
      :multiple="multiple"
      :size="size"
      :disabled="disabled"
      :required="required"
      :class="[
        `form-input file:py-2 file:px-4 file:border-0 file:font-semibold p-0 file:bg-${buttonColor}/90 ltr:file:mr-5 rtl:file:ml-5 file:text-white file:hover:bg-${buttonColor}`,
        disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white',
        error ? 'border-red-500' : 'border-gray-300',
        'w-full',
      ]"
      @change="handleFileChange"
      @input="handleInput"
      @cancel="handleCancel"
      @blur="$emit('blur', $event)"
      @focus="$emit('focus', $event)"
    />
    <span v-if="error && errorMessage" class="text-sm text-red-500 mt-1">
      {{ errorMessage }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

interface FileInputProps {
  disabled?: boolean;
  required?: boolean;
  error?: boolean;
  errorMessage?: string;
  label?: string;
  id?: string;
  buttonColor?:
    | "primary"
    | "info"
    | "success"
    | "warning"
    | "danger"
    | "secondary"
    | "dark"
    | "gradient";
  accept?: string;
  capture?: string;
  multiple?: boolean;
  size?: number;
}

const props = withDefaults(defineProps<FileInputProps>(), {
  disabled: false,
  required: false,
  error: false,
  errorMessage: "",
  label: "",
  id: "",
  buttonColor: "primary",
  accept: "",
  capture: "",
  multiple: false,
  size: 0,
});

const emit = defineEmits<{
  change: [event: Event];
  input: [event: Event];
  cancel: [event: Event];
  "file-change": [files: FileList];
  blur: [event: FocusEvent];
  focus: [event: FocusEvent];
}>();

const fileInput = ref<HTMLInputElement | null>(null);

const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit("change", event);
  if (target.files) {
    emit("file-change", target.files);
  }
};

const handleInput = (event: Event) => {
  emit("input", event);
};

const handleCancel = (event: Event) => {
  emit("cancel", event);
  if (fileInput.value) {
    fileInput.value.value = "";
  }
};
</script>
