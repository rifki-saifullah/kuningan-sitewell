<script setup lang="ts">
import { Doughnut } from 'vue-chartjs'
import type { ChartOptions } from 'chart.js'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js'

const props = defineProps<{
  title: string;
  labels?: string[];
  data?: number[];
  backgroundColors?: string[];
}>()

ChartJS.register(Title, Tooltip, Legend, ArcElement)

const data = ref({
  labels: props.labels || ['Healthy', 'Down'],
  datasets: [
    {
      label: props.title,
      data: props.data || [0, 0],
      backgroundColor: props.backgroundColors || ['#34d399', '#f87171'],
      hoverOffset: 10
    }
  ]
});

const options: ChartOptions<'doughnut'> = {
  responsive: true,
  plugins: {
    legend: { position: 'bottom' },
    title: { display: true, text: "Total Website Normal & Error" }
  },
  cutout: '60%'
}
</script>

<template>
  <Doughnut :data="data" :options="options" />
</template>
