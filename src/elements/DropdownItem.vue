<template>
  <li>
    <a href="javascript:;" :class="props.class">
      <slot></slot>
    </a>
  </li>
</template>

<script lang="ts" setup>
const props = defineProps<{
  class?: string;
}>();
</script>
