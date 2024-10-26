<template>
  <ul
    class="horizontal-menu py-1.5 font-semibold px-6 lg:space-x-1.5 xl:space-x-8 rtl:space-x-reverse bg-white border-t border-[#ebedf2] dark:border-[#191e3a] dark:bg-[#0e1726] text-black dark:text-white-dark"
  >
    <li class="menu nav-item relative">
      <a href="javascript:;" class="nav-link">
        <div class="flex items-center">
          <icon-menu-dashboard class="shrink-0" />

          <span class="px-2">{{ $t("dashboard") }}</span>
        </div>
        <div class="right_arrow">
          <icon-caret-down />
        </div>
      </a>
      <ul class="sub-menu">
        <li>
          <router-link to="/">{{ $t("sales") }}</router-link>
        </li>
        <li>
          <router-link to="/analytics">{{ $t("analytics") }}</router-link>
        </li>
        <li>
          <router-link to="/finance">{{ $t("finance") }}</router-link>
        </li>
        <li>
          <router-link to="/crypto">{{ $t("crypto") }}</router-link>
        </li>
      </ul>
    </li>
    <li class="menu nav-item relative">
      <a href="javascript:;" class="nav-link">
        <div class="flex items-center">
          <icon-menu-apps class="shrink-0" />

          <span class="px-2">{{ $t("apps") }}</span>
        </div>
        <div class="right_arrow">
          <icon-caret-down />
        </div>
      </a>
      <ul class="sub-menu">
        <li>
          <router-link to="/apps/chat">{{ $t("chat") }}</router-link>
        </li>
        <li>
          <router-link to="/apps/mailbox">{{ $t("mailbox") }}</router-link>
        </li>
        <li>
          <router-link to="/apps/todolist">{{ $t("todo_list") }}</router-link>
        </li>
        <li>
          <router-link to="/apps/notes">{{ $t("notes") }}</router-link>
        </li>
        <li>
          <router-link to="/apps/scrumboard">{{
            $t("scrumboard")
          }}</router-link>
        </li>
        <li>
          <router-link to="/apps/contacts">{{ $t("contacts") }}</router-link>
        </li>
        <li class="relative">
          <a href="javascript:;"
            >{{ $t("invoice") }}
            <div class="ltr:ml-auto rtl:mr-auto rtl:rotate-90 -rotate-90">
              <icon-caret-down />
            </div>
          </a>
          <ul
            class="rounded absolute top-0 ltr:left-[95%] rtl:right-[95%] min-w-[180px] bg-white z-[10] text-dark dark:text-white-dark dark:bg-[#1b2e4b] shadow p-0 py-2 hidden"
          >
            <li>
              <router-link to="/apps/invoice/list">{{
                $t("list")
              }}</router-link>
            </li>
            <li>
              <router-link to="/apps/invoice/preview">{{
                $t("preview")
              }}</router-link>
            </li>
            <li>
              <router-link to="/apps/invoice/add">{{ $t("add") }}</router-link>
            </li>
            <li>
              <router-link to="/apps/invoice/edit">{{
                $t("edit")
              }}</router-link>
            </li>
          </ul>
        </li>
        <li>
          <router-link to="/apps/calendar">{{ $t("calendar") }}</router-link>
        </li>
      </ul>
    </li>
    <li class="menu nav-item relative">
      <a href="javascript:;" class="nav-link">
        <div class="flex items-center">
          <icon-menu-components class="shrink-0" />
          <span class="px-2">{{ $t("components") }}</span>
        </div>
        <div class="right_arrow">
          <icon-caret-down />
        </div>
      </a>
      <ul class="sub-menu">
        <li>
          <router-link to="/components/tabs">{{ $t("tabs") }}</router-link>
        </li>
        <li>
          <router-link to="/components/accordions">{{
            $t("accordions")
          }}</router-link>
        </li>
        <li>
          <router-link to="/components/modals">{{ $t("modals") }}</router-link>
        </li>
        <li>
          <router-link to="/components/cards">{{ $t("cards") }}</router-link>
        </li>
        <li>
          <router-link to="/components/carousel">{{
            $t("carousel")
          }}</router-link>
        </li>
        <li>
          <router-link to="/components/countdown">{{
            $t("countdown")
          }}</router-link>
        </li>
        <li>
          <router-link to="/components/counter">{{
            $t("counter")
          }}</router-link>
        </li>
        <li>
          <router-link to="/components/sweetalert">{{
            $t("sweet_alerts")
          }}</router-link>
        </li>
        <li>
          <router-link to="/components/timeline">{{
            $t("timeline")
          }}</router-link>
        </li>
        <li>
          <router-link to="/components/notifications">{{
            $t("notifications")
          }}</router-link>
        </li>
        <li>
          <router-link to="/components/media-object">{{
            $t("media_object")
          }}</router-link>
        </li>
        <li>
          <router-link to="/components/list-group">{{
            $t("list_group")
          }}</router-link>
        </li>
        <li>
          <router-link to="/components/pricing-table">{{
            $t("pricing_tables")
          }}</router-link>
        </li>
        <li>
          <router-link to="/components/lightbox">{{
            $t("lightbox")
          }}</router-link>
        </li>
      </ul>
    </li>
    <li class="menu nav-item relative">
      <a href="javascript:;" class="nav-link">
        <div class="flex items-center">
          <icon-menu-elements class="shrink-0" />
          <span class="px-2">{{ $t("elements") }}</span>
        </div>
        <div class="right_arrow">
          <icon-caret-down />
        </div>
      </a>
      <ul class="sub-menu">
        <li>
          <router-link to="/elements/alerts">{{ $t("alerts") }}</router-link>
        </li>
        <li>
          <router-link to="/elements/avatar">{{ $t("avatar") }}</router-link>
        </li>
        <li>
          <router-link to="/elements/badges">{{ $t("badges") }}</router-link>
        </li>
        <li>
          <router-link to="/elements/breadcrumbs">{{
            $t("breadcrumbs")
          }}</router-link>
        </li>
        <li>
          <router-link to="/elements/buttons">{{ $t("buttons") }}</router-link>
        </li>
        <li>
          <router-link to="/elements/buttons-group">{{
            $t("button_groups")
          }}</router-link>
        </li>
        <li>
          <router-link to="/elements/color-library">{{
            $t("color_library")
          }}</router-link>
        </li>
        <li>
          <router-link to="/elements/dropdown">{{
            $t("dropdown")
          }}</router-link>
        </li>
        <li>
          <router-link to="/elements/infobox">{{ $t("infobox") }}</router-link>
        </li>
        <li>
          <router-link to="/elements/jumbotron">{{
            $t("jumbotron")
          }}</router-link>
        </li>
        <li>
          <router-link to="/elements/loader">{{ $t("loader") }}</router-link>
        </li>
        <li>
          <router-link to="/elements/pagination">{{
            $t("pagination")
          }}</router-link>
        </li>
        <li>
          <router-link to="/elements/popovers">{{
            $t("popovers")
          }}</router-link>
        </li>
        <li>
          <router-link to="/elements/progress-bar">{{
            $t("progress_bar")
          }}</router-link>
        </li>
        <li>
          <router-link to="/elements/search">{{ $t("search") }}</router-link>
        </li>
        <li>
          <router-link to="/elements/tooltips">{{
            $t("tooltips")
          }}</router-link>
        </li>
        <li>
          <router-link to="/elements/treeview">{{
            $t("treeview")
          }}</router-link>
        </li>
        <li>
          <router-link to="/elements/typography">{{
            $t("typography")
          }}</router-link>
        </li>
      </ul>
    </li>
    <li class="menu nav-item relative">
      <a href="javascript:;" class="nav-link">
        <div class="flex items-center">
          <icon-menu-datatables class="shrink-0" />
          <span class="px-2">{{ $t("tables") }}</span>
        </div>
        <div class="right_arrow">
          <icon-caret-down />
        </div>
      </a>
      <ul class="sub-menu">
        <li>
          <router-link to="/tables">{{ $t("tables") }}</router-link>
        </li>
        <li class="relative">
          <a href="javascript:;"
            >{{ $t("datatables") }}
            <div class="ltr:ml-auto rtl:mr-auto rtl:rotate-90 -rotate-90">
              <icon-caret-down />
            </div>
          </a>
          <ul
            class="rounded absolute top-0 ltr:left-[95%] rtl:right-[95%] min-w-[180px] bg-white z-[10] text-dark dark:text-white-dark dark:bg-[#1b2e4b] shadow p-0 py-2 hidden"
          >
            <li>
              <router-link to="/datatables/basic">{{
                $t("basic")
              }}</router-link>
            </li>
            <li>
              <router-link to="/datatables/advanced">{{
                $t("advanced")
              }}</router-link>
            </li>
            <li>
              <router-link to="/datatables/skin">{{ $t("skin") }}</router-link>
            </li>
            <li>
              <router-link to="/datatables/order-sorting">{{
                $t("order_sorting")
              }}</router-link>
            </li>
            <li>
              <router-link to="/datatables/columns-filter">{{
                $t("columns_filter")
              }}</router-link>
            </li>
            <li>
              <router-link to="/datatables/multi-column">{{
                $t("multi_column")
              }}</router-link>
            </li>
            <li>
              <router-link to="/datatables/multiple-tables">{{
                $t("multiple_tables")
              }}</router-link>
            </li>
            <li>
              <router-link to="/datatables/alt-pagination">{{
                $t("alt_pagination")
              }}</router-link>
            </li>
            <li>
              <router-link to="/datatables/checkbox">{{
                $t("checkbox")
              }}</router-link>
            </li>
            <li>
              <router-link to="/datatables/range-search">{{
                $t("range_search")
              }}</router-link>
            </li>
            <li>
              <router-link to="/datatables/export">{{
                $t("export")
              }}</router-link>
            </li>
            <li>
              <router-link to="/datatables/sticky-header">{{
                $t("sticky_header")
              }}</router-link>
            </li>
            <li>
              <router-link to="/datatables/clone-header">{{
                $t("clone_header")
              }}</router-link>
            </li>
            <li>
              <router-link to="/datatables/column-chooser">{{
                $t("column_chooser")
              }}</router-link>
            </li>
          </ul>
        </li>
      </ul>
    </li>
    <li class="menu nav-item relative">
      <a href="javascript:;" class="nav-link">
        <div class="flex items-center">
          <icon-menu-forms class="shrink-0" />
          <span class="px-2">{{ $t("forms") }}</span>
        </div>
        <div class="right_arrow">
          <icon-caret-down />
        </div>
      </a>
      <ul class="sub-menu">
        <li>
          <router-link to="/forms/basic">{{ $t("basic") }}</router-link>
        </li>
        <li>
          <router-link to="/forms/input-group">{{
            $t("input_group")
          }}</router-link>
        </li>
        <li>
          <router-link to="/forms/layouts">{{ $t("layouts") }}</router-link>
        </li>
        <li>
          <router-link to="/forms/validation">{{
            $t("validation")
          }}</router-link>
        </li>
        <li>
          <router-link to="/forms/input-mask">{{
            $t("input_mask")
          }}</router-link>
        </li>
        <li>
          <router-link to="/forms/select2">{{ $t("select2") }}</router-link>
        </li>
        <li>
          <router-link to="/forms/touchspin">{{ $t("touchspin") }}</router-link>
        </li>
        <li>
          <router-link to="/forms/checkbox-radio">{{
            $t("checkbox_and_radio")
          }}</router-link>
        </li>
        <li>
          <router-link to="/forms/switches">{{ $t("switches") }}</router-link>
        </li>
        <li>
          <router-link to="/forms/wizards">{{ $t("wizards") }}</router-link>
        </li>
        <li>
          <router-link to="/forms/file-upload">{{
            $t("file_upload")
          }}</router-link>
        </li>
        <li>
          <router-link to="/forms/quill-editor">{{
            $t("quill_editor")
          }}</router-link>
        </li>
        <li>
          <router-link to="/forms/markdown-editor">{{
            $t("markdown_editor")
          }}</router-link>
        </li>
        <li>
          <router-link to="/forms/date-picker">{{
            $t("date_and_range_picker")
          }}</router-link>
        </li>
        <li>
          <router-link to="/forms/clipboard">{{ $t("clipboard") }}</router-link>
        </li>
      </ul>
    </li>
    <li class="menu nav-item relative">
      <a href="javascript:;" class="nav-link">
        <div class="flex items-center">
          <icon-menu-pages class="shrink-0" />
          <span class="px-2">{{ $t("pages") }}</span>
        </div>
        <div class="right_arrow">
          <icon-caret-down />
        </div>
      </a>
      <ul class="sub-menu">
        <li class="relative">
          <a href="javascript:;"
            >{{ $t("users") }}
            <div class="ltr:ml-auto rtl:mr-auto rtl:rotate-90 -rotate-90">
              <icon-caret-down />
            </div>
          </a>
          <ul
            class="rounded absolute top-0 ltr:left-[95%] rtl:right-[95%] min-w-[180px] bg-white z-[10] text-dark dark:text-white-dark dark:bg-[#1b2e4b] shadow p-0 py-2 hidden"
          >
            <li>
              <router-link to="/users/profile">{{ $t("profile") }}</router-link>
            </li>
            <li>
              <router-link to="/users/user-account-settings">{{
                $t("account_settings")
              }}</router-link>
            </li>
          </ul>
        </li>
        <li>
          <router-link to="/pages/knowledge-base">{{
            $t("knowledge_base")
          }}</router-link>
        </li>
        <li>
          <router-link to="/pages/contact-us-boxed" target="_blank">{{
            $t("contact_us_boxed")
          }}</router-link>
        </li>
        <li>
          <router-link to="/pages/contact-us-cover" target="_blank">{{
            $t("contact_us_cover")
          }}</router-link>
        </li>
        <li>
          <router-link to="/pages/faq">FAQ</router-link>
        </li>
        <li>
          <router-link to="/pages/coming-soon-boxed" target="_blank">{{
            $t("coming_soon_boxed")
          }}</router-link>
        </li>
        <li>
          <router-link to="/pages/coming-soon-cover" target="_blank">{{
            $t("coming_soon_cover")
          }}</router-link>
        </li>
        <li>
          <router-link to="/pages/maintenence" target="_blank">{{
            $t("maintenence")
          }}</router-link>
        </li>
        <li class="relative">
          <a href="javascript:;"
            >{{ $t("error") }}
            <div class="ltr:ml-auto rtl:mr-auto rtl:rotate-90 -rotate-90">
              <icon-caret-down />
            </div>
          </a>
          <ul
            class="rounded absolute top-0 ltr:left-[95%] rtl:right-[95%] min-w-[180px] bg-white z-[10] text-dark dark:text-white-dark dark:bg-[#1b2e4b] shadow p-0 py-2 hidden"
          >
            <li>
              <router-link to="/pages/error404" target="_blank">{{
                $t("404")
              }}</router-link>
            </li>
            <li>
              <router-link to="/pages/error500" target="_blank">{{
                $t("500")
              }}</router-link>
            </li>
            <li>
              <router-link to="/pages/error503" target="_blank">{{
                $t("503")
              }}</router-link>
            </li>
          </ul>
        </li>
        <li class="relative">
          <a href="javascript:;"
            >{{ $t("login") }}
            <div class="ltr:ml-auto rtl:mr-auto rtl:rotate-90 -rotate-90">
              <icon-caret-down />
            </div>
          </a>
          <ul
            class="rounded absolute top-0 ltr:left-[95%] rtl:right-[95%] min-w-[180px] bg-white z-[10] text-dark dark:text-white-dark dark:bg-[#1b2e4b] shadow p-0 py-2 hidden"
          >
            <li>
              <router-link to="/auth/cover-login" target="_blank">{{
                $t("login_cover")
              }}</router-link>
            </li>
            <li>
              <router-link to="/auth/boxed-signin" target="_blank">{{
                $t("login_boxed")
              }}</router-link>
            </li>
          </ul>
        </li>
        <li class="relative">
          <a href="javascript:;"
            >{{ $t("register") }}
            <div class="ltr:ml-auto rtl:mr-auto rtl:rotate-90 -rotate-90">
              <icon-caret-down />
            </div>
          </a>
          <ul
            class="rounded absolute top-0 ltr:left-[95%] rtl:right-[95%] min-w-[180px] bg-white z-[10] text-dark dark:text-white-dark dark:bg-[#1b2e4b] shadow p-0 py-2 hidden"
          >
            <li>
              <router-link to="/auth/cover-register" target="_blank">{{
                $t("register_cover")
              }}</router-link>
            </li>
            <li>
              <router-link to="/auth/boxed-signup" target="_blank">{{
                $t("register_boxed")
              }}</router-link>
            </li>
          </ul>
        </li>
        <li class="relative">
          <a href="javascript:;"
            >{{ $t("password_recovery") }}
            <div class="ltr:ml-auto rtl:mr-auto rtl:rotate-90 -rotate-90">
              <icon-caret-down />
            </div>
          </a>
          <ul
            class="rounded absolute top-0 ltr:left-[95%] rtl:right-[95%] min-w-[180px] bg-white z-[10] text-dark dark:text-white-dark dark:bg-[#1b2e4b] shadow p-0 py-2 hidden"
          >
            <li>
              <router-link to="/auth/cover-password-reset" target="_blank">{{
                $t("recover_id_cover")
              }}</router-link>
            </li>
            <li>
              <router-link to="/auth/boxed-password-reset" target="_blank">{{
                $t("recover_id_boxed")
              }}</router-link>
            </li>
          </ul>
        </li>
        <li class="relative">
          <a href="javascript:;"
            >{{ $t("lockscreen") }}
            <div class="ltr:ml-auto rtl:mr-auto rtl:rotate-90 -rotate-90">
              <icon-caret-down />
            </div>
          </a>
          <ul
            class="rounded absolute top-0 ltr:left-[95%] rtl:right-[95%] min-w-[180px] bg-white z-[10] text-dark dark:text-white-dark dark:bg-[#1b2e4b] shadow p-0 py-2 hidden"
          >
            <li>
              <router-link to="/auth/cover-lockscreen" target="_blank">{{
                $t("unlock_cover")
              }}</router-link>
            </li>
            <li>
              <router-link to="/auth/boxed-lockscreen" target="_blank">{{
                $t("unlock_boxed")
              }}</router-link>
            </li>
          </ul>
        </li>
      </ul>
    </li>
    <li class="menu nav-item relative">
      <a href="javascript:;" class="nav-link">
        <div class="flex items-center">
          <icon-menu-more class="shrink-0" />

          <span class="px-2">{{ $t("more") }}</span>
        </div>
        <div class="right_arrow">
          <icon-caret-down />
        </div>
      </a>
      <ul class="sub-menu">
        <li>
          <router-link to="/dragndrop">{{ $t("drag_and_drop") }}</router-link>
        </li>
        <li>
          <router-link to="/charts">{{ $t("charts") }}</router-link>
        </li>
        <li>
          <router-link to="/font-icons">{{ $t("font_icons") }}</router-link>
        </li>
        <li>
          <router-link to="/widgets">{{ $t("widgets") }}</router-link>
        </li>
        <li>
          <a href="https://vristo.sbthemes.com" target="_blank">{{
            $t("documentation")
          }}</a>
        </li>
      </ul>
    </li>
  </ul>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed, reactive, watch } from "vue";
