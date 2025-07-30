import { defineConfig } from "vitest/config";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";

export default defineConfig({
  plugins: [vue()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/test-setup.ts"],
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html", "lcov", "text-summary"],
      reportsDirectory: "./coverage",
      exclude: [
        "node_modules/",
        "dist/",
        "coverage/",
        "**/*.d.ts",
        "**/*.config.*",
        "**/*.stories.*",
        "**/__snapshots__/**",
        "**/stories/**",
        "**/example_stories/**",
        "**/*.mdx",
        "**/*.md",
        "**/test-setup.ts",
        "**/test-utils.ts",
        "**/vite-env.d.ts",
        "**/vue.ts",
        "**/nuxt.ts",
        "**/main.ts",
        "**/router/**",
        "**/stores/**",
        "**/types/**",
        "**/locales/**",
        "**/assets/**",
        "**/views/**",
        "**/composables/**",
        "**/layouts/**",
        "**/icon/**",
        "**/utils/toast.ts",
        "**/utils/toast.stories.ts",
        "**/utils/toastDocs.mdx",
      ],
      include: [
        "src/**/*.{js,ts,vue}",
        "!src/**/*.stories.{js,ts}",
        "!src/**/*.test.{js,ts}",
        "!src/**/*.spec.{js,ts}",
      ],
      all: true,
      clean: true,
      cleanOnRerun: true,
      skipFull: false,
      thresholds: {
        global: {
          branches: 80,
          functions: 80,
          lines: 80,
          statements: 80,
        },
      },
      watermarks: {
        statements: [80, 95],
        branches: [80, 95],
        functions: [80, 95],
        lines: [80, 95],
      },
    },
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
});
