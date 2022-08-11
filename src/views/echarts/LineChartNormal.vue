<script lang="ts" setup>
import { ref } from "vue";
import Echarts from "@/components/LineChart.vue";

const options = ref({
  xAxis: {
    type: "category",
    data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  },
  yAxis: {
    type: "value",
  },
  series: [
    {
      data: [150, 230, 224, 218, 135, 147, 260],
      type: "line",
    },
  ],
});
</script>

<template>
  <Echarts id="line" :options="options" />
</template>
