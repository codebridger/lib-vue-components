<template>
  <!--  BEGIN MAIN CONTAINER  -->
  <div class="relative">
    <!-- sidebar menu overlay -->
    <div
      class="fixed inset-0 bg-[black]/60 z-50 lg:hidden"
      :class="{ hidden: !store.sidebar }"
      @click="store.toggleSidebar()"
    />

    <!-- screen loader -->
    <div
      v-show="store.isShowMainLoader"
      class="screen_loader fixed inset-0 bg-[#fafafa] dark:bg-[#060818] z-[60] grid place-content-center animate__animated"
    >
      <svg
        width="64"
        height="64"
        viewBox="0 0 135 135"
        xmlns="http://www.w3.org/2000/svg"
        fill="#4361ee"
      >
        <path
          d="M67.447 58c5.523 0 10-4.477 10-10s-4.477-10-10-10-10 4.477-10 10 4.477 10 10 10zm9.448 9.447c0 5.523 4.477 10 10 10 5.522 0 10-4.477 10-10s-4.478-10-10-10c-5.523 0-10 4.477-10 10zm-9.448 9.448c-5.523 0-10 4.477-10 10 0 5.522 4.477 10 10 10s10-4.478 10-10c0-5.523-4.477-10-10-10zM58 67.447c0-5.523-4.477-10-10-10s-10 4.477-10 10 4.477 10 10 10 10-4.477 10-10z"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 67 67"
            to="-360 67 67"
            dur="2.5s"
            repeatCount="indefinite"
          />
        </path>
        <path
          d="M28.19 40.31c6.627 0 12-5.374 12-12 0-6.628-5.373-12-12-12-6.628 0-12 5.372-12 12 0 6.626 5.372 12 12 12zm30.72-19.825c4.686 4.687 12.284 4.687 16.97 0 4.686-4.686 4.686-12.284 0-16.97-4.686-4.687-12.284-4.687-16.97 0-4.687 4.686-4.687 12.284 0 16.97zm35.74 7.705c0 6.627 5.37 12 12 12 6.626 0 12-5.373 12-12 0-6.628-5.374-12-12-12-6.63 0-12 5.372-12 12zm19.822 30.72c-4.686 4.686-4.686 12.284 0 16.97 4.687 4.686 12.285 4.686 16.97 0 4.687-4.686 4.687-12.284 0-16.97-4.685-4.687-12.283-4.687-16.97 0zm-7.704 35.74c-6.627 0-12 5.37-12 12 0 6.626 5.373 12 12 12s12-5.374 12-12c0-6.63-5.373-12-12-12zm-30.72 19.822c-4.686-4.686-12.284-4.686-16.97 0-4.686 4.687-4.686 12.285 0 16.97 4.686 4.687 12.284 4.687 16.97 0 4.687-4.685 4.687-12.283 0-16.97zm-35.74-7.704c0-6.627-5.372-12-12-12-6.626 0-12 5.373-12 12s5.374 12 12 12c6.628 0 12-5.373 12-12zm-19.823-30.72c4.687-4.686 4.687-12.284 0-16.97-4.686-4.686-12.284-4.686-16.97 0-4.687 4.686-4.687 12.284 0 16.97 4.686 4.687 12.284 4.687 16.97 0z"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 67 67"
            to="360 67 67"
            dur="8s"
            repeatCount="indefinite"
          />
        </path>
      </svg>
    </div>

    <div class="fixed bottom-6 ltr:right-6 rtl:left-6 z-50">
      <template v-if="showTopButton">
        <button
          type="button"
          class="btn btn-outline-primary rounded-full p-2 animate-pulse bg-[#fafafa] dark:bg-[#060818] dark:hover:bg-primary"
          @click="goToTop"
        >
          <svg
            width="24"
            height="24"
            class="h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              opacity="0.5"
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M12 20.75C12.4142 20.75 12.75 20.4142 12.75 20L12.75 10.75L11.25 10.75L11.25 20C11.25 20.4142 11.5858 20.75 12 20.75Z"
              fill="currentColor"
            />
            <path
              d="M6.00002 10.75C5.69667 10.75 5.4232 10.5673 5.30711 10.287C5.19103 10.0068 5.25519 9.68417 5.46969 9.46967L11.4697 3.46967C11.6103 3.32902 11.8011 3.25 12 3.25C12.1989 3.25 12.3897 3.32902 12.5304 3.46967L18.5304 9.46967C18.7449 9.68417 18.809 10.0068 18.6929 10.287C18.5768 10.5673 18.3034 10.75 18 10.75L6.00002 10.75Z"
              fill="currentColor"
            />
          </svg>
        </button>
      </template>
    </div>

    <div
      class="main-container text-black dark:text-white-dark min-h-screen"
      :class="[store.navbar]"
    >
      <!--  BEGIN SIDEBAR  -->
      <div :class="{ 'dark text-white-dark': store.semidark }">
        <nav
          class="sidebar fixed min-h-screen h-full top-0 bottom-0 w-[260px] shadow-[5px_0_25px_0_rgba(94,92,154,0.1)] z-50 transition-all duration-300"
        >
          <div class="bg-white dark:bg-[#0e1726] h-full">
            <!-- @slot Area for sidebar menu -->
            <slot name="sidebar-menu" :closeSidebar="closeSidebar">
              <!-- <Sidebar /> -->
            </slot>
          </div>
        </nav>
      </div>

      <!--  END SIDEBAR  -->

      <div class="main-content flex flex-col min-h-screen">
        <!--  BEGIN TOP NAVBAR  -->
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
                <slot name="brand">
                  <a>
                    <img
                      class="w-8 ltr:-ml-1 rtl:-mr-1 inline"
                      src="/assets/images/logo.svg"
                      alt=""
                    />
                    <span
                      class="text-2xl ltr:ml-1.5 rtl:mr-1.5 font-semibold align-middle hidden md:inline dark:text-white-light transition-all duration-300"
                      >{{ props.brandTitle }}</span
                    >
                  </a>

                  <IconButton
                    class="collapse-icon"
                    icon="icon-menu"
                    rounded="full"
                    size="sm"
                    @click="store.toggleSidebar()"
                  />
                </slot>
              </div>

              <div class="min-h-9"></div>

              <div class="flex-1">
                <slot name="header" />
              </div>
            </div>

            <!-- horizontal menu -->
            <div class="horizontal-menu-slot hidden">
              <!-- @slot Area on the header right below of the header, for horizontal menu -->
              <slot name="horizontal-menu" />
            </div>
          </div>
        </header>
        <!--  END TOP NAVBAR  -->

        <!--  BEGIN CONTENT AREA  -->
        <div class="p-6 animation flex-1">
          <!-- @slot Area for main content, including your routes and pages -->
          <slot name="content" />
        </div>
        <!--  END CONTENT AREA  -->

        <!-- BEGIN FOOTER -->
        <div>
          <!-- @slot Area for footer, right below of the content -->
          <slot name="footer" />
        </div>
        <!-- END FOOTER -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * DashboardShell
 * DashboardShell component
 */

