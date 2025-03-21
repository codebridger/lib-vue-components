<template>
  <div class="z-50">
    <div v-if="isDropping" class="bg-black/50" />
    <div v-show="isDropping" class="flex items-center justify-center">
      <Transition
        enter-active-class="transition duration-100 ease-out"
        enter-from-class="transform scale-0 opacity-0"
        enter-to-class="transform scale-1 opacity-100"
        leave-active-class="transition duration-75 ease-in"
        leave-from-class="transform scale-1 opacity-100"
        leave-to-class="transform scale-0 opacity-0"
      >
        <div
          v-if="isDropping"
          class="bg-white rounded-lg shadow-xl p-8 max-w-md w-full mx-4"
        >
          <div class="flex flex-col items-center gap-4">
            <Icon
              v-if="props.icon"
              :name="props.icon"
              class="w-16 h-16 text-gray-600"
            />
            <div class="text-lg font-medium text-gray-900 text-center">
              {{ props.label }}
            </div>
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
import Icon from "../icon/Icon.vue";

interface FullscreenDropfileProps {
  icon?: string;
  label?: string;
  filterFileDropped?: (file: File) => boolean;
}

const props = withDefaults(defineProps<FullscreenDropfileProps>(), {
  label: "Drop your files",
  icon: "IconGallery",
  filterFileDropped: () => true,
});

const emits = defineEmits<{
  drop: [value: FileList];
}>();

const isDropping = ref(false);

// drag file over app handlers, to show drop placeholder
// we need to keep track of how deep the drag is because it raises on each child elements
let dragCount = 0;
function onDragenter() {
  dragCount += 1;
  if (dragCount === 1) {
    isDropping.value = true;
  }
}
function onDragleave() {
  dragCount -= 1;
  if (dragCount === 0) {
    isDropping.value = false;
  }
}
function onDragover(e: DragEvent) {
  // prevent file from being opened in new browser tab
  e.preventDefault();
}
function onDrop(event: DragEvent) {
  event.preventDefault();

  isDropping.value = false;
  dragCount = 0;

  if (!event.dataTransfer) {
    return;
  }

  const dt = event.dataTransfer;
  const filtered = new DataTransfer();
  if (dt) {
    Array.from(dt.files).forEach((file) => {
      if (props.filterFileDropped(file)) {
        filtered.items.add(file);
      }
    });
  }
  emits("drop", filtered.files);
}

// register drag events
onMounted(() => {
  document.documentElement.addEventListener("dragenter", onDragenter, false);
  document.documentElement.addEventListener("dragleave", onDragleave, false);
  document.documentElement.addEventListener("dragover", onDragover, false);
  document.documentElement.addEventListener("drop", onDrop);
});

onBeforeUnmount(() => {
  document.documentElement.removeEventListener("dragenter", onDragenter);
  document.documentElement.removeEventListener("dragleave", onDragleave);
  document.documentElement.removeEventListener("dragover", onDragover);
  document.documentElement.removeEventListener("drop", onDrop);
});
</script>
