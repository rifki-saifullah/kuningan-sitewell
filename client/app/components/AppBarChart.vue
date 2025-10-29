<script setup lang="ts">
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'
import type { ChartOptions } from 'chart.js'

const props = defineProps<{
  title: string,
  websites: Array<string>,
  responseTime: Array<number>,
  backgroundColor?: string,
}>()

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const data = {
  labels: props.websites,
  datasets: [
    {
      label: 'Waktu Respon (ms)',
      backgroundColor: props.backgroundColor || 'rgba(54, 162, 235, 0.5)',
      data: props.responseTime,
    }
  ]
}
const options: ChartOptions<'bar'> = {
  responsive: true,
  plugins: {
    legend: { position: 'top' },
    title: { display: true, text: props.title }
  }
}
</script>

<template>
  <Bar :data="data" :options="options" />
</template>
