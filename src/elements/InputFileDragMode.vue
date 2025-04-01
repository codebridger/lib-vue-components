<template>
  <section>
    <div class="flex flex-col gap-4">
      <slot name="label">
        <label
          v-if="props.label"
          :for="id"
          class="text-sm font-medium text-gray-700"
        >
          {{ props.label }}
          <span v-if="props.required" class="text-red-500">*</span>
        </label>
      </slot>

      <slot name="controls">
        <!-- Controls -->
        <div v-if="props.showControls" class="mb-4 flex items-center gap-2">
          <IconButton
            size="sm"
            title="Select files"
            @click="triggerFileInput"
            icon="IconPlus"
            label="Select files"
            :disabled="props.disabled"
          />

          <IconButton
            v-if="!props.autoUpload"
            size="sm"
            title="Start Upload"
            icon="IconArrowUp"
            label="Start Upload"
            :disabled="props.disabled"
            @click="uploadAllFiles"
          />
        </div>
      </slot>

      <slot name="upload-area">
        <div
          class="relative"
          :class="{ 'border-primary': isDragging && !props.disabled }"
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
              props.disabled
                ? 'bg-gray-100 cursor-not-allowed opacity-60'
                : 'cursor-pointer',
            ]"
          >
            <input
              ref="fileInput"
              type="file"
              class="hidden"
              :accept="props.accept"
              :multiple="props.multiple"
              :disabled="props.disabled"
              @change="handleFileSelect"
            />

            <div class="flex flex-col items-center gap-2">
              <Icon
                :name="props.uploadIcon || 'IconCloudUpload'"
                class="w-12 h-12"
              />

              <h3 class="text-lg font-medium text-gray-900">
                {{ props.title || "Drop files to upload" }}
              </h3>

              <span
                class="text-gray-400 font-sans text-[0.7rem] font-semibold uppercase"
              >
                Or
              </span>

              <p class="mt-1 text-sm text-gray-500">
                {{ props.description || "Click to browse files" }}
              </p>

              <Button
                :disabled="props.disabled"
                @click="triggerFileInput"
                rounded="lg"
                label="Browse"
              />
            </div>
          </div>

          <!-- Preview section for uploaded files -->
          <div v-if="props.showPreview && files.length > 0" class="mt-4">
            <ul class="space-y-4">
              <li
                v-for="(file, index) in files"
                :key="index"
                class="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-xl"
              >
                <div class="flex items-center gap-2">
                  <!-- File preview thumbnail -->
                  <div
                    class="size-10 flex-shrink-0 bg-gray-300 rounded-md flex items-center justify-center overflow-hidden"
                  >
                    <img
                      v-if="isImageFile(file)"
                      :src="createThumbnailUrl(file)"
                      alt="thumbnail"
                      class="h-full w-full object-cover"
                    />
                    <Icon v-else name="IconGallery" />
                  </div>
                  <div>
                    <p
                      class="text-sm font-medium text-gray-700 truncate max-w-[140px]"
                    >
                      {{ file.name }}
                    </p>
                    <p class="text-xs text-gray-500">
                      {{ formatFileSize(file.size) }}
                    </p>
                  </div>
                </div>
                <div class="flex items-center justify-end gap-3">
                  <!-- Progress bar and status -->
                  <div
                    class="flex flex-col gap-1 min-w-[120px] mx-2"
                    v-if="props.autoUpload && fileProgress[index] !== undefined"
                  >
                    <div class="flex justify-between items-center">
                      <span class="text-xs text-gray-600">
                        {{
                          fileProgress[index] === 100
                            ? "Complete"
                            : "Uploading..."
                        }}
                      </span>
                      <span class="text-xs font-medium text-blue-600">
                        {{ fileProgress[index] }}%
                      </span>
                    </div>
                    <div
                      class="w-full h-2 bg-gray-200 rounded-full overflow-hidden border border-gray-300"
                    >
                      <div
                        class="h-full bg-blue-500 transition-all duration-300"
                        :style="{ width: `${fileProgress[index]}%` }"
                      ></div>
                    </div>
                  </div>
                  <IconButton
                    v-if="!props.disabled"
                    class="text-gray-400 hover:text-gray-500 focus:outline-none"
                    icon="IconX"
                    size="sm"
                    @click="cancelUpload(index)"
                  />
                  <IconButton
                    v-if="!props.disabled && !props.autoUpload"
                    class="text-gray-400 hover:text-gray-500 focus:outline-none"
                    icon="IconArrowUp"
                    size="sm"
                    @click="uploadFile(index)"
                  />
                  <IconButton
                    v-if="!props.disabled"
                    class="text-gray-400 hover:text-gray-500 focus:outline-none"
                    icon="IconTrash"
                    size="sm"
                    @click="removeFile(index)"
                  />
                </div>
              </li>
            </ul>
          </div>
        </div>
      </slot>
    </div>
    <InputFileDropMode
      :icon="props.dropModeIcon"
      :label="props.dropModeLabel"
      :filter-file-dropped="props.filterFileDropped"
      @drop="handleGlobalDrop"
    />

    <div v-if="errorMessage" class="mt-2 text-sm text-red-600">
      {{ errorMessage }}
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, inject } from "vue";
import InputFileDropMode from "./InputFileDropMode.vue";
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
   * Label for the input
   */
  label?: string;
  /**
   * Whether the field is required
   */
  required?: boolean;
  /**
   * ID for the input element
   */
  id?: string;
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
   * Show upload controls
   */
  showControls?: boolean;
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
  /**
   * Automatically start upload when files are added
   */
  autoUpload?: boolean;
  /**
   * Icon to show in the upload area
   */
  uploadIcon?: string;
  /**
   * Icon to show in the drop mode overlay
   */
  dropModeIcon?: string;
  /**
   * Label to show in the drop mode overlay
   */
  dropModeLabel?: string;
  /**
   * Function to filter files that can be dropped
   */
  filterFileDropped?: (file: File) => boolean;
  /**
   * Error message to show when there is an error
   */
  errorMessage?: string;
}

