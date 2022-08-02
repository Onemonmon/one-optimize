<script lang="ts" setup>
import { ref, reactive, computed } from "vue";
import { ElMessage } from "element-plus";

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
    formProps: {
      rules: {
        type: "string",
        required: true,
        message: "请输入姓名！",
        trigger: "blur",
      },
    },
    showOverflowTooltip: true,
  },
  {
    prop: "address",
    label: "地址",
    hideInForm: true,
    width: 80,
  },
  {
    prop: "info",
    label: "信息",
    children: [
      {
        prop: "info.age",
        requestProp: "age",
        label: "年龄",
        sortable: "custom",
        fieldProps: { type: "number", min: 1, max: 150 },
        qfHideInForm: true,
        width: 100,
      },
      {
        prop: "info.money",
        requestProp: "money",
        label: "余额",
        formatConfig: { formatType: "money" },
        fieldProps: { type: "number" },
        copyable: true,
        width: 160,
      },
      {
        prop: "info.gender",
        requestProp: "gender",
        label: "性别",
        request: () => [
          { label: "男", value: "male" },
          { label: "女", value: "female" },
        ],
        filters: [
          { text: "男", value: "male" },
          { text: "女", value: "female" },
        ],
        qfHideInForm: true,
        valueType: "radio",
        width: 100,
      },
      {
        prop: "info.hobby",
        requestProp: "hobby",
        label: "爱好",
        options: options.value,
        qfHideInForm: (model) => model.money > 1000,
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

const params = reactive({ outterParam: "001" });
const getTableData = async (params) => {
  console.log("获取表格数据，参数：", params);
  const res = await new Promise((resolve) => {
    setTimeout(() => {
      const data = new Array(10).fill(0).map((n, i) => {
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
      resolve(data);
    }, 1000);
  });
  return {
    data: res,
    total: 100,
  };
};
const handleChangeParams = () => {
  params.outterParam = `${Math.floor(Math.random() * 100)}`;
};
</script>

<template>
  <pro-table
    title="表格标题"
    :columns="columns"
    :params="params"
    :request="getTableData"
    :tableProps="{ rowKey: 'id' }"
    :proQueryFilterProps="{ initialValues: { name: '张三' } }"
    :requestOnColumnChange="true"
  >
    <template #toolbar>
      <el-button type="primary" @click="handleChangeParams">
        重新获取数据
      </el-button>
    </template>
  </pro-table>
</template>
