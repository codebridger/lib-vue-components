<template>
  <section class="flex flex-col gap-4">
    <div class="flex justify-start gap-2">
      <IconButton
        icon="IconPlus"
        @click="triggerFileInput"
        size="sm"
        :disabled="disabled"
      />
      <IconButton icon="IconArrowUp" @click="" size="sm" />
    </div>
    <div
      class="file-upload relative"
      :class="{ 'border-primary': isDragging }"
      @dragenter.prevent="handleDragEnter"
      @dragleave.prevent="handleDragLeave"
      @dragover.prevent
      @drop.prevent="handleDrop"
    >
      <div
        v-if="files.length === 0"
        class="upload-area flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-lg transition-colors"
        :class="[
          isDragging
            ? 'bg-primary-50 border-primary-400'
            : 'border-gray-300 hover:border-primary-300',
          disabled
            ? 'bg-gray-100 cursor-not-allowed opacity-60'
            : 'cursor-pointer',
        ]"
      >
        <input
          ref="fileInput"
          type="file"
          class="hidden"
          :accept="accept"
          :multiple="multiple"
          :disabled="disabled"
          @change="handleFileSelect"
        />

        <div class="flex flex-col items-center gap-2">
          <Icon name="IconCloudUpload" class="w-12 h-12" />

          <slot name="title">
            <h3 class="text-lg font-medium text-gray-900">
              {{ title || "Drop files to upload" }}
            </h3>
          </slot>

          <slot name="description">
            <p class="mt-1 text-sm text-gray-500">
              {{
                description ||
                (multiple
                  ? "or click to browse files"
                  : "or click to browse a file")
              }}
            </p>
          </slot>

          <slot name="restrictions">
            <p
              v-if="fileTypesText || maxSizeText"
              class="mt-2 text-xs text-gray-500"
            >
              {{ fileTypesText }}{{ fileTypesText && maxSizeText ? ", " : ""
              }}{{ maxSizeText }}
            </p>
          </slot>

          <slot name="browse-button">
            <Button
              :disabled="disabled"
              @click="triggerFileInput"
              color="default"
              rounded="lg"
            >
              Browse
            </Button>
          </slot>
        </div>
      </div>

      <!-- Preview section for uploaded files -->
      <div v-if="showPreview && files.length > 0" class="mt-4">
        <h4 class="text-sm font-medium text-gray-700 mb-2">Uploaded Files</h4>
        <ul class="space-y-2">
          <li
            v-for="(file, index) in files"
            :key="index"
            class="flex items-center justify-between p-3 bg-gray-50 rounded-md"
          >
            <div class="flex items-center gap-2">
              <!-- <div>files preveiw(imgs, videos, ...)</div> -->
              <div>
                <p class="text-sm font-medium text-gray-700 truncate max-w-xs">
                  {{ file.name }}
                </p>
                <p class="text-xs text-gray-500">
                  {{ formatFileSize(file.size) }}
                </p>
              </div>
              <!-- <div>Progress bar </div> -->
            </div>
            <div class="flex items-center gap-2">
              <IconButton
                v-if="!disabled"
                class="text-gray-400 hover:text-gray-500 focus:outline-none"
                icon="IconX"
                size="sm"
                @click=""
              />
              <IconButton
                v-if="!disabled"
                class="text-gray-400 hover:text-gray-500 focus:outline-none"
                icon="IconArrowUp"
                size="sm"
                @click=""
              />
              <IconButton
                v-if="!disabled"
                class="text-gray-400 hover:text-gray-500 focus:outline-none"
                icon="IconTrash"
                size="sm"
                @click="removeFile(index)"
              />
            </div>
          </li>
        </ul>
      </div>

      <div v-if="errorMessage" class="mt-2 text-sm text-red-600">
        {{ errorMessage }}
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import Button from "../elements/Button.vue";
import IconButton from "../elements/IconButton.vue";
import Icon from "../icon/Icon.vue";

