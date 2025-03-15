<template>
  <section class="flex flex-col gap-4">
    <div class="flex justify-start gap-2">
      <IconButton icon="IconPlus" @click="addFile" size="sm" />
      <IconButton icon="IconArrowUp" @click="uploadAllFiles" size="sm" />
    </div>
    <div
      class="relative"
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

          <h3 class="text-lg font-medium text-gray-900">
            Drop files to upload
          </h3>

          <span
            class="text-gray-400 font-sans text-[0.7rem] font-semibold uppercase"
          >
            Or
          </span>

          <p class="mt-1 text-sm text-gray-500">Click to browse files</p>

          <Button
            :disabled="disabled"
            @click="triggerFileInput"
            rounded="lg"
            label="Browse"
          />
        </div>
      </div>

      <!-- Preview section for uploaded files -->
      <div v-if="showPreview && files.length > 0" class="mt-4">
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
                <p class="text-sm font-medium text-gray-700 truncate max-w-xs">
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
                v-if="fileProgress[index] !== undefined"
              >
                <div class="flex justify-between items-center">
                  <span class="text-xs text-gray-600">
                    {{
                      fileProgress[index] === 100 ? "Complete" : "Uploading..."
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
                v-if="!disabled"
                class="text-gray-400 hover:text-gray-500 focus:outline-none"
                icon="IconX"
                size="sm"
                @click="cancelUpload(index)"
              />
              <IconButton
                v-if="!disabled"
                class="text-gray-400 hover:text-gray-500 focus:outline-none"
                icon="IconArrowUp"
                size="sm"
                @click="uploadFile(index)"
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
  /**
   * Custom upload endpoint URL
   */
  uploadUrl?: string;
  /**
   * Use mock upload for testing (simulates progress without actual server requests)
   */
  mockUpload?: boolean;
  /**
   * Automatically start upload when files are added
   */
  autoUpload?: boolean;
}

const props = withDefaults(defineProps<DropFileProps>(), {
  accept: "",
  multiple: true,
  disabled: false,
  title: "",
  description: "",
  showPreview: true,
  maxSize: 0, // 0 means no limit
  fileTypes: "",
  maxFiles: 0, // 0 means no limit
  uploadUrl: "/api/upload", // Default upload endpoint
  mockUpload: false, // Default to real uploads
  autoUpload: false, // Don't auto upload by default
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
  /**
   * Emitted when a file upload starts
   */
  (e: "upload:start", file: File, index: number): void;
  /**
   * Emitted when a file upload is completed
   */
  (e: "upload:complete", file: File, response: any, index: number): void;
  /**
   * Emitted when a file upload fails
   */
  (e: "upload:error", file: File, error: any, index: number): void;
  /**
   * Emitted when a file upload is canceled
   */
  (e: "upload:cancel", file: File, index: number): void;
  /**
   * Emitted when file upload progress changes
   */
  (e: "upload:progress", file: File, progress: number, index: number): void;
}>();

// Refs
const fileInput = ref<HTMLInputElement | null>(null);
const files = ref<File[]>([]);
const isDragging = ref(false);
const errorMessage = ref("");
const dragCounter = ref(0);
const fileProgress = ref<Record<number, number>>({});
const activeUploads = ref<Record<number, XMLHttpRequest>>({});

// Computed properties
const fileTypesText = computed(() => {
  return props.fileTypes ? `Accepted formats: ${props.fileTypes}` : "";
});

const maxSizeText = computed(() => {
  if (!props.maxSize) return "";
  return `Max size: ${formatFileSize(props.maxSize)}`;
});

// File preview helpers
const isImageFile = (file: File): boolean => {
  return file.type.startsWith("image/");
};

const createThumbnailUrl = (file: File): string => {
  return URL.createObjectURL(file);
};

// Methods
const triggerFileInput = () => {
  if (props.disabled) return;

  // Reset the input value first to ensure change event fires even if selecting the same file
  if (fileInput.value) fileInput.value.value = "";

  // Then trigger the click
  fileInput.value?.click();
};

const addFile = () => {
  triggerFileInput();
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

  // Determine the starting index for uploads
  const startIndex = files.value.length;

  // Add files to our list
  files.value = props.multiple ? [...files.value, ...fileList] : fileList;
  emit("update:files", files.value);

  // Reset the input to allow selecting the same file again
  if (fileInput.value) fileInput.value.value = "";

  // Auto upload if enabled
  if (props.autoUpload) {
    // Only upload the newly added files
    if (props.multiple) {
      for (let i = startIndex; i < files.value.length; i++) {
        uploadFile(i);
      }
    } else {
      uploadFile(0); // Only upload the single file
    }
  }
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

  // Determine the starting index for uploads
  const startIndex = files.value.length;

  // Add files to our list
  files.value = props.multiple ? [...files.value, ...fileList] : fileList;
  emit("update:files", files.value);

  // Auto upload if enabled
  if (props.autoUpload) {
    // Only upload the newly added files
    if (props.multiple) {
      for (let i = startIndex; i < files.value.length; i++) {
        uploadFile(i);
      }
    } else {
      uploadFile(0); // Only upload the single file
    }
  }
};

const removeFile = (index: number) => {
  if (props.disabled) return;

  // Cancel upload if in progress
  if (activeUploads.value[index]) {
    cancelUpload(index);
  }

  const newFiles = [...files.value];
  newFiles.splice(index, 1);
  files.value = newFiles;
  emit("update:files", files.value);

  // Clean up progress tracking
  if (fileProgress.value[index] !== undefined) {
    const newProgress = { ...fileProgress.value };
    delete newProgress[index];
    fileProgress.value = newProgress;
  }
};

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

// New functions for file uploading
const uploadFile = (index: number) => {
  if (props.disabled || !files.value[index]) return;

  const file = files.value[index];

  // Don't upload if already in progress
  if (fileProgress.value[index] !== undefined && activeUploads.value[index]) {
    return;
  }

  // Initialize progress tracking
  fileProgress.value[index] = 0;

  // Emit upload start event
  emit("upload:start", file, index);

  if (props.mockUpload) {
    // Simulate upload progress for testing purposes
    let mockProgress = 0;
    const mockUploadInterval = setInterval(() => {
      if (mockProgress < 100) {
        // Increment by a random amount between 5-15%
        const increment = Math.floor(Math.random() * 10) + 5;
        mockProgress = Math.min(mockProgress + increment, 100);

        fileProgress.value[index] = mockProgress;
        emit("upload:progress", file, mockProgress, index);

        if (mockProgress === 100) {
          clearInterval(mockUploadInterval);

          // Simulate a small delay before marking as complete
          setTimeout(() => {
            emit(
              "upload:complete",
              file,
              { success: true, message: "Mock upload complete" },
              index
            );
          }, 500);
        }
      } else {
        clearInterval(mockUploadInterval);
      }
    }, 500); // Update every 500ms

    // Store the interval ID so we can cancel it
    activeUploads.value[index] = {
      abort: () => clearInterval(mockUploadInterval),
    } as any;

    return;
  }

  // Real upload implementation
  const formData = new FormData();
  formData.append("file", file);

  const xhr = new XMLHttpRequest();
  activeUploads.value[index] = xhr;

  xhr.upload.addEventListener("progress", (event) => {
    if (event.lengthComputable) {
      const progress = Math.round((event.loaded / event.total) * 100);
      fileProgress.value[index] = progress;
      emit("upload:progress", file, progress, index);
    }
  });

  xhr.addEventListener("load", () => {
    if (xhr.status >= 200 && xhr.status < 300) {
      fileProgress.value[index] = 100;
      emit("upload:complete", file, xhr.response, index);

      // Clean up
      const newActiveUploads = { ...activeUploads.value };
      delete newActiveUploads[index];
      activeUploads.value = newActiveUploads;
    } else {
      errorMessage.value = `Upload failed: ${xhr.statusText}`;
      emit(
        "upload:error",
        file,
        { status: xhr.status, message: xhr.statusText },
        index
      );

      // Reset progress
      fileProgress.value[index] = 0;
    }
  });

  xhr.addEventListener("error", () => {
    errorMessage.value = "Upload failed due to network error";
    fileProgress.value[index] = 0;
    emit("upload:error", file, { message: "Network error" }, index);
  });

  xhr.addEventListener("abort", () => {
    fileProgress.value[index] = 0;
    emit("upload:cancel", file, index);
  });

  xhr.open("POST", props.uploadUrl);
  xhr.send(formData);
};

const cancelUpload = (index: number) => {
  if (!activeUploads.value[index]) return;

  // Call abort method (works for both XHR and our mock object)
  activeUploads.value[index].abort();

  // Clean up
  const newActiveUploads = { ...activeUploads.value };
  delete newActiveUploads[index];
  activeUploads.value = newActiveUploads;

  // Reset progress
  fileProgress.value[index] = 0;

  // Emit cancel event
  if (files.value[index]) {
    emit("upload:cancel", files.value[index], index);
  }
};

const uploadAllFiles = () => {
  if (props.disabled || files.value.length === 0) return;

  files.value.forEach((_, index) => {
    // Only start upload if not already in progress
    if (!activeUploads.value[index]) {
      uploadFile(index);
    }
  });
};
</script>
