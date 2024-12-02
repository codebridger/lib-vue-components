<template>
  <li>
    <a href="javascript:;" :class="class">
      <slot></slot>
    </a>
  </li>
</template>

<script lang="ts" setup>
const props = defineProps<{
  class: string;
}>();
</script>
