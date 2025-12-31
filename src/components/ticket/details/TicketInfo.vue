<template>
  <section class="ticket-info">
    <ticket-request-info :ticket="ticket" />

    <ticket-activity-log :ticket="ticket" />
  </section>
</template>

<script setup>
  import TicketRequestInfo from 'components/ticket/details/TicketRequestInfo.vue'
  import TicketActivityLog from 'components/ticket/details/TicketActivityLog.vue'

  defineProps({
    ticket: {
      type: Object,
      required: true,
    },
  })
</script>
