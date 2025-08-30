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

    <div class="relative">
      <Icon
        v-if="iconName"
        :name="iconName"
        :class="[
          'absolute top-1/2 transform -translate-y-1/2 cursor-pointer z-10',
          actualIconPosition === 'left' ? 'left-3' : 'right-3',
        ]"
        @click="handleIconClick"
      />

      <div
        :class="[
          'relative w-full',
          iconName && actualIconPosition === 'left' ? 'pl-10' : '',
          iconName && actualIconPosition === 'right' ? 'pr-10' : '',
        ]"
      >
        <button
          :id="id"
          :class="[
            'w-full text-left px-3 py-2.5 border rounded-md transition-colors duration-200',
            'focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary',
            props.disabled || cardDisabled
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200 dark:bg-gray-800 dark:border-gray-700'
              : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100',
            error
              ? 'border-red-500 focus:ring-red-500/20 focus:border-red-500'
              : '',
            isOpen ? 'border-primary' : '',
          ]"
          :disabled="props.disabled || cardDisabled"
          :aria-expanded="isOpen"
          :aria-haspopup="true"
          :aria-labelledby="label ? `${id}-label` : undefined"
          @click="toggleDropdown"
          @keydown="handleKeydown"
        >
          <div class="flex items-center justify-between">
            <div class="flex-1 min-w-0">
              <span
                v-if="!hasSelectedOption && placeholder"
                class="text-gray-500 dark:text-gray-400"
              >
                {{ placeholder }}
              </span>
              <span v-else-if="hasSelectedOption" class="truncate">
                {{ getOptionLabel(selectedOption) }}
              </span>
            </div>
            <Icon
              name="IconCaretDown"
              :class="[
                'flex-shrink-0 transition-transform duration-200',
                isOpen ? 'rotate-180' : '',
                iconName && actualIconPosition === 'right'
                  ? 'ltr:mr-6 rtl:ml-6'
                  : 'ltr:ml-2 rtl:mr-2',
              ]"
            />
          </div>
        </button>

        <!-- Dropdown -->
        <Transition
          enter-active-class="transition ease-out duration-200"
          enter-from-class="transform opacity-0 scale-95"
          enter-to-class="transform opacity-100 scale-100"
          leave-active-class="transition ease-in duration-150"
          leave-from-class="transform opacity-100 scale-100"
          leave-to-class="transform opacity-0 scale-95"
        >
          <div
            v-if="isOpen"
            :class="[
              'absolute z-50 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-md shadow-lg',
              custom ? 'max-h-96' : 'max-h-60',
              'overflow-auto',
            ]"
            role="listbox"
            :aria-label="`${label || 'Options'} list`"
          >
            <!-- Custom Mode -->
            <template v-if="custom">
              <!-- Header Slot -->
              <div
                v-if="$slots.header"
                class="border-b border-gray-200 dark:border-gray-600"
              >
                <slot
                  name="header"
                  :all-options="props.options"
                  :set-new-list="setNewList"
                />
              </div>

              <!-- Options with Each Slot -->
              <div v-if="filteredOptions.length > 0" class="py-1">
                <template v-if="grouped">
                  <div
                    v-for="group in filteredOptions"
                    :key="group[groupLabel]"
                    class="group"
                  >
                    <div
                      class="px-3 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide bg-gray-50 dark:bg-gray-700"
                    >
                      {{ group[groupLabel] }}
                    </div>
                    <div
                      v-for="option in group[groupValues]"
                      :key="getOptionValue(option)"
                    >
                      <slot
                        name="each"
                        :option="option"
                        :is-selected="isOptionSelected(option)"
                        :set-selected="() => selectOption(option)"
                      />
                    </div>
                  </div>
                </template>
                <template v-else>
                  <div
                    v-for="option in filteredOptions"
                    :key="getOptionValue(option)"
                  >
                    <slot
                      name="each"
                      :option="option"
                      :is-selected="isOptionSelected(option)"
                      :set-selected="() => selectOption(option)"
                    />
                  </div>
                </template>
              </div>

              <!-- Footer Slot -->
              <div
                v-if="$slots.footer"
                class="border-t border-gray-200 dark:border-gray-600"
              >
                <slot name="footer" :close="closeWithAcceptance" />
              </div>
            </template>

            <!-- Default Mode -->
            <template v-else>
              <!-- Search input -->
              <div
                v-if="searchable"
                class="p-2 border-b border-gray-200 dark:border-gray-600"
              >
                <input
                  ref="searchInput"
                  v-model="searchQuery"
                  type="text"
                  :placeholder="searchPlaceholder"
                  class="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  @keydown="handleSearchKeydown"
                />
              </div>

              <!-- Options list -->
              <div v-if="filteredOptions.length > 0" class="py-1">
                <template v-if="grouped">
                  <div
                    v-for="group in filteredOptions"
                    :key="group[groupLabel]"
                    class="group"
                  >
                    <div
                      class="px-3 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide bg-gray-50 dark:bg-gray-700"
                    >
                      {{ group[groupLabel] }}
                    </div>
                    <div
                      v-for="option in group[groupValues]"
                      :key="getOptionValue(option)"
                      :class="[
                      'px-3 py-2 text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-150',
                      isOptionSelected(option) ? 'bg-primary text-white hover:bg-primary/90' : 'text-gray-900 dark:text-gray-100',
                      (option as SelectOption).$isDisabled ? 'opacity-50 cursor-not-allowed hover:bg-transparent' : ''
                    ]"
                      role="option"
                      :aria-selected="isOptionSelected(option)"
                      :aria-disabled="(option as SelectOption).$isDisabled"
                      @click="
                        !(option as SelectOption).$isDisabled &&
                          selectOption(option)
                      "
                    >
                      {{ getOptionLabel(option) }}
                    </div>
                  </div>
                </template>
                <template v-else>
                  <div
                    v-for="option in filteredOptions"
                    :key="getOptionValue(option)"
                    :class="[
                    'px-3 py-2 text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-150',
                    isOptionSelected(option) ? 'bg-primary text-white hover:bg-primary/90' : 'text-gray-900 dark:text-gray-100',
                    (option as SelectOption).$isDisabled ? 'opacity-50 cursor-not-allowed hover:bg-transparent' : ''
                  ]"
                    role="option"
                    :aria-selected="isOptionSelected(option)"
                    :aria-disabled="(option as SelectOption).$isDisabled"
                    @click="
                      !(option as SelectOption).$isDisabled &&
                        selectOption(option)
                    "
                  >
                    {{ getOptionLabel(option) }}
                  </div>
                </template>
              </div>

              <!-- No options message -->
              <div
                v-else
                class="px-3 py-2 text-sm text-gray-500 dark:text-gray-400 text-center"
              >
                {{ noOptionsMessage }}
              </div>
            </template>
          </div>
        </Transition>
      </div>
    </div>

    <span v-if="error && errorMessage" class="text-sm text-red-500 mt-1">
      {{ errorMessage }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, nextTick, watch, onMounted, onUnmounted } from "vue";
