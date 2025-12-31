<template>
  <div class="tickets-table-wrapper flex column">
    <q-table
      v-model:pagination="pagination"
      flat
      class="tickets-table border-top"
      row-key="ticketId"
      :rows="ticketStore.sortedTickets"
      :columns="visibleColumns"
      :loading="ticketStore.isLoading"
      :sort-method="onSort"
      :table-row-class-fn="
        (row) =>
          row.ticketId === ticketStore.selectedTicketId ? 'selected-row' : ''
      "
      binary-state-sort
      @row-click="onRowClick"
    >
      <template #body-cell-productName="props">
        <q-td :props="props">
          <div class="product-cell">
            <company-avatar
              :website="props.row.website"
              size="32px"
              :alt="`${props.row.companyName} logo`"
            />

            <div class="product-info">
              <p
                class="product-name-text text-14 text-primary-dark text-font-medium"
              >
                {{ props.row.productName || '-' }}
              </p>

              <p class="company-name-text text-12 text-info">
                {{ props.row.companyName || '-' }}
              </p>
            </div>
          </div>
        </q-td>
      </template>

      <template #body-cell-dateCreated="props">
        <q-td
          :props="props"
          class="text-11 text-primary-dark"
        >
          {{ formatDateByFormat(props.value, 'dd MMM, yyyy') }}
        </q-td>
      </template>

      <template #body-cell-dateSubmitted="props">
        <q-td
          :props="props"
          class="text-11 text-primary-dark"
        >
          {{
            formatDateByFormat(
              props.value || props.row.dateSubmitted,
              'dd MMM, yyyy'
            )
          }}
        </q-td>
      </template>

      <template #body-cell-createdOn="props">
        <q-td
          :props="props"
          class="text-11 text-primary-dark"
        >
          {{ formatDateByFormat(props.row.dateCreated, 'dd MMM, yyyy') }}
        </q-td>
      </template>

      <template #no-data>
        <basic-no-data
          :has-active-filters="ticketStore.hasActiveFilters"
          :entity-type="`${currentDirectoryLabel} product requests`"
          action-label="Clear filters"
          @action-click="ticketStore.clearFilters"
        />
      </template>
    </q-table>
  </div>
</template>

<script setup>
  import { computed } from 'vue'
  import { useTicketStore } from 'src/stores/ticket'

  import {
    formatDateByFormat,
    sortItems,
  } from 'src/services/helpers/util.helper'
  import {
    TICKET_COLUMNS,
    DIRECTORIES,
    TICKET_DIRECTORIES,
  } from 'src/services/consts/ticket.const'

  const ticketStore = useTicketStore()

  const pagination = computed({
    get: () => ({
      sortBy: ticketStore.tableState.sortBy,
      descending: ticketStore.tableState.descending,
      page: ticketStore.tableState.page,
      rowsPerPage: ticketStore.tableState.rowsPerPage,
    }),
    set: (newPagination) => {
      ticketStore.updateTableState({
        sortBy: newPagination.sortBy,
        descending: newPagination.descending,
        page: newPagination.page,
        rowsPerPage: newPagination.rowsPerPage,
      })
    },
  })

  const currentDirectoryLabel = computed(() => {
    const directory = TICKET_DIRECTORIES.find(
      (dir) => dir.id === ticketStore.activeDirectory
    )
    return directory?.label.toLowerCase() || 'All Requests'
  })
  const visibleColumns = computed(() => {
    const isDraftsView = ticketStore.filterBy.status === DIRECTORIES.drafts
    const columns = [...TICKET_COLUMNS]

    if (isDraftsView) {
      // Remove the dateSubmitted column for drafts view
      columns.splice(1, 1)
    }
    return columns
  })

  function onRowClick(evt, row) {
    ticketStore.setSelectedTicketId(row.ticketId)
  }
  function onSort(rows, sortBy, descending) {
    if (!sortBy) return rows
    return sortItems(rows, sortBy, descending)
  }
</script>

<style lang="scss">
  .tickets-table-wrapper {
    flex: 1;
    min-height: 0;

    .tickets-table {
      td,
      th {
        &.last-activity,
        &.date {
          max-width: 110px;
          min-width: 110px;
          width: 110px;
        }
      }
    }
  }
</style>
