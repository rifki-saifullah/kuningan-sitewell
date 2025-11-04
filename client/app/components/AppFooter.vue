<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const items: NavigationMenuItem[] = [
  {
    label: '',
    to: '',
    target: '_blank'
  },
];
</script>

<template>
  <UFooter>
    <!-- <template #right>
      <p class="text-muted text-sm">Copyright © {{ new Date().getFullYear() }}</p>
    </template> -->

    <p class="text-muted text-sm"> © 2025 Kuningan SiteWell — Dinas Komunikasi dan Informatika Kabupaten Kuningan </p>
    <UNavigationMenu :items="items" variant="link" />

    <!-- <template #right>
      <UButton
        icon="i-simple-icons-github"
        color="neutral"
        variant="ghost"
        to="https://github.com/nuxt/nuxt"
        target="_blank"
        aria-label="GitHub"
      />
    </template> -->
  </UFooter>
</template>