<template>
  <ul
    class="horizontal-menu py-1.5 font-semibold px-6 lg:space-x-1.5 xl:space-x-8 rtl:space-x-reverse bg-white border-t border-[#ebedf2] dark:border-[#191e3a] dark:bg-[#0e1726] text-black dark:text-white-dark"
  >
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
        <div class="right_arrow" v-if="item.children">
          <Icon name="IconCaretDown" />
        </div>
      </a>
      <ul class="sub-menu" v-if="item.children">
        <li v-for="(child, childIndex) in item.children" :key="childIndex">
          <router-link :to="child.to || '/#'">{{ child.title }}</router-link>
        </li>
      </ul>
    </li>
    <!-- <li class="menu nav-item relative">
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
  --></ul>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed, reactive, watch } from "vue";

import { useRoute } from "vue-router";

import Icon from "../icon/Icon.vue";
import IconCaretDown from "../icon/icon-caret-down.vue";

import { HorizontalMenuGroupType } from "../types/horizontal-menu.type";

interface SidebarProps {
  items: Array<HorizontalMenuGroupType>;
}

const props = defineProps<SidebarProps>();

const normalizedItems = computed(() => {
  // remove layers where only have title and ch
});

const route = useRoute();

// @TODO: remove this function
function $t(key: string) {
  return key;
}

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
</script>
