<script setup lang="ts">
import { Motion } from "motion-v"
import type { TimelineItem } from "@nuxt/ui"

const items = ref<TimelineItem[]>([
  {
    date: "1",
    title: "Pengecekan Website Otomatis",
    description:
      "Sistem melakukan pemeriksaan berkala setiap jam untuk memastikan website resmi Pemerintah Kuningan dapat diakses dengan baik. Proses ini mencatat status HTTP dan waktu respon.",
    icon: "i-lucide-laptop",
  },
  {
    date: "2",
    title: "Analisis Performa",
    description:
      "Setelah data dikumpulkan, sistem menghitung rata-rata waktu respon, mendeteksi pola anomali, serta menandai website yang mengalami penurunan performa signifikan.",
    icon: "i-lucide-clipboard-check",
  },
  {
    date: "3",
    title: "Penyimpanan & Laporan",
    description:
      "Semua hasil pengecekan disimpan dalam database dan dapat diakses melalui dashboard interaktif.",
    icon: "i-lucide-database",
  },
  {
    date: "4",
    title: "Notifikasi Real-Time",
    description:
      "Jika ditemukan error atau gangguan, sistem segera mengirimkan notifikasi otomatis ke grup Telegram admin agar penanganan dapat dilakukan dengan cepat.",
    icon: "i-lucide-mail-warning",
  },
])
</script>

<template>
  <div class="flex justify-center overflow-x-hidden px-4">
    <Motion
      tag="div"
      class="max-w-5xl w-full"
      :initial="{ opacity: 0, y: 40 }"
      :animate="{ opacity: 1, y: 0 }"
      :transition="{ duration: 0.8, ease: 'easeOut' }"
    >
      <!-- Hero Section -->
      <UPageHero
        title="Tahapan Kerja Kuningan SiteWell"
        description="Proses pemantauan website dilakukan secara otomatis dan berkala untuk memastikan kinerja optimal dan keamanan situs Anda."
        orientation="horizontal"
      >
        <!-- Animasi untuk judul -->
        <template #title>
          <Motion
            tag="h2"
            class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white"
            :initial="{ opacity: 0, y: 20 }"
            :animate="{ opacity: 1, y: 0 }"
            :transition="{ delay: 0.2, duration: 0.7 }"
          >
            Tahapan Kerja Kuningan SiteWell
          </Motion>
        </template>

        <!-- Animasi untuk deskripsi -->
        <template #description>
          <Motion
            tag="p"
            class="text-gray-600 dark:text-gray-300 mt-2 max-w-3xl"
            :initial="{ opacity: 0, y: 30 }"
            :animate="{ opacity: 1, y: 0 }"
            :transition="{ delay: 0.4, duration: 0.7 }"
          >
            Proses pemantauan website dilakukan secara otomatis dan berkala
            untuk memastikan kinerja optimal dan keamanan situs Anda.
          </Motion>
        </template>

        <!-- Timeline Section -->
        <template #default>
          <Motion
            tag="div"
            class="mt-8 flex justify-center"
            :initial="{ opacity: 0, scale: 0.95 }"
            :animate="{ opacity: 1, scale: 1 }"
            :transition="{ delay: 0.6, duration: 0.8, ease: 'easeOut' }"
          >
            <UTimeline
              color="primary"
              :default-value="4"
              :items="items"
              class="w-full max-w-3xl"
            />
          </Motion>
        </template>
      </UPageHero>
    </Motion>
  </div>
</template>
