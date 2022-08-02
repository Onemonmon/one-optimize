import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { ElLoading } from "element-plus";
import "element-plus/dist/index.css";
import ProComponents from "one-components-vue3";
import "one-components-vue3/dist/style.css";

createApp(App).use(ElLoading).use(ProComponents).use(router).mount("#app");
