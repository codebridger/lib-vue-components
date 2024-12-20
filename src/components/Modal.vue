# CustomModal.vue
<template>
  <div>
    <slot name="trigger">
      <Button @click="isShowing = true">{{ props.triggerLabel }}</Button>
    </slot>
  </div>

  <TransitionRoot appear :show="isShowing" as="template">
    <Dialog
      :as="'div'"
      class="relative z-[51]"
      :class="customClass.wrapper"
      @close="handleClose"
    >
      <!-- Backdrop -->
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <DialogOverlay
          :class="['fixed inset-0 bg-[black]/60', customClass.overlay]"
        />
      </TransitionChild>

      <!-- Modal -->
      <div class="fixed inset-0 overflow-y-auto">
        <div class="flex min-h-full items-center justify-center px-4 py-8">
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              :class="[
                'panel w-full overflow-hidden rounded-lg border-0 p-0',
                'text-black dark:text-white-dark',
                sizeClasses,
                animationClasses,
                customClass.panel,
              ]"
            >
              <!-- Close Button -->
              <button
                v-if="!hideClose"
                type="button"
                class="absolute top-4 text-gray-400 outline-none hover:text-gray-800 ltr:right-4 rtl:left-4 dark:hover:text-gray-600"
                @click="closeModal"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18 6L6 18M6 6L18 18"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </button>

              <!-- Title -->
              <div
                v-if="title || $slots.title"
                class="bg-[#fbfbfb] py-3 text-lg font-bold ltr:pl-5 ltr:pr-[50px] rtl:pl-[50px] rtl:pr-5 dark:bg-[#121c2c]"
              >
                <slot name="title">{{ title }}</slot>
              </div>

              <!-- Content -->
              <div :class="['p-5', contentClass]">
                <slot />
              </div>

              <!-- Footer -->
              <div
                v-if="$slots.footer"
                class="border-t border-[#ebe9f1] p-5 dark:border-white/10"
              >
                <slot name="footer" />
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from "vue";

import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogOverlay,
} from "@headlessui/vue";

import Button from "../elements/Button.vue";

type AnimationType =
  | "fade"
  | "slideDown"
  | "slideUp"
  | "fadeLeft"
  | "fadeRight"
  | "rotateLeft"
  | "zoomIn"
  | "none";
type ModalSize = "sm" | "md" | "lg" | "xl" | "full";

interface ModalClass {
  panel?: string;
  overlay?: string;
  wrapper?: string;
}

interface ModalProps {
  /**
   * Controls the visibility of the modal.
   */
  modelValue: boolean;

  /**
   * The title of the modal.
   */
  title?: string;

  /**
   * The label for the trigger button that opens the modal.
   */
  triggerLabel?: string;

  /**
   * The size of the modal. Can be one of "sm", "md", "lg", "xl", or "full".
   */
  size?: ModalSize;

  /**
   * The animation type for the modal. Can be one of "fade", "slideDown", "slideUp", "fadeLeft", "fadeRight", "rotateLeft", "zoomIn", or "none".
   */
  animation?: AnimationType;

  /**
   * If true, the close button will be hidden.
   */
  hideClose?: boolean;

  /**
   * If true, the modal will not close when clicking outside of it.
   */
  persistent?: boolean;

  /**
   * Custom classes for different parts of the modal.
   */
  customClass?: ModalClass;

  /**
   * If true, the modal cannot be closed.
   */
  preventClose?: boolean;

  /**
   * Custom class for the content area of the modal.
   */
  contentClass?: string;
}

const props = withDefaults(defineProps<ModalProps>(), {
  title: "",
  size: "md",
  animation: "fade",
  hideClose: false,
  persistent: false,
  customClass: () => ({
    panel: "",
    overlay: "",
    wrapper: "",
  }),
  preventClose: false,
  contentClass: "",
});

const isShowing = ref(props.modelValue);

watch(
  () => props.modelValue,
  (value) => {
    isShowing.value = value;
  }
);

watch(
  () => isShowing.value,
  (value) => {
    if (!value) {
      emit("update:modelValue", false);
      emit("close");
    }
  }
);

const emit = defineEmits<{
  (e: "update:modelValue", value: boolean): void;
  (e: "close"): void;
}>();

// Size mapping
const sizeClasses = computed(() => {
  const sizes = {
    sm: "max-w-sm",
    md: "max-w-lg",
    lg: "max-w-5xl",
    xl: "max-w-xl",
    full: "max-w-full",
  };
  return sizes[props.size];
});

// Animation mapping
const animationClasses = computed(() => {
  const animations = {
    fade: "animate__animated animate__fadeIn",
    slideDown: "animate__animated animate__slideInDown",
    slideUp: "animate__animated animate__slideInUp",
    fadeLeft: "animate__animated animate__fadeInLeft",
    fadeRight: "animate__animated animate__fadeInRight",
    rotateLeft: "animate__animated animate__rotateInDownLeft",
    zoomIn: "animate__animated animate__zoomInUp",
    none: "",
  };
  return animations[props.animation];
});

const closeModal = () => {
  if (props.preventClose) return;
  isShowing.value = false;
};

const handleClose = () => {
  if (!props.persistent) {
    closeModal();
  }
};
</script>