import { inject } from "vue";
import Icon from "../icon/Icon.vue";
import { useAppStore } from "../stores/index";

interface SelectOption {
  [key: string]: any;
  $isDisabled?: boolean;
}

interface SelectGroup {
  [key: string]: any;
  list?: SelectOption[];
}

interface SelectProps {
  modelValue?: any;
  options?: (string | number | SelectOption | SelectGroup)[];
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  error?: boolean;
  errorMessage?: string;
  label?: string;
  id?: string;
  searchable?: boolean;
  searchPlaceholder?: string;
  multiple?: boolean;
  grouped?: boolean;
  groupLabel?: string;
  groupValues?: string;
  trackBy?: string;
  labelKey?: string;
  valueKey?: string;
  noOptionsMessage?: string;
  iconName?: string;
  iconOppositePosition?: boolean;
  preselectFirst?: boolean;
  allowEmpty?: boolean;
  custom?: boolean;
}

const props = withDefaults(defineProps<SelectProps>(), {
  modelValue: undefined,
  options: () => [],
  placeholder: "Select an option",
  disabled: false,
  required: false,
  error: false,
  errorMessage: "",
  label: "",
  id: "",
  searchable: false,
  searchPlaceholder: "Search...",
  multiple: false,
  grouped: false,
  groupLabel: "group_name",
  groupValues: "list",
  trackBy: "value",
  labelKey: "label",
  valueKey: "value",
  noOptionsMessage: "No options available",
  iconName: "",
  iconOppositePosition: false,
  preselectFirst: false,
  allowEmpty: true,
  custom: false,
});

const emit = defineEmits<{
  "update:modelValue": [value: any];
  change: [value: any];
  focus: [event: FocusEvent];
  blur: [event: FocusEvent];
  open: [];
  close: [];
}>();

const cardDisabled = inject<boolean>("cardDisabled", false);
const store = useAppStore();

// Reactive state
const isOpen = ref(false);
const searchQuery = ref("");
const searchInput = ref<HTMLInputElement>();

// Computed properties
const actualIconPosition = computed(() =>
  props.iconOppositePosition ? (props.iconName ? "right" : "left") : "left"
);

const selectedOption = computed(() => {
  if (props.multiple) {
    return Array.isArray(props.modelValue) ? props.modelValue : [];
  }
  return props.modelValue;
});

const hasSelectedOption = computed(() => {
  if (props.multiple) {
    return Array.isArray(props.modelValue) && props.modelValue.length > 0;
  }
  return (
    props.modelValue !== undefined &&
    props.modelValue !== null &&
    props.modelValue !== ""
  );
});

