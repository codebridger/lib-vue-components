<template>
  <div
    class="main-section antialiased relative font-nunito text-sm font-normal"
    :class="[
      store.sidebar ? 'toggle-sidebar' : '',
      store.menu,
      store.layout,
      store.rtlClass,
    ]"
  >
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import { watch } from "vue";
import { useAppStore } from "../stores/index";

const store = useAppStore();

const props = defineProps<{
  colorScheme?: string;
  layoutStyle?: string;
  direction?: string;
}>();

watch(
  () => props.colorScheme,
  (newVal) => {
    if (newVal) {
      store.toggleTheme(newVal);
    }
  }
);

watch(
  () => props.layoutStyle,
  (newVal) => {
    if (newVal) {
      store.toggleLayout(newVal);
    }
  }
);

watch(
  () => props.direction,
  (newVal) => {
    if (newVal) {
      store.toggleRTL(newVal);
    }
  }
);
</script>
