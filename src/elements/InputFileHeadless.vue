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
      :file-count="fileCount"
      :has-files="hasFiles"
      :is-disabled="isDisabled"
      :has-error="error"
    >
      <slot name="default">
        <div
          role="button"
          tabindex="-1"
          class="w-full"
          @dragenter.stop.prevent
          @dragover.stop.prevent
          @drop="!isDisabled && drop($event)"
        >
          <div
            v-if="!isDisabled"
            class="focus:ring-primary-500/50 group cursor-pointer rounded-lg border-[3px] border-dashed border-gray-300 p-8 transition-colors duration-300 hover:border-gray-400 focus:border-gray-400 focus:outline-none focus:ring-2 dark:border-gray-700 dark:hover:border-gray-600 dark:focus:border-gray-700"
            tabindex="0"
            role="button"
            @click="open"
            @keydown.enter.prevent="open"
          >
            <slot
              name="upload-ui"
              :file-count="fileCount"
              :has-files="hasFiles"
            >
              <div class="flex flex-col items-center justify-center gap-2 p-2">
                <slot name="icon">
                  <Icon name="IconCloudUpload" class="size-10 text-gray-400" />
                </slot>

                <slot name="title">
                  <h4 class="font-sans text-sm text-gray-400">
                    Drop files to upload
                  </h4>
                </slot>

                <slot name="divider">
                  <div>
                    <span
                      class="font-sans text-[0.7rem] font-semibold uppercase text-gray-400"
                    >
                      Or
                    </span>
                  </div>
                </slot>

                <slot name="select-button">
                  <label
                    :for="id"
                    class="group-hover:text-primary-500 group-focus:text-primary-500 cursor-pointer font-sans text-sm text-gray-400 underline underline-offset-4 transition-colors duration-300"
                  >
                    Select files
                  </label>
                </slot>
              </div>
            </slot>
            <slot name="list-files" :files="modelValue" :remove="remove"></slot>
          </div>
          <div
            v-else
            class="group cursor-not-allowed rounded-lg border-[3px] border-dashed border-gray-200 bg-gray-50 p-8 transition-colors duration-300 dark:border-gray-700 dark:bg-gray-800"
          >
            <slot
              name="upload-ui-disabled"
              :file-count="fileCount"
              :has-files="hasFiles"
            >
              <div class="flex flex-col items-center justify-center gap-2 p-2">
                <slot name="icon-disabled">
                  <Icon name="IconCloudUpload" class="size-10 text-gray-300" />
                </slot>

                <slot name="title-disabled">
                  <h4 class="font-sans text-sm text-gray-300">
                    File upload disabled
                  </h4>
                </slot>
              </div>
            </slot>
          </div>
        </div>
      </slot>
    </slot>

    <input
      :id="id"
      ref="inputRef"
      type="file"
      v-bind="$attrs"
      class="hidden"
      :multiple="multiple"
      :disabled="isDisabled"
      @change="handleFileChange"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, inject } from "vue";
import { useFilePreview } from "../composables/file-preview";
import Icon from "@/icon/Icon.vue";

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
}

const cardDisabled = inject<boolean>("cardDisabled", false);

const props = withDefaults(defineProps<InputFileHeadlessProps>(), {
  id: undefined,
  multiple: false,
  filterFileDropped: () => true,
  disabled: false,
  error: false,
  accept: undefined,
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
</script>