const filteredOptions = computed(() => {
  if (!props.options || props.options.length === 0) return [];

  let options = props.options;

  // Apply search filter
  if (props.searchable && searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    if (props.grouped) {
      options = props.options
        .map((group: any) => ({
          ...group,
          [props.groupValues]:
            group[props.groupValues]?.filter((option: any) =>
              getOptionLabel(option).toLowerCase().includes(query)
            ) || [],
        }))
        .filter((group: any) => group[props.groupValues]?.length > 0);
    } else {
      options = props.options.filter((option: any) =>
        getOptionLabel(option).toLowerCase().includes(query)
      );
    }
  }

  return options;
});

// Methods
const getOptionValue = (option: any): any => {
  if (!option) return undefined;
  if (typeof option === "string" || typeof option === "number") {
    return option;
  }
  return option[props.valueKey] ?? option[props.trackBy] ?? option;
};

const getOptionLabel = (option: any): string => {
  if (!option) return "";
  if (typeof option === "string" || typeof option === "number") {
    return String(option);
  }
  return option[props.labelKey] ?? option.name ?? String(option);
};

const isOptionSelected = (option: any): boolean => {
  if (!option) return false;
  if (props.multiple) {
    return selectedOption.value.some(
      (selected: any) => getOptionValue(selected) === getOptionValue(option)
    );
  }
  return getOptionValue(selectedOption.value) === getOptionValue(option);
};

const selectOption = (option: any) => {
  if (props.multiple) {
    const currentValue = Array.isArray(props.modelValue)
      ? [...props.modelValue]
      : [];
    const optionValue = getOptionValue(option);

    const existingIndex = currentValue.findIndex(
      (item: any) => getOptionValue(item) === optionValue
    );

    if (existingIndex >= 0) {
      currentValue.splice(existingIndex, 1);
    } else {
      currentValue.push(option);
    }

    emit("update:modelValue", currentValue);
    emit("change", currentValue);

    // In custom mode, don't close dropdown for multiple selection
    if (!props.custom) {
      closeDropdown();
    }
  } else {
    emit("update:modelValue", option);
    emit("change", option);
    closeDropdown();
  }
};

const toggleDropdown = () => {
  if (props.disabled || cardDisabled) return;

  if (isOpen.value) {
    closeDropdown();
  } else {
    openDropdown();
  }
};

const openDropdown = () => {
  isOpen.value = true;
  emit("open");

  if (props.searchable) {
    nextTick(() => {
      searchInput.value?.focus();
    });
  }
};

const closeDropdown = () => {
  isOpen.value = false;
  searchQuery.value = "";
  emit("close");
};

const handleIconClick = () => {
  if (!props.disabled && !cardDisabled) {
    toggleDropdown();
  }
};

const handleKeydown = (event: KeyboardEvent) => {
  switch (event.key) {
    case "Enter":
    case " ":
      event.preventDefault();
      toggleDropdown();
      break;
    case "Escape":
      closeDropdown();
      break;
    case "ArrowDown":
      event.preventDefault();
      if (!isOpen.value) {
        openDropdown();
      }
      break;
    case "ArrowUp":
      event.preventDefault();
      if (!isOpen.value) {
        openDropdown();
      }
      break;
  }
};

const handleSearchKeydown = (event: KeyboardEvent) => {
  switch (event.key) {
    case "Escape":
      closeDropdown();
      break;
    case "ArrowDown":
      event.preventDefault();
      // Focus first option
      break;
  }
};

// Custom mode methods
const setNewList = (
  newOptions: (string | number | SelectOption | SelectGroup)[]
) => {
  // This method allows custom header to update the options list
  // In a real implementation, you might want to emit an event or use a different approach
  console.log("New options list set:", newOptions);
};

const closeWithAcceptance = (accepted: boolean) => {
  if (accepted) {
    // Accept the current selection
    emit("change", selectedOption.value);
  }
  // Close the dropdown regardless of acceptance
  closeDropdown();
};

// Click outside handler
const handleClickOutside = (event: Event) => {
  const target = event.target as Element;
  if (!target.closest(".relative")) {
    closeDropdown();
  }
};

// Watchers
watch(
  () => props.modelValue,
  (newValue) => {
    if (
      props.preselectFirst &&
      !newValue &&
      props.options &&
      props.options.length > 0
    ) {
      if (props.grouped) {
        const firstGroup = props.options[0] as SelectGroup;
        if (
          firstGroup[props.groupValues] &&
          firstGroup[props.groupValues].length > 0
        ) {
          const firstOption = firstGroup[props.groupValues][0];
          if (!firstOption.$isDisabled) {
            selectOption(firstOption);
          }
        }
      } else {
        const firstOption = props.options[0];
        if (typeof firstOption === "object" && !firstOption.$isDisabled) {
          selectOption(firstOption);
        } else if (typeof firstOption !== "object") {
          selectOption(firstOption);
        }
      }
    }
  },
  { immediate: true }
);

// Lifecycle
onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>
