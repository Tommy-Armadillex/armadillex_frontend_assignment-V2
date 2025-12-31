<template>
  <section class="tickets-filter-section">
    <div class="filter-header">
      <h2 class="filter-title text-16 text-primary text-font-semibold">
        {{ currentDirectoryLabel }}
      </h2>

      <div class="filter-controls">
        <q-input
          :model-value="filterByToEdit.search"
          placeholder="Company or product name..."
          dense
          borderless
          color="accent-light"
          clearable
          class="search-input bg-accent-light q-px-md"
          @update:model-value="updateFilters('search', $event)"
        >
          <template #prepend>
            <lucide-icon
              name="search"
              :size="18"
              color="primary"
            />
          </template>
        </q-input>

        <div
          class="date-select-container flex items-center q-gutter-sm q-ml-sm"
        >
          <p class="text-12 text-info">Created</p>

          <q-select
            :model-value="filterByToEdit.dateRange"
            :options="DATE_RANGE_OPTIONS"
            borderless
            dense
            emit-value
            map-options
            dropdown-icon="keyboard_arrow_down"
            placeholder="All time"
            color="primary"
            options-selected-class="bg-border text-brand-dark"
            :menu-offset="[0, 5]"
            class="date-select"
            :class="{
              active: filterByToEdit.dateRange,
            }"
            @update:model-value="updateFilters('dateRange', $event)"
          />
        </div>

        <q-btn
          outline
          no-caps
          :disable="!ticketStore.hasActiveFilters"
          class="clear-btn text-12 text-font-regular"
          color="brand-light"
          :class="{
            'active-filters': ticketStore.hasActiveFilters,
          }"
          @click="clearFilters"
        >
          <lucide-icon
            name="x-icon"
            :size="16"
            class="q-mr-xxs"
          />
          Clear
        </q-btn>
      </div>
    </div>

    <div
      v-if="ticketStore.allTickets"
      class="filter-footer"
    >
      <p class="ticket-count text-brand">
        Showing
        <span class="text-font-medium">
          {{ ticketStore.filteredTickets.length }}
        </span>
        of
        <span class="text-font-medium">{{ ticketStore.totalTickets }}</span>
        requests
      </p>
    </div>
  </section>
</template>

<script setup>
  import { reactive, watch, computed } from 'vue'

  import { useTicketStore } from 'src/stores/ticket'
  import {
    DATE_RANGE_OPTIONS,
    TICKET_DIRECTORIES,
  } from 'src/services/consts/ticket.const'

  const ticketStore = useTicketStore()
  const filterByToEdit = reactive({
    search: ticketStore.filterBy.search,
    dateRange: ticketStore.filterBy.dateRange,
  })

  const currentDirectoryLabel = computed(() => {
    const directory = TICKET_DIRECTORIES.find(
      (dir) => dir.id === ticketStore.filterBy.status
    )
    return directory?.label || 'All Requests'
  })

  watch(
    () => ticketStore.filterBy,
    (newFilter, oldFilter) => {
      if (newFilter.search !== oldFilter.search) {
        filterByToEdit.search = newFilter.search || ''
      }
      if (newFilter.dateRange !== oldFilter.dateRange) {
        filterByToEdit.dateRange = newFilter.dateRange || null
      }
    }
  )

  function updateFilters(filterType, value) {
    filterByToEdit[filterType] = value
    ticketStore.updateFilters({ [filterType]: value })
  }
  function clearFilters() {
    filterByToEdit.search = ''
    filterByToEdit.dateRange = null
    ticketStore.clearFilters()
  }
</script>

<style lang="scss">
  $input-height: 42px;
  .tickets-filter-section {
    border-radius: $generic-border-radius $generic-border-radius 0 0;
    background: white;

    .filter-header {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1rem 1.25rem 0;

      .filter-title {
        flex-shrink: 0;
        min-width: 150px;
      }

      .filter-controls {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        gap: 0.75rem;
        flex: 1;

        .search-input {
          flex: 1;
          min-width: 200px;
          min-height: $input-height;

          input {
            min-height: $input-height;
          }
        }

        .date-select {
          min-width: 125px;
          height: $input-height;

          .q-field__control {
            padding-left: 0.5rem;
            padding-right: 0.25rem;
            border: 1px solid $brand-light;
            border-radius: $input-border-radius;
          }

          .q-icon {
            color: $brand-light !important;
          }

          &.active {
            .q-field__control {
              background-color: $border !important;
            }
          }
        }
      }

      .clear-btn {
        border-radius: $input-border-radius;
        min-height: $input-height;
        padding: 0.35rem 0.75rem !important;
        color: $brand-light !important;
        svg {
          transition: color 0.25s;
        }
        &.active-filters {
          background-color: $border !important;
          span {
            color: $primary !important;
          }
        }
      }
    }

    .filter-footer {
      padding: 1rem 1.25rem 1rem;

      .ticket-count {
        margin: 0;
        font-size: 0.6875rem; // 11px
      }
    }
  }
</style>
