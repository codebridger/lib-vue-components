<template>
  <div class="flex justify-between items-center px-4 py-3">
    <router-link to="/" class="main-logo flex items-center shrink-0">
      <img
        class="w-8 ml-[5px] flex-none"
        src="/assets/images/logo.svg"
        alt=""
      />
      <span
        class="text-2xl ltr:ml-1.5 rtl:mr-1.5 font-semibold align-middle lg:inline dark:text-white-light"
        >VRISTO</span
      >
    </router-link>
    <a
      href="javascript:;"
      class="collapse-icon w-8 h-8 rounded-full flex items-center hover:bg-gray-500/10 dark:hover:bg-dark-light/10 dark:text-white-light transition duration-300 rtl:rotate-180 hover:text-primary"
      @click="store.toggleSidebar()"
    >
      <icon-carets-down class="m-auto rotate-90" />
    </a>
  </div>

  <perfect-scrollbar
    :options="{
      swipeEasing: true,
      wheelPropagation: false,
    }"
    class="h-[calc(100vh-80px)] relative"
  >
    <ul class="relative font-semibold space-y-0.5 p-4 py-0">
      <template v-for="group of $props.items">
        <!-- Menu Label -->
        <h2
          v-if="group.title"
          class="py-3 px-7 flex items-center uppercase font-extrabold bg-white-light/30 dark:bg-dark dark:bg-opacity-[0.08] -mx-4 mb-1"
        >
          <icon-minus class="w-4 h-5 flex-none hidden" />
          <span>{{ group.title }}</span>
        </h2>

        <!-- Menu Item -->
        <li class="nav-item">
          <ul>
            <li
              v-for="item of group.children"
              :class="[{ menu: item.child?.length }, 'nav-item']"
            >
              <template v-if="item.child?.length">
                <button
                  type="button"
                  class="nav-link group w-full"
                  :class="{ active: activeDropdown === item.title }"
                  @click="
                    activeDropdown === item.title
                      ? (activeDropdown = null)
                      : (activeDropdown = item.title)
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
                      '-rotate-90 rtl:rotate-90': activeDropdown !== item.title,
                    }"
                  >
                    <icon-caret-down />
                  </div>
                </button>

                <!-- Item child - Sub 1 -->
                <Collapse
                  v-if="item.child?.length"
                  :when="activeDropdown === item.title"
                >
                  <ul class="sub-menu text-gray-500">
                    <template v-for="sub1 of item.child">
                      <li v-if="sub1.child?.length">
                        <button
                          type="button"
                          class="w-full before:h-[5px] before:w-[5px] before:rounded before:bg-gray-300 hover:bg-gray-100 ltr:before:mr-2 rtl:before:ml-2 dark:text-[#888ea8] dark:hover:bg-gray-900"
                          @click="
                            subActive === sub1.title
                              ? (subActive = null)
                              : (subActive = sub1.title)
                          "
                        >
                          <span>
                            {{ sub1.title }}
                          </span>
                          <div
                            class="ltr:ml-auto rtl:mr-auto"
                            :class="{
                              'rtl:rotate-90 -rotate-90':
                                subActive !== sub1.title,
                            }"
                          >
                            <icon-carets-down
                              v-if="sub1.child?.length"
                              :fill="true"
                              class="w-4 h-4"
                            />
                          </div>
                        </button>

                        <!-- sub2 -->
                        <Collapse
                          v-if="sub1.child?.length"
                          :when="subActive === sub1.title"
                        >
                          <ul :unmount="false" class="sub-menu text-gray-500">
                            <li v-for="sub2 of sub1.child">
                              <router-link
                                :to="sub2.to!"
                                :target="sub2.target!"
                                @click="toggleMobileMenu"
                              >
                                {{ sub2.title }}
                              </router-link>
                            </li>
                          </ul>
                        </Collapse>
                      </li>

                      <li v-else>
                        <RouterLink :to="sub1.to!" @click="toggleMobileMenu">
                          {{ sub1.title }}
                        </RouterLink>
                      </li>
                    </template>
                  </ul>
                </Collapse>
              </template>

              <template v-if="!item.child?.length">
                <router-link
                  to="/apps/chat"
                  class="group"
                  @click="toggleMobileMenu"
                >
                  <div class="flex items-center">
                    <icon :name="item.icon" />

                    <span
                      class="text-black ltr:pl-3 rtl:pr-3 dark:text-[#506690] dark:group-hover:text-white-dark"
                      >{{ item.title }}</span
                    >
                  </div>
                </router-link>
              </template>
            </li>
          </ul>
        </li>
      </template>
    </ul>
  </perfect-scrollbar>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";

import { useAppStore } from "@/stores/index";
import { Collapse } from "vue-collapsed";

import Icon from "../icon/Icon.vue";

import type { SidebarGroupType, SidebarItemType } from "../types/sidebar.type";

interface SidebarProps {
  items: Array<SidebarGroupType | SidebarItemType>;
}

withDefaults(defineProps<SidebarProps>(), {
  items: [],
});

const store = useAppStore();
const activeDropdown: any = ref("");
const subActive: any = ref("");

onMounted(() => {
  const selector = document.querySelector(
    '.sidebar ul a[href="' + window.location.pathname + '"]'
  );
  if (selector) {
    selector.classList.add("active");
    const ul: any = selector.closest("ul.sub-menu");
    if (ul) {
      let ele: any = ul.closest("li.menu").querySelectorAll(".nav-link") || [];
      if (ele.length) {
        ele = ele[0];
        setTimeout(() => {
          ele.click();
        });
      }
    }
  }
});

const toggleMobileMenu = () => {
  if (window.innerWidth < 1024) {
    store.toggleSidebar();
  }
};
</script>
