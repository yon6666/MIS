import { createApp } from "vue";
import App from "./App.vue";
// 导入路由
import router from "./router";
// 导入ElementPlus
import ElementPlus from "element-plus";
// 导入ElementPlusIcons
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import "element-plus/dist/index.css";
// 导入ElementPlus国际化
import zhCn from "element-plus/dist/locale/zh-cn.mjs";
// 导入svg图标
import "virtual:svg-icons-register";
// 导入Pinia
import pinia from "@/store";
// 引入全局样式
import "@/assets/css/common.scss";

const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

// 设置全局异常处理
app.config.errorHandler = (err, vm, info) => {
  console.log(err, vm, info);
};

app.use(ElementPlus, {
  locale: zhCn,
});

app.use(router);
app.use(pinia);
app.mount("#app");
