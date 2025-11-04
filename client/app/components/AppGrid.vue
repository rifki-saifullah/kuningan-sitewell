<script setup lang="ts">
const cards = ref([
  {
    title: 'Pemantauan Otomatis',
    description: 'Sistem memeriksa status website secara otomatis setiap jam untuk memastikan ketersediaan dan performa optimal.',
    icon: 'i-lucide-monitor',
  },
  {
    title: 'Notifikasi',
    description: 'Dapatkan pemberitahuan real-time melalui Telegram jika terjadi gangguan pada website.',
    icon: 'i-lucide-mail-warning',
  },
  {
    title: 'Dashboard Interaktif',
    description: 'Akses data pemantauan melalui dashboard yang mudah digunakan dan informatif.',
    icon: 'i-lucide-layout-dashboard',
  }
])
</script>

<template>
  <UPageGrid class="my-8">
    <UPageCard
      v-for="(card, index) in cards"
      :key="index"
      v-bind="card"
    />
  </UPageGrid>
</template>

