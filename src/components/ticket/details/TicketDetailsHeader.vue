<template>
  <header class="ticket-header flex items-center bg-brand q-px-md q-py-sm">
    <div class="ticket-info flex items-center justify-between full-width">
      <div
        class="ticket-title-container flex col items-center q-gutter-sm q-pr-lg"
      >
        <company-avatar
          v-if="!isLoading && !error"
          :website="ticket?.website"
          size="44px"
          :alt="`${ticket?.companyName} logo`"
        />

        <div
          v-if="!isLoading && !error"
          class="ticket-title-text col"
        >
          <p
            class="overflow-hidden ellipsis text-18 text-white text-font-medium"
          >
            {{ ticket?.productName }}
          </p>

          <p class="overflow-hidden ellipsis text-14 text-white">
            {{ ticket?.companyName }}
          </p>
        </div>
      </div>

      <div class="flex items-center q-gutter-sm">
        <q-badge
          v-if="!isLoading && !error"
          :color="combinedStatus.color"
          class="status-badge q-px-md q-py-xs text-16 text-capitalize"
        >
          <lucide-icon
            :name="combinedStatus.icon"
            size="18px"
            :color="isApprovedOrDenied ? 'white' : 'primary'"
            class="q-mr-xs"
          />

          <span :class="isApprovedOrDenied ? 'text-white' : 'text-primary'">
            {{ combinedStatus.label }}
          </span>
        </q-badge>

        <q-btn
          unelevated
          dense
          flat
          round
          color="white"
          @click="emit('close')"
        >
          <lucide-icon
            name="x-icon"
            size="24px"
          />
        </q-btn>
      </div>
    </div>
  </header>
</template>

<script setup>
  import { computed } from 'vue'

  import { getCombinedTicketStatus } from 'src/services/helpers/ticket.helper'

  const emit = defineEmits(['close'])

  const props = defineProps({
    ticket: {
      type: Object,
      required: false,
      default: null,
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
    error: {
      type: Object,
      default: null,
    },
  })

  const combinedStatus = computed(() => {
    if (!props.ticket) return { color: 'accent', icon: 'file-text', label: '' }
    return getCombinedTicketStatus(
      props.ticket.ticketStatus,
      props.ticket.approved
    )
  })

  const isApprovedOrDenied = computed(() => {
    if (!props.ticket) return false
    return props.ticket.approved === true || props.ticket.approved === false
  })
</script>

<style lang="scss">
  .ticket-header {
    flex-shrink: 0;
    height: calc($header-height - 0.5rem);

    .ticket-title-container,
    .ticket-title-text {
      min-width: 0;
    }

    .status-badge {
      border-radius: 1rem;
    }
  }
</style>
