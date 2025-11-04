<script setup lang="ts">
import { useWebsiteStore } from '~/stores/website'
import type { FormSubmitEvent } from '@nuxt/ui'
import * as z from 'zod'

definePageMeta({
  middleware: 'auth',
})

const websiteStore = useWebsiteStore()
const route = useRoute()
const router = useRouter()
const toast = useToast()

const websiteInformation = reactive({
  name: "",
  description: "",
  url: "",
})

const websiteDetail = reactive({
  is_healthy: "",
  response_time: "",
  status_code: "",
  message: "",
  created_at: "",
  updated_at: "",
})

onMounted(async () => {
  const websiteId = route.params.id as string
  await websiteStore.findWebsite(websiteId)

  if (websiteStore.items) {
    const website = websiteStore.items
    websiteInformation.name = website.name
    websiteInformation.description = website.description
    websiteInformation.url = website.url

    websiteDetail.is_healthy = website.is_healthy ? 'Ya' : 'Tidak'
    websiteDetail.response_time = website.response_time.toString()
    websiteDetail.status_code = website.status_code.toString()
    websiteDetail.message = website.message
    websiteDetail.created_at = dateFormat(website.created_at)
    websiteDetail.updated_at = dateFormat(website.updated_at)
  }
})

function dateFormat(dateString: string) {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }
  return new Date(dateString).toLocaleDateString('id-ID', options)
}

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'Description is required'),
  url: z.string().url('Invalid URL'),
})

type Schema = z.infer<typeof schema>

async function onSubmit(event: FormSubmitEvent<Schema>) {
  const websiteId = route.params.id as string

  await websiteStore.updateWebsite(websiteId, event.data)

  if (websiteStore.status === 200) {
    toast.add({
      title: 'Berhasil',
      description: 'Data situs berhasil diperbarui.',
      color: 'success',
    })
  } else {
    toast.add({
      title: 'Gagal',
      description: websiteStore.error || 'Tidak dapat memperbarui data situs.',
      color: 'error',
    })
  }
}

async function onDelete() {
  const websiteId = route.params.id as string

  try {
    await websiteStore.deleteWebsite(websiteId)
    toast.add({
      title: 'Dihapus',
      description: 'Data situs telah dihapus.',
      color: 'error',
    })
  } catch (error) {
    toast.add({
      title: 'Gagal',
      description: 'Tidak dapat menghapus data situs.',
      color: 'error',
    })
  }
}
</script>

<template>
  <AppDashboard class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <UDashboardPanel>
      <template #header>
        <AppDashboardNavbar :title="`Situs ${websiteInformation.name}`" />
      </template>

      <template #body>
        <section class="container mx-auto p-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <UCard class="shadow-md">
              <template #header>
                <h2 class="text-lg font-medium">Informasi Situs</h2>
              </template>

              <UForm
                :schema="schema"
                :state="websiteInformation"
                @submit="onSubmit"
                class="space-y-4"
              >
                <UFormField label="Nama" name="name">
                  <UInput v-model="websiteInformation.name" class="w-full" />
                </UFormField>

                <UFormField label="Deskripsi" name="description">
                  <UTextarea v-model="websiteInformation.description" class="w-full" />
                </UFormField>

                <UFormField label="URL" name="url">
                  <UInput v-model="websiteInformation.url" class="w-full" />
                </UFormField>

                <div class="flex flex-wrap gap-4 justify-end pt-4">
                  <UButton type="submit" color="primary" variant="subtle" >
                    Ubah
                  </UButton>
                  <UModal :title="`Hapus Situs ${websiteInformation.name}`" description="">
                    <UButton label="Hapus" color="error" variant="subtle" />
                    <template #body>
                      <span class="flex flex-col gap-4">
                        <p>Apakah Anda yakin ingin menghapus situs ini? Tindakan ini tidak dapat dibatalkan.</p>
                        <UButton class="w-fit self-center" color="error" variant="soft" @click="onDelete">
                          Hapus
                        </UButton>
                      </span>
                    </template>
                  </UModal>
                </div>
              </UForm>
            </UCard>

            <UCard class="shadow-md">
              <template #header>
                <h2 class="text-lg font-medium">Informasi Status</h2>
              </template>

              <div class="space-y-4">
                <UFormField label="Dapat Diakses">
                  <UInput disabled v-model="websiteDetail.is_healthy" class="w-full" />
                </UFormField>

                <UFormField label="Waktu Respon (ms)">
                  <UInput disabled v-model="websiteDetail.response_time" class="w-full" />
                </UFormField>

                <UFormField label="Kode Status">
                  <UInput disabled v-model="websiteDetail.status_code" class="w-full" />
                </UFormField>

                <UFormField label="Keterangan">
                  <UInput disabled v-model="websiteDetail.message" class="w-full" />
                </UFormField>

                <UFormField label="Dibuat Pada">
                  <UInput disabled v-model="websiteDetail.created_at" class="w-full" />
                </UFormField>

                <UFormField label="Diperbarui Pada">
                  <UInput disabled v-model="websiteDetail.updated_at" class="w-full" />
                </UFormField>
              </div>
            </UCard>
          </div>
        </section>
      </template>
    </UDashboardPanel>
  </AppDashboard>
</template>
