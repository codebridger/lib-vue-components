<template>
  <div>
    <label v-if="label" :for="id" class="text-sm font-medium text-gray-700">
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </label>

    <div class="relative">
      <Icon
        v-if="iconName"
        :name="iconName"
        :class="[
          'absolute top-3 transform cursor-pointer',
          actualIconPosition === 'left' ? 'left-3' : 'right-3',
        ]"
        @click="handleIconClick"
      />
      <textarea
        :id="id"
        :value="modelValue"
        :rows="rows"
        :class="[
          'form-textarea w-full',
          iconName && actualIconPosition === 'left' ? 'pl-10' : '',
          iconName && actualIconPosition === 'right' ? 'pr-10' : '',
          // Input group styling takes precedence
          isInInputGroup
            ? [...inputGroupClasses, 'flex-1']
            : [
                disabled || cardDisabled
                  ? 'bg-gray-100 cursor-not-allowed'
                  : 'bg-white',
                error ? 'border-red-500' : 'border-gray-300',
              ],
        ]"
        :placeholder="placeholder"
        :required="required"
        :disabled="disabled || cardDisabled"
        @input="
          $emit(
            'update:modelValue',
            ($event.target as HTMLTextAreaElement).value
          )
        "
      />
    </div>
    <span v-if="error && errorMsg" class="mt-1 text-sm text-red-500">{{
      errorMsg
    }}</span>
  </div>
</template>

<script setup lang="ts">
import { inject, computed } from "vue";
import Icon from "../icon/Icon.vue";
import { useAppStore } from "../stores/index";
import { useInputGroup } from "../composables/use-input-group";

interface TextAreaProps {
  modelValue?: string;
  rows?: string | number;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  error?: boolean;
  errorMsg?: string;
  label?: string;
  id?: string;
  iconName?: string;
  iconOppositePosition?: boolean;
}

const cardDisabled = inject<boolean>("cardDisabled", false);
const { isInInputGroup, inputGroupClasses } = useInputGroup();

const props = withDefaults(defineProps<TextAreaProps>(), {
  modelValue: "",
  rows: 3,
  placeholder: "Enter Textarea",
  required: false,
  disabled: false,
  error: false,
  errorMsg: "",
  label: "",
  id: "",
  iconName: "",
  iconOppositePosition: false,
});

const store = useAppStore();

// Calculate icon position based on existing RTL state and iconOppositePosition
const actualIconPosition = computed(() => {
  if (props.iconOppositePosition) {
    // Opposite side: right in LTR, left in RTL
    return store.isRtl ? "left" : "right";
  } else {
    // Behind content (default): left in LTR, right in RTL
    return store.isRtl ? "right" : "left";
  }
});

// Storybook: Define emitted events for documentation and type safety
const emit = defineEmits<{
  /**
   * Emitted when the textarea value changes.
   * @param value The new value of the textarea.
   */
  "update:modelValue": [value: string];
  /**
   * Emitted when the Enter key is pressed in the textarea.
   * @param value The current value of the textarea.
   */
  enter: [value: string];
  /**
   * Emitted when the icon is clicked.
   * @param event The mouse event from the icon click.
   */
  iconClick: [event: MouseEvent];
}>();

const handleIconClick = (event: MouseEvent) => {
  emit("iconClick", event);
};
</script>
