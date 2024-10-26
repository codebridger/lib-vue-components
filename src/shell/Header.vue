<template>
  <header
    class="z-40"
    :class="[{ dark: store.semidark && store.menu === 'horizontal' }]"
  >
    <div class="shadow-sm">
      <div
        class="relative bg-white flex w-full items-center px-5 py-2.5 dark:bg-[#0e1726]"
      >
        <div
          class="horizontal-logo flex lg:hidden justify-between items-center ltr:mr-2 rtl:ml-2 min-h-8"
        >
          <router-link to="/" class="main-logo flex items-center shrink-0">
            <img
              class="w-8 ltr:-ml-1 rtl:-mr-1 inline"
              src="/assets/images/logo.svg"
              alt=""
            />
            <span
              class="text-2xl ltr:ml-1.5 rtl:mr-1.5 font-semibold align-middle hidden md:inline dark:text-white-light transition-all duration-300"
              >VRISTO</span
            >
          </router-link>

          <a
            href="javascript:;"
            class="collapse-icon flex-none dark:text-[#d0d2d6] hover:text-primary dark:hover:text-primary flex lg:hidden ltr:ml-2 rtl:mr-2 p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:bg-white-light/90 dark:hover:bg-dark/60"
            @click="store.toggleSidebar()"
          >
            <Icon name="IconMenu" class="w-5 h-5" />
          </a>
        </div>

        <div class="min-h-9"></div>
        <slot></slot>
      </div>

      <!-- horizontal menu -->
      <div class="horizontal-menu hidden">
        <slot name="horizontal-menu">
          <h1>Horizontal Menu</h1>
        </slot>
      </div>
    </div>
  </header>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed, reactive, watch } from "vue";

import Icon from "../icon/Icon.vue";

import { useRoute } from "vue-router";
import { useAppStore } from "../stores/index";

const store = useAppStore();
const route = useRoute();
</script>
