<template>
  <q-page class="home-page">
    <basic-loader v-if="ticketStore.isLoading" />
    <basic-error
      v-else-if="ticketStore.error"
      :message="ticketStore.error.message"
      @retry="ticketStore.refetch"
    />
    <main
      class="flex items-center justify-center bg-white lg-radius q-pa-lg"
      v-if="!ticketStore.isLoading"
    >
      <h1 class="text-h3 text-font-bold text-center q-mb-md">
        Hello, Welcome to
        <span class="text-brand block">Armadillex's</span>
        Tech Assignment
      </h1>
    </main>
  </q-page>
</template>

<script setup>
  import { useTicketStore } from 'src/stores/ticket'
  const ticketStore = useTicketStore()
  // Welcome page
</script>

<style lang="scss">
  @import 'src/css/setup/_globals.scss';

  .home-page {
    padding: 0 $layout-padding;
    max-width: $large-screen;

    main {
      height: calc(100vh - $header-height - $layout-padding);
      max-height: 1050px;
    }
  }
</style>
