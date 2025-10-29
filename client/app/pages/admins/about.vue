<script setup lang="ts">
definePageMeta({
  middleware: "auth",
});

</script>

<template>
  <AppDashboard class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <UDashboardPanel>
      <template #header>
        <AppDashboardNavbar title="Tentang Sistem" />
      </template>

      <template #body>
        <section class="container mx-auto px-4 py-10">
          <div class="max-w-3xl mx-auto">
            <UCard
              class="w-full rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 transition-all hover:shadow-xl"
            >
              <template #header>
                <h2 class="text-2xl font-semibold text-gray-800 dark:text-gray-100">
                  Kuningan SiteWell Monitoring
                </h2>
              </template>

              <div class="space-y-6 text-gray-700 dark:text-gray-300 leading-relaxed">
                <p>
                  <strong>Kuningan SiteWell</strong> adalah platform yang berfungsi untuk
                  memantau kondisi website-website milik Pemerintah Kabupaten Kuningan.
                  Sistem ini memastikan setiap situs pemerintah dapat diakses dengan baik
                  dan memberikan notifikasi otomatis ketika terjadi error atau gangguan.
                </p>

                <p>
                  Setiap jam, sistem melakukan pengecekan otomatis terhadap semua website
                  yang terdaftar. Hasilnya ditampilkan dalam dashboard interaktif dan
                  dikirim ke grup Telegram admin melalui bot terintegrasi.
                </p>

                <div class="grid md:grid-cols-2 gap-6 pt-4">
                  <div class="flex items-center space-x-3">
                    <Icon name="mdi:clock-outline" class="text-primary-500" size="24" />
                    <div>
                      <h3 class="font-semibold">Pemantauan Otomatis</h3>
                      <p class="text-sm text-gray-500 dark:text-gray-400">
                        Sistem bekerja tanpa henti memeriksa status website.
                      </p>
                    </div>
                  </div>

                  <div class="flex items-center space-x-3">
                    <Icon name="mdi:bell-outline" class="text-primary-500" size="24" />
                    <div>
                      <h3 class="font-semibold">Notifikasi Real-Time</h3>
                      <p class="text-sm text-gray-500 dark:text-gray-400">
                        Notifikasi langsung dikirim ke Telegram admin saat ada error.
                      </p>
                    </div>
                  </div>

                  <div class="flex items-center space-x-3">
                    <Icon name="mdi:chart-line" class="text-primary-500" size="24" />
                    <div>
                      <h3 class="font-semibold">Laporan Uptime</h3>
                      <p class="text-sm text-gray-500 dark:text-gray-400">
                        Statistik uptime dan error disajikan dalam grafik rapi.
                      </p>
                    </div>
                  </div>

                  <div class="flex items-center space-x-3">
                    <Icon name="mdi:shield-check-outline" class="text-primary-500" size="24" />
                    <div>
                      <h3 class="font-semibold">Keamanan Data</h3>
                      <p class="text-sm text-gray-500 dark:text-gray-400">
                        Semua koneksi terenkripsi dan hanya admin resmi yang bisa mengakses.
                      </p>
                    </div>
                  </div>
                </div>

                <div class="pt-6 text-center">
                  <p class="text-sm text-gray-500 dark:text-gray-400">
                    © 2025 Kuningan SiteWell — Dinas Komunikasi dan Informatika Kabupaten Kuningan
                  </p>
                </div>
              </div>
            </UCard>
          </div>
        </section>
      </template>
    </UDashboardPanel>
  </AppDashboard>
</template>