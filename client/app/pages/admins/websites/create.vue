<script setup lang="ts">
import * as z from 'zod'
import { useWebsiteStore } from "~/stores/website";
import type { FormSubmitEvent } from '@nuxt/ui'

definePageMeta({
  middleware: "auth",
});

const websiteStore = useWebsiteStore();

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'Description is required'),
  url: z.string().url('Invalid URL'),
})

type Schema = z.infer<typeof schema>

const state = reactive({
  name: '',
  description: '',
  url: '',
})

const toast = useToast()

async function onSubmit(event: FormSubmitEvent<Schema>) {
  toast.add(state);

  await websiteStore.createWebsite(state);

  if (websiteStore.status === 201) {
    toast.add({ title: "Success", color: "success", description: "Success created website data!" });
  } else {
    toast.add({ title: "Error", color: "error", description: `Failed with status ${websiteStore.status} : ${websiteStore.error}` });
  }
}
</script>

<template>
  <AppDashboard class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <UDashboardPanel>
      <template #header>
        <AppDashboardNavbar title="Buat Situs Baru" />
      </template>

      <template #body>
        <section class="container mx-auto px-4 py-8">
          <div
            class="flex flex-col items-center justify-center w-full max-w-2xl mx-auto"
          >
            <UCard
              class="w-full shadow-md rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950"
            >
              <template #header>
                <h2
                  class="text-xl font-semibold text-gray-800 dark:text-gray-100 text-center md:text-left"
                >
                  Buat Situs Baru
                </h2>
              </template>

              <UForm
                :schema="schema"
                :state="state"
                @submit="onSubmit"
                class="space-y-5"
              >
                <!-- Name -->
                <UFormField label="Nama" name="name">
                  <UInput
                    v-model="state.name"
                    class="w-full"
                    placeholder="Masukkan nama situs web"
                  />
                </UFormField>

                <!-- Description -->
                <UFormField label="Deskripsi" name="description">
                  <UTextarea
                    v-model="state.description"
                    class="w-full"
                    placeholder="Jelaskan tentang situs web ini"
                  />
                </UFormField>

                <!-- URL -->
                <UFormField label="URL" name="url">
                  <UInput
                    v-model="state.url"
                    class="w-full"
                    placeholder="https://contoh.com"
                  />
                </UFormField>

                <!-- Actions -->
                <div
                  class="flex flex-wrap justify-end gap-4 pt-6 border-t border-gray-200 dark:border-gray-800"
                >
                  <UButton type="submit" color="primary" size="lg">
                    Buat  
                  </UButton>
                </div>
              </UForm>
            </UCard>
          </div>
        </section>
      </template>
    </UDashboardPanel>
  </AppDashboard>
</template>