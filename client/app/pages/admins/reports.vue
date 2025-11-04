<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useWebsiteStore } from '~/stores/website'

definePageMeta({
  middleware: 'auth',
})

const websiteStore = useWebsiteStore()
const toast = useToast()

onMounted(async () => {
  const fetches = [
    websiteStore.getWebsiteAsc().catch(err => console.error('getWebsiteAsc failed:', err)),
    websiteStore.getWebsiteDesc().catch(err => console.error('getWebsiteDesc failed:', err)),
    websiteStore.getHealthyCount().catch(err => console.error('getHealthyCount failed:', err)),
    websiteStore.getResponseTimeWebsites().catch(err => console.error('getResponseTimeWebsites failed:', err)),
    websiteStore.getDownWebsites().catch(err => console.error('getDownWebsites failed:', err)),
  ]
  await Promise.all(fetches)
})

const topWebsites = computed(() => websiteStore.itemsAsc ?? [])
const bottomWebsites = computed(() => websiteStore.itemsDesc ?? [])
const healthyWebsites = computed(() => websiteStore.itemsHealthy ?? { healthy_websites: { total: 0, percent: 0 }, down_websites: { total: 0, percent: 0 } })
const responseTimes = computed(() => websiteStore.itemsResponseTime ?? { good: { count: 0, average: 0 }, poor: { count: 0, average: 0 } })
const downWebsites = computed(() => websiteStore.itemsDown ?? [])

const downloadPDF = async () => {
  try {
    await websiteStore.printReport()
  } catch (err) {
    toast.add({
      title: 'Gagal mengunduh',
      description: 'Terjadi kesalahan saat mengunduh, coba lagi nanti.',
      color: 'error',
    });
  }
}
</script>

<template>
  <AppDashboard class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <UDashboardPanel>
      <template #header>
        <AppDashboardNavbar title="Laporan Monitoring Website" />
      </template>

      <template #body>
        <section class="container mx-auto px-6 py-10">
          <div class="max-w-4xl mx-auto">
            <UCard
              class="rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 transition-all hover:shadow-xl"
            >
              <div class="flex items-center justify-between mb-6">
                <h1 class="text-2xl font-semibold text-gray-800 dark:text-gray-100">
                  Statistik Laporan
                </h1>
                <UButton
                  color="primary"
                  icon="i-heroicons-document-arrow-down"
                  :loading="websiteStore.isLoading"
                  @click="downloadPDF"
                >
                  Unduh PDF
                </UButton>
              </div>

              <!-- Statistik Kesehatan Website -->
              <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <UCard class="p-4 text-center">
                  <p class="text-sm text-gray-500">Total Sehat</p>
                  <h2 class="text-xl font-semibold text-emerald-600">
                    {{ healthyWebsites.healthy_websites.total }}
                  </h2>
                  <p class="text-xs text-gray-400">
                    {{ healthyWebsites.healthy_websites.percent }}%
                  </p>
                </UCard>

                <UCard class="p-4 text-center">
                  <p class="text-sm text-gray-500">Total Down</p>
                  <h2 class="text-xl font-semibold text-red-600 dark:text-red-400">
                    {{ healthyWebsites.down_websites.total }}
                  </h2>
                  <p class="text-xs text-gray-400">
                    {{ healthyWebsites.down_websites.percent }}%
                  </p>
                </UCard>

                <UCard class="p-4 text-center">
                  <p class="text-sm text-gray-500">Response Baik</p>
                  <h2 class="text-xl font-semibold text-emerald-600">
                    {{ responseTimes.good.count }}
                  </h2>
                  <p class="text-xs text-gray-400">
                    {{ responseTimes.good.average }} ms
                  </p>
                </UCard>

                <UCard class="p-4 text-center">
                  <p class="text-sm text-gray-500">Response Buruk</p>
                  <h2 class="text-xl font-semibold text-amber-600">
                    {{ responseTimes.poor.count }}
                  </h2>
                  <p class="text-xs text-gray-400">
                    {{ responseTimes.poor.average }} ms
                  </p>
                </UCard>
              </div>

              <!-- Top & Bottom Websites -->
              <div class="grid md:grid-cols-2 gap-6 mb-8">
                <div>
                  <h3 class="text-lg font-medium mb-3 text-gray-700 dark:text-gray-200">
                    🔼 Website dengan Respons Terbaik
                  </h3>
                  <ul class="space-y-2">
                    <li
                      v-for="website in topWebsites"
                      :key="website.id"
                      class="flex justify-between items-center p-3 bg-green-50 dark:bg-green-900/30 rounded-lg"
                    >
                      <span class="font-medium">{{ website.name }}</span>
                      <span class="text-sm text-gray-500">
                        {{ website.response_time }} ms
                      </span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 class="text-lg font-medium mb-3 text-gray-700 dark:text-gray-200">
                    🔽 Website dengan Respons Terburuk
                  </h3>
                  <ul class="space-y-2">
                    <li
                      v-for="website in bottomWebsites"
                      :key="website.id"
                      class="flex justify-between items-center p-3 bg-red-50 dark:bg-red-900/30 rounded-lg"
                    >
                      <span class="font-medium">{{ website.name }}</span>
                      <span class="text-sm text-gray-500">
                        {{ website.response_time }} ms
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              <!-- Daftar Website Down -->
              <div>
                <h3 class="text-lg font-medium mb-3 text-gray-700 dark:text-gray-200">
                  ⚠️ Website Sedang Down
                </h3>
                <AppTable v-if="downWebsites.length" :websites="downWebsites" />
                <p v-else class="text-gray-500 text-center">Tidak ada website down saat ini</p>
              </div>
            </UCard>
          </div>
        </section>
      </template>
    </UDashboardPanel>
  </AppDashboard>
</template>
