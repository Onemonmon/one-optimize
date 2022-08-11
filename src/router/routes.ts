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
        path: "/echarts",
        name: "echarts 图表",
        component: DemoLayout,
        children: [
          {
            path: "/line",
            name: "折线图",
            component: () =>
              import(
                /* webpackChunkName: "LineChartNormal" */ "@/views/echarts/LineChartNormal.vue"
              ),
          },
          {
            path: "/bar",
            name: "柱状图",
            component: () =>
              import(
                /* webpackChunkName: "BarChartNormal" */ "@/views/echarts/BarChartNormal.vue"
              ),
          },
          {
            path: "/bar1",
            name: "柱状图1",
            component: () =>
              import(
                /* webpackChunkName: "BarChartWP" */ "@/views/echarts/BarChartWP.vue"
              ),
          },
          {
            path: "/pie",
            name: "饼图",
            component: () =>
              import(
                /* webpackChunkName: "PieChartNormal" */ "@/views/echarts/PieChartNormal.vue"
              ),
          },
          {
            path: "/pie1",
            name: "饼图1",
            component: () =>
              import(
                /* webpackChunkName: "PieChartCircle" */ "@/views/echarts/PieChartCircle.vue"
              ),
          },
        ],
      },
      {
        path: "/pro-table",
        name: "ProTable 高级表格",
        component: DemoLayout,
        children: [
          {
            path: "/basic1",
            name: "基本使用1",
            component: () =>
              import(
                /* webpackChunkName: "ProTableData" */ "@/views/pro-table/ProTableData.vue"
              ),
          },
          {
            path: "/basic2",
            name: "基本使用2",
            component: () =>
              import(
                /* webpackChunkName: "ProTableRequest" */ "@/views/pro-table/ProTableRequest.vue"
              ),
          },
          {
            path: "/slot",
            name: "表格插槽",
            component: () =>
              import(
                /* webpackChunkName: "ProTableSlot" */ "@/views/pro-table/ProTableSlot.vue"
              ),
          },
          {
            path: "/edit",
            name: "表格编辑",
            component: () =>
              import(
                /* webpackChunkName: "ProTableEdit" */ "@/views/pro-table/ProTableEdit.vue"
              ),
          },
        ],
      },
    ],
  },
];

export default routes;
