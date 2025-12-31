<template>
  <section class="basic-loading-state">
    <q-spinner
      :size="size"
      :color="color"
    />
  </section>
</template>

<script setup>
  defineProps({
    color: {
      type: String,
      default: 'brand-dark',
    },
    size: {
      type: String,
      default: '100px',
    },
  })
</script>

<style lang="scss">
  .basic-loading-state {
    display: grid;
    place-items: center;
    min-height: calc(100vh - $header-height - $layout-padding * 4);
  }
</style>
