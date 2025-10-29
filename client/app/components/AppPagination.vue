<script setup lang="ts">
const props = defineProps<{
  modelValue: number
  total: number
  totalPages?: number
}>()

const emit = defineEmits(['update:modelValue'])

const page = ref(props.modelValue)

// Sinkronisasi prop ↔ state internal
watch(() => props.modelValue, (val) => (page.value = val))

watch(page, (val) => emit('update:modelValue', val))
</script>

<template>
  <UPagination
    v-model:page="page"
    :total="total"
    :page-count="1"
    :pages="totalPages"
    class="my-4"
  />
</template>
