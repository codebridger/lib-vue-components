<template>
  <div class="flex flex-col gap-1">
    <label v-if="label" :for="id" class="text-sm font-medium text-gray-700">
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </label>
    <input
      :id="id"
      :type="type"
      :value="type !== 'file' ? modelValue : undefined"
      :placeholder="!['range', 'file'].includes(type) ? placeholder : undefined"
      :disabled="disabled"
      :required="required"
      :min="type === 'range' ? min : undefined"
      :max="type === 'range' ? max : undefined"
      :class="[
        {
          'w-full py-2.5': type === 'range',
          'form-input file:py-2 file:px-4 file:border-0 file:font-semibold p-0 file:bg-primary/90 ltr:file:mr-5 rtl:file:ml-5 file:text-white file:hover:bg-primary':
            type === 'file',
          'form-input': !['range', 'file'].includes(type),
        },
      ]"
      @input="handleInput"
      @blur="$emit('blur', $event)"
      @focus="$emit('focus', $event)"
    />
  </div>
</template>

<script setup lang="ts">
interface InputProps {
  modelValue?: string;
  type?:
    | "text"
    | "range"
    | "file"
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
  label?: string;
  id?: string;
  min?: string | number;
  max?: string | number;
}

const props = withDefaults(defineProps<InputProps>(), {
  modelValue: "",
  type: "text",
  placeholder: "",
  disabled: false,
  required: false,
  error: false,
  label: "",
  id: "",
  min: 0,
  max: 100,
});

const emit = defineEmits<{
  "update:modelValue": [value: string];
  blur: [event: FocusEvent];
  focus: [event: FocusEvent];
  "file-change": [files: FileList];
}>();

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (props.type === "file" && target.files) {
    emit("file-change", target.files);
  } else {
    emit("update:modelValue", target.value);
  }
};
</script>
