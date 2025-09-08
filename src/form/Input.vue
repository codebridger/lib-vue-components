<template>
  <div class="flex flex-col gap-1">
    <label v-if="label" :for="id" class="text-sm font-medium text-gray-700">
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </label>

    <div class="relative">
      <Icon
        v-if="iconName"
        :name="iconName"
        :class="[
          'absolute top-1/2 transform -translate-y-1/2 cursor-pointer',
          actualIconPosition === 'left' ? 'left-3' : 'right-3',
        ]"
        @click="handleIconClick"
      />
      <input
        :class="[
          iconName && actualIconPosition === 'left' ? 'pl-10' : '',
          iconName && actualIconPosition === 'right' ? 'pr-10' : '',
          // base classes
          { 'form-input': type !== 'range' },

          // specific for range type
          { 'w-full py-2.5': type === 'range' },

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
        :id="id"
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled || cardDisabled"
        :required="required"
        :min="type === 'range' ? min : undefined"
        :max="type === 'range' ? max : undefined"
        @input="(e) => $emit('update:modelValue', (e.target as HTMLInputElement).value)"
        @blur="$emit('blur', $event)"
        @focus="$emit('focus', $event)"
        @keyup.enter="handleEnterKey"
      />
    </div>

    <span v-if="error && errorMessage" class="text-sm text-red-500 mt-1">{{
      errorMessage
    }}</span>
  </div>
</template>

<script setup lang="ts">
import { inject, computed } from "vue";
import Icon from "../icon/Icon.vue";
import { useAppStore } from "../stores/index";
import { useInputGroup } from "../composables/use-input-group";

interface InputProps {
  modelValue?: string;
  type?:
    | "text"
    | "range"
    | "email"
    | "password"
    | "number"
    | "tel"
    | "url"
    | "search";
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  error?: boolean;
  errorMessage?: string;
  label?: string;
  id?: string;
  min?: string | number;
  max?: string | number;
  iconName?: string;
  iconOppositePosition?: boolean;
}

const props = withDefaults(defineProps<InputProps>(), {
  modelValue: "",
  type: "text",
  placeholder: "",
  disabled: false,
  required: false,
  error: false,
  errorMessage: "",
  label: "",
  id: "",
  min: 0,
  max: 100,
  iconName: "",
  iconOppositePosition: false,
});

const cardDisabled = inject<boolean>("cardDisabled", false);
const store = useAppStore();
const { isInInputGroup, inputGroupClasses } = useInputGroup();

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

const emit = defineEmits<{
  /**
   * Emitted when the input value changes.
   * @storybook Use this to update v-model in stories.
   */
  "update:modelValue": [value: string];

  /**
   * Emitted when the input loses focus.
   * @storybook Useful for simulating blur events in stories.
   */
  blur: [event: FocusEvent];

  /**
   * Emitted when the input gains focus.
   * @storybook Useful for simulating focus events in stories.
   */
  focus: [event: FocusEvent];

  /**
   * Emitted when the Enter key is pressed.
   * @storybook Use this to test Enter key handling in stories.
   */
  enter: [value: string];

  /**
   * Emitted when the icon is clicked.
   * @storybook Use this to simulate icon click interactions in stories.
   */
  iconClick: [event: MouseEvent];
}>();

const handleEnterKey = (event: KeyboardEvent) => {
  const target = event.target as HTMLInputElement;
  const value = target.value;

  if (value) {
    emit("enter", value);
    emit("update:modelValue", "");
  }
};

const handleIconClick = (event: MouseEvent) => {
  emit("iconClick", event);
};
</script>
