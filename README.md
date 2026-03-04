# Vue 3 + TypeScript + Vite

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

### What is PilotUI?
PilotUI is a reusable component library for Vue 3 projects. It ships a curated set of building blocks to assemble modern web applications and dashboards fast, with consistent design and strong TypeScript types. The published package name is `pilotui`.

## Type Support For `.vue` Imports in TS

Since TypeScript cannot handle type information for `.vue` imports, they are shimmed to be a generic Vue component type by default. In most cases this is fine if you don't really care about component prop types outside of templates. However, if you wish to get actual prop types in `.vue` imports (for example to get props validation when using manual `h(...)` calls), you can enable Volar's Take Over mode by following these steps:

1. Run `Extensions: Show Built-in Extensions` from VS Code's command palette, look for `TypeScript and JavaScript Language Features`, then right click and select `Disable (Workspace)`. By default, Take Over mode will enable itself if the default TypeScript extension is disabled.
2. Reload the VS Code window by running `Developer: Reload Window` from the command palette.

### Prerequisites
- Vue 3 or Nuxt 3 project
- Node.js and yarn

### 1) Install the package

```bash
yarn add pilotui

# or install the dev tag
yarn add pilotui@dev
```

## Usage

### Vue 3 (Vite) quick start
```ts
// main.ts
import { createApp } from 'vue'
import App from './App.vue'
import PilotUI from 'pilotui'
import 'pilotui/style.css'

const app = createApp(App)

app.use(PilotUI, {
  prefix: 'CL',
  dontInstallPinia: true,
  dontInstallPopper: false,
  dontInstallPerfectScrollbar: false,
})

app.mount('#app')
```

Use components immediately (default prefix `CL`):

```vue
<template>
  <CLButton>Click me</CLButton>
  <CLInput placeholder="Type here" />
  <CLToast />
  <!-- and many more... -->
  
</template>
```

### Nuxt 3 setup
Create a client plugin, for example `plugins/pilotui.client.ts`:

```ts
import { defineNuxtPlugin as init } from 'pilotui/nuxt'

export default defineNuxtPlugin({
  name: 'pilotui',
  enforce: 'pre',
  async setup(nuxtApp) {
    const options = {
      prefix: 'CL',
      dontInstallPinia: true,
      dontInstallPopper: false,
      dontInstallPerfectScrollbar: false,
    }

    return init(nuxtApp, options)
  },
})
```

Add configuration to `nuxt.config.ts`:

```ts
export default defineNuxtConfig({
  build: {
    transpile: ['pilotui'],
  },
  css: ['pilotui/style.css'],
})
```

## Local development

```bash
# install dependencies
yarn

# run Storybook locally
yarn storybook

# run tests
yarn test

# build the library
yarn build
```

## Links
- **Storybook**: [codebridger.github.io/lib-vue-components](https://codebridger.github.io/lib-vue-components)
- **Package**: `pilotui`

---

If you like PilotUI, consider starring the repo and pinning it on your GitHub profile.
