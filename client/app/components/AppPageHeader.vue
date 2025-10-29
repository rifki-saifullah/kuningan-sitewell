<script setup lang="ts">
import { isPropertyAccessOrQualifiedName } from 'typescript';

const props = defineProps({
  title: {
    type: String,
    null: true,
  },
  description: {
    type: String,
    null: true,
  },
})
</script>

<template>
  <UPageHeader
    :title="props.title"
    :description="props.description"
    class="md:mx-32"
  />
</template>
