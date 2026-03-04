# 🚀 PilotUI

**Assemble modern web applications and dashboards fast with PilotUI.**

PilotUI is a comprehensive Vue 3 + TypeScript component library featuring **50+ UI components**, custom shell layouts, a robust icon system, and specialized utilities. Built with **Tailwind CSS**, it's designed to provide consistent aesthetics and premium developer experience.

[![Version](https://img.shields.io/npm/v/pilotui?color=blue&style=flat-square)](https://www.npmjs.com/package/pilotui)
[![License](https://img.shields.io/npm/l/pilotui?color=green&style=flat-square)](https://github.com/codebridger/lib-vue-components/blob/main/LICENSE)
[![Vue](https://img.shields.io/badge/Vue-3.x-brightgreen?style=flat-square&logo=vue.js)](https://vuejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)

---

## 🔗 Quick Links

- 📖 **Live Documentation**: [Storybook Showcase](https://codebridger.github.io/lib-vue-components/)
- 🤖 **AI-Ready Docs**: [llm.md](https://codebridger.github.io/lib-vue-components/llm.md) *(Optimized for Claude, Gemini, ChatGPT)*
- 📦 **NPM Package**: [`pilotui`](https://www.npmjs.com/package/pilotui)

---

## ✨ Key Features

- 🏗️ **Shell Scaffolding**: Pre-built `DashboardShell`, `AppRoot`, and navigation menus (Vertical/Horizontal).
- 🎨 **Dynamic Theming**: Integrated theme customizer with Dark/Light/System modes via Pinia.
- 🍱 **50+ Components**: From basic buttons and inputs to complex data tables and modals.
- 🌍 **RTL & I18n Ready**: Full support for Right-to-Left layouts and multi-language setups.
- ⚡ **Vite Powered**: Ultra-fast development and optimized production builds.
- 🧱 **Nuxt 3 Compatible**: Includes specific entry points for seamless Nuxt integration.

---

## 🚀 Quick Start

### 1. Installation

```bash
yarn add pilotui

# or using npm
npm install pilotui
```

### 2. Global Integration (Vue 3)

```ts
// main.ts
import { createApp } from 'vue'
import PilotUI from 'pilotui'
import 'pilotui/style.css'
import App from './App.vue'

const app = createApp(App)

app.use(PilotUI, {
  dontInstallPinia: false, // Set to true if you already have a Pinia instance in your app
})

app.mount('#app')
```

### 3. Usage

Import components directly where you need them:

```vue
<template>
  <AppRoot colorScheme="dark">
    <Button variant="primary">Launch Dashboard</Button>
  </AppRoot>
</template>

<script setup>
import { AppRoot, Button } from 'pilotui'
</script>
```

---

## 🍱 Component Showcase

| Category | Key Components |
| :--- | :--- |
| **Shell** | `AppRoot`, `DashboardShell`, `SidebarMenu`, `HorizontalMenu` |
| **Elements** | `Button`, `Card`, `Avatar`, `Dropdown`, `Tabs`, `Progress` |
| **Form** | `Input`, `Select`, `Checkbox`, `Switch`, `Textarea` |
| **Complex** | `Modal`, `Pagination`, `DataTable`, `Toast` |
| **Icons** | Custom `Icon` component with multi-pack support |

---

## 🤖 AI-Native Documentation

PilotUI includes a specialized `llm.md` file designed specifically for Large Language Models. If you are using an AI assistant (like Cursor or GitHub Copilot) to build your app, point it to:
👉 [**https://codebridger.github.io/lib-vue-components/llm.md**](https://codebridger.github.io/lib-vue-components/llm.md)

This file contains flat, metadata-rich descriptions of every component, property, and slot, enabling AI to generate accurate PilotUI code for you instantly.

---

## 🛠️ Local Development

```bash
# Install dependencies
yarn install

# Run Storybook for live development
yarn storybook

# Generate LLM documentation
yarn generate-docs

# Run unit tests
yarn test
```

---

## 🤝 Community & Support

- **Contribute**: Feel free to open issues or submit PRs to improve the library.
- **Star us**: If you find PilotUI useful, please consider giving it a ⭐ on GitHub!

Built with ❤️ by the **CodeBridger** team.
