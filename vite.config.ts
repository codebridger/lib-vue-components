import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: [
      {
        find: "@",
        replacement: resolve(__dirname, "./src"),
      },
    ],
  },
  build: {
    lib: {
      entry: {
        vue: resolve(__dirname, "src/vue.ts"),
        nuxt: resolve(__dirname, "src/nuxt.ts"),
        shell: resolve(__dirname, "src/shell/components.ts"),
        elements: resolve(__dirname, "src/elements/components.ts"),
        complex: resolve(__dirname, "src/complex/components.ts"),
        form: resolve(__dirname, "src/form/components.ts"),
        toast: resolve(__dirname, "src/utils/toast.ts"),
        store: resolve(__dirname, "src/stores/index.ts"),
        types: resolve(__dirname, "src/types/types.ts"),
      },
      formats: ["es", "cjs"],
      fileName: (format, entryName) => `${entryName}.${format}.js`,
    },
    rollupOptions: {
      external: ["vue", "pinia", "vue-router", "@nuxt/kit"],
      output: {
        globals: {
          vue: "Vue",
          pinia: "Pinia",
          "vue-router": "VueRouter",
        },
      },
    },
  },
});