interface DropFileProps {
  /**
   * File types that are allowed to be uploaded (e.g. '.jpg,.png')
   */
  accept?: string;
  /**
   * Allow multiple file uploads
   */
  multiple?: boolean;
  /**
   * Disable the component
   */
  disabled?: boolean;
  /**
   * Custom title for the upload area
   */
  title?: string;
  /**
   * Custom description for the upload area
   */
  description?: string;
  /**
   * Show file preview after upload
   */
  showPreview?: boolean;
  /**
   * Maximum file size in bytes
   */
  maxSize?: number;
  /**
   * Human-readable description of accepted file types
   */
  fileTypes?: string;
  /**
   * Maximum number of files allowed
   */
  maxFiles?: number;
}

const props = withDefaults(defineProps<DropFileProps>(), {
  accept: "",
  multiple: false,
  disabled: false,
  title: "",
  description: "",
  showPreview: true,
  maxSize: 0, // 0 means no limit
  fileTypes: "",
  maxFiles: 0, // 0 means no limit
});

const emit = defineEmits<{
  /**
   * Emitted when files are selected
   */
  (e: "update:files", files: File[]): void;
  /**
   * Emitted when an error occurs
   */
  (e: "error", message: string): void;
}>();

// Refs
const fileInput = ref<HTMLInputElement | null>(null);
const files = ref<File[]>([]);
const isDragging = ref(false);
const errorMessage = ref("");
const dragCounter = ref(0);

// Computed properties
const fileTypesText = computed(() => {
  return props.fileTypes ? `Accepted formats: ${props.fileTypes}` : "";
});

const maxSizeText = computed(() => {
  if (!props.maxSize) return "";
  return `Max size: ${formatFileSize(props.maxSize)}`;
});

// Methods
const triggerFileInput = () => {
  if (props.disabled) return;
  fileInput.value?.click();
};

const handleDragEnter = (event: DragEvent) => {
  if (props.disabled) return;
  dragCounter.value++;
  isDragging.value = true;
};

const handleDragLeave = (event: DragEvent) => {
  if (props.disabled) return;
  dragCounter.value--;
  if (dragCounter.value === 0) {
    isDragging.value = false;
  }
};

const validateFiles = (
  fileList: File[]
): { valid: boolean; message: string } => {
  // Check max files limit
  if (props.maxFiles > 0 && fileList.length > props.maxFiles) {
    return {
      valid: false,
      message: `You can only upload a maximum of ${props.maxFiles} file${
        props.maxFiles > 1 ? "s" : ""
      }.`,
    };
  }

  // Check file size
  if (props.maxSize > 0) {
    const oversizedFiles = fileList.filter((file) => file.size > props.maxSize);
    if (oversizedFiles.length > 0) {
      return {
        valid: false,
        message: `The following file${
          oversizedFiles.length > 1 ? "s are" : " is"
        } too large: ${oversizedFiles.map((f) => f.name).join(", ")}`,
      };
    }
  }

  return { valid: true, message: "" };
};

const handleFileSelect = (event: Event) => {
  if (props.disabled) return;

  const input = event.target as HTMLInputElement;
  if (!input.files || input.files.length === 0) return;

  const fileList = Array.from(input.files);
  const validation = validateFiles(fileList);

  if (!validation.valid) {
    errorMessage.value = validation.message;
    emit("error", validation.message);
    return;
  }

  errorMessage.value = "";
  files.value = props.multiple ? [...files.value, ...fileList] : fileList;
  emit("update:files", files.value);

  // Reset the input to allow selecting the same file again
  if (fileInput.value) fileInput.value.value = "";
};

const handleDrop = (event: DragEvent) => {
  if (props.disabled) return;
  isDragging.value = false;
  dragCounter.value = 0;

  if (!event.dataTransfer?.files || event.dataTransfer.files.length === 0)
    return;

  const fileList = Array.from(event.dataTransfer.files);
  const validation = validateFiles(fileList);

  if (!validation.valid) {
    errorMessage.value = validation.message;
    emit("error", validation.message);
    return;
  }

  errorMessage.value = "";
  files.value = props.multiple ? [...files.value, ...fileList] : fileList;
  emit("update:files", files.value);
};

const removeFile = (index: number) => {
  if (props.disabled) return;
  const newFiles = [...files.value];
  newFiles.splice(index, 1);
  files.value = newFiles;
  emit("update:files", files.value);
};

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};
</script>
