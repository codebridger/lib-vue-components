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
          iconPosition === 'left' ? 'left-3' : 'right-3',
        ]"
        @click="handleIconClick"
      />
      <textarea
        :id="id"
        :value="modelValue"
        :rows="rows"
        :class="[
          'form-textarea w-full',
          iconName && iconPosition === 'left' ? 'pl-10 text-left' : '',
          iconName && iconPosition === 'right' ? 'pr-10 text-right' : '',
          disabled || cardDisabled
            ? 'bg-gray-100 cursor-not-allowed'
            : 'bg-white',
          error ? 'border-red-500' : 'border-gray-300',
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
import { inject } from "vue";
import Icon from "../icon/Icon.vue";

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
  iconPosition?: "left" | "right";
}

const cardDisabled = inject<boolean>("cardDisabled", false);

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
  iconPosition: "left", // Default based on LTR preference
});

const emit = defineEmits<{
  "update:modelValue": [value: string];
  enter: [value: string];
  iconClick: [event: MouseEvent];
}>();

const handleIconClick = (event: MouseEvent) => {
  emit("iconClick", event);
};
</script>
