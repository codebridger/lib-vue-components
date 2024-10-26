<template>
  <h1 class="font-bold text-xl">Menu Icons</h1>
  <section class="flex flex-wrap items-start content-start">
    <template v-for="iconKey in Object.keys(menuIcons)">
      <div class="w-16 h-auto m-6">
        <div class="w-16 h-16">
          <component class="w-full h-full" :is="menuIcons[iconKey]" />
        </div>
        <p class="mt-2 text-sm text-center w-full break-all">
          {{ iconKey }}
        </p>
      </div>
    </template>
  </section>

  <h1 class="font-bold text-xl">Variant Icons</h1>
  <section class="flex flex-wrap items-start content-start">
    <template v-for="iconKey in Object.keys(variantIcons)">
      <div class="w-16 h-auto m-6">
        <div class="w-16 h-16">
          <component class="w-full h-full" :is="variantIcons[iconKey]" />
        </div>
        <p class="mt-2 text-sm text-center w-full break-all">
          {{ iconKey }}
        </p>
      </div>
    </template>
  </section>

  <h1 class="font-bold text-xl">Static Icons</h1>
  <section class="flex flex-wrap items-start content-start">
    <template v-for="iconKey in Object.keys(staticIcons)">
      <div class="w-16 h-auto m-6">
        <div class="w-16 h-16">
          <component class="w-full h-full" :is="staticIcons[iconKey]" />
        </div>
        <p class="mt-2 text-sm text-center w-full break-all">
          {{ iconKey }}
        </p>
      </div>
    </template>
  </section>
</template>

<script setup lang="ts">
import staticIcons from "../icon/static-icons";
import variantIcons from "../icon/variant-icons";
import menuIcons from "../icon/menu-icons";
</script>
