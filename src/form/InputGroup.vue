<template>
  <div class="flex flex-col gap-1">
    <label
      v-if="label"
      :for="id"
      class="text-sm font-medium text-gray-700 dark:text-gray-300"
    >
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </label>

    <div class="flex w-full gap-0">
      <template v-for="(child, index) in children" :key="index">
        <component
          :is="child"
          v-bind="{
            ...child.props,
            'data-input-group-position': getPosition(index),
            'data-input-group-total': children.length,
            'data-input-group-remove-right-border': index < children.length - 1,
            'data-input-group-index': index,
          }"
          :class="getChildBorderClasses(index)"
          @focus="handleChildFocus(index)"
          @blur="handleChildBlur(index)"
        />
      </template>
    </div>

    <span v-if="error && errorMessage" class="text-sm text-red-500 mt-1">
      {{ errorMessage }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { provide, computed, useSlots, ref } from "vue";
import { useAppStore } from "../stores/index";

interface InputGroupProps {
  label?: string;
  id?: string;
  required?: boolean;
  error?: boolean;
  errorMessage?: string;
  disabled?: boolean;
}

const props = withDefaults(defineProps<InputGroupProps>(), {
  label: "",
  id: "",
  required: false,
  error: false,
  errorMessage: "",
  disabled: false,
});

const store = useAppStore();
const slots = useSlots();

// Track focus state of children
const focusedChildIndex = ref<number | null>(null);

// Get children from slots
const children = computed(() => {
  const defaultSlot = slots.default?.();
  return defaultSlot || [];
});

// Provide context to child components for styling coordination
const inputGroupContext = computed(() => ({
  isRtl: store.isRtl,
  isDarkMode: store.isDarkMode,
  error: props.error,
  disabled: props.disabled,
}));

// Provide border classes for all children (including non-form components)
const inputGroupBorderClasses = computed(() => {
  const classes = ["border"];
  if (props.error) {
    classes.push("border-red-500");
  } else {
    classes.push("border-gray-300 dark:border-gray-600");
  }
  return classes.join(" ");
});

// Get position for child
const getPosition = (index: number) => {
  const total = children.value.length;
  if (total === 1) return "only";
  if (index === 0) return "first";
  if (index === total - 1) return "last";
  return "middle";
};

// Focus handlers
const handleChildFocus = (index: number) => {
  focusedChildIndex.value = index;
};

const handleChildBlur = (index: number) => {
  // Only clear focus if it's the currently focused child
  if (focusedChildIndex.value === index) {
    focusedChildIndex.value = null;
  }
};

// Get border classes for child - remove right border except for last child and focused child
const getChildBorderClasses = (index: number) => {
  const total = children.value.length;
  const classes: string[] = [];

  // Only apply border manipulation if there are multiple children
  if (total > 1) {
    // Remove right border from all children except the last one and the currently focused one
    if (index < total - 1 && focusedChildIndex.value !== index) {
      classes.push("input-group-remove-right-border");
    }
  }

  return classes.join(" ");
};

provide("inputGroupContext", inputGroupContext);
provide("inputGroupBorderClasses", inputGroupBorderClasses);
</script>

<style scoped>
/* Border manipulation for InputGroup children */
.input-group-remove-right-border :deep(input),
.input-group-remove-right-border :deep(button) {
  border-right: 0 !important;
}

/* Ensure proper border connection */
.input-group-remove-right-border :deep(input:focus),
.input-group-remove-right-border :deep(button:focus) {
  border-right: 0 !important;
}
</style>
