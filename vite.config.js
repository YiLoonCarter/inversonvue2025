import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vite.dev/config/
export default defineConfig({
  //Depends on the path of your project url
  base: "/vue-final-proj/",
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)), //allow use @ to access src path for image location eg. @/assets/working.gif
    },
  },
});
