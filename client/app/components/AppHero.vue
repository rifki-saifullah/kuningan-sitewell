<script setup>
import { Motion } from "motion-v"
</script>

<template>
  <div class="overflow-hidden">
    <Motion
      tag="div"
      :initial="{ opacity: 0, y: 30 }"
      :animate="{ opacity: 1, y: 0 }"
      :transition="{ duration: 0.8, ease: 'easeOut' }"
    >
      <UPageHero>
        <!-- Headline -->
        <template #headline>
          <Motion
            tag="span"
            class="inline-block text-primary font-semibold"
            :initial="{ opacity: 0, y: -10 }"
            :animate="{ opacity: 1, y: 0 }"
            :transition="{ delay: 0.2, duration: 0.6, ease: 'easeOut' }"
            :whileHover="{ scale: 1.05, rotate: 2 }"
          >
            V. 1.0.0
          </Motion>
        </template>

        <!-- Title -->
        <template #title>
          <Motion
            tag="h1"
            class="text-5xl font-bold text-gray-900 dark:text-white"
            :initial="{ opacity: 0, y: 20 }"
            :animate="{ opacity: 1, y: 0 }"
            :transition="{ delay: 0.4, duration: 0.7, ease: 'easeOut' }"
          >
            Kuningan SiteWell
          </Motion>
        </template>

        <!-- Description -->
        <template #description>
          <Motion
            tag="p"
            class="max-w-2xl text-gray-600 dark:text-gray-300 mt-4 m-auto"
            :initial="{ opacity: 0, y: 30 }"
            :animate="{ opacity: 1, y: 0 }"
            :transition="{ delay: 0.6, duration: 0.8, ease: 'easeOut' }"
          >
            Dapatkan laporan dan notifikasi real-time untuk memantau kesehatan
            website pemerintah Kabupaten Kuningan. Tingkatkan responsivitas dan
            efisiensi tim IT Anda dengan solusi kami yang andal dan mudah digunakan.
          </Motion>
        </template>
      </UPageHero>
    </Motion>
  </div>
</template>
