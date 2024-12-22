<template>
  <ul
    class="horizontal-menu py-1.5 font-semibold px-6 lg:space-x-1.5 xl:space-x-8 rtl:space-x-reverse bg-white border-t border-[#ebedf2] dark:border-[#191e3a] dark:bg-[#0e1726] text-black dark:text-white-dark"
  >
    <!-- Root Item -->
    <li
      v-for="(item, index) in items"
      :key="index"
      class="menu nav-item relative"
    >
      <a href="javascript:;" class="nav-link">
        <div class="flex items-center">
          <Icon v-if="item.icon" :name="item.icon" class="shrink-0" />
          <span class="px-2">{{ item.title }}</span>
        </div>
        <div class="right_arrow" v-if="item.children?.length">
          <Icon name="IconMenuTables" />
        </div>
      </a>

      <!-- First level menu -->
      <ul v-if="item.children?.length" class="sub-menu">
        <li
          v-for="(child, childIndex) in item.children"
          :key="childIndex"
          :class="[{ relative: child.child?.length }, 'cursor-pointer']"
          @click="child.child?.length ? onMenuItemClick(child) : null"
        >
          <template v-if="child.child?.length">
            <!-- Items with second level -->
            <a href="javascript:;">
              {{ child.title }}
              <div class="ltr:ml-auto rtl:mr-auto rtl:rotate-90 -rotate-90">
                <Icon name="IconMenuTables" />
              </div>
            </a>
            <!-- Second level menu -->
            <ul
              class="rounded absolute top-0 ltr:left-[95%] rtl:right-[95%] min-w-[180px] bg-white z-[10] text-dark dark:text-white-dark dark:bg-[#1b2e4b] shadow p-0 py-2 hidden"
            >
              <li
                v-for="(subChild, subChildIndex) in child.child"
                :key="subChildIndex"
                @click="onMenuItemClick(subChild)"
                class="cursor-pointer"
              >
                <a>
                  {{ subChild.title }}
                </a>
              </li>
            </ul>
          </template>
          <!-- Items without second level -->
          <a v-else>
            {{ child.title }}
          </a>
        </li>
      </ul>
    </li>
  </ul>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed, reactive, watch } from "vue";

import { useRoute } from "vue-router";

import Icon from "../icon/Icon.vue";

import {
  HorizontalMenuGroupType,
  HorizontalMenuItemType,
} from "../types/horizontal-menu.type";

interface SidebarProps {
  /** Sidebar items */
  items: Array<HorizontalMenuGroupType>;
}

const props = defineProps<SidebarProps>();

const emit = defineEmits<{
  /** Emit when the sidebar item is clicked */
  (e: "ItemClick", item: HorizontalMenuItemType): void;
}>();

const route = useRoute();

onMounted(() => {
  setActiveDropdown();
});

watch(route, (to, from) => {
  setActiveDropdown();
});

function onMenuItemClick(item: HorizontalMenuItemType) {
  emit("ItemClick", item);
}

const setActiveDropdown = () => {
  const selector = document.querySelector(
    'ul.horizontal-menu a[href="' + window.location.pathname + '"]'
  );
  if (selector) {
    selector.classList.add("active");
    const all: any = document.querySelectorAll(
      "ul.horizontal-menu .nav-link.active"
    );
    for (let i = 0; i < all.length; i++) {
      all[0]?.classList.remove("active");
    }
    const ul: any = selector.closest("ul.sub-menu");
    if (ul) {
      let ele: any = ul.closest("li.menu").querySelectorAll(".nav-link");
      if (ele) {
        ele = ele[0];
        setTimeout(() => {
          ele?.classList.add("active");
        });
      }
    }
  }
};
</script>
