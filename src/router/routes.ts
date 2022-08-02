import BasicLayout from "@/layout/BasicLayout.vue";
import DemoLayout from "@/layout/DemoLayout.vue";
import { RouteRecordRaw } from "vue-router";

export const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "Home",
    component: BasicLayout,
    children: [
      {
        path: "/pro-table",
        name: "ProTable 高级表格",
        component: DemoLayout,
        children: [
          {
            path: "/basic1",
            name: "基本使用1",
            component: () => import("@/views/pro-table/ProTableData.vue"),
          },
          {
            path: "/basic2",
            name: "基本使用2",
            component: () => import("@/views/pro-table/ProTableRequest.vue"),
          },
          {
            path: "/slot",
            name: "表格插槽",
            component: () => import("@/views/pro-table/ProTableSlot.vue"),
          },
          {
            path: "/edit",
            name: "表格编辑",
            component: () => import("@/views/pro-table/ProTableEdit.vue"),
          },
        ],
      },
    ],
  },
];

export default routes;
