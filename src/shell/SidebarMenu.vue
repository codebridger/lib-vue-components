<template>
  <div class="sidebar">
    <div class="flex items-center justify-between px-4 py-3">
      <span to="/" class="main-logo flex shrink-0 items-center">
        <!-- @slot brand content, title will be removed in this case -->
        <slot name="brand">
          <img
            class="ml-[5px] w-8 flex-none"
            :src="props.brandLogo || '/assets/images/logo.svg'"
            alt="Sidebar Brand logo"
          />

          <span
            class="align-middle text-2xl font-semibold dark:text-white-light lg:inline ltr:ml-1.5 rtl:mr-1.5"
          >
            {{ props.title || "" }}
          </span>
        </slot>
      </span>
      <a
        href="javascript:;"
        class="collapse-icon flex h-8 w-8 items-center rounded-full transition duration-300 hover:bg-gray-500/10 hover:text-primary dark:text-white-light dark:hover:bg-dark-light/10 rtl:rotate-180"
        @click="store.toggleSidebar()"
      >
        <Icon name="icon-carets-down" class="m-auto rotate-90" />
      </a>
    </div>

    <perfect-scrollbar
      :options="{
        swipeEasing: true,
        wheelPropagation: false,
      }"
      class="relative h-[calc(100vh-80px)]"
    >
      <ul class="relative space-y-0.5 p-4 py-0 font-semibold">
        <template v-for="(group, gIndex) of props.items">
          <!-- Menu Label -->
          <h2
            v-if="group.title"
            class="-mx-4 mb-1 flex items-center bg-white-light/30 px-7 py-3 font-extrabold uppercase dark:bg-dark dark:bg-opacity-[0.08]"
          >
            <Icon name="icon-minus" class="hidden h-5 w-4 flex-none" />
            <span>{{ group.title }}</span>
          </h2>

          <!-- Menu Item -->
          <li class="nav-item" v-if="group.children">
            <ul>
              <li
                v-for="(item, itemIndex) of group.children"
                :class="[{ menu: item.child?.length }, 'nav-item']"
              >
                <template v-if="item.child?.length">
                  <button
                    type="button"
                    class="nav-link group w-full"
                    :class="{ active: activeDropdown === item.title }"
                    @click="
                      onMenuItemClick(item, { group: gIndex, item: itemIndex })
                    "
                  >
                    <!-- Item Title -->
                    <div class="flex items-center">
                      <Icon v-if="item.icon" :name="item.icon!" />
                      <span
                        class="text-black dark:text-[#506690] dark:group-hover:text-white-dark ltr:pl-3 rtl:pr-3"
                      >
                        {{ item.title }}
                      </span>
                    </div>

                    <!-- Item child sign -->
                    <div
                      v-if="item.child?.length"
                      :class="{
                        '-rotate-90 rtl:rotate-90':
                          getDDState(gIndex, itemIndex) ||
                          isSubItemIsActive(item),
                      }"
                    >
                      <Icon name="IconCaretDown" />
                    </div>
                  </button>

                  <!-- Item child - Sub 1 -->
                  <Collapse
                    v-if="item.child?.length"
                    :when="
                      getDDState(gIndex, itemIndex) || isSubItemIsActive(item)
                    "
                  >
                    <ul class="sub-menu text-gray-500">
                      <template v-for="(sub1, sub1Index) of item.child">
                        <li v-if="sub1.child?.length">
                          <button
                            type="button"
                            class="w-full before:h-[5px] before:w-[5px] before:rounded before:bg-gray-300 hover:bg-gray-100 dark:text-[#888ea8] dark:hover:bg-gray-900 ltr:before:mr-2 rtl:before:ml-2"
                            :class="{
                              active:
                                subActive === sub1.title ||
                                isSubItemIsActive(item),
                            }"
                            @click="
                              onMenuItemClick(sub1, {
                                group: gIndex,
                                item: itemIndex,
                                sub1: sub1Index,
                              })
                            "
                          >
                            <span>
                              {{ sub1.title }}
                            </span>
                            <div
                              class="ltr:ml-auto rtl:mr-auto"
                              :class="{
                                '-rotate-90 rtl:rotate-90':
                                  getDDState(gIndex, itemIndex, sub1Index) ||
                                  isSubItemIsActive(sub1),
                              }"
                            >
                              <Icon
                                name="icon-carets-down"
                                v-if="sub1.child?.length"
                                :fill="true"
                                class="h-4 w-4"
                              />
                            </div>
                          </button>

                          <!-- sub2 -->
                          <Collapse
                            v-if="sub1.child?.length"
                            :when="
                              getDDState(gIndex, itemIndex, sub1Index) ||
                              isSubItemIsActive(sub1)
                            "
                          >
                            <ul :unmount="false" class="sub-menu text-gray-500">
                              <li v-for="(sub2, sub2Index) of sub1.child">
                                <a
                                  class="cursor-pointer"
                                  :class="{ active: sub2.to === route.path }"
                                  :data-item="sub2.to"
                                  @click="
                                    onMenuItemClick(sub2, {
                                      group: gIndex,
                                      item: itemIndex,
                                      sub1: sub1Index,
                                    })
                                  "
                                >
                                  {{ sub2.title }}
                                </a>
                              </li>
                            </ul>
                          </Collapse>
                        </li>

                        <li v-else>
                          <a
                            class="cursor-pointer"
                            :class="{ active: subActive === sub1.title }"
                            :data-item="sub1.to"
                            @click="
                              onMenuItemClick(sub1, {
                                group: gIndex,
                                item: itemIndex,
                                sub1: sub1Index,
                              })
                            "
                          >
                            {{ sub1.title }}
                          </a>
                        </li>
                      </template>
                    </ul>
                  </Collapse>
                </template>

                <template v-if="!item.child?.length">
                  <a
                    class="group cursor-pointer"
                    :class="{ active: activeDropdown === item.title }"
                    :data-item="item.to"
                    @click="
                      onMenuItemClick(item, { group: 0, item: itemIndex })
                    "
                  >
                    <div class="flex items-center">
                      <icon v-if="item.icon" :name="item.icon" />
                      <span
                        class="text-black dark:text-[#506690] dark:group-hover:text-white-dark ltr:pl-3 rtl:pr-3"
                      >
                        {{ item.title }}
                      </span>
                    </div>
                  </a>
                </template>
              </li>
            </ul>
          </li>
        </template>
      </ul>
    </perfect-scrollbar>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import { useAppStore } from "../stores/index";
