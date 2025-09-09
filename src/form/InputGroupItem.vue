<template>
  <div v-if="isInInputGroup" :class="inputGroupItemClasses">
    <slot />
  </div>
  <div v-else>
    <slot />
  </div>
</template>

<script setup lang="ts">
import { useInputGroup } from "../composables/use-input-group";

const { isInInputGroup, inputGroupItemClasses, context } = useInputGroup();
</script>
