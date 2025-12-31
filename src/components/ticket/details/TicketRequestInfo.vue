<template>
  <q-card
    flat
    class="status-card lg-radius bg-white q-mb-lg"
    :class="`status-${statusConfig.type}`"
  >
    <q-card-section class="border-bottom">
      <h5 class="q-mb-none q-mt-none text-16 text-font-semibold">
        Request Information
      </h5>

      <p
        v-if="statusConfig.message"
        class="q-mt-xs q-mb-none text-14 text-info"
      >
        <lucide-icon
          name="info"
          size="14px"
          color="accent-dark"
          class="info-icon"
        />
        {{ statusConfig.message }}
      </p>
    </q-card-section>

    <q-card-section>
      <q-list class="details-list">
        <q-item class="detail-item">
          <q-item-section avatar>
            <div
              class="detail-icon-container bg-border flex items-center justify-center sm-radius"
            >
              <lucide-icon
                name="package"
                color="brand"
                size="20px"
              />
            </div>
          </q-item-section>

          <q-item-section>
            <p class="text-12 text-info">Requested product</p>

            <p class="text-16">{{ ticket.productName }}</p>
          </q-item-section>
        </q-item>

        <q-item class="detail-item">
          <q-item-section avatar>
            <div
              class="detail-icon-container bg-border flex items-center justify-center sm-radius"
            >
              <lucide-icon
                name="briefcase"
                color="brand"
                size="20px"
              />
            </div>
          </q-item-section>

          <q-item-section>
            <p class="text-12 text-info">By company</p>

            <p class="text-16">{{ ticket.companyName }}</p>
          </q-item-section>
        </q-item>

        <q-item
          dense
          class="detail-item"
        >
          <q-item-section avatar>
            <div
              class="detail-icon-container bg-border flex items-center justify-center sm-radius"
            >
              <lucide-icon
                name="globe"
                color="brand"
                size="20px"
              />
            </div>
          </q-item-section>

          <q-item-section>
            <p class="text-12 text-info">Website</p>

            <a
              v-if="ticket.website"
              :href="formatWebsiteUrl(ticket.website)"
              target="_blank"
              rel="noopener noreferrer"
              class="website-link overflow-hidden ellipsis text-16"
            >
              {{ formatWebsiteUrl(ticket.website) }}
            </a>

            <span
              v-else
              class="text-16 text-primary"
            >
              -
            </span>
          </q-item-section>
        </q-item>

        <q-item
          v-if="ticket.approved === true"
          class="detail-item"
        >
          <q-item-section avatar>
            <div
              class="detail-icon-container bg-border flex items-center justify-center sm-radius"
            >
              <lucide-icon
                name="clipboard-list"
                color="brand"
                size="20px"
              />
            </div>
          </q-item-section>

          <q-item-section>
            <p class="text-12 text-info">Approval conditions</p>

            <p
              v-if="ticket.approvalConditions"
              class="text-16 text-primary"
            >
              {{ ticket.approvalConditions }}
            </p>

            <p
              v-else
              class="text-14 text-info text-italic"
            >
              No approval conditions were provided
            </p>
          </q-item-section>
        </q-item>

        <q-item
          v-if="ticket.approved === false"
          class="detail-item"
        >
          <q-item-section avatar>
            <div
              class="detail-icon-container bg-border flex items-center justify-center sm-radius"
            >
              <lucide-icon
                name="ban"
                color="brand"
                size="20px"
              />
            </div>
          </q-item-section>

          <q-item-section>
            <p class="text-12 text-info">Denial reason</p>

            <p
              v-if="ticket.denyReason"
              class="text-16 text-primary"
            >
              {{ ticket.denyReason }}
            </p>

            <p
              v-else
              class="text-14 text-info text-italic"
            >
              No denial reason was provided
            </p>
          </q-item-section>
        </q-item>
      </q-list>
    </q-card-section>
  </q-card>
</template>

<script setup>
  import { computed } from 'vue'

  import { getCombinedTicketStatus } from 'src/services/helpers/ticket.helper'
  import { formatWebsiteUrl } from 'src/services/helpers/util.helper'

  const props = defineProps({
    ticket: {
      type: Object,
      required: true,
    },
  })

  const statusConfig = computed(() => {
    return getCombinedTicketStatus(
      props.ticket.ticketStatus,
      props.ticket.approved
    )
  })
</script>

<style lang="scss">
  .status-card {
    .details-list {
      padding: 0;

      .detail-item {
        padding: 0 0 1.25rem 0;
        align-items: flex-start;

        &:last-child {
          padding-bottom: 0;
        }

        .q-item__section--avatar {
          min-width: auto;
          padding-right: 1rem;
        }

        .q-item__section--main {
          padding: 0;
        }
      }
    }

    .info-icon {
      margin-right: 0.25rem;
    }

    .detail-icon-container {
      width: 2.25rem;
      height: 2.25rem;
    }

    .bg-border {
      background-color: $border;
    }

    .website-link {
      text-decoration: underline;
      color: $primary;
      display: block;
      transition: color 0.2s ease;

      &:hover {
        color: $brand;
      }
    }
  }
</style>
