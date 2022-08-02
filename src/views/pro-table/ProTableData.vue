<script lang="ts" setup>
import { ref, reactive, computed, onMounted } from "vue";
import { ElMessage } from "element-plus";
import type { ProTableInstance } from "one-components-vue3";

const options = ref([
  { label: "抽烟", value: "01" },
  { label: "喝酒", value: "02" },
  { label: "烫头", value: "03" },
]);
const columns = computed(() => [
  {
    prop: "selection",
    type: "selection",
    width: 50,
  },
  {
    prop: "index",
    type: "index",
    label: "序号",
    width: 80,
  },
  {
    prop: "name",
    label: "姓名",
    tip: "<span style='color: red;'>这是姓名鸭！</span>",
    formatConfig: { textFormat: (text) => "我是" + text },
    showOverflowTooltip: true,
  },
  {
    prop: "address",
    label: "地址",
    hideBySetting: true,
    width: 80,
  },
  {
    prop: "info",
    label: "信息",
    hideBySetting: true,
    children: [
      {
        prop: "info.age",
        label: "年龄",
        sortable: "custom",
        width: 100,
      },
      {
        prop: "info.money",
        label: "余额",
        formatConfig: { formatType: "money" },
        copyable: true,
        width: 160,
      },
      {
        prop: "info.gender",
        label: "性别",
        request: () => [
          { label: "男", value: "male" },
          { label: "女", value: "female" },
        ],
        filters: [
          { text: "男", value: "male" },
          { text: "女", value: "female" },
        ],
        valueType: "radio",
        width: 100,
      },
      {
        prop: "info.hobby",
        label: "爱好",
        options: options.value,
        valueType: "checkbox",
        width: 120,
      },
    ],
  },
  {
    prop: "major",
    label: "专业",
    formatConfig: { color: "green", dot: true },
    options: options.value,
    valueType: "select",
    width: 100,
  },
  {
    prop: "operations",
    type: "operations",
    label: "操作",
    fixed: "right",
    operations: (row) => [
      {
        key: "detail",
        label: "查看",
        onClick() {
          ElMessage({ message: row.name });
        },
      },
      {
        key: "delete",
        label: "删除",
        type: "danger",
        hide: () => row.id < 7,
      },
    ],
    width: 120,
  },
]);
const tableProps = reactive({ rowKey: "id", data: [] });
const tableRef = ref<ProTableInstance | null>(null);
const getTableData = async () => {
  const data = new Array(30).fill(0).map((n, i) => {
    const random = Math.random();
    return {
      id: i,
      name: "张三" + i + (i === 0 ? "很长很长很长很长很长很长的姓名" : ""),
      address: "深圳" + i,
      info: {
        age: Math.floor(random * 100),
        gender: random > 0.5 ? "female" : "male",
        money: 10000 + Math.floor(random * 10000),
        hobby: ["01", "02"],
      },
      major: random > 0.5 ? "01" : "02",
    };
  });
  tableProps.data = data;
};
onMounted(() => {
  console.log("表格实例：", tableRef);
  getTableData();
});
</script>

<template>
  <pro-table
    title="表格标题"
    :columns="columns"
    :tableProps="tableProps"
    :proQueryFilterProps="false"
    :getTableRef="(ref) => (tableRef = ref)"
  />
</template>