import { useI18n } from "vue-i18n";

import appSetting from "@/app-setting";

import { useRoute } from "vue-router";
import { useAppStore } from "@/stores/index";

import IconMenu from "../icon/icon-menu.vue";
import IconCalendar from "../icon/icon-calendar.vue";
import IconEdit from "../icon/icon-edit.vue";
import IconChatNotification from "../icon/icon-chat-notification.vue";
import IconSearch from "../icon/icon-search.vue";
import IconXCircle from "../icon/icon-x-circle.vue";
import IconSun from "../icon/icon-sun.vue";
import IconMoon from "../icon/icon-moon.vue";
import IconLaptop from "../icon/icon-laptop.vue";
import IconMailDot from "../icon/icon-mail-dot.vue";
import IconArrowLeft from "../icon/icon-arrow-left.vue";
import IconInfoCircle from "../icon/icon-info-circle.vue";
import IconBellBing from "../icon/icon-bell-bing.vue";
import IconUser from "../icon/icon-user.vue";
import IconMail from "../icon/icon-mail.vue";
import IconLockDots from "../icon/icon-lock-dots.vue";
import IconLogout from "../icon/icon-logout.vue";
import IconMenuDashboard from "../icon/menu/icon-menu-dashboard.vue";
import IconCaretDown from "../icon/icon-caret-down.vue";
import IconMenuApps from "../icon/menu/icon-menu-apps.vue";
import IconMenuComponents from "../icon/menu/icon-menu-components.vue";
import IconMenuElements from "../icon/menu/icon-menu-elements.vue";
import IconMenuDatatables from "../icon/menu/icon-menu-datatables.vue";
import IconMenuForms from "../icon/menu/icon-menu-forms.vue";
import IconMenuPages from "../icon/menu/icon-menu-pages.vue";
import IconMenuMore from "../icon/menu/icon-menu-more.vue";

