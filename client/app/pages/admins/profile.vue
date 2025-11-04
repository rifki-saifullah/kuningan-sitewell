<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'
import { useUserStore } from '~/stores/user'

definePageMeta({
  middleware: 'auth',
})

const userStore = useUserStore()
const toast = useToast()

// === Skema Validasi ===
const schemaProfile = z.object({
  username: z.string().min(1, 'Username wajib diisi'),
  email: z.string().email('Email tidak valid'),
})

const schemaPassword = z.object({
  current_password: z.string().min(1, 'Password lama wajib diisi'),
  new_password: z.string().min(6, 'Password baru minimal 6 karakter'),
})

type SchemaProfile = z.infer<typeof schemaProfile>
type SchemaPassword = z.infer<typeof schemaPassword>

// === State ===
const profileState = reactive({
  username: '',
  email: '',
})

const passwordState = reactive({
  current_password: '',
  new_password: '',
})

const loadingProfile = ref(false)
const loadingPassword = ref(false)

// === Prefill data profil user ===
onMounted(async () => {
  await userStore.fetchProfile()
  profileState.username = userStore.items.username
  profileState.email = userStore.items.email
})

// === Update profil ===
async function onSubmitProfile(event: FormSubmitEvent<SchemaProfile>) {
  loadingProfile.value = true
  await userStore.updateProfile(event.data)

  if (userStore.status === 200) {
    toast.add({
      title: 'Berhasil',
      description: 'Profil berhasil diperbarui.',
      color: 'success',
    })
  } else {
    toast.add({
      title: 'Gagal',
      description: userStore.error || 'Terjadi kesalahan saat memperbarui profil.',
      color: 'error',
    })
  }
  loadingProfile.value = false
}

// === Update password ===
async function onSubmitPassword(event: FormSubmitEvent<SchemaPassword>) {
  loadingPassword.value = true
  await userStore.updatePassword(event.data)

  if (userStore.status === 200) {
    toast.add({
      title: 'Berhasil',
      description: 'Password berhasil diperbarui.',
      color: 'success',
    })
    // Reset form
    passwordState.current_password = ''
    passwordState.new_password = ''
  } else {
    toast.add({
      title: 'Gagal',
      description: 'Password lama salah atau terjadi kesalahan.',
      color: 'error',
    })
  }
  loadingPassword.value = false
}
</script>

<template>
  <AppDashboard class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <UDashboardPanel>
      <template #header>
        <AppDashboardNavbar title="Profil" />
      </template>

      <template #body>
        <section class="container mx-auto px-4 py-8">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">

            <!-- PROFIL -->
            <UCard
              class="shadow-md rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950"
            >
              <template #header>
                <h2 class="text-xl font-semibold text-gray-800 dark:text-gray-100">
                  Informasi Profil
                </h2>
              </template>

              <UForm
                :schema="schemaProfile"
                :state="profileState"
                @submit="onSubmitProfile"
                class="space-y-5"
                autocomplete="off"
              >
                <UFormField label="Username" name="username">
                  <UInput v-model="profileState.username" class="w-full" placeholder="Masukkan username" />
                </UFormField>

                <UFormField label="Email" name="email">
                  <UInput v-model="profileState.email" class="w-full" placeholder="Masukkan email aktif" />
                </UFormField>

                <div class="flex justify-end">
                  <UButton :loading="loadingProfile" type="submit" color="primary">
                    Perbarui
                  </UButton>
                </div>
              </UForm>
            </UCard>

            <!-- PASSWORD -->
            <UCard
              class="shadow-md rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950"
            >
              <template #header>
                <h2 class="text-xl font-semibold text-gray-800 dark:text-gray-100">
                  Ubah Password
                </h2>
              </template>

              <UForm
                :schema="schemaPassword"
                :state="passwordState"
                @submit="onSubmitPassword"
                class="space-y-5"
                autocomplete="off"
              >
                <UFormField label="Password Lama" name="current_password">
                  <UInput
                    type="password"
                    v-model="passwordState.current_password"
                    autocomplete="new-password"
                    placeholder="Masukkan password lama"
                    class="w-full"
                  />
                </UFormField>

                <UFormField label="Password Baru" name="new_password">
                  <UInput
                    type="password"
                    v-model="passwordState.new_password"
                    autocomplete="new-password"
                    placeholder="Masukkan password baru"
                    class="w-full"
                  />
                </UFormField>

                <div class="flex justify-end">
                  <UButton :loading="loadingPassword" type="submit" color="primary">
                    Ubah Password
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
