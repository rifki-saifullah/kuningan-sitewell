<script setup lang="ts">
definePageMeta({
  middleware: "auth",
});

const settings = reactive({
  interval: '1 jam',
  maxResponseTime: '5 detik',
  telegramBotKey: '',
  admins: ['admin1@kuningan.go.id', 'admin2@kuningan.go.id'],
})
</script>

<template>
  <AppDashboard class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <UDashboardPanel>
      <template #header>
        <AppDashboardNavbar title="Pengaturan Sistem" />
      </template>

      <template #body>
        <section class="container mx-auto px-4 py-10">
          <div class="max-w-3xl mx-auto">
            <UCard
              class="w-full rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 transition-all hover:shadow-xl"
            >
              <template #header>
                <h2 class="text-2xl font-semibold text-gray-800 dark:text-gray-100">
                  Pengaturan Monitoring
                </h2>
              </template>

              <div class="space-y-6 py-4">
                <div>
                  <label class="text-gray-700 dark:text-gray-300 font-medium">Interval Pengecekan</label>
                  <USelect
                    v-model="settings.interval"
                    :options="['30 menit', '1 jam', '2 jam']"
                    class="mt-2 w-full"
                  />
                </div>

                <div>
                  <label class="text-gray-700 dark:text-gray-300 font-medium">Batas Waktu Respon</label>
                  <UInput
                    v-model="settings.maxResponseTime"
                    placeholder="contoh: 5 detik"
                    class="mt-2 w-full"
                  />
                </div>

                <div>
                  <label class="text-gray-700 dark:text-gray-300 font-medium">Telegram Bot API Key</label>
                  <UInput
                    v-model="settings.telegramBotKey"
                    type="password"
                    placeholder="Masukkan token bot Telegram"
                    class="mt-2 w-full"
                  />
                </div>

                <div>
                  <label class="text-gray-700 dark:text-gray-300 font-medium">Admin Penerima Notifikasi</label>
                  <ul class="mt-2 space-y-1">
                    <li
                      v-for="admin in settings.admins"
                      :key="admin"
                      class="flex items-center justify-between bg-gray-50 dark:bg-gray-900 p-2 rounded-lg"
                    >
                      <span class="text-gray-700 dark:text-gray-300">{{ admin }}</span>
                      <Icon name="mdi:delete-outline" class="text-red-500 cursor-pointer" />
                    </li>
                  </ul>
                </div>

                <div class="pt-4 flex justify-end">
                  <UButton color="primary" icon="i-heroicons-check-circle">
                    Simpan Perubahan
                  </UButton>
                </div>
              </div>
            </UCard>
          </div>
        </section>
      </template>
    </UDashboardPanel>
  </AppDashboard>
</template>