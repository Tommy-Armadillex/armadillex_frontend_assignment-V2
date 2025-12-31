<template>
  <section class="ticket-details">
    <ticket-details-header
      :ticket="ticket"
      :is-loading="isLoading"
      :error="error"
      @close="emit('close')"
    />

    <div
      v-if="!isLoading"
      class="tabs-header flex"
    >
      <navigation-tab
        :is-active="activeTab === 'information'"
        icon="info"
        tab-name="Information"
        :disable="isLoading"
        @click="() => (activeTab = 'information')"
      />
      <navigation-tab
        :is-active="activeTab === 'details'"
        icon="list"
        tab-name="Details"
        :disable="isLoading"
        @click="() => (activeTab = 'details')"
      />
    </div>

    <q-tab-panels
      :model-value="activeTab"
      class="tab-content bg-accent-light"
      animated
    >
      <q-tab-panel
        name="information"
        class="tab-information"
      >
        <basic-loader
          v-if="isLoading"
          size="60px"
          color="brand"
          class="flex items-center justify-center full-height"
        />

        <basic-error
          v-else-if="error"
          :message="error?.message || 'Failed to load ticket'"
          class="flex items-center justify-center full-height"
          @retry="emit('retry')"
        />

        <ticket-info
          v-else-if="ticket"
          :ticket="ticket"
        />
      </q-tab-panel>

      <q-tab-panel
        name="details"
        class="tab-details"
      >
        <basic-loader
          v-if="isLoading"
          size="60px"
          color="brand"
          class="flex items-center justify-center full-height"
        />

        <basic-error
          v-else-if="error"
          :message="error?.message || 'Failed to load ticket'"
          class="flex items-center justify-center full-height"
          @retry="emit('retry')"
        />

        <ticket-usage-questions
          v-else-if="ticket"
          :ticket="ticket"
        />
      </q-tab-panel>
    </q-tab-panels>
  </section>
</template>

<script setup>
  import { ref } from 'vue'

  import TicketDetailsHeader from 'src/components/ticket/details/TicketDetailsHeader.vue'
  import TicketInfo from 'src/components/ticket/details/TicketInfo.vue'
  import TicketUsageQuestions from 'src/components/ticket/details/TicketUsageQuestions.vue'
  import NavigationTab from 'src/components/common/NavigationTab.vue'

  const emit = defineEmits(['close', 'retry'])
  const props = defineProps({
    ticket: {
      type: Object,
      required: false,
      default: null,
    },
    isOpen: {
      type: Boolean,
      required: true,
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

  const activeTab = ref('information')
</script>

<style lang="scss">
  .ticket-details {
    height: 100vh;
    display: flex;
    flex-direction: column;

    .preprocessing-banner {
      flex-shrink: 0;
      margin: $layout-padding $layout-padding 0;
      font-size: 0.875rem;
      border: 1px solid $brand;
    }

    .tabs-header {
      flex-shrink: 0;
      gap: 1rem;
      padding: $layout-padding;

      .q-btn {
        padding-inline: 1.125rem !important;
      }
    }

    .tab-content {
      flex: 1;
      min-height: 0;
    }

    .q-tab-panel {
      height: 100%;
      overflow-y: auto;

      &.tab-information,
      &.tab-details {
        padding: 0 $layout-padding $layout-padding;
      }
    }
  }
</style>
