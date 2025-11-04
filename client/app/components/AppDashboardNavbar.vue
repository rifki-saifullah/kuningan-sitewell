<script setup lang="ts">
import type { TabsItem } from '@nuxt/ui'
import { useAuthStore } from "~/stores/auth";

const toast = useToast();
const authStore = useAuthStore();

const props = defineProps<{
  title: string
}>()

const items: TabsItem[] = [
  {
    label: 'All',
    value: 'all'
  },
  {
    label: 'Unread',
    value: 'unread'
  }
]

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
  <UDashboardNavbar :title="props.title" class="">
    <template #leading>
      <UDashboardSidebarCollapse />
    </template>

    <!-- <template #trailing>
      <UBadge label="4" variant="subtle" />
    </template> -->

    <template #right>
      <UButton
        color="error"
        variant="ghost"
        @click="onSubmit"
      >
        Logout
      </UButton>
      <UColorModeButton />
    </template>
  </UDashboardNavbar>
</template>