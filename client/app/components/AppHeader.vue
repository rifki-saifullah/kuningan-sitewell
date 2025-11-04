<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'
import { useAuthStore } from "~/stores/auth";

const toast = useToast();
const route = useRoute()
const authStore = useAuthStore();


const items = computed<NavigationMenuItem[]>(() => [
  {
    label: 'Admin',
    to: '/admins',
    icon: 'i-lucide-user',
    active: route.path === "/admins",
    class: { 'hidden': authStore.isAuthenticated === false },
  },
  {
    label: 'Login',
    to: '/login',
    icon: 'i-lucide-log-in',
    active: route.path === "/login",
    class: { 'hidden': authStore.isAuthenticated === true },
  },
  {
    label: 'Logout',
    icon: 'i-lucide-log-out',
    onClick: onSubmit,
    class: { 'hidden': authStore.isAuthenticated === false },
  }
]);


async function onSubmit(payload: any) {
  await authStore.logout();

  if (authStore.status === 200) {
    toast.add({ title: "Success", color: "success", description: "Logout successful!" });
  } else {
    toast.add({ title: "Error", color: "error", description: `Failed with status ${authStore.status} : ${authStore.error}` });
  }
}
</script>

<template>
  <UHeader>
    <template #title>
      <img src="/logo.png" alt="Logo" class="w-20" />
    </template>

    <!-- <UNavigationMenu :items="items" /> -->

    <template #right>
      <UColorModeButton />

      <UButton 
        v-if="!authStore.isAuthenticated"
        class="hidden md:inline-flex"
        color="primary"
        variant="ghost"
        icon="i-lucide-log-in"
        to="/login"
      >
        Login
      </UButton>

      <UButton 
        v-if="authStore.isAuthenticated"
        class="hidden md:inline-flex"
        color="primary"
        variant="ghost"
        icon="i-lucide-user"
        to="/admins"
      >
        Admin
      </UButton>

      <!-- Logout Button -->
      <UButton
        v-if="authStore.isAuthenticated"
        class="hidden md:inline-flex"
        color="error"
        variant="ghost"
        icon="i-lucide-log-out"
        @click="onSubmit"
      >
        Logout
      </UButton>
    </template>

    <template #body>
      <UNavigationMenu :items="items" orientation="vertical" class="-mx-2.5" />
    </template>
  </UHeader>
</template>