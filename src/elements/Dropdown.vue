<template>
  <div class="dropdown">
    <Popper
      :placement="computedPlacement"
      :disable-click-away="disableClickAway"
      :offset-skid="String(offsetSkid)"
      :offset-distance="String(offsetDistance)"
      :hover="hover"
      :show="show"
      :disabled="disabled"
      :open-delay="openDelay"
      :close-delay="closeDelay"
      :z-index="zIndex"
      :arrow="arrow"
      :arrow-padding="String(arrowPadding)"
      :interactive="interactive"
      :locked="locked"
      @open:popper="emit('open:popper')"
      @close:popper="emit('close:popper')"
      class="align-middle"
    >
      <slot name="trigger" :isDisabled="disabled">
        <Button :disabled="disabled">
          {{ triggerText }}
          <Icon name="IconCaretDown" class="ltr:ml-1 rtl:mr-1 inline-block" />
        </Button>
      </slot>

      <template #content="{ close, isOpen }">
        <slot name="body" :close="close" :isOpen="isOpen" />
      </template>
    </Popper>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useAppStore } from "@/stores";
import type { Placement } from "@popperjs/core";
import Button from "./Button.vue";
import Icon from "../icon/Icon.vue";

defineSlots<{
  /** Trigger slot */
  trigger(props: { isDisabled: boolean }): any;
  /** Body slot */
  body(props: { close: () => void; isOpen: boolean }): any;
}>();

interface PopperProps {
  /**
   * Text for the trigger element
   */
  triggerText?: string;
  /**
   * Preferred placement of the Popper
   */
  placement?: Placement;
  /**
   * Disables automatically closing the Popper when the user clicks away from it
   */
  disableClickAway?: boolean;
  /**
   * Offset in pixels along the trigger element
   */
  offsetSkid?: number;
  /**
   * Offset in pixels away from the trigger element
   */
  offsetDistance?: number;
  /**
   * Trigger the Popper on hover
   */
  hover?: boolean;
  /**
   * Control the Popper manually, other events (click, hover) are ignored if this is set to true/false
   */
  show?: boolean | null;
  /**
   * Disables the Popper. If it was already open, it will be closed.
   */
  disabled?: boolean;
  /**
   * Open the Popper after a delay (ms)
   */
  openDelay?: number | string;
  /**
   * Close the Popper after a delay (ms)
   */
  closeDelay?: number | string;
  /**
   * The z-index of the Popper
   */
  zIndex?: number | string;
  /**
   * Display an arrow on the Popper
   */
  arrow?: boolean;
  /**
   * Stop arrow from reaching the edge of the Popper (in pixels)
   */
  arrowPadding?: number;
  /**
   * If the Popper should be interactive, it will close when clicked/hovered if false
   */
  interactive?: boolean;
  /**
   * Lock the Popper into place, it will not flip dynamically when it runs out of space if this is set to true
   */
  locked?: boolean;
}

interface PopperEmits {
  (e: "open:popper"): void;
  (e: "close:popper"): void;
}

// Define allowed placements
const allowedPlacements: Placement[] = [
  "auto",
  "auto-start",
  "auto-end",
  "top",
  "top-start",
  "top-end",
  "bottom",
  "bottom-start",
  "bottom-end",
  "right",
  "right-start",
  "right-end",
  "left",
  "left-start",
  "left-end",
];

const props = withDefaults(defineProps<PopperProps>(), {
  placement: "bottom-end",
  disableClickAway: false,
  offsetSkid: 0,
  offsetDistance: 0,
  hover: false,
  show: null,
  disabled: false,
  openDelay: 0,
  closeDelay: 0,
  zIndex: 9999,
  arrow: false,
  arrowPadding: 0,
  interactive: true,
  locked: false,
});

// Define emits with type safety
const emit = defineEmits<PopperEmits>();

const store = useAppStore();

// Compute placement based on RTL
const computedPlacement = computed((): Placement => {
  if (!props.placement.includes("end") && !props.placement.includes("start")) {
    return props.placement;
  }

  if (store.rtlClass === "rtl") {
    return props.placement.replace("end", "start") as Placement;
  }

  return props.placement;
});
</script>
