<script setup lang="ts">
import type { TimelineItem } from '@nuxt/ui'

const items = ref<TimelineItem[]>([
  {
    date: '1',
    title: 'Pengecekan Website Otomatis',
    description: 'Sistem melakukan pemeriksaan berkala setiap jam untuk memastikan website resmi Pemerintah Kuningan dapat diakses dengan baik. Proses ini mencatat status HTTP dan waktu respon.',
    icon: 'i-lucide-laptop'
  },
  {
    date: '2',
    title: 'Analisis Performa',
    description: 'Setelah data dikumpulkan, sistem menghitung rata-rata waktu respon, mendeteksi pola anomali, serta menandai website yang mengalami penurunan performa signifikan.',
    icon: 'i-lucide-clipboard-check'
  },
  {
    date: '3',
    title: 'Penyimpanan & Laporan',
    description: 'Semua hasil pengecekan disimpan dalam database dan dapat diakses melalui dashboard interaktif.',
    icon: 'i-lucide-database'
  },
  {
    date: '4',
    title: 'Notifikasi Real-Time',
    description: 'Jika ditemukan error atau gangguan, sistem segera mengirimkan notifikasi otomatis ke grup Telegram admin agar penanganan dapat dilakukan dengan cepat.',
    icon: 'i-lucide-mail-warning'
  },
])
</script>

<template>
  <UPageHero
    title="Tahapan Kerja Kuningan SiteWell"
    description="Proses pemantauan website dilakukan secara otomatis dan berkala untuk memastikan kinerja optimal dan keamanan situs Anda."
    orientation="horizontal"
  >
    <UTimeline color="neutral" :default-value="4" :items="items" class="w-96" />
  </UPageHero>
</template>
