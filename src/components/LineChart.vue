<script lang="ts" setup>
import { onMounted, ref, watch } from "vue";
import * as echarts from "echarts/core";
import { GridComponent } from "echarts/components";
import { LineChart } from "echarts/charts";
import { UniversalTransition } from "echarts/features";
import { CanvasRenderer } from "echarts/renderers";

echarts.use([GridComponent, LineChart, CanvasRenderer, UniversalTransition]);

const props = defineProps<{ id: string; options?: any }>();
let chart = null;

onMounted(() => {
  chart = echarts.init(document.getElementById(props.id));
  if (props.options) {
    chart.setOption(props.options);
  }
});

watch(
  () => props.options,
  (val) => {
    if (chart) {
      chart.setOption(val);
    }
  },
  { deep: true }
);
</script>

<template>
  <div :id="id" class="echats-container"></div>
</template>

<style lang="scss" scoped>
.echats-container {
  width: 500px;
  height: 500px;
}
</style>
