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
    />
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
import { ref, provide, reactive, type Ref } from "vue";
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
}

const props = withDefaults(defineProps<InputFileHeadlessProps>(), {
  id: undefined,
  multiple: false,
  filterFileDropped: () => true,
  size: "md",
  disabled: false,
  error: false,
});

const [modelValue] = defineModel<FileList | null>();

const inputRef = ref<HTMLInputElement>();
const id = ref(
  props.id || `file-input-${Math.random().toString(36).substr(2, 9)}`
);

const previewMap = new WeakMap<File, Ref<string | undefined>>();

function open() {
  inputRef.value?.click();
}

function drop(event: DragEvent) {
  event.stopPropagation();
  event.preventDefault();

  const dt = event.dataTransfer;
  const filtered = new DataTransfer();
  if (inputRef.value && dt) {
    Array.from(dt.files).forEach((file) => {
      if (props.filterFileDropped(file)) {
        filtered.items.add(file);
      }
    });
    inputRef.value.files = filtered.files;
    modelValue.value = inputRef.value.files;
  }
}

function remove(file?: File) {
  if (!file) return;
  if (!modelValue.value) return;
  if (!inputRef.value) return;

  const filtered = new DataTransfer();

  if (previewMap.has(file)) {
    previewMap.delete(file);
  }

  Array.from(modelValue.value).forEach((f) => {
    if (f !== file) {
      filtered.items.add(f);
    }
  });

  inputRef.value.files = filtered.files;
  modelValue.value = inputRef.value.files;
}

function preview(file: File): string | undefined {
  if (previewMap.has(file)) {
    return previewMap.get(file)?.value;
  }

  const reader = new FileReader();
  const previewRef = ref<string>();

  reader.onload = (e) => {
    previewRef.value = e.target?.result as string;
    previewMap.set(file, previewRef);
  };

  reader.readAsDataURL(file);
  return previewRef.value;
}

function handleFileChange(event: Event) {
  const newFiles = (event.target as HTMLInputElement).files;
  if (!newFiles) return;

  if (props.multiple && modelValue.value) {
    // When multiple is true, append new files to existing ones
    const existingFiles = Array.from(modelValue.value);
    const updatedFiles = new DataTransfer();

    // Add all existing files
    existingFiles.forEach((file) => {
      updatedFiles.items.add(file);
    });

    // Add new files, optionally check for duplicates
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
    // When multiple is false, replace current files with new selection
    modelValue.value = newFiles;
  }
}

provide(
  "InputFileHeadlessContext",
  reactive({
    el: inputRef,
    id,
    files: modelValue,
    open,
    remove,
    preview: useFilePreview,
    drop,
    size: props.size,
    disabled: props.disabled,
    error: props.error,
  })
);

defineExpose({
  /**
   * The underlying HTMLInputElement element.
   */
  el: inputRef,
  /**
   * The form input identifier.
   */
  id,
  /**
   * The model value of the file input.
   */
  files: modelValue,
  /**
   * Opens the native file input selector.
   */
  open,
  /**
   * Removes a file from the input.
   */
  remove,
  /**
   * Returns the preview DataURL of a file.
   */
  preview: useFilePreview,
  /**
   * Handles the drop event.
   */
  drop,
});
</script>
