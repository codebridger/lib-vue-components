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
  // optimizeDeps: {
  //   include: ["quill"],
  // },
  build: {
    lib: {
      entry: {
        vue: resolve(__dirname, "src/vue.ts"),
        nuxt: resolve(__dirname, "src/nuxt.ts"),
      },
      // formats: ["es", "cjs", "umd"],
      fileName: (format, entryName) => `${entryName}.${format}.js`,
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ["vue", "pinia", "vue-router", "@nuxt/kit"],

      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: "Vue",
          pinia: "Pinia",
          "vue-router": "VueRouter",
        },
      },
    },
  },
});
