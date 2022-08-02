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
    minWidth: 120,
  },
  {
    prop: "age",
    label: "年龄",
    editable: false,
    sortable: true,
    width: 100,
  },
  {
    prop: "money",
    label: "余额",
    formatConfig: { formatType: "money" },
    fieldProps: { type: "number", min: 1000, max: 20000 },
    formProps: {
      rules: {
        type: "number",
        required: true,
        message: "请输入余额！",
      },
    },
    copyable: true,
    width: 160,
  },
  {
    prop: "gender",
    label: "性别",
    request: () => [
      { label: "男", value: "male" },
      { label: "女", value: "female" },
    ],
    filters: [
      { text: "男", value: "male" },
      { text: "女", value: "female" },
    ],
    fieldProps: { type: "button" },
    valueType: "radio",
    width: 160,
  },
  {
    prop: "hobby",
    label: "爱好",
    options: options.value,
    fieldProps: { type: "button" },
    formProps: {
      rules: { type: "array", required: true, message: "请选择爱好！" },
    },
    valueType: "checkbox",
    width: 240,
  },
  {
    prop: "major",
    label: "专业",
    formatConfig: { color: "green", dot: true },
    options: options.value,
    fieldProps: { clearable: false },
    valueType: "select",
    width: 140,
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
    width: 180,
  },
]);
const handleSave = async (row) => {
  try {
    await new Promise((resolve, reject) =>
      setTimeout(() => {
        Math.random() > 0.5 ? resolve("") : reject();
      }, 1000)
    );
    ElMessage({ message: row.name + "保存成功", type: "success" });
  } catch {
    ElMessage({ message: row.name + "保存失败", type: "error" });
    return Promise.reject();
  }
};
const handleValuesChange = (row, key, value) => {
  console.log(row, key, value);
};
const editableConfig = reactive({
  editable: true,
  editableKeys: [1, 2, 3],
  defaultCreateRow: { age: 18, gender: "male", major: "01" },
  onSave: handleSave,
  onValuesChange: handleValuesChange,
  onEditableKeysChange(keys) {
    editableConfig.editableKeys = keys;
  },
});
const getTableData = async () => {
  const res = await new Promise((resolve) => {
    setTimeout(() => {
      const data = new Array(10).fill(0).map((n, i) => {
        const random = Math.random();
        return {
          id: i,
          name: "张三" + i + (i === 0 ? "很长很长很长很长很长很长的姓名" : ""),
          address: "深圳" + i,
          age: Math.floor(random * 100),
          gender: random > 0.5 ? "female" : "male",
          money: 10000 + Math.floor(random * 10000),
          hobby: ["01", "02"],
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
</script>

<template>
  <pro-table
    title="可编辑表格"
    :columns="columns"
    :request="getTableData"
    :tableProps="{ rowKey: 'id' }"
    :proQueryFilterProps="false"
    :editableConfig="editableConfig"
  />
</template>
