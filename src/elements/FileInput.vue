<template>
  <div class="flex flex-col gap-1">
    <label v-if="label" :for="id" class="text-sm font-medium text-gray-700">
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </label>

    <input
      :class="[
        // base classes
        `form-input file:border-0 file:font-semibold w-full file:py-2 file:px-4 p-0`,

        // Direction classes
        'ltr:file:mr-5 rtl:file:ml-5',

        // colors
        'file:text-white',
        disabled || cardDisabled
          ? 'bg-gray-100 cursor-not-allowed'
          : computedButtonColor,

        // Interactions
        disabled || cardDisabled
          ? 'bg-gray-100 cursor-not-allowed'
          : 'bg-white',
        error ? 'border-red-500' : 'border-gray-300',
      ]"
      :id="id"
      ref="fileInput"
      type="file"
      :accept="accept"
      :capture="capture"
      :multiple="multiple"
      :size="size"
      :required="required"
      @change="handleFileChange"
      @input="handleInput"
      @cancel="handleCancel"
      @blur="$emit('blur', $event)"
      @focus="$emit('focus', $event)"
      :disabled="disabled || cardDisabled"
    />

    <span v-if="error && errorMessage" class="text-sm text-red-500 mt-1">
      {{ errorMessage }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, inject } from "vue";

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
  capture?: "user" | "environment" | boolean;
  multiple?: boolean;
  size?: number;
}

const cardDisabled = inject<boolean>("cardDisabled");

const computedButtonColor = computed(() => {
  const colorList = {
    primary: "file:bg-primary/90 file:hover:bg-primary",
    info: "file:bg-info/90 file:hover:bg-info",
    success: "file:bg-success/90 file:hover:bg-success",
    warning: "file:bg-warning/90 file:hover:bg-warning",
    danger: "file:bg-danger/90 file:hover:bg-danger",
    secondary: "file:bg-secondary/90 file:hover:bg-secondary",
    dark: "file:bg-dark/90 file:hover:bg-dark",
    gradient: "file:bg-gradient/90 file:hover:bg-gradient",
  };

  return colorList[props.buttonColor];
});

const props = withDefaults(defineProps<FileInputProps>(), {
  disabled: false,
  required: false,
  error: false,
  errorMessage: "",
  label: "",
  id: "",
  buttonColor: "primary",
  accept: "",
  multiple: false,
  size: 0,
});

const emit = defineEmits<{
  /**
   * Emitted when the value of the input changes
   */
  change: [event: Event];

  /**
   * Emitted when the user inputs data
   */
  input: [event: Event];

  /**
   * Emitted when the user cancels the input
   */
  cancel: [event: Event];

  /**
   * Emitted when the selected files change
   */
  "file-change": [files: FileList];

  /**
   * Emitted when the input loses focus
   */
  blur: [event: FocusEvent];

  /**
   * Emitted when the input gains focus
   */
  focus: [event: FocusEvent];
}>();

const fileInput = ref<HTMLInputElement | null>(null);

function handleFileChange(event: Event) {
  const target = event.target as HTMLInputElement;
  emit("change", event);
  if (target.files) {
    emit("file-change", target.files);
  }
}

function handleInput(event: Event) {
  emit("input", event);
}

function handleCancel(event: Event) {
  emit("cancel", event);
  if (fileInput.value) {
    fileInput.value.value = "";
  }
}
</script>
