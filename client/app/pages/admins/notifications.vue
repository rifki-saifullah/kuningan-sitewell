<script setup lang="ts">
definePageMeta({
  middleware: "auth",
});

const config = useRuntimeConfig();

const telegramGroupLink = computed(() => {
  return config.public.telegramGroupLink;
});
</script>

<template>
  <AppDashboard class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <UDashboardPanel>
      <!-- Header -->
      <template #header>
        <AppDashboardNavbar title="Pesan" />
      </template>

      <!-- Body -->
      <template #body>
        <section class="container mx-auto px-4 py-10">
          <div class="flex flex-col items-center justify-center w-full max-w-3xl mx-auto space-y-8">
            <UCard
              class="w-full rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 transition-all hover:shadow-xl hover:border-primary/40"
            >
              <template #header>
                <div class="space-y-4">
                  <div class="flex flex-col md:flex-row md:items-center md:justify-between">
                    <h2
                      class="text-2xl font-semibold text-gray-800 dark:text-gray-100"
                    >
                      Grup Notifikasi Telegram
                    </h2>
                  </div>

                  <p class="text-gray-600 dark:text-gray-400 leading-relaxed">
                    Dapatkan notifikasi otomatis setiap kali ada perubahan status
                    website pemerintah. Sistem akan mengirimkan peringatan ke grup
                    Telegram ketika terdeteksi error atau waktu respon yang tidak
                    normal.
                  </p>

                  <div class="flex justify-center md:justify-start my-4">
                    <NuxtLink
                      to="https://t.me/+vK7mPx_tSsIzYjdl"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary-600 text-white font-medium hover:bg-primary-700 transition-all"
                    >
                      <Icon name="mdi:telegram" size="20" />
                      Bergabung ke Grup Telegram
                    </NuxtLink>
                  </div>

                </div>
              </template>
            </UCard>
          </div>
        </section>
      </template>
    </UDashboardPanel>
  </AppDashboard>
</template>