const props = withDefaults(defineProps<DropFileProps>(), {
  accept: "",
  multiple: true,
  disabled: false,
  title: "",
  description: "",
  label: "",
  required: false,
  showPreview: true,
  showControls: true,
  maxSize: 0, // 0 means no limit
  fileTypes: "",
  maxFiles: 0, // 0 means no limit
  autoUpload: false, // Don't auto upload by default
  uploadIcon: "IconCloudUpload",
  dropModeIcon: "IconGallery",
  dropModeLabel: "Drop your files",
  filterFileDropped: () => true,
  errorMessage: "",
});

const emit = defineEmits<{
  (e: "file-select", files: File[]): void;
  (e: "file-upload", file: File, index: number): void;
  (e: "file-remove", file: File, index: number): void;
  (e: "file-upload-all"): void;
  (
    e: "file-upload-progress",
    file: File,
    progress: number,
    index: number
  ): void;
  (e: "file-upload-error", file: File, error: Error, index: number): void;
  (e: "file-upload-complete", file: File, index: number): void;
}>();

const cardDisabled = inject<boolean>("cardDisabled", false);

// Refs
const fileInput = ref<HTMLInputElement | null>(null);
const files = ref<File[]>([]);
const isDragging = ref(false);
const fileProgress = ref<Record<number, number>>({});
const errorMessage = ref<string>("");
const id = computed(
  () => props.id || `file-input-${Math.random().toString(36).substr(2, 9)}`
);

// Methods
function triggerFileInput() {
  if (props.disabled || cardDisabled) {
    return;
  }

  // Create a new input element
  const input = document.createElement("input");
  input.type = "file";
  input.accept = props.accept;
  input.multiple = props.multiple;
  input.style.display = "none";

  // Add change event listener
  input.addEventListener("change", (event) => {
    handleFileSelect(event);
    // Clean up the input element
    document.body.removeChild(input);
  });

  // Append to body and trigger click
  document.body.appendChild(input);
  input.click();
}

function handleFileSelect(event: Event) {
  const input = event.target as HTMLInputElement;
  if (!input.files) return;

  const selectedFiles = Array.from(input.files);

  // Apply file validation (maxSize, maxFiles)
  if (props.maxSize > 0) {
    const oversizedFiles = selectedFiles.filter(
      (file) => file.size > props.maxSize
    );
    if (oversizedFiles.length > 0) {
      errorMessage.value = `Some files exceed the maximum size of ${formatFileSize(
        props.maxSize
      )}`;
      return;
    }
  }

  if (
    props.maxFiles > 0 &&
    files.value.length + selectedFiles.length > props.maxFiles
  ) {
    errorMessage.value = `Maximum ${props.maxFiles} files allowed`;
    return;
  }

  // Check for duplicate files
  const duplicateFiles = selectedFiles.filter((newFile) =>
    files.value.some(
      (existingFile) =>
        existingFile.name === newFile.name && existingFile.size === newFile.size
    )
  );

  if (duplicateFiles.length > 0) {
    errorMessage.value = "Some files are already selected";
    return;
  }

  // Add files to the list
  files.value = [...files.value, ...selectedFiles];
  emit("file-select", files.value);

  // Auto upload if enabled
  if (props.autoUpload) {
    uploadAllFiles();
  }

  errorMessage.value = "";
}