import { ref, onMounted, watch } from "vue";
import IconButton from "../elements/IconButton.vue";

import appSetting from "../app-setting";

import { useAppStore } from "../stores/index";
const store = useAppStore();
const showTopButton = ref(false);

interface DashboardShellProps {
  // Menu style
  menuStyle?: "vertical" | "horizontal" | "collapsible-vertical";
  // Brand title of the dashboard
  brandTitle: string;
  // Loading state of the dashboard
  loading?: boolean;
}

// defineSlots<{
//   brand(): any;
//   "header"(): any;
//   "horizontal-menu"(): any;
//   "sidebar-menu"(props: { closeSidebar: () => void }): any;
//   content(): any;
//   footer(): any;
// }>();

const props = withDefaults(defineProps<DashboardShellProps>(), {
  menuStyle: "vertical",
});

onMounted(() => {
  if (typeof window !== "undefined") {
    init();
  }
});

function init() {
  window.onscroll = () => {
    if (
      document.body.scrollTop > 50 ||
      document.documentElement.scrollTop > 50
    ) {
      showTopButton.value = true;
    } else {
      showTopButton.value = false;
    }
  };

  const eleanimation: any = document.querySelector(".animation");

  eleanimation.addEventListener("animationend", function () {
    appSetting.changeAnimation("remove");
  });

  store.toggleMainLoader();
}

watch(
  () => props.loading,
  (value) => {
    store.toggleMainLoader(value);
  },
  { immediate: true }
);

watch(
  () => props.menuStyle,
  (value) => {
    console.log(value);

    store.toggleMenuStyle(value);
  },
  { immediate: true }
);

const goToTop = () => {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
};

function closeSidebar() {
  store.toggleSidebar(false);
}
</script>
