<script setup lang="ts">
import { onMounted, computed, nextTick, ref, watch } from 'vue'
import { useWebsiteStore } from '~/stores/website'

definePageMeta({
  middleware: 'auth',
})

const websiteStore = useWebsiteStore()

// Loading state
const loading = ref(true)
const errorMsg = ref('')

// Ambil data saat halaman dimuat
onMounted(async () => {
  try {
    await Promise.all([
      websiteStore.getWebsiteAsc(),
      websiteStore.getHealthyCount(),
    ])
    await nextTick()
  } catch (err) {
    console.error('Gagal memuat data website:', err)
    errorMsg.value = 'Gagal memuat data'
  } finally {
    loading.value = false
  }
})

// === Data terurut ASC ===
const websitesAsc = computed(() =>
  Array.isArray(websiteStore.itemsAsc) && websiteStore.itemsAsc.length
    ? websiteStore.itemsAsc.map((w: { name: string }) => w.name)
    : []
)

const responseTimeAsc = computed(() =>
  Array.isArray(websiteStore.itemsAsc) && websiteStore.itemsAsc.length
    ? websiteStore.itemsAsc.map((w: { response_time: number }) => w.response_time)
    : []
)

// === Data kesehatan website (normal vs error) ===
const totalHealthy = computed(() => [
  websiteStore.itemsHealthy?.healthy_websites?.total ?? 0,
  websiteStore.itemsHealthy?.down_websites?.total ?? 0,
])

const label = ['Normal', 'Error']
</script>

<template>
  <AppDashboard class="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
    <UDashboardPanel>
      <template #header>
        <AppDashboardNavbar title="Dasbor" />
      </template>

      <template #body>
        <section class="flex flex-col md:gap-36 md:pb-38">
          <!-- Bar Chart & Doughnut Chart bagian atas -->
          <div class="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-6 h-auto md:h-[40vh]">
            <!-- Bar Chart (ASC) -->
            <div
              class="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 flex flex-col justify-center"
            >
              <template v-if="loading">
                <p class="text-center text-gray-500">Memuat data...</p>
              </template>
              <template v-else-if="errorMsg">
                <p class="text-center text-red-500">{{ errorMsg }}</p>
              </template>
              <template v-else>
                <AppBarChart
                  v-if="websitesAsc.length && responseTimeAsc.length"
                  title="3 Website dengan waktu response tercepat"
                  :websites="websitesAsc"
                  :responseTime="responseTimeAsc"
                  class="w-full h-full"
                />
                <p v-else class="text-center text-gray-500">Data ASC kosong</p>
              </template>
            </div>

            <!-- Doughnut Chart (Healthy vs Down) -->
            <div
              class="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 flex flex-col justify-center"
            >
              <AppDoughnutChart
                v-if="(totalHealthy[0] + totalHealthy[1]) > 0"
                title="Total website"
                :labels="label"
                :data="totalHealthy"
                :backgroundColors="['rgba(54, 162, 235, 0.5)', 'rgba(239, 68, 68, 0.5)']"
              />
              <p v-else class="text-center text-gray-500">Memuat data kesehatan...</p>
            </div>
          </div>
        </section>
      </template>
    </UDashboardPanel>
  </AppDashboard>
</template>