function handleDragEnter(event: DragEvent) {
  if (props.disabled || cardDisabled) {
    return;
  }

  event.preventDefault();
  isDragging.value = true;
}

function handleDragLeave(event: DragEvent) {
  if (props.disabled || cardDisabled) {
    return;
  }

  event.preventDefault();
  isDragging.value = false;
}

function handleDrop(event: DragEvent) {
  if (props.disabled || cardDisabled) {
    return;
  }

  event.preventDefault();
  isDragging.value = false;

  if (!event.dataTransfer) return;

  const droppedFiles = Array.from(event.dataTransfer.files);
  const filteredFiles = droppedFiles.filter((file) =>
    props.filterFileDropped(file)
  );

  // Apply validation
  if (
    props.maxFiles > 0 &&
    files.value.length + filteredFiles.length > props.maxFiles
  ) {
    errorMessage.value = `Maximum ${props.maxFiles} files allowed`;
    return;
  }

  if (props.maxSize > 0) {
    const oversizedFiles = filteredFiles.filter(
      (file) => file.size > props.maxSize
    );
    if (oversizedFiles.length > 0) {
      errorMessage.value = `Some files exceed the maximum size of ${formatFileSize(
        props.maxSize
      )}`;
      return;
    }
  }

  // Add files to the list
  files.value = [...files.value, ...filteredFiles];
  emit("file-select", files.value);

  // Auto upload if enabled
  if (props.autoUpload) {
    uploadAllFiles();
  }

  errorMessage.value = "";
}

function handleGlobalDrop(fileList: FileList) {
  if (props.disabled || cardDisabled) {
    return;
  }

  const droppedFiles = Array.from(fileList);

  // Apply validation
  if (
    props.maxFiles > 0 &&
    files.value.length + droppedFiles.length > props.maxFiles
  ) {
    errorMessage.value = `Maximum ${props.maxFiles} files allowed`;
    return;
  }

  if (props.maxSize > 0) {
    const oversizedFiles = droppedFiles.filter(
      (file) => file.size > props.maxSize
    );
    if (oversizedFiles.length > 0) {
      errorMessage.value = `Some files exceed the maximum size of ${formatFileSize(
        props.maxSize
      )}`;
      return;
    }
  }

  // Add files to the list
  files.value = [...files.value, ...droppedFiles];
  emit("file-select", files.value);

  // Auto upload if enabled
  if (props.autoUpload) {
    uploadAllFiles();
  }

  errorMessage.value = "";
}

function uploadFile(index: number) {
  if (props.disabled || cardDisabled) {
    return;
  }

  const file = files.value[index];
  if (!file) return;

  // Start with 0% progress
  fileProgress.value[index] = 0;

  // Simulate progress (in a real app, this would be an actual upload)
  const interval = setInterval(() => {
    if (fileProgress.value[index] < 100) {
      fileProgress.value[index] += 10;
      emit("file-upload-progress", file, fileProgress.value[index], index);
    } else {
      clearInterval(interval);
      emit("file-upload-complete", file, index);
    }
  }, 300);

  emit("file-upload", file, index);
}

function uploadAllFiles() {
  if (props.disabled || cardDisabled) {
    return;
  }

  files.value.forEach((_, index) => {
    if (
      fileProgress.value[index] === undefined ||
      fileProgress.value[index] < 100
    ) {
      uploadFile(index);
    }
  });

  emit("file-upload-all");
}

function cancelUpload(index: number) {
  if (props.disabled || cardDisabled) {
    return;
  }

  delete fileProgress.value[index];
}

function removeFile(index: number) {
  if (props.disabled || cardDisabled) {
    return;
  }

  const file = files.value[index];
  if (!file) return;

  files.value.splice(index, 1);
  delete fileProgress.value[index];

  emit("file-remove", file, index);
}

function isImageFile(file: File): boolean {
  return /\.(jpg|jpeg|png|gif|webp|bmp|svg)$/i.test(file.name);
}

function createThumbnailUrl(file: File): string {
  return URL.createObjectURL(file);
}

function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}
</script>
