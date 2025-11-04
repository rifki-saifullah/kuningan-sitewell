<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const items: NavigationMenuItem[][] = [[{
  label: 'Dasbor',
  icon: 'i-lucide-layout-dashboard',
  to: '/admins',
}, {
  label: 'Situs',
  icon: 'i-lucide-computer',
  defaultOpen: true,
  children: [{
    label: 'Daftar',
    to: '/admins/websites',
  }, {
    label: 'Baru',
    to: '/admins/websites/create',
  },
]}, {
  label: 'Grup',
  icon: 'i-lucide-users-round',
  to: '/admins/notifications',
}, {
  label: 'Laporan',
  icon: 'i-lucide-clipboard-list',
  to: '/admins/reports',
},{
  label: 'Tentang',
  icon: 'i-lucide-info',
  to: '/admins/about',
} ,
], [{
  label: 'Kuningan',
  icon: 'i-lucide-layout-grid',
  to: 'https://www.kuningankab.go.id',
  target: '_blank'
}, {
  label: 'DISKOMINFO',
  icon: 'i-lucide-layout-dashboard',
  to: 'https://diskominfo.kuningankab.go.id',
  target: '_blank'
}, {
  label: 'GitHub',
  icon: 'i-lucide-github',
  to: 'https://github.com/rifki-saifullah/kuningan-sitewell',
  target: '_blank'
}]]
</script>

<template>
  <UDashboardSidebar collapsible resizable :ui="{ footer: 'border-t border-default' }">
    <template #header="{ collapsed }">
      <NuxtLink to="/" class="w-full flex justify-center">
        <img src="/logo.png" alt="Logo" class="w-16" />
      </NuxtLink>
    </template>

    <template #default="{ collapsed }">
      <!-- <UButton
        :label="collapsed ? undefined : 'Search...'"
        icon="i-lucide-search"
        color="neutral"
        variant="outline"
        block
        :square="collapsed"
      >
        <template v-if="!collapsed" #trailing>
          <div class="flex items-center gap-0.5 ms-auto">
            <UKbd value="meta" variant="subtle" />
            <UKbd value="K" variant="subtle" />
          </div>
        </template>
      </UButton> -->


      <UNavigationMenu
        :collapsed="collapsed"
        :items="items[0]"
        orientation="vertical"
      />

      <UNavigationMenu
        :collapsed="collapsed"
        :items="items[1]"
        orientation="vertical"
        class="mt-auto"
      />      
    </template>

    <template #footer="{ collapsed }">
      <UButton
        to="/admins/profile" 
        :avatar="{
          src: '',
          alt: 'Profil',
        }"
        :label="collapsed ? undefined : 'Profil'"
        color="neutral"
        variant="ghost"
        class="w-full"
        :block="collapsed"
      />
    </template>
  </UDashboardSidebar>
</template>


