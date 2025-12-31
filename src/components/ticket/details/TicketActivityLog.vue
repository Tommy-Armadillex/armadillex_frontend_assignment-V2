<template>
  <q-card
    flat
    class="activity-section lg-radius bg-white"
  >
    <q-card-section class="border-bottom">
      <h5 class="q-mb-none q-mt-none text-16 text-font-semibold">
        Activity Log
      </h5>
    </q-card-section>

    <q-card-section>
      <section class="activity-items flex column">
        <article>
          <p class="q-mb-none text-12 text-info">Request created on</p>

          <p class="q-mb-none text-16">
            {{ formatDateByFormat(ticket.dateCreated, 'MMM d, yyyy · HH:mm') }}
          </p>
        </article>

        <article v-if="ticket.dateSubmitted">
          <p class="q-mb-none text-12 text-info">Request submitted on</p>

          <p class="q-mb-none text-16">
            {{
              formatDateByFormat(ticket.dateSubmitted, 'MMM d, yyyy · HH:mm')
            }}
          </p>
        </article>

        <article v-if="ticket.lastUserUpdate">
          <p class="q-mb-none text-12 text-info">Last user update</p>

          <p class="q-mb-none text-16">
            {{
              formatDateByFormat(ticket.lastUserUpdate, 'MMM d, yyyy · HH:mm')
            }}
          </p>
        </article>
      </section>
    </q-card-section>
  </q-card>
</template>

<script setup>
  import { formatDateByFormat } from 'src/services/helpers/util.helper'

  defineProps({
    ticket: {
      type: Object,
      required: true,
    },
  })
</script>

<style lang="scss">
  .activity-section {
    .activity-items {
      gap: 1rem;
    }
  }
</style>
