<template>
  <div class="flex w-full flex-col justify-center items-center">
    <ul
      class="m-auto mb-4 inline-flex items-center space-x-4 rtl:space-x-reverse"
    >
      <li>
        <Button
          outline
          :disabled="modelValue <= 1"
          @click="handlePrevClick"
          :class="{ 'opacity-50 cursor-not-allowed': modelValue <= 1 }"
          label="Prev"
        />
      </li>
      <li>{{ modelValue }} / {{ calculatedTotalPages }}</li>
      <li>
        <Button
          outline
          :disabled="modelValue >= calculatedTotalPages"
          @click="handleNextClick"
          :class="{
            'opacity-50 cursor-not-allowed': modelValue >= calculatedTotalPages,
          }"
          label="Next"
        />
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import Button from "../elements/Button.vue";

interface PaginationProps {
  /**
   * Current active page (v-model value)
   */
  modelValue?: number;
  /**
   * Total number of pages (can be calculated from totalItems and itemsPerPage)
   */
  totalPages?: number;
  /**
   * Total number of items from server response
   */
  totalItems?: number;
  /**
   * Number of items per page
   */
  itemsPerPage?: number;
}

const props = withDefaults(defineProps<PaginationProps>(), {
  modelValue: 1,
  totalPages: 1,
  totalItems: 0,
  itemsPerPage: 10,
});

const emit = defineEmits(["update:modelValue", "change-page"]);

/**
 * Calculate total pages based on total items and items per page
 * Will use direct totalPages prop if provided, otherwise calculate
 */
const calculatedTotalPages = computed(() => {
  if (props.totalPages > 1) {
    return props.totalPages;
  }

  if (props.totalItems <= 0) {
    return 1;
  }

  return Math.ceil(props.totalItems / props.itemsPerPage);
});

/**
 * Handle previous page click
 */
const handlePrevClick = () => {
  if (props.modelValue > 1) {
    const newPage = props.modelValue - 1;
    emit("update:modelValue", newPage);
    emit("change-page", newPage);
    console.log("Previous button clicked, new page:", newPage);
  }
};

/**
 * Handle next page click
 */
const handleNextClick = () => {
  if (props.modelValue < calculatedTotalPages.value) {
    const newPage = props.modelValue + 1;
    emit("update:modelValue", newPage);
    emit("change-page", newPage);
    console.log("Next button clicked, new page:", newPage);
  }
};
</script>