const store = useAppStore();
const route = useRoute();
const search = ref(false);

// multi language
const i18n = reactive(useI18n());
const changeLanguage = (item: any) => {
  i18n.locale = item.code;
  appSetting.toggleLanguage(item);
};
const currentFlag = computed(() => {
  return `/assets/images/flags/${i18n.locale.toUpperCase()}.svg`;
});

const notifications = ref([
  {
    id: 1,
    profile: "user-profile.jpeg",
    message:
      '<strong class="text-sm mr-1">John Doe</strong>invite you to <strong>Prototyping</strong>',
    time: "45 min ago",
  },
  {
    id: 2,
    profile: "profile-34.jpeg",
    message:
      '<strong class="text-sm mr-1">Adam Nolan</strong>mentioned you to <strong>UX Basics</strong>',
    time: "9h Ago",
  },
  {
    id: 3,
    profile: "profile-16.jpeg",
    message: '<strong class="text-sm mr-1">Anna Morgan</strong>Upload a file',
    time: "9h Ago",
  },
]);

const messages = ref([
  {
    id: 1,
    image:
      '<span class="grid place-content-center w-9 h-9 rounded-full bg-success-light dark:bg-success text-success dark:text-success-light"><svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg></span>',
    title: "Congratulations!",
    message: "Your OS has been updated.",
    time: "1hr",
  },
  {
    id: 2,
    image:
      '<span class="grid place-content-center w-9 h-9 rounded-full bg-info-light dark:bg-info text-info dark:text-info-light"><svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg></span>',
    title: "Did you know?",
    message: "You can switch between artboards.",
    time: "2hr",
  },
  {
    id: 3,
    image:
      '<span class="grid place-content-center w-9 h-9 rounded-full bg-danger-light dark:bg-danger text-danger dark:text-danger-light"> <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></span>',
    title: "Something went wrong!",
    message: "Send Reposrt",
    time: "2days",
  },
  {
    id: 4,
    image:
      '<span class="grid place-content-center w-9 h-9 rounded-full bg-warning-light dark:bg-warning text-warning dark:text-warning-light"><svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">    <circle cx="12" cy="12" r="10"></circle>    <line x1="12" y1="8" x2="12" y2="12"></line>    <line x1="12" y1="16" x2="12.01" y2="16"></line></svg></span>',
    title: "Warning",
    message: "Your password strength is low.",
    time: "5days",
  },
]);

onMounted(() => {
  setActiveDropdown();
});

watch(route, (to, from) => {
  setActiveDropdown();
});

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

const removeNotification = (value: number) => {
  notifications.value = notifications.value.filter((d) => d.id !== value);
};

const removeMessage = (value: number) => {
  messages.value = messages.value.filter((d) => d.id !== value);
};
</script>
