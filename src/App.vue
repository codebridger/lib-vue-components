<template>
  <rootApp show-settings>
    <dashboard-shell>
      <template #horizontal-menu>
        <HorizontalMenu />
      </template>

      <template #sidebar-menu>
        <SidebarMenu :items="sidebarData" />
      </template>

      <template #content></template>

      <template #footer>
        <Footer />
      </template>
    </dashboard-shell>
  </rootApp>
</template>

<script lang="ts" setup>
import rootApp from "@/shell/App.vue";
import DashboardShell from "@/shell/DashboardShell.vue";
import HorizontalMenu from "./shell/HorizontalMenu.vue";
import SidebarMenu from "./shell/SidebarMenu.vue";
import Footer from "./shell/Footer.vue";

import { sidebarData } from "./shell/sidebar-data";
import { useMeta } from "@/composables/use-meta";

// meta
useMeta({ title: "Sales Admin" });
</script>
