<template>
  <component v-if="staticIcons[iconName]" :is="staticIcons[iconName]" />
  <component v-else-if="menuIcons[iconName]" :is="menuIcons[iconName]" />

  <component
    v-else-if="variantIcons[iconName]"
    :is="variantIcons[iconName]"
    :fill="props.fill"
    :duotone="props.duotone"
  />

  <div v-else :class="[props.name]" />
</template>

<script setup lang="ts">
import { computed } from "vue";
import staticIcons from "./static-icons";
import variantIcons from "./variant-icons";
import menuIcons from "./menu-icons";

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  fill: {
    type: Boolean,
    default: false,
    require: false,
  },
  duotone: {
    type: Boolean,
    default: false,
    require: false,
  },
});

const iconName = computed(() => {
  // Split by '-' and capitalize the first character of each word
  return (props.name || "")
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("");
});
</script>
