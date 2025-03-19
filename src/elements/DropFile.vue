<template>
  <section class="flex flex-col gap-4">
    <div class="flex justify-start gap-2">
      <IconButton
        icon="IconPlus"
        @click="triggerFileInput"
        size="sm"
        :disabled="disabled"
        title="Add more files"
      />
      <IconButton
        icon="IconArrowUp"
        @click="uploadAllFiles"
        size="sm"
        :disabled="disabled || files.length === 0"
        title="Upload all files"
      />
    </div>
    <div
      class="relative"
      :class="{ 'border-primary': isDragging }"
      @drop.prevent="handleDrop"
    >
      <div
        v-if="files.length === 0"
        class="flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-lg transition-colors cursor-pointer"
        :class="[
          isDragging
            ? 'bg-primary-50 border-primary-400'
            : 'border-gray-300 hover:border-primary-300',
          disabled ? 'bg-gray-100 cursor-not-allowed opacity-60' : '',
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

          <p class="mt-1 text-sm text-gray-900">Click to browse files</p>

          <Button
            :disabled="disabled"
            @click="triggerFileInput"
            rounded="lg"
            label="Browse"
          />
        </div>
      </div>

      <!-- File drop area when files exist -->
      <div v-else class="relative">
        <input
          ref="fileInput"
          type="file"
          class="hidden"
          :accept="accept"
          :multiple="multiple"
          :disabled="disabled"
          @change="handleFileSelect"
        />
      </div>

      <!-- Preview section for uploaded files -->
      <div v-if="showPreview && files.length > 0" class="mt-4">
        <ul class="space-y-4">
          <li
            v-for="(file, index) in files"
            :key="index"
            class="flex items-center justify-between p-2 bg-white border border-gray-200 rounded-xl"
          >
            <div class="flex flex-1 items-center gap-2">
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
                  class="text-sm font-medium text-gray-700 truncate max-w-[120px]"
                >
                  {{ file.name }}
                </p>
                <p class="text-xs text-gray-500">
                  {{ formatFileSize(file.size) }}
                </p>
              </div>
            </div>
            <div class="flex flex-1 items-center justify-end gap-2">
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
                :icon="canceledUploads[index] ? 'IconRefresh' : 'IconX'"
                size="sm"
                @click="cancelUpload(index)"
                :title="
                  canceledUploads[index] ? 'Resume upload' : 'Cancel upload'
                "
              />
              <IconButton
                v-if="!disabled"
                class="text-gray-400 hover:text-gray-500 focus:outline-none"
                icon="IconArrowUp"
                size="sm"
                @click="uploadFile(index)"
                title="Upload file"
              />
              <IconButton
                v-if="!disabled"
                class="text-gray-400 hover:text-gray-500 focus:outline-none"
                icon="IconTrash"
                size="sm"
                @click="removeFile(index)"
                title="Remove file"
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
import { ref, onUnmounted } from "vue";
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
}

const props = withDefaults(defineProps<DropFileProps>(), {
  accept: "",
  multiple: true,
  disabled: false,
  title: "",
  description: "",
  showPreview: true,
  maxSize: 0, // 0 means no limit
});

const emit = defineEmits<{
  (e: "update:modelValue", value: File[]): void;
  (e: "drop", files: FileList | null): void;
}>();

// Reactive state
const files = ref<File[]>([]);
const fileInput = ref<HTMLInputElement | null>(null);
const isDragging = ref(false);
const errorMessage = ref<string>("");
const fileProgress = ref<Record<number, number>>({});
const canceledUploads = ref<Record<number, boolean>>({});

// Methods
const triggerFileInput = () => {
  if (!props.disabled) {
    fileInput.value?.click();
  }
};

const handleFileSelect = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.files) {
    handleFiles(input.files);
  }
};

const handleDrop = (event: DragEvent) => {
  event.preventDefault();
  isDragging.value = false;

  if (props.disabled) return;

  const droppedFiles = event.dataTransfer?.files;
  if (droppedFiles) {
    handleFiles(droppedFiles);
  }
};

const handleFiles = (fileList: FileList) => {
  const newFiles = Array.from(fileList);

  // Validate files
  for (const file of newFiles) {
    if (props.maxSize && file.size > props.maxSize) {
      errorMessage.value = `File ${file.name} exceeds maximum size limit`;
      return;
    }

    if (props.accept && !file.type.match(props.accept.replace("*", ".*"))) {
      errorMessage.value = `File ${file.name} is not an accepted file type`;
      return;
    }
  }

  errorMessage.value = "";

  // Add new files
  if (props.multiple) {
    const startIndex = files.value.length;
    files.value = [...files.value, ...newFiles];
    emit("update:modelValue", files.value);
    emit("drop", fileList);

    // Start upload progress for new files
    newFiles.forEach((_, index) => {
      const fileIndex = startIndex + index;
      fileProgress.value[fileIndex] = 0;
      canceledUploads.value[fileIndex] = false;
      startUploadProgress(fileIndex);
    });
  } else {
    files.value = [newFiles[0]];
    emit("update:modelValue", files.value);
    emit("drop", fileList);

    // Start upload progress for single file
    fileProgress.value[0] = 0;
    canceledUploads.value[0] = false;
    startUploadProgress(0);
  }
};

// Extract upload progress logic to a separate function
const startUploadProgress = (index: number) => {
  const interval = setInterval(() => {
    if (!canceledUploads.value[index]) {
      fileProgress.value[index] = Math.min(
        (fileProgress.value[index] || 0) + 10,
        100
      );
      if (fileProgress.value[index] === 100) {
        clearInterval(interval);
      }
    }
  }, 500);
};

const removeFile = (index: number) => {
  files.value.splice(index, 1);
  delete fileProgress.value[index];
  delete canceledUploads.value[index];
  emit("update:modelValue", files.value);
};

const uploadFile = async (index: number) => {
  // Reset progress and start upload
  fileProgress.value[index] = 0;
  canceledUploads.value[index] = false;
  startUploadProgress(index);
};

const cancelUpload = (index: number) => {
  if (canceledUploads.value[index]) {
    // Resume upload
    canceledUploads.value[index] = false;
    uploadFile(index);
  } else {
    // Cancel upload
    canceledUploads.value[index] = true;
    delete fileProgress.value[index];
  }
};

const uploadAllFiles = async () => {
  for (let i = 0; i < files.value.length; i++) {
    if (!canceledUploads.value[i]) {
      fileProgress.value[i] = 0;
      canceledUploads.value[i] = false;
      startUploadProgress(i);
    }
  }
};

const isImageFile = (file: File) => {
  return file.type.startsWith("image/");
};

const createThumbnailUrl = (file: File) => {
  return URL.createObjectURL(file);
};

const formatFileSize = (bytes: number) => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

// Clean up object URLs when component is unmounted
onUnmounted(() => {
  files.value.forEach((file) => {
    if (isImageFile(file)) {
      URL.revokeObjectURL(createThumbnailUrl(file));
    }
  });
});
</script>
