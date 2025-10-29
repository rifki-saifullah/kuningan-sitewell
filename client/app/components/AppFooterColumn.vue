<script setup lang="ts">
import type { FooterColumn } from '@nuxt/ui'

const columns: FooterColumn[] = [
  {
    label: '',
    children: [
      {
        label: 'Kuningan',
        to: 'https://kuningankab.go.id',
        target: '_blank'
      },
      {
        label: 'DISKOMINFO Kuningan',
        to: 'https://diskominfo.kuningankab.go.id',
        target: '_blank'
      },
    ]
  },
]
</script>

<template>
  <UFooterColumns :columns="columns" class="md:px-8 pt-4 mt-8 border-t-2 border-t-neutral-200 dark:border-t-neutral-700">
    <template #right>
      <!-- <UFormField name="email" label="Subscribe to our newsletter" size="lg">
        <UInput type="email" class="w-full">
          <template #trailing>
            <UButton type="submit" size="xs" color="neutral" label="Subscribe" />
          </template>
        </UInput>
      </UFormField> -->
    </template>
  </UFooterColumns>
</template>
