<template>
  <div class="dropdown">
    <Popper
      :placement="computedPlacement"
      :disable-click-away="disableClickAway"
      :offset-skid="offsetSkid"
      :offset-distance="offsetDistance"
      :hover="hover"
      :show="show"
      :disabled="disabled"
      :open-delay="openDelay"
      :close-delay="closeDelay"
      :z-index="zIndex"
      :arrow="arrow"
      :arrow-padding="arrowPadding"
      :interactive="interactive"
      :locked="locked"
      :content="content"
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

// Define interfaces for props and events
interface PopperProps {
  triggerText: string;
  placement?: Placement;
  disableClickAway?: boolean;
  offsetSkid?: number;
  offsetDistance?: number;
  hover?: boolean;
  show?: boolean | null;
  disabled?: boolean;
  openDelay?: number | string;
  closeDelay?: number | string;
  zIndex?: number | string;
  arrow?: boolean;
  arrowPadding?: number;
  interactive?: boolean;
  locked?: boolean;
  content?: string | null;
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
  content: null,
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

<style scoped>
/* .dropdown :deep(ul) {
	@apply min-w-[120px] py-2 text-sm text-gray-600;
  }
  
  .dropdown :deep(ul li) {
	@apply hover:bg-gray-100;
  }
  
  .dropdown :deep(ul li a) {
	@apply block px-4 py-2;
  } */
</style>
