<template>
  <div class="flex flex-col gap-1">
    <label v-if="label" :for="id" class="text-sm font-medium text-gray-700">
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </label>

    <div class="relative">
      <slot
        :id="id"
        :el="inputRef"
        :files="modelValue"
        :open="open"
        :remove="remove"
        :preview="preview"
        :drop="drop"
        :file-count="fileCount"
        :has-files="hasFiles"
        :is-disabled="isDisabled"
        :has-error="error"
      >
        <div
          role="button"
          tabindex="-1"
          class="w-full"
          @dragenter.stop.prevent
          @dragover.stop.prevent
          @drop="!isDisabled && drop($event)"
        >
          <div
            v-if="!fileCount"
            :class="[
              'focus:ring-primary-500/50 group cursor-pointer rounded-lg border-[3px] border-dashed p-8 transition-colors duration-300 focus:outline-none focus:ring-2',
              error
                ? 'border-red-500 hover:border-red-400 focus:border-red-400'
                : 'border-gray-300 hover:border-gray-400 focus:border-gray-400 dark:border-gray-700 dark:hover:border-gray-600 dark:focus:border-gray-700',
            ]"
            tabindex="0"
            role="button"
            @click="open"
            @keydown.enter.prevent="open"
          >
            <div class="flex flex-col items-center justify-center gap-2 p-2">
              <Icon :name="iconName" class="size-10 text-gray-400" />
              <h4 class="font-sans text-sm text-gray-400">
                {{ placeholder || "Drop files to upload" }}
              </h4>
              <div>
                <span
                  class="font-sans text-[0.7rem] font-semibold uppercase text-gray-400"
                >
                  Or
                </span>
              </div>
              <label
                :for="id"
                class="group-hover:text-primary-500 group-focus:text-primary-500 cursor-pointer font-sans text-sm text-gray-400 underline underline-offset-4 transition-colors duration-300"
              >
                Select files
              </label>
            </div>
          </div>
        </div>
      </slot>
    </div>

    <span v-if="error && errorMessage" class="text-sm text-red-500 mt-1">
      {{ errorMessage }}
    </span>

    <input
      :id="id"
      ref="inputRef"
      type="file"
      v-bind="$attrs"
      class="hidden"
      :multiple="multiple"
      :disabled="isDisabled"
      :accept="accept"
      :required="required"
      @change="handleFileChange"
      @blur="$emit('blur', $event)"
      @focus="$emit('focus', $event)"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, inject } from "vue";
import Icon from "../icon/Icon.vue";

interface InputFileHeadlessProps {
  modelValue?: FileList | null;
  label?: string;
  placeholder?: string;
  iconName?: string;
  multiple?: boolean;
  filterFileDropped?: (file: File) => boolean;
  disabled?: boolean;
  required?: boolean;
  error?: boolean;
  errorMessage?: string;
  id?: string;
  accept?: string;
}

const props = withDefaults(defineProps<InputFileHeadlessProps>(), {
  modelValue: null,
  label: "",
  placeholder: "",
  iconName: "IconCloudUpload",
  multiple: false,
  filterFileDropped: () => true,
  disabled: false,
  required: false,
  error: false,
  errorMessage: "",
  id: "",
  accept: undefined,
});

const emit = defineEmits<{
  "update:modelValue": [value: FileList | null];
  change: [event: Event];
  drop: [event: DragEvent];
  remove: [file: File];
  blur: [event: FocusEvent];
  focus: [event: FocusEvent];
}>();

const cardDisabled = inject<boolean>("cardDisabled", false);

// Computed properties and refs
const inputRef = ref<HTMLInputElement>();
const id = computed(
  () => props.id || `file-input-${Math.random().toString(36).substr(2, 9)}`
);
const isDisabled = computed(() => props.disabled || cardDisabled);
const hasFiles = computed(
  () => props.modelValue && props.modelValue.length > 0
);
const fileCount = computed(() => props.modelValue?.length || 0);

// File preview cache
const previewMap = new WeakMap<File, string>();

// Methods
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
  emit("update:modelValue", filtered.files);
  emit("drop", event);
}

function remove(file: File) {
  if (!props.modelValue || !inputRef.value || isDisabled.value) return;

  const filtered = new DataTransfer();
  Array.from(props.modelValue).forEach((f) => {
    if (f !== file) {
      filtered.items.add(f);
    }
  });

  inputRef.value.files = filtered.files;
  emit("update:modelValue", filtered.files);
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

  if (props.multiple && props.modelValue) {
    const existingFiles = Array.from(props.modelValue);
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
    emit("update:modelValue", updatedFiles.files);
  } else {
    emit("update:modelValue", newFiles);
  }

  emit("change", event);
}
</script>
