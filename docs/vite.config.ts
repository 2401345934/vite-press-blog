//vite.config.ts
import { SearchPlugin } from "vitepress-plugin-search";
import { defineConfig } from "vite";

//default options
var options = {
  previewLength: 62,
  buttonLabel: "Search",
  placeholder: "Search docs",
};

export default defineConfig({
  plugins: [SearchPlugin()],
});