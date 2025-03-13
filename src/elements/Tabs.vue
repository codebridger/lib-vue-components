<template>
  <div class="tabs-container" :class="containerClass">
    <!-- Tab buttons -->
    <div>
      <ul
        class="flex flex-wrap border-b border-white-light dark:border-[#191e3a]"
      >
        <li v-for="(tab, index) in tabs" :key="index" class="flex-1">
          <a
            href="javascript:"
            class="p-3.5 py-2 -mb-[1px] flex items-center border border-transparent hover:text-primary dark:hover:border-b-black"
            :class="[
              {
                '!border-white-light !border-b-white text-primary dark:!border-[#191e3a] dark:!border-b-black':
                  modelValue === tab.id,
              },
              tab.disabled
                ? 'pointer-events-none text-white-light dark:text-dark'
                : '',
            ]"
            @click="tab.disabled ? null : updateActiveTab(tab.id)"
          >
            <span v-if="tab.icon" class="mr-2">
              <slot :name="`icon-${tab.id}`">
                <component :is="tab.icon" v-if="typeof tab.icon === 'object'" />
              </slot>
            </span>
            {{ tab.label }}
          </a>
        </li>
      </ul>
    </div>

    <!-- Tab content -->
    <div class="pt-5 flex-1 text-sm">
      <template v-for="(tab, index) in tabs" :key="index">
        <div v-show="modelValue === tab.id">
          <slot :name="`content-${tab.id}`">
            {{ tab.content }}
          </slot>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
export interface TabItem {
  id: string;
  label: string;
  icon?: any;
  content?: string;
  disabled?: boolean;
}

interface TabsProps {
  tabs: TabItem[];
  modelValue: string;
  containerClass?: string;
}

const props = withDefaults(defineProps<TabsProps>(), {
  containerClass: "mb-5",
});

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

const updateActiveTab = (tabId: string) => {
  emit("update:modelValue", tabId);
};
</script>