import { Collapse } from "vue-collapsed";

import Icon from "../icon/Icon.vue";

import type { SidebarGroupType, SidebarItemType } from "../types/sidebar.type";

interface SidebarProps {
  /** Sidebar title */
  title?: string;
  /** Sidebar logo URL */
  brandLogo?: string;
  /** Sidebar items */
  items: Array<SidebarGroupType>;
}

const props = defineProps<SidebarProps>();

const emit = defineEmits<{
  /** Emit when the sidebar item is clicked */
  ItemClick: [value: SidebarItemType];
}>();

const store = useAppStore();
const groupDropdown: any = ref("");
const activeDropdown: any = ref("");
const subActive: any = ref("");
const route = useRoute();

const dropdownState = ref<Map<string, boolean>>(new Map());

onMounted(() => {
  markActiveItem();
});

watch(
  () => route.path,
  () => {
    markActiveItem();
  }
);

const toggleMobileMenu = () => {
  if (window.innerWidth < 1024) {
    store.toggleSidebar();
  }
};

function markActiveItem() {
  const activePath = route.path;

  // Initialize indices for active group, item, and sub-item
  let activeGroupIndex = -1;
  let activeItemIndex = -1;
  let activeSub1Index = -1;

  // Iterate through groups to find the active group and item
  for (let gIndex = 0; gIndex < props.items.length; gIndex++) {
    const group = props.items[gIndex];
    if (group.children) {
      for (let itemIndex = 0; itemIndex < group.children.length; itemIndex++) {
        const item = group.children[itemIndex];
        if (item.to === activePath) {
          activeGroupIndex = gIndex;
          activeItemIndex = itemIndex;
          break;
        }

        // Check for sub-items (level 1)
        if (item.child) {
          for (let sub1Index = 0; sub1Index < item.child.length; sub1Index++) {
            const sub1 = item.child[sub1Index];
            if (sub1.to === activePath) {
              activeGroupIndex = gIndex;
              activeItemIndex = itemIndex;
              activeSub1Index = sub1Index;
              break;
            }

            // Check for sub-items (level 2)
            if (sub1.child) {
              for (const sub2 of sub1.child) {
                if (sub2.to === activePath) {
                  activeGroupIndex = gIndex;
                  activeItemIndex = itemIndex;
                  activeSub1Index = sub1Index;
                  break;
                }
              }
            }
          }
        }
      }
    }
  }

  // Set the dropdown values for the active item
  if (activeGroupIndex >= 0) {
    groupDropdown.value = props.items[activeGroupIndex].title;

    if (activeItemIndex >= 0) {
      activeDropdown.value =
        props.items[activeGroupIndex].children![activeItemIndex].title;

      if (activeSub1Index >= 0) {
        subActive.value =
          props.items[activeGroupIndex].children![activeItemIndex].child![
            activeSub1Index
          ].title;
      }
    }
  }

  // Close other group dropdowns except the active one
  dropdownState.value.forEach((_, key) => {
    if (key.startsWith(`${activeGroupIndex}-`)) {
      return;
    }

    dropdownState.value.set(key, false);
  });

  // Close other item dropdowns except the active one
  dropdownState.value.forEach((_, key) => {
    if (key.startsWith(`${activeGroupIndex}-${activeItemIndex}-`)) {
      return;
    }

    dropdownState.value.set(key, false);
  });

  // Close other sub1 dropdowns except the active one
  dropdownState.value.forEach((_, key) => {
    if (
      key.startsWith(
        `${activeGroupIndex}-${activeItemIndex}-${activeSub1Index}-`
      )
    ) {
      return;
    }

    dropdownState.value.set(key, false);
  });
}

function getDDId(group: number, item?: number, sub1?: number) {
  return `${group}-${item}-${sub1}`;
}

function getDDState(group: number, item?: number, sub1?: number) {
  return dropdownState.value.get(getDDId(group, item, sub1)) || false;
}

function onMenuItemClick(
  item: SidebarItemType,
  indexes: { group: number; item?: number; sub1?: number }
) {
  toggleMobileMenu();

  // prevent dropdown
  const ddId = getDDId(indexes.group, indexes.item, indexes.sub1);
  const previousState = dropdownState.value.get(ddId) || false;

  // toggle the current dropdown
  dropdownState.value.set(ddId, !previousState);

  emit("ItemClick", item);
}

function isSubItemIsActive(item: SidebarItemType): boolean {
  if (item.to === route.path) {
    return true;
  }

  let isActive = false;

  for (const sub of item.child || []) {
    if (sub.to === route.path) {
      isActive = true;
      break;
    }

    for (const sub2 of sub.child || []) {
      if (sub2.to === route.path) {
        isActive = true;
        break;
      }
    }
  }

  return isActive;
}
</script>
