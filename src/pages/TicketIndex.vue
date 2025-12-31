<template>
  <q-page class="tickets-page">
    <basic-error
      v-if="ticketStore.error"
      :message="'Failed to load tickets.'"
      @retry="ticketStore.refetch"
    />

    <basic-loader v-else-if="ticketStore.isLoading" />

    <main
      v-else-if="ticketStore.allTickets && ticketStore.allTickets.length > 0"
      class="tickets-page-content"
    >
      <div class="tickets-layout">
        <ticket-directory-nav class="tickets-nav" />

        <div class="tickets-main">
          <ticket-filter />

          <ticket-table />
        </div>
      </div>
    </main>
  </q-page>
</template>

<script setup>
  import { useTicketStore } from 'src/stores/ticket'

  import TicketDirectoryNav from 'src/components/ticket/index/TicketDirectoryNav.vue'
  import TicketFilter from 'src/components/ticket/index/TicketFilter.vue'
  import TicketTable from 'src/components/ticket/index/TicketTable.vue'

  const ticketStore = useTicketStore()
</script>

<style lang="scss">
  @import 'src/css/setup/_globals.scss';
  .tickets-page {
    padding: 0 $layout-padding;
    max-width: $large-screen;

    .tickets-page-content {
      height: calc(100vh - $header-height - $layout-padding);
      max-height: 1050px;
      padding-bottom: $layout-padding;

      .tickets-layout {
        display: grid;
        grid-template-columns: 200px 1fr;
        gap: $layout-padding;
        height: 100%;
        .tickets-main {
          display: grid;
          grid-template-rows: auto 1fr;
          min-height: 0;
        }
      }
    }
  }
</style>
