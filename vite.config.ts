import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import * as path from "path"; //gzip必备插件

// https://vitejs.dev/config/
export default defineConfig({
  publicDir: "public", // 公共文件路径,会被复制到outDir 根目录
  // 路径相关规则
  base: "./",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"), // 路径别名
    },
    extensions: [".js", ".json", ".ts"], // 使用路径别名时想要省略的后缀名，可以自己 增减
  },
  plugins: [vue()],
});
