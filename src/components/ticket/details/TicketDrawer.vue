<template>
  <div
    :class="{ open: isDrawerOpen }"
    class="ticket-drawer-overlay"
    @click="closeDrawer"
  ></div>

  <q-drawer
    v-model="isDrawerOpen"
    side="right"
    persistent
    overlay
    :width="620"
    class="ticket-drawer"
    elevated
  >
    <main class="drawer-content">
      <ticket-details-tabs
        v-if="isDrawerOpen"
        :is-open="isDrawerOpen"
        :ticket="ticket"
        :is-loading="isLoading"
        :error="error"
        @close="closeDrawer"
        @retry="refetch"
      />
    </main>
  </q-drawer>
</template>

<script setup>
  import { computed, watch, onUnmounted } from 'vue'
  import { useTicketStore } from 'src/stores/ticket'

  import { useTicketQuery } from 'src/composables/ticket/useTicketQuery'

  import TicketDetailsTabs from 'src/components/ticket/details/TicketDetailsTabs.vue'

  const ticketStore = useTicketStore()
  const ticketId = computed(() => ticketStore.selectedTicketId)

  const { ticket, isLoading, error, refetch } = useTicketQuery(ticketId)
  const isDrawerOpen = computed(() => !!ticketId.value)

  // Prevent body scroll when drawer is open
  watch(isDrawerOpen, (isOpen) => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  })

  // Ensure body scroll is restored on unmount
  onUnmounted(() => {
    document.body.style.overflow = ''
  })

  function closeDrawer() {
    ticketStore.setSelectedTicketId(null)
  }
</script>

<style lang="scss">
  .ticket-drawer-overlay {
    position: fixed;
    top: 0;
    right: 0;
    width: 100vw;
    height: 100vh;
    background-color: $overlay-color;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.25s ease-in-out;
    z-index: 5000;
    &.open {
      opacity: 1;
      pointer-events: auto;
    }
  }

  .q-drawer-container {
    position: relative;
    z-index: 5000 !important;
  }

  .ticket-drawer {
    height: 100vh;
    background-color: $background-light;
  }
</style>
