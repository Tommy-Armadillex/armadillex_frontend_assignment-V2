<template>
  <q-layout view="lHh Lpr lFf">
    <app-header :is-loading="iaAppLoading" />

    <app-drawer :is-loading="iaAppLoading" />

    <q-page-container>
      <router-view />
    </q-page-container>

    <ticket-drawer />
  </q-layout>
</template>

<script setup>
  import { computed } from 'vue'

  import { useTicketStore } from 'src/stores/ticket'

  import AppHeader from 'src/components/layout/AppHeader.vue'
  import AppDrawer from 'src/components/layout/AppDrawer.vue'
  import TicketDrawer from 'src/components/ticket/details/TicketDrawer.vue'

  const ticketStore = useTicketStore()

  const iaAppLoading = computed(() => ticketStore.isLoading)
</script>

<style lang="scss">
  @import 'src/css/setup/_globals.scss';
  .loading-page {
    padding: $layout-padding;
    max-width: $large-screen;
  }
</style>
