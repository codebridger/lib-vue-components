<template>
  <div
    class="file-upload relative"
    :class="{ 'border-primary': isDragging }"
    @dragenter.prevent="handleDragEnter"
    @dragleave.prevent="handleDragLeave"
    @dragover.prevent
    @drop.prevent="handleDrop"
  >
    <div
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

      <div class="text-center">
        <div class="upload-icon mb-4">
          <slot name="icon">
            <svg
              class="mx-auto h-12 w-12 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
          </slot>
        </div>

        <div class="upload-text">
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
        </div>

        <div class="mt-4">
          <slot name="browse-button">
            <button
              type="button"
              class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              :disabled="disabled"
              @click="triggerFileInput"
            >
              Browse
            </button>
          </slot>
        </div>
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
          <div class="flex items-center">
            <div class="file-icon mr-3">
              <svg
                class="h-5 w-5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
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
          <button
            v-if="!disabled"
            type="button"
            class="text-gray-400 hover:text-gray-500 focus:outline-none"
            @click="removeFile(index)"
          >
            <svg
              class="h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </li>
      </ul>
    </div>

    <div v-if="errorMessage" class="mt-2 text-sm text-red-600">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script setup lang="ts">
interface DropFileProps {}
const props = withDefaults(defineProps<DropFileProps>(), {});
</script>
