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
          <!-- @slot Area for logo and menu icon -->
          <slot name="logo">
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

            <IconButton name="icon-menu" @click="store.toggleSidebar()" />
          </slot>
        </div>

        <div class="min-h-9"></div>

        <div class="flex-1">
          <slot name="bar"></slot>
        </div>
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
import { useRoute } from "vue-router";
import { useAppStore } from "../stores/index";
import IconButton from "../elements/IconButton.vue";

const store = useAppStore();
</script>
