<script setup lang="ts">
import { useWebsiteStore } from '~/stores/website'

definePageMeta({
  middleware: 'auth',
})

const websiteStore = useWebsiteStore()
const route = useRoute()
const router = useRouter()

// --- Reactive page number dari query URL ---
const page = ref(Number(route.query.page) || 1)

// --- Fetch data saat pertama kali dimuat ---
onMounted(async () => {
  websiteStore.isLoading = true
  try {
    await websiteStore.getWebsites(page.value)
  } finally {
    websiteStore.isLoading = false
  }
})

// --- Reaktif ke perubahan halaman ---
watch(page, async (newPage) => {
  router.replace({ query: { page: newPage } })
  websiteStore.isLoading = true
  try {
    await websiteStore.getWebsites(newPage)
  } finally {
    websiteStore.isLoading = false
  }
})

// --- Data websites dari store ---
const websites = computed(() => websiteStore.items ?? [])
</script>

<template>
  <AppDashboard class="min-h-screen">
    <UDashboardPanel>
      <template #header>
        <AppDashboardNavbar title="Daftar Situs Web" />
      </template>

      <template #body>
        <h1 class="m-auto">Daftar Situs Pemerintah Kabupaten Kuningan</h1>
        <div class="flex flex-col gap-6 px-6">

          <!-- Pagination -->
          <div class="md:hidden flex justify-center">
            <AppPagination
              v-model="page"
              :total="websiteStore.total"
              :total-pages="websiteStore.totalPages"
            />
          </div>

          <!-- Loading State -->
          <div v-if="websiteStore.isLoading" class="flex justify-center py-16">
            <div class="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
          </div>

          <!-- Data Table -->
          <AppTable
            v-else-if="websites.length"
            :websites="websites"
          />

          <!-- Empty State -->
          <p v-else class="text-center text-gray-500 dark:text-gray-400">
            Tidak ada data website.
          </p>

          <!-- Pagination -->
          <div class="hidden md:flex justify-center">
            <AppPagination
              v-model="page"
              :total="websiteStore.total"
              :total-pages="websiteStore.totalPages"
            />
          </div>
        </div>
      </template>
    </UDashboardPanel>
  </AppDashboard>
</template>
