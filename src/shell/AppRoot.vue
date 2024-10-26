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

    <!-- BEGIN APP SETTING LAUNCHER -->
    <Setting v-if="props.showSettings" />
    <!-- END APP SETTING LAUNCHER -->
  </div>
</template>

<script lang="ts" setup>
import { watch } from "vue";
import { useAppStore } from "../stores/index";
import Setting from "./ThemeCustomizer.vue";

const store = useAppStore();

const props = defineProps<{
  showSettings?: boolean;
  colorScheme?: string;
  navPosition?: string;
  layoutStyle?: string;
  direction?: string;
  navbarType?: string;
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
  () => props.navPosition,
  (newVal) => {
    if (newVal) {
      store.toggleMenu(newVal);
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

watch(
  () => props.navbarType,
  (newVal) => {
    if (newVal) {
      store.toggleNavbar(newVal);
    }
  }
);
</script>
