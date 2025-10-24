## PilotUI

> A comprehensive Vue 3 + TypeScript component library featuring 50+ UI components, shell layouts, icon system, and utilities. Built with Tailwind CSS, includes Storybook documentation, theme customization, and Nuxt 3 support.

### Quick links
- **Live Storybook**: [codebridger.github.io/lib-vue-components](https://codebridger.github.io/lib-vue-components)

### What is PilotUI?
PilotUI is a reusable component library for Vue 3 projects. It ships a curated set of building blocks to assemble modern web applications and dashboards fast, with consistent design and strong TypeScript types. The published package name is `@codebridger/lib-vue-components`.

### Features
- **Rich components**: buttons, inputs, text areas, selects, checkboxes, modals, pagination, avatars, tabs, tooltips, progress, cards, and more
- **Application shells**: `DashboardShell`, `Sidebar`, `HorizontalMenu`, `AppRoot`, `ThemeCustomizer`, `Footer`
- **Icon system**: 150+ single, variant, and menu icons
- **Utilities**: toast notifications, Pinia store integration, shared types
- **Styling**: Tailwind CSS-based theme and ready-to-use styles
- **Docs & tests**: Storybook 8 docs, Vitest coverage
- **Nuxt 3 support**: first-class plugin and transpile config

---

## Installation

### Prerequisites
- Vue 3 or Nuxt 3 project
- Node.js and yarn
- GitHub account with access to GitHub Packages (for installation)

### 1) Authenticate to GitHub Packages
Create an `.npmrc` file in your project root with a GitHub token that has `read:packages`:

```bash
@codebridger:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=YOUR_GITHUB_TOKEN
```

### 2) Install the package

```bash
yarn add @codebridger/lib-vue-components

# or install the dev tag
yarn add @codebridger/lib-vue-components@dev
```

## Usage

### Vue 3 (Vite) quick start
```ts
// main.ts
import { createApp } from 'vue'
import App from './App.vue'
import PilotUI from '@codebridger/lib-vue-components'
import '@codebridger/lib-vue-components/style.css'

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
import { defineNuxtPlugin as init } from '@codebridger/lib-vue-components/nuxt'

export default defineNuxtPlugin({
  name: '@codebridger/lib-vue-components',
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
    transpile: ['@codebridger/lib-vue-components'],
  },
  css: ['@codebridger/lib-vue-components/style.css'],
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
- **Package**: `@codebridger/lib-vue-components`

---

If you like PilotUI, consider starring the repo and pinning it on your GitHub profile.
