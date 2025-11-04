<script setup lang="ts">
import { h, resolveComponent, ref } from 'vue'
import type { TableColumn } from '@nuxt/ui'

const props = defineProps<{
  websites: Website[]
}>()

const websiteStore = useWebsiteStore()
const UBadge = resolveComponent('UBadge')

const currentPage = computed(() => websiteStore.currentPage)
const size = 10;

type Website = {
  id: string
  name: string
  description: string
  url: string
  is_healthy: number
  response_time: number
  status_code: number
  message: 'normal' | 'warning' | 'critical'
  created_at: string
  updated_at: string
}

const data = ref<Website[]>(props.websites || [])


const columns: TableColumn<Website>[] = [
  {
  header: 'No.',
  cell: ({ row }) => {
    return (currentPage.value - 1) * size + row.index + 1
    },
  },
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) =>
      h(
        resolveComponent('NuxtLink'),
        { 
          to: `/admins/websites/${row.getValue('id')}`,
          class: 'text-blue-600 hover:underline'
        },
        () => row.getValue('name')
      )
  },
  {
    accessorKey: 'is_healthy',
    header: 'Dapat Diakses',
    cell: ({ row }) => {
      const isHealthy = row.getValue('is_healthy') as boolean

      const color = isHealthy ? 'success' : 'error'

      return h(
        UBadge,
        { class: 'capitalize', variant: 'subtle', color },
        () => isHealthy ? 'Ya' : 'Tidak'
      )
    }
  },
  {
    accessorKey: 'url',
    header: 'URL',
    cell: ({ row }) => {
      const url = row.getValue('url') as string;

      return h(
        'a',
        {
          href: url,
          target: '_blank',
          rel: 'noopener noreferrer',
          class: 'text-blue-600 hover:underline'
        },
        url
      )
    }
  },
  {
    accessorKey: 'status_code',
    header: 'Kode Status',
  },
  {
    accessorKey: 'message',
    header: 'Keterangan',
  },
  {
    accessorKey: 'description',
    header: 'Deskripsi',
  },
  {
    accessorKey: 'id',
    header: 'Id',
  },
  {
    accessorKey: 'updated_at',
    header: 'Diperbarui Pada',
    cell: ({ row }) => {
      return new Date(row.getValue('updated_at')).toLocaleString('id-ID', {
        day: '2-digit',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      })
    }
  }
]
</script>

<template>
  <UTable :data="data" :columns="columns" class="flex-1" />
</template>
