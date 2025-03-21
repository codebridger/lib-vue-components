<template>
  <div class="relative flex flex-col gap-2 w-full">
    <slot
      :id="id"
      :el="inputRef"
      :files="modelValue"
      :open="open"
      :remove="remove"
      :preview="useFilePreview"
      :drop="drop"
    >
    </slot>

    <input
      :id="id"
      ref="inputRef"
      type="file"
      v-bind="$attrs"
      class="hidden"
      :multiple="multiple"
      @change="handleFileChange"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, inject } from "vue";
import { useFilePreview } from "../composables/file-preview";

interface InputFileHeadlessProps {
  /**
   * The form input identifier.
   */
  id?: string;

  /**
   * Allows multiple files to be selected.
   */
  multiple?: boolean;

  /**
   * Allows to filter files when dropped.
   */
  filterFileDropped?: (file: File) => boolean;

  /**
   * The size of the input.
   */
  size?: "sm" | "md" | "lg";

  /**
   * Whether the input is disabled.
   */
  disabled?: boolean;

  /**
   * Whether the input has an error.
   */
  error?: boolean;

  /**
   * Accept attribute for file input
   */
  accept?: string;

  /**
   * Capture attribute for file input
   */
  capture?: "user" | "environment" | boolean;
}

const cardDisabled = inject<boolean>("cardDisabled", false);

const props = withDefaults(defineProps<InputFileHeadlessProps>(), {
  id: undefined,
  multiple: false,
  filterFileDropped: () => true,
  size: "md",
  disabled: false,
  error: false,
  accept: undefined,
  capture: undefined,
});

const emit = defineEmits<{
  /**
   * Emitted when the value of the input changes
   */
  change: [event: Event];

  /**
   * Emitted when files are dropped
   */
  drop: [event: DragEvent];

  /**
   * Emitted when a file is removed
   */
  remove: [file: File];

  /**
   * Emitted when the input loses focus
   */
  blur: [event: FocusEvent];

  /**
   * Emitted when the input gains focus
   */
  focus: [event: FocusEvent];
}>();

const [modelValue] = defineModel<FileList | null>();

const inputRef = ref<HTMLInputElement>();
const id = ref(
  props.id || `file-input-${Math.random().toString(36).substr(2, 9)}`
);

const previewMap = new WeakMap<File, string>();

// Computed properties
const isDisabled = computed(() => props.disabled || cardDisabled);
const hasFiles = computed(
  () => modelValue.value && modelValue.value.length > 0
);
const fileCount = computed(() => modelValue.value?.length || 0);

function open() {
  if (!isDisabled.value) {
    inputRef.value?.click();
  }
}

function drop(event: DragEvent) {
  event.stopPropagation();
  event.preventDefault();

  if (isDisabled.value) return;

  const dt = event.dataTransfer;
  if (!dt || !inputRef.value) return;

  const filtered = new DataTransfer();
  Array.from(dt.files).forEach((file) => {
    if (props.filterFileDropped(file)) {
      filtered.items.add(file);
    }
  });

  inputRef.value.files = filtered.files;
  modelValue.value = filtered.files;
  emit("drop", event);
}

function remove(file?: File) {
  if (!file || !modelValue.value || !inputRef.value || isDisabled.value) return;

  const filtered = new DataTransfer();
  Array.from(modelValue.value).forEach((f) => {
    if (f !== file) {
      filtered.items.add(f);
    }
  });

  inputRef.value.files = filtered.files;
  modelValue.value = filtered.files;
  emit("remove", file);
}

function preview(file: File): string | undefined {
  if (previewMap.has(file)) {
    return previewMap.get(file);
  }

  const reader = new FileReader();
  reader.onload = (e) => {
    const result = e.target?.result as string;
    previewMap.set(file, result);
  };
  reader.readAsDataURL(file);
  return undefined; // Will be updated when reader.onload fires
}

function handleFileChange(event: Event) {
  if (isDisabled.value) return;

  const newFiles = (event.target as HTMLInputElement).files;
  if (!newFiles) return;

  if (props.multiple && modelValue.value) {
    const existingFiles = Array.from(modelValue.value);
    const updatedFiles = new DataTransfer();

    // Add existing files
    existingFiles.forEach((file) => {
      updatedFiles.items.add(file);
    });

    // Add new files, avoiding duplicates
    Array.from(newFiles).forEach((newFile) => {
      if (
        !existingFiles.some(
          (existingFile) => existingFile.name === newFile.name
        )
      ) {
        updatedFiles.items.add(newFile);
      }
    });

    if (!inputRef.value) return;
    inputRef.value.files = updatedFiles.files;
    modelValue.value = updatedFiles.files;
  } else {
    modelValue.value = newFiles;
  }

  emit("change", event);
}

// Expose component API
defineExpose({
  el: inputRef,
  id,
  files: modelValue,
  hasFiles,
  fileCount,
  open,
  remove,
  preview,
  drop,
  isDisabled,
  hasError: computed(() => props.error),
  size: computed(() => props.size),
});
</script>
