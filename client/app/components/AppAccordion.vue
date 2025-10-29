<script setup lang="ts">
const items = ref([
  {
    label: 'Apa itu Kuningan SiteWell?',
    content: 'Kuningan SiteWell adalah platform pemantauan website pemerintah daerah yang berfungsi untuk memeriksa ketersediaan, waktu respon, dan error pada situs-situs resmi milik Kabupaten Kuningan secara otomatis setiap jam.'
  },
  {
    label: 'Apakah sistem ini membebani website yang dipantau?',
    content: 'Tidak. Sistem hanya melakukan permintaan ringan menggunakan metode HTTP HEAD untuk mengecek status dan waktu respon server. Proses ini tidak mengunduh seluruh halaman sehingga tidak menambah beban signifikan pada website yang dipantau.'
  },
  {
    label: 'Data hasil pemantauan dikirim ke mana?',
    content: 'Semua hasil pengecekan disimpan secara aman di server internal pemerintah dan juga dikirim ke grup Telegram admin melalui bot agar notifikasi dapat diterima secara real-time.'
  }
])
</script>

<template>
  <UAccordion class="mb-8 md:px-32" :items="items" />
</template>
